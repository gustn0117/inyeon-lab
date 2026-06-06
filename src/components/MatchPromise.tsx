"use client";
import { IconBadge, IconHeart, IconLock, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ MATCH PROMISE — 3가지 보증 ═══ */
const promises = [
  {
    Icon: IconBadge,
    label: "01 / 매칭 보증",
    t: "성사될 때까지",
    body: "마음에 드는 분을 만날 때까지 책임지고 매칭해드립니다. 한 번이 마지막이 아닙니다.",
    cap: "AVG 2~3회 매칭 진행"
  },
  {
    Icon: IconHeart,
    label: "02 / 정성 보증",
    t: "1:1 전담 매칭사",
    body: "정해진 매칭사 한 분이 처음부터 끝까지 함께. 만남 전 코칭, 만남 후 피드백까지.",
    cap: "30~40대 전문 상담사"
  },
  {
    Icon: IconLock,
    label: "03 / 비밀 보증",
    t: "100% 비공개",
    body: "프로필은 매칭된 상대에게만 1:1 전달. 외부 공개 절대 없음. 서비스 종료 시 즉시 파기.",
    cap: "개인정보보호법 준수"
  },
];

export default function MatchPromise() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container-apple relative">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <span className="label-sm">PROMISE TO YOU</span>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            우리가 드리는 <span className="text-rainbow relative inline-block">세 가지 약속<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">매칭사가 직접 책임지는 보증 시스템</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 reveal">
          {promises.map((p, i) => (
            <article key={i} className="group card-rainbow bg-white p-8 sm:p-10 flex flex-col">
              <span className="icon-flip mb-6"><p.Icon size={48} /></span>
              <div className="caption-xs mb-3 text-accent">{p.label}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 link-underline" style={{ fontWeight: 700 }}>{p.t}</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-medium mb-4 flex-1">{p.body}</p>
              <div className="text-xs text-accent font-bold flex items-center gap-1.5 mt-auto pt-4 border-t border-pink-100">
                <Sparkle size={10} /> {p.cap}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
