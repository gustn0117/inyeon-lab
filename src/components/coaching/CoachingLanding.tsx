import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChatCircleDots, ChatsCircle, Check, ClipboardText, Heart, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { MATCH_GUIDE, MATCH_PRICE, type Program, won } from "@/lib/coaching";
import { COACHING_SERVICES } from "@/lib/coaching-services";
import { KAKAO_ID } from "@/lib/contact";
import ChatButton from "./ChatButton";
import KakaoIdButton from "./KakaoIdButton";
import { SERVICE_ICONS } from "./serviceIcons";
import CoachingHero from "./CoachingHero";
import EditorialMotion from "./EditorialMotion";
import l from "./landing.module.css";

// 첫 화면 바로 아래: 상담을 시작하는 방법(채팅·신청서·카카오톡 ID)과 무료 진단을 한눈에
const START: { title: string; text: string; cta: string; icon: Icon; href?: string; action?: "chat" | "kakao" }[] = [
  { title: "실시간 채팅 상담", text: "사이트에서 바로 궁금한 점을 남기면 상담사가 확인 후 답변드려요.", cta: "채팅 열기", icon: ChatsCircle, action: "chat" },
  { title: "무료 상담 신청서", text: "어떤 코칭이 좋을지, 현재 상황부터 함께 정리해요.", cta: "신청 접수하기", icon: NotePencil, href: "/apply" },
  { title: "카카오톡 ID 문의", text: `카카오톡에서 ID ${KAKAO_ID}을 친구 추가한 뒤 편하게 문의하세요.`, cta: "ID 복사하기", icon: ChatCircleDots, action: "kakao" },
  { title: "무료 연애 자가진단", text: "10문항으로 나의 연애 성향과 필요한 연습을 알아보세요.", cta: "진단 시작", icon: ClipboardText, href: "/diagnosis" },
  { title: "소개팅 신청", text: "사진과 간단한 정보를 남기면 사전 상담 후 결이 맞는 분을 제안해드려요.", cta: "소개팅 신청", icon: Heart, href: "/apply?kind=impression" },
];

// 인연연구소는 어떤 곳인가요? — 운영자 제공 '인연연구소만의 차이' 원문
const DIFFERENCES = [
  { label: "현실을 아는 조언", title: "실제 소개팅 운영 경험을 바탕으로 한 코칭", text: "다양한 남녀의 선호 조건과 소개팅 과정에서 나타나는 반응을 접한 경험을 바탕으로 현실적인 조언을 제공합니다." },
  { label: "나에게 맞는 방향", title: "남녀 상담사의 체계적인 1:1 맞춤 상담", text: "같은 고민이라도 사람마다 상황과 성향은 다릅니다. 남녀 상담사가 고객님의 이야기를 충분히 듣고, 필요한 질문으로 고민을 분석해 개인에게 맞는 실천 방향을 제안합니다." },
  { label: "대화의 디테일", title: "실제 카카오톡 대화 분석 및 교정", text: "이성과 나눈 대화를 함께 살펴보고 어색한 표현, 대화 습관, 호감 표현 등을 분석하여 자연스러운 대화 방법을 제안합니다." },
  { label: "질문하고 답하는 시간", title: "실시간으로 소통하는 연애코칭", text: "일방적인 분석 결과만 전달하는 것이 아니라, 카카오톡으로 직접 대화하며 궁금한 점을 질문하고 답변받을 수 있습니다." },
  { label: "따뜻하고 솔직하게", title: "공감과 현실적인 조언의 균형", text: "무조건 고객님의 편을 들거나 듣기 좋은 말만 하지 않습니다. 개선이 필요한 부분은 솔직하게 안내하되, 고객님의 감정과 입장을 존중합니다." },
  { label: "일상에서 실천하기", title: "실천할 수 있는 구체적인 솔루션", text: "막연히 자신감을 가지라는 조언이 아닌, 실제 상황에서 사용할 수 있는 대화 예시와 행동 방법을 제안합니다." },
];

const CONCERNS = [
  { text: "소개팅만 하면 다음 만남으로 이어지지 않아요.", service: "first-date" },
  { text: "관심 있는 사람에게 어떻게 다가가야 할지 모르겠어요.", service: "flirting" },
  { text: "카카오톡 대화가 자꾸 끊겨요.", service: "kakao-talk" },
  { text: "연애할 때마다 비슷한 문제로 갈등이 생겨요.", service: "love-pattern" },
  { text: "이성과 대화하는 것이 어렵고 자신감이 없어요.", service: "total" },
  { text: "나에게 어울리는 스타일을 모르겠어요.", service: "styling" },
];

