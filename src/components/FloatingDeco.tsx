"use client";

const PINK = "#d4567a";
const GOLD = "#c9956b";

const Sparkle = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1l2.5 7L21 9.5l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7L3 9.5 9.5 8 12 1z" />
  </svg>
);

const Petal = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c0 6 6 8 6 12 0 3.314-2.686 6-6 6s-6-2.686-6-6c0-4 6-6 6-12z" opacity="0.85" />
  </svg>
);

const Ring = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

type Item = { top?: string; left?: string; right?: string; bottom?: string; size?: number; type: "sparkle" | "petal" | "ring"; delay?: string; color?: string; opacity?: number; anim?: "drift" | "twinkle" | "float-slow" };

const DEFAULT: Item[] = [
  { top: "12%", left: "8%", type: "sparkle", size: 16, color: PINK, opacity: 0.45, anim: "twinkle", delay: "0s" },
  { top: "20%", right: "10%", type: "petal", size: 22, color: PINK, opacity: 0.18, anim: "drift", delay: "1s" },
  { top: "55%", left: "6%", type: "ring", size: 18, color: GOLD, opacity: 0.35, anim: "float-slow", delay: "0.5s" },
  { bottom: "18%", right: "8%", type: "sparkle", size: 12, color: GOLD, opacity: 0.55, anim: "twinkle", delay: "2s" },
  { bottom: "28%", left: "12%", type: "petal", size: 16, color: PINK, opacity: 0.22, anim: "drift", delay: "3s" },
  { top: "40%", right: "5%", type: "sparkle", size: 10, color: PINK, opacity: 0.5, anim: "twinkle", delay: "1.5s" },
  { top: "70%", left: "85%", type: "ring", size: 14, color: PINK, opacity: 0.3, anim: "float-slow", delay: "2.5s" },
  { top: "8%", left: "45%", type: "sparkle", size: 8, color: GOLD, opacity: 0.6, anim: "twinkle", delay: "0.8s" },
];

export default function FloatingDeco({ items = DEFAULT }: { items?: Item[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((it, i) => {
        const animClass = it.anim === "drift" ? "anim-drift" : it.anim === "twinkle" ? "anim-twinkle" : "anim-float-slow";
        const Icon = it.type === "petal" ? Petal : it.type === "ring" ? Ring : Sparkle;
        return (
          <span
            key={i}
            className={`absolute ${animClass}`}
            style={{
              top: it.top, left: it.left, right: it.right, bottom: it.bottom,
              color: it.color ?? PINK,
              opacity: it.opacity ?? 0.4,
              animationDelay: it.delay,
            }}
          >
            <Icon s={it.size} />
          </span>
        );
      })}
    </div>
  );
}
