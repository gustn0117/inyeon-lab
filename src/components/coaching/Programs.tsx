import Link from "next/link";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { DEFAULT_PROGRAMS, type Program, won } from "@/lib/coaching";
import s from "./coaching.module.css";
import v from "./visual.module.css";

export function ProgramCard({ program }: { program: Program }) {
  return <article className={`${s.programCard} ${v.imageCard} ${program.featured ? s.programFeatured : ""}`} data-featured={program.featured} data-editorial-reveal>
    <figure className={v.cardPhoto}><span>{String(DEFAULT_PROGRAMS.findIndex(p => p.id === program.id)+1).padStart(2,"0")}</span></figure>
    <div className={v.cardBody}>
    <span className={s.programBadge}>{program.featured ? <><Sparkle size={13} /> 실전 연습과 피드백</> : `${program.duration} · 1:1 카카오톡 코칭`}</span>
    <h3>{program.name}</h3><p className={s.programTagline}>{program.tagline}</p>
    <p className={s.price}>{won(program.price)}<small>/ {program.duration}</small></p>
    <ul className={s.featureList}>{program.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
    <div className={s.programActions}><Link href={`/checkout?program=${program.id}`} className={program.featured ? s.primary : s.secondary}>프로그램 신청 <ArrowUpRight size={15} /></Link><Link href={`/programs/${program.id}`} className={s.textButton} aria-label={`${program.name} 자세히 보기`}>어떤 코칭인지 자세히 보기</Link></div>
    </div>
  </article>;
}

export default function Programs({ programs }: { programs: Program[] | null }) {
  if (!programs) return <div role="status" className={s.notice}>프로그램 가격을 확인하고 있습니다. 잠시 후 새로고침하거나 카카오톡으로 문의해주세요.</div>;
  return <><p className={s.programGroupLabel}>지금의 고민부터 가볍게 · 단회 프로그램</p><div className={s.programGrid}>{programs.filter(p => ["consultation", "conversation", "diagnosis"].includes(p.id)).map(program => <ProgramCard program={program} key={program.id} />)}</div><p className={s.programGroupLabel}>변화를 직접 연습하는 · 집중 프로그램</p><div className={`${s.programGrid} ${s.programGridWide}`}>{programs.filter(p => ["intensive", "premium"].includes(p.id)).map(program => <ProgramCard program={program} key={program.id} />)}</div><p className={s.note}>표시 금액은 프로그램 전체 이용 금액입니다. 모든 코칭은 카카오톡 비대면 채팅으로 진행되며, 스타일링 제안은 희망자에 한해 프로그램당 1회 제공됩니다. 2주·4주 프로그램의 회차별 일정은 시작 전 조율합니다.</p></>;
}
