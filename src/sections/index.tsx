"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }
const trackLead = () => { window.fbq?.("track", "Lead"); };

export function useReveal() {
  useEffect(() => {
    document.body.classList.add("reveal-ready");
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const KAKAO_ID = "inyeon_";
const INSTAGRAM = "https://www.instagram.com/inyeon_lab?igsh=cHphNHZnaDV1MGpr";
const pk = "#d4567a";
const gd = "#c9956b";
const mt = "#666";
const sb = "#333";

const I = {
  heart: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>,
  shield: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  sparkle: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>,
  users: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  chat: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
  currency: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  check: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>,
  star: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" /></svg>,
  arrowR: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
  arrowD: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>,
  chevD: (c = "w-4 h-4") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  menu: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>,
  x: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  eye: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  doc: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  phone: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  clock: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

/* ═══ EVENT BANNER ═══ */
export function EventBanner() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("event_banner_closed") === "1") {
      setShow(false);
      document.documentElement.style.setProperty("--banner-h", "0px");
    } else {
      document.documentElement.style.setProperty("--banner-h", "40px");
    }
  }, []);
  const close = () => {
    setShow(false);
    try { localStorage.setItem("event_banner_closed", "1"); } catch {}
    document.documentElement.style.setProperty("--banner-h", "0px");
    window.dispatchEvent(new Event("banner:close"));
  };
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[110] text-center py-2.5 pl-4 pr-10" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span className="text-white text-[11.5px] sm:text-sm font-bold inline-flex items-center gap-1">
          {I.sparkle("w-3.5 h-3.5")} 여성회원 매칭 1회 무료
        </span>
        <span className="text-white/80 text-[10.5px] sm:text-xs font-medium hidden sm:inline">· 대기업·공무원·교사 등 다양한 직업 회원 다수</span>
        <a href="/contact" onClick={trackLead} className="text-[10.5px] sm:text-xs font-bold px-3 py-0.5 rounded-full bg-white hover:bg-pink-50 transition-colors" style={{ color: pk }}>상담하기</a>
      </div>
      <button onClick={close} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors" aria-label="배너 닫기">{I.x("w-4 h-4")}</button>
    </div>
  );
}

/* ═══ NAV ═══ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    // 배너 상태 동기화
    const closed = typeof window !== "undefined" && localStorage.getItem("event_banner_closed") === "1";
    if (closed) setBannerOpen(false);
    const onBannerClose = () => setBannerOpen(false);
    window.addEventListener("banner:close", onBannerClose);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("banner:close", onBannerClose);
    };
  }, []);
  const links = [
    { h: "/about", l: "소개" },
    { h: "/pricing", l: "가격" },
    { h: "/ideal-match", l: "이상형 매칭" },
    { h: "/contact", l: "상담" },
  ];
  return (
    <nav className={`fixed inset-x-0 z-[100] backdrop-blur-xl transition-all duration-500 ${bannerOpen ? "top-[40px]" : "top-0"} ${scrolled ? "bg-white/90 shadow-sm shadow-pink-100/50" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span style={{ color: pk }}>{I.heart("w-5 h-5")}</span>
          <span className="font-logo text-lg sm:text-xl" style={{ letterSpacing: "-0.02em" }}>인연<span style={{ color: pk }}>연구소</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.h} href={l.h} className="text-[13px] font-semibold hover:text-[#d4567a] transition-colors" style={{ color: scrolled ? sb : "#444" }}>{l.l}</a>)}
          <a href="/contact" onClick={trackLead} className="text-[13px] text-white px-6 py-2.5 rounded-full font-bold btn-shimmer transition-all hover:shadow-lg hover:shadow-pink-200/50" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>무료 상담</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-1" style={{ color: sb }}>{open ? I.x("w-5 h-5") : I.menu("w-5 h-5")}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-pink-50">
          <div className="px-5 py-5 space-y-1">
            {links.map(l => <a key={l.h} href={l.h} onClick={() => setOpen(false)} className="block text-sm py-3 px-4 rounded-xl hover:bg-pink-50 transition-colors" style={{ color: sb }}>{l.l}</a>)}
            <a href="/contact" onClick={() => { trackLead(); setOpen(false); }} className="block text-center text-sm text-white py-3 rounded-full mt-3 font-bold" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>무료 상담</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══ HERO ═══ Apple 미니멀 — 큰 헤딩 중앙 + 큰 사진 */
