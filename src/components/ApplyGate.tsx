"use client";

import { useState } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";

const GENDER_INFO: Record<GenderKey, { label: string; condition: string; price: string }> = {
  men: { label: "남성", condition: "한국나이 기준 1984년생까지 미혼", price: "매칭 성사 후 기본 1회권 33,000원" },
  women: { label: "여성", condition: "한국나이 기준 1988년생까지 미혼", price: "매칭 성사 후 기본 1회권 22,000원" },
};

/* ═══ ApplyGate — 무료 신청 단일 진입: 성별 선택 후 바로 신청 폼 ═══ */
export default function ApplyGate() {
  const [gender, setGender] = useState<GenderKey | null>(null);

  return (
    <div className={styles.applyGate}>
      <div className={styles.applyGateHead}>
        <span className={styles.eyebrow}>FREE APPLICATION</span>
        <h1>무료 신청</h1>
        <p>가입비 0원 · 매칭이 성사된 뒤에만 결제합니다. 해당하는 쪽을 선택하면 바로 신청서가 열려요.</p>
      </div>

      <div className={styles.applyGateTiles} role="tablist" aria-label="신청 유형 선택">
        {(["men", "women"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={gender === key}
            className={`${styles.applyGateTile} ${gender === key ? styles.applyGateTileActive : ""}`}
            onClick={() => setGender(key)}
          >
            <strong>{GENDER_INFO[key].label} 신청</strong>
            <span>{GENDER_INFO[key].condition}</span>
            <em>{GENDER_INFO[key].price}</em>
          </button>
        ))}
      </div>

      {gender ? (
        <div className={styles.applyGateForm}>
          <ApplicationForm key={gender} gender={gender} />
        </div>
      ) : (
        <p className={styles.applyGateHint}>위에서 남성 · 여성 중 해당하는 버튼을 눌러주세요 👆</p>
      )}
    </div>
  );
}
