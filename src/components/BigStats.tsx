"use client";
import { GlowOrbs, DotPattern, StarAccent } from "@/components/PremiumDeco";

/* ═══ BIG STATS — Apple + 글래스 카드 + 글로우 ═══ */
export default function BigStats() {
  const stats = [
    { v: "9,999+", l: "누적 상담", sub: "2026년 5월 기준" },
    { v: "51 : 49", l: "남녀 성비", sub: "균형 잡힌 회원 풀" },
    { v: "48h", l: "평균 매칭", sub: "상담 후 평균 시간" },
    { v: "100%", l: "신원 검증", sub: "재직증명서 확인" },
  ];
  return (
    <section className="relative bg-sec py-24 sm:py-32 lg:py-40 overflow-hidden">
      <DotPattern className="inset-0 opacity-50" />
      <GlowOrbs variant="default" />

      <div className="container-apple relative">
        <div className="text-center mb-16 sm:mb-24 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card">
            <StarAccent size={12} />
            <span className="label-sm">BY THE NUMBERS</span>
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            숫자로 보는 <span className="text-aurora-pink">인연연구소.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {stats.map((s, i) => (
            <div key={i} className="hover-magnetic glass-card rounded-2xl p-8 sm:p-10 text-center sm:text-left">
              <div className="num-huge text-5xl sm:text-6xl lg:text-7xl text-aurora-pink mb-3">
                {s.v}
              </div>
              <div className="text-base sm:text-lg font-bold text-ink mb-1">{s.l}</div>
              <div className="text-sm text-ink-soft">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
