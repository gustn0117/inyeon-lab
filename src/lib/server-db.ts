import "server-only";

export const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://api.hsweb.pics";
// 임시: 운영 서버에 SUPABASE_SERVICE_ROLE_KEY 환경변수를 넣기 전까지 기존 키로 동작시킨다.
// 서버 환경변수를 설정하고 키를 교체한 뒤 이 기본값을 지울 것.
const FALLBACK_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.xTNteRFphY3F9W2PPWOwCQ9PDXD05ySRqkJu5d4Cej0";
export const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_SERVICE_KEY;

export async function backendFetch(path: string, init: RequestInit = {}) {
  if (!SUPABASE_KEY) throw new Error("서버의 데이터 연결 설정이 필요합니다.");
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...init.headers },
  });
}
