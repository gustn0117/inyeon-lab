"use client";

/* ═══ BIG QUOTE — Apple 미니멀 큰 카피 ═══ */
export default function BigQuote() {
  return (
    <section className="bg-base py-24 sm:py-36 lg:py-44">
      <div className="container-apple text-center reveal">
        <div className="label-sm mb-7">PHILOSOPHY</div>
        <h2 className="h-section font-bold text-ink mb-10" style={{ fontWeight: 700 }}>
          앱은 가볍고,<br />
          결정사는 부담스럽다면.<br />
          <span className="text-gradient">딱 그 사이.</span>
        </h2>
        <p className="text-lg sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
          전문 매칭사가 직접 검증한 회원들 사이에서<br className="hidden sm:block" />
          마음에 드는 분으로 매칭 성사 시에만 결제하는<br className="hidden sm:block" />
          프라이빗 후불제 소개팅.
        </p>
      </div>
    </section>
  );
}
