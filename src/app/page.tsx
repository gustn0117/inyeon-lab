import Image from "next/image";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

const ENTRANCES = [
  {
    href: "/men",
    eyebrow: "FOR MEN",
    title: "남성 회원",
    condition: "39세 이하 미혼",
    price: "매칭 성사 시 44,000원",
  },
  {
    href: "/women",
    eyebrow: "FOR WOMEN",
    title: "여성 회원",
    condition: "35세 이하 미혼",
    price: "매칭 성사 시 33,000원",
  },
] as const;

export default function Home() {
  return (
    <div className={`${styles.site} ${styles.choiceSite}`}>
      <main className={styles.choiceHome}>
        <header className={styles.choiceHeader}>
          <div className={styles.choiceBrandRow}>
            <Link href="/" className={styles.choiceBrand} aria-label="인연연구소 홈">
              인연연구소
              <span>1:1 이상형 소개팅</span>
            </Link>
            <span className={styles.choiceTrust}>신원 확인 · 1:1 비공개 매칭</span>
          </div>
          <div className={styles.choiceIntro}>
            <span className={styles.choiceIntroEyebrow}>CHOOSE YOUR GUIDE</span>
            <h1>우리는 <span className={styles.lemonMark}>이상형 소개팅</span> 인연연구소입니다.</h1>
            <p>해당하는 안내를 선택하면 상세 정보와 신청서가 열립니다.</p>
          </div>
        </header>

        <section className={styles.choiceStage} aria-label="성별별 서비스 안내 선택">
          <picture className={styles.choicePicture} aria-hidden="true">
            <source media="(max-width: 720px)" srcSet="/home-gender-split-mobile-v1.webp" />
            <Image
              src="/home-gender-split-desktop-v1.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={94}
              className={styles.choiceImage}
            />
          </picture>
          <div className={styles.choiceShade} aria-hidden="true" />
          <div className={styles.choiceLinks}>
            {ENTRANCES.map((entrance) => (
              <Link key={entrance.href} href={entrance.href} className={styles.choiceLink}>
                <span className={styles.choiceLinkInner}>
                  <span className={styles.choiceLinkEyebrow}>{entrance.eyebrow}</span>
                  <strong>{entrance.title}</strong>
                  <span className={styles.choiceLinkCondition}>{entrance.condition}</span>
                  <span className={styles.choiceLinkPrice}>{entrance.price}</span>
                  <span className={styles.choiceLinkAction}>상세 안내 보기 <b aria-hidden="true">↗</b></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