const EXAMPLES = [
  { category: "카카오톡 대화 코칭", service: "kakao-talk", concern: "상대방이 계속 단답으로 답하는데 어떻게 해야 할까요?", coaching: "실제 대화 흐름을 살펴보고 질문 방식이나 표현을 개선할 수 있도록 구체적인 답장 예시를 제안합니다." },
  { category: "소개팅 코칭", service: "first-date", concern: "소개팅은 여러 번 했는데 항상 다음 만남으로 이어지지 않아요.", coaching: "대화 방식, 첫인상, 만남 이후 연락 습관 등을 점검하고 개선 방향을 제안합니다." },
];

const STEPS = [
  { title: "상담 신청", text: "원하는 서비스와 고민을 선택합니다." },
  { title: "고민 및 상황 전달", text: "카카오톡으로 현재 상황과 고민을 전달합니다." },
  { title: "1:1 맞춤형 코칭", text: "상황을 분석하고 구체적인 조언과 개선 방향을 안내합니다." },
  { title: "피드백 및 마무리", text: "상담 내용을 정리하고 실생활에서 적용할 수 있는 방법을 안내합니다." },
];

const FAQS = [
  { question: "연애 경험이 없어도 상담받을 수 있나요?", answer: "네. 연애 경험의 유무와 관계없이 지금 상황에 맞춰 진행합니다. 이성과 대화를 시작하는 방법, 나를 자연스럽게 표현하는 방법처럼 필요한 부분부터 차근차근 함께 연습합니다." },
  { question: "모든 상담은 카카오톡으로 진행되나요?", answer: "네. 모든 상담과 코칭은 카카오톡 1:1 비대면으로 진행됩니다. 직접 만나지 않아도 되어 지역과 관계없이 편하게 이용하실 수 있고, 일정은 신청 확인 후 개별로 안내드립니다." },
  { question: "카카오톡 대화 내용을 보내도 되나요?", answer: "네. 실제 대화를 함께 살펴보면 더 구체적인 코칭이 가능합니다. 캡처를 보내실 때는 상대방의 이름, 프로필 사진, 연락처처럼 상대를 알아볼 수 있는 정보는 가려주세요. 보내주신 내용은 상담에만 사용하며 동의 없이 외부에 공개하지 않습니다." },
  { question: "상담은 얼마나 진행되나요?", answer: "프로그램마다 상담 시간과 횟수가 다릅니다. 한 번에 고민을 정리하는 단회 상담부터 여러 회차에 걸쳐 연습하는 집중 코칭까지 있으니, 위의 프로그램 및 가격 안내에서 비교해보세요." },
  { question: "어떤 프로그램을 선택해야 할지 모르겠어요.", answer: "카카오톡으로 지금의 고민을 편하게 말씀해주세요. 상황을 듣고 맞는 프로그램을 안내해드립니다. 무료 연애 자가진단이나 무료 상담 신청서로 먼저 시작하셔도 됩니다." },
  { question: "스타일링 제안은 정말 무료인가요?", answer: "네. 사진을 보내주시면 어울리는 헤어스타일과 옷차림 등 기본 스타일링 방향을 무료로 제안해드립니다. 사진 제출은 선택사항이며, 보내주신 사진은 동의 없이 공개하지 않습니다." },
  { question: "상담 후 추가 질문도 가능한가요?", answer: "상담 시간, 답변 횟수와 추가 질문 가능 범위는 선택하신 프로그램에 따라 다릅니다. 신청 전 카카오톡이나 실시간 채팅으로 문의하시면 프로그램별로 자세히 안내해드립니다." },
  { question: "재회 상담도 진행하나요?", answer: "재회 상담은 진행하지 않습니다. 지난 연애에서 반복된 문제를 돌아보고 다음 관계를 준비하고 싶으시다면, '연애 성향·문제점 분석'으로 앞으로의 방향을 함께 정리해드립니다." },
];

// 서비스 카드 아래 넓은 카드로 따로 보여 주는 서비스와 그 표시 문구 (07 종합 연애코칭, 08 소개팅 주선)
const WIDE_SERVICES: Record<string, string> = { total: "여러 고민을 함께", matching: "결이 맞는 인연" };

const serviceName = (id: string) => COACHING_SERVICES.find(service => service.id === id)?.name ?? "";

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return <div className={l.sectionHead} data-editorial-reveal><span className={l.eyebrow}>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function ApplyButton({ className }: { className: string }) {
  return <Link href="/apply" className={className}><NotePencil size={18} aria-hidden="true" /> 신청 접수하기</Link>;
}

