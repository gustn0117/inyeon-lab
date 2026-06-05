"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
import PhotoStory from "@/components/PhotoStory";
import { GlowOrbs, Sparkles, StarAccent } from "@/components/PremiumDeco";
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
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템", n: "01" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", n: "02" },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인", n: "03" },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_", n: "04" },
  ];
  return (
    <section className="relative bg-base py-24 sm:py-32 lg:py-40 overflow-hidden">
      <GlowOrbs variant="subtle" />
      <Sparkles count={4} />

      <div className="container-apple relative">
        <div className="text-center mb-16 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card">
            <StarAccent size={12} />
            <span className="label-sm">EXPLORE</span>
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            더 자세히 <span className="text-aurora-pink">알아보기.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href} className="hover-magnetic border-glow group card p-8 sm:p-10 flex flex-col justify-between min-h-[220px] relative bg-white">
              <div className="flex items-start justify-between mb-3">
                <span className="label-sm">{it.n}</span>
                <span className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2 underline-grow inline-block" style={{ fontWeight: 700 }}>{it.t}</h3>
              <p className="text-sm text-ink-soft">{it.d}</p>
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
