import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  CalendarCheck,
  ChatCircleDots,
  IdentificationCard,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import ChatWidget from "@/components/ChatWidget";
import ConsultButton from "@/components/ConsultButton";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import ScrollEffects from "@/components/ScrollEffects";
import styles from "./home.module.css";

const BENEFITS = [
  { title: "현재 소개 의사 확인", body: "지금 만날 준비가 된 회원만" },
  { title: "프로필 직접 검토", body: "조건표보다 대화와 생활의 결까지" },
  { title: "양측 수락 후 매칭", body: "한쪽만 원하는 소개는 진행하지 않아요" },
  { title: "첫 만남까지 조율", body: "일정·장소·피드백을 한 번에" },
] as const;

type ProcessVisual = "apply" | "consult" | "profile" | "match" | "schedule" | "feedback";

type ProcessStep = {
  number: string;
  title: string;
  body: string;
  visual: ProcessVisual;
  image?: string;
  alt?: string;
};

const PROCESS: readonly ProcessStep[] = [
  {
    number: "01",
    title: "소개팅 신청",
    body: "기본 정보와 원하는 만남을 간단히 알려주세요.",
    visual: "apply",
  },
  {
    number: "02",
    title: "전담 매니저 상담",
    body: "취향과 가치관, 상대에게 바라는 점을 1:1로 나눠요.",
    visual: "consult",
    image: "/inyeon-ultra/process-02-consult-v3.webp",
    alt: "전담 매니저와 상담을 진행하는 회원의 연출 이미지",
  },
  {
    number: "03",
    title: "프로필 카드 제작",
    body: "상담 내용을 바탕으로 나를 잘 보여주는 프로필을 완성해요.",
    visual: "profile",
  },
  {
    number: "04",
    title: "맞춤 인연 제안",
    body: "매니저가 양측의 조건과 결을 살펴 어울리는 인연을 제안해요.",
    visual: "match",
  },
  {
    number: "05",
    title: "양측 수락 · 후불 결제",
    body: "서로 만나고 싶다는 의사가 확인된 뒤에만 1회 이용료를 결제해요.",
    visual: "schedule",
  },
  {
    number: "06",
    title: "만남 · 피드백",
    body: "일정과 장소를 조율하고, 만남 후 의견까지 세심히 확인해요.",
    visual: "feedback",
  },
] as const;

const MEMBER_EXAMPLES = [
  {
    initial: "M",
    meta: "96년생 · 브랜드 마케터",
    label: "여성 회원 예시",
    tags: ["서울", "전문직 선호", "대화가 편한 사람"],
    quote: "서로의 일을 존중하면서 주말에는 함께 전시나 맛집을 즐기고 싶어요.",
  },
  {
    initial: "J",
    meta: "94년생 · 대기업 연구원",
    label: "남성 회원 예시",
    tags: ["수도권", "비흡연", "차분한 관계"],
    quote: "급하게 가까워지기보다 대화가 잘 통하는 사람과 오래 만나고 싶어요.",
  },
  {
    initial: "S",
    meta: "97년생 · 초등교사",
    label: "여성 회원 예시",
    tags: ["경기", "주말 데이트", "따뜻한 성향"],
    quote: "일상을 다정하게 나눌 수 있고 약속을 소중히 여기는 분이면 좋겠어요.",
  },
] as const;

const MATCH_STORIES = [
  {
    couple: "96년생 브랜드 마케터  ♡  94년생 대기업 연구원",
    note: "직업 조건보다 ‘주말을 보내는 방식’이 닮은 두 분을 먼저 연결했어요.",
    quote: "프로필보다 실제 대화가 더 편했어요. 억지로 맞춘 소개가 아니라는 느낌이 들었습니다.",
  },
  {
    couple: "97년생 교사  ♡  95년생 IT 개발자",
    note: "활동적인 취미는 달라도 관계에서 중요하게 보는 기준이 같았던 매칭이에요.",
    quote: "매니저님이 왜 서로를 추천했는지 만나보니 알겠더라고요.",
  },
  {
    couple: "95년생 간호사  ♡  93년생 공기업 재직",
    note: "교대 근무와 출퇴근 거리까지 고려해 무리 없는 첫 만남을 조율했어요.",
    quote: "일정 잡는 과정이 편했고, 부담 없이 서로에게 집중할 수 있었어요.",
  },
] as const;

