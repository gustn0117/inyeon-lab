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

const CJK_RE = /[一-鿿぀-ヿ]/g;
const cjkCount = (s: string) => (s.match(CJK_RE) ?? []).length;
const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

const WELCOME_MSG = "문의주시면 매칭전문사가 24시간 내에 순차적으로 답변 드립니다. 따로 답변 알림이 가진 않으니, 카카오톡 아이디인 inyeon_으로 문의주시면 보다 빠르게 답변 받으실 수 있습니다.\n\n어떤 점이 궁금하실까요?";
const RECEIVED_MSG = "채팅이 상담사에게 전달되었습니다.\n빠르게 안내드리도록 하겠습니다.\n폭언, 욕설 사용 시 채팅이 제한됩니다.";

async function insertSystemMsg(session: string, content: string) {
  await supa("chat_messages", {
    method: "POST",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
    body: JSON.stringify({ session_id: session, sender: "system", content }),
  });
}

// GET
//   ?session=<uuid>&since=<id>           : 방문자/공통 - 해당 세션 메시지 폴링 (since 이후만)
//   ?pw=1234                              : 어드민 - 모든 세션 목록
//   ?pw=1234&session=<uuid>&since=<id>    : 어드민 - 특정 세션 메시지 폴링
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const pw = sp.get("pw");
  const session = sp.get("session");
  const since = sp.get("since") ?? "0";
  const isAdmin = await verifyAdminPw(pw);

  // 어드민 - 세션 목록
  if (isAdmin && !session) {
    const r = await supa("chat_sessions?select=*&order=last_visitor_at.desc&limit=200", {
      headers: { "Accept-Profile": "inyeon_lab" },
      cache: "no-store",
    });
    if (!r.ok) return NextResponse.json([], { status: 200 });
    return NextResponse.json(await r.json());
  }

  // 메시지 폴링 (방문자 또는 어드민)
  if (!session || !isUuid(session)) {
    return NextResponse.json({ error: "session_required" }, { status: 400 });
  }
  const sinceParam = /^\d+$/.test(since) ? since : "0";

  const r = await supa(`chat_messages?session_id=eq.${session}&id=gt.${sinceParam}&order=id.asc&select=id,sender,content,created_at`, {
    headers: { "Accept-Profile": "inyeon_lab" },
    cache: "no-store",
  });
  if (!r.ok) return NextResponse.json([], { status: 200 });
  const msgs = await r.json();

  // 어드민이 폴링하면 unread_admin = 0 으로 마크
  if (isAdmin && Array.isArray(msgs)) {
    await supa(`chat_sessions?id=eq.${session}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
      body: JSON.stringify({ unread_admin: 0 }),
    });
  }
  // 방문자가 폴링하면 unread_visitor = 0
  if (!isAdmin && Array.isArray(msgs)) {
    await supa(`chat_sessions?id=eq.${session}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
      body: JSON.stringify({ unread_visitor: 0 }),
    });
  }
  return NextResponse.json(msgs);
}

// POST
//   action=start  body={ name }                       : 새 세션 생성 → { session_id }
//   action=send   body={ session, content }           : 방문자 메시지
//   action=send   body={ pw, session, content }       : 어드민 메시지
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const action = body.action as string | undefined;

  // ── 1) 세션 시작
  if (action === "start") {
    let name = (body.name ?? "방문자").toString().trim().slice(0, 20);
    if (!name) name = "방문자";
    if (cjkCount(name) >= 3) name = "방문자"; // 봇 차단

    const r = await supa("chat_sessions", {
      method: "POST",
      headers: { Prefer: "return=representation", "Content-Profile": "inyeon_lab" },
      body: JSON.stringify({ visitor_name: name }),
    });
    if (!r.ok) return NextResponse.json({ error: "create_failed" }, { status: 500 });
    const rows = await r.json();
    const session = Array.isArray(rows) ? rows[0] : rows;
    // 환영 자동 메시지
    if (session?.id) await insertSystemMsg(session.id, WELCOME_MSG);
    return NextResponse.json({ session_id: session?.id, visitor_name: session?.visitor_name });
  }

  // ── 2) 메시지 전송
  if (action === "send") {
    const session = (body.session ?? "").toString();
    if (!isUuid(session)) return NextResponse.json({ error: "session_invalid" }, { status: 400 });

    const content = (body.content ?? "").toString().trim();
    if (!content) return NextResponse.json({ error: "empty" }, { status: 400 });
    if (content.length > 1000) return NextResponse.json({ error: "too_long" }, { status: 400 });
    if (cjkCount(content) >= 5) return NextResponse.json({ ok: true }); // silent drop

    const isAdmin = await verifyAdminPw(body.pw);
    const sender = isAdmin ? "admin" : "visitor";

    // 방문자 메시지인 경우, 저장 전에 visitor 메시지 카운트 확인 (첫 메시지 여부)
    let isFirstVisitorMsg = false;
    if (!isAdmin) {
      const cnt = await supa(`chat_messages?session_id=eq.${session}&sender=eq.visitor&select=id&limit=1`, {
        headers: { "Accept-Profile": "inyeon_lab" },
        cache: "no-store",
      });
      if (cnt.ok) {
        const arr = await cnt.json();
        isFirstVisitorMsg = Array.isArray(arr) && arr.length === 0;
      }
    }

    // 메시지 저장
    const ins = await supa("chat_messages", {
      method: "POST",
      headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
      body: JSON.stringify({ session_id: session, sender, content }),
    });
    if (!ins.ok) return NextResponse.json({ error: "send_failed" }, { status: 500 });

    // 방문자 첫 메시지 → 안내 자동 메시지
    if (isFirstVisitorMsg) {
      await insertSystemMsg(session, RECEIVED_MSG);
    }

    // 세션 메타 갱신: 마지막 시각, 상대측 unread + 1
    const patch: Record<string, unknown> = isAdmin
      ? { last_admin_at: new Date().toISOString(), unread_visitor: { __increment: true } }
      : { last_visitor_at: new Date().toISOString(), unread_admin: { __increment: true } };

    // PostgREST는 컬럼별 increment 직접 지원 안 함 → RPC 없이 최신 값 가져와서 +1로 PATCH
    // 단순화: 현재 값 가져와서 +1
    const cur = await supa(`chat_sessions?id=eq.${session}&select=unread_admin,unread_visitor`, {
      headers: { "Accept-Profile": "inyeon_lab" },
      cache: "no-store",
    });
    const arr = cur.ok ? await cur.json() : [];
    const row = Array.isArray(arr) ? arr[0] : null;
    if (row) {
      const updated: Record<string, unknown> = isAdmin
        ? { last_admin_at: new Date().toISOString(), unread_visitor: (row.unread_visitor ?? 0) + 1 }
        : { last_visitor_at: new Date().toISOString(), unread_admin: (row.unread_admin ?? 0) + 1 };
      await supa(`chat_sessions?id=eq.${session}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
        body: JSON.stringify(updated),
      });
    }
    // patch 변수는 위에서 사용된 의도이지만 PostgREST는 increment 미지원이라 위에서 직접 처리 → 변수 미사용 표시 회피
    void patch;

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}

// DELETE: 어드민이 세션 삭제
export async function DELETE(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  if (!(await verifyAdminPw(sp.get("pw")))) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  const session = sp.get("session");
  if (!session || !isUuid(session)) return NextResponse.json({ error: "session_invalid" }, { status: 400 });

  const r = await supa(`chat_sessions?id=eq.${session}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal", "Content-Profile": "inyeon_lab" },
  });
  if (!r.ok) return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
