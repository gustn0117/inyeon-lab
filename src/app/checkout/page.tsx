import { GuidePhoto } from "@/components/coaching/CoachingVisual";
import type { Metadata } from "next";
import CoachingShell, { PageIntro } from "@/components/coaching/CoachingShell";
import KakaoIdButton from "@/components/coaching/KakaoIdButton";
import { KAKAO_ID } from "@/lib/contact";
import CoachingForm from "@/components/coaching/CoachingForm";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "프로그램 신청 · 계좌이체 안내 | 인연연구소", description: "원하는 연애코칭 프로그램을 선택하고 성함·연락처·입금자명을 남겨주세요. 프로그램 금액과 우체국은행 계좌를 안내합니다." };
export default async function CheckoutPage({ searchParams }: { searchParams: { program?: string } }) {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><PageIntro photo imageCaption="더 나은 관계를 위한 첫걸음." anchorLabel="프로그램 선택 · 신청하기" eyebrow="START YOUR COACHING" title="프로그램 신청 및 입금 안내" description="나에게 맞는 프로그램을 선택하고 신청서를 작성해주세요. 계좌이체 후 입금이 확인되면 남겨주신 연락처로 연락드립니다." /><section id="coaching-content" className={s.formSection}><div className={`${s.container} ${s.formLayout}`}><div className={s.formCard}><CoachingForm mode="paid" initialProgramId={searchParams.program} initialPrograms={programs} /></div><aside className={s.aside}><GuidePhoto caption="나의 속도로, 차근차근."/><div className={s.asideCard}><h2>신청 · 입금 · 일정 확정</h2><p>01. 프로그램과 금액 확인<br />02. 성함·연락처·입금자명 작성<br />03. 신청서 제출 후 계좌이체<br />04. 입금 확인 후 연락 및 일정 조율<br />05. 예약된 시간에 카카오톡 코칭</p><p style={{ marginTop: 16 }}>신청서 제출은 입금 확인이나 예약 확정을 의미하지 않습니다. 희망 일정은 담당자와 조율합니다.</p></div><div className={s.asideCard}><h3>신청자와 입금자가 다른가요?</h3><p>실제 입금하실 분의 성함을 입금자명에 적어주세요. 이미 입금하셨거나 정보가 다르다면 카카오톡 ID {KAKAO_ID}으로 알려주세요.</p><KakaoIdButton className={s.kakao} /></div></aside></div></section></CoachingShell>;
}
