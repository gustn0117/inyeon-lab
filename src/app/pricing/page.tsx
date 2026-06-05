"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import { PricingSection, ProcessSection, ConsultSection, FeaturesSection } from "@/sections";

const PINK = "#d4567a";

function useReveal() {
  useEffect(() => {
    document.body.classList.add("reveal-ready");
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function PricingHero() {
  return (
    <section className="pt-24 sm:pt-28 pb-10 sm:pb-14 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff5f8, #ffffff)" }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "#ffd6e1" }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: `${PINK}10`, color: PINK }}>
          <span className="text-[11px] font-bold tracking-widest">PRICING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#222", fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
          가입비 0원,<br />매칭이 되어야 결제합니다
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#666" }}>
          여성 회원은 <strong style={{ color: PINK }}>첫 매칭 1회 무료</strong>로 시작하실 수 있고,<br />
          모든 만남은 <strong style={{ color: PINK }}>대면 소개팅으로 보장</strong>됩니다.
        </p>

        {/* 3 USP 카드 */}
        <div className="grid sm:grid-cols-3 gap-3 mt-10 max-w-2xl mx-auto">
          {[
            { t: "여성 1회 무료", d: "첫 매칭 이벤트 진행 중" },
            { t: "100% 후불제", d: "매칭 성사 시에만 결제" },
            { t: "대면 소개팅 보장", d: "실제 만남까지 책임" },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl p-4 bg-white border border-pink-100 shadow-sm">
              <div className="text-sm font-extrabold mb-1" style={{ color: PINK }}>{b.t}</div>
              <div className="text-[11.5px]" style={{ color: "#888" }}>{b.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  useReveal();
  return (
    <PageShell>
      <PricingHero />
      <PricingSection />
      <ProcessSection />
      <FeaturesSection />
      <ConsultSection />
    </PageShell>
  );
}
