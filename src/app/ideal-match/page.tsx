"use client";
import { useState, useEffect } from "react";

const PINK = "#d4567a";
const PINK_LIGHT = "#ffe9f0";
const SB = "#222";
const MT = "#888";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

/* ═══ SVG ICONS ═══ */
const Icons = {
  back: (c = "w-5 h-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
  arrowR: (c = "w-5 h-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  check: (c = "w-6 h-6") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  sparkle: (c = "w-5 h-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  heart: (c = "w-6 h-6") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ),
  x: (c = "w-5 h-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),

  /* === 옵션 아이콘 === */
  male: (c = "w-12 h-12") => (
    <svg className={c} viewBox="0 0 64 64" fill="none">
      <circle cx="44" cy="20" r="10" stroke="currentColor" strokeWidth="3" />
      <path d="M44 30L44 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 38L52 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  female: (c = "w-12 h-12") => (
    <svg className={c} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="22" r="11" stroke="currentColor" strokeWidth="3" />
      <path d="M32 33L32 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 46L40 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  pin: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  star: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
    </svg>
  ),
  cake: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546V21h18v-5.454zM3 12v3h18v-3M5 8a3 3 0 016 0v4H5V8zm8 0a3 3 0 016 0v4h-6V8z" />
    </svg>
  ),
  briefcase: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.16 2.16 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  bowtie: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 64 64" fill="none">
      <path d="M32 32L14 22V42L32 32Z" fill="currentColor" />
      <path d="M32 32L50 22V42L32 32Z" fill="currentColor" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  ),
  bookOpen: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  smileWink: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="32" cy="32" r="24" />
      <circle cx="24" cy="26" r="2" fill="currentColor" />
      <path d="M38 26L44 26" strokeLinecap="round" />
      <path d="M22 40Q32 48 42 40" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  sparkle3: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1l2.5 7L21 9.5l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7L3 9.5 9.5 8 12 1z" />
    </svg>
  ),
  diamond: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689L12 3l9 5.689L12 21L3 8.689z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689h18M8 8.689L12 3l4 5.689M12 21l-4-12.311M12 21l4-12.311" />
    </svg>
  ),
  flower: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="6" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <circle cx="12" cy="18" r="3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  infinity: (c = "w-10 h-10") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.739-8z" />
    </svg>
  ),
  phone: (c = "w-7 h-7") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
};

/* ═══ STEP DEFINITIONS ═══ */
type Option = { value: string; label: string; icon: (c?: string) => React.ReactNode; sub?: string };
type Step = { key: string; title: string; subtitle: string; options: Option[]; columns?: 2 | 3 };

