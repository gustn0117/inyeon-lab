"use client";
import Image from "next/image";
import { GlowOrbs, StarAccent, FloatingHearts } from "@/components/PremiumDeco";

/* ═══ BENEFITS — Apple + 프리미엄 카드 인터랙션 ═══ */
export default function BentoBenefits() {
  return (
    <section className="relative bg-base py-24 sm:py-32 lg:py-40 overflow-hidden">
      <GlowOrbs variant="subtle" />
      <FloatingHearts />

      <div className="container-apple relative">
        {/* 헤더 */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card">
            <StarAccent size={12} />
            <span className="label-sm">OUR PROMISE</span>
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            인연연구소만의 <span className="text-aurora-pink">약속.</span>
          </h2>
        </div>

        {/* Row 1: 큰 카드 2개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 reveal">
          {/* 메인 카드 1 - 후불제 (사진 배경 + 글로우) */}
          <article className="hover-magnetic card card-hover relative overflow-hidden min-h-[440px] text-white">
            <Image src="/photos/p1.jpg" alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/90" />
            {/* 핑크 글로우 (카드 안쪽) */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(236,77,126,0.5)" }} />
            <div className="relative h-full flex flex-col justify-end p-10 sm:p-14">
              <div className="label-sm mb-3" style={{ color: "var(--accent)" }}>01 · CORE</div>
              <h3 className="h-card font-bold mb-4" style={{ fontWeight: 700 }}>
                매칭이 되어야<br />결제합니다.
              </h3>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-md">
                가입비 0원. 마음에 드는 분으로 매칭 성사 시에만 결제하는 100% 후불제.
              </p>
            </div>
          </article>

          {/* 메인 카드 2 - 다크 + 글로우 */}
          <article className="hover-magnetic card card-hover relative overflow-hidden p-10 sm:p-14 min-h-[440px] flex flex-col justify-between bg-dark text-white">
            <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(236,77,126,0.4)" }} />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,141,168,0.25)" }} />
            <div className="relative label-sm" style={{ color: "var(--accent)" }}>02 · PRIVATE</div>
            <div className="relative">
              <h3 className="h-card font-bold mb-4" style={{ fontWeight: 700 }}>
                실제 사진과<br /><span className="text-aurora-pink">자세한 프로필.</span>
              </h3>
              <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-md">
                담당 매칭사가 회원의 실제 사진과 자세한 프로필을 1:1 비공개로 전달드립니다.
              </p>
            </div>
          </article>
        </div>

        {/* Row 2: 작은 카드 3개 (border-glow + hover) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 reveal">
          {[
            { n: "03", t: "신원 100% 검증", d: "재직증명서·혼인관계증명서로 확인된 실회원만." },
            { n: "04", t: "전문 매칭사 1:1", d: "AI 자동 추천이 아닌, 사람이 직접 분석." },
            { n: "05", t: "대면 소개팅 보장", d: "실제 만남 일정까지 책임지고 조율." },
          ].map((b, i) => (
            <article key={i} className="hover-magnetic border-glow card p-8 sm:p-10 relative bg-white">
              <div className="label-sm mb-4">{b.n}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 underline-grow inline-block" style={{ fontWeight: 700 }}>{b.t}</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
