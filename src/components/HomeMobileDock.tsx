"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/components/renewal.module.css";

/* ═══ HomeMobileDock — 모바일 전용 하단 고정 안내 바 (히어로 지나면 등장, 푸터 근처에서 숨김) ═══ */
export default function HomeMobileDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      // 마지막 CTA 섹션(큰 남성/여성 버튼)이 화면에 들어오면 도크는 숨겨 중복을 피함
      const finalSection = document.getElementById("home-final");
      const finalInView = finalSection
        ? finalSection.getBoundingClientRect().top < window.innerHeight - 120
        : window.innerHeight + y > document.documentElement.scrollHeight - 520;
      setShow(y > 620 && !finalInView);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className={`${styles.homeMobileDock} ${show ? styles.homeMobileDockShow : ""}`}
      aria-label="성별별 안내 바로가기"
      aria-hidden={!show}
    >
      <Link href="/men" className={styles.homeMobileDockMen} tabIndex={show ? 0 : -1}>
        <small>FOR MEN</small>남성 안내
      </Link>
      <Link href="/women" className={styles.homeMobileDockWomen} tabIndex={show ? 0 : -1}>
        <small>FOR WOMEN</small>여성 안내
      </Link>
    </nav>
  );
}
