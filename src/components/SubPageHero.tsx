"use client";
import { BurstStar } from "@/components/PremiumDeco";

type Props = { eyebrow?: string; title: React.ReactNode; sub?: string };

export default function SubPageHero({ eyebrow, title, sub }: Props) {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-8 sm:pb-12">
      <div className="container-apple text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-full glass-card ring-glow">
            <BurstStar size={14} />
            <span className="label-sm text-rainbow">{eyebrow}</span>
          </div>
        )}
        <h1 className="h-section font-bold text-ink mb-6 text-glow-multi" style={{ fontWeight: 700 }}>
          {title}
        </h1>
        {sub && (
          <p className="text-lg sm:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed font-medium">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
