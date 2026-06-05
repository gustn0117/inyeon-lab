"use client";

/* ═══ BIG QUOTE — Editorial 잡지 인용 페이지 ═══ */
export default function BigQuote() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden mesh-ed-dark text-white">
      {/* 떠다니는 별 */}
      <div className="absolute top-20 right-[15%] w-2 h-2 rounded-full bg-white/40 anim-twinkle" />
      <div className="absolute bottom-32 left-[12%] w-1.5 h-1.5 rounded-full bg-white/30 anim-twinkle" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-[25%] w-1 h-1 rounded-full bg-white/50 anim-twinkle" style={{ animationDelay: "2s" }} />

      <div className="container-ed relative">
        {/* 12컬럼 비대칭 — 좌 큰 따옴표 + 우 본문 */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10 items-start">
          {/* 좌측 — 큰 따옴표 + 라벨 */}
          <div className="col-span-12 lg:col-span-3 reveal">
            <div className="text-white/15 mb-4 lg:mb-0">
              <svg className="w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
            <div className="hidden lg:block mt-4">
              <div className="label-ed mb-2" style={{ color: "var(--gold-soft)" }}>EDITOR&apos;S NOTE</div>
              <div className="text-xs text-white/40">No. 01 · 2026</div>
            </div>
          </div>

          {/* 우측 — 큰 인용구 */}
          <div className="col-span-12 lg:col-span-9 reveal">
            <h2 className="h-display mb-10" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)", lineHeight: 1.1 }}>
              <span className="font-serif-en italic font-normal text-white/85">앱은</span> 가볍고,<br />
              <span className="text-gradient">결정사</span>는 <span className="font-serif-en italic font-normal text-white/85">부담스럽다면.</span><br />
              <span style={{ color: "var(--gold-soft)" }}>딱 그 사이</span>를 찾고 있다면.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-white/70 mb-10">
              전문 매칭사가 직접 검증한 회원들 사이에서 마음에 드는 분으로 매칭이 성사된 경우에만 결제하는 <strong className="text-white">프라이빗 후불제 소개팅</strong> 서비스입니다.
            </p>

            <div className="flex items-center gap-4">
              <span className="block w-12 h-px bg-gradient-to-r from-transparent to-[#e6c89f]" />
              <span className="label-ed" style={{ color: "var(--gold-soft)" }}>INYEONLAB · SINCE 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