function Pricing({ programs }: { programs: Program[] | null }) {
  if (!programs?.length) return <div className={l.priceFallback} role="status"><p>프로그램 정보를 불러오지 못했습니다. 신청서를 남겨주시면 바로 안내해드립니다.</p><ApplyButton className={l.darkButton} /></div>;
  return <>
    <div className={l.priceTable}>
      <div className={l.priceHead} aria-hidden="true"><span>프로그램</span><span>이용 가격</span><span>진행 방식</span><span>제공 코칭 내용</span><span>상담 시간·횟수</span><span /></div>
      {programs.map(program => <article key={program.id} className={`${l.priceRow} ${program.featured ? l.priceFeatured : ""}`} aria-labelledby={`price-${program.id}`} data-editorial-reveal>
        <div className={l.priceName}>{program.featured && <span className={l.priceBadge}>추천</span>}<h3 id={`price-${program.id}`}>{program.name}</h3><p>{program.tagline}</p></div>
        <dl className={l.priceFacts}>
          <div><dt>이용 가격</dt><dd className={l.priceAmount}>{won(program.price)}</dd></div>
          <div><dt>진행 방식</dt><dd>1:1 카카오톡 비대면</dd></div>
          <div className={l.priceContent}><dt>제공 코칭 내용</dt><dd><ul>{program.features.map(feature => <li key={feature}><Check size={13} weight="bold" aria-hidden="true" />{feature}</li>)}</ul></dd></div>
          <div><dt>상담 시간·횟수</dt><dd>{program.duration}</dd></div>
        </dl>
        <div className={l.priceActions}><Link href={`/checkout?program=${program.id}`} className={l.priceApply} aria-label={`${program.name} 신청하기`}>신청하기</Link><Link href={`/programs/${program.id}`} className={l.priceMore} aria-label={`${program.name} 자세히 보기`}>자세히 보기</Link></div>
      </article>)}
    </div>
    <p className={l.footnote}>표시 금액은 프로그램 전체 이용 금액입니다. 사진 기반 기본 스타일링 제안은 선택사항이며, 희망하시는 분께 무료로 제공합니다.</p>
  </>;
}

// 코칭 프로그램과 따로 보여 주는 소개팅 — 사전 상담이 먼저라 결제가 아니라 소개팅 신청서로 보낸다.
function MatchPricing() {
  return <div className={`${l.priceTable} ${l.priceTableMatch}`}>
    <div className={l.priceHead} aria-hidden="true"><span>소개팅</span><span>이용 가격</span><span>진행 방식</span><span>제공 내용</span><span>횟수</span><span /></div>
    <article className={l.priceRow} aria-labelledby="price-match" data-editorial-reveal>
      <div className={l.priceName}><h3 id="price-match">{MATCH_GUIDE.name}</h3><p>{MATCH_GUIDE.tagline}</p></div>
      <dl className={l.priceFacts}>
        <div><dt>이용 가격</dt><dd className={l.priceAmount}>{won(MATCH_PRICE)}</dd></div>
        <div><dt>진행 방식</dt><dd>{MATCH_GUIDE.method}</dd></div>
        <div className={l.priceContent}><dt>제공 내용</dt><dd><ul>{MATCH_GUIDE.features.map(feature => <li key={feature}><Check size={13} weight="bold" aria-hidden="true" />{feature}</li>)}</ul></dd></div>
        <div><dt>횟수</dt><dd>{MATCH_GUIDE.count}</dd></div>
      </dl>
      <div className={l.priceActions}><Link href="/apply?kind=impression#coaching-content" className={l.priceApply}>소개팅 신청</Link><Link href="/services/matching" className={l.priceMore} aria-label={`${MATCH_GUIDE.name} 자세히 보기`}>자세히 보기</Link></div>
    </article>
  </div>;
}

