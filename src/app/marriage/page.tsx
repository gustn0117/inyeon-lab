"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import SubPageHero from "@/components/SubPageHero";
import MarriageMatch from "@/components/MarriageMatch";

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

export default function MarriagePage() {
  useReveal();
  return (
    <PageShell>
      <SubPageHero
        eyebrow="MARRIAGE MATCHING"
        title={<>결혼 목적 매칭,<br /><span className="text-rainbow">결정사보다 가볍게.</span></>}
        sub="학력·연봉·종교·직업까지 반영하는 결정사식 정밀 매칭. 성혼비 없이, 최저가로 시작하세요. 일반 소개팅과 별도로 신청받습니다."
      />
      <MarriageMatch />
    </PageShell>
  );
}
