"use client";
import { RainbowOrbs, ParticleField, BurstStar, RaysOfLight } from "@/components/PremiumDeco";

/* ═══ BIG STATS — 멀티컬러 메시 + 카드 그라데이션 보더 ═══ */
export default function BigStats() {
  const stats = [
    { v: "9,999+", l: "누적 상담", sub: "2026년 5월 기준", c: "linear-gradient(135deg, #ec4d7e, #fb7185)" },
    { v: "51 : 49", l: "남녀 성비", sub: "균형 잡힌 회원 풀", c: "linear-gradient(135deg, #a855f7, #c084fc)" },
    { v: "48h", l: "평균 매칭", sub: "상담 후 평균 시간", c: "linear-gradient(135deg, #f59e0b, #fcd34d)" },
    { v: "100%", l: "신원 검증", sub: "재직증명서 확인", c: "linear-gradient(135deg, #ec4d7e, #a855f7)" },
  ];
  return (
    <section className="relative mesh-sunset py-24 sm:py-32 lg:py-40 overflow-hidden">
      <RaysOfLight />
      <RainbowOrbs />
      <ParticleField count={10} />

      <div className="container-apple relative">
        <div className="text-center mb-16 sm:mb-24 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card">
            <BurstStar size={14} />
            <span className="label-sm text-coral-gold">BY THE NUMBERS</span>
          </div>
          <h2 className="h-section font-bold text-ink text-glow-multi" style={{ fontWeight: 700 }}>
            숫자로 보는 <span className="text-rainbow">인연연구소.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {stats.map((s, i) => (
            <div key={i} className="card-rainbow hover-magnetic p-8 sm:p-10 text-center sm:text-left bg-white relative">
              {/* 카드별 글로우 */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ background: s.c }} />
              <div className="relative">
                <div className="num-huge text-5xl sm:text-6xl lg:text-7xl mb-3" style={{ background: s.c, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.v}
                </div>
                <div className="text-base sm:text-lg font-bold text-ink mb-1">{s.l}</div>
                <div className="text-sm text-ink-soft">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
