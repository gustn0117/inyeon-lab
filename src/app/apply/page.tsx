import type { Metadata } from "next";
import ApplyGate from "@/components/ApplyGate";
import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

export const metadata: Metadata = {
  title: "무료 신청 | 인연연구소",
  description: "가입비 0원, 매칭 성사 후 결제. 기본 정보만 남기면 담당 매니저가 확인 후 연락드립니다.",
};

export default function ApplyPage() {
  return (
    <div className={styles.site}>
      <RenewalHeader applyHref="#apply-gate" applyLabel="무료 신청" />
      <main id="apply-gate" className={styles.applyPageMain}>
        <ApplyGate />
      </main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
