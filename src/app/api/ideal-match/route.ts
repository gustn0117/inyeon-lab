import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPw } from "@/lib/adminPw";

const SUPABASE_URL = "https://api.hsweb.pics";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.xTNteRFphY3F9W2PPWOwCQ9PDXD05ySRqkJu5d4Cej0";

async function supa(path: string, opts: RequestInit = {}) {
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

const PHONE_RE = /^01[0-9]-?\d{3,4}-?\d{4}$/;
const SHORT = (s: unknown) => (typeof s === "string" ? s.trim().slice(0, 30) : null);
const CJK_RE = /[一-鿿぀-ヿ]/g;
const BOT_KEYWORDS = /(select|insert|update|delete|drop|union|sleep|waitfor|pg_sleep|dbms_pipe|chr\(|benchmark|--|;|\|\||xp_|sp_|\bor\b\s*\d|<script)/i;

// POST: 진단 제출
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const { website, gender, age_range, region, ideal_age, ideal_region, ideal_style, phone } = body as {
    website?: string;
    gender?: string;
    age_range?: string;
    region?: string;
    ideal_age?: string;
    ideal_region?: string;
    ideal_style?: string;
    phone?: string;
  };

  // honeypot: 봇이 채우는 hidden 필드
  if (website && website.length > 0) return NextResponse.json({ ok: true });

  const p = (phone ?? "").trim();
  if (!p) return NextResponse.json({ error: "연락처를 입력해주세요." }, { status: 400 });
  if (!PHONE_RE.test(p)) return NextResponse.json({ error: "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)" }, { status: 400 });

  // 봇/스팸 차단
  const all = [gender, age_range, region, ideal_age, ideal_region, ideal_style, p].filter(Boolean).join(" ");
  if (BOT_KEYWORDS.test(all)) return NextResponse.json({ ok: true });
  const cjk = (all.match(CJK_RE) ?? []).length;
  if (cjk >= 5) return NextResponse.json({ ok: true });

  const payload = {
    gender: SHORT(gender),
    age_range: SHORT(age_range),
    region: SHORT(region),
    ideal_age: SHORT(ideal_age),
    ideal_region: SHORT(ideal_region),
    ideal_style: SHORT(ideal_style),
    phone: p,
  };

  const res = await supa("ideal_matches", {
    method: "POST",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return NextResponse.json({ error: "등록에 실패했습니다." }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// GET: 어드민 목록
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");
  if (!(await verifyAdminPw(pw))) return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });

  const res = await supa("ideal_matches?order=created_at.desc&limit=500", {
    headers: { "Accept-Profile": "inyeon_lab" },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([], { status: 200 });
  return NextResponse.json(await res.json());
}

// DELETE: 어드민 단건 삭제
export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");
  const id = req.nextUrl.searchParams.get("id");
  if (!(await verifyAdminPw(pw))) return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  if (!id || !/^\d+$/.test(id)) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });

  const res = await supa(`ideal_matches?id=eq.${id}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
  });
  if (!res.ok) return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
