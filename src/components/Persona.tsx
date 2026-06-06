"use client";
import { IconCouple, IconClock, IconBadge, IconCheck, Sparkle, HandUnderline, IllustStars } from "@/components/Icons";

/* ═══ PERSONA — 3가지 회원 유형 ═══ */
const personas = [
  {
    Icon: IconClock,
    label: "FOR BUSY",
    t: "바빠서 만남이 줄어든 분",
    points: ["퇴근 후 시간이 부족", "주변 모임이 줄어듦", "이상형은 분명한 편"],
  },
  {
    Icon: IconBadge,
    label: "FOR SAFE",
    t: "검증된 만남을 원하는 분",
    points: ["앱 매칭이 불안", "신원 확인이 필수", "사진·프로필 사전 공유"],
  },
  {
    Icon: IconCouple,
    label: "FOR REAL",
    t: "진짜 인연을 만나고 싶은 분",
    points: ["가벼운 만남은 지침", "결혼 전제는 부담", "조건이 맞으면 진지함"],
  },
];

export default function Persona() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <IllustStars size={260} className="absolute top-0 left-0 opacity-25 -translate-y-10 -translate-x-10 pointer-events-none hidden md:block" />
      <div className="container-apple relative">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <span className="label-sm">FOR YOU</span>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            이런 분들이 <span className="text-rainbow relative inline-block">찾아주세요<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">매칭사가 회원님의 결을 직접 확인하고 추천합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 reveal">
          {personas.map((p, i) => (
            <article key={i} className="group card-rainbow bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between mb-5">
                <span className="icon-flip"><p.Icon size={36} /></span>
                <span className="caption-xs text-accent">{p.label}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-4 link-underline" style={{ fontWeight: 700 }}>{p.t}</h3>
              <ul className="space-y-2.5">
                {p.points.map((pt, k) => (
                  <li key={k} className="flex items-center gap-2 text-sm text-ink-soft font-medium">
                    <IconCheck size={16} className="flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
