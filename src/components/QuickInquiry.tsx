"use client";
import { useState } from "react";
import { IconMail, HandUnderline } from "@/components/Icons";

/* ═══ QuickInquiry — 라이트 테마 간편 문의 폼 ═══ */
export default function QuickInquiry() {
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
        body: JSON.stringify({ name, phone, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("done"); setName(""); setPhone(""); }
      else { setStatus("error"); setErrMsg(data?.error || "다시 시도해주세요."); }
    } catch { setStatus("error"); setErrMsg("네트워크 오류"); }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-narrow">
        <div className="text-center mb-10 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">QUICK INQUIRY</div>
          <h2 className="h-section font-bold text-ink mb-3" style={{ fontWeight: 700 }}>
            번호 남겨주시면<br /><span className="text-rainbow relative inline-block">먼저 연락드려요<HandUnderline /></span>.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft font-medium">카톡이 어려우신 분은 간편 폼으로 남겨주세요.</p>
        </div>

        <div className="card-rainbow bg-white p-6 sm:p-8 max-w-xl mx-auto reveal">
          {status === "done" ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-soft text-accent mb-4">
                <IconMail size={28} />
              </div>
              <p className="text-lg font-bold text-ink mb-2">문의가 접수되었습니다!</p>
              <p className="text-sm text-ink-soft font-medium">담당 매칭사가 확인 후 순차적으로 연락드립니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
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
                {status === "loading" ? "접수 중..." : status === "error" ? "다시 시도" : "연락 받기"}
              </button>
              <p className="text-[11px] text-ink-tertiary font-medium text-center pt-2">
                남기신 정보는 매칭 상담 외 절대 사용되지 않습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
