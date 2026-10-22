"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatCircleDots, PaperPlaneRight, X } from "@phosphor-icons/react";
import { OPEN_CHAT_EVENT } from "@/lib/contact";
import c from "./coaching/chat.module.css";

type Msg = { id: number; sender: "visitor" | "admin" | "system"; content: string; created_at: string; pending?: boolean };
export type ChatState = { open: boolean; unread: number };

const STORAGE_KEY = "inyeon_chat";
const URL_RE = /(https?:\/\/[^\s]+)/g;

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

// 안내 메시지 속 주소(예전 대화에 남은 링크 등)는 눌러서 열 수 있게 한다.
function Linkified({ text }: { text: string }) {
  return <>{text.split(URL_RE).map((part, i) => i % 2 ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part)}</>;
}

// 실시간 채팅 상담 창. 여는 버튼은 페이지 곳곳에서 OPEN_CHAT_EVENT를 보내고, 열림·새 답변 수는 onStateChange로 알린다.
export default function ChatWidget({ onStateChange }: { onStateChange?: (state: ChatState) => void }) {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [unread, setUnread] = useState(0);
  const lastIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const closeChat = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  useEffect(() => { onStateChange?.({ open, unread }); }, [onStateChange, open, unread]);

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
    } catch {}
  }, []);

  // 페이지의 '채팅 상담' 버튼으로 열기
  useEffect(() => {
    const openChat = () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    };
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openChat);
  }, []);

  // 폴링 (열렸든 닫혔든 새 답변 알림을 위해 동작)
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

  // 자동 스크롤 + 열면 새 답변 수 0
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
    setUnread(0);
  }, [msgs, open]);

  // 대화상자 초기 초점, Escape 닫기, Tab 초점 순환
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusableSelector = "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";
    const focusTimer = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChat();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeChat, open]);

  // textarea 자동 높이 (최대 3줄)
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const max = 88; // 약 3줄
    ta.style.height = Math.min(ta.scrollHeight, max) + "px";
  }, [input]);

  const startSession = async () => {
    if (starting) return;
    const trimmed = draftName.trim().slice(0, 20) || "방문자";
    setStarting(true);
    setStartError(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", name: trimmed }),
      });
      const data = res.ok ? await res.json() : null;
      if (!data?.session_id) throw new Error("채팅 시작 실패");
      setSessionId(data.session_id);
      setName(data.visitor_name ?? trimmed);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId: data.session_id, name: data.visitor_name ?? trimmed })); } catch {}
      window.fbq?.("track", "Lead");
    } catch {
      setStartError(true);
    }
    setStarting(false);
  };

  const send = async () => {
    if (!sessionId) return;
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setSendError(false);

    // 낙관적 업데이트: 즉시 화면에 임시 메시지 추가
    const tempId = -Date.now();
    setMsgs(prev => [...prev, { id: tempId, sender: "visitor", content: text, created_at: new Date().toISOString(), pending: true }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", session: sessionId, content: text }),
      });
      if (!res.ok) throw new Error("메시지 전송 실패");
    } catch {
      // 실패 시 임시 메시지 제거 + 입력 복구
      setMsgs(prev => prev.filter(m => m.id !== tempId));
      setInput(text);
      setSendError(true);
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

  if (!open) return null;

  return (
    <div id="inyeon-chat-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-label="인연연구소 실시간 채팅 상담" className={c.panel}>
      <div className={c.head}>
        <span className={c.avatar} aria-hidden="true"><ChatCircleDots size={21} weight="fill" /><i /></span>
        <div className={c.headText}>
          <strong>인연연구소 상담 <small>LIVE CHAT</small></strong>
          <span>실시간 채팅 상담</span>
        </div>
        <button ref={closeButtonRef} type="button" onClick={closeChat} className={c.close} aria-label="채팅 닫기"><X size={18} /></button>
      </div>

      {!sessionId ? (
        <div className={c.start}>
          <p className={c.hello}>안녕하세요!</p>
          <p className={c.intro}>인연연구소 상담사가 직접 답변드려요.<br />어떻게 불러드리면 될까요?</p>
          <label htmlFor="inyeon-chat-name" className="sr-only">호칭 (선택)</label>
          <input
            id="inyeon-chat-name"
            type="text"
            placeholder="호칭 입력 (선택)"
            value={draftName}
            maxLength={20}
            onChange={e => setDraftName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) startSession(); }}
            className={c.input}
          />
          <button type="button" onClick={startSession} disabled={starting} className={c.startButton}>{starting ? "연결 중…" : "상담 시작하기"}</button>
          {startError && <p className={c.error} role="alert">연결이 원활하지 않아요. 잠시 후 다시 시도하거나 카카오톡으로 문의해주세요.</p>}
          <p className={c.privacy}>남겨주신 내용은 상담 외 목적으로 사용하지 않습니다.</p>
        </div>
      ) : (
        <>
          <div ref={scrollRef} className={c.messages} aria-live="polite">
            <p className={c.welcome}>{name}님, 환영합니다.</p>
            {groupedMsgs.map(m => m.sender === "system"
              ? <div key={m.id} className={c.system}><Linkified text={m.content} /></div>
              : <div key={m.id} className={`${c.row} ${m.sender === "visitor" ? c.mine : ""} ${m.isSameAsPrev ? c.grouped : ""}`}>
                  <div className={c.bubble} data-pending={m.pending || undefined}><Linkified text={m.content} /></div>
                  {m.showTime && <time dateTime={m.created_at}>{m.pending ? "전송 중…" : fmtTime(m.created_at)}</time>}
                </div>)}
          </div>

          <div className={c.composer}>
            <div className={c.inputRow}>
              <label htmlFor="inyeon-chat-message" className="sr-only">메시지</label>
              <textarea
                id="inyeon-chat-message"
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
                className={c.textarea}
              />
              <button type="button" onClick={send} disabled={!input.trim() || sending} className={c.send} aria-label="전송"><PaperPlaneRight size={17} weight="fill" /></button>
            </div>
            <div className={c.hint}>
              <span>Enter 전송 · Shift + Enter 줄바꿈</span>
              {input.length > 800 && <span>{input.length}/1000</span>}
            </div>
            {sendError && <p className={c.error} role="alert">메시지를 보내지 못했어요. 다시 시도해주세요.</p>}
          </div>
        </>
      )}
    </div>
  );
}
