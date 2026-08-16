import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";

const MATCHING_STEPS = [
  {
    number: "01",
    title: "기본 정보 신청",
    body: "연락처·지역·출생연도·직업·키만 간단히 남깁니다.",
  },
  {
    number: "02",
    title: "희망 조건 확인",
    body: "담당자가 거리·나이·스타일과 중요하게 보는 기준을 구체적으로 여쭙습니다.",
  },
  {
    number: "03",
    title: "1:1 프로필 제안",
    body: "기본 신원을 확인한 회원 중 조건과 분위기가 맞는 한 분을 비공개로 제안합니다.",
  },
  {
    number: "04",
    title: "양측 동의 후 대면",
    body: "두 분 모두 프로필에 동의하면 그때 성사되며, 담당자가 실제 만남 일정까지 조율합니다.",
  },
] as const;

const CONTENT = {
  women: {
    kicker: "FOR WOMEN · 35 OR UNDER",
    title: <>괜찮은 사람과,<br /><span className={styles.lemonMark}>부담 없는 시작.</span></>,
    lead: "가입비는 0원입니다. 능력과 매너, 기본 신원을 확인한 회원 중 조건에 맞는 소개가 성사될 때만 33,000원을 결제하세요.",
    price: "33,000원",
    condition: "35세 이하 미혼 여성만 신청 가능",
    heroImage: "/match-women-v2-2x.webp",
    heroImageClass: styles.heroImageWomen,
    highlights: ["가입비 0원", "성비 균형 관리", "신원 확인 회원", "대면 소개팅 보장"],
    poolKicker: "CURATED MEN'S POOL",
    poolTitle: "능력과 매너를 함께 갖춘, 소개 가능한 남성 회원풀.",
    poolLead: "등록된 숫자만 보여드리는 방식이 아닙니다. 실제 만남 의사가 확인된 회원과 진행 중인 소개 현황을 함께 살피고, 여성·남성의 소개 흐름이 한쪽으로 쏠리지 않도록 성비 균형을 관리합니다.",
    poolImages: [
      { src: "/women-pool-man-v1.webp", label: "직업·기본 신원 확인" },
      { src: "/match-men-v2-2x.webp", label: "현재 소개 가능 상태 확인" },
      { src: "/women-pool-man-v2.webp", label: "관계에 진지한 회원 중심" },
    ],
    poolPoints: [
      { title: "성비 밸런스", body: "활동 중인 여성·남성 회원과 소개 진행 상황을 함께 확인합니다." },
      { title: "소개 가능 상태", body: "지금 실제로 만남 의사가 있는 회원을 중심으로 제안합니다." },
      { title: "조건과 분위기", body: "직업만이 아니라 생활권, 성향과 서로의 희망 조건까지 살핍니다." },
    ],
    promiseTitle: "좋은 만남에 필요한 기준은 분명하게.",
    promiseLead: "프로필만 많이 보여주는 방식이 아니라, 담당자가 조건과 의사를 확인한 뒤 실제로 만날 수 있는 한 분을 연결합니다.",
    criteriaTitle: "능력과 매너를 함께 보는 회원풀",
    criteria: ["직업·신원 확인", "20·30대 중심", "1:1 비공개 제안", "미혼 회원"],
    promises: [
      { title: "대면 소개팅 보장", body: "카톡만 주고받다 끝나는 소개가 아닙니다. 두 분이 매칭에 동의하면 담당자가 실제 만남 날짜와 장소까지 조율합니다." },
      { title: "신원 확인된 회원", body: "직업과 미혼 여부 등 기본 신원 확인 절차를 거친 회원 중에서 소개합니다." },
      { title: "성사된 매칭만 결제", body: "가입비는 0원입니다. 서로 만나보겠다는 의사가 확인된 매칭에만 33,000원이 발생합니다." },
    ],
    stickyLabel: "가입비 없이 여성 신청하기",
  },
  men: {
    kicker: "FOR MEN · 39 OR UNDER",
    title: <>원하는 분과,<br /><span className={styles.lemonMark}>매칭된 뒤 결제.</span></>,
    lead: "가입비 0원. 원하는 거리, 나이, 스타일에 맞는 분을 제안받고 두 분 모두 동의해 매칭이 성사된 뒤에만 44,000원을 결제합니다.",
    price: "44,000원",
    condition: "39세 이하 미혼 남성만 신청 가능",
    heroImage: "/match-men-v2-2x.webp",
    heroImageClass: styles.heroImageMen,
    highlights: ["가입비 0원", "이상형 매칭 후 결제", "성비 균형 관리", "대면 소개팅 보장"],
    poolKicker: "CURATED WOMEN'S POOL",
    poolTitle: "거리·나이·스타일까지, 원하는 기준으로 살펴보는 여성 회원풀.",
    poolLead: "막연한 랜덤 소개가 아닙니다. 실제 소개가 가능한 여성 회원과 남성 회원의 진행 상황을 함께 보며 성비 균형을 관리하고, 먼저 여쭤본 이상형 조건에 맞춰 한 분씩 제안합니다.",
    poolImages: [
      { src: "/men-pool-woman-v1.webp", label: "희망 거리·나이 확인" },
      { src: "/match-women-v2-2x.webp", label: "원하는 스타일 맞춤 제안" },
      { src: "/men-pool-woman-v2.webp", label: "현재 소개 가능 상태 확인" },
    ],
    poolPoints: [
      { title: "성비 밸런스", body: "활동 중인 여성·남성 회원과 소개 진행 상황을 함께 확인합니다." },
      { title: "이상형 조건", body: "원하는 거리·나이·스타일을 담당자가 먼저 구체적으로 확인합니다." },
      { title: "양측 동의", body: "한쪽만 마음에 든다고 성사되지 않습니다. 서로 동의한 소개만 진행합니다." },
    ],
    promiseTitle: "카톡만 하다 끝나는 소개팅이 아닙니다.",
    promiseLead: "서로 프로필을 확인하고 두 분 모두 동의한 매칭만 진행합니다. 담당자가 일정과 장소까지 맡아 실제 대면 소개팅으로 연결합니다.",
    criteriaTitle: "원하는 이상형 조건부터 확인",
    criteria: ["활동 거리", "선호 나이", "원하는 스타일", "상호 프로필 동의"],
    promises: [
      { title: "이상형과 매칭 후 결제", body: "마음에 드는 분이 확인되기 전에는 가입비도, 매칭비도 없습니다. 두 분 모두 동의해 성사된 매칭에만 44,000원을 결제합니다." },
      { title: "대면 소개팅 보장", body: "연락처만 전달하고 끝내지 않습니다. 담당자가 실제 만남 날짜와 장소를 조율해 소개팅으로 연결합니다." },
      { title: "신원 확인된 회원", body: "미혼 여부와 기본 신원을 확인한 회원 중 거리·나이·스타일 조건에 맞춰 제안합니다." },
    ],
    stickyLabel: "가입비 없이 남성 신청하기",
  },
} as const;

