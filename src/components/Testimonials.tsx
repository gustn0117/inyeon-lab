"use client";
import { IconQuote, IconHeart, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ TESTIMONIALS — 회원 후기 ═══ */
const stories = [
  {
    quote: "정말 제가 원하던 조건의 분을 만났어요. 매칭사님이 1:1로 신경 써주신 게 느껴졌어요.",
    name: "K",
    meta: "29 · 디자이너 · 서울",
    tag: "성혼",
  },
  {
    quote: "앱 소개팅은 지치고, 결정사는 너무 부담됐는데 인연연구소는 딱 그 사이였어요.",
    name: "J",
    meta: "32 · 공기업 · 경기",
    tag: "교제 6개월",
  },
  {
    quote: "프로필을 미리 자세히 받아볼 수 있어서, 만남 전부터 안심됐어요.",
    name: "S",
    meta: "27 · 간호사 · 인천",
    tag: "교제 중",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">REAL STORIES</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            진짜 만난 분들의 <span className="text-rainbow relative inline-block">이야기<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">실제 성혼·교제로 이어진 회원님들의 후기</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 reveal">
          {stories.map((s, i) => (
            <div key={i} className="card-rainbow hover-magnetic bg-white p-8 sm:p-10 relative flex flex-col">
              <IconQuote size={32} className="mb-5 opacity-80" />
              <p className="text-base sm:text-lg text-ink leading-relaxed font-medium font-serif-italic flex-1 mb-6">
                &ldquo;{s.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-pink-100">
                <div>
                  <div className="text-base font-bold text-ink flex items-center gap-2">
                    {s.name} <span className="text-ink-tertiary text-xs font-medium">·</span> <span className="caption-xs">{s.meta}</span>
                  </div>
                </div>
                <span className="badge">
                  <IconHeart size={12} />
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-ink-tertiary mt-8 reveal font-medium">
          * 회원님 동의 하에 익명으로 게시한 실제 후기입니다.
        </p>
      </div>
    </section>
  );
}
