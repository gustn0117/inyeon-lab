"use client";
import { useState } from "react";

/* ═══ KakaoCopyButton — 클릭 시 카톡 ID 복사 + 피드백 ═══ */
const KAKAO_ID = "inyeon_";

type Props = { variant?: "yellow" | "pill"; className?: string };

export default function KakaoCopyButton({ variant = "yellow", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID);
    } catch {
      // Clipboard API 실패 시 fallback
      const ta = document.createElement("textarea");
      ta.value = KAKAO_ID;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-yellow-300 text-[#3C1E1E] font-bold text-sm hover:scale-[1.02] transition-transform ${className}`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
        {copied ? "복사됨!" : "카톡 ID inyeon_"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`btn bg-yellow-300 text-[#3C1E1E] hover:bg-yellow-400 w-full sm:w-auto shadow-md font-bold ${className}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
      {copied ? "ID가 복사되었어요!" : "카톡 친구 추가하기"}
    </button>
  );
}
