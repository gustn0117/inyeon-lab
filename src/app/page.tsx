"use client";
import { useState, useEffect } from "react";

function useReveal() {
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

const KAKAO = "https://open.kakao.com/o/sAnvRami";
const pk = "#d4567a";
const pkL = "#f0a0b8";
const gd = "#c9956b";
const gdL = "#e6b98a";
const mt = "#b0b0b0";
const sb = "#777";

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
};

function FloatingDeco() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-full anim-float opacity-20" style={{ background: pkL }} />
      <div className="absolute top-[25%] right-[12%] w-2 h-2 rounded-full anim-float opacity-15" style={{ background: gd, animationDelay: "1s" }} />
      <div className="absolute top-[60%] left-[5%] w-4 h-4 rounded-full anim-float-slow opacity-10" style={{ background: pk, animationDelay: "2s" }} />
      <div className="absolute bottom-[20%] left-[15%] text-[#f0c0d0] opacity-10 anim-float-slow" style={{ animationDelay: "1.5s" }}>{I.heart("w-6 h-6")}</div>
      <div className="absolute top-[20%] right-[20%] text-[#e8d5c4] opacity-10 anim-float" style={{ animationDelay: "2.5s" }}>{I.sparkle("w-5 h-5")}</div>
    </div>
  );
}

