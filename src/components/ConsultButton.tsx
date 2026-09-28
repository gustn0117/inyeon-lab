"use client";

import { ChatIcon } from "@/components/SiteIcons";
import { OPEN_CHAT_EVENT } from "@/lib/contact";

type Props = {
  className?: string;
  label?: string;
  /** 좁은 화면에서 CSS로 숨길 수 있는 뒷부분 (예: "상담" + "하기") */
  tail?: string;
};

export default function ConsultButton({ className, label = "상담", tail = "하기" }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
    >
      <ChatIcon />
      <span>
        {label}
        {tail && <span data-tail="">{tail}</span>}
      </span>
    </button>
  );
}
