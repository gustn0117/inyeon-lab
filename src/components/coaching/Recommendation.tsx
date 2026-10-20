"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Compass } from "@phosphor-icons/react";
import { CONCERNS, type Program, won } from "@/lib/coaching";
import s from "./coaching.module.css";

export default function Recommendation({ programs }: { programs: Program[] | null }) {
  const [selected, setSelected] = useState(0);
  const concern = CONCERNS[selected];
  const program = programs?.find(p => p.id === concern.program);
  const free = concern.program === "free";
  return <div className={s.recommendLayout}>
    <div className={s.choices} role="group" aria-label="현재 가장 가까운 고민 선택">{CONCERNS.map((item, index) => <button type="button" key={item.id} className={`${s.choice} ${selected === index ? s.choiceActive : ""}`} aria-pressed={selected === index} aria-controls="recommendation-result" onClick={() => setSelected(index)}>{item.label}{selected === index ? <Check size={18} /> : <ArrowRight size={16} />}</button>)}</div>
    <div id="recommendation-result" className={s.recommendResult} aria-live="polite" aria-atomic="true"><span className={s.resultIcon}><Compass size={26} weight="light" /></span><span className={s.eyebrow}>YOUR NEXT STEP</span><h3>{free ? "무료 첫인상 진단" : program?.name ?? "맞춤 프로그램 상담"}</h3><p>{concern.reason}</p>{free ? <p className={s.price}>무료<small>사진 기반 카카오톡 피드백</small></p> : program ? <p className={s.price}>{won(program.price)}<small>/ {program.duration}</small></p> : <p className={s.note}>프로그램 정보를 확인할 수 없어 무료 상담으로 안내해드립니다.</p>}<div className={s.actions}><Link className={s.primary} href={free ? "/apply?kind=impression" : program ? `/programs/${program.id}` : "/apply"}>{free ? "무료 첫인상 진단 신청" : program ? "추천 프로그램 자세히 보기" : "무료 상담 신청"}<ArrowRight size={16} /></Link></div><p className={s.note}>선택한 고민을 바탕으로 한 안내입니다. 무료 상담으로 함께 결정하셔도 괜찮아요.</p></div>
  </div>;
}
