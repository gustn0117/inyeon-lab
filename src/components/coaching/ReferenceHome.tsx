"use client";

// 기존(10/20) 홈 디자인 그대로 — 사진 자리만 빗금으로 두고, 내용은 지금의 연애코칭 원고를 넣었다.
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChatCircleDots, LockKey } from "@phosphor-icons/react";
import { type Program, won } from "@/lib/coaching";
import { COACHING_SERVICES, findService } from "@/lib/coaching-services";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import CoachingHero from "./CoachingHero";
import CoachingForm from "./CoachingForm";
import { ConversationExample } from "./CoachingVisual";
import Programs from "./Programs";
import s from "./home.module.css";
import st from "./story.module.css";
import v from "./visual.module.css";
import c from "./coaching.module.css";

const BRAND_LINES=["AI가 아닌,","사람이 직접 듣고","코칭합니다.","인연연구소"];
// 이런 고민 있으신가요? — 운영자 원고 여섯 가지, 각각 맞는 코칭 서비스로 연결
const CONCERNS=[
 {text:"소개팅만 하면 다음 만남으로 이어지지 않아요.",href:"/services/first-date"},
 {text:"관심 있는 사람에게 어떻게 다가가야 할지 모르겠어요.",href:"/services/flirting"},
 {text:"카카오톡 대화가 자꾸 끊겨요.",href:"/services/kakao-talk"},
 {text:"연애할 때마다 비슷한 문제로 갈등이 생겨요.",href:"/services/love-pattern"},
 {text:"이성과 대화하는 것이 어렵고 자신감이 없어요.",href:"/services/total"},
 {text:"나에게 어울리는 스타일을 모르겠어요.",href:"/services/styling"},
];
const CATEGORIES=["연애코칭 서비스","코칭 프로그램","무료로 시작하기"];
const FREE=[
 {id:"self",name:"무료 연애 자가진단",meta:"10개의 질문",description:"나의 연애 성향과 필요한 연습을 알아보세요.",href:"/diagnosis"},
 {id:"free",name:"무료 상담 신청",meta:"고민 · 질문 남기기",description:"어떤 코칭이 좋을지, 현재 상황부터 함께 정리해요.",href:"/apply"},
 {id:"impression",name:"무료 첫인상 진단",meta:"사진 기반 피드백",description:"헤어와 의상, 나에게 어울리는 스타일의 시작.",href:"/apply?kind=impression"},
];
const ANGLES=[180,240,285,320,40,105];
const ORBIT=[
 {label:"소개팅",aria:"소개팅이 다음 만남으로 이어지지 않아요",service:"first-date",reason:"첫 만남의 대화와 호감 표현, 만남 이후의 소통까지 함께 점검하고 개선 순서를 잡아보세요."},
 {label:"썸·호감",aria:"썸에서 연애로 나아가고 싶어요",service:"flirting",reason:"상황에 맞는 호감 표현과 만남 제안을 연습하고, 실제 반응을 바탕으로 피드백받아보세요."},
 {label:"연애 갈등",aria:"연애 중 갈등을 풀고 싶어요",service:"concern",reason:"지금의 갈등을 정리하고, 내 마음과 원하는 바를 상대에게 어떻게 전할지 함께 살펴보세요."},
 {label:"카톡·대화",aria:"카톡과 이성 대화가 어려워요",service:"kakao-talk",reason:"실제 대화에서 막히는 지점을 찾고, 질문과 답장을 나에게 맞는 표현으로 바꿔보세요."},
 {label:"첫인상",aria:"첫인상과 스타일을 바꾸고 싶어요",service:"styling",reason:"본인 사진과 고민을 남기면 어울리는 헤어·의상과 첫인상 개선 방향을 안내해드립니다. 사진 제출은 선택사항입니다."},
 {label:"연애 습관",aria:"비슷한 연애 고민이 계속 반복돼요",service:"love-pattern",reason:"반복되는 연애 습관과 갈등의 원인을 살피고, 더 건강한 관계를 위한 방향을 함께 찾아보세요."},
];
const TAG_CONCERNS=[0,1,3,0,3,3,2,5,5,4,4,4,4,0,5,5];
const TAGS=["소개팅","썸·호감 표현","카톡·대화","첫 만남 대화","답장 방식","이성 대화","연애 중 갈등","관계 형성","연애 습관","첫인상","헤어스타일","소개팅 복장","스타일링","실전 피드백","맞춤 과제","1:1 비대면"];
const SERVICE_WORDS=["1:1 맞춤 코칭","카카오톡 상담","소개팅·썸 코칭","카톡 대화 코칭","무료 연애진단","첫인상·스타일링"];
const HUMAN_DIFFERENCES=[
 {label:"현실을 아는 조언",title:"실제 소개팅 운영 경험을 바탕으로 한 코칭",description:"다양한 남녀의 선호 조건과 소개팅 과정에서 나타나는 반응을 접한 경험을 바탕으로 현실적인 조언을 제공합니다."},
 {label:"나에게 맞는 방향",title:"남녀 상담사의 체계적인 1:1 맞춤 상담",description:"같은 고민이라도 사람마다 상황과 성향은 다릅니다. 남녀 상담사가 고객님의 이야기를 충분히 듣고, 필요한 질문으로 고민을 분석해 개인에게 맞는 실천 방향을 제안합니다."},
 {label:"대화의 디테일",title:"실제 카카오톡 대화 분석 및 교정",description:"이성과 나눈 대화를 함께 살펴보고 어색한 표현, 대화 습관, 호감 표현 등을 분석하여 자연스러운 대화 방법을 제안합니다."},
 {label:"질문하고 답하는 시간",title:"실시간으로 소통하는 연애코칭",description:"일방적인 분석 결과만 전달하는 것이 아니라, 카카오톡으로 직접 대화하며 궁금한 점을 질문하고 답변받을 수 있습니다."},
 {label:"따뜻하고 솔직하게",title:"공감과 현실적인 조언의 균형",description:"무조건 고객님의 편을 들거나 듣기 좋은 말만 하지 않습니다. 개선이 필요한 부분은 솔직하게 안내하되, 고객님의 감정과 입장을 존중합니다."},
 {label:"일상에서 실천하기",title:"실천할 수 있는 구체적인 솔루션",description:"막연히 자신감을 가지라는 조언이 아닌, 실제 상황에서 사용할 수 있는 대화 예시와 행동 방법을 제안합니다."},
];
const EXAMPLES=[
 {category:"카카오톡 대화 코칭",service:"kakao-talk",concern:"상대방이 계속 단답으로 답하는데 어떻게 해야 할까요?",coaching:"실제 대화 흐름을 살펴보고 질문 방식이나 표현을 개선할 수 있도록 구체적인 답장 예시를 제안합니다."},
 {category:"소개팅 코칭",service:"first-date",concern:"소개팅은 여러 번 했는데 항상 다음 만남으로 이어지지 않아요.",coaching:"대화 방식, 첫인상, 만남 이후 연락 습관 등을 점검하고 개선 방향을 제안합니다."},
];
const STEPS=[
 {title:"상담 신청",text:"원하는 서비스와 고민을 선택합니다."},
 {title:"고민 및 상황 전달",text:"카카오톡으로 현재 상황과 고민을 전달합니다."},
 {title:"1:1 맞춤형 코칭",text:"상황을 분석하고 구체적인 조언과 개선 방향을 안내합니다."},
 {title:"피드백 및 마무리",text:"상담 내용을 정리하고 실생활에서 적용할 수 있는 방법을 안내합니다."},
];
const FAQS=[
 {question:"연애 경험이 없어도 상담받을 수 있나요?",answer:"네. 연애 경험의 유무와 관계없이 지금 상황에 맞춰 진행합니다. 이성과 대화를 시작하는 방법, 나를 자연스럽게 표현하는 방법처럼 필요한 부분부터 차근차근 함께 연습합니다."},
 {question:"모든 상담은 카카오톡으로 진행되나요?",answer:"네. 모든 상담과 코칭은 카카오톡 1:1 비대면으로 진행됩니다. 직접 만나지 않아도 되어 지역과 관계없이 편하게 이용하실 수 있고, 일정은 신청 확인 후 개별로 안내드립니다."},
 {question:"카카오톡 대화 내용을 보내도 되나요?",answer:"네. 실제 대화를 함께 살펴보면 더 구체적인 코칭이 가능합니다. 캡처를 보내실 때는 상대방의 이름, 프로필 사진, 연락처처럼 상대를 알아볼 수 있는 정보는 가려주세요. 보내주신 내용은 상담에만 사용하며 동의 없이 외부에 공개하지 않습니다."},
 {question:"상담은 얼마나 진행되나요?",answer:"프로그램마다 상담 시간과 횟수가 다릅니다. 한 번에 고민을 정리하는 단회 상담부터 여러 회차에 걸쳐 연습하는 집중 코칭까지 있으니, 위의 프로그램 및 가격 안내에서 비교해보세요."},
 {question:"어떤 프로그램을 선택해야 할지 모르겠어요.",answer:"카카오톡으로 지금의 고민을 편하게 말씀해주세요. 상황을 듣고 맞는 프로그램을 안내해드립니다. 무료 연애 자가진단이나 무료 상담 신청서로 먼저 시작하셔도 됩니다."},
 {question:"스타일링 제안은 정말 무료인가요?",answer:"네. 사진을 보내주시면 어울리는 헤어스타일과 옷차림 등 기본 스타일링 방향을 무료로 제안해드립니다. 사진 제출은 선택사항이며, 보내주신 사진은 동의 없이 공개하지 않습니다."},
 {question:"상담 후 추가 질문도 가능한가요?",answer:"상담 시간, 답변 횟수와 추가 질문 가능 범위는 선택하신 프로그램에 따라 다릅니다. 신청 전 카카오톡으로 문의하시면 프로그램별로 자세히 안내해드립니다."},
 {question:"재회 상담도 진행하나요?",answer:"재회 상담은 진행하지 않습니다. 지난 연애에서 반복된 문제를 돌아보고 다음 관계를 준비하고 싶으시다면, '연애 성향·문제점 분석'으로 앞으로의 방향을 함께 정리해드립니다."},
];

