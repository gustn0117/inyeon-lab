"use client";

/* ═══ BENEFITS — Apple 카드 그리드 (큰 사진+간결한 텍스트) ═══ */
export default function BentoBenefits() {
  return (
    <section className="bg-base py-24 sm:py-32 lg:py-40">
      <div className="container-apple">
        {/* 헤더 */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <div className="label-sm mb-6">OUR PROMISE</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            인연연구소만의 약속.
          </h2>
        </div>

        {/* 2x2 큰 카드 + 작은 3개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 reveal">
          {/* 메인 카드 1 - 후불제 */}
          <article className="card card-hover p-10 sm:p-14 min-h-[400px] flex flex-col justify-between">
            <div className="label-sm">01 · CORE</div>
            <div>
              <h3 className="h-card font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
                매칭이 되어야<br />결제합니다.
              </h3>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-md">
                가입비 0원. 마음에 드는 분으로 매칭 성사 시에만 결제하는 100% 후불제.
              </p>
            </div>
          </article>

          {/* 메인 카드 2 - 사진/프로필 */}
          <article className="card card-hover p-10 sm:p-14 min-h-[400px] flex flex-col justify-between bg-dark text-white">
            <div className="label-sm" style={{ color: "var(--accent)" }}>02 · PRIVATE</div>
            <div>
              <h3 className="h-card font-bold mb-4" style={{ fontWeight: 700 }}>
                실제 사진과<br />자세한 프로필.
              </h3>
              <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-md">
                담당 매칭사가 회원의 실제 사진과 자세한 프로필을 1:1 비공개로 전달드립니다.
              </p>
            </div>
          </article>
        </div>

        {/* 작은 카드 3개 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 reveal">
          {[
            { n: "03", t: "신원 100% 검증", d: "재직증명서·혼인관계증명서로 확인된 실회원만." },
            { n: "04", t: "전문 매칭사 1:1", d: "AI 자동 추천이 아닌, 사람이 직접 분석." },
            { n: "05", t: "대면 소개팅 보장", d: "실제 만남 일정까지 책임지고 조율." },
          ].map((b, i) => (
            <article key={i} className="card card-hover p-8 sm:p-10">
              <div className="label-sm mb-4">{b.n}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3" style={{ fontWeight: 700 }}>{b.t}</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
