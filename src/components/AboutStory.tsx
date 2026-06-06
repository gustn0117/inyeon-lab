"use client";
import { IconQuote, HandUnderline } from "@/components/Icons";

/* ═══ AboutStory — 미션 + 비전 ═══ */
export default function AboutStory() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-narrow text-center">
        <div className="eyebrow-lined mb-6 mx-auto reveal">OUR STORY</div>
        <IconQuote size={48} className="mx-auto mb-6 opacity-80 reveal" />
        <h2 className="h-section font-bold text-ink mb-10 reveal" style={{ fontWeight: 700 }}>
          가벼운 앱과 무거운 결정사,<br />
          그 <span className="text-rainbow relative inline-block">사이가 필요했어요<HandUnderline /></span>.
        </h2>
        <p className="text-lg sm:text-xl text-ink-soft leading-relaxed font-medium reveal mb-10">
          소개팅 앱은 누가 진짜인지 알 수 없고,<br className="hidden sm:block" />
          결혼정보회사는 가격도 분위기도 부담스럽습니다.<br /><br />
          <strong className="text-ink text-highlight">검증된 분과, 마음에 들 때만, 부담 없이 만나는 방법.</strong><br />
          인연연구소는 그 사이를 만들기 위해 시작됐습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 reveal mt-12">
          {[
            { l: "MISSION", t: "안전한 인연을 일상으로." },
            { l: "VISION", t: "20·30대 만남의 표준." },
            { l: "PROMISE", t: "마음에 들 때만 결제." },
          ].map((v, i) => (
            <div key={i} className="card-rainbow bg-white p-6 sm:p-8 text-left">
              <div className="caption-xs text-accent mb-3">{v.l}</div>
              <h3 className="text-base sm:text-lg font-bold text-ink leading-snug" style={{ fontWeight: 700 }}>{v.t}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
