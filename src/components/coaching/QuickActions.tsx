"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, ChatCircleDots, Plus, SignIn, X } from "@phosphor-icons/react";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import s from "./chrome.module.css";

export default function QuickActions(){
 const [open,setOpen]=useState(false);const [visible,setVisible]=useState(false);const [hiddenByForm,setHiddenByForm]=useState(false);const [collapsed,setCollapsed]=useState(false);
 useEffect(()=>{let frame=0;const update=()=>{frame=0;setVisible(window.scrollY>innerHeight*.55);const form=document.getElementById("consultation");setHiddenByForm(Boolean(form&&form.getBoundingClientRect().top<innerHeight*.8));};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener("scroll",scroll,{passive:true});return()=>{window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);};},[]);
 return <><aside className={`${s.quick} ${open?s.quickOpen:""}`} aria-label="빠른 상담"><button type="button" className={s.quickToggle} onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"빠른 상담 접기":"빠른 상담 펼치기"}>{open?<X size={20}/>:<Plus size={21} weight="bold"/>}</button><Link href="/apply"><span>무료상담</span><SignIn size={19}/></Link><a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={s.quickKakao}><span>카톡문의</span><ChatCircleDots size={19}/><span className="sr-only"> (새 창)</span></a><button type="button" className={s.quickTop} onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant" as ScrollBehavior:"smooth"})} aria-label="페이지 맨 위로"><ArrowUp size={22}/><span>top</span></button></aside><aside className={`${s.tray} ${visible?s.trayVisible:""} ${hiddenByForm?s.trayHidden:""} ${collapsed?s.trayCollapsed:""}`} aria-label="무료 상담 안내" aria-hidden={!visible||hiddenByForm} inert={!visible||hiddenByForm?"" as never:undefined}><div className={s.trayText}><strong>어떤 코칭이 좋을지 함께 정리해드립니다</strong><p>지금의 고민을 남겨주세요. 무료 상담으로 시작하세요.</p></div><div className={s.trayButtons}><Link href="/apply">상담신청</Link><a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer"><ChatCircleDots size={18} weight="fill"/> 카톡상담</a></div><button type="button" className={s.trayClose} onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?"상담 안내 펼치기":"상담 안내 접기"}>{collapsed?<Plus size={24}/>:<X size={26}/>}</button></aside></>;
}
