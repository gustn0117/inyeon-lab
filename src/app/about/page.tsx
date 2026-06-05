"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import SubPageHero from "@/components/SubPageHero";
import { AppleAbout, AppleMemberJobs, ApplePromise, AppleSafety } from "@/sections/apple";

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

export default function AboutPage() {
  useReveal();
  return (
    <PageShell>
      <SubPageHero
        eyebrow="ABOUT"
        title={<>인연연구소를<br /><span className="text-gradient">소개합니다.</span></>}
        sub="결혼정보회사도, 가벼운 앱도 아닌 그 중간 — 검증된 만남을 부담 없이."
      />
      <AppleAbout />
      <AppleMemberJobs />
      <ApplePromise />
      <AppleSafety />
    </PageShell>
  );
}
