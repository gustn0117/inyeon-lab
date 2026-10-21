import type { Metadata } from "next";
import CoachingShell, { PageIntro } from "@/components/coaching/CoachingShell";
import Diagnosis from "@/components/coaching/Diagnosis";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "무료 연애 자가진단 | 인연연구소", description: "10개 질문으로 연애에서 어려움을 느끼는 부분을 살펴보고, 오늘부터 해볼 연습과 나에게 맞는 코칭을 확인하세요. 약 2분, 무료 자가점검." };
export default async function DiagnosisPage() {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><PageIntro photo imageCaption="나를 알면, 시작이 달라집니다." anchorLabel="무료 진단 시작하기" eyebrow="A SMALL CHECK-IN WITH YOURSELF" title="내 연애는 어디에서 어려울까요?" description="대화를 시작하는 순간, 마음을 표현하는 타이밍, 가까워진 관계에서의 소통까지. 10개의 질문으로 지금의 나를 살펴보세요." /><section id="coaching-content" className={`${s.section} ${s.sectionTint}`}><div className={s.container}><Diagnosis programs={programs} /></div></section></CoachingShell>;
}
