"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, CaretDown, List, Phone, X } from "@phosphor-icons/react";
import { COACHING_SERVICES } from "@/lib/coaching-services";
import s from "./chrome.module.css";

const GROUPS=[
 {label:"연애코칭 서비스",href:"/#services",links:COACHING_SERVICES.map(service=>[`/services/${service.id}`,service.name])},
 {label:"코칭 안내",href:"/#concerns",links:[["/#concerns","이런 고민 있으신가요?"],["/#examples","코칭 예시"],["/#process","상담 진행 과정"]]},
 {label:"프로그램·가격",href:"/#pricing",links:[["/#pricing","프로그램 및 가격 비교"],["/programs","프로그램 자세히 보기"],["/checkout","프로그램 신청 · 입금 안내"]]},
 {label:"상담 안내",href:"/#faq",links:[["/#faq","자주 묻는 질문"],["/apply","무료 상담 신청서"],["/diagnosis","무료 연애 자가진단"],["/apply?kind=impression","무료 첫인상 진단"],["/refund","취소 및 환불 안내"]]},
];
export default function CoachingHeader(){
 const [open,setOpen]=useState(false);const pathname=usePathname();const menuButton=useRef<HTMLButtonElement>(null);const menu=useRef<HTMLElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);menuButton.current?.focus();}if(e.key==="Tab"){const focusable=[menuButton.current,...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a")??[])].filter(Boolean) as HTMLElement[];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener("keydown",close);return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",close);};},[open]);
 return <><header className={s.header}><div className={s.notice}>연애에도 연습이 필요합니다. 인연연구소.</div><div className={s.headerInner}><Link href="/" className={s.brand} aria-label="인연연구소 홈" onClick={()=>setOpen(false)}><strong>인연연구소</strong><small>INYEON LAB</small></Link><nav className={s.nav} aria-label="주요 메뉴">{GROUPS.map(group=><div key={group.label} className={s.navGroup}><Link href={group.href} className={s.navLink}>{group.label}<CaretDown size={10}/></Link><div className={s.flyout}>{group.links.map(([href,label])=><Link key={label} href={href}>{label}</Link>)}</div></div>)}</nav><div className={s.actions}><a href="tel:01076170181" className={s.call} aria-label="전화 문의 010-7617-0181"><Phone size={18}/><span>010-7617-0181</span></a><Link href="/apply" className={s.cta}>무료 상담받기 <ArrowRight size={16}/></Link><button type="button" ref={menuButton} onClick={()=>setOpen(!open)} className={s.menuButton} aria-expanded={open} aria-controls="coaching-navigation" aria-label={open?"메뉴 닫기":"전체 메뉴 열기"}>{open?<X size={24}/>:<List size={24}/>}</button></div></div></header>{open&&<nav ref={menu} id="coaching-navigation" className={s.menu} aria-label="전체 메뉴"><div className={s.menuGrid}>{GROUPS.map((group,i)=><div key={group.label} className={s.menuGroup}><small>0{i+1}</small><h2>{group.label}</h2>{group.links.map(([href,label])=><Link key={label} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</div>)}</div><div className={s.menuBottom}><p>모든 상담은 카카오톡으로, 1:1 비밀유지.</p><Link href="/apply" className={s.cta} onClick={()=>setOpen(false)}>나의 이야기 들려주기 <ArrowRight size={18}/></Link></div></nav>}</>;
}
