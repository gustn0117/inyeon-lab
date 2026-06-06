"use client";
import { IconShield, IconHeart, IconLock, IconBadge, HandUnderline } from "@/components/Icons";

const values = [
  { Icon: IconShield, label: "TRUST", t: "신뢰", d: "재직·혼인관계증명서로 검증된 회원과만 연결합니다." },
  { Icon: IconHeart, label: "CARE", t: "정성", d: "한 분 한 분 매칭사가 직접 분석하고 큐레이션합니다." },
  { Icon: IconLock, label: "PRIVACY", t: "비밀", d: "프로필은 매칭된 상대에게만 1:1 비공개로 전달됩니다." },
  { Icon: IconBadge, label: "FAIR", t: "공정", d: "마음에 드는 분으로 매칭 성사 시에만 결제하는 후불제." },
];

/* ═══ AboutValues — 4 가치 ═══ */
export default function AboutValues() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">CORE VALUES</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            우리가 지키는 <span className="text-rainbow relative inline-block">네 가지<HandUnderline /></span>.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {values.map((v, i) => (
            <article key={i} className="group card-rainbow tilt-3d bg-white p-6 sm:p-8 text-center">
              <span className="icon-flip"><v.Icon size={40} className="mx-auto mb-4" /></span>
              <div className="caption-xs text-accent mb-2">{v.label}</div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 link-underline inline-block" style={{ fontWeight: 700 }}>{v.t}</h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-medium">{v.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
