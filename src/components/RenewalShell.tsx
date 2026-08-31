import Link from "next/link";
import KakaoCopyButton from "@/components/KakaoCopyButton";
import styles from "@/components/renewal.module.css";

type HeaderProps = {
  applyHref?: string;
  applyLabel?: string;
};

export function RenewalHeader({ applyHref = "/#choose", applyLabel = "안내 선택" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`${styles.shell} ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label="인연픽 홈">
          인연픽
          <span className={styles.brandSub}>수도권 1:1 연애정보회사</span>
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/women" className={styles.navLink}>여성 안내</Link>
          <Link href="/men" className={styles.navLink}>남성 안내</Link>
          <Link href={applyHref} className={styles.navApply}>{applyLabel}</Link>
        </nav>
      </div>
    </header>
  );
}

export function RenewalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.footerBrand}>인연연구소</div>
            <p className={styles.footerCopy}>
              가입비 없이 시작해 매칭이 성사된 뒤에만 결제하는<br />수도권 중심 1:1 연애정보회사
            </p>
          </div>
          <div>
            <div className={styles.footerTitle}>SERVICE</div>
            <div className={styles.footerLinks}>
              <Link href="/women" className={styles.footerLink}>여성 회원 안내</Link>
              <Link href="/men" className={styles.footerLink}>남성 회원 안내</Link>
              <Link href="/privacy" className={styles.footerLink}>개인정보처리방침</Link>
              <Link href="/terms" className={styles.footerLink}>이용약관</Link>
            </div>
          </div>
          <div>
            <div className={styles.footerTitle}>QUICK CONTACT</div>
            <p className={styles.footerInfo}>추가 문의는 카톡 ID inyeon_ 으로 보내주세요</p>
            <KakaoCopyButton variant="pill" className="mt-3" />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.legal}>
            상호 인연연구소 · 대표 김가영 · 사업자등록번호 463-59-00868<br />
            문의 010-7617-0181 · orelim0623@naver.com
          </p>
          <p className={styles.legal}>본 서비스는 만 19세 미만의 청소년은 이용할 수 없습니다.</p>
          <p className={styles.legal}>© 인연연구소. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
