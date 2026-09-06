import Image from "next/image";
import ArtDirectedImage from "@/components/ArtDirectedImage";
import ApplicationForm from "@/components/ApplicationForm";
import ChatWidget from "@/components/ChatWidget";
import StickyApplyButton from "@/components/StickyApplyButton";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";

const CONTENT = {
  women: {
    kicker: "1:1 연애정보회사 · 여성 안내",
    title: <>괜찮은 사람과,<br /><span className={styles.lemonMark}>부담 없는 시작</span></>,
    lead: "수도권을 중심으로 진행합니다. 가입비는 0원이며, 두 분 모두 만남에 동의해 매칭이 성사된 뒤에만 기본 1회권 22,000원을 결제합니다.",
    price: "1회권 22,000원",
    priceLabel: "매칭 성사 후 결제 · 기본가",
    costLine: "가입비 0원 · 매칭 성사 후 기본 1회권 22,000원 (상세조건 옵션 추가 시 별도 비용)",
    condition: "한국나이 기준 1988년생까지의 미혼 여성만 신청 가능",
    heroImage: "/inyeon-2026/male-01-v4.webp",
    heroImageClass: styles.heroImageWomen,
    highlights: ["가입비 0원", "매칭 후 결제", "제안 횟수 제한 없음", "대면 소개팅"],
    poolKicker: "CURATED MEN'S POOL",
    poolTitle: "능력과 매너를 함께 갖춘, 소개 가능한 남성 회원풀",
    poolLead: "등록된 숫자만 보여드리는 방식이 아닙니다. 실제 만남 의사가 확인된 회원과 진행 중인 소개 현황을 함께 살피고, 여성·남성의 소개 흐름이 한쪽으로 쏠리지 않도록 성비 균형을 관리합니다.",
    poolImages: [
      { src: "/inyeon-2026/male-02-v4.webp", label: "기본 신원 확인" },
      { src: "/inyeon-2026/male-03-v4.webp", label: "현재 소개 가능 상태 확인" },
      { src: "/inyeon-2026/male-04-v4.webp", label: "관계에 진지한 회원 중심" },
    ],
    poolPoints: [
      { title: "성비 밸런스", body: "활동 중인 여성·남성 회원과 소개 진행 상황을 함께 확인합니다." },
      { title: "소개 가능 상태", body: "지금 실제로 만남 의사가 있는 회원을 중심으로 제안합니다." },
      { title: "결이 맞는 제안", body: "담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안합니다." },
    ],
    promiseTitle: "좋은 만남에 필요한 기준은 분명하게",
    promiseLead: "담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 횟수 제한 없이 제안합니다.",
    criteriaTitle: "부담 없이 시작하는 이용 방식",
    criteria: ["신원 확인", "매칭 후 결제", "횟수 제한 없는 제안", "미혼 회원"],
    promises: [
      { title: "대면 소개팅 보장", body: "카톡만 주고받다 끝나는 소개가 아닙니다. 두 분이 매칭에 동의하면 담당자가 실제 만남 날짜와 장소까지 조율합니다." },
      { title: "신원 확인된 회원", body: "미혼 여부 등 기본 신원 확인 절차를 거친 회원 중에서 소개합니다." },
      { title: "매칭 성사 후에만 결제", body: "가입비는 0원입니다. 매칭이 성사된 뒤에만 기본 1회권 22,000원을 결제하며, 상세조건 옵션을 추가하는 경우에만 별도 비용이 발생합니다." },
    ],
    preferenceSummary: "매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안",
    steps: [
      { number: "01", title: "기본 정보 신청", body: "연락처·지역·출생연도·직업·키만 간단히 남깁니다. 신청은 0원입니다." },
      { number: "02", title: "소개 의사 확인", body: "담당 매니저가 연락드려 소개 의사와 기본 정보를 확인합니다." },
      { number: "03", title: "결이 맞는 프로필 제안", body: "매니저가 프로필을 보고 결이 맞을 것 같은 분을 횟수 제한 없이 제안드립니다." },
      { number: "04", title: "양측 소개 의사 확인", body: "한쪽만 마음에 든다고 성사되지 않습니다. 두 분 모두 원할 때만 다음 단계로 갑니다." },
      { number: "05", title: "성사 후 결제 · 대면 조율", body: "매칭이 성사되면 기본 1회권 22,000원을 결제하고, 담당자가 날짜와 장소를 조율합니다." },
    ],
    applicationLead: "매칭이 성사되기 전까지 비용은 0원입니다. 기본 정보만 남기면 담당 매니저가 확인 후 연락드립니다.",
    faqs: [
      { question: "신청하면 바로 결제하나요?", answer: "아니요. 가입비는 0원이며, 두 분 모두 소개를 원해 매칭이 성사된 뒤에만 기본 1회권 22,000원을 결제합니다." },
      { question: "기본 1회권 외에 추가 비용이 있나요?", answer: "기본가는 베이직 매칭 기준입니다. 상세조건 옵션을 추가하실 경우 별도 비용이 발생하며, 자세한 내용은 상담에서 안내드립니다." },
      { question: "상세조건 옵션을 안 하면 불이익이 있나요?", answer: "없습니다. 옵션을 선택하지 않아도 진행 기간 등에서 차이나 불이익 없이 동일하게 제안드립니다." },
      { question: "어떤 기준으로 제안해 주나요?", answer: "조건표에 맞춰 기계적으로 고르기보다, 담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안드립니다. 제안 횟수에는 제한이 없습니다." },
      { question: "어떤 상태가 ‘매칭 성사’인가요?", answer: "담당자가 제안한 프로필을 서로 확인한 뒤, 두 분 모두 실제로 만나보겠다고 동의한 상태를 뜻합니다." },
      { question: "카톡으로만 연결되고 끝나나요?", answer: "아니요. 연락처만 전달하고 끝내지 않습니다. 양측 동의 후 담당자가 날짜와 장소를 조율해 실제 대면 소개팅까지 안내합니다." },
      { question: "실회원만 소개하나요?", answer: "네. 인연연구소는 100% 실제 소개 의사가 확인된 실회원으로 진행합니다." },
    ],
    stickyLabel: "가입비 0원 · 성사 후 22,000원",
  },
  men: {
    kicker: "1:1 연애정보회사 · 남성 안내",
    title: <>괜찮은 여성 회원이 많은,<br /><span className={styles.lemonMark}>1:1 대면 소개팅</span></>,
    lead: "수도권을 중심으로 진행합니다. 가입비는 0원이며, 두 분 모두 만남에 동의해 매칭이 성사된 뒤에만 기본 1회권 33,000원을 결제합니다. 괜찮은 여성 회원분들이 많이 활동하고 있어요.",
    price: "1회권 33,000원",
    priceLabel: "매칭 성사 후 결제 · 기본가",
    costLine: "가입비 0원 · 매칭 성사 후 기본 1회권 33,000원 (상세조건 옵션 추가 시 별도 비용)",
    condition: "한국나이 기준 1984년생까지의 미혼 남성만 신청 가능",
    heroImage: "/inyeon-2026/female-01-v4.webp",
    heroImageClass: styles.heroImageMen,
    highlights: ["가입비 0원", "매칭 후 결제", "제안 횟수 제한 없음", "대면 소개팅"],
    poolKicker: "CURATED WOMEN'S POOL",
    poolTitle: "괜찮은 여성 회원이 많은, 소개 가능한 회원풀",
    poolLead: "막연한 랜덤 소개가 아닙니다. 괜찮은 여성 회원분들이 많이 활동 중이며, 현재 소개 가능한 상태와 성비 균형을 함께 관리합니다. 담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안합니다.",
    poolImages: [
      { src: "/inyeon-2026/female-02-v4.webp", label: "괜찮은 여성 회원 다수" },
      { src: "/inyeon-2026/female-03-v4.webp", label: "결이 맞는 분 제안" },
      { src: "/inyeon-2026/female-04-v4.webp", label: "현재 소개 가능 상태 확인" },
    ],
    poolPoints: [
      { title: "여성 회원 비중", body: "괜찮은 여성 회원분들이 많이 활동해 소개 흐름이 원활합니다." },
      { title: "결이 맞는 제안", body: "담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안합니다." },
      { title: "양측 동의", body: "한쪽만 마음에 든다고 성사되지 않습니다. 서로 동의한 소개만 진행합니다." },
    ],
    promiseTitle: "카톡만 하다 끝나는 소개팅이 아닙니다",
    promiseLead: "서로 프로필을 확인하고 두 분 모두 동의한 매칭만 진행합니다. 담당자가 일정과 장소까지 맡아 실제 대면 소개팅으로 연결합니다.",
    criteriaTitle: "부담 없이 시작하는 이용 방식",
    criteria: ["매칭 후 결제", "괜찮은 여성 회원풀", "상호 프로필 동의", "미혼 회원"],
    promises: [
      { title: "매칭 성사 후에만 결제", body: "가입비는 0원입니다. 매칭이 성사된 뒤에만 기본 1회권 33,000원을 결제하며, 상세조건 옵션을 추가하는 경우에만 별도 비용이 발생합니다." },
      { title: "대면 소개팅 보장", body: "연락처만 전달하고 끝내지 않습니다. 담당자가 실제 만남 날짜와 장소를 조율해 소개팅으로 연결합니다." },
      { title: "신원 확인된 회원", body: "미혼 여부 등 기본 신원 확인 절차를 거친 회원 중에서 소개합니다." },
    ],
    preferenceSummary: "매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안",
    steps: [
      { number: "01", title: "기본 정보 신청", body: "연락처·지역·출생연도·직업·키만 간단히 남깁니다. 신청은 0원입니다." },
      { number: "02", title: "소개 의사 확인", body: "담당 매니저가 연락드려 소개 의사와 기본 정보를 확인합니다." },
      { number: "03", title: "결이 맞는 프로필 제안", body: "매니저가 프로필을 보고 결이 맞을 것 같은 분을 횟수 제한 없이 제안드립니다." },
      { number: "04", title: "양측 소개 의사 확인", body: "한쪽만 마음에 든다고 성사되지 않습니다. 두 분 모두 원할 때만 다음 단계로 갑니다." },
      { number: "05", title: "성사 후 결제 · 대면 조율", body: "매칭이 성사되면 기본 1회권 33,000원을 결제하고, 담당자가 날짜와 장소를 조율합니다." },
    ],
    applicationLead: "매칭이 성사되기 전까지 비용은 0원입니다. 기본 정보만 남기면 담당 매니저가 확인 후 연락드립니다.",
    faqs: [
      { question: "신청하면 바로 결제하나요?", answer: "아니요. 가입비는 0원이며, 두 분 모두 소개를 원해 매칭이 성사된 뒤에만 기본 1회권 33,000원을 결제합니다." },
      { question: "기본 1회권 외에 추가 비용이 있나요?", answer: "기본가는 베이직 매칭 기준입니다. 상세조건 옵션을 추가하실 경우 별도 비용이 발생하며, 자세한 내용은 상담에서 안내드립니다." },
      { question: "상세조건 옵션을 안 하면 불이익이 있나요?", answer: "없습니다. 옵션을 선택하지 않아도 진행 기간 등에서 차이나 불이익 없이 동일하게 제안드립니다." },
      { question: "어떤 기준으로 제안해 주나요?", answer: "조건표에 맞춰 기계적으로 고르기보다, 담당 매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안드립니다. 제안 횟수에는 제한이 없습니다." },
      { question: "어떤 상태가 ‘매칭 성사’인가요?", answer: "담당자가 제안한 프로필을 서로 확인한 뒤, 두 분 모두 실제로 만나보겠다고 동의한 상태를 뜻합니다." },
      { question: "카톡으로만 연결되고 끝나나요?", answer: "아니요. 연락처만 전달하고 끝내지 않습니다. 양측 동의 후 담당자가 날짜와 장소를 조율해 실제 대면 소개팅까지 안내합니다." },
      { question: "실회원만 소개하나요?", answer: "네. 인연연구소는 100% 실제 소개 의사가 확인된 실회원으로 진행합니다." },
    ],
    stickyLabel: "가입비 0원 · 성사 후 33,000원",
  },
} as const;

