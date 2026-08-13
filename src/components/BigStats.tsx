"use client";
import { IconCouple, IconHeart, IconCalendar, IconBadge, Sparkle, HandUnderline } from "@/components/Icons";
import CountUp from "@/components/CountUp";

/* ═══ BIG STATS — CountUp + 3D tilt 카드 ═══ */
type Stat = { l: string; sub: string; Icon: any; render: () => React.ReactNode };
const stats: Stat[] = [
  { l: "누적 상담", sub: "지금까지 진행된 매칭", Icon: IconCouple, render: () => <><CountUp end={9999} format="comma" />+</> },
  { l: "남녀 성비", sub: "균형 잡힌 회원 풀", Icon: IconHeart, render: () => <><CountUp end={51} format="plain" />:<CountUp end={49} format="plain" /></> },
  { l: "평균 매칭", sub: "상담 후 평균 시간", Icon: IconCalendar, render: () => <><CountUp end={48} format="plain" />h</> },
  { l: "신원 검증", sub: "재직증명서 확인", Icon: IconBadge, render: () => <><CountUp end={100} format="plain" />%</> },
];

export default function BigStats() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">BY THE NUMBERS</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            숫자로 보는 <span className="text-rainbow relative inline-block">인연연구소<HandUnderline /></span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {stats.map((s, i) => (
            <div key={i} className="group card-rainbow tilt-3d p-6 sm:p-8 text-center bg-white">
              <span className="icon-flip"><s.Icon size={36} className="mx-auto mb-3" /></span>
              <div className="num-huge text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 leading-none text-accent">
                {s.render()}
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-bold text-ink mb-1">{s.l}</div>
              <div className="text-[11px] sm:text-xs lg:text-sm text-ink-soft font-medium">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* 회원 직업 어필 — 전문직·대기업 강조 */}
        <div className="mt-10 text-center reveal">
          <p className="text-sm sm:text-base font-bold text-ink mb-4">
            <span className="text-accent">대기업 · 전문직 · 공무원</span> 등 검증된 직업의 회원분들이 활동 중이에요
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {["대기업", "공기업", "공무원", "교사", "간호사", "회계사", "엔지니어", "아나운서", "승무원", "통역사", "사업가", "디자이너"].map((j, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs sm:text-sm font-bold">
                {j}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
