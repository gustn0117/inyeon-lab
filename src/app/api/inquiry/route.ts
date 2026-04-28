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

// 한국 이름: 한글/영문 1~20자, 공백/숫자/특수문자 금지
const NAME_RE = /^[가-힣a-zA-Z]{1,20}$/;
// 전화번호: 010-XXXX-XXXX 또는 01012345678 형식만 허용
const PHONE_RE = /^01[0-9]-?\d{3,4}-?\d{4}$/;
// 봇 페이로드 키워드 (대소문자 무시)
const BOT_KEYWORDS = /(select|insert|update|delete|drop|union|sleep|waitfor|pg_sleep|dbms_pipe|chr\(|benchmark|--|;|\|\||xp_|sp_|\bor\b\s*\d|<script)/i;

function isBot(s: string) {
  return BOT_KEYWORDS.test(s);
}

// POST: 문의 등록
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: true }); // silently drop

  const { name, phone, website } = body as { name?: string; phone?: string; website?: string };

  // honeypot: 봇은 hidden 필드를 채움
  if (website && website.length > 0) return NextResponse.json({ ok: true });

  const n = (name ?? "").trim();
  const p = (phone ?? "").trim();

  if (!n || !p) {
    return NextResponse.json({ error: "이름과 전화번호를 입력해주세요." }, { status: 400 });
  }
  if (isBot(n) || isBot(p)) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }
  if (!NAME_RE.test(n)) {
    return NextResponse.json({ error: "이름은 한글 또는 영문 1~20자로 입력해주세요." }, { status: 400 });
  }
  if (!PHONE_RE.test(p)) {
    return NextResponse.json({ error: "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)" }, { status: 400 });
  }

  const res = await supaFetch("inquiries", {
    method: "POST",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
    body: JSON.stringify({ name: n, phone: p }),
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

// DELETE: 어드민 삭제 (단건 / 전체)
export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");
  if (pw !== ADMIN_PW) {
    return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  const all = req.nextUrl.searchParams.get("all");
  const purgeBots = req.nextUrl.searchParams.get("purgeBots");

  let path = "";
  if (id) {
    path = `inquiries?id=eq.${encodeURIComponent(id)}`;
  } else if (all === "1") {
    path = "inquiries?id=gte.0";
  } else if (purgeBots === "1") {
    // 이름 또는 전화번호에 SQL 페이로드 흔적이 있는 행 삭제
    // PostgREST: name=ilike.*select* 등으로 처리
    const patterns = ["select", "sleep", "waitfor", "dbms_pipe", "pg_sleep", "chr(", "--", "%27"];
    const orCond = patterns.map(k => `name.ilike.*${encodeURIComponent(k)}*,phone.ilike.*${encodeURIComponent(k)}*`).join(",");
    path = `inquiries?or=(${orCond})`;
  } else {
    return NextResponse.json({ error: "id, all, or purgeBots required" }, { status: 400 });
  }

  const res = await supaFetch(path, {
    method: "DELETE",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
