import { SUPABASE_URL, SUPABASE_KEY } from "@/lib/server-db";
import { timingSafeEqual } from "node:crypto";
const DEFAULT_PW = process.env.ADMIN_PASSWORD ?? "";
const TTL_MS = 5 * 60 * 1000;

let cached: { value: string; at: number } | null = null;

async function readFromDb(): Promise<string> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_settings?key=eq.admin_pw&select=value`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Accept-Profile": "inyeon_lab",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return DEFAULT_PW;
    const rows = await res.json();
    const v = Array.isArray(rows) && rows[0]?.value;
    return typeof v === "string" && v.length > 0 ? v : DEFAULT_PW;
  } catch {
    return DEFAULT_PW;
  }
}

export async function getAdminPw(): Promise<string> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;
  const v = await readFromDb();
  cached = { value: v, at: Date.now() };
  return v;
}

export function invalidateAdminPwCache() {
  cached = null;
}

export async function verifyAdminPw(pw: string | null | undefined): Promise<boolean> {
  if (!pw) return false;
  const current = await getAdminPw();
  const candidate = Buffer.from(pw);
  const stored = Buffer.from(current);
  return candidate.length === stored.length && stored.length > 0 && timingSafeEqual(candidate, stored);
}

export async function setAdminPw(newPw: string): Promise<boolean> {
  // upsert via Prefer: resolution=merge-duplicates
  const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Profile": "inyeon_lab",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ key: "admin_pw", value: newPw, updated_at: new Date().toISOString() }),
  });
  if (res.ok) {
    invalidateAdminPwCache();
    return true;
  }
  return false;
}
