"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { id: number; sender: "visitor" | "admin" | "system"; content: string; created_at: string; pending?: boolean };

const PINK = "#d4567a";
const STORAGE_KEY = "inyeon_chat";
const TOOLTIP_KEY = "inyeon_chat_tip_seen";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const [tooltipShown, setTooltipShown] = useState(false);
  const lastIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // 세션 복구
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { sessionId: sid, name: n } = JSON.parse(raw) as { sessionId?: string; name?: string };
        if (sid) {
          setSessionId(sid);
          setName(n ?? "방문자");
        }
      }
      // 첫 방문 시 8초 후 툴팁 띄움
      if (!localStorage.getItem(TOOLTIP_KEY)) {
        const t = setTimeout(() => setTooltipShown(true), 8000);
        return () => clearTimeout(t);
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
        setMsgs(prev => {
          // 낙관적으로 추가했던 임시 메시지(pending)와 중복되는 진짜 메시지 dedupe
          const filtered = prev.filter(p => !(p.pending && newMsgs.some(n => n.sender === p.sender && n.content === p.content)));
          return [...filtered, ...newMsgs];
        });
        if (!open) {
          const adminNew = newMsgs.filter(m => m.sender === "admin").length;
          if (adminNew) setUnread(u => u + adminNew);
        }
      } catch {}
    };
    tick();
    const t = setInterval(() => { if (!stopped) tick(); }, 3000);
    return () => { stopped = true; clearInterval(t); };
  }, [sessionId, open]);

  // 자동 스크롤 + open 시 unread 0
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setUnread(0);
    // 열면 툴팁 숨기고 본 것으로 표시
    setTooltipShown(false);
    try { localStorage.setItem(TOOLTIP_KEY, "1"); } catch {}
  }, [msgs, open]);

  // textarea 자동 높이 (최대 3줄)
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const max = 88; // 약 3줄
    ta.style.height = Math.min(ta.scrollHeight, max) + "px";
  }, [input]);

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

    // 낙관적 업데이트: 즉시 화면에 임시 메시지 추가
    const tempId = -Date.now();
    setMsgs(prev => [...prev, { id: tempId, sender: "visitor", content: text, created_at: new Date().toISOString(), pending: true }]);
    setInput("");

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", session: sessionId, content: text }),
      });
    } catch {
      // 실패 시 임시 메시지 제거 + 입력 복구
      setMsgs(prev => prev.filter(m => m.id !== tempId));
      setInput(text);
    }
    setSending(false);
  };

  // 메시지 그룹핑: 직전 메시지와 같은 sender 인지 (간격 좁힘 + 시간 한 번만)
  const groupedMsgs = msgs.map((m, i) => {
    const prev = msgs[i - 1];
    const next = msgs[i + 1];
    const isSameAsPrev = prev && prev.sender === m.sender && prev.sender !== "system";
    const isSameAsNext = next && next.sender === m.sender && next.sender !== "system";
    const showTime = !isSameAsNext; // 같은 발신자가 연속이면 마지막에만 시간 표시
    return { ...m, isSameAsPrev, showTime };
  });

  return (
    <>
      {/* 플로팅 버튼 */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90]">
        {/* 첫 방문 안내 풍선 */}
        {tooltipShown && !open && !sessionId && (
          <div className="absolute right-16 bottom-1 bg-white rounded-2xl shadow-xl px-4 py-2.5 animate-pulse-soft" style={{ animation: "float-in 0.4s ease-out", whiteSpace: "nowrap" }}>
            <div className="text-[12px] font-bold" style={{ color: "#333" }}>실시간 상담 가능</div>
            <div className="text-[10px]" style={{ color: "#999" }}>365일 · 밤 12시까지</div>
            <div className="absolute right-[-6px] bottom-3 w-3 h-3 bg-white transform rotate-45" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group"
          style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
          aria-label={open ? "채팅 닫기" : "실시간 채팅 열기"}
        >
          {/* 펄스 링 (첫 방문 시) */}
          {tooltipShown && !open && (
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: PINK, opacity: 0.4 }} />
          )}

          {open ? (
            <svg className="w-5 h-5 text-white relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          )}
          {unread > 0 && !open && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>
      </div>

      {/* 채팅 패널 */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-7 z-[95] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[75vh] sm:max-h-[600px] rounded-2xl bg-white shadow-2xl border border-pink-50 flex flex-col overflow-hidden"
          style={{ animation: "slide-up 0.25s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* 헤더 */}
          <div className="relative flex items-center gap-3 px-5 py-4 text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
            <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {/* 온라인 점 */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold flex items-center gap-1.5">
                인연연구소 상담
                <span className="text-[10px] font-medium bg-white/20 px-1.5 py-px rounded">ONLINE</span>
              </div>
              <div className="text-[10px] text-white/85">실시간 채팅 상담</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="채팅 닫기"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 본문 */}
          {!sessionId ? (
            <div className="p-7 flex-1 flex flex-col justify-center bg-gradient-to-b from-pink-50/40 to-white">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <p className="text-base font-extrabold mb-1.5 text-center" style={{ color: "#222" }}>안녕하세요!</p>
              <p className="text-xs text-center mb-6 leading-relaxed" style={{ color: "#888" }}>
                인연연구소 매칭 전문사가 답변드릴게요.<br />어떻게 불러드리면 될까요?
              </p>
              <input
                type="text"
                placeholder="호칭 입력 (선택)"
                value={draftName}
                maxLength={20}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) startSession(); }}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3"
              />
              <button
                onClick={startSession}
                className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 shadow-md"
                style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
              >
                상담 시작하기
              </button>
              <p className="text-[10px] text-center mt-4" style={{ color: "#bbb" }}>
                개인정보는 매칭 외 목적으로 사용되지 않습니다.
              </p>
            </div>
          ) : (
            <>
              {/* 메시지 영역 */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50/40" style={{ scrollBehavior: "smooth" }}>
                <div className="text-center text-[11px] py-2 mb-2" style={{ color: "#aaa" }}>
                  {name}님, 환영합니다.
                </div>
                {groupedMsgs.map(m => {
                  if (m.sender === "system") {
                    return (
                      <div key={m.id} className="flex justify-center px-2 my-2.5">
                        <div className="max-w-[92%] rounded-xl px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap break-words text-center"
                          style={{ background: "#f3f4f6", color: "#666", border: "1px solid #e5e7eb" }}>
                          {m.content}
                        </div>
                      </div>
                    );
                  }
                  const isVisitor = m.sender === "visitor";
                  return (
                    <div key={m.id} className={`flex ${isVisitor ? "justify-end" : "justify-start"} ${m.isSameAsPrev ? "mt-0.5" : "mt-3"}`}>
                      <div className="flex flex-col max-w-[78%]" style={{ alignItems: isVisitor ? "flex-end" : "flex-start" }}>
                        <div
                          className="rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words shadow-sm"
                          style={
                            isVisitor
                              ? {
                                  background: PINK,
                                  color: "white",
                                  borderBottomRightRadius: m.isSameAsPrev ? "16px" : "6px",
                                  opacity: m.pending ? 0.65 : 1,
                                }
                              : {
                                  background: "white",
                                  color: "#333",
                                  border: "1px solid #f3d6e0",
                                  borderBottomLeftRadius: m.isSameAsPrev ? "16px" : "6px",
                                }
                          }
                        >
                          {m.content}
                        </div>
                        {m.showTime && (
                          <div className="text-[9.5px] mt-1 px-1" style={{ color: "#aaa" }}>
                            {m.pending ? "전송 중..." : fmtTime(m.created_at)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 입력 영역 */}
              <div className="border-t border-pink-50 p-3 bg-white flex-shrink-0">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={taRef}
                    placeholder="메시지를 입력하세요"
                    value={input}
                    maxLength={1000}
                    rows={1}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      // 한글 IME 조합 중에는 Enter 무시 (조합 완료 후 한 박자 늦게 전송되는 문제 방지)
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    className="flex-1 rounded-xl px-3.5 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none resize-none leading-snug"
                    style={{ minHeight: "40px", maxHeight: "88px" }}
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || sending}
                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-30 hover:scale-105 active:scale-95 shadow-md"
                    style={{
                      background: input.trim() ? `linear-gradient(135deg, ${PINK}, #e8457f)` : "#d1d5db",
                    }}
                    aria-label="전송"
                  >
                    <svg className="w-4 h-4 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className="text-[9.5px]" style={{ color: "#bbb" }}>Enter 전송 · Shift + Enter 줄바꿈</span>
                  {input.length > 800 && (
                    <span className="text-[9.5px]" style={{ color: input.length >= 1000 ? "#ef4444" : "#bbb" }}>
                      {input.length}/1000
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
