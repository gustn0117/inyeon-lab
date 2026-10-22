"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, ChatCircleText, Check, NotePencil } from "@phosphor-icons/react";
import { COACHING_SERVICES } from "@/lib/coaching-services";
import { SERVICE_ICONS } from "./serviceIcons";
import s from "./home.module.css";
import l from "./landing.module.css";

const HIGHLIGHTS = ["100% 카카오톡 비대면 상담", "1:1 개인 맞춤형 코칭", "소개팅 업체 운영 경험 기반", "기본 스타일링 무료 제안"];

export default function CoachingHero() {
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const done = () => { setReady(true); setIntro(false); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); return; }
    const timer = setTimeout(done, 2900);
    return () => clearTimeout(timer);
  }, []);
  return <>
    {intro && <div className={s.intro} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={l.hero} data-home-section="hero" aria-labelledby="home-title">
      {/* 사진 자리 — AI 인물 사진 대신 빗금으로 둔다 (실제 사진이 준비되면 교체) */}
      <div className={l.heroMedia} aria-hidden="true" />
      <div className={l.heroInner}>
        <div key={String(ready)} className={l.heroCopy}>
          <p className={l.heroIdentity}><span aria-hidden="true" />당신의 연애에도 변화가 시작됩니다</p>
          <h1 id="home-title">연애가 어려운<br className={l.mobileBreak} /> 당신을 위한<br />1:1 맞춤 연애코칭</h1>
          <p className={l.heroSub}>썸부터 소개팅, 카카오톡 대화, 연애 고민까지.<br className={l.desktopBreak} /> 혼자 고민했던 연애 문제를 함께 분석하고 현실적인 해결 방향을 제안합니다.</p>
          <ul className={l.heroHighlights} aria-label="인연연구소 연애코칭의 특징">
            {HIGHLIGHTS.map(item => <li key={item}><Check size={14} weight="bold" aria-hidden="true" />{item}</li>)}
          </ul>
          <div className={l.heroActions}>
            <a href="#services" className={l.heroGhost}>연애코칭 알아보기 <ArrowDown size={16} aria-hidden="true" /></a>
            <Link href="/apply" className={l.heroApply}><NotePencil size={18} aria-hidden="true" /> 신청 접수하기</Link>
          </div>
        </div>
        <nav className={l.whoPanel} aria-labelledby="who-title">
          <div className={l.whoHead}>
            <span className={l.eyebrow}>WHO WE HELP</span>
            <h2 id="who-title">이런 분들이 신청해요</h2>
            <p>연애상담부터 대화·소개팅 피드백·스타일링까지, 고민에 맞는 코칭을 눌러 확인해보세요.</p>
          </div>
          <ul>
            {COACHING_SERVICES.map(service => {
              const ServiceIcon = SERVICE_ICONS[service.id] ?? ChatCircleText;
              return <li key={service.id}><Link href={`/services/${service.id}`}>
                <span className={l.whoIcon} aria-hidden="true"><ServiceIcon size={19} /></span>
                <span className={l.whoText}><strong>{service.name}</strong><small>{service.who}</small></span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link></li>;
            })}
          </ul>
        </nav>
      </div>
    </section>
  </>;
}
