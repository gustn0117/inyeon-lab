"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import SubPageHero from "@/components/SubPageHero";
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

function PricingUsp() {
  const items = [
    { t: "여성 1회 무료", d: "첫 매칭 이벤트 진행 중" },
    { t: "100% 후불제", d: "매칭 성사 시에만 결제" },
    { t: "대면 소개팅 보장", d: "실제 만남까지 책임" },
  ];
  return (
    <section className="pb-10 sm:pb-14 -mt-2" style={{ background: "white" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-3 gap-3">
          {items.map((b, i) => (
            <div key={i} className="rounded-2xl p-4 bg-white border border-pink-100 shadow-sm text-center">
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
      <SubPageHero
        eyebrow="PRICING"
        title={<>가입비 0원,<br /><span className="text-gradient">매칭 후 결제</span></>}
        sub="여성 회원은 첫 매칭 1회 무료. 모든 만남은 대면 소개팅으로 보장됩니다."
      />
      <PricingUsp />
      <PricingSection />
      <ProcessSection />
      <FeaturesSection />
      <ConsultSection />
    </PageShell>
  );
}
