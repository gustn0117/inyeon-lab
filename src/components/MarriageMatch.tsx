"use client";
import { useState } from "react";
import { IconCheck, IconMail, Sparkle, HandUnderline } from "@/components/Icons";

/* ═══ MarriageMatch — 결혼 목적 결정사식 정밀 매칭 신청 ═══ */
export default function MarriageMatch() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, website, kind: "marriage" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("done"); setName(""); setPhone(""); }
      else { setStatus("error"); setErrMsg(data?.error || "다시 시도해주세요."); }
    } catch { setStatus("error"); setErrMsg("네트워크 오류"); }
  };

  const usps = [
    { t: "학력·연봉·종교·직업까지 반영", d: "원하시는 조건을 구체적으로 반영하는 정밀 매칭" },
    { t: "성혼비 0원", d: "결혼에 성공해도 성혼비·사례비를 받지 않습니다" },
    { t: "결정사 대비 최저가", d: "거품 없는 가격으로 부담 없이 시작" },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 좌 — 카피 */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkle size={14} />
              <div className="eyebrow-lined">MARRIAGE MATCHING</div>
            </div>
            <h2 className="h-section font-bold text-ink mb-5" style={{ fontWeight: 700, wordBreak: "keep-all" }}>
              결혼까지 생각한다면,<br />
              <span className="text-rainbow relative inline-block">결정사식 정밀 매칭<HandUnderline /></span>.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-8 font-medium">
              가벼운 소개팅을 넘어 <strong className="text-ink text-highlight">결혼을 목적으로</strong> 만나고
              싶으신 분들을 위해, 결혼정보회사 방식의 조건 매칭을 준비했습니다.
            </p>
            <div className="space-y-4">
              {usps.map((u, i) => (
                <div key={i} className="flex items-start gap-3">
                  <IconCheck size={22} />
                  <div>
                    <div className="text-base font-bold text-ink leading-tight">{u.t}</div>
                    <div className="text-sm text-ink-soft font-medium mt-0.5">{u.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우 — 신청 폼 */}
          <div className="reveal">
            <div className="card-rainbow bg-white p-6 sm:p-8">
              {status === "done" ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
                    <IconMail size={28} />
                  </div>
                  <p className="text-lg font-bold text-ink mb-2">결혼매칭 상담 신청 완료!</p>
                  <p className="text-sm text-ink-soft font-medium">담당 매칭사가 확인 후 순차적으로 연락드립니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-base font-bold text-ink mb-1">결혼매칭 상담 신청</p>
                  <p className="text-sm text-ink-soft font-medium mb-3">번호를 남겨주시면 결혼매칭 전담 매칭사가 연락드립니다.</p>
                  {/* honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                    aria-hidden="true"
                  />
                  <div>
                    <label className="caption-xs block mb-1.5 text-ink">이름</label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      value={name}
                      maxLength={20}
                      onChange={e => setName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-base bg-white border border-line text-ink placeholder-ink-tertiary focus:border-accent focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="caption-xs block mb-1.5 text-ink">전화번호</label>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      value={phone}
                      maxLength={13}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-base bg-white border border-line text-ink placeholder-ink-tertiary focus:border-accent focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  {status === "error" && errMsg && (
                    <p className="text-sm text-accent font-medium">{errMsg}</p>
                  )}
                  <button
                    onClick={submit}
                    disabled={status === "loading" || !name.trim() || !phone.trim()}
                    className="btn btn-gradient w-full font-bold disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  >
                    {status === "loading" ? "접수 중..." : status === "error" ? "다시 시도" : "결혼매칭 상담 신청"}
                  </button>
                  <p className="text-[11px] text-ink-tertiary font-medium text-center pt-2">
                    남기신 정보는 매칭 상담 외 절대 사용되지 않습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
