import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import EditorialMotion from "./EditorialMotion";
import v from "./visual.module.css";

export function PhotoIntro({ eyebrow, title, description, image, imagePosition, imageCaption, anchorLabel = "자세히 살펴보기", children }: {
  eyebrow: string; title: ReactNode; description: ReactNode; image: string; imagePosition?: string;
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
        <img src={image} alt="" decoding="async" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
        <span className={v.photoBadge}>PERSONAL COACHING</span>
        <figcaption><span>INYEON LAB</span><strong>{imageCaption ?? "나에게 맞는 관계의 방식."}</strong><ArrowUpRight size={27}/></figcaption>
      </figure>
    </div>
  </section>;
}

export function GuidePhoto({ image, caption }: { image: string; caption: string }) {
  return <figure className={v.guidePhoto} data-editorial-reveal><img src={image} alt="" loading="lazy" decoding="async"/><figcaption><span>HUMAN TO HUMAN</span><strong>{caption}</strong><ArrowUpRight size={23}/></figcaption></figure>;
}

export function ConversationExample({ question, answer, image }: { question: string; answer: string; image: string }) {
  return <div className={v.conversation} data-editorial-reveal>
    <div className={v.conversationPhoto}><img src={image} alt="" loading="lazy" decoding="async"/><span>내 상황으로 연습하는 코칭</span></div>
    <div className={v.conversationBody}><div className={v.conversationHead}><ChatCircleDots size={20}/><strong>이렇게 함께 살펴봅니다.</strong><span>대화 예시</span></div><p className={v.question}>{question}</p><p className={v.answer}>{answer}</p></div>
  </div>;
}
