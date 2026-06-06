"use client";
import { IconHeart, IconStarShine, Sparkle } from "@/components/Icons";

/* ═══ FinalCTA — 마지막 풀폭 강조 CTA ═══ */
export default function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container-apple">
        <div className="card-rainbow relative overflow-hidden bg-white p-10 sm:p-14 lg:p-20 text-center">
          {/* 떠다니는 데코 */}
          <span className="absolute top-6 right-8 anim-float-y" style={{ animationDelay: "0s" }}>
            <Sparkle size={20} />
          </span>
          <span className="absolute bottom-8 left-12 anim-float-y" style={{ animationDelay: "1.5s" }}>
            <Sparkle size={16} />
          </span>
          <span className="absolute top-1/2 left-8 anim-float-y" style={{ animationDelay: "0.7s" }}>
            <IconStarShine size={18} />
          </span>

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-5">
              <Sparkle size={14} />
              <span className="label-sm">READY TO BEGIN?</span>
              <Sparkle size={14} />
            </div>

            <h2 className="h-section font-bold text-ink mb-5" style={{ fontWeight: 700 }}>
              <span className="text-rainbow">진짜 인연</span>,<br />
              지금 시작하세요.
            </h2>

            <p className="text-base sm:text-lg text-ink-soft mb-9 font-medium">
              가입비 0원. 1분 진단으로 매칭 가능성을 먼저 확인해 보세요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <a href="/ideal-match" className="btn btn-gradient shimmer ring-pulse w-full sm:w-auto sm:min-w-[220px] rounded-full font-bold">
                <IconHeart size={18} />
                이상형 매칭 진단
              </a>
              <a href="/contact" className="btn btn-secondary w-full sm:w-auto font-bold">
                상담 받기 →
              </a>
            </div>

            <div className="text-xs text-ink-tertiary font-medium">
              <strong className="text-accent">여성 회원 1회 무료</strong> · 매칭 성사 시에만 결제 · 100% 후불제
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