export default function GenderLanding({ gender }: { gender: GenderKey }) {
  const content = CONTENT[gender];

  return (
    <div className={styles.site}>
      <RenewalHeader applyHref="#apply" applyLabel="무료 신청" />
      <main>
        <section className={styles.genderHero}>
          <div className={`${styles.shell} ${styles.genderHeroGrid}`}>
            <div className={styles.genderHeroCopy}>
              <div className={styles.genderKicker}>{content.kicker}</div>
              <h1 className={styles.genderTitle}>{content.title}</h1>
              <p className={styles.genderLead}>{content.lead}</p>
              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>매칭 성사 시</span>
                <span className={styles.priceValue}>{content.price}</span>
                <span className={styles.priceZero}>가입비 0원</span>
              </div>
              <a className={styles.primaryButton} href="#apply">가입 조건 확인하고 신청</a>
              <p className={styles.eligibilityNote}>{content.condition} · 매칭 전 신원 확인 절차가 진행됩니다.</p>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={content.heroImage}
                alt="소개팅 서비스를 이용하는 성인 남녀의 연출 이미지"
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1220px) 52vw, 650px"
                quality={92}
                className={`${styles.heroImage} ${content.heroImageClass}`}
              />
              <span className={styles.imageCaption}>서비스 이해를 돕기 위한 연출 이미지</span>
            </div>
          </div>
        </section>

        <section className={styles.detailSignal} aria-label="핵심 서비스 특징">
          <div className={`${styles.shell} ${styles.detailSignalInner}`}>
            {content.highlights.map((item, index) => (
              <span key={item}><b>0{index + 1}</b>{item}</span>
            ))}
          </div>
        </section>

        <section id="member-pool" className={styles.showcaseSection}>
          <div className={styles.shell}>
            <div className={styles.showcaseIntro}>
              <div>
                <span className={styles.eyebrow}>{content.poolKicker}</span>
                <h2>{content.poolTitle}</h2>
              </div>
              <div className={styles.showcaseLead}>
                <p>{content.poolLead}</p>
                <strong>많이 보여주는 것보다, 지금 서로 만나볼 이유가 있는 한 분을 찾습니다.</strong>
              </div>
            </div>

            <div className={styles.showcaseMosaic}>
              {content.poolImages.map((item, index) => (
                <figure key={item.src} className={`${styles.showcaseCard} ${index === 1 ? styles.showcaseCardLift : ""}`}>
                  <Image
                    src={item.src}
                    alt="회원풀의 분위기를 보여주는 성인 모델 연출 이미지"
                    fill
                    sizes="(max-width: 720px) calc(100vw - 28px), (max-width: 1180px) 31vw, 370px"
                    quality={91}
                    className={styles.showcaseImage}
                  />
                  <span className={styles.showcaseImageShade} aria-hidden="true" />
                  <figcaption>
                    <strong>{item.label}</strong>
                    <span>서비스 연출 이미지 · 실제 회원 사진이 아닙니다</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className={styles.poolPointGrid}>
              {content.poolPoints.map((point) => (
                <article key={point.title} className={styles.poolPointCard}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="matching" className={styles.journeySection}>
          <Image
            src="/hero-meeting-v2-4k.webp"
            alt="카페에서 대화를 나누는 성인 남녀의 연출 이미지"
            fill
            sizes="100vw"
            quality={92}
            className={styles.journeyImage}
          />
          <span className={styles.journeyShade} aria-hidden="true" />
          <div className={`${styles.shell} ${styles.journeyContent}`}>
            <div className={styles.journeyIntro}>
              <span>FROM PROFILE TO REAL MEETING</span>
              <h2><span className={styles.noWrap}>카톡만 하다</span><br /><span className={styles.noWrap}>끝나는 소개가 아닌,</span><br />실제 만남.</h2>
              <p>연락처만 넘긴 뒤 알아서 이어가라는 방식이 아닙니다. 양쪽 의사를 확인하고, 성사된 소개의 날짜와 장소까지 담당자가 조율합니다.</p>
            </div>
            <div className={styles.journeyGrid}>
              {MATCHING_STEPS.map((step) => (
                <article key={step.number} className={styles.journeyCard}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <span className={styles.journeyCaption}>서비스 이해를 돕기 위한 연출 이미지</span>
          </div>
        </section>

        <section className={styles.promiseSection}>
          <div className={styles.shell}>
            <div className={styles.promiseIntro}>
              <div>
                <span className={styles.eyebrow}>OUR PROMISE</span>
                <h2>{content.promiseTitle}</h2>
              </div>
              <p>{content.promiseLead}</p>
            </div>
            <div className={styles.promiseGrid}>
              {content.promises.map((promise, index) => (
                <article key={promise.title} className={`${styles.promiseCard} ${index === 0 ? styles.promiseCardFeatured : ""}`}>
                  <div className={styles.promiseIndex}>0{index + 1}</div>
                  <h3>{promise.title}</h3>
                  <p>{promise.body}</p>
                </article>
              ))}
            </div>
            <div className={styles.matchCriteria}>
              <strong>{content.criteriaTitle}</strong>
              <div className={styles.criteriaList}>
                {content.criteria.map((item) => <span key={item} className={styles.criteriaItem}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className={styles.applySection}>
          <div className={`${styles.shell} ${styles.applyGrid}`}>
            <div className={styles.applyIntro}>
              <span className={styles.eyebrow}>SIMPLE APPLICATION</span>
              <h2>1분이면<br />신청이 끝나요.</h2>
              <p>가입비 없이 기본 정보만 남겨주세요. 담당 매칭사가 확인한 뒤 연락드려 원하는 거리·나이·스타일 등 희망 조건을 더 여쭙습니다.</p>
              <p className={styles.kakaoNote}>추가 문의는 카톡 ID <strong>inyeon_</strong> 으로 보내주세요. 화면 오른쪽 아래 실시간 상담도 그대로 이용할 수 있습니다.</p>
            </div>
            <ApplicationForm gender={gender} />
          </div>
        </section>
      </main>
      <RenewalFooter />
      <a className={styles.stickyApply} href="#apply">{content.stickyLabel}<span aria-hidden="true">↓</span></a>
      <ChatWidget />
    </div>
  );
}
