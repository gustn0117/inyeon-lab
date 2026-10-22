import type { Metadata } from "next";
import CoachingShell, { PageIntro } from "@/components/coaching/CoachingShell";
import KakaoIdButton from "@/components/coaching/KakaoIdButton";
import { KAKAO_ID } from "@/lib/contact";
import s from "@/components/coaching/coaching.module.css";

export const metadata: Metadata = { title: "취소 및 환불 안내 | 인연연구소" };
export default function RefundPage() {
  return <CoachingShell><PageIntro eyebrow="CANCELLATION & REFUNDS" title="취소 및 환불 안내" description="일정 변경, 신청 취소와 환불이 필요한 경우 카카오톡으로 요청해주세요." /><div className={`${s.narrow} ${s.legal}`}>
    <section><h2>취소·환불 요청 방법</h2><p>카카오톡 ID {KAKAO_ID}으로 신청자 성함, 연락처, 프로그램명과 취소 사유를 남겨주세요. 입금하셨다면 입금자명·입금일·입금 금액도 함께 알려주세요. 환불에 필요한 계좌 정보는 담당자가 확인 과정에서 별도로 안내합니다.</p><KakaoIdButton className={s.kakao} /></section>
    <section><h2>아직 입금하지 않은 경우</h2><p>신청 취소 의사를 알려주시면 접수 내역을 확인하여 취소 처리합니다. 입금되지 않은 신청에 대해서는 환불할 금액이 발생하지 않습니다.</p></section>
    <section><h2>입금 후, 코칭 시작 전인 경우</h2><p>담당자가 입금 여부와 서비스 시작 여부를 확인하고 취소·환불 절차를 안내합니다. 일정 변경만 원하시면 가능한 일정을 함께 조율할 수 있습니다.</p></section>
    <section><h2>코칭을 일부 진행한 경우</h2><p>진행한 회차·상담 시간·이미 제공된 분석과 피드백 등 실제 서비스 제공 범위를 확인합니다. 미제공 부분에 대한 환불 가능 여부와 산정 내역은 계약 내용 및 관련 법령에 따라 안내합니다.</p><p>프로그램별 세부 환불 조건과 일정 변경 기준은 서비스 시작 전 담당자와 확인해주세요. 이미 제공된 서비스와 아직 제공되지 않은 서비스는 구분하여 검토합니다.</p></section>
    <section><h2>확인과 처리</h2><p>신청자와 입금자가 다르면 실제 입금자 정보를 함께 확인합니다. 취소·환불 검토 결과와 후속 절차는 남겨주신 연락처 또는 카카오톡으로 안내합니다.</p><p>이 안내는 관련 법령에 따른 청약철회, 계약 해제·해지 또는 기타 소비자의 권리를 제한하지 않습니다. 서비스가 계약 내용과 다르게 제공되었거나 제공자 사유로 진행되지 못한 경우에도 해당 사유를 확인하여 처리합니다.</p></section>
    <p className={s.note}>문의: 카카오톡 ID inyeon_ · 010-7617-0181<br />내용 기준일: 2026년 10월 20일</p>
  </div></CoachingShell>;
}
