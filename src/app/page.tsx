"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
import { WaveDivider, CurveDivider, OrnamentDivider } from "@/components/Divider";
import {
  useReveal,
  EventBanner,
  Navbar,
  HeroSection,
  IdealMatchSection,
  TrustBar,
  Footer,
} from "@/sections";

const PINK = "#d4567a";
const MT = "#666";

const IconHeart = (c = "w-6 h-6") => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);
const IconDiamond = (c = "w-6 h-6") => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689L12 3l9 5.689L12 21L3 8.689zM3 8.689h18M8 8.689L12 3l4 5.689M12 21l-4-12.311M12 21l4-12.311" />
  </svg>
);
const IconSparkle = (c = "w-6 h-6") => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
  </svg>
);
const IconChat = (c = "w-6 h-6") => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

const ArrowR = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function PageNav() {
  // 카드별 액센트 컬러로 단조로움 해소
  const items = [
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템", icon: IconHeart, c: "#d4567a" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", icon: IconDiamond, c: "#c9956b" },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인", icon: IconSparkle, c: "#b58dc4" },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_", icon: IconChat, c: "#7fa896" },
  ];
  return (
    <section className="py-20 sm:py-28 mesh-plum relative overflow-hidden">
      {/* 배경 데코 — 부드러운 골드 점들 */}
      <div className="absolute top-20 left-[8%] w-2 h-2 rounded-full bg-white/40 anim-twinkle" />
      <div className="absolute top-40 right-[15%] w-1.5 h-1.5 rounded-full bg-white/30 anim-twinkle" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-24 left-[22%] w-2.5 h-2.5 rounded-full bg-white/35 anim-twinkle" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-32 right-[10%] w-1.5 h-1.5 rounded-full bg-white/40 anim-twinkle" style={{ animationDelay: "0.5s" }} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-white/10 border border-white/20 backdrop-blur-sm" style={{ color: "#ffd6e1" }}>
            <span className="star-deco anim-twinkle" style={{ width: "10px", height: "10px" }} />
            <span className="text-[11px] font-extrabold tracking-[0.22em]">EXPLORE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            더 자세히 <span className="text-aurora">알아보기</span>
          </h2>
          <p className="text-sm mt-3 text-white/65">궁금한 부분을 클릭해서 자세히 확인하세요</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              style={{ ["--ac" as string]: `${it.c}40`, ["--ac2" as string]: it.c }}
              className="card-aurora group p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" style={{ background: `linear-gradient(135deg, ${it.c}, ${it.c}cc)`, boxShadow: `0 8px 22px -4px ${it.c}55` }}>
                  {it.icon("w-6 h-6")}
                </div>
                <div className="text-base font-extrabold mb-1.5" style={{ color: "#1a1a1f" }}>{it.t}</div>
                <div className="text-[12.5px]" style={{ color: MT }}>{it.d}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: it.c }}>
                  바로가기 {ArrowR}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <main>
      <EventBanner />
      <Navbar />
      <HeroSection />
      <IdealMatchSection />
      <TrustBar />
      <BigQuote />
      <BentoBenefits />
      <BigStats />
      <KakaoFlow />
      <OrnamentDivider />
      <PageNav />
      <Footer />
      <ChatWidget />
    </main>
  );
}
