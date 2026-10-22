"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChatCircleDots, ChatsCircle, NotePencil, Plus, SignIn, X } from "@phosphor-icons/react";
import ChatWidget, { type ChatState } from "@/components/ChatWidget";
import { KAKAO_COPIED_EVENT, KAKAO_ID, OPEN_CHAT_EVENT } from "@/lib/contact";
import { copyKakaoId } from "./KakaoIdButton";
import s from "./chrome.module.css";

const openChat = () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT));

export default function QuickActions(){
 const [open,setOpen]=useState(false);const [visible,setVisible]=useState(false);const [hiddenByForm,setHiddenByForm]=useState(false);const [collapsed,setCollapsed]=useState(false);const [chat,setChat]=useState<ChatState>({open:false,unread:0});
 const [kakaoToast,setKakaoToast]=useState<{copied:boolean}|null>(null);const toastTimer=useRef<ReturnType<typeof setTimeout>>();
 useEffect(()=>{let frame=0;const update=()=>{frame=0;setVisible(window.scrollY>innerHeight*.55);const form=document.getElementById("consultation");setHiddenByForm(Boolean(form&&form.getBoundingClientRect().top<innerHeight*.8));};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener("scroll",scroll,{passive:true});return()=>{window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);};},[]);
 // 어디서든 카카오톡 ID를 복사하면 화면 아래에 친구 추가 방법을 잠깐 보여 준다.
 useEffect(()=>{const show=(e:Event)=>{setKakaoToast({copied:Boolean((e as CustomEvent<{copied:boolean}>).detail?.copied)});clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setKakaoToast(null),3600);};window.addEventListener(KAKAO_COPIED_EVENT,show);return()=>{window.removeEventListener(KAKAO_COPIED_EVENT,show);clearTimeout(toastTimer.current);};},[]);
 // 채팅 창이 열려 있으면 아래 안내 띠는 접어 둔다.
 const trayOff=!visible||hiddenByForm||chat.open;
 // 탭 안의 span은 세로 글씨로 돌아가므로, 새 답변 수는 b(시각용)와 버튼 이름(스크린리더용)으로 나눈다.
 const unreadLabel=chat.unread>0?`, 새 답변 ${chat.unread}개`:"";
 const badge=chat.unread>0&&<b className={s.chatBadge} aria-hidden="true">{chat.unread>99?"99+":chat.unread}</b>;
 return <><aside className={`${s.quick} ${open?s.quickOpen:""}`} aria-label="빠른 상담"><button type="button" className={s.quickToggle} onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"빠른 상담 접기":"빠른 상담 펼치기"}>{open?<X size={20}/>:<Plus size={21} weight="bold"/>}</button><button type="button" className={s.quickChat} onClick={openChat} aria-haspopup="dialog" aria-label={`실시간 채팅상담${unreadLabel}`}><span>채팅상담</span><ChatsCircle size={19}/><i className={s.liveDot} aria-hidden="true"/>{badge}</button><Link href="/apply"><span>신청접수</span><SignIn size={19}/></Link><button type="button" className={s.quickKakao} onClick={copyKakaoId} aria-label={`카카오톡 ID ${KAKAO_ID} 복사`}><span>카톡 ID</span><ChatCircleDots size={19}/></button><button type="button" className={s.quickTop} onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant" as ScrollBehavior:"smooth"})} aria-label="페이지 맨 위로"><ArrowUp size={22}/><span>top</span></button></aside><aside className={`${s.tray} ${visible?s.trayVisible:""} ${hiddenByForm||chat.open?s.trayHidden:""} ${collapsed?s.trayCollapsed:""}`} aria-label="무료 상담 안내" aria-hidden={trayOff} inert={trayOff?"" as never:undefined}><div className={s.trayText}><strong>어떤 코칭이 좋을지 함께 정리해드립니다</strong><p>지금의 고민을 남겨주세요. 무료 상담으로 시작하세요.</p></div><div className={s.trayButtons}><Link href="/apply">신청 접수하기</Link><button type="button" onClick={openChat} aria-haspopup="dialog"><ChatsCircle size={18}/> 채팅 상담</button></div><button type="button" className={s.trayClose} onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?"상담 안내 펼치기":"상담 안내 접기"}>{collapsed?<Plus size={24}/>:<X size={26}/>}</button></aside><div className={s.mobileBar}><button type="button" className={s.mobileChat} onClick={openChat} aria-haspopup="dialog" aria-label={`실시간 채팅 상담${unreadLabel}`}><ChatsCircle size={20} aria-hidden="true"/> 채팅 상담{badge}</button><Link href="/apply" className={s.mobileApply}><NotePencil size={20} aria-hidden="true"/> 신청 접수하기</Link></div><div className={`${s.kakaoToast} ${kakaoToast?s.kakaoToastShow:""}`} role="status" aria-live="polite">{kakaoToast&&<><strong>{kakaoToast.copied?`카카오톡 ID ${KAKAO_ID} 복사 완료`:`카카오톡 ID ${KAKAO_ID}`}</strong><span>카카오톡 친구 추가 → ID로 추가에서 {kakaoToast.copied?"붙여넣어":"검색해"} 주세요.</span></>}</div><ChatWidget onStateChange={setChat}/></>;
}
