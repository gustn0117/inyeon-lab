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

const PHONE_RE = /^010-?\d{4}-?\d{4}$/;
const BOT_KEYWORDS = /(select|insert|update|delete|drop|union|sleep|waitfor|pg_sleep|dbms_pipe|chr\(|benchmark|--|;|\|\||xp_|sp_|\bor\b\s*\d|<script)/i;

type NewApplicationBody = {
  formVersion?: number;
  website?: string;
  gender?: string;
  phone?: string;
  region?: string;
  birthYear?: string | number;
  job?: string;
  height?: string | number;
  eligibilityConfirmed?: boolean;
  privacyConsent?: boolean;
};

const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  return phone.trim();
};

// POST: 간단 매칭 신청 제출
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const newApplication = body as NewApplicationBody;
  const {
    formVersion,
    website,
    gender,
    phone,
    region,
    birthYear,
    job,
    height,
    eligibilityConfirmed,
    privacyConsent,
  } = newApplication;

  if (formVersion !== 2) {
    return NextResponse.json({ error: "새 신청 페이지에서 다시 접수해주세요." }, { status: 400 });
  }
  if (website !== undefined && typeof website !== "string") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (website && website.length > 0) return NextResponse.json({ ok: true });
  if (gender !== "여성" && gender !== "남성") {
    return NextResponse.json({ error: "회원 유형을 다시 선택해주세요." }, { status: 400 });
  }
  if (eligibilityConfirmed !== true) {
    return NextResponse.json({ error: "미혼·연령 가입 조건을 확인해주세요." }, { status: 400 });
  }
  if (privacyConsent !== true) {
    return NextResponse.json({ error: "개인정보 수집·이용 동의가 필요합니다." }, { status: 400 });
  }
  if (typeof phone !== "string" || typeof region !== "string" || typeof job !== "string") {
    return NextResponse.json({ error: "입력값 형식이 올바르지 않습니다." }, { status: 400 });
  }
  if ((typeof birthYear !== "string" && typeof birthYear !== "number")
    || (typeof height !== "string" && typeof height !== "number")) {
    return NextResponse.json({ error: "출생연도와 키를 다시 입력해주세요." }, { status: 400 });
  }

  const p = normalizePhone(phone);
  const r = region.trim();
  const j = job.trim();
  const by = Number(birthYear);
  const h = Number(height);
  const currentYear = Number(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", year: "numeric" }).format(new Date()));
  // 만 나이가 아닌 운영 출생연도 기준으로 확인합니다.
  const oldestBirthYear = gender === "여성" ? 1988 : 1984;
  const youngestBirthYear = currentYear - 19;

  if (!PHONE_RE.test(p)) {
    return NextResponse.json({ error: "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)" }, { status: 400 });
  }
  if (r.length < 2 || r.length > 30) {
    return NextResponse.json({ error: "지역을 2~30자로 입력해주세요." }, { status: 400 });
  }
  if (!Number.isInteger(by) || by < oldestBirthYear || by > youngestBirthYear) {
    const error = gender === "여성"
      ? "한국나이 기준 1988년생까지에 해당하는 출생연도를 입력해주세요."
      : "한국나이 기준 1984년생까지에 해당하는 출생연도를 입력해주세요.";
    return NextResponse.json({ error }, { status: 400 });
  }
  if (j.length < 2 || j.length > 30) {
    return NextResponse.json({ error: "직업을 2~30자로 입력해주세요." }, { status: 400 });
  }
  if (!Number.isInteger(h) || h < 130 || h > 220) {
    return NextResponse.json({ error: "키는 130~220cm 사이로 입력해주세요." }, { status: 400 });
  }

  const all = [gender, r, String(by), j, String(h), p].join(" ");
  if (BOT_KEYWORDS.test(all)) {
    return NextResponse.json({ error: "입력 내용을 다시 확인해주세요." }, { status: 400 });
  }

  // 기존 운영 DB 스키마와 호환되도록 새 신청 필드를 기존 text 컬럼에 명시적으로 매핑합니다.
  const payload = {
    gender,
    age_range: `${by}년생`,
    region: r,
    ideal_age: j,
    ideal_region: `${h}cm`,
    ideal_style: "자가 자격확인·개인정보동의 v1",
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
  if (!res.ok) return NextResponse.json({ error: "신청 목록을 불러오지 못했습니다." }, { status: 502 });
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
