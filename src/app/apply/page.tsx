import { GuidePhoto } from "@/components/coaching/CoachingVisual";
import type { Metadata } from "next";
import CoachingShell, { PageIntro } from "@/components/coaching/CoachingShell";
import KakaoIdButton from "@/components/coaching/KakaoIdButton";
import { KAKAO_ID } from "@/lib/contact";
import CoachingForm from "@/components/coaching/CoachingForm";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const metadata: Metadata = { title: "무료 상담 · 소개팅 신청 | 인연연구소", description: "연애 고민과 질문을 하나의 신청서에 남겨주세요. 소개팅 신청도 같은 신청서에서 할 수 있습니다." };
export const dynamic = "force-dynamic";
export default async function ApplyPage({ searchParams }: { searchParams: { kind?: string } }) {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><PageIntro photo imageCaption={searchParams.kind === "impression" ? "결이 맞는 인연을 만나는 시작." : "마음을 편하게 꺼내는 시간."} anchorLabel="신청서 작성하기" eyebrow="LET’S TALK, IN PRIVATE" title="고민을 나누는 순간부터 시작됩니다." description="연애 고민, 상담 전 질문, 소개팅 신청까지. 하나의 신청서에 편하게 남겨주세요. 모든 상담은 비밀유지 원칙으로 진행합니다." /><section id="coaching-content" className={s.formSection}><div className={`${s.container} ${s.formLayout}`}><div className={s.formCard}><CoachingForm mode="free" initialPrograms={programs} initialKind={searchParams.kind === "impression" ? "impression" : "consultation"} /></div><aside className={s.aside}><GuidePhoto caption="당신의 이야기를 직접 듣습니다."/><div className={s.asideCard}><h2>무료 상담은 이렇게 진행돼요.</h2><p>01. 고민과 질문을 남겨주세요.<br />02. 담당자가 내용을 확인합니다.<br />03. 남겨주신 연락처로 상담을 안내합니다.<br />04. 상황에 맞는 코칭 방향을 함께 정합니다.</p><p style={{ marginTop: 16 }}>무료 상담은 고민 확인과 프로그램 안내 과정입니다. 구체적인 분석과 지속적인 훈련은 유료 프로그램에서 진행합니다.</p></div><div className={s.asideCard}><h3>소개팅 신청</h3><p>상단에서 ‘소개팅 신청’을 선택하고 간단한 정보를 남겨주세요. 사전 상담 후 진행을 원하시면 전체적인 요소를 고려하여 결이 맞는 분과의 소개팅을 주선합니다.</p></div><div className={s.asideCard}><h3>직접 물어보고 싶으신가요?</h3><p>사이트의 실시간 채팅이나 카카오톡 ID {KAKAO_ID}으로 편하게 문의해주세요.<br />사진과 고민을 공개 게시판에 남기지 않습니다.</p><KakaoIdButton className={s.kakao} /></div></aside></div></section></CoachingShell>;
}
