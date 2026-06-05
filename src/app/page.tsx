"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
import PhotoStory from "@/components/PhotoStory";
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
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제" },
    { href: "/ideal-match", t: "이상형 매칭 진단", d: "1분 진단으로 매칭 확인" },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_" },
  ];
  return (
    <section className="bg-base py-24 sm:py-32 lg:py-40">
      <div className="container-apple">
        <div className="text-center mb-16 sm:mb-20 reveal">
          <div className="label-sm mb-6">EXPLORE</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            더 자세히 알아보기.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {items.map((it, i) => (
            <a key={i} href={it.href} className="card card-hover p-8 sm:p-10 flex flex-col justify-between min-h-[200px]">
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2" style={{ fontWeight: 700 }}>{it.t}</h3>
              <div>
                <p className="text-sm text-ink-soft mb-4">{it.d}</p>
                <span className="btn-link">바로가기 →</span>
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