export default function GenderLanding({ gender }: { gender: GenderKey }) {
  const content = CONTENT[gender];
  const featuredGender = gender === "women" ? "남성" : "여성";
  const comparisonRows = [
    {
      label: "희망 조건",
      before: "연락을 시작한 뒤 서로 확인",
      ours: content.preferenceSummary,
    },
    {
      label: "성비 운영",
      before: "가입 인원 중심으로 확인",
      ours: "현재 소개 가능한 회원과 진행 중인 매칭 수까지 함께 살펴 균형 관리",
    },
    {
      label: "연결 기준",
      before: "연락처 전달이 곧 소개",
      ours: "두 분 모두 프로필을 보고 소개에 동의할 때만 매칭 성사",
    },
    {
      label: "진행 범위",
      before: "카톡 연결 이후 직접 조율",
      ours: "연락처 전달에서 끝내지 않고 대면 날짜와 장소까지 안내",
    },
    {
      label: "비용 시점",
      before: "서비스마다 기준이 다름",
      ours: content.costLine,
    },
  ];
  const matchingSteps = content.steps;

  return (
    <div className={styles.site}>
      <RenewalHeader applyHref="#apply" applyLabel="무료 신청" />
      <main>
        <section className={styles.genderHero} data-floating-ui-guard>
          <div className={`${styles.shell} ${styles.genderHeroGrid}`}>
            <div className={styles.genderHeroCopy}>
              <div className={styles.genderKicker}>{content.kicker}</div>
              <h1 className={styles.genderTitle}>{content.title}</h1>
              <p className={styles.genderLead}>{content.lead}</p>
              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>{content.priceLabel}</span>
                <span className={styles.priceValue}>{content.price}</span>
                <span className={styles.priceZero}>가입비 0원</span>
              </div>
              <a className={styles.primaryButton} href="#apply">가입 조건 확인하고 신청</a>
              <p className={styles.eligibilityNote}>{content.condition} · 매칭 전 신원 확인 절차가 진행됩니다.</p>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={content.heroImage}
                alt={`${featuredGender} 회원풀의 분위기를 보여주는 연출 이미지`}
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1220px) 52vw, 650px"
                quality={88}
                className={`${styles.heroImage} ${content.heroImageClass}`}
              />
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

        <section id="member-pool" className={styles.showcaseSection} data-floating-ui-guard>
          <div className={styles.shell}>
            <div className={styles.showcaseIntro}>
              <div>
                <span className={styles.eyebrow}>{content.poolKicker}</span>
                <h2>{content.poolTitle}</h2>
              </div>
              <div className={styles.showcaseLead}>
                <p>{content.poolLead}</p>
                <strong>조건에 맞는 프로필을, 마음에 들 때까지 제안합니다</strong>
              </div>
            </div>

            <div
              className={styles.showcaseMosaic}
              role="region"
              aria-label={`${featuredGender} 회원풀 연출 이미지 모음`}
              tabIndex={0}
            >
              {content.poolImages.map((item, index) => (
                <figure key={item.src} className={`${styles.showcaseCard} ${index === 1 ? styles.showcaseCardLift : ""}`}>
                  <Image
                    src={item.src}
                    alt={`${item.label}을 표현한 ${featuredGender} 인물 연출 이미지`}
                    fill
                    sizes="(max-width: 720px) min(78vw, 330px), (max-width: 1180px) 31vw, 370px"
                    quality={86}
                    className={styles.showcaseImage}
                  />
                  <span className={styles.showcaseImageShade} aria-hidden="true" />
                  <figcaption>
                    <strong>{item.label}</strong>
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

        <section className={styles.curationSection} data-floating-ui-guard>
          <div className={styles.shell}>
            <div className={styles.curationIntro}>
              <span className={styles.eyebrow}>MATCHING, WITH A HUMAN TOUCH</span>
              <h2>자동 추천만으로는 알기 어려운 것까지,<br />담당자가 함께 봅니다</h2>
              <p>조건표 한 줄만 맞추는 방식이 아닙니다. 신청 정보와 희망 조건, 현재 소개 가능 상태를 함께 살펴 마음에 드는 분을 찾을 때까지 프로필을 제안합니다.</p>
            </div>

            <div className={styles.curationBody}>
              <figure className={styles.consultantVisual}>
                <ArtDirectedImage
                  desktopSrc="/inyeon-2026/consultant-v4.webp"
                  mobileSrc="/inyeon-2026/consultant-mobile-v4.webp"
                  alt="무지 프로필 카드와 태블릿으로 매칭 조건을 검토하는 담당자의 연출 모습"
                  className={styles.consultantImage}
                  media="(max-width: 900px)"
                  sizes="1046px"
                  mobileSizes="calc(100vw - 28px)"
                  quality={88}
                />
                <span className={styles.consultantShade} aria-hidden="true" />
                <figcaption>
                  <strong>마음에 들 때까지 프로필 제안</strong>
                  <span>담당자가 조건과 소개 의사를 확인합니다</span>
                </figcaption>
              </figure>

              <div className={styles.comparisonPanel}>
                <div className={styles.comparisonHeading}>
                  <span>WHY INYEON LAB</span>
                  <h3>연락처만 받는 소개와는 다릅니다</h3>
                  <p>프로필 확인부터 대면 일정 조율까지, 어떤 기준으로 진행되는지 숨기지 않습니다.</p>
                </div>
                <div className={styles.comparisonHeaders} aria-hidden="true">
                  <span />
                  <span>연락처 전달형</span>
                  <strong>인연연구소</strong>
                </div>
                <div className={styles.comparisonRows}>
                  {comparisonRows.map((row) => (
                    <div key={row.label} className={styles.comparisonRow}>
                      <strong className={styles.comparisonLabel}>{row.label}</strong>
                      <span className={styles.comparisonBefore}><small>연락처 전달형</small>{row.before}</span>
                      <span className={styles.comparisonOurs}><small>인연연구소</small>{row.ours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="matching" className={styles.journeySection} data-floating-ui-guard>
          <ArtDirectedImage
            desktopSrc="/inyeon-2026/meeting-wide-v4.webp"
            mobileSrc="/inyeon-2026/meeting-mobile-v4.webp"
            alt="밝은 카페에서 대화를 나누는 20대 남녀의 연출 모습"
            className={styles.journeyImage}
            media="(max-width: 900px)"
            sizes="100vw"
            mobileSizes="(max-width: 480px) 600px, 100vw"
            quality={88}
          />
          <span className={styles.journeyShade} aria-hidden="true" />
          <div className={`${styles.shell} ${styles.journeyContent}`}>
            <div className={styles.journeyIntro}>
              <span>FROM PROFILE TO REAL MEETING</span>
              <h2><span className={styles.noWrap}>카톡만 하다</span><br /><span className={styles.noWrap}>끝나는 소개가 아닌,</span><br />실제 만남</h2>
              <p>연락처만 넘긴 뒤 알아서 이어가라는 방식이 아닙니다. 양쪽 의사를 확인하고, 성사된 소개의 날짜와 장소까지 담당자가 조율합니다.</p>
            </div>
            <div
              className={styles.journeyGrid}
              role="region"
              aria-label="신청부터 대면 소개팅까지의 5단계"
              tabIndex={0}
            >
              {matchingSteps.map((step) => (
                <article key={step.number} className={styles.journeyCard}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <span className={styles.journeySwipeHint}>옆으로 넘겨 5단계를 확인해보세요.</span>
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

        <section className={styles.faqDetailSection}>
          <div className={`${styles.shell} ${styles.faqDetailLayout}`}>
            <div className={styles.faqDetailIntro}>
              <span className={styles.eyebrow}>BEFORE YOU APPLY</span>
              <h2>신청 전에<br />궁금한 점</h2>
              <p>가입비, 매칭 성사 기준, 성비 관리와 실제 만남까지의 진행 범위를 먼저 확인해보세요.</p>
              <a href="#apply">가입 조건 확인하고 신청</a>
            </div>
            <div className={styles.faqDetailList}>
              {content.faqs.map((faq, index) => (
                <details key={faq.question} className={styles.faqDetailItem} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" className={styles.applySection} data-floating-ui-guard>
          <div className={`${styles.shell} ${styles.applyGrid}`}>
            <div className={styles.applyIntro}>
              <span className={styles.eyebrow}>SIMPLE APPLICATION</span>
              <h2>1분이면<br />신청이 끝나요</h2>
              <p>{content.applicationLead}</p>
              <p className={styles.kakaoNote}>
                추가 문의는 <strong>카톡 ID inyeon_</strong> 으로 보내주세요. 화면 오른쪽 아래 실시간 상담도 그대로 이용할 수 있습니다.
              </p>
            </div>
            <ApplicationForm gender={gender} />
          </div>
        </section>
      </main>
      <RenewalFooter />
      <StickyApplyButton label={content.stickyLabel} />
      <ChatWidget />
    </div>
  );
}
