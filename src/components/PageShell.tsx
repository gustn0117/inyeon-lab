import ChatWidget from "@/components/ChatWidget";
import { RenewalFooter, RenewalHeader } from "@/components/RenewalShell";
import styles from "@/components/renewal.module.css";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <RenewalHeader />
      <main className="relative bg-white">{children}</main>
      <RenewalFooter />
      <ChatWidget />
    </div>
  );
}
