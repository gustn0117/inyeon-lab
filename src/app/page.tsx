import Image from "next/image";
import Link from "next/link";
import ArtDirectedImage from "@/components/ArtDirectedImage";
import ChatWidget from "@/components/ChatWidget";
import HomeMobileDock from "@/components/HomeMobileDock";
import { RenewalFooter } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

const ENTRANCES = [
  {
    href: "/men",
    eyebrow: "FOR MEN",
    title: "남성 회원 안내",
    condition: "한국나이 기준 1984년생까지",
    price: "매칭 성사 후 44,000원",
    description: "가입비 없이 이용 방식과 공개 금액을 확인하세요",
  },
  {
    href: "/women",
    eyebrow: "FOR WOMEN",
    title: "여성 회원 안내",
    condition: "한국나이 기준 1988년생까지",
    price: "매칭 성사 후 33,000원",
    description: "가입비 없이 이용 방식과 공개 금액을 확인하세요",
  },
] as const;

const TRUST_ITEMS = [
  "연애정보회사",
  "가입비 없음",
  "매칭 후 결제",
  "금액 공개",
  "100% 실회원",
  "대면 소개팅 보장",
] as const;

const HERO_FACTS = [
  { label: "가입비", value: "0원" },
  { label: "결제 시점", value: "매칭 후" },
  { label: "운영 기준", value: "100% 실회원" },
  { label: "진행 방식", value: "수도권 1:1" },
] as const;

