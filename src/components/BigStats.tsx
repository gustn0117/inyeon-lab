"use client";
import { BurstStar } from "@/components/PremiumDeco";

/* ═══ BIG STATS — 페이지 캔버스 위 ═══ */
export default function BigStats() {
  const stats = [
    { v: "9,999+", l: "누적 상담", sub: "2026년 5월 기준", c: "linear-gradient(135deg, #ec4d7e, #fb7185)" },
    { v: "51:49", l: "남녀 성비", sub: "균형 잡힌 회원 풀", c: "linear-gradient(135deg, #ff6ba0, #ec4d7e)" },
    { v: "48h", l: "평균 매칭", sub: "상담 후 평균 시간", c: "linear-gradient(135deg, #fb7185, #ff8da8)" },
    { v: "100%", l: "신원 검증", sub: "재직증명서 확인", c: "linear-gradient(135deg, #d4567a, #ec4d7e)" },
  ];
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full glass-card">
            <BurstStar size={14} />
            <span className="label-sm text-rainbow">BY THE NUMBERS</span>
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            숫자로 보는 <span className="text-rainbow">인연연구소.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {stats.map((s, i) => (
            <div key={i} className="card-rainbow hover-magnetic p-5 sm:p-7 lg:p-8 text-center bg-white-solid relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-25" style={{ background: s.c }} />
              <div className="relative">
                <div className="num-huge text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 leading-none" style={{ background: s.c, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.v}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-ink mb-1">{s.l}</div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-ink-soft font-medium">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
