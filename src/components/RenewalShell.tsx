import Link from "next/link";
import KakaoCopyButton from "@/components/KakaoCopyButton";
import styles from "@/components/renewal.module.css";

export function RenewalHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.shell} ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label="인연연구소 홈">
          <strong className={styles.brandWord}>인연<em>연구소</em></strong>
          <span className={styles.brandSub}>좋은 인연이, 더 좋은 일상을 만듭니다.</span>
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/#process" className={styles.navLink}>서비스 소개</Link>
          <Link href="/women" className={styles.navLink}>여성 안내</Link>
          <Link href="/men" className={styles.navLink}>남성 안내</Link>
          <Link href="/#pricing" className={styles.navLink}>이용 안내</Link>
          <Link href="/#faq" className={styles.navLink}>고객센터</Link>
          <Link href="/apply" className={styles.headerApply}>내 인연 시작하기</Link>
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
              결정사급 케어를 소개팅만큼 가볍게.<br />가입비·성혼비 없이 매칭 성사 후 결제하는 1:1 맞춤 소개팅
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
