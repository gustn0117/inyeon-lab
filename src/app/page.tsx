"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
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

const ArrowR = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function PageNav() {
  const items = [
    { href: "/about", t: "인연연구소 소개", d: "어떤 곳인지 자세히 알아보세요", emoji: "💝" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", emoji: "💎" },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인", emoji: "✨" },
    { href: "/contact", t: "상담·문의", d: "카톡으로 바로 시작", emoji: "💌" },
  ];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${PINK}10`, color: PINK }}>
            <span className="text-[11px] font-bold tracking-widest">EXPLORE</span>
          </div>
          <h2 className="font-serif-kr text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "#222" }}>
            더 자세히 알아보기
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href}
              className="group rounded-3xl bg-white p-6 border border-pink-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-4">{it.emoji}</div>
              <div className="text-base font-extrabold mb-1.5" style={{ color: "#222" }}>{it.t}</div>
              <div className="text-[12.5px]" style={{ color: MT }}>{it.d}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: PINK }}>
                바로가기 {ArrowR}
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
      <KakaoFlow />
      <PageNav />
      <Footer />
      <ChatWidget />
    </main>
  );
}
