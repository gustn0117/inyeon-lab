import "server-only";
import { backendFetch } from "@/lib/server-db";
import { DEFAULT_PROGRAMS, type CoachingApplication, type Program } from "@/lib/coaching";

const BUCKET = "inyeon-coaching-private";
let bucketReady: Promise<void> | null = null;

// This bucket has no public policies. Files are accessed only through authenticated server routes.
async function ensureBucket() {
  if (!bucketReady) bucketReady = (async () => {
    let res = await backendFetch(`/storage/v1/bucket/${BUCKET}`);
    if (res.status === 404 || res.status === 400) {
      const created = await backendFetch("/storage/v1/bucket", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: BUCKET, name: BUCKET, public: false, file_size_limit: 6291456, allowed_mime_types: ["application/json", "image/webp"] }),
      });
      if (!created.ok) {
        // A concurrent first request may already have created the bucket.
        res = await backendFetch(`/storage/v1/bucket/${BUCKET}`);
        if (!res.ok) throw new Error("비공개 저장소에 연결할 수 없습니다.");
      } else res = await backendFetch(`/storage/v1/bucket/${BUCKET}`);
    }
    if (!res.ok) throw new Error("비공개 저장소에 연결할 수 없습니다.");
    const bucket = await res.json();
    if (bucket.public !== false) throw new Error("사진 저장소의 비공개 설정을 확인해주세요.");
  })().catch(error => { bucketReady = null; throw error; });
  return bucketReady;
}

export function validatePrograms(input: unknown): input is Program[] {
  if (!Array.isArray(input) || input.length !== DEFAULT_PROGRAMS.length) return false;
  const ids = new Set<string>();
  return input.every((p: Program) => {
    if (!p || !DEFAULT_PROGRAMS.some(d => d.id === p.id) || ids.has(p.id)) return false;
    ids.add(p.id);
    return [p.name, p.duration, p.tagline, p.description, p.audience].every(v => typeof v === "string" && v.trim().length > 0 && v.length <= 2000)
      && Number.isSafeInteger(p.price) && p.price >= 1000 && p.price <= 10000000
      && Array.isArray(p.features) && p.features.length > 0 && p.features.length <= 12
      && p.features.every(v => typeof v === "string" && v.trim().length > 0 && v.length <= 200)
      && typeof p.featured === "boolean";
  });
}

export async function getPrograms(): Promise<Program[]> {
  const res = await backendFetch("/rest/v1/admin_settings?key=eq.coaching_programs&select=value", { headers: { "Accept-Profile": "inyeon_lab" } });
  if (!res.ok) throw new Error("프로그램 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error("프로그램 정보를 확인할 수 없습니다.");
  if (!rows.length) return DEFAULT_PROGRAMS;
  let parsed: unknown;
  try { parsed = JSON.parse(rows[0].value); } catch { throw new Error("프로그램 설정을 확인해주세요."); }
  if (!validatePrograms(parsed)) throw new Error("프로그램 설정을 확인해주세요.");
  return parsed;
}

export async function savePrograms(programs: Program[]) {
  const res = await backendFetch("/rest/v1/admin_settings?on_conflict=key", {
    method: "POST", headers: { "Content-Type": "application/json", "Content-Profile": "inyeon_lab", Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ key: "coaching_programs", value: JSON.stringify(programs), updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("프로그램 저장에 실패했습니다.");
}

export async function readApplication(id: string): Promise<CoachingApplication | null> {
  await ensureBucket();
  const res = await backendFetch(`/storage/v1/object/${BUCKET}/applications/${id}.json`);
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error("신청 내용을 불러오지 못했습니다.");
  return res.json();
}

export async function saveApplication(application: CoachingApplication, upsert = false) {
  await ensureBucket();
  const res = await backendFetch(`/storage/v1/object/${BUCKET}/applications/${application.id}.json`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-upsert": String(upsert) }, body: JSON.stringify(application),
  });
  if (!res.ok) throw new Error("신청 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
}

export async function savePhoto(id: string, photo: Uint8Array) {
  await ensureBucket();
  const path = `photos/${id}.webp`;
  const res = await backendFetch(`/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST", headers: { "Content-Type": "image/webp", "x-upsert": "true" }, body: new Blob([new Uint8Array(photo)]),
  });
  if (!res.ok) throw new Error("사진 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
  return path;
}

export async function getPhoto(path: string) {
  await ensureBucket();
  return backendFetch(`/storage/v1/object/${BUCKET}/${path}`);
}

export async function listApplications(offset: number) {
  await ensureBucket();
  const res = await backendFetch(`/storage/v1/object/list/${BUCKET}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: "applications", limit: 51, offset, sortBy: { column: "created_at", order: "desc" } }),
  });
  if (!res.ok) throw new Error("신청 목록을 불러오지 못했습니다.");
  const objects = await res.json() as { name: string }[];
  const applications = await Promise.all(objects.slice(0, 50).filter(o => /^[0-9a-f-]{36}\.json$/.test(o.name)).map(o => readApplication(o.name.replace(".json", ""))));
  return { applications: applications.filter((a): a is CoachingApplication => !!a), hasMore: objects.length > 50 };
}

export async function deleteObjects(paths: string[]) {
  await ensureBucket();
  const res = await backendFetch(`/storage/v1/object/${BUCKET}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: paths }) });
  if (!res.ok) throw new Error("첨부 자료 삭제에 실패했습니다.");
}
