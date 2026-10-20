import { GuidePhoto } from "@/components/coaching/CoachingVisual";
import type { Metadata } from "next";
import CoachingShell, { KakaoLink, PageIntro } from "@/components/coaching/CoachingShell";
import CoachingForm from "@/components/coaching/CoachingForm";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const metadata: Metadata = { title: "무료 상담 · 첫인상 진단 신청 | 인연연구소", description: "연애 고민, 질문과 사진을 하나의 무료 상담 신청서에 남겨주세요. 무료 첫인상 진단도 같은 폼에서 신청할 수 있습니다." };
export const dynamic = "force-dynamic";
export default async function ApplyPage({ searchParams }: { searchParams: { kind?: string } }) {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><PageIntro image={searchParams.kind === "impression" ? "/inyeon-2026/female-01-v4.webp" : "/inyeon-2026/process-01-v2.webp"} imageCaption={searchParams.kind === "impression" ? "나를 잘 보여주는 첫인상." : "마음을 편하게 꺼내는 시간."} anchorLabel="무료 신청서 작성하기" eyebrow="LET’S TALK, IN PRIVATE" title="고민을 나누는 순간부터 시작됩니다." description="연애 고민, 상담 전 질문, 첫인상과 스타일링까지. 하나의 신청서에 편하게 남겨주세요. 모든 상담은 비밀유지 원칙으로 진행합니다." /><section id="coaching-content" className={s.formSection}><div className={`${s.container} ${s.formLayout}`}><div className={s.formCard}><CoachingForm mode="free" initialPrograms={programs} initialKind={searchParams.kind === "impression" ? "impression" : "consultation"} /></div><aside className={s.aside}><GuidePhoto image="/inyeon-2026/consultant-v3.webp" caption="당신의 이야기를 직접 듣습니다."/><div className={s.asideCard}><h2>무료 상담은 이렇게 진행돼요.</h2><p>01. 고민과 질문을 남겨주세요.<br />02. 담당자가 내용을 확인합니다.<br />03. 남겨주신 연락처로 상담을 안내합니다.<br />04. 상황에 맞는 코칭 방향을 함께 정합니다.</p><p style={{ marginTop: 16 }}>무료 상담은 고민 확인과 프로그램 안내 과정입니다. 구체적인 분석과 지속적인 훈련은 유료 프로그램에서 진행합니다.</p></div><div className={s.asideCard}><h3>무료 첫인상 진단</h3><p>상단에서 ‘무료 첫인상 진단’을 선택하고 본인 사진과 고민을 첨부해주세요. 간단한 첫인상·스타일링 피드백을 카카오톡으로 안내합니다.</p></div><div className={s.asideCard}><h3>직접 물어보고 싶으신가요?</h3><p>카카오톡으로 편하게 문의해주세요.<br />사진과 고민을 공개 게시판에 남기지 않습니다.</p><KakaoLink /></div></aside></div></section></CoachingShell>;
}
