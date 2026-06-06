"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
import PhotoStory from "@/components/PhotoStory";
import { IconHeart, IconCurrency, IconStarShine, IconChat, Sparkle, HandUnderline } from "@/components/Icons";
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
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템", n: "01", Icon: IconHeart },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", n: "02", Icon: IconCurrency },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인", n: "03", Icon: IconStarShine },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_", n: "04", Icon: IconChat },
  ];
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <div className="label-sm">EXPLORE</div>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            더 자세히 <span className="text-rainbow relative inline-block">알아보기<HandUnderline /></span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href} className="card-rainbow hover-magnetic group p-8 flex flex-col justify-between min-h-[210px] bg-white">
              <div className="flex items-start justify-between mb-3">
                <it.Icon size={38} />
                <span className="label-sm">{it.n}</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2" style={{ fontWeight: 700 }}>{it.t}</h3>
                <p className="text-sm text-ink-soft">{it.d}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:gap-2 transition-all">
                  바로가기
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
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
