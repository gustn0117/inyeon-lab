"use client";

const PINK = "#d4567a";
const GOLD = "#c9956b";

export default function BigQuote() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-36 overflow-hidden bg-white">
      {/* 배경 데코 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full blur-3xl" style={{ background: `${PINK}10` }} />
        <div className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full blur-3xl" style={{ background: `${GOLD}15` }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
        {/* 큰 따옴표 */}
        <div className="inline-block mb-6" style={{ color: `${PINK}50` }}>
          <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </div>

        {/* 큰 인용구 */}
        <h2 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.3] mb-8" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif", color: "#1a1a1f" }}>
          앱은 가볍고,<br />
          결정사는 <span className="text-aurora">부담스럽다면.</span><br />
          <span style={{ color: PINK }}>딱 그 사이</span>를 찾고 있다면.
        </h2>

        {/* 부제 */}
        <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#5a4a50" }}>
          전문 매칭사가 직접 검증한 회원들 사이에서<br className="hidden sm:block" />
          마음에 드는 분으로 매칭이 성사된 경우에만 결제하는<br className="hidden sm:block" />
          <strong style={{ color: PINK }}>프라이빗 후불제 소개팅</strong> 서비스입니다.
        </p>

        {/* 장식 라인 */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <span className="block w-12 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80)` }} />
          <span className="text-[11px] font-extrabold tracking-[0.25em]" style={{ color: GOLD }}>INYEONLAB</span>
          <span className="block w-12 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${GOLD}80, transparent)` }} />
        </div>
      </div>
    </section>
  );
}