function HumanDifferences(){
 const list=useRef<HTMLOListElement>(null);const [active,setActive]=useState(0);
 const go=(direction:number)=>{const el=list.current;if(!el)return;const next=Math.max(0,Math.min(HUMAN_DIFFERENCES.length-1,active+direction));const first=el.children[0] as HTMLElement,item=el.children[next] as HTMLElement;el.scrollTo({left:item.offsetLeft-first.offsetLeft,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant" as ScrollBehavior:"smooth"});};
 return <><div className={st.featureTools}><span>나를 위한 여섯 가지 코칭 원칙</span><div className={st.featureNavigation}><span aria-live="polite">0{active+1} <i>/ 06</i></span><button type="button" onClick={()=>go(-1)} disabled={active===0} aria-label="이전 차별점"><ArrowLeft size={18}/></button><button type="button" onClick={()=>go(1)} disabled={active===HUMAN_DIFFERENCES.length-1} aria-label="다음 차별점"><ArrowRight size={18}/></button></div></div><ol ref={list} className={st.featureGrid} tabIndex={0} aria-label="인연연구소의 여섯 가지 차별점" onScroll={e=>{const el=e.currentTarget,first=el.children[0] as HTMLElement;const step=first.offsetWidth+parseFloat(getComputedStyle(el).columnGap);setActive(Math.max(0,Math.min(HUMAN_DIFFERENCES.length-1,Math.round(el.scrollLeft/step))));}}>{HUMAN_DIFFERENCES.map((item,i)=><li key={item.title} className={st.featureCard} data-human-difference data-visual-reveal><div className={st.featurePhoto}><span className={st.featureNumber}>0{i+1}</span><span className={st.featureLabel}>{item.label}</span></div><div className={st.featureCopy}><h4>{item.title}</h4><p>{item.description}</p></div></li>)}</ol><p className={st.swipeHint}>옆으로 넘겨 나에게 필요한 코칭을 살펴보세요 <ArrowRight size={14}/></p></>;
}

function Elastic({text,offset=0}:{text:string;offset?:number}){return <>{text.split(/(\s+)/).map((word,w)=> <span key={w} style={{display:"inline-block",whiteSpace:"pre"}}>{Array.from(word).map((char,i)=><span aria-hidden="true" key={i} className={s.elasticChar} style={{"--i":offset+text.split(/(\s+)/).slice(0,w).join("").length+i} as CSSProperties}>{char}</span>)}</span>)}</>;}
function Title({first,accent,children}:{first:string;accent:string;children?:ReactNode}){return <h2 aria-label={`${first} ${accent}`}><Elastic text={first}/>{children??" "}<em><Elastic text={accent} offset={first.length+1}/></em></h2>;}

function BrandScene(){
 const panel=useRef<HTMLDivElement>(null);const [step,setStep]=useState(0);
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   frame=0;if(!panel.current)return;
   const headerHeight=parseFloat(getComputedStyle(panel.current).getPropertyValue("--brand-header-height"))||0;
   const start=innerHeight-80;const end=Math.min(start-1,headerHeight+24);
   const progress=Math.max(0,Math.min(1,(start-panel.current.getBoundingClientRect().top)/(start-end)/.98));
   setStep(progress>=.78?3:progress>=.58?2:progress>=.30?1:0);
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onScroll);
  return()=>{cancelAnimationFrame(frame);removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll);};
 },[]);
 return <section id="promise" className={s.brandTrack} data-home-section="brand" aria-label="인연연구소의 약속"><div ref={panel} className={s.brandPinned}><div className={s.brandMeta} aria-hidden="true"><span>INYEON LAB</span><span>PERSONAL COACHING</span></div><div className={s.brandText}><p data-brand-step={step}>{BRAND_LINES[step]}</p></div><div className={s.brandProgress} aria-hidden="true">{BRAND_LINES.map((_,i)=><span key={i} data-current={i<=step}/>)}</div><span className={s.brandIndex} aria-hidden="true">0{step+1}<i>/</i>04</span></div></section>;
}
function ConcernCard({index,wide,duplicate=false}:{index:number;wide?:boolean;duplicate?:boolean}){const item=CONCERNS[index];return <Link href={item.href} tabIndex={duplicate?-1:0} aria-hidden={duplicate||undefined} aria-label={item.text} className={`${s.concernCard} ${wide?s.concernWide:""}`}><span className={s.photoSlot} aria-hidden="true"/><span className={s.concernCaption}>“{item.text}”</span></Link>;}
function ConcernMarquee(){return <section id="concerns" className={s.concernSection} data-reveal data-home-section="concerns" aria-labelledby="concerns-title"><span className={s.sectionKicker} aria-hidden="true">DO YOU RELATE?</span><div className={s.sectionTitle} id="concerns-title"><Title first="이런 고민" accent="있으신가요?"/></div><div className={s.marquee}><div className={s.marqueeDesktop}>{[0,1].map(row=><div key={row} className={s.marqueeRow}><div className={s.marqueeTrack} data-marquee-track="horizontal">{[0,1].map(copy=><div key={copy} className={s.marqueeGroup}>{[0,1,2,3,4,5].map((n)=><ConcernCard key={n} index={(n+row*3)%6} wide={n%2===1} duplicate={copy===1}/>)}</div>)}</div></div>)}</div><div className={s.marqueeMobile}>{[0,1].map(col=><div className={s.marqueeColumn} key={col}><div className={s.marqueeVertical} data-marquee-track="vertical">{[0,1].map(copy=><div className={s.marqueeVGroup} key={copy}>{[0,1,2,3].map((n)=><ConcernCard key={n} index={(n+col*3)%6} wide={n%2===1} duplicate={copy===1}/>)}</div>)}</div></div>)}</div></div><p className={s.concernClosing}>하나라도 해당된다면, <strong>연애코칭이 도움이 될 수 있습니다.</strong></p></section>;}

