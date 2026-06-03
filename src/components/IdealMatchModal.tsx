"use client";
import { useEffect, useState } from "react";

const PINK = "#d4567a";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

type Props = { open: boolean; onClose: () => void };

const GENDER = ["남성", "여성"] as const;
const AGE = ["20대 초반", "20대 후반", "30대 초반", "30대 후반", "40대 이상"] as const;
const REGION = ["서울", "경기·인천", "강원", "충청", "전라", "경상", "제주"] as const;
const STYLE = ["단정한", "지적인", "귀여운", "발랄한", "세련된", "청순한", "무관"] as const;

type ChipsProps = { value: string; onChange: (v: string) => void; options: readonly string[]; color?: string };
function Chips({ value, onChange, options, color = PINK }: ChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all"
            style={
              active
                ? { background: color, color: "white", borderColor: color, border: "1px solid", boxShadow: `0 4px 12px ${color}33` }
                : { background: "white", color: "#555", border: "1px solid #e5e7eb" }
            }
          >{opt}</button>
        );
      })}
    </div>
  );
}

export default function IdealMatchModal({ open, onClose }: Props) {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [idealAge, setIdealAge] = useState("");
  const [idealRegion, setIdealRegion] = useState("");
  const [idealStyle, setIdealStyle] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const reset = () => {
    setGender(""); setAge(""); setRegion("");
    setIdealAge(""); setIdealRegion(""); setIdealStyle("");
    setPhone(""); setWebsite(""); setStatus("idle"); setErrMsg("");
  };

  const submit = async () => {
    if (!phone.trim()) { setErrMsg("연락처를 입력해주세요."); return; }
    setStatus("loading"); setErrMsg("");
    try {
      const res = await fetch("/api/ideal-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website,
          gender, age_range: age, region,
          ideal_age: idealAge, ideal_region: idealRegion, ideal_style: idealStyle,
          phone,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        window.fbq?.("track", "Lead");
      } else {
        setStatus("error");
        setErrMsg(data?.error || "다시 시도해주세요.");
      }
    } catch {
      setStatus("error");
      setErrMsg("네트워크 오류");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog" aria-modal="true">
      <div
        className="relative bg-white w-full sm:max-w-md max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: "im-slide-up 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* 헤더 */}
        <div className="relative px-6 py-5 text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
          <button type="button" onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="닫기">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-[11px] font-bold tracking-widest opacity-90 mb-1.5">IDEAL MATCH</div>
          <div className="text-lg font-extrabold leading-tight">내 이상형과 매칭될까?</div>
          <div className="text-xs text-white/80 mt-1">1분이면 끝나는 빠른 진단</div>
        </div>

        {status === "done" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: `${PINK}15`, color: PINK }}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base font-extrabold mb-1.5" style={{ color: "#222" }}>접수되었습니다!</p>
            <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
              담당 매칭사가 진단 결과를 확인 후<br />빠른 시일 내에 연락드릴게요.
            </p>
            <button onClick={() => { reset(); onClose(); }}
              className="mt-7 px-7 py-2.5 rounded-full text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
              확인
            </button>
          </div>
        ) : (
          <>
            {/* 폼 본문 */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off"
                value={website} onChange={e => setWebsite(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                aria-hidden="true" />

              <div>
                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>본인 성별</label>
                <Chips value={gender} onChange={setGender} options={GENDER} />
              </div>

              <div>
                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>본인 나이대</label>
                <Chips value={age} onChange={setAge} options={AGE} />
              </div>

              <div>
                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>본인 지역</label>
                <Chips value={region} onChange={setRegion} options={REGION} />
              </div>

              <div className="pt-2 border-t border-pink-50">
                <p className="text-[11px] font-bold mb-3 tracking-widest" style={{ color: PINK }}>이상형</p>

                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>희망 나이대</label>
                <Chips value={idealAge} onChange={setIdealAge} options={AGE} />
              </div>

              <div>
                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>희망 지역</label>
                <Chips value={idealRegion} onChange={setIdealRegion} options={REGION} />
              </div>

              <div>
                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>외적 스타일</label>
                <Chips value={idealStyle} onChange={setIdealStyle} options={STYLE} />
              </div>

              {/* 안내 + 연락처 */}
              <div className="pt-3 mt-2 border-t border-pink-50">
                <div className="rounded-2xl p-4 mb-4" style={{ background: `${PINK}08`, border: `1px solid ${PINK}20` }}>
                  <p className="text-[12px] leading-relaxed" style={{ color: "#444" }}>
                    <strong style={{ color: PINK }}>여성 회원은 1회 무료</strong>,
                    <strong style={{ color: PINK }}> 남성 회원도 저렴한 가격</strong>으로 소개 가능합니다.<br />
                    이상형 조건에 맞는 분이 있을 경우 담당 매칭사가 직접 연락드릴게요.
                  </p>
                </div>

                <label className="block text-[12px] font-bold mb-2" style={{ color: "#444" }}>
                  연락받을 번호 <span style={{ color: PINK }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  maxLength={13}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none"
                />
                {errMsg && <p className="text-xs text-red-500 mt-2">{errMsg}</p>}
              </div>
            </div>

            {/* 푸터 */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
              <button
                onClick={submit}
                disabled={status === "loading" || !phone.trim()}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white transition-all disabled:opacity-40 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}
              >
                {status === "loading" ? "접수 중..." : "매칭 가능성 알아보기"}
              </button>
              <p className="text-[10.5px] text-center mt-2.5" style={{ color: "#aaa" }}>
                입력 정보는 매칭 외 목적으로 사용되지 않습니다.
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes im-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
