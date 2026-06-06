"use client";
import { IconCouple, IconHeart, IconCalendar, IconBadge, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ BIG STATS — SVG 아이콘 + 깔끔 ═══ */
export default function BigStats() {
  const stats = [
    { v: "9,999+", l: "누적 상담", sub: "2026년 5월 기준", Icon: IconCouple },
    { v: "51:49", l: "남녀 성비", sub: "균형 잡힌 회원 풀", Icon: IconHeart },
    { v: "48h", l: "평균 매칭", sub: "상담 후 평균 시간", Icon: IconCalendar },
    { v: "100%", l: "신원 검증", sub: "재직증명서 확인", Icon: IconBadge },
  ];
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container-apple relative">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <div className="label-sm">BY THE NUMBERS</div>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            숫자로 보는 <span className="text-rainbow relative inline-block">인연연구소<HandUnderline /></span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {stats.map((s, i) => (
            <div key={i} className="card-rainbow hover-magnetic p-6 sm:p-8 text-center bg-white">
              <s.Icon size={36} className="mx-auto mb-3" />
              <div className="num-huge text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 leading-none text-accent">
                {s.v}
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-bold text-ink mb-1">{s.l}</div>
              <div className="text-[11px] sm:text-xs lg:text-sm text-ink-soft font-medium">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
