"use client";
import { useEffect, useState } from "react";

/* ═══ ScrollProgress — 상단 핑크 진행률 바 ═══ */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, #ec4d7e 0%, #fb7185 50%, #ff8da8 100%)",
          boxShadow: "0 0 12px rgba(236, 77, 126, 0.5)",
        }}
      />
    </div>
  );
}
