"use client";

/* ═══ BIG STATS — Apple 미니멀 큰 숫자 그리드 ═══ */
export default function BigStats() {
  const stats = [
    { v: "9,999+", l: "누적 상담", sub: "2026년 5월 기준" },
    { v: "51 : 49", l: "남녀 성비", sub: "균형 잡힌 회원 풀" },
    { v: "48h", l: "평균 매칭", sub: "상담 후 평균 시간" },
    { v: "100%", l: "신원 검증", sub: "재직증명서 확인" },
  ];
  return (
    <section className="bg-sec py-24 sm:py-32 lg:py-40">
      <div className="container-apple">
        {/* 헤더 */}
        <div className="text-center mb-16 sm:mb-24 reveal">
          <div className="label-sm mb-6">BY THE NUMBERS</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            숫자로 보는 인연연구소.
          </h2>
        </div>

        {/* 4분할 큰 숫자 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 lg:gap-x-8 reveal">
          {stats.map((s, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="num-huge text-5xl sm:text-6xl lg:text-7xl text-ink mb-3">
                {s.v}
              </div>
              <div className="text-base sm:text-lg font-semibold text-ink mb-1">{s.l}</div>
              <div className="text-sm text-ink-soft">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
