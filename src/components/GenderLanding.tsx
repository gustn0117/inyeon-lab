import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";

const CONTENT = {
  women: {
    kicker: "FOR WOMEN · 35 OR UNDER",
    title: <>괜찮은 사람을 만나는,<br /><span className={styles.lemonMark}>부담 없는 시작.</span></>,
    lead: "가입비는 0원입니다. 능력과 매너, 신원을 확인한 회원 중 조건에 맞는 소개가 성사될 때만 33,000원을 결제하세요.",
    price: "33,000원",
    condition: "35세 이하 미혼 여성만 신청 가능",
    image: "/match-women-v1.png",
    imageClass: styles.heroImageWomen,
    promiseTitle: "좋은 만남에 필요한 기준은 분명하게.",
    promiseLead: "프로필만 많이 보여주는 방식이 아니라, 담당자가 조건과 의사를 확인한 뒤 실제로 만날 수 있는 한 분을 연결합니다.",
    criteriaTitle: "능력과 매너를 함께 보는 회원풀",
    criteria: ["직업·신원 확인", "20·30대 중심", "1:1 비공개 제안", "미혼 회원"],
    promises: [
      { title: "대면 소개팅 보장", body: "카톡만 주고받다 끝나는 소개가 아닙니다. 두 분이 매칭에 동의하면 담당자가 실제 만남 일정까지 조율합니다." },
      { title: "신원 확인된 회원", body: "직업과 미혼 여부 등 기본 신원 확인 절차를 거친 회원을 소개합니다." },
      { title: "괜찮은 회원풀", body: "자기 일에 성실하고 관계에 진지한 다양한 직업군의 회원 중 조건에 맞는 분을 제안합니다." },
    ],
  },
  men: {
    kicker: "FOR MEN · 39 OR UNDER",
    title: <>원하는 분과 매칭되어야,<br /><span className={styles.lemonMark}>그때 결제.</span></>,
    lead: "가입비 0원. 원하는 거리, 나이, 스타일에 맞는 분과 매칭이 성사된 뒤에만 44,000원을 결제합니다.",
    price: "44,000원",
    condition: "39세 이하 미혼 남성만 신청 가능",
    image: "/match-men-v1.png",
    imageClass: styles.heroImageMen,
    promiseTitle: "카톡만 하다 끊기는 소개팅이 아닙니다.",
    promiseLead: "서로 프로필을 확인하고 두 분 모두 동의한 매칭만 진행합니다. 담당자가 일정 조율까지 맡아 실제 대면 소개팅으로 연결합니다.",
    criteriaTitle: "원하는 이상형 조건부터 확인",
    criteria: ["활동 거리", "선호 나이", "원하는 스타일", "상호 프로필 동의"],
    promises: [
      { title: "이상형과 매칭 후 결제", body: "마음에 드는 분이 확인되기 전에는 가입비도, 매칭비도 없습니다. 성사된 매칭에만 결제합니다." },
      { title: "대면 소개팅 보장", body: "연락처만 전달하고 끝내지 않습니다. 두 분이 동의하면 담당자가 실제 만남 날짜와 장소를 조율합니다." },
      { title: "신원 확인된 회원", body: "미혼 여부와 기본 신원을 확인한 회원 중 거리·나이·스타일 조건에 맞춰 제안합니다." },
    ],
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
            <div>
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
                src={content.image}
                alt="카페에서 대화 중인 성인 남녀의 연출 이미지"
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 28px), 52vw"
                className={`${styles.heroImage} ${content.imageClass}`}
              />
              <span className={styles.imageCaption}>서비스 이해를 돕기 위한 연출 이미지</span>
            </div>
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
      <ChatWidget />
    </div>
  );
}
