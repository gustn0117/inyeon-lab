import Image from "next/image";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

const GENDER_CARDS = [
  {
    href: "/women",
    label: "여성 회원 안내",
    condition: "35세 이하 · 미혼",
    title: "괜찮은 사람을 만나는, 부담 없는 시작.",
    price: "가입비 0원 · 매칭 성사 시 33,000원",
    description: "능력과 매너, 신원을 확인한 회원 중 조건에 맞는 한 분을 제안드립니다.",
    image: "/match-women-v1.png",
    imageClass: styles.womenImage,
  },
  {
    href: "/men",
    label: "남성 회원 안내",
    condition: "39세 이하 · 미혼",
    title: "원하는 분과 매칭된 뒤, 그때 결제.",
    price: "가입비 0원 · 매칭 성사 시 44,000원",
    description: "거리·나이·스타일에 맞는 분과 연결되고 실제 만남이 확정된 뒤에만 결제합니다.",
    image: "/match-men-v1.png",
    imageClass: styles.menImage,
  },
] as const;

const PROCESS = [
  { number: "01", title: "기본 정보 신청", body: "자격 확인 후 연락처·지역·출생연도·직업·키만 간단히 남겨주세요." },
  { number: "02", title: "희망 조건 확인", body: "담당자가 연락드려 거리·나이·스타일 등 원하는 조건을 확인한 뒤 맞춤 제안합니다." },
  { number: "03", title: "실제 대면 만남", body: "두 분이 프로필에 동의하면 담당자가 날짜와 장소까지 직접 조율합니다." },
] as const;

export default function Home() {
  return (
    <div className={styles.site}>
      <RenewalHeader />
      <main>
        <section className={styles.homeHero}>
          <div className={styles.shell}>
            <span className={styles.eyebrow}>IDENTITY-CHECKED · FACE-TO-FACE</span>
            <h1 className={styles.homeTitle}>
              카톡으로 끝나지 않는,<br /><span className={styles.lemonMark}>진짜 소개팅.</span>
            </h1>
            <p className={styles.homeLead}>
              가입비 없이 시작하고, 원하는 조건의 상대와 매칭이 성사될 때만 결제하세요. 두 분이 동의한 매칭은 실제 대면 일정까지 책임지고 연결합니다.
            </p>
            <div className={styles.trustRow} aria-label="핵심 서비스 특징">
              <span className={styles.trustPill}>가입비 0원</span>
              <span className={styles.trustPill}>신원 확인 회원</span>
              <span className={styles.trustPill}>대면 소개팅 보장</span>
            </div>
          </div>
        </section>

        <section id="choose" className={styles.selector}>
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>CHOOSE YOUR GUIDE</span>
              <h2>내게 맞는 안내를 선택하세요.</h2>
              <p>가격과 가입 조건이 다르니 해당하는 페이지에서 확인해주세요.</p>
            </div>
            <div className={styles.genderGrid}>
              {GENDER_CARDS.map((card) => (
                <article key={card.href} className={styles.genderCard}>
                  <Image
                    src={card.image}
                    alt="카페에서 대화 중인 성인 남녀의 연출 이미지"
                    fill
                    sizes="(max-width: 720px) calc(100vw - 28px), 50vw"
                    className={`${styles.genderCardImage} ${card.imageClass}`}
                  />
                  <span className={styles.cardImageCaption}>서비스 연출 이미지</span>
                  <div className={styles.genderCardContent}>
                    <div className={styles.genderCardTopline}>
                      <span className={styles.genderLabel}>{card.label}</span>
                      <span className={styles.cardCondition}>{card.condition}</span>
                    </div>
                    <h3>{card.title}</h3>
                    <div className={styles.genderPrice}>{card.price}</div>
                    <p className={styles.genderDescription}>{card.description}</p>
                    <Link href={card.href} className={styles.cardLink}>{card.label} 보기</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>HOW IT WORKS</span>
              <h2>신청부터 실제 만남까지.</h2>
            </div>
            <div className={styles.processGrid}>
              {PROCESS.map((item) => (
                <article key={item.number} className={styles.processCard}>
                  <div className={styles.processNumber}>{item.number}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
