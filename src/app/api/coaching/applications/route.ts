import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { verifyAdminPw } from "@/lib/adminPw";
import { type ApplicationKind, type CoachingApplication, STATUS_LABELS } from "@/lib/coaching";
import { deleteObjects, getPhoto, getPrograms, listApplications, readApplication, saveApplication, savePhoto } from "@/lib/coaching-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_BODY = 6 * 1024 * 1024;
const attempts = new Map<string, { count: number; reset: number }>();
const failure = (error: string, status = 400) => NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

async function boundedForm(req: NextRequest) {
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) throw new Error("신청 양식을 확인해주세요.");
  if (Number(req.headers.get("content-length")) > MAX_BODY) throw new Error("사진은 5MB 이하로 첨부해주세요.");
  const reader = req.body?.getReader();
  if (!reader) throw new Error("신청 내용을 입력해주세요.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error("사진은 5MB 이하로 첨부해주세요."); }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), { headers: { "Content-Type": req.headers.get("content-type")! } }).formData();
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const source = new URL(origin);
      // Next's internal origin can differ behind a reverse proxy; compare the browser's host.
      if (!["http:", "https:"].includes(source.protocol) || source.host !== req.headers.get("host")) return failure("올바른 신청 페이지에서 다시 시도해주세요.", 403);
    } catch { return failure("올바른 신청 페이지에서 다시 시도해주세요.", 403); }
  }
  const now = Date.now();
  attempts.forEach((value, key) => { if (value.reset < now) attempts.delete(key); });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const attempt = attempts.get(ip) ?? { count: 0, reset: now + 15 * 60 * 1000 };
  if (attempt.count >= 10) return failure("신청 요청이 많습니다. 잠시 후 다시 시도하거나 카카오톡으로 문의해주세요.", 429);
  attempt.count++; attempts.set(ip, attempt);

  let form: FormData;
  try { form = await boundedForm(req); }
  catch (error) { return failure(error instanceof Error ? error.message : "신청 양식을 확인해주세요."); }
  const field = (key: string) => typeof form.get(key) === "string" ? (form.get(key) as string).trim() : "";
  if (field("website")) return failure("신청 양식을 확인해주세요.");
  const id = field("requestId");
  const kind = field("kind") as ApplicationKind;
  const name = field("name"), phone = field("phone").replace(/[^0-9]/g, "");
  if (!UUID.test(id) || !["consultation", "impression", "paid"].includes(kind)) return failure("신청 유형을 확인해주세요.");
  if (!name || name.length > 40 || /[<>\r\n]/.test(name)) return failure("성함 또는 닉네임을 40자 이내로 입력해주세요.");
  if (!/^01[016789]\d{7,8}$/.test(phone)) return failure("연락 가능한 휴대전화 번호를 입력해주세요.");
  if (field("privacyConsent") !== "true" || field("adultConsent") !== "true") return failure("개인정보 수집·이용 동의와 만 19세 이상 여부를 확인해주세요.");
  if (kind !== "paid" && (!field("concern") || field("concern").length > 5000)) return failure("고민과 질문을 5,000자 이내로 입력해주세요.");
  if (field("concern").length > 5000 || field("kakaoId").length > 60 || field("direction").length > 100 || field("depositor").length > 40) return failure("입력한 내용의 길이를 확인해주세요.");
  if (field("age") && (!/^\d{2,3}$/.test(field("age")) || Number(field("age")) < 19 || Number(field("age")) > 120)) return failure("나이는 만 19세 이상으로 입력해주세요.");
  if (field("gender") && !["여성", "남성", "응답하지 않음"].includes(field("gender"))) return failure("성별 선택을 확인해주세요.");
  const preferredAt = field("preferredAt");
  if (preferredAt && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(preferredAt) || !Number.isFinite(Date.parse(preferredAt + "+09:00")) || Date.parse(preferredAt + "+09:00") < now)) return failure("희망 상담 일시는 현재 이후로 선택해주세요.");
  if (kind === "paid" && !field("depositor")) return failure("입금자명을 입력해주세요.");
  if (kind === "paid" && field("termsConsent") !== "true") return failure("이용약관과 취소·환불 안내를 확인해주세요.");
  const file = form.get("photo");
  const photo = file instanceof File && file.size > 0 ? file : null;
  if (kind === "impression" && !photo) return failure("무료 첫인상 진단을 위한 본인 사진을 첨부해주세요.");
  if (photo && field("photoConsent") !== "true") return failure("사진을 첨부하려면 사진 수집·이용에 동의해주세요.");
  if (photo && (photo.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(photo.type))) return failure("사진은 JPG·PNG·WebP 형식, 5MB 이하로 첨부해주세요.");

  let image: Buffer | null = null;
  if (photo) {
    try {
      const pipeline = sharp(Buffer.from(await photo.arrayBuffer()), { limitInputPixels: 25000000, animated: false });
      const metadata = await pipeline.metadata();
      if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) return failure("사용할 수 없는 사진 형식입니다.");
      image = await pipeline.rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    } catch { return failure("사진을 읽을 수 없습니다. 다른 JPG·PNG·WebP 사진으로 다시 시도해주세요."); }
  }

  let photoPath: string | null = null;
  try {
    const previous = await readApplication(id);
    if (previous) return previous.phone === phone && previous.name === name && previous.kind === kind
      ? NextResponse.json({ ok: true, id }) : failure("새 신청 양식을 열고 다시 시도해주세요.", 409);
    const program = kind === "paid" ? (await getPrograms()).find(p => p.id === field("programId")) : null;
    const requestedProgram = kind !== "paid" && field("requestedProgramId") ? (await getPrograms()).find(p => p.id === field("requestedProgramId")) : null;
    if (kind !== "paid" && field("requestedProgramId") && !requestedProgram) return failure("희망 프로그램을 다시 선택해주세요.");
    if (kind === "paid" && !program) return failure("신청할 프로그램을 선택해주세요.");
    if (program && field("expectedPrice") !== String(program.price)) return failure("프로그램 가격이 변경되었습니다. 페이지를 새로고침한 뒤 금액을 확인해주세요.", 409);
    if (image) photoPath = await savePhoto(id, image);
    const timestamp = new Date().toISOString();
    const application: CoachingApplication = {
      id, kind, name, phone, kakaoId: field("kakaoId"), age: field("age"), gender: field("gender"),
      concern: field("concern"), direction: field("direction"), preferredAt,
      programId: program?.id ?? "", programName: program?.name ?? "", price: program?.price ?? 0,
      depositor: kind === "paid" ? field("depositor") : "", photoPath, privacyConsent: true,
      requestedProgramName: requestedProgram?.name ?? "", adultConsent: true, termsConsent: kind === "paid",
      photoConsent: !!photo, consentVersion: "2026-10-20", status: "received", createdAt: timestamp, updatedAt: timestamp,
    };
    await saveApplication(application);
    return NextResponse.json({ ok: true, id });
  } catch {
    // Keep a successfully persisted retry intact, and remove unreferenced photo uploads.
    try {
      const persisted = await readApplication(id);
      if (persisted?.phone === phone && persisted?.name === name && persisted?.kind === kind) return NextResponse.json({ ok: true, id });
      if (!persisted && photoPath) await deleteObjects([photoPath]);
    } catch { /* Do not report success until the application can be read. */ }
    return failure("신청을 저장하지 못했습니다. 입력 내용은 유지됩니다. 다시 시도하거나 카카오톡으로 문의해주세요.", 503);
  }
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdminPw(req.headers.get("x-admin-password")))) return failure("관리자 인증이 필요합니다.", 401);
  try {
    const id = req.nextUrl.searchParams.get("photo");
    if (id) {
      if (!UUID.test(id)) return failure("신청 번호가 올바르지 않습니다.");
      const record = await readApplication(id);
      if (!record?.photoPath) return failure("사진을 찾을 수 없습니다.", 404);
      const photo = await getPhoto(record.photoPath);
      if (!photo.ok) return failure("사진을 불러오지 못했습니다.", 404);
      return new NextResponse(photo.body, { headers: { "Content-Type": "image/webp", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Content-Disposition": 'inline; filename="consultation-photo.webp"' } });
    }
    const offset = Number(req.nextUrl.searchParams.get("offset") ?? 0);
    if (!Number.isSafeInteger(offset) || offset < 0) return failure("페이지 번호를 확인해주세요.");
    return NextResponse.json(await listApplications(offset), { headers: { "Cache-Control": "private, no-store" } });
  } catch { return failure("신청 목록을 불러오지 못했습니다.", 503); }
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminPw(req.headers.get("x-admin-password")))) return failure("관리자 인증이 필요합니다.", 401);
  const body = await req.json().catch(() => null);
  if (!body || !UUID.test(body.id ?? "") || !Object.hasOwn(STATUS_LABELS, body.status ?? "")) return failure("신청 번호와 처리 상태를 확인해주세요.");
  try {
    const application = await readApplication(body.id);
    if (!application) return failure("신청을 찾을 수 없습니다.", 404);
    if (body.status === "paid" && application.kind !== "paid") return failure("무료 신청에는 입금 상태를 지정할 수 없습니다.");
    await saveApplication({ ...application, status: body.status, updatedAt: new Date().toISOString() }, true);
    return NextResponse.json({ ok: true });
  } catch { return failure("처리 상태를 저장하지 못했습니다.", 503); }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdminPw(req.headers.get("x-admin-password")))) return failure("관리자 인증이 필요합니다.", 401);
  const id = req.nextUrl.searchParams.get("id") ?? "";
  if (!UUID.test(id)) return failure("신청 번호를 확인해주세요.");
  try {
    const record = await readApplication(id);
    if (!record) return failure("신청을 찾을 수 없습니다.", 404);
    // Remove the photo first; a failed removal keeps the application visible for a retry.
    if (record.photoPath) await deleteObjects([record.photoPath]);
    await deleteObjects([`applications/${id}.json`]);
    return NextResponse.json({ ok: true });
  } catch { return failure("삭제하지 못했습니다. 다시 시도해주세요.", 503); }
}
