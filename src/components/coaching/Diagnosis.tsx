"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { calculateDiagnosis, DIMENSIONS, QUIZ_QUESTIONS, type Program, won } from "@/lib/coaching";
import { trackCoachingEvent } from "@/lib/analytics";
import s from "./coaching.module.css";
import v from "./visual.module.css";

export default function Diagnosis({ programs }: { programs: Program[] | null }) {
  const [answers, setAnswers] = useState<(number | undefined)[]>(Array(QUIZ_QUESTIONS.length).fill(undefined));
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const focusPanel = () => requestAnimationFrame(() => panel.current?.focus());
  const next = () => {
    if (answers[step] === undefined) return;
    if (step === QUIZ_QUESTIONS.length - 1) { setFinished(true); trackCoachingEvent("CompleteRegistration", { content_name: "relationship_self_check" }); }
    else setStep(step + 1);
    focusPanel();
  };
  const restart = () => { setAnswers(Array(QUIZ_QUESTIONS.length).fill(undefined)); setStep(0); setFinished(false); focusPanel(); };
  const result = finished ? calculateDiagnosis(answers as number[]) : null;
  const program = result ? programs?.find(p => p.id === result.programId) : null;
  return <div className={s.quizWrap}><div className={s.quizCard} ref={panel} tabIndex={-1}>
    {result ? <div className={s.quizResult}>
      <span className={s.eyebrow}><CheckCircle size={17} /> 나의 연애 자가점검 결과</span>
      <h2>{result.comfortable ? "기본기를 쌓아가는 안정형" : DIMENSIONS[result.focus].type}</h2>
      <p>{result.comfortable ? "여러 상황에서 비교적 편안하게 소통하고 있다고 답하셨어요. 지금의 강점을 이어가면서, 구체적으로 고민되는 상황이 있다면 함께 정리해보세요." : `현재 답변에서는 ‘${DIMENSIONS[result.focus].name}’ 영역의 어려움이 상대적으로 크게 나타났어요. 부족한 사람이라는 뜻이 아니라, 먼저 연습해볼 부분을 찾는 과정입니다.`}</p>
      <div className={s.scoreList} aria-label="영역별 내가 느끼는 어려움">{result.domains.map(domain => <div className={s.scoreRow} key={domain.key}><span>{DIMENSIONS[domain.key].name}</span><span className={s.scoreTrack} role="meter" aria-label={`${DIMENSIONS[domain.key].name} 어려움 정도`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(domain.score * 100)}><span className={s.scoreFill} style={{ width: `${domain.score * 100}%` }} /></span><small>{domain.score >= .67 ? "먼저 연습" : domain.score >= .34 ? "함께 점검" : "편안한 편"}</small></div>)}</div>
      <div className={s.notice}><strong>오늘부터 해볼 수 있는 작은 연습</strong><br />{DIMENSIONS[result.focus].tip}</div>
      <div className={s.quizRecommend}><span className={v.quizPhoto} aria-hidden="true"/><span className={s.eyebrow}>RECOMMENDED FOR YOU</span><h3>{program?.name ?? "무료 상담으로 방향 찾기"}</h3><p>{program?.tagline ?? "진단 결과와 함께 현재 고민을 남겨주시면 적합한 코칭을 안내해드립니다."}</p>{program && <p className={s.price} style={{ marginTop: 14 }}>{won(program.price)}<small>/ {program.duration}</small></p>}<div className={s.actions}>{program && <Link href={`/programs/${program.id}`} className={s.primary}>추천 프로그램 보기 <ArrowRight size={16} /></Link>}<Link href="/apply" className={s.secondary}>무료 상담 먼저 받기</Link></div></div>
      <p className={s.note}>이 결과는 답변에 기반한 참고용 자가점검입니다. 전문적인 심리검사나 의학적 진단이 아니며, 개인의 연애 성향 전체를 판단하지 않습니다. 응답 내용은 서버에 저장하지 않습니다.</p><button type="button" className={s.textButton} onClick={restart} style={{ marginTop: 15 }}>처음부터 다시 해보기</button>
    </div> : <>
      <div className={s.quizProgress}><span>QUESTION {String(step + 1).padStart(2, "0")} / 10</span><progress value={step + 1} max={10} aria-label="자가진단 진행률" /></div>
      <fieldset className={s.quizQuestion} key={step}><legend>{QUIZ_QUESTIONS[step].text}</legend><div className={s.quizOptions}>{["그렇지 않아요", "가끔 그래요", "자주 그래요"].map((label, value) => <label className={s.quizOption} key={value}><input type="radio" name={`question-${step}`} value={value} checked={answers[step] === value} onChange={() => setAnswers(current => current.map((answer, index) => index === step ? value : answer))} />{label}</label>)}</div></fieldset>
      <div className={s.quizControls}><button type="button" className={s.secondary} disabled={step === 0} onClick={() => { setStep(step - 1); focusPanel(); }}><ArrowLeft size={16} /> 이전</button><button type="button" className={s.primary} disabled={answers[step] === undefined} onClick={next}>{step === QUIZ_QUESTIONS.length - 1 ? "내 결과 확인하기" : "다음 질문"}<ArrowRight size={16} /></button></div>
    </>}
  </div><p className={s.note}>총 10문항 · 약 2분 · 이름이나 연락처 없이 무료로 확인할 수 있습니다.<br />정답은 없습니다. 지금의 나와 가장 가까운 답을 골라주세요.</p></div>;
}