const PRINCIPLES = [
  {
    number: "01",
    title: "앱이 아닌 연애정보회사",
    body: "프로필만 넘기고 끝나는 앱이 아닌, 담당자가 양측의 소개 의사를 확인하는 1:1 소개팅 서비스",
  },
  {
    number: "02",
    title: "가입비 없이 매칭 후 결제",
    body: "신청과 프로필 확인에는 가입비가 없고 두 분 모두 만남에 동의해 매칭된 후에만 결제",
  },
  {
    number: "03",
    title: "100% 실회원과 실제 만남",
    body: "실제 소개 의사가 확인된 회원으로만 진행하며 성사된 매칭은 날짜와 장소를 조율해 대면 소개팅으로 연결",
  },
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
    title: "희망 조건 확인",
    body: "담당자가 원하는 거리·나이·스타일을 확인해요",
    image: "/inyeon-2026/process-02-v2.webp",
    alt: "매칭 담당자와 희망 조건을 상담하는 20대 남성의 연출 이미지",
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
    title: "결제 후 대면 조율",
    body: "공개된 금액을 결제하면 날짜와 장소를 조율해요",
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
    answer: "아니요, 앱이 아닌 연애정보회사입니다. 담당자가 조건과 양측의 소개 의사를 확인해 1:1로 연결합니다",
  },
  {
    question: "가입비와 결제 시점은 어떻게 되나요",
    answer: "가입비는 없습니다. 두 분 모두 프로필을 확인하고 실제 만남에 동의해 매칭이 성사된 후에만 공개된 금액을 결제합니다",
  },
  {
    question: "정말 대면 소개팅까지 진행하나요",
    answer: "네, 연락처만 전달하고 끝내지 않습니다. 매칭이 성사되면 담당자가 날짜와 장소를 조율해 실제 대면 소개팅으로 연결합니다",
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
      <main>
        <section className={styles.homeCampaignEntry} aria-labelledby="home-title" data-floating-ui-guard>
          <ArtDirectedImage
            desktopSrc="/inyeon-2026/home-hero-desktop-v4.webp"
            mobileSrc="/inyeon-2026/home-hero-mobile-v4.webp"
            alt="밝은 공간에서 마주 보는 20대 남녀의 서비스 연출 이미지"
            pictureClassName={styles.homeCampaignPicture}
            className={styles.homeCampaignImage}
            media="(max-width: 720px), (max-width: 980px) and (orientation: portrait)"
            sizes="100vw"
            mobileSizes="100vw"
            quality={90}
            priority
          />
          <span className={styles.homeCampaignShade} aria-hidden="true" />

          <header className={styles.homeCampaignHeader}>
            <Link href="/" className={styles.homeCampaignBrand} aria-label="인연연구소 홈">
              <strong>인연연구소</strong>
              <span>INYEON LAB</span>
            </Link>
            <nav className={styles.homeCampaignNav} aria-label="홈페이지 주요 안내">
              <a href="#home-pool">회원 분위기</a>
              <a href="#how-it-works">진행 과정</a>
              <a href="#pricing">금액 안내</a>
            </nav>
            <a href="#choose" className={styles.homeCampaignHeaderAction}>안내 선택 <span aria-hidden="true">↓</span></a>
          </header>

          <div className={styles.homeCampaignCopy}>
            <span className={styles.homeCampaignKicker}>앱이 아닌 수도권 1:1 연애정보회사</span>
            <h1 id="home-title">
              매칭된 뒤 결제하고
              <strong>대면으로 만나는 소개팅</strong>
            </h1>
            <p>가입비 없이 시작해, 두 분 모두 만남에 동의한 뒤에만 결제합니다</p>
            <div className={styles.homeCampaignProof} aria-label="핵심 운영 기준">
              <span>가입비 <b>0원</b></span>
              <span>매칭 후 결제</span>
              <span>100% 실회원</span>
              <span>금액 공개</span>
              <span>대면 소개팅 보장</span>
            </div>
          </div>

          <div id="choose" className={styles.homeCampaignDock} aria-label="성별별 서비스 안내 선택">
            {ENTRANCES.map((entrance, index) => (
              <Link key={entrance.href} href={entrance.href} className={styles.homeCampaignRoute}>
                <span className={styles.homeCampaignRouteIndex}>0{index + 1}</span>
                <div>
                  <small>{entrance.eyebrow}</small>
                  <strong>{entrance.title}</strong>
                  <em>{entrance.condition.replace("한국나이 기준 ", "")}</em>
                  <b>{entrance.price.replace("매칭 성사 후 ", "매칭 후 ")}</b>
                </div>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </section>

        <section
          className={styles.homeTicker}
          aria-label="핵심 서비스 안내, 초점을 두면 움직임이 멈춥니다"
          tabIndex={0}
        >
          <div className={styles.homeTickerTrack} aria-hidden="true">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, index) => (
              <span key={`${item}-${index}`}><b>◆</b>{item}</span>
            ))}
          </div>
          <p className={styles.srOnly}>{TRUST_ITEMS.join(" · ")}</p>
        </section>

        <section id="home-pool" className={styles.homePoolSection} aria-labelledby="home-pool-title">
          <div className={`${styles.shell} ${styles.homePoolHeader}`}>
            <div>
              <span className={styles.homeSectionEyebrow}>YOUNG &amp; BRIGHT CONNECTIONS</span>
              <h2 id="home-pool-title">20·30대 중심의<br />밝고 트렌디한 만남</h2>
            </div>
            <div className={styles.homePoolLead}>
              <p>인연연구소가 지향하는 밝고 편안한 1:1 만남의 분위기를 이미지로 미리 확인해 보세요</p>
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

          <div className={`${styles.shell} ${styles.homePoolActions}`} aria-label="성별별 상세 안내">
            <Link href="/men" className={styles.homePoolAction}>
              남성 회원 안내 보기 <span aria-hidden="true">→</span>
            </Link>
            <Link href="/women" className={styles.homePoolAction}>
              여성 회원 안내 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className={styles.homeIdentitySection}>
          <div className={`${styles.shell} ${styles.homeIdentityIntro}`}>
            <div>
              <span className={styles.homeSectionEyebrow}>NOT AN APP, A REAL INTRODUCTION</span>
              <h2>온라인에서 끝나지 않도록<br />실제 만남까지 연결합니다</h2>
            </div>
            <p>
              인연연구소는 수도권을 중심으로 운영하는 연애정보회사이며,
              <br />
              조건을 입력하고 기다리는 앱이 아니라 담당자가 소개 의사와 일정을 확인해 대면 소개팅까지 함께합니다
            </p>
          </div>

          <div className={`${styles.shell} ${styles.homeIdentityGrid}`}>
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
                <span>FROM MATCH TO MEETING</span>
                <strong>대면 소개팅 보장</strong>
                <small>매칭 성사 후 날짜와 장소까지 조율</small>
              </figcaption>
            </figure>

            <div className={styles.homePrincipleList}>
              {PRINCIPLES.map((item) => (
                <article key={item.number} className={styles.homePrincipleCard}>
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={`${styles.shell} ${styles.homeIdentityCta}`}>
            <div>
              <span>NO MEMBERSHIP FEE · PAY AFTER MATCH</span>
              <strong>조건과 공개 금액을 확인한 뒤<br />부담 없이 시작해 보세요</strong>
            </div>
            <div className={styles.homeIdentityCtaActions}>
              <Link href="/men">남성 안내 <b aria-hidden="true">→</b></Link>
              <Link href="/women">여성 안내 <b aria-hidden="true">→</b></Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.homeProcessSection} aria-labelledby="process-title">
          <div className={styles.shell}>
            <div className={styles.homeProcessIntro}>
              <span className={styles.homeSectionEyebrow}>HOW IT WORKS</span>
              <h2 id="process-title">신청부터 실제 만남까지<br />기준을 분명하게</h2>
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
              <span className={styles.homeSectionEyebrow}>OPEN &amp; CLEAR PRICE</span>
              <h2 id="pricing-title">숨기지 않는 금액<br />매칭된 후에만 결제</h2>
              <p>
                신청할 때 내는 가입비는 0원이며,
                <br />
                홈페이지에 공개된 금액 그대로, 양측이 실제 만남에 동의한 뒤에만 결제합니다
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
                  <small>양측 매칭 성사 후 결제</small>
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
              <span className={styles.homeSectionEyebrow}>BEFORE YOU APPLY</span>
              <h2>신청 전에<br />꼭 확인해 주세요</h2>
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

        <section id="home-final" className={styles.homeFinalSection} data-floating-ui-guard>
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
            <span className={styles.homeSectionEyebrow}>START WITHOUT A MEMBERSHIP FEE</span>
            <h2>앱이 아닌 소개팅을 찾고 있다면<br />나에게 맞는 안내부터 확인해 보세요</h2>
            <p>가입비 없음 · 매칭 후 결제 · 수도권 중심 대면 소개팅</p>
            <div className={styles.homeFinalActions}>
              <Link href="/men">남성 안내 보기 <span aria-hidden="true">→</span></Link>
              <Link href="/women">여성 안내 보기 <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <RenewalFooter />
      <HomeMobileDock />
      <ChatWidget />
    </div>
  );
}
