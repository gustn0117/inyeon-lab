"use client";

const PINK = "#d4567a";
const GOLD = "#c9956b";

export default function BigQuote() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden mesh-wine text-white">
      {/* 배경 데코 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full blur-3xl" style={{ background: `${PINK}40` }} />
        <div className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full blur-3xl" style={{ background: `${GOLD}30` }} />
        {/* 별 데코 */}
        <div className="absolute top-20 right-[15%] w-2 h-2 rounded-full bg-white/40 anim-twinkle" />
        <div className="absolute bottom-32 left-[12%] w-1.5 h-1.5 rounded-full bg-white/30 anim-twinkle" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
        {/* 큰 따옴표 */}
        <div className="inline-block mb-6 text-white/35">
          <svg className="w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </div>

        {/* 큰 인용구 — 임팩트 폰트 + 더 큰 사이즈 */}
        <h2 className="font-impact text-[2.2rem] sm:text-5xl lg:text-[3.8rem] tracking-tight mb-10" style={{ lineHeight: 1.18 }}>
          앱은 가볍고,<br />
          결정사는 <span className="text-aurora">부담스럽다면.</span><br />
          <span style={{ color: "#ffd6e1" }}>딱 그 사이</span>를 찾고 있다면.
        </h2>

        {/* 부제 */}
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto text-white/75">
          전문 매칭사가 직접 검증한 회원들 사이에서<br className="hidden sm:block" />
          마음에 드는 분으로 매칭이 성사된 경우에만 결제하는<br className="hidden sm:block" />
          <strong className="text-white">프라이빗 후불제 소개팅</strong> 서비스입니다.
        </p>

        {/* 장식 라인 */}
        <div className="flex items-center justify-center gap-3 mt-14">
          <span className="block w-12 sm:w-24 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <span className="text-[11px] font-extrabold tracking-[0.3em]" style={{ color: "#ffd6e1" }}>INYEONLAB</span>
          <span className="block w-12 sm:w-24 h-px" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </div>
      </div>
    </section>
  );
}
