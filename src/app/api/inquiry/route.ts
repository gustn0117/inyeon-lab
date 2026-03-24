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

// POST: 문의 등록
export async function POST(req: NextRequest) {
  const { name, phone } = await req.json();
  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "이름과 전화번호를 입력해주세요." }, { status: 400 });
  }

  const res = await supaFetch("inquiries", {
    method: "POST",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "등록에 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// GET: 어드민 조회
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");
  if (pw !== ADMIN_PW) {
    return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  }

  const res = await supaFetch("inquiries?order=created_at.desc", {
    headers: { "Accept-Profile": "inyeon_lab" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
