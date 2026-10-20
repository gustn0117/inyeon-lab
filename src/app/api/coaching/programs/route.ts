import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPw } from "@/lib/adminPw";
import { getPrograms, savePrograms, validatePrograms } from "@/lib/coaching-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try { return NextResponse.json({ programs: await getPrograms() }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return NextResponse.json({ error: "프로그램 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요." }, { status: 503 }); }
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdminPw(req.headers.get("x-admin-password")))) return NextResponse.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  const input = await req.json().catch(() => null);
  if (!validatePrograms(input?.programs)) return NextResponse.json({ error: "프로그램 내용과 가격을 확인해주세요. 가격은 1,000원 이상 1,000만원 이하로 입력해주세요." }, { status: 400 });
  try { await savePrograms(input.programs); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "저장하지 못했습니다. 다시 시도해주세요." }, { status: 503 }); }
}
