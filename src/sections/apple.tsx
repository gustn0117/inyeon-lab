"use client";
/* ═══ Apple 섹션 모음 — 고급 SVG 풍성 ═══ */
import { IconHeart, IconDiamond, IconRing, IconStarShine, IconFlower, IconShield, IconChat, IconCouple, IconCheck, IconDocument, IconQuote, IconClock, IconCurrency, Sparkle, HandUnderline, DotPattern, CornerOrnament, IconCalendar, IconLocation, IconCrown, IconLock, IconBadge, IconSparkleCluster, IconCoffee, IconMail } from "@/components/Icons";
import CountUp from "@/components/CountUp";

const I = {
  check: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  arrowR: (c = "w-4 h-4") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
  phone: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
};

const KAKAO_ID = "inyeon_";
const INSTAGRAM = "https://www.instagram.com/inyeon_lab?igsh=cHphNHZnaDV1MGpr";

/* 공통 padding (대폭 축소) */
const SECTION_PY = "py-16 sm:py-20 lg:py-24";

/* ═══ ABOUT — split (좌 카피 + 우 일러스트+통계) ═══ */
export function AppleAbout() {
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <div className="eyebrow-lined mb-4">ABOUT US</div>
            <h2 className="h-section font-bold text-ink mb-7" style={{ fontWeight: 700 }}>
              결혼정보회사가 아닌,<br />
              <span className="text-rainbow relative inline-block">프리미엄 소개팅<HandUnderline /></span>.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-8 font-medium">
              20·30대를 위한 소개팅 전문.<br />
              가벼운 마음으로 좋은 사람을 만나세요.<br />
              <strong className="text-ink">단, 아무나 만나지는 않습니다.</strong>
            </p>
            <div className="space-y-3">
              {["매칭 후 결제 후불제", "거리·나이·직업 맞춤", "48시간 평균 매칭", "20·30대 전용"].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-base font-semibold text-ink">
                  <IconCheck size={22} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 4 통계 카드 */}
          <div className="reveal">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { render: () => <><CountUp end={9999} format="comma" />+</>, l: "누적 상담", Icon: IconCouple },
                { render: () => <><CountUp end={51} format="plain" />:<CountUp end={49} format="plain" /></>, l: "남녀 성비", Icon: IconHeart },
                { render: () => <><CountUp end={48} format="plain" />h</>, l: "평균 매칭", Icon: IconCalendar },
                { render: () => <><CountUp end={100} format="plain" />%</>, l: "신원 검증", Icon: IconBadge },
              ].map((s, i) => (
                <div key={i} className="card-rainbow group tilt-3d p-5 sm:p-6 text-center bg-white">
                  <span className="icon-flip"><s.Icon size={28} className="mx-auto mb-2" /></span>
                  <div className="num-huge text-2xl sm:text-3xl mb-1 leading-none text-accent">{s.render()}</div>
                  <div className="text-xs sm:text-sm font-bold text-ink">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ MEMBER JOBS — 2 그룹 카드 + SVG ═══ */
export function AppleMemberJobs() {
  const groups = [
    { label: "여성 회원", jobs: ["교사", "통역사", "간호사", "아나운서", "승무원", "공무원", "경리", "디자이너"], Icon: IconHeart },
    { label: "남성 회원", jobs: ["공기업", "공무원", "대기업", "교사", "엔지니어", "사업가", "스타트업", "회계사"], Icon: IconRing },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="label-sm mb-4">ACTIVE MEMBERS</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            이런 분들이 <span className="text-rainbow relative inline-block">함께하고 있어요<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft font-medium">현재 활동 중인 검증된 회원들의 직업 분포</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 reveal">
          {groups.map((g, i) => (
            <div key={i} className="card-rainbow group bg-white p-8 sm:p-10 relative">
              <CornerOrnament size={50} className="top-0 right-0" />
              <div className="flex items-center gap-3 mb-6">
                <span className="icon-flip"><g.Icon size={36} /></span>
                <h3 className="text-xl sm:text-2xl font-bold text-accent" style={{ fontWeight: 700 }}>{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.jobs.map((j, k) => (
                  <span key={k} className="px-4 py-2 rounded-full text-sm font-bold text-ink bg-accent-soft">{j}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-8 text-ink-soft font-medium reveal">
          모든 회원은 재직증명서·신분 확인을 거친 <strong className="text-ink">검증된 실회원</strong>입니다.
        </p>
      </div>
    </section>
  );
}

/* ═══ PROMISE — 6 카드 + 각자 SVG ═══ */
export function ApplePromise() {
  const promises = [
    { n: "01", t: "아무나 받지 않습니다", d: "전문 매칭사가 신원과 진정성을 직접 확인한 회원만 받습니다.", Icon: IconShield },
    { n: "02", t: "딱 맞게 매칭해드립니다", d: "거리·나이·종교·직업·가치관까지 직접 분석해 한 분 한 분 맞춰드립니다.", Icon: IconLocation },
    { n: "03", t: "매칭 후 결제", d: "선불 결제 없음. 실제 매칭 성사 경우에만 결제하는 100% 후불제.", Icon: IconCurrency },
    { n: "04", t: "사진·프로필 직접 전달", d: "실제 사진과 자세한 프로필을 매칭된 1:1 상대에게만 비공개로 전달.", Icon: IconLock },
    { n: "05", t: "100% 실회원", d: "재직증명서·혼인관계증명서로 신원이 검증된 실제 회원과만 매칭.", Icon: IconBadge },
    { n: "06", t: "정성스러운 관리", d: "매칭 후 만남 피드백, 다음 소개 조정까지 전담 매칭사가 함께합니다.", Icon: IconHeart },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="label-sm mb-4">OUR PROMISE</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            인연연구소의 <span className="text-rainbow relative inline-block">약속<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft font-medium">회원님께 드리는 6가지 다짐</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 reveal">
          {promises.map((p, i) => (
            <div key={i} className="card-rainbow group bg-white p-7 sm:p-9 relative">
              <CornerOrnament size={50} className="top-0 right-0" />
              <div className="flex items-start gap-4 mb-4">
                <span className="icon-flip"><p.Icon size={36} /></span>
                <div className="num-huge text-2xl text-accent">{p.n}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5 link-underline" style={{ fontWeight: 700 }}>{p.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-medium">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SAFETY — 4단계 + SVG ═══ */
export function AppleSafety() {
  const steps = [
    { n: "01", t: "본인 확인", d: "재직증명서·혼인관계증명서 등으로 신원을 확인합니다. 검증 후 원본은 즉시 폐기.", Icon: IconBadge },
    { n: "02", t: "암호화 저장", d: "프로필 정보는 암호화되어 저장됩니다. 외부에서 절대 접근할 수 없습니다.", Icon: IconLock },
    { n: "03", t: "1:1 비공개 전달", d: "프로필은 매칭이 확정된 상대에게만 비공개로 전달됩니다.", Icon: IconMail },
    { n: "04", t: "종료 후 파기", d: "서비스 이용 종료 시 모든 개인정보를 즉시 파기합니다.", Icon: IconShield },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="mb-12 reveal text-center">
          <div className="label-sm mb-4">PRIVACY & SAFETY</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            당신의 정보,<br />
            <span className="text-rainbow relative inline-block">이렇게 지킵니다<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft font-medium">프로필이 무분별하게 공개되지 않는 이유</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {steps.map((s, i) => (
            <div key={i} className="card-rainbow group bg-white p-7">
              <span className="icon-flip"><s.Icon size={36} /></span>
              <div className="num-huge text-2xl mt-4 mb-2 text-accent">{s.n}</div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5 link-underline" style={{ fontWeight: 700 }}>{s.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-medium">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-2xl mx-auto text-center reveal bg-white/70 backdrop-blur rounded-2xl p-6 border border-line">
          <p className="text-base font-bold text-ink mb-2">개인정보보호법을 준수합니다.</p>
          <p className="text-sm text-ink-soft leading-relaxed font-medium">수집·이용·보관·파기 전 과정이 법적 기준을 충족하며, 매칭 외 목적으로 절대 사용되지 않습니다.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING — 3 카드 ═══ */
export function ApplePricing() {
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="label-sm mb-4">PRICING</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            가입비 없이, <span className="text-rainbow relative inline-block">매칭 후 결제<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft font-medium">합리적인 가격, 그 이상의 퀄리티</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto reveal">
          {/* 여성 */}
          <div className="card-rainbow group bg-white p-8 sm:p-10 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="label-sm">여성 회원</div>
              <IconHeart size={32} />
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="num-huge text-5xl text-accent">6만원</span>
              <span className="text-sm text-ink-soft font-bold">/회</span>
            </div>
            <p className="text-sm text-ink-soft mb-7 font-medium">매칭 성사 시 결제 (후불제)</p>
            <div className="space-y-3 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink font-semibold"><IconCheck size={16} />{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-secondary w-full font-bold">상담 받기</a>
          </div>

          {/* 남성 */}
          <div className="card-rainbow group bg-white p-8 sm:p-10 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="label-sm">남성 회원</div>
              <IconRing size={32} />
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="num-huge text-5xl text-accent">9만원</span>
              <span className="text-sm text-ink-soft font-bold">/회</span>
            </div>
            <p className="text-sm text-ink-soft mb-7 font-medium">매칭 성사 시 결제 (후불제)</p>
            <div className="space-y-3 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink font-semibold"><IconCheck size={16} />{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-secondary w-full font-bold">상담 받기</a>
          </div>

          {/* 무제한 BEST */}
          <div className="card-rainbow group p-8 sm:p-10 text-ink bg-white relative" style={{ borderColor: "rgba(236,77,126,0.5)", boxShadow: "0 12px 30px -10px rgba(236,77,126,0.25)" }}>
            <div className="absolute -top-3 right-6 text-white text-xs font-extrabold px-4 py-1 rounded-full shadow-lg bg-accent">BEST</div>
            <div className="flex items-start justify-between mb-4">
              <div className="label-sm">UNLIMITED</div>
              <span className="icon-flip"><IconCrown size={36} /></span>
            </div>
            <div className="mb-2">
              <span className="num-huge text-4xl text-accent">무제한 매칭</span>
            </div>
            <p className="text-sm text-ink-soft mb-7 font-medium">횟수 제한 없이 매칭 + 컨설팅</p>
            <div className="space-y-3 mb-8">
              {["매칭 횟수 무제한", "조건별 맞춤 매칭", "1:1 전문 컨설팅", "연애 코칭 & 스타일링", "VIP 전담 관리"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink font-semibold"><IconCheck size={16} />{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-gradient w-full font-bold">무제한 상담</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS — 4단계 timeline 연결선 ═══ */
export function AppleProcess() {
  const steps = [
    { n: "01", t: "상담 신청", d: "카카오톡 ID inyeon_ 으로 간편하게 신청하세요.", Icon: IconChat },
    { n: "02", t: "서류 검토", d: "재직증명서·혼인관계증명서 등으로 신원 확인", Icon: IconDocument },
    { n: "03", t: "맞춤 매칭", d: "거리·나이·종교·직업 등 조건 반영 매칭", Icon: IconLocation },
    { n: "04", t: "인연 시작", d: "프로필 전달 후 설레는 만남 시작", Icon: IconCoffee },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="label-sm mb-4">HOW IT WORKS</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            4단계로 시작하는 <span className="text-rainbow relative inline-block">인연<HandUnderline /></span>.
          </h2>
        </div>
        <div className="relative reveal">
          {/* 데스크탑 가로 연결선 (점선) */}
          <div className="hidden lg:block absolute top-[68px] left-0 right-0 px-[12.5%] pointer-events-none">
            <div className="w-full h-px border-t-2 border-dashed border-accent/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((s, i) => (
              <div key={i} className="card-rainbow group bg-white p-7 relative">
                {/* 동그란 번호 배지 (timeline 노드) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="icon-flip"><s.Icon size={40} /></span>
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-accent text-white font-extrabold text-sm flex items-center justify-center shadow-lg">
                      {s.n}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 link-underline" style={{ fontWeight: 700 }}>{s.t}</h3>
                <p className="text-sm text-ink-soft leading-relaxed font-medium">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES — 4 카드 + SVG ═══ */
export function AppleFeatures() {
  const features = [
    { t: "매칭 후 결제 후불제", d: "매칭이 성사되어야 비용이 발생. 선불 부담 없이 안심하고 시작.", Icon: IconCurrency },
    { t: "조건별 맞춤 매칭", d: "거리·나이·종교·직업 등 조건을 세밀하게 반영해 딱 맞는 상대를 찾아드립니다.", Icon: IconStarShine },
    { t: "확실한 신원보장", d: "재직증명서·혼인관계증명서 등 꼼꼼한 서류검토로 안전한 만남 보장.", Icon: IconShield },
    { t: "1:1 전문 컨설팅", d: "프로필 작성부터 만남 후 피드백까지, 연애 전문가가 함께합니다.", Icon: IconChat },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="label-sm mb-4">WHY US</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            인연연구소만의 <span className="text-rainbow relative inline-block">특별한 장점<HandUnderline /></span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {features.map((f, i) => (
            <div key={i} className="card-rainbow group bg-white p-7 sm:p-9">
              <span className="icon-flip"><f.Icon size={42} className="mb-5" /></span>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5 link-underline" style={{ fontWeight: 700 }}>{f.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-medium">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONSULT — glass card CTA (페이지 캔버스 위에 떠 있는) ═══ */
export function AppleConsult() {
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="card-rainbow rounded-3xl p-10 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-ink bg-white relative">
          <CornerOrnament size={70} className="top-0 left-0" />
          <CornerOrnament size={70} className="bottom-0 right-0 rotate-180" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <IconChat size={40} />
              <div className="label-sm">CONSULTING</div>
            </div>
            <h2 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
              전문 매칭사의<br />
              <span className="text-rainbow relative inline-block">1:1 컨설팅<HandUnderline /></span>.
            </h2>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed font-medium">
              첫 만남이 어색한 분, 연애가 오래 이어지지 않는 분.<br />
              <strong className="text-ink">연애 전문 상담사가 함께합니다.</strong>
            </p>
          </div>
          <div className="lg:text-right">
            <a href="/contact" className="btn btn-gradient inline-flex font-bold">
              상담 시작 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
import { useState } from "react";

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const c = ["#ec4d7e", "#ff6ba0", "#fb7185", "#d4567a", "#ff8da8"][i % 5];
  return (
    <div className="card-rainbow bg-white-solid mb-3 sm:mb-4 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-5 sm:p-6 flex items-center justify-between text-left group">
        <span className="text-base sm:text-lg font-bold text-ink pr-6" style={{ fontWeight: 700 }}>{q}</span>
        <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md transition-all" style={{ background: c, transform: open ? "rotate(180deg)" : "none" }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-base text-ink-soft leading-relaxed font-medium">{a}</p>
      </div>
    </div>
  );
}

export function AppleFAQ() {
  const fqs = [
    { q: "어떤 서류를 제출해야 하나요?", a: "재직증명서·혼인관계증명서 등을 기본으로 요청드립니다. 서류는 매칭 목적 외 절대 사용되지 않으며, 종료 후 안전하게 폐기됩니다." },
    { q: "매칭까지 얼마나 걸리나요?", a: "서류 확인 후 평균 48시간 이내에 첫 프로필을 제안합니다." },
    { q: "소개팅 앱과 뭐가 다른가요?", a: "앱은 사진으로만 판단하지만, 인연연구소는 서류 검증 + 전문 상담사의 성격·가치관 분석 기반 매칭입니다." },
    { q: "결혼을 전제로 해야 하나요?", a: "아닙니다. 가벼운 소개팅부터 진지한 만남까지, 목적에 맞춰 매칭해 드립니다." },
    { q: "개인정보는 안전한가요?", a: "모든 서류와 개인정보는 암호화 저장하며, 매칭 목적 외 절대 제3자에게 공유되지 않습니다." },
  ];
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple max-w-3xl">
        <div className="text-center mb-10 reveal">
          <div className="label-sm mb-4">FAQ</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            자주 묻는 <span className="text-rainbow relative inline-block">질문<HandUnderline /></span>.
          </h2>
        </div>
        <div className="reveal">
          {fqs.map((f, i) => <FaqItem key={i} {...f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT — glass card 카톡 ═══ */
export function AppleContact() {
  return (
    <section className={`relative ${SECTION_PY}`}>
      <div className="container-apple">
        <div className="card-rainbow rounded-3xl p-10 sm:p-14 lg:p-16 text-center text-ink bg-white relative">
          <CornerOrnament size={80} className="top-0 left-0" />
          <CornerOrnament size={80} className="top-0 right-0 -scale-x-100" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent-soft">
              <Sparkle size={14} />
              <div className="label-sm">CONTACT</div>
            </div>
            <h2 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
              당신의 인연,<br />
              <span className="text-rainbow relative inline-block">여기서 시작됩니다<HandUnderline /></span>.
            </h2>
            <p className="text-base sm:text-lg text-ink-soft mb-3 font-medium">무료 상담으로 부담 없이 시작해 보세요.</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm mb-10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-extrabold text-accent">365일 · 밤 12시까지 상담</span>
            </div>

            {/* 카톡 ID 카드 */}
            <div className="max-w-md mx-auto mb-8 bg-accent-soft rounded-2xl p-7 text-ink">
              <div className="label-sm mb-4">카카오톡으로 문의 주세요</div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-yellow-300 shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{KAKAO_ID}</span>
              </div>
              <p className="text-xs text-ink-soft font-medium">친구 추가 후 메시지를 보내주세요</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-white text-ink hover:bg-white/90 w-full sm:w-auto shadow-md font-bold">
                인스타그램 @inyeon_lab
              </a>
              <a href="tel:010-7617-0181" className="btn btn-secondary bg-white text-ink hover:bg-white/90 w-full sm:w-auto shadow-md font-bold">
                {I.phone("w-4 h-4")} 010-7617-0181
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
