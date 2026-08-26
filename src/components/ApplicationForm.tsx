"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import KakaoCopyButton from "@/components/KakaoCopyButton";
import styles from "@/components/renewal.module.css";

type GenderKey = "women" | "men";
type Stage = "eligibility" | "form" | "done";

const COPY = {
  women: {
    label: "여성",
    oldestBirthYear: (year: number) => year - 39 - 1,
    price: "33,000원",
    confirmation: "저는 만 19세 이상, 39세 이하의 미혼 여성입니다.",
    birthYearError: "39세 이하 성인에 해당하는 출생연도를 입력해주세요.",
    eligibilityHint: "생일 기준 실제 나이로 확인해주세요. 허위 정보가 확인되면 매칭이 제한될 수 있습니다.",
  },
  men: {
    label: "남성",
    oldestBirthYear: (_year: number) => 1984,
    price: "44,000원",
    confirmation: "저는 만 19세 이상 미혼 남성이며, 한국나이 기준 1984년생까지의 가입 조건에 해당합니다.",
    birthYearError: "한국나이 기준 1984년생까지에 해당하는 출생연도를 입력해주세요.",
    eligibilityHint: "만 나이가 아닌 출생연도 기준으로 확인해주세요. 허위 정보가 확인되면 매칭이 제한될 수 있습니다.",
  },
} as const;

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function ApplicationForm({ gender }: { gender: GenderKey }) {
  const info = COPY[gender];
  const year = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date()));
  const oldestBirthYear = info.oldestBirthYear(year);
  const youngestBirthYear = year - 19;
  const [stage, setStage] = useState<Stage>("eligibility");
  const [eligible, setEligible] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [job, setJob] = useState("");
  const [height, setHeight] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) stageHeadingRef.current?.focus();
    else hasMountedRef.current = true;
  }, [stage]);

  const validate = () => {
    if (!/^010-\d{4}-\d{4}$/.test(phone)) return "연락처를 정확히 입력해주세요.";
    if (region.trim().length < 2) return "활동 가능한 지역을 입력해주세요.";
    const by = Number(birthYear);
    if (!Number.isInteger(by) || by < oldestBirthYear || by > youngestBirthYear) {
      return info.birthYearError;
    }
    if (job.trim().length < 2) return "직업을 2자 이상 입력해주세요.";
    const h = Number(height);
    if (!Number.isInteger(h) || h < 130 || h > 220) return "키는 130~220cm 사이로 입력해주세요.";
    if (!privacyConsent) return "개인정보 수집·이용에 동의해주세요.";
    return "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/ideal-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formVersion: 2,
          website,
          gender: info.label,
          phone,
          region: region.trim(),
          birthYear,
          job: job.trim(),
          height,
          eligibilityConfirmed: eligible,
          privacyConsent,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "접수 중 오류가 발생했습니다.");
      window.fbq?.("track", "Lead");
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (stage === "done") {
    return (
      <div className={styles.formCard} aria-live="polite">
        <div className={styles.success}>
          <span className={styles.successBadge}>신청 접수 완료</span>
          <h3 ref={stageHeadingRef} tabIndex={-1}>기본 정보를 확인한 뒤 연락드릴게요</h3>
          <p>
            담당 매칭사가 신청 내용을 검토한 뒤 안내드립니다. 조건에 맞는 매칭이 확인되기 전에는 비용이 발생하지 않습니다.
          </p>
          <div className={styles.successContact}>
            <strong>조금 더 빠른 문의가 필요하신가요?</strong>
            <KakaoCopyButton variant="pill" />
          </div>
        </div>
      </div>
    );
  }

  if (stage === "eligibility") {
    return (
      <div className={styles.formCard}>
        <div className={styles.formStep}>STEP 01 · ELIGIBILITY</div>
        <h3 ref={stageHeadingRef} tabIndex={-1}>신청 전 가입 조건을 확인해주세요</h3>
        <p className={styles.formDescription}>
          인연연구소는 성인 미혼 회원만 이용할 수 있으며, 매칭 진행 전 관련 정보를 확인할 수 있습니다.
        </p>
        <div className={styles.formPriceSummary}>
          <strong>지금 결제 0원</strong>
          <span>양측 매칭 성사 시 {info.price}</span>
        </div>
        <div className={styles.eligibilityBox}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={eligible}
              onChange={(event) => setEligible(event.target.checked)}
            />
            <span className={styles.checkText}>
              {info.confirmation}
              <span className={styles.checkHint}>{info.eligibilityHint}</span>
            </span>
          </label>
        </div>
        <button
          type="button"
          className={styles.formButton}
          disabled={!eligible}
          onClick={() => setStage("form")}
        >
          확인하고 신청서 작성
        </button>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={submit} noValidate>
      <div className={styles.formStep}>STEP 02 · BASIC INFO</div>
      <h3 ref={stageHeadingRef} tabIndex={-1}>기본 정보만 간단히 알려주세요</h3>
      <p className={styles.formDescription}>연락처, 지역, 출생연도, 직업, 키만 입력하면 신청이 끝납니다.</p>
      <div className={styles.formPriceSummary}>
        <strong>가입비 0원</strong>
        <span>양측 매칭 성사 시 {info.price}</span>
      </div>

      <input
        className={styles.honeypot}
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.formGrid}>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor={`${gender}-phone`}>연락처</label>
          <input
            id={`${gender}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            maxLength={13}
            required
          />
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor={`${gender}-region`}>지역</label>
          <input
            id={`${gender}-region`}
            type="text"
            autoComplete="address-level1"
            placeholder="예: 서울 마포구"
            value={region}
            onChange={(event) => setRegion(event.target.value.slice(0, 30))}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${gender}-birth-year`}>출생연도</label>
          <div className={styles.inputWrap}>
            <input
              id={`${gender}-birth-year`}
              className={styles.withUnit}
              type="number"
              inputMode="numeric"
              min={oldestBirthYear}
              max={youngestBirthYear}
              placeholder="1995"
              value={birthYear}
              onChange={(event) => setBirthYear(event.target.value.slice(0, 4))}
              required
            />
            <span className={styles.inputUnit}>년생</span>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor={`${gender}-height`}>키</label>
          <div className={styles.inputWrap}>
            <input
              id={`${gender}-height`}
              className={styles.withUnit}
              type="number"
              inputMode="numeric"
              min={130}
              max={220}
              placeholder="170"
              value={height}
              onChange={(event) => setHeight(event.target.value.slice(0, 3))}
              required
            />
            <span className={styles.inputUnit}>cm</span>
          </div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor={`${gender}-job`}>직업</label>
          <input
            id={`${gender}-job`}
            type="text"
            autoComplete="organization-title"
            placeholder="예: 회사원, 교사, 개발자"
            value={job}
            onChange={(event) => setJob(event.target.value.slice(0, 30))}
            required
          />
        </div>
      </div>

      <div className={styles.consentBox}>
        <div className={styles.consentSummary}>
          <strong>개인정보 수집·이용 안내</strong>
          <span>수집: 성별, 연락처, 지역, 출생연도, 직업, 키, 자격 확인값</span>
          <span>목적: 가입 조건 확인, 매칭 상담 및 연락</span>
          <span>보유: 상담·매칭 종료 또는 삭제 요청 시까지(관계 법령상 보존 의무가 있는 경우 제외)</span>
          <span>동의를 거부할 수 있으나, 거부 시 매칭 신청이 어렵습니다.</span>
        </div>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(event) => setPrivacyConsent(event.target.checked)}
          />
          <span className={styles.checkText}>
            매칭 상담을 위한 개인정보 수집·이용에 동의합니다. {" "}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>내용 보기</Link>
          </span>
        </label>
      </div>

      {error && <p className={styles.formError} role="alert">{error}</p>}

      <div className={styles.formActions}>
        <button type="button" className={styles.formSecondary} onClick={() => setStage("eligibility")} disabled={submitting}>
          이전
        </button>
        <button type="submit" className={styles.formSubmit} disabled={submitting || !privacyConsent}>
          {submitting ? "접수 중..." : "가입비 없이 신청서 제출"}
        </button>
      </div>
    </form>
  );
}
