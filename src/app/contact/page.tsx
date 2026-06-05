"use client";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
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
      <ContactSection />
      <FAQSection />
    </PageShell>
  );
}
