import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://api.hsweb.pics";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.xTNteRFphY3F9W2PPWOwCQ9PDXD05ySRqkJu5d4Cej0";
const ADMIN_PW = "1234";

async function supaFetch(path: string, opts: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      ...opts.headers,
    },
  });
}

// GET: 공개 - 후기 목록
export async function GET() {
  const res = await supaFetch("reviews?order=created_at.desc&select=id,author,content", {
    headers: { "Accept-Profile": "inyeon_lab" },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([], { status: 200 });
  const data = await res.json();
  return NextResponse.json(data);
}

// CJK(중국어 한자/일본어 가나) 글자 카운트
const CJK_RE = /[一-鿿぀-ヿ]/g;
const cjkCount = (s: string) => (s.match(CJK_RE) ?? []).length;

// POST: 관리자 - 후기 작성
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const { pw, author, content } = body as { pw?: string; author?: string; content?: string };
  if (pw !== ADMIN_PW) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });

  const a = (author ?? "익명").trim().slice(0, 30) || "익명";
  const c = (content ?? "").trim();
  if (!c) return NextResponse.json({ error: "후기 내용을 입력해주세요." }, { status: 400 });
  if (c.length > 2000) return NextResponse.json({ error: "후기는 2000자 이내로 작성해주세요." }, { status: 400 });

  // 한자/가나가 5자 이상이면 스팸으로 판단 → silent drop
  if (cjkCount(a) + cjkCount(c) >= 5) {
    return NextResponse.json({ ok: true });
  }

  const res = await supaFetch("reviews", {
    method: "POST",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
    body: JSON.stringify({ author: a, content: c }),
  });
  if (!res.ok) return NextResponse.json({ error: "등록에 실패했습니다." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE: 관리자 - 후기 삭제
export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");
  const id = req.nextUrl.searchParams.get("id");
  if (pw !== ADMIN_PW) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  if (!id || !/^\d+$/.test(id)) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });

  const res = await supaFetch(`reviews?id=eq.${id}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
  });
  if (!res.ok) return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
