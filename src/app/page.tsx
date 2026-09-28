import Image from "next/image";
import Link from "next/link";
import ArtDirectedImage from "@/components/ArtDirectedImage";
import ChatWidget from "@/components/ChatWidget";
import ConsultButton from "@/components/ConsultButton";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import { HeartIcon } from "@/components/SiteIcons";
import styles from "@/components/renewal.module.css";

const ENTRANCES = [
  {
    href: "/men",
    eyebrow: "FOR MEN",
    title: "남성 회원 안내",
    condition: "한국나이 기준 1984년생까지",
    price: "1회권 33,000원",
    note: "매칭 성사 후 결제 · 기본가 (상세조건 옵션 별도)",
    description: "가입비 없이 이용 방식과 공개 금액을 확인하세요",
  },
  {
    href: "/women",
    eyebrow: "FOR WOMEN",
    title: "여성 회원 안내",
    condition: "한국나이 기준 1988년생까지",
    price: "1회권 22,000원",
    note: "매칭 성사 후 결제 · 기본가 (상세조건 옵션 별도)",
    description: "가입비 없이 이용 방식과 공개 금액을 확인하세요",
  },
] as const;

const SATISFACTION_POINTS = [
  { title: "만남 일정 조율", body: "매칭되면 날짜·장소까지 직접 조율" },
  { title: "매칭 후 결제", body: "가입비 0원, 성사된 뒤에만 결제" },
  { title: "부담 없는 비용", body: "기본 1회권, 옵션도 부담 없이" },
  { title: "남녀 성비 균형", body: "성비를 비슷하게 관리해 원활한 소개" },
] as const;

const PROCESS = [
  {
    number: "01",
    title: "가입비 없이 신청",
    body: "기본 정보와 활동 지역을 간단히 남겨주세요",
    image: "/inyeon-2026/process-01-v2.webp",
    alt: "밝은 공간에서 스마트폰으로 소개팅을 신청하는 20대 여성의 연출 이미지",
  },
  {
    number: "02",
    title: "결이 맞는 제안",
    body: "매니저가 프로필을 보고 결이 맞을 것 같은 분을 제안해요",
    image: "/inyeon-2026/process-02-v2.webp",
    alt: "매칭 담당자와 상담하는 20대 남성의 연출 이미지",
  },
  {
    number: "03",
    title: "양측 소개 의사 확인",
    body: "두 분 모두 만나고 싶을 때만 매칭이 성사돼요",
    image: "/inyeon-2026/process-03-v2.webp",
    alt: "서로 다른 공간에서 소개 프로필을 확인하는 20대 남녀의 연출 이미지",
  },
  {
    number: "04",
    title: "성사 후 결제 · 대면 조율",
    body: "매칭이 성사되면 기본 1회권을 결제하고 날짜와 장소를 조율해요",
    image: "/inyeon-2026/process-04-v2.webp",
    alt: "밝은 카페에서 첫 만남의 대화를 나누는 20대 남녀의 연출 이미지",
  },
] as const;

const HOME_MEMBER_POOL = [
  {
    src: "/inyeon-2026/male-02-v4.webp",
    alt: "밝은 야외 공간에서 하늘색 재킷을 입은 20대 남성의 서비스 연출 이미지",
    label: "MEN · MOOD 01",
  },
  {
    src: "/inyeon-2026/female-02-v4.webp",
    alt: "화이트와 스카이블루 공간에서 미소 짓는 20대 여성의 서비스 연출 이미지",
    label: "WOMEN · MOOD 01",
  },
  {
    src: "/inyeon-2026/male-03-v4.webp",
    alt: "밝은 전시 공간에서 아쿠아 재킷을 입은 20대 남성의 서비스 연출 이미지",
    label: "MEN · MOOD 02",
  },
  {
    src: "/inyeon-2026/female-03-v4.webp",
    alt: "푸른 하늘이 보이는 공간에서 밝게 웃는 20대 여성의 서비스 연출 이미지",
    label: "WOMEN · MOOD 02",
  },
  {
    src: "/inyeon-2026/male-04-v4.webp",
    alt: "화이트 셔츠와 스카이블루 팬츠를 입은 20대 남성의 서비스 연출 이미지",
    label: "MEN · MOOD 03",
  },
  {
    src: "/inyeon-2026/female-04-v4.webp",
    alt: "화이트와 아쿠아 공간에서 하늘색 재킷을 입은 20대 여성의 서비스 연출 이미지",
    label: "WOMEN · MOOD 03",
  },
] as const;

