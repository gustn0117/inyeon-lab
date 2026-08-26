"use client";

import { useEffect, useState } from "react";
import styles from "@/components/renewal.module.css";

export default function StickyApplyButton({ label }: { label: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = [
      ...Array.from(document.querySelectorAll("[data-floating-ui-guard]")),
      ...Array.from(document.querySelectorAll("footer")),
    ];
    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleTargets.add(entry.target);
          else visibleTargets.delete(entry.target);
        });
        setHidden(visibleTargets.size > 0);
      },
      { threshold: 0.01 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`${styles.stickyApply} ${hidden ? styles.stickyApplyHidden : ""}`}
      href="#apply"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      {label}
      <span aria-hidden="true">↓</span>
    </a>
  );
}
