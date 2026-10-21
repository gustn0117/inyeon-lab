import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChatCircleDots, Check } from "@phosphor-icons/react/dist/ssr";
import { type Program, won } from "@/lib/coaching";
import { COACHING_SERVICES } from "@/lib/coaching-services";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import CoachingHero from "./CoachingHero";
import EditorialMotion from "./EditorialMotion";
import l from "./landing.module.css";

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
  { question: "상담 후 추가 질문도 가능한가요?", answer: "코칭 기간 중에는 카카오톡으로 궁금한 점을 질문하실 수 있습니다. 코칭이 끝난 뒤 추가 상담이 필요하면 상황에 맞는 프로그램을 안내해드립니다." },
  { question: "재회 상담도 진행하나요?", answer: "헤어진 연인과의 관계로 고민하신다면 먼저 상황을 들려주세요. 지금의 관계를 객관적으로 살펴보고 현실적인 방향을 함께 정리해드립니다. 다만 재회 자체를 보장하지는 않습니다." },
];

const serviceName = (id: string) => COACHING_SERVICES.find(service => service.id === id)?.name ?? "";

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return <div className={l.sectionHead} data-editorial-reveal><span className={l.eyebrow}>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function KakaoButton({ className, label = "카카오톡 상담 신청" }: { className: string; label?: string }) {
  return <a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={className}><ChatCircleDots size={18} weight="fill" aria-hidden="true" /> {label}<span className="sr-only"> (새 창)</span></a>;
}

function Pricing({ programs }: { programs: Program[] | null }) {
  if (!programs?.length) return <div className={l.priceFallback} role="status"><p>프로그램 정보를 불러오지 못했습니다. 카카오톡으로 문의하시면 바로 안내해드립니다.</p><KakaoButton className={l.darkButton} /></div>;
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
    <p className={l.footnote}>표시 금액은 프로그램 전체 이용 금액이며, 계좌이체로 신청합니다. 기본 스타일링 제안은 희망하시는 분께 무료로 제공합니다.</p>
  </>;
}

export default function CoachingLanding({ programs }: { programs: Program[] | null }) {
  // 01–06 are the focused services; 07 (종합 코칭) gets the wide card underneath.
  const services = COACHING_SERVICES.slice(0, -1);
  const featured = COACHING_SERVICES[COACHING_SERVICES.length - 1];
  return <div className={l.landing}>
    <EditorialMotion />
    <CoachingHero />

    <section id="concerns" className={l.section} aria-labelledby="concerns-title" data-home-section="concerns">
      <div className={l.container}>
        <SectionHead eyebrow="DO YOU RELATE?" title={<span id="concerns-title">이런 고민 있으신가요?</span>} />
        <ul className={l.concernGrid}>
          {CONCERNS.map((item, i) => <li key={item.text} data-editorial-reveal><Link href={`/services/${item.service}`} className={l.concernCard}><span className={l.concernNumber}>{String(i + 1).padStart(2, "0")}</span><p>“{item.text}”</p><span className={l.concernLink}>{serviceName(item.service)} <ArrowRight size={13} aria-hidden="true" /></span></Link></li>)}
        </ul>
        <div className={l.concernClosing} data-editorial-reveal><p>하나라도 해당된다면, <strong>연애코칭이 도움이 될 수 있습니다.</strong></p><a href="#services" className={l.textLink}>나에게 맞는 코칭 보기 <ArrowDown size={14} aria-hidden="true" /></a></div>
      </div>
    </section>

    <section id="services" className={`${l.section} ${l.sectionSoft}`} aria-labelledby="services-title" data-home-section="services">
      <div className={l.container}>
        <SectionHead eyebrow="COACHING SERVICES" title={<span id="services-title">인연연구소의 연애코칭 서비스</span>}>궁금한 서비스를 누르면 자세한 내용을 볼 수 있어요.</SectionHead>
        <ul className={l.serviceGrid}>
          {services.map(service => <li key={service.id} data-editorial-reveal><Link href={`/services/${service.id}`} className={l.serviceCard}>
            <figure className={l.servicePhoto}><img src={`/inyeon-2026/${service.image}`} alt="" loading="lazy" decoding="async" style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined} /><span>{service.number}</span></figure>
            <div className={l.serviceBody}><h3>{service.name}</h3><p>{service.tagline}</p><span className={l.serviceMore}>자세히 보기 <ArrowUpRight size={15} aria-hidden="true" /></span></div>
          </Link></li>)}
        </ul>
        <Link href={`/services/${featured.id}`} className={l.serviceFeatured} data-editorial-reveal>
          <figure><img src={`/inyeon-2026/${featured.image}`} alt="" loading="lazy" decoding="async" /></figure>
          <div><span className={l.featuredNumber}>{featured.number} · 여러 고민을 함께</span><h3>{featured.name}</h3><p>{featured.tagline}</p><ul>{featured.recommend.map(item => <li key={item}><Check size={14} weight="bold" aria-hidden="true" />{item}</li>)}</ul><span className={l.serviceMore}>자세히 보기 <ArrowUpRight size={15} aria-hidden="true" /></span></div>
        </Link>
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
      <img src="/inyeon-2026/process-04-v2.webp" alt="" loading="lazy" decoding="async" />
      <div className={l.closingCopy} data-editorial-reveal>
        <span className={l.eyebrow}>YOUR STORY STARTS HERE</span>
        <h2 id="closing-title">혼자 고민했던 연애,<br />이제는 함께 해결 방향을 찾아보세요.</h2>
        <p>지금의 고민을 카카오톡으로 편하게 남겨주세요.</p>
        <div className={l.closingActions}><KakaoButton className={l.lightButton} /><Link href="/apply" className={l.outlineButton}>무료 상담 신청서 작성 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>
  </div>;
}
