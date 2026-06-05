"use client";

const PINK = "#d4567a";

type Props = { eyebrow?: string; title: React.ReactNode; sub?: string };

export default function SubPageHero({ eyebrow, title, sub }: Props) {
  return (
    <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 relative overflow-hidden mesh-cream">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "#ffd6e1" }} />
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: "#e6c89f", opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: `${PINK}10`, color: PINK }}>
            <span className="text-[11px] font-bold tracking-widest">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-impact text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] tracking-tight mb-3" style={{ color: "#1a1614", lineHeight: 1.15 }}>
          {title}
        </h1>
        {sub && (
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#666" }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
