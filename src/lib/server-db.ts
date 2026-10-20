import "server-only";

export const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://api.hsweb.pics";
export const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function backendFetch(path: string, init: RequestInit = {}) {
  if (!SUPABASE_KEY) throw new Error("서버의 데이터 연결 설정이 필요합니다.");
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...init.headers },
  });
}
