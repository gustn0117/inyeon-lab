"use client";
import { useEffect, useState } from "react";
import { IconHeart } from "@/components/Icons";

/* ═══ MobileStickyCTA — 모바일 하단 고정 CTA (스크롤 후 등장) ═══ */
export default function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hero 절반 이상 지나면 등장
      setShow(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-3 left-3 right-3 z-50 sm:hidden transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <a
        href="/ideal-match"
        className="btn btn-gradient w-full rounded-full font-bold shadow-2xl py-3.5"
      >
        <IconHeart size={20} />
        이상형 매칭 진단 →
      </a>
    </div>
  );
}