type SlideItem={id:string;name:string;meta:string;description:string;badge:string;href:string};
function ProgramSlider({programs}:{programs:Program[]|null}){
 const [category,setCategory]=useState(0);const [switching,setSwitching]=useState(false);const switchTimer=useRef<ReturnType<typeof setTimeout>>();const [slide,setSlide]=useState(0);const [manual,setManual]=useState(false);const root=useRef<HTMLElement>(null);const slider=useRef<HTMLDivElement>(null);const drag=useRef<{x:number;left:number;moved:boolean}|null>(null);const moved=useRef(false);
 const items:SlideItem[]=category===0?COACHING_SERVICES.map(service=>({id:service.id,name:service.name,meta:`${service.number} · 1:1 카카오톡 코칭`,description:service.tagline,badge:service.number,href:`/services/${service.id}`}))
  :category===1?(programs??[]).map(p=>({id:p.id,name:p.name,meta:`${p.duration} · 1:1 카카오톡`,description:p.tagline,badge:won(p.price),href:`/programs/${p.id}`}))
  :FREE.map(item=>({...item,badge:"무료"}));
 const selectCategory=(i:number,fromUser=true)=>{
  if(fromUser)setManual(true);
  if(i===category)return;
  clearTimeout(switchTimer.current);setSwitching(true);
  switchTimer.current=setTimeout(()=>{setCategory(i);setSlide(0);setSwitching(false);},matchMedia("(prefers-reduced-motion: reduce)").matches?0:innerWidth<=768?260:320);
 };
 useEffect(()=>()=>clearTimeout(switchTimer.current),[]);
 const go=(i:number)=>{const el=slider.current;if(!el)return;setManual(true);const next=Math.max(0,Math.min(items.length-1,i));setSlide(next);const item=el.children[next] as HTMLElement|undefined;if(item){el.scrollTo({left:item.offsetLeft-(el.children[0] as HTMLElement).offsetLeft,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant" as ScrollBehavior:"smooth"});}};
 useEffect(()=>{if(manual||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=setInterval(()=>{if(!root.current||document.hidden)return;const rect=root.current.getBoundingClientRect();if(rect.top>innerHeight*.7||rect.bottom<innerHeight*.15)return;if(slide<items.length-1){const next=slide+1;setSlide(next);const el=slider.current;if(el){const first=el.children[0] as HTMLElement,item=el.children[next] as HTMLElement;el.scrollTo({left:item.offsetLeft-first.offsetLeft,behavior:"smooth"});}}else selectCategory((category+1)%3,false);},slide>=items.length-1?14000:2800);return()=>clearInterval(timer);},[category,slide,manual,items.length]);
 return <section id="services" ref={root} data-reveal data-home-section="services" className={s.programSection}><span className={s.sectionKicker} aria-hidden="true">COACHING SERVICES</span><div className={s.sectionTitle}><Title first="인연연구소" accent="어떤 코칭이 필요하세요?"><><span className={s.titleSpace}> </span><br className={s.titleBreak}/></></Title></div><div className={s.programLayout}><div className={`${s.programNav} ${s.revealContent}`} role="tablist" aria-label="코칭 분류" onKeyDown={e=>{if(!["ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const next=(category+(e.key==="ArrowRight"?1:2))%3;selectCategory(next);(e.currentTarget.children[next] as HTMLElement)?.focus();}}>{CATEGORIES.map((label,i)=><button type="button" key={label} role="tab" id={`program-tab-${i}`} aria-selected={category===i} tabIndex={category===i?0:-1} aria-controls="home-program-slides" onClick={()=>selectCategory(i)}>{label}</button>)}</div><div className={s.programContent}><div className={s.mobileTabs} role="tablist" aria-label="코칭 분류 모바일" onKeyDown={e=>{if(!["ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const next=(category+(e.key==="ArrowRight"?1:2))%3;selectCategory(next);(e.currentTarget.children[next] as HTMLElement)?.focus();}}>{CATEGORIES.map((label,i)=><button type="button" role="tab" key={label} aria-selected={category===i} tabIndex={category===i?0:-1} aria-controls="home-program-slides" onClick={()=>selectCategory(i)}>{label}</button>)}</div><div className={`${s.categoryEnter} ${switching?s.categoryLeaving:""}`} key={category}><div id="home-program-slides" ref={slider} className={s.slider} role="tabpanel" aria-label={CATEGORIES[category]} onPointerDown={e=>{if(e.pointerType==="touch")return;drag.current={x:e.clientX,left:e.currentTarget.scrollLeft,moved:false};moved.current=false;e.currentTarget.style.scrollSnapType="none";}} onPointerMove={e=>{if(!drag.current)return;const delta=e.clientX-drag.current.x;if(Math.abs(delta)>6){drag.current.moved=true;moved.current=true;setManual(true);e.currentTarget.scrollLeft=drag.current.left-delta;}}} onPointerUp={e=>{drag.current=null;e.currentTarget.style.scrollSnapType="";}} onPointerLeave={e=>{drag.current=null;e.currentTarget.style.scrollSnapType="";}} onClickCapture={e=>{if(moved.current){e.preventDefault();moved.current=false;}}} onTouchStart={()=>setManual(true)} onScroll={e=>{if(innerWidth>768)return;const el=e.currentTarget;const width=(el.children[0] as HTMLElement)?.offsetWidth??180;setSlide(Math.max(0,Math.min(items.length-1,Math.round(el.scrollLeft/(width+11)))));}}>{items.map(item=><article key={item.id} className={`${s.programSlide} ${items[slide]?.id===item.id?s.activeProgramSlide:""}`}><Link href={item.href} className={s.programVisual} draggable={false}><span className={s.photoSlot} aria-hidden="true"/><div className={s.programCopy}><small>{item.meta}</small><h3>{item.name}</h3><p>{item.description}</p></div><strong className={s.programPrice}>{item.badge}</strong></Link><div className={s.programCaption}><span>{item.name}</span><ArrowUpRight size={16}/></div></article>)}</div></div>{!programs&&category===1&&<p style={{padding:24}}>프로그램 정보를 확인하지 못했습니다. <Link href="/apply">무료 상담으로 문의해주세요.</Link></p>}<div className={s.slideControls}><Link href="/programs">프로그램 전체 보기 ↗</Link><button type="button" onClick={()=>go(slide-1)} aria-label="이전 코칭"><ArrowLeft size={16}/></button><button type="button" onClick={()=>go(slide+1)} aria-label="다음 코칭"><ArrowRight size={16}/></button></div></div></div></section>;
}

function CoachingOrbit(){
 const [selected,setSelected]=useState(0);const [angle,setAngle]=useState(90);const [hovered,setHovered]=useState(false);const [manual,setManual]=useState(false);const root=useRef<HTMLElement>(null);const concern=ORBIT[selected];const service=findService(concern.service);
 const choose=(i:number,fromUser=true)=>{if(fromUser)setManual(true);if(i===selected)return;setSelected(i);setAngle(current=>{let target=ANGLES[i]-90;while(target<=current)target+=360;return target;});};
 useEffect(()=>{if(manual||hovered||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=setInterval(()=>{if(!root.current||document.hidden)return;const r=root.current.getBoundingClientRect();if(r.top<innerHeight*.6&&r.bottom>innerHeight*.2)choose((selected+1)%6,false);},2600);return()=>clearInterval(timer);},[selected,manual,hovered]);
 return <section id="recommend" ref={root} data-reveal data-home-section="recommend" className={s.recommend}><span className={s.sectionKicker} aria-hidden="true">FIND YOUR DIRECTION</span><div className={s.recommendTitle}><Title first="고민마다" accent="필요한 코칭은" > </Title><h2 aria-label="따로 있습니다."><Elastic text="따로 있습니다." offset={16}/></h2></div><div className={`${s.keywords} ${s.revealContent}`} aria-label="코칭으로 함께 다루는 고민">{TAGS.map((tag,i)=><button type="button" key={tag} aria-label={`${tag} 고민 선택`} aria-pressed={TAG_CONCERNS[i]===selected} onClick={()=>choose(TAG_CONCERNS[i])}>{tag}</button>)}</div><div className={`${s.orbitStage} ${s.revealContent}`}><div className={s.orbitWrap}><img className={s.map} src="/coaching/korea-map.png" alt="전국 어디서나 카카오톡으로 비대면 코칭" loading="lazy"/><div className={s.orbit}><div className={s.orbitRing} style={{transform:`rotate(${angle}deg)`}} aria-hidden="true"/>{ORBIT.map((item,i)=>{const rad=(ANGLES[i]-90)*Math.PI/180;const x=Math.cos(rad),y=Math.sin(rad);return <button type="button" key={item.service} className={s.node} aria-label={item.aria} aria-pressed={selected===i} aria-controls="recommendation-result" onMouseEnter={()=>{setHovered(true);choose(i,false);}} onMouseLeave={()=>setHovered(false)} onClick={()=>choose(i)} style={{left:`${50+x*50}%`,top:`${50+y*50}%`,"--lx":`calc(${x.toFixed(4)} * var(--label-distance))`,"--ly":`calc(${y.toFixed(4)} * var(--label-distance))`} as CSSProperties}><span>{item.label}</span></button>;})}</div><div id="recommendation-result" className={s.orbitCopy} aria-live={manual?"polite":"off"}><div key={selected} className={s.categoryEnter}><small>나에게 맞는 연애코칭 찾기</small><h3>{service?.name}</h3><p>{concern.reason}</p><Link href={`/services/${concern.service}`}>추천 코칭 자세히 보기<ArrowUpRight size={15}/></Link></div></div></div></div></section>;
}

function TypeTitle(){const [text,setText]=useState("무료 상담 신청");const ref=useRef<HTMLHeadingElement>(null);useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let timer:ReturnType<typeof setInterval>|undefined;const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting&&!timer){let i=0;setText("");timer=setInterval(()=>{i++;setText("무료 상담 신청".slice(0,i));if(i>=8&&timer){clearInterval(timer);timer=undefined;observer.disconnect();}},110);}}},{threshold:.3});if(ref.current)observer.observe(ref.current);return()=>{observer.disconnect();clearInterval(timer);};},[]);return <h2 ref={ref} className={s.typingTitle} aria-label="무료 상담 신청"><span aria-hidden="true">{text}</span></h2>;}

export default function ReferenceHome({programs}:{programs:Program[]|null}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const sections=root.current?.querySelectorAll<HTMLElement>("[data-reveal]");if(!sections)return;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   const element=entry.target as HTMLElement;
   element.classList.toggle(s.entered,entry.isIntersecting);
   const chars=element.querySelectorAll(`.${s.elasticChar}`);
   gsap.killTweensOf(chars);
   const count=element.querySelector<HTMLElement>("[data-coaching-count]");
   if(count){gsap.killTweensOf(count);if(entry.isIntersecting&&!reduce.matches)gsap.fromTo(count,{textContent:0},{textContent:100,duration:1.4,ease:"power2.out",snap:{textContent:1}});else count.textContent="100";}
   if(entry.isIntersecting&&innerWidth>768&&!reduce.matches){
    gsap.fromTo(chars,{opacity:0,y:90},{opacity:1,y:0,duration:1.9,ease:"elastic.out(1.2, 0.5)",stagger:.03,overwrite:true,clearProps:"transform,opacity"});
   }else gsap.set(chars,{clearProps:"transform,opacity"});
  }),{rootMargin:"0px 0px -10% 0px",threshold:0});
  sections.forEach(element=>{observer.observe(element);element.classList.add(s.motionReady);});
  const visualObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add(st.visualEntered);visualObserver.unobserve(entry.target);}}},{threshold:.12,rootMargin:"0px 0px -5% 0px"});
  if(!reduce.matches)root.current?.querySelectorAll<HTMLElement>("[data-visual-reveal]").forEach(element=>{element.classList.add(st.visualPending);visualObserver.observe(element);});
  return()=>{observer.disconnect();visualObserver.disconnect();sections.forEach(element=>{gsap.killTweensOf(element.querySelectorAll(`.${s.elasticChar}`));gsap.killTweensOf(element.querySelectorAll("[data-coaching-count]"));});};
 },[]);
 return <div ref={root} className={s.home}>
  <CoachingHero/><BrandScene/><ConcernMarquee/><ProgramSlider programs={programs}/><CoachingOrbit/>
  <section className={s.serviceSection} data-home-section="keywords" aria-label="인연연구소 연애코칭"><div className={s.serviceStrip}><div className={s.serviceTrack}>{[0,1].map(copy=><div className={s.serviceGroup} key={copy} aria-hidden={copy===1||undefined}>{SERVICE_WORDS.map(name=><span key={name}>{name}</span>)}</div>)}</div></div></section>
  <section id="coaching" className={st.storySection} data-home-section="value">
   <div className={st.storyInner}>
    <div className={st.visualIntro} data-reveal>
     <div className={st.introCopy}>
      <span className={st.kicker}>HUMAN TO HUMAN</span>
      <h2 aria-label="AI가 아닌, 사람이 직접 듣고 코칭합니다."><Elastic text="AI가 아닌,"/><br/><em><Elastic text="사람이 직접 듣고" offset={7}/></em><br/><Elastic text="코칭합니다." offset={18}/></h2>
      <p>연애는 정답보다<br className={st.desktopBreak}/> 사람에 대한 이해가 중요하니까.</p>
      <p className={st.introDescription}>남녀 상담사가 당신의 이야기를 직접 듣고,<br/>체계적이고 전문적인 1:1 코칭을 제공합니다.</p>
      <div className={st.metrics}><div><strong>1:1</strong><span>나에게 집중하는 맞춤 코칭</span></div><div><strong aria-label="100%"><span data-coaching-count aria-hidden="true">100</span><span aria-hidden="true">%</span></strong><span>카카오톡 비대면 상담</span></div></div>
     </div>
     <div className={st.introVisual} data-visual-reveal>
      <figure className={st.introPhoto}><figcaption><span>LET’S TALK, TOGETHER.</span><b>당신을 이해하는 것부터.</b></figcaption></figure>
      <div className={st.chatPreview}><div className={st.chatPreviewHead}><ChatCircleDots size={20}/><span>이렇게, 함께 시작해요</span><small>대화 예시</small></div><p>어떻게 말을 꺼내야 할까요?</p><p>지금의 상황부터<br/>함께 살펴볼게요.</p></div>
      <span className={st.visualStamp} aria-hidden="true">INYEON LAB <i>↗</i></span>
     </div>
    </div>
    <div className={st.differences} data-human-story id="difference">
     <div className={st.differenceIntro} data-visual-reveal><div><span className={st.kicker}>WHY INYEON LAB</span><h3>더 나은 관계를 위한,<br/>인연연구소만의 차이.</h3></div><div className={st.differenceDescription}><p>AI에게도 연애 고민을 물어볼 수 있는 시대입니다. 하지만 인연연구소는 단순히 질문에 답변하는 것에서 끝나지 않습니다.</p><p>인연연구소는 실제 소개팅 업체를 운영하며 다양한 남녀의 만남과 선호 조건, 관계 형성 과정을 경험했습니다. 이러한 경험을 바탕으로 남녀 상담사가 고객님의 상황과 성향에 맞는 전문적인 코칭을 제공합니다.</p></div></div>
     <HumanDifferences/>
     <div className={st.closingBanner} data-visual-reveal><div className={st.closingCopy}><span className={st.kicker}>BETTER TOGETHER</span><p>AI에게 질문하는 것을 넘어,<br/>사람과 함께 고민하고 해결하는 시간.</p><span>인연연구소는 당신의 연애가 조금 더 나은 방향으로<br className={st.desktopBreak}/> 나아갈 수 있도록 함께하겠습니다.</span></div></div>
    </div>
   </div>
  </section>
  <section id="examples" className={s.contentSection} data-reveal data-home-section="examples" aria-label="코칭 예시">
   <span className={s.sectionKicker} aria-hidden="true">COACHING EXAMPLES</span>
   <div className={s.sectionTitle}><Title first="이렇게" accent="코칭해드려요"/></div>
   <div className={`${s.contentInner} ${s.exampleGrid} ${s.revealContent}`}>{EXAMPLES.map(item=><div key={item.category}><ConversationExample caption={item.category} label="가상 예시" question={`“${item.concern}”`} answer={item.coaching}/><Link href={`/services/${item.service}`} className={s.contentLink}>{findService(item.service)?.name} 자세히 보기 <ArrowUpRight size={14}/></Link></div>)}</div>
   <p className={s.contentNote}>※ 실제 상담 사례가 아닌 서비스 이해를 돕기 위한 가상 예시입니다.</p>
  </section>
  <section id="process" className={`${s.contentSection} ${s.contentSoft}`} data-reveal data-home-section="process" aria-label="상담 진행 과정">
   <span className={s.sectionKicker} aria-hidden="true">HOW IT WORKS</span>
   <div className={s.sectionTitle}><Title first="상담" accent="진행 과정"/></div>
   <div className={`${s.contentInner} ${v.processGrid} ${s.processFour} ${s.revealContent}`} role="region" aria-label="상담 진행 네 단계" tabIndex={0}>{STEPS.map((step,i)=><article key={step.title} className={v.processCard}><span className={v.processPhoto} aria-hidden="true"/><div><span>STEP 0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
  </section>
  <section id="pricing" className={s.contentSection} data-reveal data-home-section="pricing" aria-label="프로그램 및 가격 안내">
   <span className={s.sectionKicker} aria-hidden="true">PROGRAMS &amp; PRICE</span>
   <div className={s.sectionTitle}><Title first="프로그램 및" accent="가격 안내"/></div>
   <div className={`${s.contentInner} ${s.revealContent}`}><Programs programs={programs}/></div>
  </section>
  <section id="faq" className={`${s.contentSection} ${s.contentSoft}`} data-reveal data-home-section="faq" aria-label="자주 묻는 질문">
   <span className={s.sectionKicker} aria-hidden="true">FAQ</span>
   <div className={s.sectionTitle}><Title first="자주 묻는" accent="질문"/></div>
   <div className={`${s.contentInner} ${s.faqInner} ${c.faq} ${s.revealContent}`}>{FAQS.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
  </section>
  <section id="consultation" className={`${s.consultSection} ${st.consultSection}`} data-reveal data-home-section="consultation">
   <span className={s.sectionKicker} aria-hidden="true">YOUR STORY STARTS HERE</span>
   <div className={s.consultHead}><TypeTitle/><p>혼자 고민했던 연애, 이제는 함께 해결 방향을 찾아보세요.<br/>지금의 상황과 궁금한 점을 남겨주세요. 함께 방향을 찾아갑니다.</p><a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={s.consultKakao}><ChatCircleDots size={18} weight="fill" aria-hidden="true"/> 카카오톡 상담 신청<span className="sr-only"> (새 창)</span></a></div>
   <div className={st.consultLayout}>
    <div className={st.consultVisual} data-visual-reveal><figure><span className={st.privateBadge}><LockKey size={14}/> 1:1 비밀 상담</span><figcaption><span>ONE SMALL STEP</span><p>혼자 고민하던 시간에서,<br/>함께 이야기하는 시간으로.</p></figcaption></figure><div className={st.consultCaption}><span><ChatCircleDots size={18}/> 카카오톡으로 편하게</span><span>당신의 속도로 시작하세요 ↗</span></div></div>
    <div className={`${s.inlineForm} ${s.revealContent} ${st.consultForm}`}><CoachingForm mode="free" compact initialPrograms={programs}/></div>
   </div>
  </section>
 </div>;
}
