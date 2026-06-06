"use client";
import { IconHeart, IconBadge, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ MatchingTeam — 전담 매칭사 소개 ═══ */
const members = [
  { name: "J", role: "수석 매칭 디렉터", career: "10년차 · 1,200+ 매칭", tag: "DIRECTOR", spec: "30대 직장인 매칭 전문" },
  { name: "S", role: "리드 매칭사", career: "7년차 · 900+ 매칭", tag: "LEAD", spec: "전문직·공기업 회원 전문" },
  { name: "H", role: "전문 매칭사", career: "5년차 · 600+ 매칭", tag: "EXPERT", spec: "20대 후반 라이프스타일 매칭" },
  { name: "M", role: "연애 컨설턴트", career: "8년차 · 500+ 상담", tag: "CONSULTANT", spec: "만남 후 코칭·스타일링" },
];

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center relative">
      <span className="text-2xl font-extrabold text-accent">{letter}</span>
      <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
        <IconBadge size={14} />
      </span>
    </div>
  );
}

export default function MatchingTeam() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">MATCHING TEAM</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            전담 매칭사가 <span className="text-rainbow relative inline-block">함께합니다<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">
            평균 7년차 경력의 전문가 4인이 회원님 한 분 한 분을 책임집니다.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {members.map((m, i) => (
            <article key={i} className="group card-rainbow tilt-3d bg-white p-5 sm:p-7">
              <div className="flex items-start justify-between mb-5">
                <Avatar letter={m.name} />
                <span className="caption-xs text-accent">{m.tag}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink mb-1.5 link-underline" style={{ fontWeight: 700 }}>{m.role}</h3>
              <div className="text-xs sm:text-sm text-ink-soft font-medium mb-3">{m.career}</div>
              <div className="text-[11px] sm:text-xs text-ink font-semibold flex items-center gap-1.5 pt-3 border-t border-pink-100">
                <IconHeart size={12} /> {m.spec}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-ink-tertiary mt-8 reveal font-medium">
          * 익명 보호를 위해 이니셜만 표기. 회원님께는 담당 매칭사 정식 소개 후 진행.
        </p>
      </div>
    </section>
  );
}
