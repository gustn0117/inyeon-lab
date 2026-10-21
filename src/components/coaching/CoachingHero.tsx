"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ChatCircleDots, Check, Pause, Play } from "@phosphor-icons/react";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import s from "./home.module.css";
import l from "./landing.module.css";

const PHOTOS = ["consultant-v3.webp", "process-01-v2.webp", "meeting-wide-v4.webp", "process-04-v2.webp", "consultant-v4.webp"];
const HIGHLIGHTS = ["100% 카카오톡 비대면 상담", "1:1 개인 맞춤형 코칭", "소개팅 업체 운영 경험 기반", "기본 스타일링 무료 제안"];

export default function CoachingHero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const done = () => { setReady(true); setIntro(false); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); setPaused(true); return; }
    const timer = setTimeout(done, 2900);
    return () => clearTimeout(timer);
  }, []);
  // Background photos keep changing behind the fixed copy; the button lets visitors stop it.
  useEffect(() => {
    if (!ready || paused) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive(index => { setPrevious(index); return (index + 1) % PHOTOS.length; });
    }, 5200);
    return () => clearInterval(timer);
  }, [ready, paused]);
  return <>
    {intro && <div className={s.intro} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={l.hero} data-home-section="hero" aria-labelledby="home-title">
      <div className={l.heroMedia} aria-hidden="true">
        {PHOTOS.map((image, i) => <div key={image} className={`${s.heroPhoto} ${i === active ? s.heroPhotoActive : i === previous ? s.heroPhotoPrev : ""}`} style={{ backgroundImage: `url(/inyeon-2026/${image})` }} data-hero-image={i} />)}
      </div>
      <div key={String(ready)} className={l.heroCopy}>
        <h1 id="home-title">연애가 어려운<br className={l.mobileBreak} /> 당신을 위한<br />1:1 맞춤 연애코칭</h1>
        <p className={l.heroSub}>썸부터 소개팅, 카카오톡 대화, 연애 고민까지.<br className={l.desktopBreak} /> 혼자 고민했던 연애 문제를 함께 분석하고 현실적인 해결 방향을 제안합니다.</p>
        <ul className={l.heroHighlights} aria-label="인연연구소 연애코칭의 특징">
          {HIGHLIGHTS.map(item => <li key={item}><Check size={14} weight="bold" aria-hidden="true" />{item}</li>)}
        </ul>
        <div className={l.heroActions}>
          <a href="#services" className={l.heroGhost}>연애코칭 알아보기 <ArrowDown size={16} aria-hidden="true" /></a>
          <a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={l.heroKakao}><ChatCircleDots size={18} weight="fill" aria-hidden="true" /> 카카오톡 상담 신청<span className="sr-only"> (새 창)</span></a>
        </div>
      </div>
      <button type="button" className={l.heroPause} onClick={() => setPaused(!paused)} aria-label={paused ? "배경 사진 넘김 재생" : "배경 사진 넘김 일시정지"}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
    </section>
  </>;
}