const STEPS: Step[] = [
  {
    key: "gender",
    title: "본인의 성별을 알려주세요",
    subtitle: "맞춤 매칭을 위한 첫 번째 단계예요",
    columns: 2,
    options: [
      { value: "남성", label: "남성", icon: Icons.male },
      { value: "여성", label: "여성", icon: Icons.female },
    ],
  },
  {
    key: "age_range",
    title: "본인의 나이대는요?",
    subtitle: "비슷한 또래끼리 매칭됩니다",
    columns: 2,
    options: [
      { value: "20대 초반", label: "20대 초반", sub: "20–24", icon: Icons.cake },
      { value: "20대 후반", label: "20대 후반", sub: "25–29", icon: Icons.cake },
      { value: "30대 초반", label: "30대 초반", sub: "30–34", icon: Icons.cake },
      { value: "30대 후반", label: "30대 후반", sub: "35–39", icon: Icons.cake },
      { value: "40대 이상", label: "40대 이상", sub: "40+", icon: Icons.cake },
    ],
  },
  {
    key: "region",
    title: "본인이 거주하시는 지역은?",
    subtitle: "활동 가능한 지역 위주로 매칭됩니다",
    columns: 3,
    options: [
      { value: "서울", label: "서울", icon: Icons.pin },
      { value: "경기·인천", label: "경기·인천", icon: Icons.pin },
      { value: "강원", label: "강원", icon: Icons.pin },
      { value: "충청", label: "충청", icon: Icons.pin },
      { value: "전라", label: "전라", icon: Icons.pin },
      { value: "경상", label: "경상", icon: Icons.pin },
      { value: "제주", label: "제주", icon: Icons.pin },
    ],
  },
  {
    key: "ideal_age",
    title: "원하시는 이상형의 나이대는?",
    subtitle: "조건에 맞는 회원만 추천드려요",
    columns: 2,
    options: [
      { value: "20대 초반", label: "20대 초반", sub: "20–24", icon: Icons.heart },
      { value: "20대 후반", label: "20대 후반", sub: "25–29", icon: Icons.heart },
      { value: "30대 초반", label: "30대 초반", sub: "30–34", icon: Icons.heart },
      { value: "30대 후반", label: "30대 후반", sub: "35–39", icon: Icons.heart },
      { value: "40대 이상", label: "40대 이상", sub: "40+", icon: Icons.heart },
      { value: "무관", label: "무관", icon: Icons.infinity },
    ],
  },
  {
    key: "ideal_region",
    title: "이상형의 지역은 어디가 좋을까요?",
    subtitle: "거리가 가까울수록 만남이 자연스러워요",
    columns: 3,
    options: [
      { value: "서울", label: "서울", icon: Icons.pin },
      { value: "경기·인천", label: "경기·인천", icon: Icons.pin },
      { value: "강원", label: "강원", icon: Icons.pin },
      { value: "충청", label: "충청", icon: Icons.pin },
      { value: "전라", label: "전라", icon: Icons.pin },
      { value: "경상", label: "경상", icon: Icons.pin },
      { value: "제주", label: "제주", icon: Icons.pin },
      { value: "무관", label: "무관", icon: Icons.infinity },
    ],
  },
  {
    key: "ideal_style",
    title: "선호하시는 외적 스타일이 있나요?",
    subtitle: "분위기로 가볍게 골라주세요",
    columns: 2,
    options: [
      { value: "단정한", label: "단정한", sub: "깔끔하고 차분한", icon: Icons.bowtie },
      { value: "지적인", label: "지적인", sub: "차분한 매력", icon: Icons.bookOpen },
      { value: "귀여운", label: "귀여운", sub: "사랑스러운 분위기", icon: Icons.smileWink },
      { value: "발랄한", label: "발랄한", sub: "에너지 있는", icon: Icons.sparkle3 },
      { value: "세련된", label: "세련된", sub: "감각적인 스타일", icon: Icons.diamond },
      { value: "청순한", label: "청순한", sub: "맑고 깨끗한", icon: Icons.flower },
      { value: "무관", label: "무관", sub: "어떤 스타일이든 OK", icon: Icons.infinity },
    ],
  },
];

type Answers = Record<string, string>;

