"use client";
import { useEffect, useRef, useState } from "react";

/* ═══ CountUp — IntersectionObserver 기반 숫자 카운트업 ═══ */
type Props = {
  end: number;          // 목표 숫자
  duration?: number;    // ms
  suffix?: string;      // "+" 또는 "h"
  prefix?: string;
  format?: "comma" | "ratio" | "plain";  // 9,999+ / 51:49 / 100
  className?: string;
};

export default function CountUp({ end, duration = 1200, suffix = "", prefix = "", format = "comma", className = "" }: Props) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (done) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setVal(Math.round(end * eased));
              if (t < 1) requestAnimationFrame(tick);
              else setDone(true);
            };
            requestAnimationFrame(tick);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, done]);

  const formatted =
    format === "comma" ? val.toLocaleString() :
    format === "ratio" ? `${val}` : // ratio는 호출쪽에서 두 번 사용
    String(val);

  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}
