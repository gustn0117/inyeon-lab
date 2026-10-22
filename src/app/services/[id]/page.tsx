import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, ChatCircleDots, ChatsCircle, LockKey, Sparkle } from "@phosphor-icons/react/dist/ssr";
import CoachingShell, { KakaoLink, PageIntro } from "@/components/coaching/CoachingShell";
import ChatButton from "@/components/coaching/ChatButton";
import CoachingEvent from "@/components/coaching/CoachingEvent";
import DetailFooter from "@/components/coaching/DetailFooter";
import s from "@/components/coaching/coaching.module.css";
import v from "@/components/coaching/visual.module.css";
import d from "@/components/coaching/service.module.css";
import { COACHING_SERVICES, findService } from "@/lib/coaching-services";

export const dynamicParams = false;

export function generateStaticParams() {
  return COACHING_SERVICES.map(service => ({ id: service.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const service = findService(params.id);
  if (!service) return {};
  return { title: `${service.name} | 인연연구소 연애코칭`, description: `${service.headline} ${service.why[service.why.length - 1]}` };
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = findService(params.id);
  if (!service) notFound();
  const others = COACHING_SERVICES.filter(item => item.id !== service.id);
  return <CoachingShell>
    <PageIntro photo eyebrow={`COACHING SERVICE ${service.number}`} title={service.name} description={`“${service.headline}”`}>
      <nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/#services">연애코칭 서비스</Link><span>/</span><span>{service.name}</span></nav>
    </PageIntro>
    <section id="coaching-content" className={s.section}>
      <div className={`${s.container} ${s.detailGrid} ${d.grid}`}>
        <div className={s.detailText}>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>DO YOU RELATE?</span><h2 className={d.blockTitle}>이런 고민을 하고 계신가요?</h2>
            <ul className={d.concernList}>{service.concerns.map(item => <li key={item}>“{item}”</li>)}</ul>
          </div>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>WHY</span><h2 className={d.blockTitle}>{service.whyTitle}</h2>
            <div className={d.why}>{service.why.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>HOW WE HELP</span><h2 className={d.blockTitle}>어떤 도움을 받을 수 있나요?</h2>
            <ol className={d.helpList}>{service.helps.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
            {service.perk && <p className={d.perk}><Sparkle size={16} weight="fill" aria-hidden="true" />{service.perk}</p>}
            {service.id === "styling" && <div className={v.stylePair}><figure><figcaption>나에게 어울리는 스타일</figcaption></figure><figure><figcaption>자연스럽고 편안한 첫인상</figcaption></figure></div>}
          </div>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>EXAMPLE</span><h2 className={d.blockTitle}>{service.example.label}</h2>
            <div className={d.example}>
              <div className={d.exampleConcern}><span>고민</span><p>“{service.example.concern}”</p></div>
              <div className={d.exampleArrow} aria-hidden="true"><ArrowDown size={16} /></div>
              <div className={d.exampleAnswer}><span>{service.example.answerLabel}</span><p>{service.example.answer}</p></div>
            </div>
            <p className={d.exampleNote}>※ 실제 상담 사례가 아닌 서비스 이해를 돕기 위한 가상 예시입니다.</p>
          </div>
          <div>
            <span className={s.eyebrow}>FOR YOU</span><h2 className={d.blockTitle}>이런 분께 추천합니다.</h2>
            <ul className={s.featureList}>{service.recommend.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <CoachingEvent />
        </div>
        <aside className={`${s.aside} ${d.aside}`}>
          <div className={s.asideCard}>
            <span className={s.eyebrow}>START COACHING</span><h2 className={d.blockTitle}>{service.name}</h2>
            <p className={d.asideText}>모든 상담은 1:1 카카오톡 비대면으로 진행합니다. 지금의 고민을 남겨주시면 상황에 맞는 프로그램을 안내해드립니다.</p>
            <div className={d.asideActions}>
              <KakaoLink className={s.primary}>카카오톡 상담 신청 <ChatCircleDots size={17} weight="fill" /></KakaoLink>
              <ChatButton className={s.secondary}>실시간 채팅 상담 <ChatsCircle size={16} aria-hidden="true" /></ChatButton>
              <Link href="/#pricing" className={s.secondary}>프로그램·가격 보기 <ArrowUpRight size={15} /></Link>
              <Link href="/apply" className={s.textButton}>무료 상담 신청서 작성</Link>
            </div>
            <p className={s.micro}><LockKey size={15} /> 상담 내용은 동의 없이 외부에 공개하지 않습니다.</p>
          </div>
          <nav className={s.asideCard} aria-label="다른 코칭 서비스">
            <h3 className={d.otherTitle}>다른 코칭 서비스</h3>
            <ul className={d.otherList}>{others.map(item => <li key={item.id}><Link href={`/services/${item.id}`}><span>{item.number}</span>{item.name}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ul>
          </nav>
        </aside>
      </div>
    </section>
    <DetailFooter />
  </CoachingShell>;
}
