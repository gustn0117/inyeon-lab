"use client";

import { useState } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";

const GENDER_INFO: Record<GenderKey, { label: string; condition: string; price: string }> = {
  men: { label: "남성", condition: "한국나이 기준 1984년생까지 미혼", price: "매칭 성사 후 기본 1회권 33,000원" },
  women: { label: "여성", condition: "한국나이 기준 1988년생까지 미혼", price: "매칭 성사 후 기본 1회권 22,000원" },
};

/* ═══ ApplyGate — 소개팅 신청 단일 진입: 성별 선택 후 바로 신청 폼 ═══ */
export default function ApplyGate() {
  const [gender, setGender] = useState<GenderKey | null>(null);

  return (
    <div className={styles.applyGate}>
      <div className={styles.applyGateHead}>
        <span className={styles.eyebrow}>가입비 0원 · 매칭 후 결제</span>
        <h1>소개팅 신청하기</h1>
        <p>해당하는 쪽을 선택하면 바로 소개팅 신청서가 열려요. 신청은 1분이면 끝나요.</p>
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
