"use client";
import { IconCoffee, IconHeart, IconLocation, IconCalendar, IconFlower, IconStarShine, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ DATE MOMENTS — 6 데이트 분위기 ═══ */
const moments = [
  { Icon: IconCoffee, t: "한적한 카페", d: "조용한 공간에서 가볍게 첫 대화", tag: "FIRST MEET" },
  { Icon: IconFlower, t: "산책 데이트", d: "공원·한강·골목길을 함께 걷는 여유", tag: "WALK" },
  { Icon: IconHeart, t: "분위기 좋은 저녁", d: "취향이 맞는 레스토랑에서 깊은 대화", tag: "DINNER" },
  { Icon: IconStarShine, t: "전시·공연", d: "함께 보고 느끼는 문화 데이트", tag: "CULTURE" },
  { Icon: IconLocation, t: "근처 동네 탐방", d: "지역이 같다면 가볍게 즐길 수 있는 코스", tag: "LOCAL" },
  { Icon: IconCalendar, t: "주말 나들이", d: "여유 있는 하루를 함께 보내는 시간", tag: "WEEKEND" },
];

export default function DateMoments() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <span className="label-sm">DATE MOMENTS</span>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            매칭 후 <span className="text-rainbow relative inline-block">이런 만남<HandUnderline /></span>이 시작돼요.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">매칭사가 두 분의 취향에 맞춰 첫 만남 분위기까지 안내</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 reveal">
          {moments.map((m, i) => (
            <article key={i} className="group card-rainbow bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="icon-flip"><m.Icon size={32} /></span>
                <span className="caption-xs text-accent">{m.tag}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink mb-1.5 link-underline" style={{ fontWeight: 700 }}>{m.t}</h3>
              <p className="text-[12.5px] sm:text-sm text-ink-soft leading-relaxed font-medium">{m.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