const FAQS = [
  {
    question: "인연연구소는 소개팅 앱인가요",
    answer: "아니요, 앱이 아닌 1:1 후불제 맞춤형 소개팅입니다. 담당 매니저가 양측의 소개 의사를 확인해 1:1로 연결합니다",
  },
  {
    question: "가입비와 결제 시점은 어떻게 되나요",
    answer: "가입비는 없고, 남녀 모두 매칭이 성사된 뒤에만 결제합니다. 기본 1회권은 여성 22,000원, 남성 33,000원이며 프로필 제안 횟수에는 제한이 없습니다",
  },
  {
    question: "기본가 외에 추가 비용이 있나요",
    answer: "기본가는 베이직 매칭 기준입니다. 지역·희망 나이·키·직업군·외모 우선매칭 등 원하시는 조건을 옵션당 수천 원대의 부담 없는 비용으로 추가하실 수 있으며, 자세한 내용은 상담에서 안내드립니다. 옵션을 선택하지 않아도 진행 기간 등 불이익은 없습니다",
  },
  {
    question: "정말 대면 소개팅까지 진행하나요",
    answer: "네. 매칭이 성사되면 담당자가 날짜와 장소를 직접 조율해 대면 소개팅으로 연결합니다",
  },
  {
    question: "어느 지역에서 진행하나요",
    answer: "수도권을 중심으로 진행합니다. 자세한 가능 지역은 신청 후 상담에서 확인할 수 있습니다",
  },
  {
    question: "남성 신청 가능 연령은 어떻게 확인하나요",
    answer: "남성은 만 나이가 아닌 한국나이 기준으로 1984년생까지 신청할 수 있습니다",
  },
] as const;

