"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, CaretDown, List, Phone, X } from "@phosphor-icons/react";
import s from "./chrome.module.css";

const GROUPS=[
 {label:"연구소 소개",href:"/#coaching",links:[["/#coaching","사람이 직접 하는 코칭"],["/#difference","인연연구소만의 차별점"],["/#for-you","이런 분들께 추천해요"]]},
 {label:"코칭 프로그램",href:"/programs",links:[["/programs","전체 프로그램 · 가격"],["/programs/conversation","카톡 · 말투 개선"],["/programs/intensive","2주 집중 코칭"],["/programs/premium","4주 프리미엄"]]},
 {label:"무료 진단",href:"/diagnosis",links:[["/diagnosis","무료 연애 자가진단"],["/#recommend","나에게 맞는 코칭 찾기"],["/apply?kind=impression","무료 첫인상 진단"]]},
 {label:"상담 안내",href:"/apply",links:[["/apply","무료 상담 신청"],["/checkout","프로그램 신청 · 입금 안내"],["/programs#faq","자주 묻는 질문"],["/refund","취소 및 환불 안내"]]},
];
export default function CoachingHeader(){
 const [open,setOpen]=useState(false);const pathname=usePathname();const menuButton=useRef<HTMLButtonElement>(null);const menu=useRef<HTMLElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);menuButton.current?.focus();}if(e.key==="Tab"){const focusable=[menuButton.current,...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a")??[])].filter(Boolean) as HTMLElement[];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener("keydown",close);return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",close);};},[open]);
 return <><header className={s.header}><div className={s.notice}>연애에도 연습이 필요합니다. 인연연구소.</div><div className={s.headerInner}><Link href="/" className={s.brand} aria-label="인연연구소 홈" onClick={()=>setOpen(false)}><strong>인연연구소</strong><small>INYEON LAB</small></Link><nav className={s.nav} aria-label="주요 메뉴">{GROUPS.map(group=><div key={group.label} className={s.navGroup}><Link href={group.href} className={s.navLink}>{group.label}<CaretDown size={10}/></Link><div className={s.flyout}>{group.links.map(([href,label])=><Link key={label} href={href}>{label}</Link>)}</div></div>)}</nav><div className={s.actions}><a href="tel:01076170181" className={s.call} aria-label="전화 문의 010-7617-0181"><Phone size={18}/><span>010-7617-0181</span></a><Link href="/apply" className={s.cta}>무료 상담받기 <ArrowRight size={16}/></Link><button type="button" ref={menuButton} onClick={()=>setOpen(!open)} className={s.menuButton} aria-expanded={open} aria-controls="coaching-navigation" aria-label={open?"메뉴 닫기":"전체 메뉴 열기"}>{open?<X size={24}/>:<List size={24}/>}</button></div></div></header>{open&&<nav ref={menu} id="coaching-navigation" className={s.menu} aria-label="전체 메뉴"><div className={s.menuGrid}>{GROUPS.map((group,i)=><div key={group.label} className={s.menuGroup}><small>0{i+1}</small><h2>{group.label}</h2>{group.links.map(([href,label])=><Link key={label} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</div>)}</div><div className={s.menuBottom}><p>모든 상담은 카카오톡으로, 1:1 비밀유지.</p><Link href="/apply" className={s.cta} onClick={()=>setOpen(false)}>나의 이야기 들려주기 <ArrowRight size={18}/></Link></div></nav>}</>;
}