const FAQS = [
  {
    question: "인연연구소는 소개팅 앱인가요?",
    answer: "아니요. 앱에서 직접 상대를 찾는 방식이 아니라, 전담 매니저가 프로필과 희망 조건을 확인해 1:1로 제안하는 맞춤 소개팅 서비스입니다.",
  },
  {
    question: "가입하면 바로 비용이 발생하나요?",
    answer: "가입비와 성혼비는 0원입니다. 두 분 모두 소개를 원해 매칭이 성사된 뒤에만 1회 이용료를 결제합니다.",
  },
  {
    question: "기본가 외에 별도 비용이 있나요?",
    answer: "기본가는 베이직 매칭 기준입니다. 지역·희망 나이·직업군·외모 우선 매칭 등 원하는 조건은 부담 없는 선택 옵션으로 추가할 수 있으며, 옵션을 선택하지 않아도 불이익은 없습니다.",
  },
  {
    question: "매칭 상대는 어떻게 선정되나요?",
    answer: "담당 매니저가 양측의 프로필, 가치관과 희망 조건을 함께 살펴 결이 잘 맞을 가능성이 높은 분을 제안합니다.",
  },
  {
    question: "약속 장소와 일정은 누가 정하나요?",
    answer: "매칭 성사 후 담당 매니저가 두 분과 각각 소통하며 가능한 날짜와 편한 장소를 확인해 첫 만남 일정을 조율합니다.",
  },
  {
    question: "어느 지역에서 진행되나요?",
    answer: "현재 수도권을 중심으로 대면 소개팅을 진행합니다. 신청 후 상담에서 자세한 가능 지역을 확인할 수 있습니다.",
  },
] as const;

