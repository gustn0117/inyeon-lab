"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/sectionNav.module.css";

const SECTIONS = [
  { id: "guide", label: "회원 안내" },
  { id: "process", label: "서비스 소개" },
  { id: "pricing", label: "가격 안내" },
  { id: "faq", label: "FAQ" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = listRef.current?.closest("header");
    let frame = 0;

    // The last section whose top has passed under the sticky header is the current one.
    const update = () => {
      frame = 0;
      const line = (header?.getBoundingClientRect().bottom ?? 0) + 8;
      let current: string | null = null;
      for (const { id } of SECTIONS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const link = active ? list?.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.sectionNav} aria-label="페이지 바로가기">
      <div className={styles.list} ref={listRef}>
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            data-section={id}
            className={`${styles.link} ${active === id ? styles.active : ""}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
