"use client";
import ChatWidget from "@/components/ChatWidget";
import { EventBanner, Navbar, Footer } from "@/sections";
import { RainbowOrbs, Sparkles } from "@/components/PremiumDeco";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      {/* ─── 페이지 전역 fixed 캔버스 (배경 끊김 방지) ─── */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(180deg, #fff8fb 0%, #fffafc 30%, #fff5f9 60%, #fef9fb 100%)"
        }}
      />
      {/* 페이지 전역 fixed 데코 (orbs + sparkles, 스크롤 따라옴 — 연속성) */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <RainbowOrbs />
        <Sparkles count={10} />
      </div>

      <EventBanner />
      <Navbar />
      {children}
      <Footer />
      <ChatWidget />
    </main>
  );
}
