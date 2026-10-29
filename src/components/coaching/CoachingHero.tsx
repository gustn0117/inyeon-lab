"use client";

import Link from "next/link";
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
    {intro && <div className={s.intro} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={l.hero} data-home-section="hero" aria-labelledby="home-title">
      {/* 사진 자리 — AI 인물 사진 대신 빗금으로 둔다 (실제 사진이 준비되면 교체) */}
      <div className={l.heroMedia} aria-hidden="true" />
      <div className={l.heroInner}>
        {/* 운영자 원고·예시 시안(2026-10-27) — 큰 제목 → 서비스 한 줄 → 설명 → 채팅·신청 버튼 → 브랜드 한 줄.
            '소개팅 신청하기'는 시안에 없지만 운영자가 첫 화면에 따로 요청했던 버튼이라 그 아래 둔다.
            누르면 신청서가 아니라 소개팅 주선 설명(08)으로 먼저 간다 — 운영자 요청(2026-10-29). */}
        <div key={String(ready)} className={l.heroCopy}>
          <p className={l.heroIdentity}><span aria-hidden="true" />당신의 연애에도 변화가 시작됩니다</p>
          <h1 id="home-title">당신에게 맞는<br /><span className={l.heroAccent}>연애 솔루션</span></h1>
          <p className={l.heroLead}><span className={l.noBreak}>1:1 연애컨설팅 ·</span> <span className={l.noBreak}>성향 기반 소개팅</span></p>
          <p className={l.heroSub}>연애 성향 분석과 맞춤 코칭, 가치관을 고려한<br /> 소개팅 주선 서비스를 제공합니다.</p>
          <div className={l.heroActions}>
            <ChatButton className={l.heroChat}><ChatsCircle size={20} aria-hidden="true" /> 채팅 상담<CaretRight size={15} weight="bold" aria-hidden="true" /></ChatButton>
            <Link href="/apply" className={l.heroApply}><NotePencil size={20} aria-hidden="true" /> 신청 접수하기<CaretRight size={15} weight="bold" aria-hidden="true" /></Link>
            <Link href="/services/matching" className={l.heroGhost}><Heart size={17} aria-hidden="true" /> 소개팅 신청하기</Link>
          </div>
          <p className={l.heroBrand}><span>INYEON LAB</span>연애 고민부터 새로운 인연까지, 인연연구소가 함께합니다.</p>
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
