import Link from "next/link";
import { COACHING_MATCH_EVENT } from "@/lib/coaching";
import s from "./event.module.css";

export default function CoachingEvent() {
  return <aside id="coaching-match-event" className={s.event} aria-labelledby="coaching-match-event-title">
    <div className={s.copy}>
    <div className={s.labels}><span className={s.badge}>SPECIAL EVENT</span><span className={s.optional}>선택 참여</span></div>
    <h3 id="coaching-match-event-title" className={s.title}>{COACHING_MATCH_EVENT.title}</h3>
    <p className={s.description}>{COACHING_MATCH_EVENT.description}</p>
    <Link href="/apply" className={s.link}>무료 상담으로 이벤트 문의하기 <span aria-hidden="true">↗</span></Link>
    </div>
    <figure className={s.photo}><figcaption><span>A NEW CONNECTION</span><b>새로운 인연의 가능성.</b></figcaption><span className={s.photoMark} aria-hidden="true">↗</span></figure>
  </aside>;
}
