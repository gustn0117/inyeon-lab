"use client";

/* ═══ BIG STATS — Editorial 거대 숫자 ═══ */
export default function BigStats() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-cream">
      {/* 배경 글로우 */}
      <div className="absolute top-32 left-[10%] w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#c23065" }} />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "#b8854a" }} />

      <div className="container-ed relative">
        {/* 헤더 */}
        <div className="mb-16 sm:mb-24 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-ink/30" />
            <span className="label-ed">BY THE NUMBERS</span>
          </div>
          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-10 items-end">
            <h2 className="col-span-12 lg:col-span-8 h-display text-ink" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}>
              숫자로 보는<br />
              <span className="text-gradient">인연연구소.</span>
            </h2>
            <p className="col-span-12 lg:col-span-4 text-sm sm:text-base text-ink-soft leading-relaxed">
              매칭은 결과로 말합니다.<br />2026년 5월 기준 누적 데이터.
            </p>
          </div>
        </div>

        {/* 거대 통계 — 2x2 + 메인 */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10 reveal">
          {/* 메인 거대 숫자 */}
          <div className="col-span-12 lg:col-span-7 border-t border-ink/15 pt-8">
            <div className="label-ed mb-3">총 누적 상담</div>
            <div className="num-display text-ink" style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}>
              9,999<span className="text-gradient">+</span>
            </div>
            <p className="text-base text-ink-soft mt-4 max-w-md">
              결혼·연애 부담 없이 시작한 분들의 누적 상담 회수.
              <span className="block text-xs text-ink-soft/70 mt-1">서비스 시작일부터 현재까지의 통계.</span>
            </p>
          </div>

          {/* 오른쪽 3개 통계 */}
          <div className="col-span-12 lg:col-span-5 space-y-8 lg:pt-8">
            {/* 성비 */}
            <div className="border-t border-ink/15 pt-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="label-ed">남녀 성비</span>
                <span className="text-xs text-ink-soft/60">RATIO</span>
              </div>
              <div className="flex items-baseline gap-2 num-display text-ink mb-3">
                <span className="text-5xl sm:text-6xl text-brand">51</span>
                <span className="text-2xl text-gold">:</span>
                <span className="text-5xl sm:text-6xl text-gold">49</span>
              </div>
              <div className="flex h-1.5 rounded-full overflow-hidden">
                <span className="block bg-brand" style={{ width: "51%" }} />
                <span className="block bg-gold" style={{ width: "49%" }} />
              </div>
            </div>

            {/* 평균 매칭 */}
            <div className="border-t border-ink/15 pt-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="label-ed">평균 매칭</span>
                <span className="text-xs text-ink-soft/60">AVG TIME</span>
              </div>
              <div className="num-display text-ink">
                <span className="text-5xl sm:text-6xl">48</span>
                <span className="text-2xl sm:text-3xl text-ink-soft">h</span>
              </div>
              <p className="text-xs text-ink-soft/70 mt-2">상담 후 24~72시간 내 첫 매칭 제안.</p>
            </div>

            {/* 100% 실회원 */}
            <div className="border-t border-ink/15 pt-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="label-ed">실회원 인증</span>
                <span className="text-xs text-ink-soft/60">VERIFIED</span>
              </div>
              <div className="num-display text-gradient">
                <span className="text-5xl sm:text-6xl">100%</span>
              </div>
              <p className="text-xs text-ink-soft/70 mt-2">재직증명서·혼인관계증명서 등 신원 검증.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
