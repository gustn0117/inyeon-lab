import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, LockKey } from "@phosphor-icons/react/dist/ssr";
import CoachingShell, { KakaoLink, PageIntro } from "@/components/coaching/CoachingShell";
import CoachingEvent from "@/components/coaching/CoachingEvent";
import { ConversationExample } from "@/components/coaching/CoachingVisual";
import v from "@/components/coaching/visual.module.css";
import { DEFAULT_PROGRAMS, PROGRAM_IMAGES, won } from "@/lib/coaching";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const dynamic = "force-dynamic";
const EXAMPLES: Record<string, [string, string]> = {
  consultation: ["답장이 늦어졌는데, 한 번 더 연락해도 될까요?", "연락이 오간 맥락과 내가 원하는 관계를 먼저 정리하고, 다음 연락의 시점과 표현을 함께 살펴봅니다."],
  conversation: ["밥 먹었어? 뭐 해? 대화가 늘 같은 질문으로 끝나요.", "실제 대화에서 상대가 답하기 어려웠던 부분을 찾고, 공통 관심사와 나의 이야기를 담아 대화를 이어가는 연습을 합니다."],
  diagnosis: ["소개팅에서는 분위기가 괜찮았는데, 그다음으로 잘 이어지지 않아요.", "첫 만남의 대화 방식, 호감을 전한 순간, 이후의 연락 흐름을 함께 점검해 나에게 필요한 변화의 순서를 정합니다."],
  intensive: ["이번 주 소개팅을 앞두고 있어요. 만남 전부터 피드백받고 싶어요.", "첫 대화와 질문, 만남 제안을 준비하고 실제 만남 후 이야기를 돌아봅니다. 잘된 부분과 개선할 부분을 다음 대화에 적용합니다."],
  premium: ["좋아질수록 불안해지고, 비슷한 이유로 다투는 일이 반복돼요.", "관계에서 자주 반복되는 반응과 표현을 살피고, 내 마음을 차분하게 전하는 연습을 과제로 이어갑니다. 4주간 실천과 변화를 함께 점검합니다."],
};
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = (await getPrograms().catch(() => DEFAULT_PROGRAMS)).find(p => p.id === params.id);
  return { title: p ? `${p.name} | 인연연구소` : "프로그램 | 인연연구소", description: p?.description };
}
export default async function ProgramPage({ params }: { params: { id: string } }) {
  if (!DEFAULT_PROGRAMS.some(p => p.id === params.id)) notFound();
  const program = (await getPrograms().catch(() => null))?.find(p => p.id === params.id);
  if (!program) return <CoachingShell><section id="coaching-content" className={s.section}><div className={s.narrow}><h1 className={s.formTitle}>프로그램 정보를 확인하고 있습니다.</h1><p className={s.formHint}>잠시 후 다시 시도하거나 카카오톡으로 문의해주세요.</p><KakaoLink /></div></section></CoachingShell>;
  const example = EXAMPLES[program.id];
  return <CoachingShell><PageIntro eyebrow={`PRIVATE COACHING · ${program.duration}`} title={program.name} description={program.tagline} image={`/inyeon-2026/${PROGRAM_IMAGES[program.id]}`} imageCaption="대화에서 시작해, 관계로 이어지도록."><nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/programs">코칭 프로그램</Link><span>/</span><span>{program.name}</span></nav></PageIntro><section id="coaching-content" className={s.section}><div className={`${s.container} ${s.detailGrid}`}><div className={s.detailText}><div className={s.detailBlock}><h2>지금의 고민을, 다음의 변화로.</h2><p>{program.description}</p></div><div className={s.detailBlock}><span className={s.eyebrow}>IS THIS FOR YOU?</span><h2 style={{ marginTop: 15 }}>이런 분께 권해드려요.</h2><p>{program.audience}</p><ConversationExample question={example[0]} answer={example[1]} image={`/inyeon-2026/${PROGRAM_IMAGES[program.id]}`}/><p className={s.note}>코칭 이해를 돕기 위한 상황 예시이며, 개인의 상황과 프로그램 범위에 따라 진행 내용이 달라질 수 있습니다.</p></div><div className={s.detailBlock}><h2>프로그램에 포함된 내용</h2><ul className={s.featureList}>{program.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div><div className={s.detailBlock}><h2>소개팅 실전도 함께 연습합니다.</h2><figure className={v.scenePhoto} data-editorial-reveal><img src="/inyeon-2026/process-04-v2.webp" alt="" loading="lazy" decoding="async"/><figcaption>말투부터, 다음 만남의 제안까지.</figcaption></figure><p>만남에서 어떤 질문을 할지, 내 이야기를 어떻게 나눌지, 마음에 드는 상대에게 다음 만남을 어떻게 제안할지. 프로그램 범위 안에서 말투와 대화 방식, 호감 표현을 함께 점검합니다. 실제 소개팅 동행이 아닌, 만남 전 준비와 만남 후 피드백을 카카오톡으로 진행합니다.</p></div><div><h2>첫인상까지, 나를 잘 보여주도록.</h2><div className={v.stylePair} data-editorial-reveal><figure><img src="/inyeon-2026/male-01-v4.webp" alt="" loading="lazy" decoding="async"/><figcaption>나에게 어울리는 스타일</figcaption></figure><figure><img src="/inyeon-2026/female-01-v4.webp" alt="" loading="lazy" decoding="async"/><figcaption>자연스럽고 편안한 첫인상</figcaption></figure></div><p>본인 사진을 제공하시면 어울리는 헤어스타일, 패션·의상, 소개팅 복장과 이미지 개선 방향을 무료로 제안합니다. 사진 제출은 선택사항이며, 프로그램당 1회 제공됩니다.</p><p className={s.micro}><LockKey size={15} /> 사진과 상담 내용은 동의 없이 외부에 공개하지 않습니다.</p></div><CoachingEvent /></div><aside className={s.aside}><div className={s.asideCard}><span className={s.eyebrow}>YOUR COACHING</span><h2 style={{ marginTop: 15 }}>{program.name}</h2><p className={s.price}>{won(program.price)}<small>/ {program.duration}</small></p><p style={{ marginTop: 15 }}>1:1 카카오톡 비대면 채팅<br />계좌이체 · 입금 확인 후 일정 조율<br />스타일링 제안 1회 포함 · 희망자</p><Link href={`/checkout?program=${program.id}`} className={s.primary} style={{ width: "100%", marginTop: 25 }}>이 프로그램 신청하기 <ArrowUpRight size={16} /></Link><Link href="/apply" className={s.textButton} style={{ width: "100%", marginTop: 9 }}>선택 전 무료 상담받기</Link></div><div className={s.asideCard}><h3>신청 전 확인해주세요.</h3><p>연애 성공이나 상대의 반응을 보장하지 않습니다. 개인의 실천과 상황에 따라 변화의 정도가 달라질 수 있습니다.</p><Link href="/refund" className={s.textButton} style={{ fontSize: 12 }}>취소 및 환불 안내</Link></div></aside></div></section></CoachingShell>;
}
