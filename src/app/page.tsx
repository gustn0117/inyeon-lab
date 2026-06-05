"use client";
import ChatWidget from "@/components/ChatWidget";
import KakaoFlow from "@/components/KakaoFlow";
import BigStats from "@/components/BigStats";
import BigQuote from "@/components/BigQuote";
import BentoBenefits from "@/components/BentoBenefits";
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
  // 리더 카드 + 작은 카드 (잡지 표지 인덱스)
  const lead = { href: "/ideal-match", t: "이상형 매칭 진단", d: "6가지 질문으로 매칭 가능성을 확인. 담당 매칭사의 답변까지 1분이면 충분.", num: "01" };
  const items = [
    { href: "/about", t: "인연연구소 소개", d: "검증된 회원, 안전한 시스템", num: "02" },
    { href: "/pricing", t: "가격·진행 절차", d: "가입비 0원, 매칭 후 결제", num: "03" },
    { href: "/contact", t: "상담·문의", d: "카톡 ID inyeon_", num: "04" },
  ];
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden mesh-ed-dark text-white">
      <div className="absolute top-20 left-[8%] w-1.5 h-1.5 rounded-full bg-white/40 anim-twinkle" />
      <div className="absolute bottom-32 right-[10%] w-2 h-2 rounded-full bg-white/30 anim-twinkle" style={{ animationDelay: "1.2s" }} />

      <div className="container-ed relative">
        {/* 헤더 */}
        <div className="mb-14 sm:mb-20 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-white/30" />
            <span className="label-ed" style={{ color: "var(--gold-soft)" }}>EXPLORE</span>
          </div>
          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-10 items-end">
            <h2 className="col-span-12 lg:col-span-8 h-display" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}>
              더 자세히<br />
              <span className="text-gradient">알아보기.</span>
            </h2>
            <p className="col-span-12 lg:col-span-4 text-sm sm:text-base text-white/65 leading-relaxed">
              궁금한 부분을 클릭하시면 해당 페이지로 안내해드립니다.
            </p>
          </div>
        </div>

        {/* 비대칭 — 큰 리더 카드 + 작은 3개 */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 reveal">
          {/* 리더 카드 (이상형 진단) */}
          <a href={lead.href} className="col-span-12 lg:col-span-6 group relative rounded-2xl overflow-hidden bg-paper text-ink p-8 sm:p-10 transition-all hover:-translate-y-2 min-h-[320px]">
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl opacity-50" style={{ background: "#c23065" }} />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="label-ed">{lead.num} · FEATURED</span>
                <span className="font-serif-en italic text-sm text-ink-soft">recommended</span>
              </div>
              <div>
                <h3 className="font-impact text-3xl sm:text-4xl lg:text-5xl mb-4 leading-[1.1]">
                  {lead.t}<br /><span className="text-gradient">바로 시작.</span>
                </h3>
                <p className="text-sm sm:text-base text-ink-soft mb-8 leading-relaxed max-w-md">
                  {lead.d}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink group-hover:gap-3 transition-all">
                  진단 시작하기
                  <span className="w-8 h-px bg-ink group-hover:w-12 transition-all" />
                </span>
              </div>
            </div>
          </a>

          {/* 작은 카드 3개 */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-5">
            {items.map((it, i) => (
              <a key={i} href={it.href}
                className="group relative rounded-2xl overflow-hidden glass-dark p-6 sm:p-7 transition-all hover:-translate-y-1 hover:border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <span className="label-ed" style={{ color: "var(--gold-soft)" }}>{it.num}</span>
                  <svg className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="font-impact text-lg sm:text-xl mb-1.5 text-white">{it.t}</h3>
                <p className="text-xs sm:text-sm text-white/55">{it.d}</p>
              </a>
            ))}
          </div>
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
      <PageNav />
      <Footer />
      <ChatWidget />
    </main>
  );
}
