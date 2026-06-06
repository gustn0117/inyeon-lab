"use client";
import { IconBadge, IconLock, IconShield, IconCheck, Sparkle } from "@/components/Icons";

/* ═══ TRUST BADGES — 인증/안전 4종 ═══ */
const badges = [
  { Icon: IconBadge, t: "신원 100% 검증", d: "재직·혼인관계증명서" },
  { Icon: IconLock, t: "개인정보 보호", d: "암호화 저장 · 즉시 폐기" },
  { Icon: IconShield, t: "안전한 만남", d: "검증된 회원만 매칭" },
  { Icon: IconCheck, t: "후불제 보장", d: "매칭 성사 시에만 결제" },
];

export default function TrustBadges() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-apple">
        <div className="text-center mb-8 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkle size={12} />
            <div className="caption-xs text-accent">TRUST & SAFETY</div>
            <Sparkle size={12} />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 reveal">
          {badges.map((b, i) => (
            <div key={i} className="group card-rainbow bg-white px-4 sm:px-5 py-5 sm:py-6 flex items-center gap-3 sm:gap-4">
              <span className="icon-flip flex-shrink-0">
                <b.Icon size={36} />
              </span>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold text-ink leading-tight">{b.t}</div>
                <div className="text-[11px] sm:text-xs text-ink-soft mt-1 font-medium">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
