"use client";
import Image from "next/image";
import { BurstStar } from "@/components/PremiumDeco";

/* ═══ BENEFITS — 페이지 캔버스 위 ═══ */
export default function BentoBenefits() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full glass-card">
            <BurstStar size={14} />
            <span className="label-sm text-rainbow">OUR PROMISE</span>
          </div>
          <h2 className="h-section font-bold text-ink text-glow-multi" style={{ fontWeight: 700 }}>
            인연연구소만의 <span className="text-rainbow">약속.</span>
          </h2>
        </div>

        {/* Row 1: 큰 카드 2개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 reveal">
          {/* 메인 카드 1 - 후불제 (사진 배경) */}
          <article className="card-rainbow hover-magnetic relative overflow-hidden min-h-[440px] text-white">
            <Image src="/photos/p1.jpg" alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/75" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,179,200,0.6)" }} />
            <div className="relative h-full flex flex-col justify-end p-10 sm:p-14">
              <div className="label-sm mb-3 text-coral-gold">01 · CORE</div>
              <h3 className="h-card font-bold mb-4 text-glow-multi" style={{ fontWeight: 700 }}>
                매칭이 되어야<br /><span className="text-rainbow">결제합니다.</span>
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-md font-medium">
                가입비 0원. 마음에 드는 분으로 매칭 성사 시에만 결제하는 100% 후불제.
              </p>
            </div>
          </article>

          {/* 메인 카드 2 - 밝은 핑크 글래스 */}
          <article className="card-rainbow hover-magnetic text-ink rounded-3xl relative overflow-hidden p-10 sm:p-14 min-h-[440px] flex flex-col justify-between bg-white/70 backdrop-blur-xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,179,200,0.7)" }} />
            <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(255,141,168,0.5)" }} />
            <span className="absolute top-8 right-8 anim-twinkle"><BurstStar size={20} /></span>
            <div className="relative label-sm">02 · PRIVATE</div>
            <div className="relative">
              <h3 className="h-card font-bold mb-4 text-ink" style={{ fontWeight: 700 }}>
                실제 사진과<br /><span className="text-rainbow">자세한 프로필.</span>
              </h3>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-md font-medium">
                담당 매칭사가 회원의 실제 사진과 자세한 프로필을 1:1 비공개로 전달드립니다.
              </p>
            </div>
          </article>
        </div>

        {/* Row 2: 작은 카드 3개 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 reveal">
          {[
            { n: "03", t: "신원 100% 검증", d: "재직증명서·혼인관계증명서로 확인된 실회원만.", c: "linear-gradient(135deg, #ec4d7e, #fb7185)" },
            { n: "04", t: "전문 매칭사 1:1", d: "AI 자동 추천이 아닌, 사람이 직접 분석.", c: "linear-gradient(135deg, #ff6ba0, #ec4d7e)" },
            { n: "05", t: "대면 소개팅 보장", d: "실제 만남 일정까지 책임지고 조율.", c: "linear-gradient(135deg, #fb7185, #ff8da8)" },
          ].map((b, i) => (
            <article key={i} className="card-rainbow hover-magnetic p-8 sm:p-10 relative bg-white-solid overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-25" style={{ background: b.c }} />
              <div className="relative">
                <div className="label-sm mb-4" style={{ background: b.c, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{b.n}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 underline-grow inline-block" style={{ fontWeight: 700 }}>{b.t}</h3>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-medium">{b.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
