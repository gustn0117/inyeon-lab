"use client";

import { OPEN_CHAT_EVENT } from "@/lib/contact";

// 서버 컴포넌트 안에서 실시간 채팅 상담 창을 여는 버튼 (창은 QuickActions의 ChatWidget)
export default function ChatButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))} aria-haspopup="dialog">{children}</button>;
}
