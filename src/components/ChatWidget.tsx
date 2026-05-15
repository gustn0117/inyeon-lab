"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { id: number; sender: "visitor" | "admin" | "system"; content: string; created_at: string };

const PINK = "#d4567a";
const STORAGE_KEY = "inyeon_chat";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const lastIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 세션 복구
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const { sessionId: sid, name: n } = JSON.parse(raw) as { sessionId?: string; name?: string };
      if (sid) {
        setSessionId(sid);
        setName(n ?? "방문자");
      }
    } catch {}
  }, []);

  // 폴링 (열렸든 닫혔든 unread 알림 위해 동작)
  useEffect(() => {
    if (!sessionId) return;
    let stopped = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/chat?session=${sessionId}&since=${lastIdRef.current}`, { cache: "no-store" });
        if (!res.ok) return;
        const newMsgs: Msg[] = await res.json();
        if (!Array.isArray(newMsgs) || newMsgs.length === 0) return;
        lastIdRef.current = newMsgs[newMsgs.length - 1].id;
        setMsgs(prev => [...prev, ...newMsgs]);
        if (!open) {
          // 시스템/방문자 본인 메시지는 unread 제외, 관리자 답변만 카운트
          const adminNew = newMsgs.filter(m => m.sender === "admin").length;
          if (adminNew) setUnread(u => u + adminNew);
        }
      } catch {}
    };
    tick();
    const t = setInterval(() => { if (!stopped) tick(); }, 3000);
    return () => { stopped = true; clearInterval(t); };
  }, [sessionId, open]);

  // 자동 스크롤
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    if (open) setUnread(0);
  }, [msgs, open]);

  const startSession = async () => {
    const trimmed = draftName.trim().slice(0, 20) || "방문자";
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", name: trimmed }),
    });
    if (!res.ok) return;
    const data = await res.json();
    if (!data?.session_id) return;
    setSessionId(data.session_id);
    setName(data.visitor_name ?? trimmed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId: data.session_id, name: data.visitor_name ?? trimmed }));
    window.fbq?.("track", "Lead");
  };

  const send = async () => {
    if (!sessionId) return;
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput("");
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", session: sessionId, content: text }),
      });
    } catch {}
    setSending(false);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
        aria-label="실시간 채팅 열기"
      >
        {open ? (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {/* 채팅 패널 */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-7 z-[95] w-[calc(100vw-2rem)] sm:w-[360px] max-h-[70vh] rounded-2xl bg-white shadow-2xl border border-pink-50 flex flex-col overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-5 py-4 text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold">인연연구소 실시간 상담</div>
              <div className="text-[10px] text-white/80">365일 · 밤 12시까지 답변</div>
            </div>
          </div>

          {/* 본문 */}
          {!sessionId ? (
            <div className="p-6 flex-1 flex flex-col justify-center">
              <p className="text-sm font-bold mb-1.5 text-gray-800">안녕하세요!</p>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">상담을 시작하기 전, 호칭을 알려주세요.<br />입력하지 않으셔도 시작할 수 있습니다.</p>
              <input
                type="text"
                placeholder="호칭 (선택)"
                value={draftName}
                maxLength={20}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && startSession()}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3"
              />
              <button
                onClick={startSession}
                className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
              >
                상담 시작하기
              </button>
            </div>
          ) : (
            <>
              {/* 메시지 영역 */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                <div className="text-center text-[11px] text-gray-400 py-2">
                  {name}님, 환영합니다.
                </div>
                {msgs.map(m => {
                  if (m.sender === "system") {
                    return (
                      <div key={m.id} className="flex justify-center px-2">
                        <div className="max-w-[90%] rounded-xl px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap break-words text-center"
                          style={{ background: "#f3f4f6", color: "#666" }}>
                          {m.content}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={m.id} className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words"
                        style={
                          m.sender === "visitor"
                            ? { background: PINK, color: "white", borderBottomRightRadius: "6px" }
                            : { background: "white", color: "#333", border: "1px solid #f3d6e0", borderBottomLeftRadius: "6px" }
                        }
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 입력 영역 */}
              <div className="border-t border-pink-50 p-3 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요"
                  value={input}
                  maxLength={1000}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || sending}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
                  aria-label="전송"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
