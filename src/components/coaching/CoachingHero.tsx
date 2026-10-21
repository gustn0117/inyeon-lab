"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ChatCircleDots, Pause, Play } from "@phosphor-icons/react";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import s from "./home.module.css";

// 첫 장은 운영자 요청 문구, 나머지는 첫 화면 특징 네 가지
// (\u00a0: 줄바꿈 없는 공백 — 좁은 화면에서 "당신을 위한"이 함께 다음 줄로 넘어가도록)
const SLIDES = [
  { label: "당신의 연애에도 변화가 시작됩니다", lead: "썸부터 소개팅, 카카오톡 대화, 연애 고민까지.\n혼자 고민했던 연애 문제를 함께 분석하고 현실적인 해결 방향을 제안합니다.", title: "연애가 어려운 당신을\u00a0위한\n1:1 맞춤 연애코칭" },
  { label: "100% 카카오톡 비대면 상담", lead: "직접 만나지 않아도 괜찮아요.\n카카오톡으로 편하게 1:1 상담합니다", title: "편하게, 카카오톡으로." },
  { label: "1:1 개인 맞춤형 코칭", lead: "같은 고민이라도 사람마다 다르니까,\n나의 상황에 맞춰 함께 살펴봅니다", title: "나에게 맞춘 1:1 코칭." },
  { label: "소개팅 업체 운영 경험 기반", lead: "다양한 만남을 지켜본 경험으로\n현실적인 방향을 제안합니다", title: "현실을 아는 연애 조언." },
  { label: "기본 스타일링 무료 제안", lead: "헤어 · 의상 · 소개팅 복장,\n원하시는 분께 사진을 바탕으로 제안합니다", title: "첫인상부터, 나답게." },
];

export default function CoachingHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  const pointer = useRef<{x:number;y:number}|null>(null);
  const change = (index:number) => { setActive((index+SLIDES.length)%SLIDES.length); };
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const done = () => {setReady(true);setIntro(false);};
    if(reduce.matches) {done();setPaused(true);return;}
    const timer = setTimeout(done,2900);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if(!ready || paused) return;
    const timer = setInterval(() => {if(!document.hidden) setActive(index => (index+1)%SLIDES.length);},4200);
    return () => clearInterval(timer);
  },[ready,paused,active]);
  return <>
    {intro && <div className={s.intro} aria-hidden="true"><div className={s.introInner}><small>INYEON LAB</small><p>마음을 전하는 방법을 연구합니다</p><strong>{Array.from("인연연구소").map((char,i)=><span key={i} style={{"--i":i} as CSSProperties}>{char}</span>)}</strong><i /></div></div>}
    <section className={`${s.hero} ${s.heroBackdrop}`} data-home-section="hero" aria-label="인연연구소 연애코칭 소개" aria-roledescription="슬라이드 쇼">
      <div className={s.heroStage} onPointerDown={e=>{if((e.target as HTMLElement).closest("button,a"))return;pointer.current={x:e.clientX,y:e.clientY};}} onPointerUp={e=>{if(!pointer.current)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;pointer.current=null;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.2)change(active+(dx<0?1:-1));}} onPointerCancel={()=>{pointer.current=null;}}>
        {/* 사진 자리 — AI 인물 사진 대신 빗금 (실제 사진이 준비되면 교체) */}
        <figure className={s.heroMedia} aria-hidden="true"><div className={`${s.heroPhoto} ${s.heroPhotoActive} ${s.heroHatch}`} /></figure>
        <div className={s.heroCopy}>
          <div className={s.heroText}>
            {/* 다섯 장을 같은 자리에 겹쳐 두고 지금 장만 보인다 — 가장 긴 장 높이로 자리를 잡아 장이 바뀌어도 버튼과 아래 내용이 움직이지 않는다 */}
            <div className={s.heroSlides}>{SLIDES.map((item,i)=>{const current=i===active;const title=item.title.split("\n").map((line,j)=><span key={j}>{j>0&&<br/>}{line}</span>);return <div key={current?`${i}-${ready}`:i} className={current?undefined:s.heroSizer} aria-hidden={current?undefined:true}><span className={s.heroPoint}>Point {String(i+1).padStart(2,"0")}. {item.label}</span><p className={s.heroLead}>{item.lead}</p>{current?<h1 id="home-title">{title}</h1>:<h1>{title}</h1>}</div>;})}</div>
            <div className={s.heroCtas}><a href="#services" className={s.heroCtaGhost}>연애코칭 알아보기 <ArrowDown size={16} aria-hidden="true"/></a><a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={s.heroCtaKakao}><ChatCircleDots size={18} weight="fill" aria-hidden="true"/> 카카오톡 상담 신청<span className="sr-only"> (새 창)</span></a></div>
          </div>
          <div className={s.heroControls} aria-label="코칭 소개 슬라이드 조작"><button type="button" onClick={()=>change(active-1)} aria-label="이전 코칭 소개"><ArrowLeft size={14} /> Prev</button><span className={s.counter}><strong>{String(active+1).padStart(2,"0")}</strong> / 05</span><button type="button" onClick={()=>change(active+1)} aria-label="다음 코칭 소개">Next <ArrowRight size={14} /></button><div className={s.dots}>{SLIDES.map((item,i)=><button key={item.label} type="button" aria-label={`${i+1}번 코칭 소개 보기`} aria-pressed={active===i} onClick={()=>change(i)} />)}</div><button type="button" className={s.pause} onClick={()=>setPaused(!paused)} aria-label={paused?"소개 자동 넘김 재생":"소개 자동 넘김 일시정지"}>{paused?<Play size={12}/>:<Pause size={12}/>}</button></div>
        </div>
      </div>
    </section>
  </>;
}
