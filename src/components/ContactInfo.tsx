"use client";
import { IconClock, IconChat, IconMail, IconBadge, HandUnderline } from "@/components/Icons";

/* ═══ ContactInfo — 연락 정보 4 카드 ═══ */
const cards = [
  {
    Icon: IconClock,
    label: "OPERATING HOURS",
    t: "365일 · 12시까지",
    d: "주말·공휴일 포함 매일 자정까지 응답합니다.",
    meta: "AVG 응답 5분 이내",
  },
  {
    Icon: IconChat,
    label: "KAKAO TALK",
    t: "카톡 ID @inyeon_",
    d: "가장 빠른 문의 채널. 친구 추가 후 메시지.",
    meta: "권장 채널",
  },
  {
    Icon: IconMail,
    label: "INSTAGRAM",
    t: "@inyeon_lab",
    d: "최신 매칭 후기·이벤트 정보. DM 문의도 가능.",
    meta: "팔로우 환영",
  },
  {
    Icon: IconBadge,
    label: "PRIVACY",
    t: "100% 비공개",
    d: "문의 내용·연락처 모두 매칭사 외 공유 안 됨.",
    meta: "개인정보보호법 준수",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">REACH US</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            어떻게 <span className="text-rainbow relative inline-block">연락드릴까요<HandUnderline /></span>?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {cards.map((c, i) => (
            <article key={i} className="group card-rainbow tilt-3d bg-white p-6 sm:p-7">
              <div className="flex items-start justify-between mb-4">
                <span className="icon-flip"><c.Icon size={36} /></span>
                <span className="caption-xs text-accent text-right">{c.label}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink mb-2 link-underline inline-block" style={{ fontWeight: 700 }}>{c.t}</h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-medium mb-3">{c.d}</p>
              <div className="text-[11px] font-bold text-accent pt-3 border-t border-pink-100">{c.meta}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
