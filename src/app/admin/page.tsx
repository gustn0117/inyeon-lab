"use client";
import { useEffect, useRef, useState } from "react";

type Inquiry = { id: number; name: string; phone: string; created_at: string };
type Review = { id: number; author: string; content: string };
type Session = { id: string; visitor_name: string; created_at: string; last_visitor_at: string; last_admin_at: string | null; unread_admin: number; unread_visitor: number };
type Msg = { id: number; sender: "visitor" | "admin" | "system"; content: string; created_at: string };
type Tab = "inquiries" | "reviews" | "chat";

const PINK = "#d4567a";

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [chatMsgs, setChatMsgs] = useState<Msg[]>([]);
  const lastMsgIdRef = useRef(0);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  // 후기 작성 폼
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [postMsg, setPostMsg] = useState("");

  const fetchInquiries = async (password = pw) => {
    const res = await fetch(`/api/inquiry?pw=${encodeURIComponent(password)}`);
    if (res.ok) { setInquiries(await res.json()); return true; }
    return false;
  };
  const fetchReviews = async () => {
    const res = await fetch(`/api/review`);
    if (res.ok) setReviews(await res.json());
  };
  const fetchSessions = async () => {
    const res = await fetch(`/api/chat?pw=${encodeURIComponent(pw)}`, { cache: "no-store" });
    if (res.ok) setSessions(await res.json());
  };

  const login = async () => {
    setLoading(true);
    setError("");
    const ok = await fetchInquiries(pw);
    if (ok) {
      await fetchReviews();
      await fetchSessions();
      setAuthed(true);
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
    setLoading(false);
  };

  // 세션 목록 폴링 (3초)
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(fetchSessions, 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, pw]);

  // 채팅 메시지 폴링 (활성 세션, 3초)
  useEffect(() => {
    if (!authed || !activeSession) return;
    let stopped = false;
    const tick = async () => {
      const res = await fetch(`/api/chat?pw=${encodeURIComponent(pw)}&session=${activeSession}&since=${lastMsgIdRef.current}`, { cache: "no-store" });
      if (!res.ok) return;
      const newMsgs: Msg[] = await res.json();
      if (!Array.isArray(newMsgs) || newMsgs.length === 0) return;
      lastMsgIdRef.current = newMsgs[newMsgs.length - 1].id;
      setChatMsgs(prev => [...prev, ...newMsgs]);
    };
    tick();
    const t = setInterval(() => { if (!stopped) tick(); }, 3000);
    return () => { stopped = true; clearInterval(t); };
  }, [authed, activeSession, pw]);

  // 활성 세션 변경 시 메시지 초기화
  useEffect(() => {
    setChatMsgs([]);
    lastMsgIdRef.current = 0;
  }, [activeSession]);

  // 자동 스크롤
  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMsgs]);

  const sendChat = async () => {
    if (!activeSession || !chatInput.trim() || chatSending) return;
    setChatSending(true);
    const text = chatInput.trim();
    setChatInput("");
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send", pw, session: activeSession, content: text }),
    });
    setChatSending(false);
  };

  const removeSession = async (id: string) => {
    if (!confirm("이 대화방을 삭제할까요? 모든 메시지가 함께 삭제됩니다.")) return;
    setBusy(true);
    await fetch(`/api/chat?pw=${encodeURIComponent(pw)}&session=${id}`, { method: "DELETE" });
    if (activeSession === id) setActiveSession(null);
    await fetchSessions();
    setBusy(false);
  };

  const removeInquiry = async (id: number) => {
    if (!confirm("이 문의를 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&id=${id}`, { method: "DELETE" });
    await fetchInquiries();
    setBusy(false);
  };

  const purgeBots = async () => {
    if (!confirm("SQL 페이로드/봇 패턴이 포함된 문의를 모두 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&purgeBots=1`, { method: "DELETE" });
    await fetchInquiries();
    setBusy(false);
  };

  const submitReview = async () => {
    setPostMsg("");
    if (!content.trim()) { setPostMsg("후기 내용을 입력해주세요."); return; }
    setBusy(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pw, author: author.trim() || "익명", content }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setAuthor(""); setContent("");
      await fetchReviews();
      setPostMsg("등록되었습니다.");
    } else {
      setPostMsg(data?.error || "등록 실패");
    }
    setBusy(false);
  };

  const removeReview = async (id: number) => {
    if (!confirm("이 후기를 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/review?pw=${encodeURIComponent(pw)}&id=${id}`, { method: "DELETE" });
    await fetchReviews();
    setBusy(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs">
          <h1 className="text-lg font-bold text-center mb-6">관리자 로그인</h1>
          <input type="password" placeholder="비밀번호" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3" />
          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
          <button onClick={login} disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-colors disabled:opacity-50"
            style={{ background: PINK }}>
            {loading ? "확인 중..." : "로그인"}
          </button>
        </div>
      </div>
    );
  }

  const chatUnreadTotal = sessions.reduce((s, x) => s + (x.unread_admin || 0), 0);
  const activeSessionData = sessions.find(s => s.id === activeSession);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm">
          <button onClick={() => setTab("chat")}
            className={`flex-1 relative py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === "chat" ? "text-white" : "text-gray-500 hover:bg-gray-50"}`}
            style={tab === "chat" ? { background: PINK } : {}}>
            실시간 채팅 ({sessions.length})
            {chatUnreadTotal > 0 && (
              <span className="absolute top-1 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {chatUnreadTotal > 99 ? "99+" : chatUnreadTotal}
              </span>
            )}
          </button>
          <button onClick={() => setTab("inquiries")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === "inquiries" ? "text-white" : "text-gray-500 hover:bg-gray-50"}`}
            style={tab === "inquiries" ? { background: PINK } : {}}>
            문의 ({inquiries.length})
          </button>
          <button onClick={() => setTab("reviews")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === "reviews" ? "text-white" : "text-gray-500 hover:bg-gray-50"}`}
            style={tab === "reviews" ? { background: PINK } : {}}>
            후기 ({reviews.length})
          </button>
        </div>

        {/* CHAT */}
        {tab === "chat" && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-4">
            {/* 세션 목록 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-bold">대화방</h2>
                <button onClick={fetchSessions} className="text-xs text-pink-600 font-medium hover:underline">새로고침</button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {sessions.length === 0 ? (
                  <p className="p-6 text-xs text-gray-400 text-center">대화방이 없습니다.</p>
                ) : (
                  sessions.map(s => (
                    <button key={s.id}
                      onClick={() => setActiveSession(s.id)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-pink-50/50 transition-colors flex items-start gap-2 ${activeSession === s.id ? "bg-pink-50" : ""}`}>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">{s.visitor_name}</div>
                        <div className="text-[10px] text-gray-400">
                          {new Date(s.last_visitor_at).toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {s.unread_admin > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {s.unread_admin}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* 채팅 패널 */}
            <div className="bg-white rounded-2xl shadow-sm flex flex-col h-[60vh] lg:h-[65vh] overflow-hidden">
              {!activeSession || !activeSessionData ? (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                  왼쪽에서 대화방을 선택하세요.
                </div>
              ) : (
                <>
                  <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                    <div>
                      <div className="text-sm font-bold">{activeSessionData.visitor_name}</div>
                      <div className="text-[10px] text-gray-400">시작: {new Date(activeSessionData.created_at).toLocaleString("ko-KR")}</div>
                    </div>
                    <button onClick={() => removeSession(activeSession)} disabled={busy}
                      className="text-xs text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg disabled:opacity-50">
                      대화방 삭제
                    </button>
                  </div>

                  <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {chatMsgs.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-8">메시지가 없습니다.</p>
                    ) : chatMsgs.map(m => {
                      if (m.sender === "system") {
                        return (
                          <div key={m.id} className="flex justify-center px-2">
                            <div className="max-w-[90%] rounded-xl px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap break-words text-center"
                              style={{ background: "#f3f4f6", color: "#666" }}>
                              <div className="text-[9px] font-bold mb-1 opacity-60">자동 안내</div>
                              {m.content}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                          <div
                            className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words"
                            style={
                              m.sender === "admin"
                                ? { background: PINK, color: "white", borderBottomRightRadius: "6px" }
                                : { background: "white", color: "#333", border: "1px solid #f3d6e0", borderBottomLeftRadius: "6px" }
                            }
                          >
                            {m.content}
                            <div className="text-[9px] opacity-60 mt-1">
                              {new Date(m.created_at).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0">
                    <input
                      type="text"
                      placeholder="답장 입력..."
                      value={chatInput}
                      maxLength={1000}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendChat())}
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none"
                    />
                    <button onClick={sendChat} disabled={!chatInput.trim() || chatSending}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40"
                      style={{ background: PINK }}>
                      전송
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* INQUIRIES */}
        {tab === "inquiries" && (
          <>
            <div className="flex items-center justify-end gap-3 mb-4">
              <button onClick={purgeBots} disabled={busy}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 font-medium">
                봇 일괄 삭제
              </button>
              <button onClick={() => fetchInquiries()} disabled={busy}
                className="text-sm text-pink-600 font-medium hover:underline disabled:opacity-50">
                새로고침
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">아직 문의가 없습니다.</div>
            ) : (
              <div className="space-y-3">
                {inquiries.map(d => (
                  <div key={d.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">{d.name}</div>
                      <a href={`tel:${d.phone}`} className="text-sm block truncate" style={{ color: PINK }}>{d.phone}</a>
                    </div>
                    <div className="text-xs text-gray-400 text-right flex-shrink-0">
                      {new Date(d.created_at).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <button onClick={() => removeInquiry(d.id)} disabled={busy}
                      className="flex-shrink-0 w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                      aria-label="삭제">×</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
              <h2 className="text-sm font-bold mb-4">새 후기 작성</h2>
              <input
                type="text"
                placeholder="작성자명 (예: 김OO 28세 여성)"
                value={author}
                maxLength={30}
                onChange={e => setAuthor(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3"
              />
              <textarea
                placeholder="후기 내용을 입력해주세요..."
                value={content}
                maxLength={2000}
                rows={5}
                onChange={e => setContent(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-3 gap-3">
                {postMsg ? (
                  <p className={`text-xs flex-1 ${postMsg.includes("등록") ? "text-green-600" : "text-red-500"}`}>{postMsg}</p>
                ) : (
                  <span className="text-xs text-gray-400 flex-1">{content.length}/2000</span>
                )}
                <button onClick={submitReview} disabled={busy || !content.trim()}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-40"
                  style={{ background: PINK }}>
                  {busy ? "등록 중..." : "등록"}
                </button>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">아직 등록된 후기가 없습니다.</div>
            ) : (
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-bold text-sm" style={{ color: "#333" }}>{r.author}</div>
                      <button onClick={() => removeReview(r.id)} disabled={busy}
                        className="flex-shrink-0 text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="삭제">삭제</button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words text-gray-600 leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
