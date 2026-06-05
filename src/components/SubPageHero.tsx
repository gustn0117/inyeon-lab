"use client";

type Props = { eyebrow?: string; title: React.ReactNode; sub?: string };

export default function SubPageHero({ eyebrow, title, sub }: Props) {
  return (
    <section className="bg-base pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16">
      <div className="container-apple text-center">
        {eyebrow && <div className="label-sm mb-6">{eyebrow}</div>}
        <h1 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
          {title}
        </h1>
        {sub && (
          <p className="text-lg sm:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