function ProcessGraphic({ type }: { type: ProcessVisual }) {
  if (type === "apply") {
    return (
      <div className={`${styles.processGraphic} ${styles.applyGraphic}`} aria-label="소개팅 신청 화면 예시">
        <div className={styles.mockPhone}>
          <span>INYEON LAB</span>
          <strong>어떤 만남을<br />원하시나요?</strong>
          <i /><i /><i />
          <b>신청서 작성하기</b>
        </div>
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className={`${styles.processGraphic} ${styles.profileGraphic}`} aria-label="프로필 카드 제작 예시">
        <span className={styles.graphicInitial}>M</span>
        <div><small>CURATED PROFILE</small><strong>96년생 · 마케터</strong><p>대화의 온도와 생활 리듬까지 정리해요.</p></div>
      </div>
    );
  }

  if (type === "match") {
    return (
      <div className={`${styles.processGraphic} ${styles.matchGraphic}`} aria-label="맞춤 인연 제안 예시">
        <div><span>M</span><small>96 · 마케터</small></div>
        <b aria-hidden="true">♡</b>
        <div><span>J</span><small>94 · 연구원</small></div>
        <p>생활 리듬 · 관계 기준 · 거리 확인</p>
      </div>
    );
  }

  if (type === "schedule") {
    return (
      <div className={`${styles.processGraphic} ${styles.scheduleGraphic}`} aria-label="양측 수락과 일정 조율 예시">
        <div className={styles.scheduleGraphicTop}><span>양측 수락 완료</span><strong>✓</strong></div>
        <div className={styles.scheduleGraphicDate}><small>SAT</small><b>24</b><span>오후 3:00</span></div>
        <p>두 분의 중간 지점 · 조용한 카페</p>
      </div>
    );
  }

  return (
    <div className={`${styles.processGraphic} ${styles.feedbackGraphic}`} aria-label="만남 후 피드백 예시">
      <span>오늘 만남은 어떠셨어요?</span>
      <span>대화가 편하고 즐거웠어요.</span>
      <strong>다음 만남 의사 확인 중</strong>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.site}>
      <ScrollEffects />
      <RenewalHeader />
      <main>
        <section className={styles.hero} aria-labelledby="home-title">
          <picture className={styles.heroPicture} aria-hidden="true">
            <source media="(max-width: 820px)" srcSet="/inyeon-ultra/home-hero-mobile-v3.webp" />
            <img
              src="/inyeon-ultra/home-hero-desktop-v3.webp"
              alt=""
              className={styles.heroImage}
              fetchPriority="high"
            />
          </picture>
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy} data-reveal="left">
              <span className={styles.kicker}>결정사급 1:1 매칭 · 가입비·성혼비 0원</span>
              <h1 id="home-title">아무나 만나지 마세요.<strong>아무나 소개하지 않으니까.</strong></h1>
              <p><strong>프로필 숫자만 맞춰 연결하지 않습니다.</strong>{" "}전담 매니저가 두 사람의 생활과 관계 기준을 직접 읽고, <span>서로 원하는 소개만 이어드립니다.</span></p>
              <div className={styles.heroActions}>
                <Link href="/apply" className={styles.primaryButton}>나와 맞는 사람 찾기</Link>
                <ConsultButton className={styles.secondaryButton} label="1:1 무료 상담" tail="받기" />
              </div>
              <dl className={styles.heroFees}>
                <div><dt>소개받기 전</dt><dd>0원</dd></div>
                <div><dt>가입비 · 성혼비</dt><dd>0원</dd></div>
                <div><dt>양측 수락 후 1회</dt><dd><span><small>여성</small> 22,000원</span>{" "}<span><small>남성</small> 33,000원</span></dd></div>
              </dl>
              <a href="#member-preview" className={styles.scrollCue}><span>왜 아무나 소개하지 않는지</span><i aria-hidden="true">↓</i></a>
            </div>
          </div>
        </section>

        <section className={styles.benefitRail} aria-label="전담 매니저가 챙기는 네 가지">
          {BENEFITS.map((benefit) => <div key={benefit.title} data-reveal="up"><strong>{benefit.title}</strong><span>{benefit.body}</span></div>)}
        </section>

        <section id="member-preview" className={styles.memberSection} aria-labelledby="member-title">
          <div className={styles.memberHeading} data-reveal="up">
            <div><span className={styles.sectionKicker}>WHO YOU COULD MEET</span><h2 id="member-title">숫자가 아니라,<br />지금 만날 준비가 된 사람</h2></div>
            <p>나이와 직업은 시작일 뿐이에요. 담당 매니저가 요즘의 생활, 관계에서 중요한 기준, 만나고 싶은 이유까지 확인해 소개합니다.</p>
          </div>
          <div className={styles.memberGrid}>
            {MEMBER_EXAMPLES.map((member, index) => (
              <article className={styles.memberCard} key={member.meta} data-reveal="up" style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}>
                <div className={styles.memberCardTop}><span>{member.initial}</span><small>{member.label}</small><b>소개 가능</b></div>
                <h3>{member.meta}</h3>
                <div className={styles.memberTags}>{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p>“{member.quote}”</p>
                <footer><span>PROFILE NOTE</span><i aria-hidden="true" /></footer>
              </article>
            ))}
          </div>
          <p className={styles.exampleNotice}>* 개인정보 보호를 위해 가상 정보로 구성한 프로필 예시입니다.</p>
        </section>

        <section className={styles.storySection} aria-labelledby="story-title">
          <div className={styles.sectionCopy} data-reveal="left">
            <span className={styles.sectionKicker}>OUR MATCHMAKING</span>
            <h2 id="story-title">바쁜 일상 속,<br />진짜 인연을 만나는 방법</h2>
            <p>인연연구소는 20·30대 직장인을 위한 프리미엄 1:1 소개팅입니다. 단순한 만남이 아닌, 의미 있는 인연이 이어질 수 있도록 전담 매니저가 처음부터 끝까지 함께합니다.</p>
            <Link href="/#process" className={styles.textLink}>서비스 자세히 보기</Link>
          </div>
          <figure className={styles.storyMedia} data-reveal="right">
            <Image src="/inyeon-ultra/story-couple-v3.webp" alt="밝은 공간에서 함께 책을 보며 대화하는 직장인 남녀의 연출 이미지" fill sizes="(max-width: 820px) 100vw, 58vw" quality={96} className={styles.coverImage} />
            <figcaption>좋은 사람과의 만남이 좋은 하루를 만듭니다.</figcaption>
          </figure>
        </section>

        <section id="guide" className={styles.guideSection} aria-labelledby="guide-title">
          <div className={styles.sectionHeader} data-reveal="up"><span className={styles.sectionKicker}>FOR YOU</span><h2 id="guide-title">나에게 맞는 안내를 확인하세요</h2></div>
          <div className={styles.guideGrid}>
            <Link href="/men" className={styles.guideCard} data-reveal="left">
              <div><span>FOR MEN</span><h3>남성 회원 안내</h3><p>신뢰할 수 있는 만남,<br />지금 시작하세요.</p><strong>자세히 보기</strong></div>
              <div className={styles.guideImage}><Image src="/inyeon-ultra/member-man-v3.webp" alt="밝은 공간에서 책을 살펴보는 20대 남성의 서비스 연출 이미지" fill sizes="(max-width: 720px) 48vw, 25vw" quality={96} className={styles.coverImage} /></div>
            </Link>
            <Link href="/women" className={styles.guideCard} data-reveal="right">
              <div><span>FOR WOMEN</span><h3>여성 회원 안내</h3><p>더 특별한 인연을,<br />안전하고 편안하게.</p><strong>자세히 보기</strong></div>
              <div className={styles.guideImage}><Image src="/inyeon-ultra/member-woman-v3.webp" alt="밝은 작업 공간에 있는 20대 여성의 서비스 연출 이미지" fill sizes="(max-width: 720px) 48vw, 25vw" quality={96} className={styles.coverImage} /></div>
            </Link>
          </div>
        </section>

        <section id="process" className={styles.processSection} aria-labelledby="process-title">
          <div className={styles.processIntro} data-reveal="up">
            <div><span className={styles.sectionKicker}>MATCHING JOURNEY</span><h2 id="process-title">한 번의 소개보다,<br />{" "}잘 이어지는 과정</h2></div>
            <p>신청부터 피드백까지 여섯 단계로 나누되, 회원님이 복잡하게 챙길 일은 줄였습니다. 각 순간마다 같은 매니저가 흐름을 이어갑니다.</p>
          </div>
          <div className={styles.processRoutes}>
            {[PROCESS.slice(0, 3), PROCESS.slice(3)].map((row, rowIndex) => (
              <div className={styles.processRouteRow} key={rowIndex} data-reveal="line">
                {row.map((step) => (
                  <article className={styles.routeCard} key={step.number}>
                    <span className={styles.routeMarker}>{step.number}</span>
                    <div className={`${styles.routeMedia} ${step.visual === "consult" ? "" : styles.routeGraphicMedia}`}>
                      {step.visual === "consult" && step.image ? (
                        <Image src={step.image} alt={step.alt ?? "전담 매니저 상담 연출 이미지"} fill sizes="(max-width: 720px) 100vw, 36vw" quality={96} className={styles.coverImage} />
                      ) : (
                        <ProcessGraphic type={step.visual} />
                      )}
                    </div>
                    <div className={styles.routeCopy}><h3>{step.title}</h3><p>{step.body}</p></div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.profileDeliverySection} aria-labelledby="delivery-title">
          <div className={styles.deliveryCopy} data-reveal="left">
            <span className={styles.sectionKicker}>PROFILE DELIVERY</span>
            <h2 id="delivery-title">사진 한 장 보내고<br />답을 재촉하지 않아요</h2>
            <p>매니저가 소개 이유와 상대의 분위기를 함께 안내하고, 프로필을 충분히 살펴볼 시간을 드립니다. 양측 모두 수락해야 일정 조율과 결제가 시작돼요.</p>
            <dl>
              <div><dt>01</dt><dd><strong>프로필 수령</strong><span>소개 이유와 핵심 포인트를 함께 확인</span></dd></div>
              <div><dt>02</dt><dd><strong>24시간 내 의사 전달</strong><span>부담 없이 수락 또는 패스 선택</span></dd></div>
              <div><dt>03</dt><dd><strong>양측 수락 후 연결</strong><span>그때부터 일정·장소와 결제를 안내</span></dd></div>
            </dl>
          </div>
          <div className={styles.deliveryChat} data-reveal="right" aria-label="상대 프로필 수령 후 매니저 대화 예시">
            <header><span className={styles.deliveryAvatar}>IN</span><div><strong>인연연구소 · 담당 매니저</strong><small>상대 프로필 수령</small></div><b>안심 매칭</b></header>
            <div className={styles.deliveryBody}>
              <span className={styles.deliveryDate}>오늘</span>
              <div className={styles.managerMessage}>이번에 소개드리는 분은 차분하고 배려 깊은 성향이에요. 두 분 모두 일과 관계의 균형을 중요하게 생각해 추천드렸어요.</div>
              <div className={styles.managerMessage}>천천히 살펴보신 뒤 내일 오후 6시까지 수락 또는 패스 의사를 알려주세요. 만나기 싫은 분을 억지로 연결하지 않아요.</div>
              <div className={styles.memberMessage}>이번에도 매니저님의 선택 믿어볼게요!<br />프로필보다 대화의 결을 잘 짚어주신 것 같아요 :)</div>
              <div className={styles.deliveryResult}><span>✓</span><p><strong>양측 수락 확인</strong>이제 담당 매니저가 첫 만남 일정을 조율합니다.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.managerStorySection} aria-labelledby="manager-story-title">
          <div className={styles.managerStoryHeading} data-reveal="up">
            <span className={styles.sectionKicker}>INSIDE THE PROCESS</span>
            <h2 id="manager-story-title">보이지 않는 과정까지,<br />{" "}매니저가 이어갑니다</h2>
            <p>프로필을 읽는 순간부터 만남 뒤의 마음까지. 회원님은 선택에 집중하고, 복잡한 실무는 전담 매니저에게 맡겨주세요.</p>
          </div>
          <div className={styles.managerStoryPanel}>
            <article className={styles.managerStoryItem} data-reveal="left">
              <div className={styles.managerStoryCopy}>
                <span className={styles.managerStoryNumber}>01</span>
                <p className={styles.managerStoryEyebrow}>PROFILE CURATION</p>
                <h3>조건표보다 먼저,<br />사람의 결을 읽어요</h3>
                <p>상담에서 나눈 가치관과 생활 방식, 관계에서 중요하게 생각하는 기준을 한 장의 소개로 정리합니다.</p>
              </div>
              <div className={styles.profilePreview} aria-label="맞춤 프로필 카드 예시">
                <div className={styles.previewTopbar}><IdentificationCard size={22} weight="regular" aria-hidden="true" /><span>INTRODUCTION NOTE</span><small>01</small></div>
                <div className={styles.profilePreviewHero}>
                  <div className={styles.profileMonogram}>M</div>
                  <p><small>96 · BRAND MARKETER</small><strong>“편안한 대화가<br />오래 이어지는 관계”</strong></p>
                </div>
                <dl className={styles.profileFacts}>
                  <div><dt>생활의 리듬</dt><dd>평일에는 일에 집중하고 주말의 여유를 소중히 여겨요.</dd></div>
                  <div><dt>관계의 기준</dt><dd>대화가 편안하고 서로의 일을 존중하는 관계를 바라요.</dd></div>
                  <div><dt>함께하고 싶은 순간</dt><dd>맛있는 식사와 산책처럼 소박한 시간을 좋아해요.</dd></div>
                </dl>
              </div>
            </article>

            <article className={`${styles.managerStoryItem} ${styles.managerStoryItemReverse}`} data-reveal="right">
              <div className={styles.managerStoryCopy}>
                <span className={styles.managerStoryNumber}>02</span>
                <p className={styles.managerStoryEyebrow}>DATE COORDINATION</p>
                <h3>두 사람 사이의<br />번거로운 조율을 대신해요</h3>
                <p>가능한 날짜와 이동 동선을 각각 확인하고, 두 분 모두 편안한 시간과 장소로 첫 만남을 연결합니다.</p>
              </div>
              <div className={styles.schedulePreview} aria-label="매니저 일정 조율 예시">
                <div className={styles.previewTopbar}><CalendarCheck size={22} weight="regular" aria-hidden="true" /><span>MEETING PLAN</span><small>02</small></div>
                <div className={styles.schedulePhoto}>
                  <span>OCTOBER</span>
                  <strong>24</strong>
                  <div><i />M <b>15:00</b><i />J</div>
                  <small>두 사람의 시간을 한 곳으로</small>
                </div>
                <div className={styles.scheduleRows}>
                  <div><span>DATE</span><strong>토요일 오후 3:00</strong></div>
                  <div><span>PLACE</span><strong>두 분의 중간 지점 · 조용한 카페</strong></div>
                  <p><i aria-hidden="true" /> 약속 전날, 장소와 시간을 한 번 더 안내해 드려요.</p>
                </div>
              </div>
            </article>

            <article className={styles.managerStoryItem} data-reveal="left">
              <div className={styles.managerStoryCopy}>
                <span className={styles.managerStoryNumber}>03</span>
                <p className={styles.managerStoryEyebrow}>AFTER MEETING</p>
                <h3>만남 뒤의 마음도<br />편하게 전할 수 있어요</h3>
                <p>좋았던 점과 아쉬웠던 점을 매니저가 먼저 묻고, 필요한 이야기는 부담 없이 대신 전달합니다.</p>
              </div>
              <div className={styles.feedbackPreview} aria-label="만남 후 피드백 대화 예시">
                <div className={styles.previewTopbar}><ChatCircleDots size={22} weight="regular" aria-hidden="true" /><span>PRIVATE FEEDBACK</span><small>03</small></div>
                <div className={styles.feedbackBody}>
                  <div className={styles.managerAvatar}>매니저</div>
                  <div className={styles.chatBubble}><strong>오늘 만남은 어떠셨어요?</strong><span>좋았던 점과 아쉬웠던 점을 편하게 말씀해 주세요.</span></div>
                  <div className={`${styles.chatBubble} ${styles.chatBubbleMember}`}><strong>대화가 편하고 즐거웠어요.</strong><span>다음 만남 의사도 전달하고 싶어요.</span></div>
                  <div className={styles.feedbackStatus}><span aria-hidden="true">✓</span><p><strong>피드백 접수 완료</strong>상대방의 답변은 담당 매니저가 확인 후 안내해 드립니다.</p></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.careSection} aria-labelledby="care-title">
          <div className={styles.careIntro} data-reveal="up"><div><span className={styles.sectionKicker}>MANAGER FULL CARE</span><h2 id="care-title">결정사급 케어를,<br />{" "}소개팅에 꼭 필요한 만큼</h2></div><p>화려한 수치보다 실제 만남을 편하게 만드는 관리에 집중합니다.</p></div>
          <div className={styles.careBento}>
            <article className={`${styles.careBlock} ${styles.careBlockLead}`} data-reveal="scale">
              <Image src="/inyeon-ultra/process-02-consult-v3.webp" alt="처음부터 끝까지 함께하는 전담 매니저의 연출 이미지" fill sizes="(max-width: 820px) 100vw, 42vw" quality={96} className={styles.coverImage} />
              <div><span>1:1 MANAGER</span><h3>처음부터 끝까지<br />한 명의 매니저가 함께</h3><p>상담 · 매칭 · 일정 · 피드백</p></div>
            </article>
            <article className={`${styles.careBlock} ${styles.careBlockCost}`} data-reveal="scale"><Wallet size={30} weight="regular" aria-hidden="true" /><strong>0원</strong><h3>가입비 · 성혼비</h3><p>양측 수락 후에만 1회 이용료를 결제해요.</p></article>
            <article className={`${styles.careBlock} ${styles.careBlockMatch}`} data-reveal="scale">
              <div className={`${styles.careBlockMedia} ${styles.careMatchGraphic}`}><span>M</span><b>♡</b><span>J</span><small>CURATED MATCH</small></div>
              <div className={styles.careBlockCopy}><IdentificationCard size={26} weight="regular" aria-hidden="true" /><h3>사람이 직접 보는 매칭</h3><p>조건만이 아니라 두 사람의 결까지 살펴요.</p></div>
            </article>
            <article className={`${styles.careBlock} ${styles.careBlockSchedule}`} data-reveal="scale">
              <div className={`${styles.careBlockMedia} ${styles.careScheduleGraphic}`}><small>SAT</small><strong>24</strong><span>15:00 · 성수</span></div>
              <div className={styles.careBlockCopy}><CalendarCheck size={26} weight="regular" aria-hidden="true" /><h3>일정과 장소까지 조율</h3><p>두 분은 첫 만남에만 집중하세요.</p></div>
            </article>
            <article className={`${styles.careBlock} ${styles.careBlockFeedback}`} data-reveal="scale">
              <div className={styles.careFeedbackGraphic}><span>오늘 만남은<br />어떠셨어요?</span><span>다음 만남도<br />기대돼요 :)</span></div>
              <div><ChatCircleDots size={27} weight="regular" aria-hidden="true" /><h3>만남 후 피드백</h3><p>어려운 마음도 편하게 전해요.</p></div>
            </article>
          </div>
        </section>

        <section id="match-stories" className={styles.matchStoriesSection} aria-labelledby="match-stories-title">
          <div className={styles.matchStoriesHeading} data-reveal="up">
            <span className={styles.sectionKicker}>MATCHING STORIES</span>
            <h2 id="match-stories-title">이런 두 사람도,<br />서로를 몰랐을 뿐이니까</h2>
            <p>스펙 한 줄보다 두 사람의 일상과 관계 기준이 만나는 지점을 찾습니다.</p>
          </div>
          <div className={styles.matchStoriesGrid}>
            {MATCH_STORIES.map((story, index) => (
              <article className={styles.matchStoryCard} key={story.couple} data-reveal="up" style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}>
                <header><span>가상 매칭 사례</span><b>0{index + 1}</b></header>
                <h3>{story.couple}</h3>
                <p>{story.note}</p>
                <blockquote>“{story.quote}”</blockquote>
              </article>
            ))}
          </div>
          <div className={styles.matchMethod} data-reveal="up">
            <div><span>WHY IT WORKS</span><h3>매칭 가능성을 높이는 건<br />과장된 숫자가 아니라 과정입니다.</h3></div>
            <ol>
              <li><b>01</b><span><strong>활동 의사 확인</strong>지금 소개받을 수 있는 회원인지 먼저 확인</span></li>
              <li><b>02</b><span><strong>사람이 직접 큐레이션</strong>가치관·생활 리듬·거리까지 함께 검토</span></li>
              <li><b>03</b><span><strong>양측 수락 원칙</strong>서로 만나고 싶은 소개만 실제 만남으로</span></li>
              <li><b>04</b><span><strong>피드백 반영</strong>다음 소개는 더 정확해지도록 기록하고 조정</span></li>
            </ol>
          </div>
          <p className={styles.exampleNotice}>* 이해를 돕기 위해 가상으로 구성한 매칭 사례이며 실제 회원 후기가 아닙니다.</p>
        </section>

        <section id="pricing" className={styles.pricingSection} aria-labelledby="pricing-title">
          <div className={styles.pricingIntro} data-reveal="left"><span className={styles.sectionKicker}>PRICING</span><h2 id="pricing-title">투명한 기본가,<br />매칭 성사 후 결제</h2><p>불필요한 비용은 줄이고, 만남의 질에 집중했습니다. 만나보고 결정하는 합리적인 소개팅 서비스, 지금 시작해 보세요.</p></div>
          <div className={styles.priceTable} role="table" aria-label="인연연구소 기본 이용 요금" data-reveal="right">
            <div className={styles.priceHead} role="row"><span role="columnheader">구분</span><span role="columnheader">남성 회원</span><span role="columnheader">여성 회원</span></div>
            <div role="row"><span role="cell">가입비</span><strong role="cell">0원</strong><strong role="cell">0원</strong></div>
            <div role="row"><span role="cell">성혼비</span><strong role="cell">0원</strong><strong role="cell">0원</strong></div>
            <div role="row"><span role="cell">1회 이용료</span><strong role="cell">33,000원</strong><strong role="cell">22,000원</strong></div>
            <div role="row"><span role="cell">매니저 케어</span><span role="cell">맞춤 매칭·일정 조율</span><span role="cell">맞춤 매칭·일정 조율</span></div>
            <small>* 매칭이 성사된 경우에만 결제가 진행됩니다.</small>
          </div>
        </section>

        <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
          <div className={styles.faqIntro} data-reveal="left"><span className={styles.sectionKicker}>FAQ</span><h2 id="faq-title">소개팅 신청 전에<br />확인해 주세요</h2><p>궁금하신 점을 모아 정리했습니다.<br />더 자세한 내용은 상담으로 문의해 주세요.</p></div>
          <div className={styles.faqList} data-reveal="right">
            {FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-title">
          <div className={styles.finalCopy} data-reveal="left"><span className={styles.sectionKicker}>YOUR NEXT STORY</span><h2 id="final-title">좋은 인연이,<br />좋은 일상을 만듭니다.</h2><p>지금, 인연연구소에서<br />당신의 이야기를 시작해 보세요.</p><div className={styles.heroActions}><Link href="/apply" className={styles.primaryButton}>내 인연 시작하기</Link><ConsultButton className={styles.secondaryButton} label="1:1 무료 상담" tail="받기" /></div></div>
          <div className={styles.finalMedia} data-reveal="right"><Image src="/inyeon-ultra/final-couple-v3.webp" alt="밝은 갤러리에서 함께 걸으며 대화하는 직장인 남녀의 연출 이미지" fill sizes="(max-width: 820px) 100vw, 58vw" quality={96} className={styles.coverImage} /></div>
        </section>
      </main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
