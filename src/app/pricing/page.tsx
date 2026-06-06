"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import SubPageHero from "@/components/SubPageHero";
import { ApplePricing, AppleProcess, AppleFeatures, AppleConsult } from "@/sections/apple";
import WhyAfterpay from "@/components/WhyAfterpay";
import Compare from "@/components/Compare";
import MatchPromise from "@/components/MatchPromise";
import MainFAQ from "@/components/MainFAQ";
import FinalCTA from "@/components/FinalCTA";

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

export default function PricingPage() {
  useReveal();
  return (
    <PageShell>
      <SubPageHero
        eyebrow="PRICING"
        title={<>가입비 0원,<br /><span className="text-rainbow">매칭 후 결제.</span></>}
        sub="여성 회원은 첫 매칭 1회 무료. 모든 만남은 대면 소개팅으로 보장됩니다."
      />
      <ApplePricing />
      <WhyAfterpay />
      <AppleProcess />
      <Compare />
      <MatchPromise />
      <AppleFeatures />
      <MainFAQ />
      <AppleConsult />
      <FinalCTA />
    </PageShell>
  );
}
