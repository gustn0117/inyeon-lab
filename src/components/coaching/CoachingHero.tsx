"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, CaretRight, ChatCircleText, ChatsCircle, Heart, NotePencil } from "@phosphor-icons/react";
import { COACHING_SERVICES } from "@/lib/coaching-services";
import ChatButton from "./ChatButton";
import { SERVICE_ICONS } from "./serviceIcons";
import s from "./home.module.css";
import l from "./landing.module.css";

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
    {intro && <div className={`${s.intro} ${l.heroIntro}`} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={l.hero} data-home-section="hero" aria-labelledby="home-title">
      <div className={l.heroMedia}>
        <Image src="/photos/holding-hands-sunlight.webp" alt="따뜻한 햇살 아래 자연스럽게 손을 맞잡은 두 사람" fill priority sizes="100vw" quality={90} className={l.heroPhoto} />
      </div>
      <div className={l.heroInner}>
        {/* 운영자 요청(2026-11-03): 밝은 실사 배경과 프리미엄 소개팅 문구. 지표는 후기 아래에 표시한다. */}
        <div key={String(ready)} className={l.heroCopy}>
          <p className={l.heroIdentity}><span aria-hidden="true" />회원님의 만족을 가장 중요하게</p>
          <h1 id="home-title">아무나 주선하지 않는<br /><span className={l.heroAccent}>프리미엄 소개팅</span></h1>
          <p className={l.heroLead}><span className={l.noBreak}>연애컨설팅</span><span className={l.heroSeparator} aria-hidden="true"> • </span><span className={l.noBreak}>성향기반 소개팅</span></p>
          <div className={l.heroActions}>
            <ChatButton className={l.heroChat}><ChatsCircle size={20} aria-hidden="true" /> 채팅 상담<CaretRight size={15} weight="bold" aria-hidden="true" /></ChatButton>
            <Link href="/apply" className={l.heroApply}><NotePencil size={20} aria-hidden="true" /> 신청 접수하기<CaretRight size={15} weight="bold" aria-hidden="true" /></Link>
            <Link href="/services/matching" className={l.heroGhost}><Heart size={17} aria-hidden="true" /> 소개팅 신청하기</Link>
          </div>
          <p className={l.heroBrand}><span>INYEON LAB</span>연애 고민부터 새로운 인연까지, 인연연구소가 함께합니다.</p>
        </div>
      </div>
    </section>
  </>;
}

// 사진과 핵심 문구에 집중할 수 있도록 기존 코칭 바로가기는 후기·지표 다음에 배치한다.
export function CoachingAudience() {
  return <div className={l.whoSection}>
    <div className={l.container}>
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
  </div>;
}
