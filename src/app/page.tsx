"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
import PhotoStory from "@/components/PhotoStory";
import { BurstStar } from "@/components/PremiumDeco";
import {
  useReveal,
  EventBanner,
  Navbar,
  HeroSection,
  IdealMatchSection,
  TrustBar,
  Footer,
} from "@/sections";

function PageNav() {
  const items = [
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템", n: "01", c: "linear-gradient(135deg, #ec4d7e, #fb7185)" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", n: "02", c: "linear-gradient(135deg, #ff6ba0, #ec4d7e)" },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인", n: "03", c: "linear-gradient(135deg, #fb7185, #ff8da8)" },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_", n: "04", c: "linear-gradient(135deg, #d4567a, #ec4d7e)" },
  ];
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple relative">
        <div className="text-center mb-16 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card">
            <BurstStar size={14} />
            <span className="label-sm text-pink-purple">EXPLORE</span>
          </div>
          <h2 className="h-section font-bold text-ink text-glow-multi" style={{ fontWeight: 700 }}>
            더 자세히 <span className="text-rainbow">알아보기.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href} className="card-rainbow hover-magnetic group p-8 sm:p-10 flex flex-col justify-between min-h-[230px] relative bg-white overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: it.c }} />
              <div className="relative flex items-start justify-between mb-3">
                <span className="label-sm" style={{ background: it.c, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{it.n}</span>
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-all group-hover:scale-110" style={{ background: it.c }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </div>
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2 underline-grow inline-block" style={{ fontWeight: 700 }}>{it.t}</h3>
                <p className="text-sm text-ink-soft">{it.d}</p>
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
    <main className="relative bg-white">
      <EventBanner />
      <Navbar />
      <HeroSection />
      <IdealMatchSection />
      <TrustBar />
      <PhotoStory />
      <BigQuote />
      <BentoBenefits />
      <BigStats />
      <KakaoFlow />
      <PageNav />
      <Footer />
      <ChatWidget />
    </main>
  );
}
