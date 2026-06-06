"use client";
import { IconQuote, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ BIG QUOTE — 큰 SVG 따옴표 ═══ */
export default function BigQuote() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28">
      <div className="container-apple text-center reveal">
        <IconQuote size={56} className="mx-auto mb-6 opacity-90" />
        <h2 className="h-section font-bold text-ink mb-10" style={{ fontWeight: 700 }}>
          앱은 가볍고,<br />
          결정사는 부담스럽다면.<br />
          <span className="text-rainbow relative inline-block">
            딱 그 사이
            <HandUnderline />
          </span>.
        </h2>
        <p className="text-lg sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed font-medium">
          전문 매칭사가 직접 검증한 회원들 사이에서<br className="hidden sm:block" />
          마음에 드는 분으로 매칭 성사 시에만 결제하는<br className="hidden sm:block" />
          <strong className="text-ink text-highlight">프라이빗 후불제 소개팅.</strong>
        </p>
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="w-12 h-px bg-accent/40" />
          <Sparkle size={14} />
          <span className="label-sm">INYEONLAB</span>
          <Sparkle size={14} />
          <span className="w-12 h-px bg-accent/40" />
        </div>
      </div>
    </section>
  );
}
