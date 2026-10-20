import v from "@/components/coaching/visual.module.css";
import CoachingEvent from "@/components/coaching/CoachingEvent";
import type { Metadata } from "next";
import CoachingShell, { PageIntro } from "@/components/coaching/CoachingShell";
import { FAQS } from "@/lib/coaching";
import Programs from "@/components/coaching/Programs";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "연애코칭 프로그램 및 가격 | 인연연구소", description: "19,900원 고민 상담부터 2주·4주 집중 코칭까지. 카카오톡 1:1 비대면 코칭으로 말투, 대화, 소개팅과 썸에서의 소통을 연습하세요." };
export default async function ProgramsPage() {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><PageIntro image="/inyeon-2026/meeting-wide-v4.webp" imageCaption="나에게 맞는 코칭, 더 편안한 만남." eyebrow="COACHING PROGRAMS" title="지금 나에게 필요한 코칭을 선택하세요." description="상황을 정리하는 한 번의 상담부터, 관계의 습관을 바꾸는 꾸준한 연습까지. 모든 프로그램은 1:1 카카오톡 비대면 채팅으로 진행합니다." /><section id="coaching-content" className={`${s.section} ${v.contentSection}`}><div className={s.container}><Programs programs={programs} /><CoachingEvent /></div></section><section className={`${s.section} ${s.sectionTint}`} id="process"><div className={s.container}><div className={s.sectionHead}><h2>신청부터 실천까지, 함께합니다.</h2></div><div className={v.processGrid} role="region" aria-label="코칭 진행 다섯 단계" tabIndex={0}>{[["프로그램 선택", "현재 고민과 필요한 도움에 맞는 코칭을 선택합니다.","consultant-v3.webp"],["상담 신청", "성함·연락처와 현재 고민, 질문을 남겨주세요.","process-01-v2.webp"],["입금 · 일정 확정", "계좌이체 후 입금이 확인되면 연락드려 일정을 조율합니다.","process-02-v2.webp"],["1:1 카카오톡 코칭", "말투·대화 방식과 소개팅 실전 상황을 함께 연습합니다.","process-03-v2.webp"],["개선 · 피드백", "실천 가능한 과제와 상황별 피드백으로 개선 방향을 찾습니다.","process-04-v2.webp"]].map(([title,description,image],i)=><article key={title} className={v.processCard} data-editorial-reveal><img src={`/inyeon-2026/${image}`} alt="" loading="lazy" decoding="async"/><div><span>STEP 0{i+1}</span><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section><section id="faq" className={s.section}><div className={`${s.container} ${s.split}`}><div className={s.splitHeading}><span className={s.eyebrow}>자주 묻는 질문</span><h2>시작하기 전,<br/>궁금한 점을 확인하세요.</h2><figure className={v.faqPhoto} data-editorial-reveal><img src="/inyeon-2026/consultant-v3.webp" alt="" loading="lazy" decoding="async"/></figure></div><div className={s.faq}>{FAQS.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section></CoachingShell>;
}
