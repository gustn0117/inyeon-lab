"use client";
import { IconCurrency, IconCheck, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ WhyAfterpay — 후불제 핵심 설명 split ═══ */
const steps = [
  { n: "01", t: "가입 신청", d: "카톡 ID inyeon_으로 신청. 가입비 0원.", price: "₩ 0" },
  { n: "02", t: "프로필·서류 검토", d: "재직증명서·혼인관계증명서 확인. 비용 0원.", price: "₩ 0" },
  { n: "03", t: "프로필 전달", d: "조건이 맞는 분의 실제 사진·프로필 1:1 비공개 전달.", price: "₩ 0" },
  { n: "04", t: "매칭 동의", d: "마음에 들지 않으면 다음 분 추천. 여기까지 비용 없음.", price: "₩ 0" },
  { n: "05", t: "만남 확정 → 결제", d: "두 분 모두 동의 시 결제 진행. 만남 일정도 매칭사가 조율.", price: "₩ 6만원~", highlight: true },
];

export default function WhyAfterpay() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 좌 — 카피 */}
          <div className="reveal lg:sticky lg:top-32">
            <div className="eyebrow-lined mb-4">100% AFTER-PAY</div>
            <h2 className="h-section font-bold text-ink mb-7" style={{ fontWeight: 700 }}>
              <span className="text-rainbow relative inline-block">매칭 후 결제<HandUnderline /></span>,<br />
              왜 가능할까?
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-7 font-medium">
              인연연구소는 <strong className="text-ink text-highlight">매칭사가 직접 책임</strong>지는 큐레이션 모델입니다.
              조건이 맞고 마음에 드는 분만 매칭하기 때문에, 매칭 성사 직전까지 비용이 들지 않습니다.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "가입비 · 등록비 0원",
                "프로필 검토 비용 0원",
                "마음에 안 들면 다음 분 무료 추천",
                "만남 확정 시에만 결제",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-base font-semibold text-ink">
                  <IconCheck size={22} />
                  {t}
                </div>
              ))}
            </div>

            <a href="/ideal-match" className="btn btn-gradient shimmer ring-pulse inline-flex font-bold">
              <IconCurrency size={18} />
              지금 무료로 시작
            </a>
          </div>

          {/* 우 — 5단계 비용 타임라인 */}
          <div className="reveal space-y-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`card-rainbow group p-5 sm:p-6 flex items-center gap-4 ${
                  s.highlight ? "bg-accent-soft" : "bg-white"
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm ${s.highlight ? "bg-accent text-white" : "bg-accent-soft text-accent"}`}>
                  {s.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-ink leading-tight">{s.t}</div>
                  <div className="text-xs sm:text-sm text-ink-soft font-medium mt-0.5">{s.d}</div>
                </div>
                <div className={`text-base sm:text-lg font-extrabold whitespace-nowrap ${s.highlight ? "text-accent" : "text-ink-soft"}`}>
                  {s.price}
                </div>
              </div>
            ))}
            <p className="text-xs text-ink-tertiary text-center mt-3 font-medium">
              여성 회원은 첫 매칭 1회 무료. 남성 ₩ 9만원, 무제한 상품 별도 안내.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
