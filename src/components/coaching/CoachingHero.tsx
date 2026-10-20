"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react";
import s from "./home.module.css";

const SLIDES = [
  { label: "남녀 상담사의 맞춤 연애코칭", lead: "남녀 상담사가 직접 듣고,\n체계적으로 코칭합니다", title: "연애에도 연습이 필요합니다.", image: "consultant-v3.webp" },
  { label: "자연스러운 대화", lead: "말투 · 답장 · 호감 표현을\n실제 대화로 함께 연습합니다", title: "내 마음이 잘 전해지도록.", image: "process-01-v2.webp" },
  { label: "소개팅 실전 피드백", lead: "만남 전 준비와 만남 후 점검,\n첫인상부터 대화 흐름까지", title: "다음 만남을 준비합니다.", image: "meeting-wide-v4.webp" },
  { label: "관계를 이어가는 힘", lead: "반복되는 연애의 어려움,\n나의 습관부터 살펴봅니다", title: "나답게, 더 편안한 관계로.", image: "process-04-v2.webp" },
  { label: "나를 보여주는 첫인상", lead: "헤어 · 의상 · 소개팅 복장,\n나의 장점을 자연스럽게", title: "첫인상부터, 나답게.", image: "consultant-v4.webp" },
];

export default function CoachingHero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  const pointer = useRef<{x:number;y:number}|null>(null);
  const change = (index:number) => { setPrevious(active); setActive((index+SLIDES.length)%SLIDES.length); };
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const done = () => {setReady(true);setIntro(false);};
    if(reduce.matches) {done();setPaused(true);return;}
    const timer = setTimeout(done,2900);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if(!ready || paused) return;
    const timer = setInterval(() => {if(!document.hidden) setActive(index => {setPrevious(index);return (index+1)%SLIDES.length;});},4200);
    return () => clearInterval(timer);
  },[ready,paused,active]);
  const slide=SLIDES[active];
  return <>
    {intro && <div className={s.intro} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char,i)=><span key={i} style={{"--i":i} as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={`${s.hero} ${s.heroBackdrop}`} data-home-section="hero" aria-label="인연연구소 연애코칭 소개" aria-roledescription="슬라이드 쇼">
      <div className={s.heroStage} onPointerDown={e=>{if((e.target as HTMLElement).closest("button,a"))return;pointer.current={x:e.clientX,y:e.clientY};}} onPointerUp={e=>{if(!pointer.current)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;pointer.current=null;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.2)change(active+(dx<0?1:-1));}} onPointerCancel={()=>{pointer.current=null;}}>
        <figure className={s.heroMedia} aria-label="연애코칭과 대화의 분위기를 전하는 연출 이미지">
          {SLIDES.map((item,i)=><div key={item.image} className={`${s.heroPhoto} ${i===active?s.heroPhotoActive:i===previous?s.heroPhotoPrev:""}`} style={{backgroundImage:`url(/inyeon-2026/${item.image})`}} data-hero-image={i} aria-hidden="true" />)}
        </figure>
        <div className={s.heroCopy}>
          <div key={`${active}-${ready}`} className={s.heroText}><span className={s.heroPoint}>Point {String(active+1).padStart(2,"0")}. {slide.label}</span><p className={s.heroLead}>{slide.lead}</p><h1 id="home-title">{slide.title}</h1></div>
          <div className={s.heroControls} aria-label="코칭 소개 슬라이드 조작"><button type="button" onClick={()=>change(active-1)} aria-label="이전 코칭 소개"><ArrowLeft size={14} /> Prev</button><span className={s.counter}><strong>{String(active+1).padStart(2,"0")}</strong> / 05</span><button type="button" onClick={()=>change(active+1)} aria-label="다음 코칭 소개">Next <ArrowRight size={14} /></button><div className={s.dots}>{SLIDES.map((item,i)=><button key={item.label} type="button" aria-label={`${i+1}번 코칭 소개 보기`} aria-pressed={active===i} onClick={()=>change(i)} />)}</div><button type="button" className={s.pause} onClick={()=>setPaused(!paused)} aria-label={paused?"소개 자동 넘김 재생":"소개 자동 넘김 일시정지"}>{paused?<Play size={12}/>:<Pause size={12}/>}</button></div>
        </div>
      </div>
    </section>
  </>;
}