export default function IdealMatchPage() {
  // -1: 시작 화면 / 0..STEPS.length-1: 질문 / STEPS.length: 연락처 / STEPS.length+1: 완료
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tick, setTick] = useState(0); // 애니메이션 트리거

  useEffect(() => { setTick(t => t + 1); }, [step]);

  const totalSteps = STEPS.length + 1; // 질문 + 연락처
  const currentQ = step >= 0 && step < STEPS.length ? STEPS[step] : null;

  const select = (val: string) => {
    if (!currentQ) return;
    setAnswers(a => ({ ...a, [currentQ.key]: val }));
    // 자동 다음
    setTimeout(() => {
      setDirection(1);
      setStep(s => s + 1);
    }, 280);
  };

  const next = () => {
    setDirection(1);
    setStep(s => s + 1);
  };
  const prev = () => {
    setDirection(-1);
    setStep(s => Math.max(-1, s - 1));
  };

  const submit = async () => {
    setErrMsg("");
    if (!phone.trim()) { setErrMsg("연락받을 번호를 입력해주세요."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/ideal-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, ...answers, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        window.fbq?.("track", "Lead");
        setDirection(1);
        setStep(STEPS.length + 1); // 완료 화면
      } else {
        setErrMsg(data?.error || "다시 시도해주세요.");
      }
    } catch {
      setErrMsg("네트워크 오류");
    }
    setSubmitting(false);
  };

  const progress = step === -1 ? 0 : step >= STEPS.length ? 100 : ((step + 1) / totalSteps) * 100;

  return (
    <main className="min-h-screen relative" style={{ background: "linear-gradient(160deg, #fff5f8, #ffffff 40%, #fff0f5)" }}>
      {/* 배경 장식 — overflow-hidden을 별도 wrapper로 격리해 sticky 헤더와 충돌 안 함 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: PINK_LIGHT }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "#ffe0eb" }} />
      </div>

      {/* 헤더: 진행률 + 닫기 */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-pink-50">
        <div className="max-w-xl mx-auto px-5 py-3.5 flex items-center gap-3">
          <a href="/" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors" aria-label="홈으로" style={{ color: SB }}>
            {Icons.x()}
          </a>
          <div className="flex-1 h-1.5 rounded-full bg-pink-50 overflow-hidden">
            <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${PINK}, #e8457f)` }} />
          </div>
          <div className="text-[11px] font-bold tabular-nums" style={{ color: PINK }}>
            {step === -1 ? "0" : step >= STEPS.length ? totalSteps : step + 1}
            <span style={{ color: MT }}> / {totalSteps}</span>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 pb-10">
        <div key={tick} className="step-anim" style={{ ["--dir" as string]: direction }}>
          {/* === 시작 화면 === */}
          {step === -1 && (
            <section className="pt-12 sm:pt-16 pb-8 text-center">
              <div className="w-20 h-20 rounded-3xl mx-auto mb-7 flex items-center justify-center shadow-xl shadow-pink-200/50" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)`, color: "white" }}>
                {Icons.heart("w-10 h-10")}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4" style={{ background: `${PINK}10`, color: PINK }}>
                {Icons.sparkle("w-3.5 h-3.5")}
                <span className="text-[11px] font-bold tracking-widest">IDEAL MATCH</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight" style={{ color: SB, fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
                내 이상형과<br />매칭될 수 있을까?
              </h1>
              <p className="text-sm leading-relaxed mb-10" style={{ color: MT }}>
                간단한 6가지 질문에 답하면<br />담당 매칭사가 직접 가능성을 확인해드려요.
              </p>

              <div className="space-y-3 max-w-sm mx-auto mb-10 text-left">
                {[
                  { t: "1분이면 끝나요", d: "선택지만 탭하시면 됩니다" },
                  { t: "여성 회원 1회 무료", d: "남성 회원도 저렴한 가격으로 소개" },
                  { t: "전문 매칭사 1:1 연락", d: "조건에 맞는 분이 있을 때만" },
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white shadow-sm">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${PINK}15`, color: PINK }}>
                      {Icons.check("w-4 h-4")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold" style={{ color: SB }}>{b.t}</div>
                      <div className="text-[11.5px] mt-0.5" style={{ color: MT }}>{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => { setDirection(1); setStep(0); }}
                className="w-full max-w-sm mx-auto inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-extrabold text-white shadow-xl shadow-pink-300/40 hover:shadow-2xl active:scale-[0.98] transition-all"
                style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
                진단 시작하기 {Icons.arrowR("w-4 h-4")}
              </button>
              <p className="text-[10.5px] mt-3" style={{ color: "#bbb" }}>
                입력 정보는 매칭 외 목적으로 사용되지 않습니다.
              </p>
            </section>
          )}

          {/* === 질문 단계 === */}
          {currentQ && (
            <section className="pt-8 sm:pt-12 pb-6">
              <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: PINK }}>
                STEP {step + 1}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mb-2 leading-tight" style={{ color: SB }}>
                {currentQ.title}
              </h2>
              <p className="text-[13px] mb-7" style={{ color: MT }}>{currentQ.subtitle}</p>

              <div className={`grid gap-3 ${currentQ.columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
                {currentQ.options.map(opt => {
                  const active = answers[currentQ.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => select(opt.value)}
                      className="group relative aspect-square rounded-2xl border-2 transition-all overflow-hidden hover:-translate-y-1"
                      style={{
                        background: active ? `linear-gradient(135deg, ${PINK}, #e8457f)` : "white",
                        borderColor: active ? PINK : "#f3e7ec",
                        color: active ? "white" : SB,
                        boxShadow: active ? `0 12px 28px ${PINK}33` : "0 2px 8px rgba(0,0,0,0.03)",
                      }}
                    >
                      {/* 체크 마크 */}
                      {active && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow" style={{ color: PINK }}>
                          {Icons.check("w-3.5 h-3.5")}
                        </div>
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                        <div className="mb-2" style={{ color: active ? "white" : PINK }}>
                          {opt.icon("w-10 h-10")}
                        </div>
                        <div className="text-sm font-extrabold">{opt.label}</div>
                        {opt.sub && (
                          <div className="text-[10.5px] mt-0.5 opacity-75">{opt.sub}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 이전/건너뛰기 */}
              <div className="flex items-center justify-between mt-8">
                <button onClick={prev} className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors" style={{ color: MT }}>
                  {Icons.back("w-4 h-4")} 이전
                </button>
                {!answers[currentQ.key] && (
                  <button onClick={next} className="text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors" style={{ color: MT }}>
                    건너뛰기
                  </button>
                )}
              </div>
            </section>
          )}

          {/* === 연락처 입력 === */}
          {step === STEPS.length && (
            <section className="pt-8 sm:pt-12 pb-8">
              <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: PINK }}>
                STEP {totalSteps}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mb-2 leading-tight" style={{ color: SB }}>
                연락받을 번호를 알려주세요
              </h2>
              <p className="text-[13px] mb-6" style={{ color: MT }}>
                담당 매칭사가 직접 확인 후 연락드려요
              </p>

              <div className="rounded-2xl p-5 mb-5" style={{ background: `linear-gradient(135deg, ${PINK}08, ${PINK}03)`, border: `1px solid ${PINK}20` }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: PINK, color: "white" }}>
                    {Icons.heart("w-4 h-4")}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold mb-1" style={{ color: SB }}>
                      여성 회원 <span style={{ color: PINK }}>1회 무료</span> · 남성 회원도 저렴한 가격
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: MT }}>
                      이상형 조건에 맞는 분이 있을 경우<br />담당 매칭사가 직접 연락드리겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off"
                value={website} onChange={e => setWebsite(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                aria-hidden="true" />

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: PINK }}>
                  {Icons.phone("w-5 h-5")}
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  maxLength={13}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) submit(); }}
                  className="w-full rounded-2xl pl-12 pr-4 py-4 text-base font-semibold border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  style={{ color: SB }}
                  autoFocus
                />
              </div>
              {errMsg && <p className="text-xs text-red-500 mt-2 px-1">{errMsg}</p>}

              {/* 응답 요약 (있는 항목만) */}
              {Object.keys(answers).length > 0 && (
                <div className="mt-6 rounded-2xl bg-white p-4 border border-pink-50">
                  <p className="text-[11px] font-bold mb-3 tracking-widest" style={{ color: PINK }}>나의 진단 요약</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(answers).map(([k, v]) => (
                      <span key={k} className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-medium" style={{ background: `${PINK}08`, color: PINK }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-7">
                <button onClick={prev} disabled={submitting}
                  className="px-5 py-3.5 rounded-2xl text-sm font-semibold bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  style={{ color: SB }}>
                  이전
                </button>
                <button onClick={submit} disabled={submitting || !phone.trim()}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-extrabold text-white shadow-lg shadow-pink-300/30 transition-all disabled:opacity-40 hover:shadow-xl active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
                  {submitting ? "접수 중..." : "매칭 가능성 확인 요청"}
                </button>
              </div>
            </section>
          )}

          {/* === 완료 화면 === */}
          {step === STEPS.length + 1 && (
            <section className="pt-16 sm:pt-20 pb-10 text-center">
              <div className="relative w-24 h-24 mx-auto mb-7">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: PINK, opacity: 0.2 }} />
                <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-xl shadow-pink-300/40" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)`, color: "white" }}>
                  {Icons.check("w-12 h-12")}
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight" style={{ color: SB, fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
                접수 완료!
              </h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: MT }}>
                담당 매칭사가 진단 결과를 검토한 후<br />
                빠른 시일 내에 연락드릴게요.
              </p>

              <div className="rounded-2xl p-5 mb-8 max-w-sm mx-auto" style={{ background: `${PINK}05`, border: `1px solid ${PINK}15` }}>
                <p className="text-[12px] leading-relaxed" style={{ color: MT }}>
                  더 자세한 상담이 필요하시면<br />
                  <strong style={{ color: PINK }}>카톡 ID: inyeon_</strong>으로 메시지 주세요.
                </p>
              </div>

              <a href="/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
                홈으로 돌아가기
              </a>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        .step-anim {
          animation: stepIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes stepIn {
          from {
            opacity: 0;
            transform: translateX(calc(var(--dir, 1) * 16px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
