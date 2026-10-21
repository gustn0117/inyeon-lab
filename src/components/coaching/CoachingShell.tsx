import Link from "next/link";
import { ArrowUpRight, ChatCircleDots, LockKey } from "@phosphor-icons/react/dist/ssr";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import s from "./coaching.module.css";
import c from "./chrome.module.css";
import Header from "./CoachingHeader";
import QuickActions from "./QuickActions";
import { PhotoIntro } from "./CoachingVisual";

export function CoachingHeader() {
  return <Header />;
}

export function KakaoLink({ className = s.kakao, children = <>카카오톡 문의하기 <ChatCircleDots size={18} /></> }: { className?: string; children?: React.ReactNode }) {
  return <a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> (새 창)</span></a>;
}

export function CoachingFooter() {
  return <><footer className={c.footer}><div className={c.footerMain}><div className={c.footerInfo}><Link href="/" className={c.brand}><strong>인연연구소</strong><small>INYEON LAB</small></Link><p>상호 인연연구소 · 대표 김가영 · 사업자등록번호 463-59-00868</p><p>이메일 orelim0623@naver.com · 카카오톡 상담 채널 inyeon_</p><p><LockKey size={12} className="inline" /> 모든 상담은 100% 비밀유지됩니다. 사진과 상담 내용은 동의 없이 공개하지 않습니다.</p><div className={c.footerLinks}><Link href="/terms">이용약관</Link><Link href="/privacy">개인정보 처리방침</Link><Link href="/refund">취소 및 환불 규정</Link><Link href="/#faq">자주 묻는 질문</Link></div></div><div className={c.footerContact}><div className={c.footerButtons}><Link href="/apply">무료 상담 신청 <ArrowUpRight size={15}/></Link><KakaoLink className="">카카오톡 상담 <ChatCircleDots size={16}/></KakaoLink></div><a href="tel:01076170181" className={c.footerPhone}>010-7617-0181</a><p>상담 일정은 신청 확인 후 개별 안내합니다.</p></div></div><div className={c.footerBottom}><p>만 19세 이상 성인 대상 서비스입니다. 연애 성공이나 특정한 결과를 보장하지 않습니다.</p><span>© INYEON LAB. All rights reserved.</span></div></footer><QuickActions/></>;
}

export default function CoachingShell({ children }: { children: React.ReactNode }) {
  return <div className={`${s.site} ${c.shell}`}><a href="#main-content" className={s.skipLink}>본문으로 바로가기</a><CoachingHeader /><main id="main-content">{children}</main><CoachingFooter /></div>;
}

export function PageIntro({ eyebrow, title, description, image, imagePosition, imageCaption, anchorLabel, children }: { eyebrow: string; title: React.ReactNode; description: React.ReactNode; image?: string; imagePosition?: string; imageCaption?: string; anchorLabel?: string; children?: React.ReactNode }) {
  if (image) return <PhotoIntro eyebrow={eyebrow} title={title} description={description} image={image} imagePosition={imagePosition} imageCaption={imageCaption} anchorLabel={anchorLabel}>{children}</PhotoIntro>;
  return <section className={s.pageIntro}><div className={s.container}><span className={s.eyebrow}><i className={s.dot} />{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section>;
}
