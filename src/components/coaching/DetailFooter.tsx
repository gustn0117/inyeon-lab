import Link from "next/link";
import { ChatsCircle, Info, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { DETAIL_NOTICES, DETAIL_STEPS } from "@/lib/coaching-services";
import ChatButton from "./ChatButton";
import KakaoIdButton from "./KakaoIdButton";
import l from "./landing.module.css";
import d from "./service.module.css";

// 서비스·프로그램 상세 하단 공통: 진행 과정 → 확인 사항(본문 가장 아래) → 상담 신청
export default function DetailFooter({ noticeTitle = "상담 전 확인해 주세요.", children }: { noticeTitle?: string; children?: React.ReactNode }) {
  return <>
    <section className={`${l.section} ${l.sectionSoft}`} aria-labelledby="detail-process-title">
      <div className={l.container}>
        <div className={l.sectionHead}><span className={l.eyebrow}>HOW IT WORKS</span><h2 id="detail-process-title">상담은 어떻게 진행되나요?</h2></div>
        <ol className={l.stepGrid}>
          {DETAIL_STEPS.map((step, i) => <li key={step.title} className={l.stepCard}><span className={l.stepNumber}>STEP {String(i + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
      </div>
    </section>
    <section className={d.noticeSection} aria-labelledby="detail-notice-title">
      <div className={`${l.container} ${d.notice}`}>
        <h2 id="detail-notice-title"><Info size={22} weight="fill" aria-hidden="true" />{noticeTitle}</h2>
        <ul>{DETAIL_NOTICES.map(item => <li key={item}>{item}</li>)}</ul>
        {children}
      </div>
    </section>
    <section id="consultation" className={l.closing} aria-labelledby="detail-closing-title">
      <div className={l.closingCopy}>
        <span className={l.eyebrow}>YOUR STORY STARTS HERE</span>
        <h2 id="detail-closing-title">혼자 고민했던 연애,<br />이제는 함께 해결 방향을 찾아보세요.</h2>
        <p>신청서를 접수하거나 실시간 채팅으로 지금의 고민을 편하게 남겨주세요.</p>
        <div className={l.closingActions}>
          <Link href="/apply" className={l.lightButton}><NotePencil size={18} aria-hidden="true" /> 신청 접수하기</Link>
          <ChatButton className={l.outlineButton}><ChatsCircle size={18} aria-hidden="true" /> 실시간 채팅 상담</ChatButton>
          <KakaoIdButton className={l.outlineButton} />
        </div>
      </div>
    </section>
  </>;
}
