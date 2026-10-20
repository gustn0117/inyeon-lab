"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import v from "./visual.module.css";

export default function EditorialMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add(v.revealEntered);
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    document.querySelectorAll("[data-editorial-reveal]").forEach(element => {
      element.classList.add(v.revealPending);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
