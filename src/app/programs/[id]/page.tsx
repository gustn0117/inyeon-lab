import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, LockKey } from "@phosphor-icons/react/dist/ssr";
import CoachingShell, { KakaoLink, PageIntro } from "@/components/coaching/CoachingShell";
import CoachingEvent from "@/components/coaching/CoachingEvent";
import { ConversationExample } from "@/components/coaching/CoachingVisual";
import DetailFooter from "@/components/coaching/DetailFooter";
import v from "@/components/coaching/visual.module.css";
import d from "@/components/coaching/service.module.css";
import { DEFAULT_PROGRAMS, won } from "@/lib/coaching";
import { type CoachingService, findService } from "@/lib/coaching-services";
import { getPrograms } from "@/lib/coaching-store";
import s from "@/components/coaching/coaching.module.css";

export const dynamic = "force-dynamic";
// 같은 코칭을 다루는 서비스 원고 — 추천 대상·도움 내용·예시를 서비스 상세와 똑같이 쓴다(서비스 하나면 예시도 서비스 원고).
// 연애 고민 상담 = 01, 연애 종합 코칭 = 07(1:1 종합 연애코칭), 연애코칭은 카톡 대화·썸·소개팅 세 서비스를 함께 다룬다.
// 2주·4주 코칭은 짝이 되는 서비스가 없으므로 다른 서비스 원고를 섞지 않고 아래 자체 문구만 쓴다.
const RELATED_SERVICES: Record<string, string[]> = { consultation: ["concern"], conversation: ["kakao-talk", "flirting", "first-date"], diagnosis: ["total"] };
const OWN_RECOMMEND: Record<string, string[]> = {
  intensive: ["조언을 듣는 데서 끝내지 않고 직접 연습해보고 싶은 분", "실제 대화와 만남에서 겪은 상황을 바로 피드백받고 싶은 분", "2주 동안 집중적으로 대화 습관을 바꿔보고 싶은 분"],
  premium: ["비슷한 연애 문제가 반복되어 습관부터 바꾸고 싶은 분", "관계가 시작될 때부터 가까워지는 과정까지 함께 점검받고 싶은 분", "4주 동안 충분한 연습과 피드백을 받고 싶은 분"],
};
const EXAMPLES: Record<string, [string, string]> = {
  conversation: ["밥 먹었어? 뭐 해? 대화가 늘 같은 질문으로 끝나요.", "실제 대화에서 상대가 답하기 어려웠던 부분을 찾고, 공통 관심사와 나의 이야기를 담아 대화를 이어가는 연습을 합니다."],
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
  const related = (RELATED_SERVICES[program.id] ?? []).map(id => findService(id)).filter((service): service is CoachingService => Boolean(service));
  const example: [string, string] = related.length === 1 ? [related[0].example.concern, related[0].example.answer] : EXAMPLES[program.id];
  // 서비스가 하나면 원고 목록 그대로, 여럿이면 서비스마다 대표 추천 대상 하나·도움 내용 두 가지씩, 없으면 자체 문구만
  const recommend = related.length === 1 ? related[0].recommend : related.length > 1 ? related.map(service => service.who) : OWN_RECOMMEND[program.id] ?? [];
  const helps = related.length === 1 ? related[0].helps : related.flatMap(service => service.helps.slice(0, 2));
  // 실전 코칭·피드백이 들어 있는 프로그램만 — 고민 상담·종합 코칭('실전에서의 개선 방향')은 연습이 아니라 방향을 제안한다.
  const practice = program.features.some(feature => /실전 (코칭|피드백)/.test(feature));
  return <CoachingShell>
    <PageIntro photo eyebrow={`PRIVATE COACHING · ${program.duration}`} title={program.name} description={<>{program.tagline}<span className={`${s.price} ${s.introPrice}`}>{won(program.price)}<small>/ {program.duration}</small></span></>} imageCaption="대화에서 시작해, 관계로 이어지도록."><nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/programs">코칭 프로그램</Link><span>/</span><span>{program.name}</span></nav></PageIntro>
    <section id="coaching-content" className={s.section}>
      <div className={`${s.container} ${s.detailGrid}`}>
        <div className={s.detailText}>
          <div className={s.detailBlock}><h2>지금의 고민을, 다음의 변화로.</h2><p className={s.keepLines}>{program.description}</p></div>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>IS THIS FOR YOU?</span><h2 className={d.blockTitle}>이런 분께 추천합니다.</h2>
            <p className={s.keepLines}>{program.audience}</p>
            {recommend.length > 0 && <ul className={s.featureList}>{recommend.map(item => <li key={item}>{item}</li>)}</ul>}
            <ConversationExample question={example[0]} answer={example[1]}/><p className={s.note}>코칭 이해를 돕기 위한 상황 예시이며, 개인의 상황과 프로그램 범위에 따라 진행 내용이 달라질 수 있습니다.</p>
          </div>
          {helps.length > 0 && <div className={s.detailBlock}>
            <span className={s.eyebrow}>HOW WE HELP</span><h2 className={d.blockTitle}>어떤 도움을 받을 수 있나요?</h2>
            <ol className={d.helpList}>{helps.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
            <div className={d.relatedLinks}>{related.map(service => <Link key={service.id} href={`/services/${service.id}`} className={d.relatedLink}>{service.name} 자세히 보기 <ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div>
          </div>}
          <div className={s.detailBlock}><h2>프로그램에 포함된 내용</h2><ul className={s.featureList}>{program.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
          {practice && <div className={s.detailBlock}><h2>소개팅 실전도 함께 연습합니다.</h2><figure className={v.scenePhoto} data-editorial-reveal><figcaption>첫 대화부터, 다음 만남의 제안까지.</figcaption></figure><p>만남에서 어떤 질문을 할지, 내 이야기를 어떻게 나눌지, 마음에 드는 상대에게 다음 만남을 어떻게 제안할지. 프로그램 범위 안에서 대화 방식과 호감 표현을 함께 점검합니다. 실제 소개팅 동행이 아닌, 만남 전 준비와 만남 후 피드백을 카카오톡으로 진행합니다.</p></div>}
          <div><h2>첫인상까지, 나를 잘 보여주도록.</h2><div className={v.stylePair} data-editorial-reveal><figure><figcaption>나에게 어울리는 스타일</figcaption></figure><figure><figcaption>자연스럽고 편안한 첫인상</figcaption></figure></div><p>본인 사진을 제공하시면 어울리는 헤어스타일, 패션·의상, 소개팅 복장과 이미지 개선 방향을 무료로 제안합니다. 사진 제출은 선택사항이며, 프로그램당 1회 제공됩니다.</p><p className={s.micro}><LockKey size={15} /> 사진과 상담 내용은 동의 없이 외부에 공개하지 않습니다.</p></div>
          <CoachingEvent />
        </div>
        <aside className={s.aside}><div className={s.asideCard}><span className={s.eyebrow}>YOUR COACHING</span><h2 style={{ marginTop: 15 }}>{program.name}</h2><p className={s.price}>{won(program.price)}<small>/ {program.duration}</small></p><p style={{ marginTop: 15 }}>1:1 카카오톡 비대면 채팅<br />신청 확인 후 일정 조율<br />사진 기반 스타일링 제안 1회 · 선택사항</p><Link href={`/checkout?program=${program.id}`} className={s.primary} style={{ width: "100%", marginTop: 25 }}>이 프로그램 신청하기 <ArrowUpRight size={16} /></Link><Link href="/apply" className={s.textButton} style={{ width: "100%", marginTop: 9 }}>선택 전 무료 상담받기</Link></div></aside>
      </div>
    </section>
    <DetailFooter noticeTitle="신청 전 확인해 주세요."><Link href="/refund" className={d.noticeLink}>취소 및 환불 안내 <ArrowUpRight size={14} aria-hidden="true" /></Link></DetailFooter>
  </CoachingShell>;
}
