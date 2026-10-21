import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import EditorialMotion from "./EditorialMotion";
import v from "./visual.module.css";

// 사진 자리(figure)는 AI 인물 사진 대신 빗금으로 둔다 — 실제 사진이 준비되면 img를 다시 넣는다.
export function PhotoIntro({ eyebrow, title, description, imageCaption, anchorLabel = "자세히 살펴보기", children }: {
  eyebrow: string; title: ReactNode; description: ReactNode;
  imageCaption?: string; anchorLabel?: string; children?: ReactNode;
}) {
  return <section className={v.pageIntro}>
    <EditorialMotion />
    <div className={v.introGrid}>
      <div className={v.introCopy}>
        {children}<span className={v.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1><p>{description}</p>
        <div className={v.introActions}><a href="#coaching-content">{anchorLabel}<ArrowDown size={16}/></a><span>1:1 카카오톡 · 비밀 상담</span></div>
      </div>
      <figure className={v.introPhoto}>
        <span className={v.photoBadge}>PERSONAL COACHING</span>
        <figcaption><span>INYEON LAB</span><strong>{imageCaption ?? "나에게 맞는 관계의 방식."}</strong><ArrowUpRight size={27}/></figcaption>
      </figure>
    </div>
  </section>;
}

export function GuidePhoto({ caption }: { caption: string }) {
  return <figure className={v.guidePhoto} data-editorial-reveal><figcaption><span>HUMAN TO HUMAN</span><strong>{caption}</strong><ArrowUpRight size={23}/></figcaption></figure>;
}

export function ConversationExample({ question, answer }: { question: string; answer: string }) {
  return <div className={v.conversation} data-editorial-reveal>
    <div className={v.conversationPhoto}><span>내 상황으로 연습하는 코칭</span></div>
    <div className={v.conversationBody}><div className={v.conversationHead}><ChatCircleDots size={20}/><strong>이렇게 함께 살펴봅니다.</strong><span>대화 예시</span></div><p className={v.question}>{question}</p><p className={v.answer}>{answer}</p></div>
  </div>;
}
