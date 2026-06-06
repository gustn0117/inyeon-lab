"use client";
import { Sparkle, HandUnderline } from "@/components/Icons";

type Props = { eyebrow?: string; title: React.ReactNode; sub?: string };

export default function SubPageHero({ eyebrow, title, sub }: Props) {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-8 sm:pb-12">
      <div className="container-apple text-center">
        {eyebrow && (
          <div className="eyebrow-lined mb-4 mx-auto">{eyebrow}</div>
        )}
        <h1 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
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