/* ═══ NAV ═══ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [{ h: "#about", l: "소개" }, { h: "#features", l: "장점" }, { h: "#pricing", l: "가격" }, { h: "#consult", l: "컨설팅" }, { h: "#contact", l: "상담" }];
  return (
    <nav className={`fixed inset-x-0 top-0 z-[100] backdrop-blur-xl transition-all duration-500 ${scrolled ? "bg-white/85 shadow-sm shadow-pink-100" : "bg-[#fef8fa]/90"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-1.5 sm:gap-2">
          <span style={{ color: pk }}>{I.heart("w-4 h-4 sm:w-5 sm:h-5")}</span>
          <span className="font-logo text-base sm:text-xl" style={{ letterSpacing: "-0.02em" }}>인연<span style={{ color: pk }}>연구소</span></span>
        </a>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(l => <a key={l.h} href={l.h} className="text-sm hover:text-[#d4567a] transition-colors" style={{ color: sb }}>{l.l}</a>)}
          <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="text-sm text-white px-5 py-2 rounded-full btn-shimmer transition-all hover:shadow-lg hover:shadow-pink-200/50" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>무료 상담</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-1" style={{ color: sb }}>{open ? I.x("w-5 h-5") : I.menu("w-5 h-5")}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-pink-50">
          <div className="px-4 py-4 space-y-1">
            {links.map(l => <a key={l.h} href={l.h} onClick={() => setOpen(false)} className="block text-sm py-2.5 px-3 rounded-lg hover:bg-pink-50 transition-colors" style={{ color: sb }}>{l.l}</a>)}
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block text-center text-sm text-white py-2.5 rounded-full mt-3" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>무료 상담</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══ HERO ═══ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5] via-[#fdf5f7] to-[#f9ecf0]" />
      <div className="absolute inset-0">
        <img src="/1000018278.png" alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5]/80 via-[#fdf5f7]/50 to-[#f9ecf0]" />
      </div>
      <div className="absolute -top-20 -right-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] blob anim-pulse" style={{ background: "rgba(240,180,200,0.12)" }} />
      <div className="absolute -bottom-20 -left-20 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] blob anim-pulse" style={{ background: "rgba(232,213,196,0.1)", animationDelay: "1.5s" }} />
      <FloatingDeco />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-12 text-center">
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <div className="hero-anim hero-d1 inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-6 sm:mb-10 border border-pink-100 shadow-sm shadow-pink-50">
            <span style={{ color: gd }}>{I.sparkle("w-3.5 h-3.5 sm:w-4 sm:h-4")}</span>
            <span className="text-[0.65rem] sm:text-xs font-medium" style={{ color: gd }}>Premium Matching Service</span>
          </div>

          <h1 className="hero-anim hero-d2 font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            설레는 만남,<br /><span className="text-gradient">인연연구소</span>에서
          </h1>

          <p className="hero-anim hero-d3 text-sm sm:text-base leading-relaxed sm:leading-loose max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 px-2" style={{ color: sb }}>
            아무나 만날 수는 없고, 결정사는 부담스러울 때.<br />
            서류검토로 신원이 보장된 사람만.<br />
            부담 없는 <strong style={{ color: pk }}>프리미엄 소개팅</strong>.
          </p>

          <div className="hero-anim hero-d4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-24 px-4 sm:px-0">
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-8 py-3.5 rounded-full text-sm font-bold btn-shimmer shadow-lg shadow-pink-200/40 hover:shadow-xl transition-all" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
              무료 상담 신청 {I.arrowR("w-4 h-4 group-hover:translate-x-0.5 transition-transform")}
            </a>
            <a href="#about" className="group inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-white border border-pink-100 shadow-sm hover:shadow-md transition-all" style={{ color: sb }}>
              알아보기 {I.arrowD("w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform")}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white/50 backdrop-blur-sm border-t border-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[{ v: "2,400+", l: "누적 상담" }, { v: "92%", l: "재이용률" }, { v: "48h", l: "평균 매칭" }, { v: "4.9", l: "만족도" }].map((s, i) => (
            <div key={i} className="hero-anim text-center" style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
              <div className="font-display text-lg sm:text-2xl font-extrabold" style={{ color: pk }}>{s.v}</div>
              <div className="text-[0.6rem] sm:text-xs mt-0.5" style={{ color: mt }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function Marquee() {
  const items = ["신원보장 100%", "48시간 매칭", "프리미엄 퀄리티", "1:1 컨설팅", "20-30대 전용", "개인정보 보호"];
  return (
    <div className="py-3 sm:py-3.5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
      <div className="anim-marquee flex whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 sm:gap-4 mx-5 sm:mx-8 text-white/80 text-[0.65rem] sm:text-xs font-medium tracking-wider">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/40" />{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ ABOUT ═══ */
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 bg-white relative">
      <FloatingDeco />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.heart("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>About Us</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">결혼정보회사가 아닌, <span className="text-gradient">프리미엄 소개팅</span></h2>
          <p className="text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4 max-w-md mx-auto px-2" style={{ color: sb }}>20·30대를 위한 소개팅 전문. 가벼운 마음으로 좋은 사람을. 단, 아무나 만나지는 않습니다.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div className="reveal">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-[0.65rem] sm:text-xs font-bold mb-3 sm:mb-4" style={{ color: mt }}>기존 결혼정보회사</div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {["100~500만원 이상", "결혼 전제 만남", "복잡한 절차", "30~50대 위주"].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-[0.65rem] sm:text-xs" style={{ color: "#ccc" }}><span className="w-2 sm:w-3 h-px bg-gray-200" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl relative border-2 shadow-lg shadow-pink-100/50" style={{ borderColor: `${pk}30`, background: "linear-gradient(135deg, #fff5f8, white)" }}>
                <div className="absolute -top-2 right-3 sm:right-4 text-white text-[0.5rem] sm:text-[0.6rem] font-bold px-2 sm:px-3 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>PICK</div>
                <div className="text-[0.65rem] sm:text-xs font-bold mb-3 sm:mb-4" style={{ color: pk }}>인연연구소</div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {["11만원부터", "부담 없는 소개팅", "48시간 매칭", "20·30대 전용"].map((t, i) => (
                    <li key={i} className="flex items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-xs font-medium" style={{ color: sb }}>
                      <span style={{ color: pk }}>{I.check("w-3 h-3 flex-shrink-0")}</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-5">
              {[{ icon: I.shield, t: "3종 서류 검증" }, { icon: I.sparkle, t: "48시간 매칭" }, { icon: I.chat, t: "1:1 컨설팅" }].map((b, i) => (
                <div key={i} className="flex-1 flex items-center gap-2 bg-gradient-to-r from-pink-50 to-white rounded-xl p-2.5 sm:p-3 border border-pink-50">
                  <span style={{ color: pk }}>{b.icon("w-4 h-4 flex-shrink-0")}</span>
                  <span className="text-[0.6rem] sm:text-[0.68rem] font-medium" style={{ color: sb }}>{b.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="aspect-[3/4] max-w-[320px] sm:max-w-none mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/30 border-4 border-white">
              <img src="/1000018277.png" alt="인연연구소" className="w-full h-full object-cover object-[center_30%]" />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-5 left-2 sm:-left-5 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 z-10 shadow-lg">
              <div className="text-xl sm:text-2xl font-display font-extrabold" style={{ color: pk }}>92%</div>
              <div className="text-[0.55rem] sm:text-[0.6rem]" style={{ color: mt }}>재이용률</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES ═══ */
function FeaturesSection() {
  const features = [
    { icon: I.shield, t: "확실한 신원보장", d: "재직증명서, 혼인관계증명서, 신분증 등등 꼼꼼한 서류검토", color: "#e8457f" },
    { icon: I.currency, t: "결정사 1/10 비용", d: "11만원부터 시작하는 합리적인 비용", color: gd },
    { icon: I.chat, t: "1:1 전문 컨설팅", d: "프로필 작성부터 만남 후 피드백까지", color: "#7c6dd8" },
    { icon: I.sparkle, t: "맞춤 이상형 매칭", d: "사람이 직접 매칭하는 프리미엄 서비스", color: "#4db6ac" },
  ];
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#fdf6f8] to-[#fff0f5] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.sparkle("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>Why Us</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">인연연구소만의 <span className="text-gradient">특별한 장점</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 border border-pink-50 shadow-sm hover:shadow-xl hover:shadow-pink-100/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-5" style={{ background: `${f.color}12`, color: f.color }}>
                {f.icon("w-4 h-4 sm:w-5 sm:h-5")}
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">{f.t}</h3>
              <p className="text-[0.65rem] sm:text-xs leading-relaxed" style={{ color: mt }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS ═══ */
function ProcessSection() {
  const steps = [
    { icon: I.phone, t: "상담 신청", d: "카카오톡 또는 전화로 간편 신청" },
    { icon: I.doc, t: "서류 검토", d: "3종 서류로 신원 확인" },
    { icon: I.users, t: "맞춤 매칭", d: "이상형 기준 최적의 상대" },
    { icon: I.heart, t: "인연 시작", d: "프로필 전달, 만남 시작" },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.heart("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>Process</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight"><span className="text-gradient">4단계</span>로 시작하는 인연</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {steps.map((s, i) => (
            <div key={i} className="text-center relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md shadow-pink-100/30" style={{ background: "linear-gradient(135deg, #fff0f5, #fdf5f7)", color: pk }}>
                {s.icon("w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <div className="text-[0.6rem] sm:text-xs font-bold rounded-full inline-block px-2.5 sm:px-3 py-0.5 mb-1.5 sm:mb-2" style={{ background: `${pk}10`, color: pk }}>STEP {i + 1}</div>
              <h3 className="text-xs sm:text-sm font-bold mb-0.5 sm:mb-1">{s.t}</h3>
              <p className="text-[0.6rem] sm:text-xs" style={{ color: mt }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#fdf6f8] to-[#fff0f5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.currency("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>Pricing</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">결정사의 <span className="text-gradient">1/10 비용</span></h2>
          <p className="text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3" style={{ color: sb }}>합리적인 가격, 그 이상의 퀄리티</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto reveal">
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-pink-50 shadow-sm hover:shadow-lg hover:shadow-pink-100/20 transition-all">
            <div className="text-[0.6rem] sm:text-xs font-bold px-3 py-1 bg-gray-50 rounded-full inline-block mb-4 sm:mb-5" style={{ color: mt }}>BASIC</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold mb-1">11만원<span className="text-sm sm:text-base font-normal ml-1" style={{ color: mt }}>~</span></div>
            <p className="text-[0.65rem] sm:text-xs mb-5 sm:mb-7" style={{ color: mt }}>기본 매칭 서비스</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-7">
              {["신원보장 서류검토", "이상형 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-[0.65rem] sm:text-xs" style={{ color: sb }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `${pk}30` }} />{t}</li>
              ))}
            </ul>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 sm:py-3 rounded-full border-2 border-pink-100 text-xs sm:text-sm font-bold hover:bg-pink-50 transition-colors" style={{ color: pk }}>상담 받기</a>
          </div>
          <div className="rounded-2xl p-5 sm:p-7 relative shadow-xl shadow-pink-200/20 text-white" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
            <div className="absolute -top-2.5 sm:-top-3 right-4 sm:right-6 bg-white text-[0.55rem] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1" style={{ color: pk }}>
              {I.star("w-2.5 h-2.5 sm:w-3 sm:h-3")} BEST
            </div>
            <div className="text-[0.6rem] sm:text-xs font-bold px-3 py-1 bg-white/20 rounded-full inline-block mb-4 sm:mb-5">PREMIUM</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold mb-1">맞춤 상담</div>
            <p className="text-[0.65rem] sm:text-xs mb-5 sm:mb-7 text-white/60">매칭 + 1:1 전문 컨설팅</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-7">
              {["기본 플랜 전체 포함", "1:1 전문 컨설팅", "연애 코칭 & 스타일링", "VIP 전담 관리", "심층 피드백"].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-[0.65rem] sm:text-xs text-white/80">{I.check("w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60 flex-shrink-0")}{t}</li>
              ))}
            </ul>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 sm:py-3 rounded-full bg-white text-xs sm:text-sm font-bold hover:bg-pink-50 transition-colors" style={{ color: pk }}>프리미엄 상담</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ CONSULT ═══ */
function ConsultSection() {
  const items = [
    { icon: I.eye, l: "첫인상 코칭", d: "대화법과 매너 가이드" },
    { icon: I.sparkle, l: "스타일링 조언", d: "패션·그루밍 제안" },
    { icon: I.chat, l: "연애 피드백", d: "만남 후 전문 디브리핑" },
    { icon: I.users, l: "이상형 분석", d: "진짜 원하는 사람 찾기" },
  ];
  return (
    <section id="consult" className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
              <span style={{ color: pk }}>{I.chat("w-3.5 h-3.5")}</span>
              <span className="text-xs font-medium" style={{ color: pk }}>Consulting</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3">전문 상담사가 <span className="text-gradient">성공적인 만남</span>으로</h2>
            <p className="text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8" style={{ color: sb }}>첫 만남이 어색한 분, 연애가 오래 이어지지 않는 분. 연애 전문 상담사가 1:1로 함께합니다.</p>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {items.map((c, i) => (
                <div key={i} className="p-3 sm:p-4 bg-gradient-to-br from-pink-50 to-white rounded-xl border border-pink-50 hover:shadow-md hover:shadow-pink-100/20 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2 sm:mb-3" style={{ background: `${pk}10`, color: pk }}>{c.icon("w-3.5 h-3.5 sm:w-4 sm:h-4")}</div>
                  <div className="text-[0.65rem] sm:text-xs font-bold mb-0.5">{c.l}</div>
                  <div className="text-[0.55rem] sm:text-[0.65rem]" style={{ color: mt }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal order-1 lg:order-2 relative">
            <div className="aspect-[4/5] max-w-[300px] sm:max-w-none mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/30 border-4 border-white">
              <img src="/1000018278.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
              <div className="text-[0.55rem] sm:text-[0.6rem] font-bold mb-1" style={{ color: gd }}>SATISFACTION</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: gd }}>{I.star("w-3 h-3 sm:w-3.5 sm:h-3.5")}</span>)}</div>
                <span className="font-display text-sm sm:text-base font-extrabold">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function TestimonialsSection() {
  const reviews = [
    { n: "김OO", a: "28세 여성", j: "마케터", t: "서류 검증이 되어 있어서 만나기 전부터 안심이 됐어요. 상담사 분도 정말 친절하셨습니다." },
    { n: "이OO", a: "31세 남성", j: "개발자", t: "전문가가 이상형에 맞는 분을 직접 찾아주니까 정말 편했습니다. 가격도 합리적이에요." },
    { n: "박OO", a: "26세 여성", j: "디자이너", t: "결혼정보회사는 너무 무겁고, 앱은 너무 가벼운데 딱 그 중간이라 좋았어요." },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#fff0f5] to-[#fdf6f8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.star("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>Reviews</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">회원들의 <span className="text-gradient">솔직한 후기</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 reveal">
          {reviews.map((v, i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-pink-50 shadow-sm hover:shadow-lg hover:shadow-pink-100/20 transition-all">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: gd }}>{I.star("w-3 h-3 sm:w-3.5 sm:h-3.5")}</span>)}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5" style={{ color: sb }}>&ldquo;{v.t}&rdquo;</p>
              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-pink-50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold" style={{ background: "linear-gradient(135deg, #fff0f5, #fce4ec)", color: pk }}>{v.n[0]}</div>
                <div>
                  <div className="text-[0.65rem] sm:text-xs font-bold">{v.n}</div>
                  <div className="text-[0.55rem] sm:text-[0.65rem]" style={{ color: mt }}>{v.a} / {v.j}</div>
                </div>
              </div>
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
    <div className="border-b border-pink-50 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 sm:py-5 text-left group">
        <span className="text-xs sm:text-sm font-medium pr-4 group-hover:text-[#d4567a] transition-colors" style={{ color: "#555" }}>{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-pink-100 rotate-180" : "bg-pink-50"}`} style={{ color: pk }}>{I.chevD("w-3 h-3 sm:w-3.5 sm:h-3.5")}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-48 pb-4 sm:pb-5" : "max-h-0"}`}>
        <p className="text-[0.65rem] sm:text-xs leading-relaxed" style={{ color: mt }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const fqs = [
    { q: "어떤 서류를 제출해야 하나요?", a: "재직증명서, 혼인관계증명서, 신분증 등등을 기본으로 요청드립니다. 서류는 매칭 목적 외 절대 사용되지 않으며, 종료 후 안전하게 폐기됩니다." },
    { q: "매칭까지 얼마나 걸리나요?", a: "서류 확인 후 평균 48시간 이내에 첫 프로필을 제안합니다." },
    { q: "소개팅 앱과 뭐가 다른가요?", a: "앱은 사진으로만 판단하지만, 인연연구소는 서류 검증 + 전문 상담사의 성격·가치관 분석 기반 매칭입니다." },
    { q: "결혼을 전제로 해야 하나요?", a: "아닙니다. 가벼운 소개팅부터 진지한 만남까지, 목적에 맞춰 매칭해 드립니다." },
    { q: "개인정보는 안전한가요?", a: "모든 서류와 개인정보는 암호화 저장하며, 매칭 목적 외 절대 제3자에게 공유되지 않습니다." },
  ];
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-[600px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 reveal">
          <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
            <span style={{ color: pk }}>{I.chat("w-3.5 h-3.5")}</span>
            <span className="text-xs font-medium" style={{ color: pk }}>FAQ</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">자주 묻는 <span className="text-gradient">질문</span></h2>
        </div>
        <div className="bg-pink-50/30 rounded-2xl p-4 sm:p-6 reveal">
          {fqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT ═══ */
function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1f, #2a1a20)" }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full blur-[100px] sm:blur-[120px]" style={{ background: pk }} />
        <div className="absolute bottom-1/4 right-1/4 w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] rounded-full blur-[80px] sm:blur-[100px]" style={{ background: gd }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 text-center text-white">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
          {I.heart("w-6 h-6 sm:w-7 sm:h-7")}
        </div>
        <h2 className="reveal font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">당신의 인연,<br />여기서 시작됩니다</h2>
        <p className="text-xs sm:text-sm mb-10 sm:mb-12 text-white/40 reveal">무료 상담으로 부담 없이 시작해 보세요.</p>
        <div className="space-y-2.5 sm:space-y-3 max-w-xs mx-auto mb-8 sm:mb-10 reveal">
          <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="rounded-xl py-3.5 sm:py-4 px-4 sm:px-5 flex items-center gap-3 sm:gap-4 hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-white/50">{I.chat("w-4 h-4 flex-shrink-0")}</span>
            <div className="text-left">
              <div className="text-[0.5rem] sm:text-[0.55rem] text-white/40 uppercase tracking-wider">카카오톡</div>
              <div className="text-xs sm:text-sm text-white/70">오픈채팅 상담하기</div>
            </div>
            <span className="ml-auto text-white/30">{I.arrowR("w-4 h-4")}</span>
          </a>
        </div>
        <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-sm font-bold btn-shimmer shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all reveal" style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)` }}>
          지금 상담 시작하기 {I.arrowR("w-4 h-4")}
        </a>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="py-8 sm:py-12 bg-white border-t border-pink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span style={{ color: pk }}>{I.heart("w-4 h-4")}</span>
          <span className="font-logo text-base">인연<span style={{ color: pk }}>연구소</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {["소개", "장점", "가격", "컨설팅", "상담"].map((l, i) => (
            <a key={i} href={`#${["about", "features", "pricing", "consult", "contact"][i]}`} className="text-xs hover:text-[#d4567a] transition-colors" style={{ color: mt }}>{l}</a>
          ))}
        </div>
        <div className="text-[0.6rem] sm:text-xs" style={{ color: `${mt}80` }}>&copy; 2026 인연연구소</div>
      </div>
    </footer>
  );
}

/* ═══ KAKAO ═══ */
function KakaoButton() {
  return (
    <a href={KAKAO} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30 hover:scale-110 transition-all duration-300"
      style={{ background: "#FEE500" }} aria-label="카카오톡 상담">
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z"/>
      </svg>
    </a>
  );
}

export default function Home() {
  useReveal();
  return (
    <main>
      <Navbar /><HeroSection /><Marquee /><AboutSection /><FeaturesSection /><ProcessSection /><PricingSection /><ConsultSection /><TestimonialsSection /><FAQSection /><ContactSection /><Footer /><KakaoButton />
    </main>
  );
}