export function HeroSection() {
  return (
    <section className="bg-base pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-32">
      <div className="container-apple text-center">
        {/* 라벨 */}
        <div className="hero-anim hero-d1 mb-7 sm:mb-9">
          <span className="label-sm">PRIVATE IDEAL MATCH</span>
        </div>

        {/* 거대 헤딩 */}
        <h1 className="hero-anim hero-d2 h-hero font-bold mb-7 sm:mb-9 text-ink" style={{ fontWeight: 700 }}>
          이상형 소개팅,<br />
          <span className="text-gradient">진짜 그분</span>으로.
        </h1>

        {/* 부제 */}
        <p className="hero-anim hero-d3 text-lg sm:text-xl lg:text-2xl text-ink-soft max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed" style={{ fontWeight: 400 }}>
          전문 매칭사가 회원님의 이상형을 직접 분석.<br className="hidden sm:block" />
          마음에 드는 분으로 매칭 성사 시에만 결제하는 후불제 소개팅.
        </p>

        {/* CTA */}
        <div className="hero-anim hero-d4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20">
          <a href="/ideal-match" className="btn btn-primary w-full sm:w-auto sm:min-w-[200px]">
            이상형 매칭 진단 →
          </a>
          <a href="/about" className="btn-link">
            인연연구소 알아보기 →
          </a>
        </div>

        {/* 큰 사진 — 카페 데이트 분위기 */}
        <div className="hero-anim hero-d5 relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-tertiary" style={{ aspectRatio: "16/10" }}>
          <Image src="/photos/p2.jpg" alt="" fill className="object-cover" priority />
          {/* 미세 그라데이션 (텍스트 가독성 위해) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          {/* 좌하단 캡션 */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white">
            <div className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] opacity-80 mb-1">A NEW WAY TO MEET</div>
            <div className="text-base sm:text-lg font-bold">전문 매칭사 1:1 큐레이션</div>
          </div>
        </div>

        {/* 작은 통계 */}
        <div className="hero-anim hero-d5 mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-12 max-w-3xl mx-auto pt-8 border-t border-line">
          {[
            { v: "9,999+", l: "누적 상담" },
            { v: "51 : 49", l: "남녀 성비" },
            { v: "48h", l: "평균 매칭" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="num-huge text-2xl sm:text-3xl lg:text-4xl text-ink">{s.v}</div>
              <div className="text-xs sm:text-sm text-ink-soft mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 기존 Hero (legacy, 미사용) */
function HeroSection_OLD() {
  return (
    <section className="relative min-h-[100svh] bg-cream overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
      {/* 배경 데코 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "#c23065" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#b8854a" }} />

      <div className="container-ed relative h-full">
        {/* 상단 라벨 (잡지 표지 ISSUE NO. 스타일) */}
        <div className="hero-anim hero-d1 flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="label-ed">ISSUE 01 · 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="label-ed">A NEW WAY TO MEET</span>
            <span className="w-8 h-px bg-ink/30" />
          </div>
        </div>

        {/* 메인 콘텐츠 — 12 컬럼 그리드 비대칭 */}
        <div className="grid grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-10 items-start">
          {/* 좌측 타이포 */}
          <div className="col-span-12 lg:col-span-7">
            {/* 거대한 헤딩 */}
            <h1 className="hero-anim hero-d2 h-display text-ink mb-8 sm:mb-10" style={{ fontSize: "clamp(2.8rem, 8vw, 5.6rem)" }}>
              이상형으로,<br />
              <span className="text-gradient">단 한 번의</span><br />
              <span className="font-serif-en italic font-medium">진짜</span> 소개팅.
            </h1>

            <p className="hero-anim hero-d3 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10" style={{ color: "var(--ink-soft)" }}>
              <strong className="text-ink">전문 매칭사</strong>가 직접 분석한 회원의 <strong className="text-ink">실제 사진과 프로필</strong>을<br className="hidden sm:block" />
              비공개로 전달드리고, 마음에 드는 분으로 <strong className="text-brand">매칭이 성사된 경우에만 결제</strong>하는<br className="hidden sm:block" />
              프라이빗 후불제 소개팅 서비스.
            </p>

            {/* CTA */}
            <div className="hero-anim hero-d4 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-14">
              <a href="/ideal-match" className="btn-ed btn-ed-primary group sm:min-w-[220px]">
                이상형 매칭 진단
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
              <a href="/about" className="btn-ed btn-ed-secondary group">
                서비스 소개
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>

            {/* 미니 USP 라인 */}
            <div className="hero-anim hero-d4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] font-semibold text-ink/70">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
                가입비 0원
              </span>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>여성 1회 무료</span>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>매칭 후 결제</span>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>대면 보장</span>
            </div>
          </div>

          {/* 우측 큰 사진 + 데코 */}
          <div className="col-span-12 lg:col-span-5 lg:pt-4">
            <div className="hero-anim hero-d3 relative">
              {/* 큰 사진 */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden">
                <Image src="/hero-couple.jpg" alt="" fill className="object-cover" priority />
                {/* 위쪽에 미세 어둠 (텍스트 오버레이 가독성) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                {/* 좌상단 매거진 라벨 */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                  <span className="label-ed">FEATURED</span>
                </div>
                {/* 좌하단 인용구 */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif-en italic text-lg sm:text-xl leading-tight" style={{ fontWeight: 500 }}>
                    &ldquo;The art of matchmaking, redefined.&rdquo;
                  </p>
                </div>
              </div>

              {/* 데코 — 작은 카드들 (떠 있는) */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 anim-float">
                <div className="rounded-2xl bg-white shadow-xl p-3 sm:p-4 border border-line">
                  <div className="text-[9px] font-extrabold tracking-[0.25em] text-gold mb-1">SUCCESS</div>
                  <div className="font-impact text-2xl sm:text-3xl text-ink leading-none">9,999<span className="text-base text-brand">+</span></div>
                  <div className="text-[10px] font-semibold text-ink/60 mt-0.5">누적 상담</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 anim-float" style={{ animationDelay: "1.5s" }}>
                <div className="rounded-2xl bg-ink text-white shadow-xl p-3 sm:p-4">
                  <div className="text-[9px] font-extrabold tracking-[0.25em] text-brand-soft mb-1">MATCH TIME</div>
                  <div className="font-impact text-2xl sm:text-3xl leading-none">48<span className="text-base text-gold-soft">h</span></div>
                  <div className="text-[10px] font-semibold text-white/60 mt-0.5">평균 매칭</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 큰 한 줄 (잡지 표지 인덱스 스타일) */}
        <div className="hero-anim hero-d5 mt-16 sm:mt-20 pt-8 border-t border-ink/15">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-6 sm:gap-10">
              <div>
                <div className="label-ed mb-1">VOL.01</div>
                <div className="font-impact text-3xl sm:text-4xl lg:text-5xl text-ink">INYEON</div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-ink/15" />
              <div className="hidden sm:block">
                <div className="label-ed mb-1">RATIO</div>
                <div className="font-impact text-2xl sm:text-3xl text-ink">51 : 49</div>
                <div className="text-[10px] text-ink/50">남녀 성비</div>
              </div>
              <div className="hidden lg:block h-12 w-px bg-ink/15" />
              <div className="hidden lg:block">
                <div className="label-ed mb-1">VERIFIED</div>
                <div className="font-impact text-2xl sm:text-3xl text-gradient">100%</div>
                <div className="text-[10px] text-ink/50">실회원 인증</div>
              </div>
            </div>
            <a href="#scroll" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-ink/50 hover:text-ink transition-colors">
              SCROLL
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ TRUST BAR ═══ */
export function TrustBar() {
  const items = ["매칭 후 결제 후불제", "조건별 맞춤 매칭", "신원보장 100%", "48시간 매칭", "1:1 컨설팅", "20-30대 전용"];
  return (
    <div className="py-4 overflow-hidden border-y border-pink-100/60" style={{ background: "linear-gradient(135deg, #faeede 0%, #fff5f8 50%, #faeede 100%)" }}>
      <div className="anim-marquee flex whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-8 text-xs font-bold tracking-widest uppercase" style={{ color: pk, opacity: 0.5 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: pk, opacity: 0.3 }} />{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ ABOUT ═══ */
export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-36 mesh-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stats side */}
          <div className="reveal relative order-2 lg:order-1">
            <div className="rounded-[2rem] p-8 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #fff5f8, #fdf0f4)" }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: pk }} />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-15 blur-3xl" style={{ background: gd }} />
              <div className="grid grid-cols-2 gap-5 relative z-10">
                {[{ v: "9,999+", l: "누적 상담", icon: I.users }, { v: "51:49", l: "남녀 성비", icon: I.heart }, { v: "48h", l: "평균 매칭", icon: I.clock }, { v: "4.9", l: "만족도", icon: I.star }].map((s, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-sm border border-pink-50/50">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${pk}10`, color: pk }}>{s.icon("w-5 h-5")}</div>
                    <div className="text-2xl font-extrabold mb-0.5" style={{ color: pk, fontFamily: "'Nunito', sans-serif" }}>{s.v}</div>
                    <div className="text-[0.65rem] font-medium" style={{ color: mt }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="reveal order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
              <span style={{ color: pk }}>{I.heart("w-3.5 h-3.5")}</span>
              <span className="text-xs font-bold" style={{ color: pk }}>About Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
              결혼정보회사가 아닌,<br /><span className="text-gradient">프리미엄 소개팅</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: sb }}>
              20·30대를 위한 소개팅 전문.<br />
              가벼운 마음으로 좋은 사람을 만나세요.<br />
              단, 아무나 만나지는 않습니다.
            </p>

            {/* Comparison cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-gray-50 rounded-2xl">
                <div className="text-[0.65rem] font-bold mb-4 tracking-wider uppercase" style={{ color: mt }}>기존 결혼정보회사</div>
                <ul className="space-y-2.5">
                  {["100~500만원 이상", "결혼 전제 만남", "복잡한 절차", "30~50대 위주"].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "#bbb" }}><span className="w-3 h-px bg-gray-200" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl relative shadow-lg" style={{ background: "linear-gradient(160deg, #fff5f8, #fff)", border: `2px solid ${pk}20` }}>
                <div className="absolute -top-2.5 right-4 text-white text-[0.55rem] font-bold px-3 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>PICK</div>
                <div className="text-[0.65rem] font-bold mb-4 tracking-wider uppercase" style={{ color: pk }}>인연연구소</div>
                <ul className="space-y-2.5">
                  {["매칭 후 결제 후불제", "거리·나이·직업 맞춤", "48시간 매칭", "20·30대 전용"].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium" style={{ color: sb }}>
                      <span style={{ color: pk }}>{I.check("w-3.5 h-3.5 flex-shrink-0")}</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[{ icon: I.currency, t: "후불제" }, { icon: I.sparkle, t: "맞춤 매칭" }, { icon: I.shield, t: "서류 검증" }].map((b, i) => (
                <div key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: `${pk}06`, border: `1px solid ${pk}10` }}>
                  <span style={{ color: pk }}>{b.icon("w-4 h-4")}</span>
                  <span className="text-xs font-bold" style={{ color: sb }}>{b.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES ═══ */
export function FeaturesSection() {
  const features = [
    { icon: I.currency, t: "매칭 후 결제 후불제", d: "매칭이 성사되어야 비용이 발생합니다. 선불 부담 없이 안심하고 시작하세요.", color: "#e8457f" },
    { icon: I.sparkle, t: "조건별 맞춤 매칭", d: "거리, 나이, 종교, 직업 등 원하는 조건을 세밀하게 반영해 딱 맞는 상대를 찾아드립니다.", color: gd },
    { icon: I.shield, t: "확실한 신원보장", d: "재직증명서, 혼인관계증명서 등등 꼼꼼한 서류검토로 안전한 만남을 보장합니다.", color: "#7c6dd8" },
    { icon: I.chat, t: "1:1 전문 컨설팅", d: "프로필 작성부터 만남 후 피드백까지, 연애 전문가가 함께합니다.", color: "#4db6ac" },
  ];
  return (
    <section id="features" className="py-20 sm:py-28 lg:py-36 mesh-blush relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.sparkle("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>Why Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            인연연구소만의 <span className="text-gradient">특별한 장점</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 reveal">
          {features.map((f, i) => (
            <div key={i} className="group bg-white rounded-2xl p-6 sm:p-7 border border-pink-50/80 hover:shadow-2xl hover:shadow-pink-100/20 hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors" style={{ background: `${f.color}10`, color: f.color }}>
                {f.icon("w-6 h-6")}
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-2">{f.t}</h3>
              <p className="text-xs leading-relaxed" style={{ color: mt }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS ═══ */
export function ProcessSection() {
  const steps = [
    { icon: I.phone, t: "상담 신청", d: "카카오톡으로 간편하게 신청하세요" },
    { icon: I.doc, t: "서류 검토", d: "재직증명서, 혼인관계증명서, 신분증 등등으로 신원 확인" },
    { icon: I.users, t: "맞춤 매칭", d: "거리·나이·종교·직업 등 조건 반영 매칭" },
    { icon: I.heart, t: "인연 시작", d: "프로필 전달 후 설레는 만남 시작" },
  ];
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#fff9f3]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.heart("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            <span className="text-gradient">4단계</span>로 시작하는 인연
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 reveal">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < 3 && <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gradient-to-r from-pink-200 to-pink-100" />}
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-100/30 group-hover:shadow-xl group-hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg, #fff0f5, #fff5f8)", color: pk }}>
                {s.icon("w-6 h-6")}
              </div>
              <div className="text-[0.6rem] font-bold rounded-full inline-block px-3 py-1 mb-2" style={{ background: `${pk}08`, color: pk }}>STEP {i + 1}</div>
              <h3 className="text-sm font-bold mb-1">{s.t}</h3>
              <p className="text-xs" style={{ color: mt }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 lg:py-36 mesh-gold-rose relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.currency("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            결정사의 <span className="text-gradient">1/10 비용</span>
          </h2>
          <p className="text-sm mt-3" style={{ color: sb }}>합리적인 가격, 그 이상의 퀄리티</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto reveal">
          {/* 여성 */}
          <div className="bg-white rounded-3xl p-7 border border-pink-50 hover:shadow-xl transition-all">
            <div className="text-xs font-bold px-4 py-1.5 bg-pink-50 rounded-full inline-block mb-6" style={{ color: pk }}>여성 회원</div>
            <div className="mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <span className="text-3xl sm:text-4xl font-extrabold">6만원</span>
              <span className="text-sm font-normal ml-1" style={{ color: mt }}>/회</span>
            </div>
            <p className="text-xs mb-8" style={{ color: mt }}>매칭 성사 시 결제 (후불제)</p>
            <ul className="space-y-3 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: sb }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${pk}10`, color: pk }}>{I.check("w-3 h-3")}</span>{t}
                </li>
              ))}
            </ul>
            <a href="/contact" onClick={trackLead} className="block text-center py-3.5 rounded-full border-2 border-pink-100 text-sm font-bold hover:bg-pink-50 transition-colors" style={{ color: pk }}>상담 받기</a>
          </div>

          {/* 남성 */}
          <div className="bg-white rounded-3xl p-7 border border-pink-50 hover:shadow-xl transition-all">
            <div className="text-xs font-bold px-4 py-1.5 bg-gray-50 rounded-full inline-block mb-6" style={{ color: sb }}>남성 회원</div>
            <div className="mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <span className="text-3xl sm:text-4xl font-extrabold">9만원</span>
              <span className="text-sm font-normal ml-1" style={{ color: mt }}>/회</span>
            </div>
            <p className="text-xs mb-8" style={{ color: mt }}>매칭 성사 시 결제 (후불제)</p>
            <ul className="space-y-3 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: sb }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${pk}10`, color: pk }}>{I.check("w-3 h-3")}</span>{t}
                </li>
              ))}
            </ul>
            <a href="/contact" onClick={trackLead} className="block text-center py-3.5 rounded-full border-2 border-pink-100 text-sm font-bold hover:bg-pink-50 transition-colors" style={{ color: pk }}>상담 받기</a>
          </div>

          {/* 무제한 */}
          <div className="rounded-3xl p-7 relative shadow-2xl shadow-pink-200/30 text-white" style={{ background: `linear-gradient(160deg, ${pk}, #c23065)` }}>
            <div className="absolute -top-3 right-6 bg-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5" style={{ color: pk }}>
              {I.star("w-3.5 h-3.5")} BEST
            </div>
            <div className="text-xs font-bold px-4 py-1.5 bg-white/15 rounded-full inline-block mb-6">UNLIMITED</div>
            <div className="mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <span className="text-3xl sm:text-4xl font-extrabold">무제한 매칭</span>
            </div>
            <p className="text-xs mb-8 text-white/70">횟수 제한 없이 매칭 + 컨설팅</p>
            <ul className="space-y-3 mb-8">
              {["매칭 횟수 무제한", "조건별 맞춤 매칭", "1:1 전문 컨설팅", "연애 코칭 & 스타일링", "VIP 전담 관리"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/90">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/15">{I.check("w-3 h-3")}</span>{t}
                </li>
              ))}
            </ul>
            <a href="/contact" onClick={trackLead} className="block text-center py-3.5 rounded-full bg-white text-sm font-bold hover:bg-pink-50 transition-colors" style={{ color: pk }}>무제한 상담</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ CONSULT ═══ */
export function ConsultSection() {
  const items = [
    { icon: I.eye, l: "첫인상 코칭", d: "대화법과 매너 가이드" },
    { icon: I.sparkle, l: "스타일링 조언", d: "패션 & 그루밍 제안" },
    { icon: I.chat, l: "연애 피드백", d: "만남 후 전문 디브리핑" },
    { icon: I.users, l: "이상형 분석", d: "진짜 원하는 사람 찾기" },
  ];
  return (
    <section id="consult" className="py-20 sm:py-28 lg:py-36 bg-[#fdf7f1] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
              <span style={{ color: pk }}>{I.chat("w-3.5 h-3.5")}</span>
              <span className="text-xs font-bold" style={{ color: pk }}>Consulting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
              전문 상담사가<br /><span className="text-gradient">성공적인 만남</span>으로
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: sb }}>
              첫 만남이 어색한 분, 연애가 오래 이어지지 않는 분.<br />
              연애 전문 상담사가 1:1로 함께합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {items.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border border-pink-50/80 hover:shadow-lg hover:shadow-pink-100/15 transition-all bg-gradient-to-br from-[#fdf6f8] to-white">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${pk}10`, color: pk }}>{c.icon("w-4.5 h-4.5")}</div>
                  <div className="text-sm font-bold mb-0.5">{c.l}</div>
                  <div className="text-xs" style={{ color: mt }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal order-1 lg:order-2 relative">
            <div className="rounded-[2rem] p-8 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #fff5f8, #fdf0f4)" }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-3xl" style={{ background: "#7c6dd8" }} />
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)`, color: "white" }}>{I.chat("w-7 h-7")}</div>
                <div className="text-lg font-extrabold mb-1" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>1:1 맞춤 컨설팅</div>
                <div className="text-xs" style={{ color: mt }}>당신만을 위한 연애 전문가</div>
              </div>
              <div className="space-y-3">
                {["프로필 매력도 분석", "대화법 & 매너 코칭", "만남 후 심층 피드백", "장기 연애 전략 설계"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-pink-50/50">
                    <span style={{ color: pk }}>{I.check("w-4 h-4 flex-shrink-0")}</span>
                    <span className="text-sm font-medium" style={{ color: sb }}>{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 bg-white/80 rounded-xl px-4 py-3 border border-pink-50/50">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: gd }}>{I.star("w-4 h-4")}</span>)}</div>
                <span className="text-lg font-extrabold" style={{ fontFamily: "'Nunito', sans-serif" }}>4.9</span>
                <span className="text-xs ml-1" style={{ color: mt }}>만족도</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ MEMBER JOBS (활동 회원 직업군) ═══ */
export function MemberJobsSection() {
  const groups = [
    {
      label: "여성 회원",
      color: "#d4567a",
      jobs: ["교사", "통역사", "간호사", "아나운서", "승무원", "공무원", "경리", "디자이너"],
    },
    {
      label: "남성 회원",
      color: "#7c6dd8",
      jobs: ["공기업", "공무원", "대기업", "교사", "엔지니어", "사업가", "스타트업", "회계사"],
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 mesh-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.users("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>Active Members</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            이런 분들이 <span className="text-gradient">함께하고 있어요</span>
          </h2>
          <p className="text-sm mt-3" style={{ color: sb }}>현재 활동 중인 검증된 회원들의 직업 분포</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 reveal">
          {groups.map((g, i) => (
            <div key={i} className="rounded-2xl p-7 sm:p-8 border border-pink-50 bg-white hover:shadow-xl hover:shadow-pink-100/30 transition-all">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                <h3 className="text-base sm:text-lg font-bold" style={{ color: sb }}>{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.jobs.map((j, k) => (
                  <span key={k}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium"
                    style={{ background: `${g.color}10`, color: g.color, border: `1px solid ${g.color}20` }}>
                    {j}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-10 reveal" style={{ color: mt }}>
          모든 회원은 재직증명서·신분 확인을 거친 검증된 실회원입니다.
        </p>
      </div>
    </section>
  );
}

/* ═══ SAFETY FLOW (개인정보 보호) ═══ */
export function SafetyFlowSection() {
  const steps = [
    { icon: I.doc, t: "1. 본인 확인", d: "재직증명서·혼인관계증명서 등으로 신원을 확인합니다. 검증 후 원본은 즉시 폐기." },
    { icon: I.shield, t: "2. 암호화 저장", d: "프로필 정보는 암호화되어 저장됩니다. 외부에서 절대 접근할 수 없습니다." },
    { icon: I.eye, t: "3. 1:1 비공개 전달", d: "프로필은 매칭이 확정된 상대에게만 비공개로 전달됩니다. 공개 갤러리는 없습니다." },
    { icon: I.x, t: "4. 종료 후 파기", d: "서비스 이용 종료 시 모든 개인정보를 즉시 파기합니다. 마케팅·재활용 일절 없음." },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32" style={{ background: "linear-gradient(180deg, #1a1a1f, #2a1520)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-white/10 border border-white/15">
            <span className="text-white/80">{I.shield("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold text-white/80">Privacy & Safety</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            당신의 정보, <span style={{ background: `linear-gradient(135deg, ${pk}, #ffb3c8)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>이렇게 지킵니다</span>
          </h2>
          <p className="text-sm mt-3 text-white/60">프로필이 무분별하게 공개되지 않는 이유</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 reveal">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl p-6 sm:p-7 border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/30 to-transparent" />
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${pk}25`, color: "#ffb3c8" }}>
                {s.icon("w-6 h-6")}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2.5">{s.t}</h3>
              <p className="text-xs sm:text-sm text-white/60" style={{ lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 max-w-2xl mx-auto text-center reveal">
          <div className="rounded-2xl p-6 sm:p-7 bg-white/[0.04] border border-white/10">
            <p className="text-sm sm:text-base text-white/90 font-medium mb-2">
              개인정보보호법을 준수합니다
            </p>
            <p className="text-xs sm:text-sm text-white/50" style={{ lineHeight: 1.7 }}>
              수집·이용·보관·파기 전 과정이 법적 기준을 충족하며, 매칭 외 목적으로 절대 사용되지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ IDEAL MATCH — Apple 다크 카드 풀폭 ═══ */
export function IdealMatchSection() {
  return (
    <section className="bg-base py-16 sm:py-24 lg:py-28">
      <div className="container-apple">
        <a href="/ideal-match" className="group block card-dark relative overflow-hidden p-10 sm:p-16 lg:p-20 transition-all hover:scale-[1.005]">
          {/* 미세 글로우 */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--accent)" }} />

          <div className="relative grid grid-cols-12 gap-y-8 lg:gap-x-12 items-center">
            <div className="col-span-12 lg:col-span-8">
              <div className="label-sm mb-4" style={{ color: "var(--accent)" }}>매칭 진단</div>
              <h2 className="h-section font-bold text-white mb-6" style={{ fontWeight: 700 }}>
                내 이상형과<br />
                <span className="text-gradient">매칭될 수 있을까?</span>
              </h2>
              <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed">
                나이·지역·직업·스타일 등 원하시는 조건을 알려주시면,<br className="hidden sm:block" />
                담당 매칭사가 매칭 가능성을 직접 확인해드립니다.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink font-semibold text-base group-hover:scale-105 transition-transform">
                진단 시작 →
              </span>
              <div className="text-xs sm:text-sm text-white/45 mt-4">
                여성 회원 1회 무료 · 1분 소요
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ═══ PROMISE (인연연구소의 약속) ═══ */
export function PromiseSection() {
  const promises = [
    {
      icon: I.shield,
      t: "아무나 받지 않습니다",
      d: "전문 매칭사가 신원과 진정성을 직접 확인한 회원만 받습니다. 까다로운 가입 기준을 통과한 분들만 매칭에 참여합니다.",
    },
    {
      icon: I.sparkle,
      t: "딱 맞게 매칭해드립니다",
      d: "AI 자동 추천이 아닌, 전문 매칭사가 거리·나이·종교·직업·가치관까지 직접 분석해 한 분 한 분 맞춰드립니다.",
    },
    {
      icon: I.currency,
      t: "매칭이 되어야 비용이 발생합니다",
      d: "선불 결제는 없습니다. 실제 매칭이 성사된 경우에만 결제하시는 100% 후불제로 운영합니다.",
    },
    {
      icon: I.eye,
      t: "실제 사진과 자세한 프로필 전달",
      d: "매칭 시 회원님께 상대방의 실제 사진과 직업·나이·가치관 등 자세한 프로필을 1:1 비공개로 보내드립니다. 누구나 둘러볼 수 있는 공개 갤러리는 없습니다.",
    },
    {
      icon: I.users,
      t: "100% 실회원 매칭입니다",
      d: "재직증명서, 혼인관계증명서 등으로 신원이 검증된 실제 회원과만 매칭됩니다. 가짜 프로필, 알바, 자동 응답은 단 한 건도 없습니다.",
    },
    {
      icon: I.heart,
      t: "한 분 한 분 정성으로",
      d: "매칭 후 만남 피드백, 다음 소개 조정까지 전담 매칭사가 책임지고 함께합니다. 만남이 끝이 아닌 시작입니다.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 mesh-rose">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.heart("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>Our Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            인연연구소의 <span className="text-gradient">약속</span>
          </h2>
          <p className="text-sm mt-3" style={{ color: sb }}>회원님께 드리는 6가지 다짐</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 reveal">
          {promises.map((p, i) => (
            <div key={i} className="group bg-white rounded-2xl p-7 border border-pink-50 hover:shadow-xl hover:shadow-pink-100/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${pk}10`, color: pk }}>
                {p.icon("w-6 h-6")}
              </div>
              <h3 className="text-base font-bold mb-2.5" style={{ color: sb }}>{p.t}</h3>
              <p className="text-sm" style={{ color: mt, lineHeight: 1.7 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-pink-50/80 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 sm:py-6 text-left group">
        <span className="text-sm font-medium pr-4 group-hover:text-[#d4567a] transition-colors" style={{ color: "#444" }}>{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "rotate-180" : ""}`} style={{ background: open ? `${pk}15` : `${pk}06`, color: pk }}>{I.chevD("w-3.5 h-3.5")}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-48 pb-5 sm:pb-6" : "max-h-0"}`}>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: mt }}>{a}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const fqs = [
    { q: "어떤 서류를 제출해야 하나요?", a: "재직증명서, 혼인관계증명서, 신분증 등등을 기본으로 요청드립니다. 서류는 매칭 목적 외 절대 사용되지 않으며, 종료 후 안전하게 폐기됩니다." },
    { q: "매칭까지 얼마나 걸리나요?", a: "서류 확인 후 평균 48시간 이내에 첫 프로필을 제안합니다." },
    { q: "소개팅 앱과 뭐가 다른가요?", a: "앱은 사진으로만 판단하지만, 인연연구소는 서류 검증 + 전문 상담사의 성격·가치관 분석 기반 매칭입니다." },
    { q: "결혼을 전제로 해야 하나요?", a: "아닙니다. 가벼운 소개팅부터 진지한 만남까지, 목적에 맞춰 매칭해 드립니다." },
    { q: "개인정보는 안전한가요?", a: "모든 서류와 개인정보는 암호화 저장하며, 매칭 목적 외 절대 제3자에게 공유되지 않습니다." },
  ];
  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-36 bg-[#fff9f3]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}08`, border: `1px solid ${pk}15` }}>
            <span style={{ color: pk }}>{I.chat("w-3.5 h-3.5")}</span>
            <span className="text-xs font-bold" style={{ color: pk }}>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            자주 묻는 <span className="text-gradient">질문</span>
          </h2>
        </div>
        <div className="rounded-2xl p-6 sm:p-8 reveal" style={{ background: `${pk}04` }}>
          {fqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══ INQUIRY FORM ═══ */
export function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("done"); setName(""); setPhone(""); }
      else { setStatus("error"); setErrMsg(data?.error || "다시 시도해주세요."); }
    } catch { setStatus("error"); setErrMsg("네트워크 오류"); }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl py-6 px-6 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <p className="text-white/90 font-medium text-sm">문의가 접수되었습니다!</p>
        <p className="text-white/50 text-xs mt-2">빠른 시일 내에 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl py-6 px-6 space-y-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="text-white/70 text-xs font-medium mb-4 text-center">간편 문의 남기기</p>
      {/* honeypot - 사람에게는 안 보이고 봇만 채움 */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />
      <input type="text" placeholder="이름" value={name} maxLength={20} onChange={e => setName(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-pink-400/50 focus:outline-none transition-colors" />
      <input type="tel" placeholder="전화번호 (예: 010-1234-5678)" value={phone} maxLength={13} onChange={e => setPhone(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-pink-400/50 focus:outline-none transition-colors" />
      {status === "error" && errMsg && (
        <p className="text-xs text-red-300/90">{errMsg}</p>
      )}
      <button onClick={submit} disabled={status === "loading" || !name.trim() || !phone.trim()}
        className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
        {status === "loading" ? "접수 중..." : status === "error" ? "다시 시도" : "문의하기"}
      </button>
    </div>
  );
}

/* ═══ CONTACT ═══ */
function KakaoIDCard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    trackLead();
    try {
      await navigator.clipboard.writeText(KAKAO_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API 실패 시에도 시각 피드백
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group block w-full rounded-3xl bg-white p-7 sm:p-8 shadow-2xl shadow-pink-500/20 hover:shadow-pink-500/30 hover:-translate-y-0.5 transition-all"
      aria-label="카카오톡 ID 복사하기"
    >
      <div className="text-[0.6rem] font-bold tracking-widest uppercase mb-3" style={{ color: pk }}>
        카카오톡으로 문의 주세요
      </div>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl flex-shrink-0" style={{ background: "#FEE500" }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" />
          </svg>
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: sb, fontFamily: "'Nunito', sans-serif" }}>
          {KAKAO_ID}
        </span>
      </div>
      <div className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full transition-colors" style={{ background: copied ? "#22c55e" : `${pk}10`, color: copied ? "white" : pk }}>
        {copied ? (<>{I.check("w-3.5 h-3.5")} 복사 완료!</>) : (<>탭하면 ID가 복사됩니다</>)}
      </div>
    </button>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden" style={{ background: "linear-gradient(160deg, #1a1a1f, #2a1520)" }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: pk }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 sm:px-8 text-center text-white">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-pink-500/20" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
          {I.heart("w-7 h-7")}
        </div>
        <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
          당신의 인연,<br />여기서 시작됩니다
        </h2>
        <p className="text-sm mb-3 text-white/60 reveal">무료 상담으로 부담 없이 시작해 보세요.</p>
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full reveal" style={{ background: "rgba(212,86,122,0.15)", border: "1px solid rgba(212,86,122,0.25)" }}>
          <span style={{ color: "#ffb3c8" }}>{I.clock("w-3.5 h-3.5")}</span>
          <span className="text-xs font-bold" style={{ color: "#ffb3c8" }}>365일 연중무휴 · 밤 12시까지 상담</span>
        </div>

        {/* 메인: 카톡 ID 카드 */}
        <div className="max-w-sm mx-auto mb-6 reveal">
          <KakaoIDCard />
        </div>

        {/* 보조: 인스타그램, 전화 */}
        <div className="max-w-sm mx-auto mb-10 space-y-3 reveal">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="rounded-2xl py-4 px-6 flex items-center gap-4 hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-white/70">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </span>
            <div className="text-left">
              <div className="text-[0.55rem] text-white/60 uppercase tracking-widest font-bold">인스타그램</div>
              <div className="text-sm text-white/90 font-medium">@inyeon_lab</div>
            </div>
            <span className="ml-auto text-white/50">{I.arrowR("w-4 h-4")}</span>
          </a>
          <a href="tel:010-7617-0181" className="rounded-2xl py-4 px-6 flex items-center gap-4 hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-white/70">{I.phone("w-5 h-5 flex-shrink-0")}</span>
            <div className="text-left">
              <div className="text-[0.55rem] text-white/60 uppercase tracking-widest font-bold">전화 상담</div>
              <div className="text-sm text-white/90 font-medium">010-7617-0181</div>
            </div>
            <span className="ml-auto text-white/50">{I.arrowR("w-4 h-4")}</span>
          </a>
        </div>

        <div className="max-w-sm mx-auto reveal">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
export function Footer() {
  return (
    <footer className="py-10 sm:py-14 bg-white border-t border-pink-50/50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-2">
            <span style={{ color: pk }}>{I.heart("w-4 h-4")}</span>
            <span className="font-logo text-lg">인연<span style={{ color: pk }}>연구소</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { l: "소개", h: "/about" },
              { l: "가격", h: "/pricing" },
              { l: "이상형 매칭", h: "/ideal-match" },
              { l: "상담", h: "/contact" },
            ].map((it, i) => (
              <a key={i} href={it.h} className="text-xs font-medium hover:text-[#d4567a] transition-colors" style={{ color: mt }}>{it.l}</a>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-pink-50/50 text-center sm:text-left">
          <div className="text-[0.65rem] space-y-1" style={{ color: "#888" }}>
            <p>대표자: 김가영 | 사업자등록번호: 463-59-00868</p>
          </div>
        </div>
        <p className="sr-only">인연연구소 소개팅 서비스 지역: 강릉 동해 삼척 속초 원주 춘천 태백 고양 과천 광명 광주 구리 군포 김포 남양주 동두천 부천 성남 수원 시흥 안산 안성 안양 양주 여주 오산 용인 의왕 의정부 이천 파주 평택 포천 하남 화성 거제 김해 밀양 사천 양산 진주 창원 통영 경산 경주 구미 김천 문경 상주 안동 영주 영천 포항 광양 나주 목포 순천 여수 군산 김제 남원 익산 전주 정읍 계룡 공주 논산 당진 보령 서산 아산 천안 제천 청주 충주</p>
      </div>
    </footer>
  );
}

