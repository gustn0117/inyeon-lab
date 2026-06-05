"use client";
import { RaysOfLight, RainbowOrbs, ParticleField, BurstStar, NoiseTexture } from "@/components/PremiumDeco";

/* ═══ BIG QUOTE — 멀티컬러 화려한 모드 ═══ */
export default function BigQuote() {
  return (
    <section className="relative mesh-violet py-24 sm:py-36 lg:py-44 overflow-hidden">
      <RaysOfLight />
      <RainbowOrbs />
      <ParticleField count={12} />
      <NoiseTexture />

      <div className="container-apple relative text-center reveal">
        <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full glass-card">
          <BurstStar size={14} />
          <span className="label-sm text-pink-purple">PHILOSOPHY</span>
        </div>
        <h2 className="h-section font-bold text-ink mb-10 text-glow-multi" style={{ fontWeight: 700 }}>
          앱은 가볍고,<br />
          결정사는 부담스럽다면.<br />
          <span className="text-rainbow">딱 그 사이.</span>
        </h2>
        <p className="text-lg sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
          전문 매칭사가 직접 검증한 회원들 사이에서<br className="hidden sm:block" />
          마음에 드는 분으로 매칭 성사 시에만 결제하는<br className="hidden sm:block" />
          <strong className="text-pink-purple">프라이빗 후불제 소개팅.</strong>
        </p>
        <div className="flex items-center justify-center gap-3 mt-12">
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <span className="label-sm text-rainbow">INYEONLAB · SINCE 2026</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent via-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