export default function Home() {
  return (
    <div className={`${styles.site} ${styles.homeSite}`}>
      <RenewalHeader />
      <main>
        <section className={styles.dateHero} aria-labelledby="home-title">
          <div className={styles.dateHeroGrid}>
            <div className={styles.dateHeroCopy}>
              <span className={styles.dateHeroKicker}>
                <HeartIcon />
                1:1 후불제 맞춤형 소개팅
              </span>
              <h1 id="home-title">
                유일무이한 소개팅,
                <strong>회원님만을 생각한 맞춤 매칭</strong>
              </h1>
              <p className={styles.dateHeroLead}>
                담당 매니저가 프로필을 직접 보고 결이 맞을 것 같은 분을 소개해 드려요.
                가입비 없이 시작해 매칭이 성사된 뒤에만 결제합니다.
              </p>
              <div className={styles.dateHeroActions}>
                <Link href="/apply" className={styles.dateApplyButton}>
                  <HeartIcon />
                  소개팅 신청하기
                </Link>
                <ConsultButton className={styles.dateConsultButton} label="1:1 상담" tail="하기" />
              </div>
              <ul className={styles.dateHeroPoints} aria-label="인연연구소 소개팅 운영 원칙">
                {SATISFACTION_POINTS.map((point) => (
                  <li key={point.title}>
                    <strong>{point.title}</strong>
                    <span>{point.body}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className={styles.matchmaker}>
              <div className={styles.matchmakerArch}>
                <Image
                  src="/inyeon-2026/owner-portrait.webp"
                  alt="인연연구소 운영자 사진"
                  fill
                  priority
                  sizes="(max-width: 720px) 56vw, (max-width: 980px) 40vw, 400px"
                  quality={90}
                  className={styles.matchmakerImage}
                />
              </div>
              <p className={`${styles.bubble} ${styles.bubbleAsk}`} aria-hidden="true">
                결이 잘 맞을 것 같은 분이 있는데, 소개팅 해보실래요?
              </p>
              <p className={`${styles.bubble} ${styles.bubbleReply}`} aria-hidden="true">
                좋아요! 기대돼요 <HeartIcon />
              </p>
              <figcaption>직접 상담하고, 직접 주선합니다</figcaption>
            </figure>
          </div>

          <div id="choose" className={styles.trustGuide} aria-labelledby="guide-title">
            <div className={styles.trustGuideHead}>
              <span>남녀 안내</span>
              <h2 id="guide-title">나에게 맞는 안내를 확인하세요</h2>
            </div>
            <div className={styles.trustGuideCards}>
              {ENTRANCES.map((entrance, index) => (
                <Link
                  key={entrance.href}
                  href={entrance.href}
                  className={styles.trustGuideCard}
                  aria-label={`${entrance.title} 페이지로 이동. ${entrance.condition}. 매칭 성사 후 ${entrance.price}`}
                  data-gender={index === 0 ? "men" : "women"}
                >
                  <small>{entrance.eyebrow}</small>
                  <strong>{entrance.title}</strong>
                  <em>{entrance.condition.replace("한국나이 기준 ", "")}</em>
                  <b>{entrance.price}<span>매칭 성사 후 결제</span></b>
                  <i aria-hidden="true">→</i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="home-pool" className={styles.homePoolSection} aria-labelledby="home-pool-title">
          <div className={`${styles.shell} ${styles.homePoolHeader}`}>
            <div>
              <span className={styles.homeSectionEyebrow}>설레는 소개팅 분위기</span>
              <h2 id="home-pool-title">20·30대 중심의<br />설레는 1:1 소개팅</h2>
            </div>
            <div className={styles.homePoolLead}>
              <p>인연연구소가 지향하는 밝고 편안한 소개팅 분위기를 미리 확인해 보세요</p>
            </div>
          </div>

          <div className={styles.homePoolGalleryFrame}>
            <div
              className={styles.homePoolGallery}
              role="region"
              aria-label="남녀 서비스 연출 이미지 모음"
              tabIndex={0}
            >
              {HOME_MEMBER_POOL.map((item) => (
                <figure key={item.src} className={styles.homePoolCard}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 720px) 64vw, (max-width: 980px) 33vw, 17vw"
                    quality={86}
                    className={styles.homePoolImage}
                  />
                  <figcaption>
                    <strong>{item.label}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p className={styles.homePoolSwipeHint} aria-hidden="true">옆으로 밀어 더 보기 <span>→</span></p>
        </section>

        <section className={styles.homeIdentitySection}>
          <div className={`${styles.shell} ${styles.homeIdentityIntro}`}>
            <div>
              <span className={styles.homeSectionEyebrow}>대면 소개팅</span>
              <h2>대면 소개팅까지<br />책임지고 연결합니다</h2>
            </div>
            <p>
              인연연구소는 수도권 중심의 1:1 후불제 맞춤형 소개팅입니다.
              <br />
              두 분의 소개 의사를 확인한 뒤, 성사된 매칭은 담당자가 날짜와 장소까지 직접 조율해 대면 소개팅으로 연결합니다
            </p>
          </div>

          <div className={`${styles.shell} ${styles.homeIdentityGrid} ${styles.homeIdentitySolo}`}>
            <figure className={styles.homeMeetingVisual}>
              <ArtDirectedImage
                desktopSrc="/inyeon-2026/meeting-wide-v4.webp"
                mobileSrc="/inyeon-2026/meeting-mobile-v4.webp"
                alt="밝은 카페에서 대화를 나누는 20대 남녀의 연출 모습"
                className={styles.homeMeetingImage}
                media="(max-width: 900px)"
                sizes="1067px"
                mobileSizes="calc(100vw - 32px)"
                quality={88}
              />
              <span className={styles.homeMeetingShade} aria-hidden="true" />
              <figcaption>
                <span>매칭부터 첫 만남까지</span>
                <strong>대면 소개팅 보장</strong>
                <small>매칭 성사 후 날짜와 장소까지 담당자가 직접 조율</small>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="how-it-works" className={styles.homeProcessSection} aria-labelledby="process-title">
          <div className={styles.shell}>
            <div className={styles.homeProcessIntro}>
              <span className={styles.homeSectionEyebrow}>소개팅 진행 과정</span>
              <h2 id="process-title">소개팅 신청부터<br />첫 만남까지</h2>
              <p>앱처럼 막연하게 기다리지 않도록 진행 과정을 먼저 공개합니다</p>
            </div>
            <div
              className={styles.homeProcessGrid}
              role="region"
              aria-label="인연연구소 진행 과정"
              tabIndex={0}
            >
              {PROCESS.map((step) => (
                <article key={step.number} className={styles.homeProcessCard}>
                  <div className={styles.homeProcessMedia}>
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 720px) 80vw, (max-width: 960px) 48vw, 25vw"
                      quality={86}
                      className={styles.homeProcessImage}
                    />
                    <span className={styles.homeProcessNumber}>{step.number}</span>
                  </div>
                  <div className={styles.homeProcessCopy}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className={styles.homeProcessSwipeHint} aria-hidden="true">옆으로 밀어 과정 보기 <span>→</span></p>
          </div>
        </section>

        <section id="pricing" className={styles.homePricingSection} aria-labelledby="pricing-title">
          <div className={`${styles.shell} ${styles.homePricingLayout}`}>
            <div className={styles.homePricingIntro}>
              <span className={styles.homeSectionEyebrow}>소개팅 비용</span>
              <h2 id="pricing-title">투명한 기본가,<br />매칭 성사 후 결제</h2>
              <p>
                가입비는 0원, 결제는 매칭이 성사된 뒤에만 합니다.
                <br />
                아래는 기본 베이직 매칭 금액이며, 지역·나이·외모 우선매칭 등 원하시는 조건은
                부담 없는 비용의 옵션으로 추가할 수 있어요 (옵션 없이도 불이익 없음)
              </p>
              <div className={styles.homePricingZero}>
                <span>가입비</span>
                <strong>0원</strong>
              </div>
            </div>

            <div className={styles.homePriceCards}>
              {ENTRANCES.map((entrance) => (
                <Link key={entrance.href} href={entrance.href} className={styles.homePriceCard}>
                  <span>{entrance.title}</span>
                  <strong>{entrance.price.replace("매칭 성사 후 ", "")}</strong>
                  <small>{entrance.note}</small>
                  <p>{entrance.condition}</p>
                  <b>안내 확인하기 <i aria-hidden="true">→</i></b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.homeFaqSection}>
          <div className={`${styles.shell} ${styles.homeFaqLayout}`}>
            <div className={styles.homeFaqIntro}>
              <span className={styles.homeSectionEyebrow}>자주 묻는 질문</span>
              <h2>소개팅 신청 전에<br />확인해 주세요</h2>
              <p>서비스 방식과 가입 조건을 이해한 뒤 나에게 맞는 안내로 이동할 수 있어요</p>
            </div>
            <div className={styles.homeFaqList}>
              {FAQS.map((faq, index) => (
                <details key={faq.question} className={styles.homeFaqItem} open={index === 0}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="home-final" className={styles.homeFinalSection}>
          <ArtDirectedImage
            desktopSrc="/inyeon-2026/home-final-desktop-v4.webp"
            mobileSrc="/inyeon-2026/home-final-mobile-v4.webp"
            alt=""
            pictureClassName={styles.homeFinalPicture}
            className={styles.homeFinalImage}
            media="(max-width: 720px), (max-width: 960px) and (orientation: portrait)"
            sizes="100vw"
            mobileSizes="100vw"
            quality={88}
            ariaHidden
          />
          <span className={styles.homeFinalShade} aria-hidden="true" />
          <div className={`${styles.shell} ${styles.homeFinalInner}`}>
            <span className={styles.homeSectionEyebrow}>가입비 0원으로 시작</span>
            <h2>설레는 첫 만남,<br />지금 소개팅을 신청해 보세요</h2>
            <p>가입비 없음 · 매칭 후 결제 · 수도권 중심 대면 소개팅</p>
            <div className={styles.homeFinalActions}>
              <Link href="/apply"><HeartIcon className={styles.inlineHeart} />소개팅 신청하기</Link>
              <ConsultButton className={styles.homeFinalConsult} label="1:1 상담" tail="하기" />
            </div>
          </div>
        </section>
      </main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
