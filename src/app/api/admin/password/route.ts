import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPw, setAdminPw } from "@/lib/adminPw";

const PW_RE = /^[0-9]{4}$/;

// POST: 비밀번호 변경
// body: { current: "1234", new: "5678" }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const current = (body.current ?? "").toString();
  const next = (body.new ?? "").toString();

  if (!PW_RE.test(next)) {
    return NextResponse.json({ error: "새 비밀번호는 숫자 4자리여야 합니다." }, { status: 400 });
  }
  if (!(await verifyAdminPw(current))) {
    return NextResponse.json({ error: "현재 비밀번호가 일치하지 않습니다." }, { status: 401 });
  }
  if (current === next) {
    return NextResponse.json({ error: "기존 비밀번호와 동일합니다." }, { status: 400 });
  }

  const ok = await setAdminPw(next);
  if (!ok) return NextResponse.json({ error: "변경에 실패했습니다." }, { status: 500 });

  return NextResponse.json({ ok: true });
}
