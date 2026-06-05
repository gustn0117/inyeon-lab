"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import SubPageHero from "@/components/SubPageHero";
import { ContactSection, FAQSection } from "@/sections";

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

export default function ContactPage() {
  useReveal();
  return (
    <PageShell>
      <SubPageHero
        eyebrow="CONTACT"
        title={<><span className="text-gradient">상담</span>·문의</>}
        sub="카톡으로 가장 빠르게 답변드려요"
      />
      <ContactSection />
      <FAQSection />
    </PageShell>
  );
}