export default function CoachingLanding({ programs }: { programs: Program[] | null }) {
  // 01–06 are the focused services; 07 (종합 코칭) gets the wide card underneath.
  const services = COACHING_SERVICES.filter(service => !(service.id in WIDE_SERVICES));
  const wide = COACHING_SERVICES.filter(service => service.id in WIDE_SERVICES);
  return <div className={l.landing}>
    <EditorialMotion />
    <CoachingHero />

    <section id="start" className={`${l.section} ${l.startSection}`} aria-labelledby="start-title" data-home-section="start">
      <div className={l.container}>
        <SectionHead eyebrow="HOW TO START" title={<span id="start-title">원하는 방법으로 편하게 시작하세요</span>}>실시간 채팅부터 무료 진단까지, 모든 상담은 1:1 비대면으로 진행합니다.</SectionHead>
        <ul className={l.startGrid}>
          {START.map(item => {
            const body = <><span className={l.startIcon} aria-hidden="true"><item.icon size={22} /></span><strong>{item.title}</strong><span className={l.startText}>{item.text}</span><span className={l.startMore}>{item.cta} <ArrowRight size={13} aria-hidden="true" /></span></>;
            return <li key={item.title} data-editorial-reveal>
              {item.action === "chat" ? <ChatButton className={l.startCard}>{body}</ChatButton>
                : item.action === "kakao" ? <KakaoIdButton className={l.startCard}>{body}</KakaoIdButton>
                : <Link href={item.href ?? "/apply"} className={l.startCard}>{body}</Link>}
            </li>;
          })}
        </ul>
      </div>
    </section>

    <section id="concerns" className={`${l.section} ${l.sectionSoft}`} aria-labelledby="concerns-title" data-home-section="concerns">
      <div className={l.container}>
        <SectionHead eyebrow="DO YOU RELATE?" title={<span id="concerns-title">이런 고민 있으신가요?</span>} />
        <ul className={l.concernGrid}>
          {CONCERNS.map((item, i) => <li key={item.text} data-editorial-reveal><Link href={`/services/${item.service}`} className={l.concernCard}><span className={l.concernNumber}>{String(i + 1).padStart(2, "0")}</span><p>“{item.text}”</p><span className={l.concernLink}>{serviceName(item.service)} <ArrowRight size={13} aria-hidden="true" /></span></Link></li>)}
        </ul>
        <div className={l.concernClosing} data-editorial-reveal><p>하나라도 해당된다면, <strong>연애코칭이 도움이 될 수 있습니다.</strong></p><a href="#services" className={l.textLink}>나에게 맞는 코칭 보기 <ArrowDown size={14} aria-hidden="true" /></a></div>
      </div>
    </section>

    <section id="services" className={l.section} aria-labelledby="services-title" data-home-section="services">
      <div className={l.container}>
        <SectionHead eyebrow="COACHING SERVICES" title={<span id="services-title">인연연구소의 연애코칭 서비스</span>}>연애가 어려운 게 아니라, 방법을 모르는 거예요.<br />어떤 분이 신청하는지 살펴보고, 나에게 맞는 코칭을 찾아보세요.</SectionHead>
        <ul className={l.serviceGrid}>
          {services.map(service => {
            const ServiceIcon = SERVICE_ICONS[service.id] ?? ChatCircleDots;
            return <li key={service.id} data-editorial-reveal><Link href={`/services/${service.id}`} className={l.serviceCard}>
              <div className={l.serviceTop}><span className={l.serviceIcon} aria-hidden="true"><ServiceIcon size={22} /></span><span className={l.serviceNumber}>{service.number}</span></div>
              <h3>{service.name}</h3>
              <p className={l.serviceTagline}>{service.tagline}</p>
              <div className={l.serviceWho}><strong>이런 분이 신청해요</strong><p>{service.whoText}</p></div>
              <ul className={l.servicePoints}>{service.points.map(point => <li key={point}><Check size={14} weight="bold" aria-hidden="true" />{point}</li>)}</ul>
              <span className={l.serviceMore}>자세히 보기 <ArrowUpRight size={15} aria-hidden="true" /></span>
            </Link></li>;
          })}
        </ul>
        {wide.map(featured => <Link key={featured.id} href={`/services/${featured.id}`} className={`${l.serviceFeatured} ${featured.id === "matching" ? l.serviceFeaturedLight : ""}`} data-editorial-reveal>
          <div><span className={l.featuredNumber}>{featured.number} · {WIDE_SERVICES[featured.id]}</span><h3>{featured.name}</h3><p className={l.serviceTagline}>{featured.tagline}</p><div className={l.serviceWho}><strong>이런 분이 신청해요</strong><p>{featured.whoText}</p></div></div>
          <div><span className={l.featuredPointsTitle}>이런 도움을 받을 수 있어요</span><ul className={l.servicePoints}>{featured.helps.map(item => <li key={item}><Check size={14} weight="bold" aria-hidden="true" />{item}</li>)}</ul><span className={l.serviceMore}>자세히 보기 <ArrowUpRight size={15} aria-hidden="true" /></span></div>
        </Link>)}
      </div>
    </section>

    <section id="about" className={`${l.section} ${l.sectionDark}`} aria-labelledby="about-title" data-home-section="about">
      <div className={l.container}>
        <SectionHead eyebrow="WHY INYEON LAB" title={<span id="about-title">AI가 아닌, 사람이 직접 듣고 코칭합니다.</span>}>인연연구소는 소개팅 업체를 운영하며 쌓은 경험을 바탕으로, 연애 고민을 1:1로 함께 풀어가는 카카오톡 연애코칭 서비스입니다.</SectionHead>
        <ol className={l.aboutGrid}>
          {DIFFERENCES.map((item, i) => <li key={item.title} className={l.aboutCard} data-editorial-reveal><span className={l.aboutNumber}>{String(i + 1).padStart(2, "0")}</span><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p></li>)}
        </ol>
      </div>
    </section>

    <section id="examples" className={l.section} aria-labelledby="examples-title" data-home-section="examples">
      <div className={l.container}>
        <SectionHead eyebrow="COACHING EXAMPLES" title={<span id="examples-title">이렇게 코칭해드려요</span>}>고민을 보내주시면, 상황에 맞춰 구체적으로 함께 살펴봅니다.</SectionHead>
        <div className={l.exampleGrid}>
          {EXAMPLES.map(example => <article key={example.category} className={l.exampleCard} data-editorial-reveal>
            <header><span className={l.exampleBadge}>가상 예시</span><strong>{example.category}</strong></header>
            <div className={l.exampleConcern}><span>고민</span><p>“{example.concern}”</p></div>
            <div className={l.exampleArrow} aria-hidden="true"><ArrowDown size={16} /></div>
            <div className={l.exampleCoaching}><span>코칭</span><p>{example.coaching}</p></div>
            <Link href={`/services/${example.service}`} className={l.textLink}>{serviceName(example.service)} 자세히 보기 <ArrowRight size={14} aria-hidden="true" /></Link>
          </article>)}
        </div>
        <p className={l.footnote}>※ 실제 상담 사례가 아닌 서비스 이해를 돕기 위한 가상 예시입니다.</p>
      </div>
    </section>

    <section id="process" className={`${l.section} ${l.sectionSoft}`} aria-labelledby="process-title" data-home-section="process">
      <div className={l.container}>
        <SectionHead eyebrow="HOW IT WORKS" title={<span id="process-title">상담 진행 과정</span>}>처음이어도 괜찮아요. 카카오톡으로 간단하게 시작할 수 있어요.</SectionHead>
        <ol className={l.stepGrid}>
          {STEPS.map((step, i) => <li key={step.title} className={l.stepCard} data-editorial-reveal><span className={l.stepNumber}>STEP {String(i + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
      </div>
    </section>

    <section id="pricing" className={l.section} aria-labelledby="pricing-title" data-home-section="pricing">
      <div className={l.container}>
        <SectionHead eyebrow="PROGRAMS & PRICE" title={<span id="pricing-title">프로그램 및 가격 안내</span>}>프로그램별 가격과 제공 내용을 한눈에 비교해보세요. 모든 코칭은 1:1 카카오톡 비대면으로 진행합니다.</SectionHead>
        <Pricing programs={programs} />
        <MatchPricing />
      </div>
    </section>

    <section id="faq" className={`${l.section} ${l.sectionSoft}`} aria-labelledby="faq-title" data-home-section="faq">
      <div className={`${l.container} ${l.faqLayout}`}>
        <SectionHead eyebrow="FAQ" title={<span id="faq-title">자주 묻는 질문</span>}>더 궁금한 점은 카카오톡으로 편하게 물어보세요.</SectionHead>
        <div className={l.faqList}>
          {FAQS.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </div>
    </section>

    <section id="consultation" className={l.closing} aria-labelledby="closing-title" data-home-section="consultation">
      <div className={l.closingCopy} data-editorial-reveal>
        <span className={l.eyebrow}>YOUR STORY STARTS HERE</span>
        <h2 id="closing-title">혼자 고민했던 연애,<br />이제는 함께 해결 방향을 찾아보세요.</h2>
        <p>신청서를 접수하거나 실시간 채팅으로 지금의 고민을 편하게 남겨주세요.</p>
        <div className={l.closingActions}><ApplyButton className={l.lightButton} /><ChatButton className={l.outlineButton}><ChatsCircle size={18} aria-hidden="true" /> 실시간 채팅 상담</ChatButton><KakaoIdButton className={l.outlineButton} /></div>
      </div>
    </section>
  </div>;
}
