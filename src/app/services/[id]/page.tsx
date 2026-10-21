import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChatCircleDots, LockKey, Sparkle } from "@phosphor-icons/react/dist/ssr";
import CoachingShell, { KakaoLink, PageIntro } from "@/components/coaching/CoachingShell";
import s from "@/components/coaching/coaching.module.css";
import v from "@/components/coaching/visual.module.css";
import d from "@/components/coaching/service.module.css";
import { COACHING_SERVICES, findService } from "@/lib/coaching-services";

export const dynamicParams = false;

// 기존 '인연연구소만의 차이' 문구에서 가져온 공통 설명
const WHY = [
  { title: "나에게 맞춘 1:1 분석", text: "같은 고민이라도 사람마다 상황과 성향은 다릅니다. 남녀 상담사가 이야기를 충분히 듣고, 필요한 질문으로 고민을 함께 분석합니다." },
  { title: "현실을 아는 조언", text: "실제 소개팅 업체를 운영하며 다양한 남녀의 만남과 선호 조건, 관계가 형성되는 과정을 경험했습니다. 그 경험을 바탕으로 현실적인 방향을 제안합니다." },
  { title: "바로 실천할 수 있는 방법", text: "막연히 자신감을 가지라는 조언이 아닌, 실제 상황에서 사용할 수 있는 대화 예시와 행동 방법을 제안합니다." },
];

export function generateStaticParams() {
  return COACHING_SERVICES.map(service => ({ id: service.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const service = findService(params.id);
  if (!service) return {};
  return { title: `${service.name} | 인연연구소 연애코칭`, description: `${service.tagline} ${service.problem}` };
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = findService(params.id);
  if (!service) notFound();
  const others = COACHING_SERVICES.filter(item => item.id !== service.id);
  return <CoachingShell>
    <PageIntro eyebrow={`COACHING SERVICE ${service.number}`} title={service.name} description={`“${service.tagline}”`} image={`/inyeon-2026/${service.image}`} imagePosition={service.imagePosition}>
      <nav className={s.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/#services">연애코칭 서비스</Link><span>/</span><span>{service.name}</span></nav>
    </PageIntro>
    <section id="coaching-content" className={s.section}>
      <div className={`${s.container} ${s.detailGrid} ${d.grid}`}>
        <div className={s.detailText}>
          <div className={s.detailBlock}><span className={s.eyebrow}>WHAT WE SOLVE</span><h2 className={d.blockTitle}>이런 고민을 해결해요</h2><p>{service.problem}</p></div>
          <div className={s.detailBlock}>
            <span className={s.eyebrow}>HOW WE HELP</span><h2 className={d.blockTitle}>이렇게 도와드려요</h2><p>{service.help}</p>
            {service.perk && <p className={d.perk}><Sparkle size={16} weight="fill" aria-hidden="true" />{service.perk}</p>}
            {service.id === "styling" && <div className={v.stylePair}><figure><img src="/inyeon-2026/male-01-v4.webp" alt="" loading="lazy" decoding="async" /><figcaption>나에게 어울리는 스타일</figcaption></figure><figure><img src="/inyeon-2026/female-02-v4.webp" alt="" loading="lazy" decoding="async" /><figcaption>자연스럽고 편안한 첫인상</figcaption></figure></div>}
          </div>
          <div className={s.detailBlock}><span className={s.eyebrow}>FOR YOU</span><h2 className={d.blockTitle}>이런 분께 추천해요</h2><ul className={s.featureList}>{service.recommend.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><span className={s.eyebrow}>WHY COACHING</span><h2 className={d.blockTitle}>왜 1:1 코칭이 필요할까요?</h2>
            <ol className={d.whyList}>{WHY.map((item, i) => <li key={item.title}><span>{String(i + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><p>{item.text}</p></div></li>)}</ol>
          </div>
        </div>
        <aside className={`${s.aside} ${d.aside}`}>
          <div className={s.asideCard}>
            <span className={s.eyebrow}>START COACHING</span><h2 className={d.blockTitle}>{service.name}</h2>
            <p className={d.asideText}>모든 상담은 1:1 카카오톡 비대면으로 진행합니다. 지금의 고민을 남겨주시면 상황에 맞는 프로그램을 안내해드립니다.</p>
            <div className={d.asideActions}>
              <KakaoLink className={s.primary}>카카오톡 상담 신청 <ChatCircleDots size={17} weight="fill" /></KakaoLink>
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
  </CoachingShell>;
}
