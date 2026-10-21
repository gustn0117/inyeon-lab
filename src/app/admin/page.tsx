"use client";
import { useState } from "react";
import { CoachingApplicationsAdmin, CoachingProgramsAdmin } from "@/components/coaching/CoachingAdmin";

type Tab = "coaching" | "programs";

const PINK = "#742d40";

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("coaching");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 비번 변경 모달
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwMsg, setPwMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/password", { headers: { "x-admin-password": pw }, cache: "no-store" });
      if (res.ok) setAuthed(true);
      else setError("비밀번호 또는 관리자 설정을 확인해주세요.");
    } catch { setError("서버 연결을 확인한 뒤 다시 시도해주세요."); }
    finally { setLoading(false); }
  };

  const openPwModal = () => {
    setPwCurrent(""); setPwNew(""); setPwConfirm(""); setPwMsg(null);
    setPwModalOpen(true);
  };
  const submitPwChange = async () => {
    setPwMsg(null);
    if (!/^\S{8,72}$/.test(pwNew)) {
      setPwMsg({ kind: "err", text: "새 비밀번호는 공백 없이 8~72자로 입력해주세요." });
      return;
    }
    if (pwNew !== pwConfirm) {
      setPwMsg({ kind: "err", text: "새 비밀번호 확인이 일치하지 않습니다." });
      return;
    }
    setPwBusy(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: pwCurrent, new: pwNew }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      // 변경 성공 → 현재 세션의 pw도 새 값으로 (폴링 fetch가 끊기지 않게)
      setPw(pwNew);
      setPwMsg({ kind: "ok", text: "변경되었습니다." });
      setTimeout(() => setPwModalOpen(false), 1200);
    } else {
      setPwMsg({ kind: "err", text: data?.error || "변경에 실패했습니다." });
    }
    setPwBusy(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs">
          <h1 className="text-lg font-bold text-center mb-6">관리자 로그인</h1>
          <input type="password" placeholder="비밀번호" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3" />
          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
          <button onClick={login} disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-colors disabled:opacity-50"
            style={{ background: PINK }}>
            {loading ? "확인 중..." : "로그인"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h1 className="text-base sm:text-lg font-extrabold" style={{ color: "#222" }}>관리자 페이지</h1>
          <button
            onClick={openPwModal}
            className="text-xs sm:text-[13px] font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:border-pink-300 hover:text-pink-600 transition-colors"
          >
            비밀번호 변경
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm">
          {([ ["coaching", "코칭 신청"], ["programs", "프로그램·가격"] ] as const).map(([value, label]) => <button key={value} onClick={() => setTab(value)} className={`flex-1 min-w-[100px] py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === value ? "text-white" : "text-gray-500 hover:bg-gray-50"}`} style={tab === value ? { background: PINK } : {}}>{label}</button>)}
        </div>

        {tab === "coaching" && <CoachingApplicationsAdmin password={pw} />}
        {tab === "programs" && <CoachingProgramsAdmin password={pw} />}
      </div>

      {/* 비밀번호 변경 모달 */}
      {pwModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => !pwBusy && setPwModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-extrabold mb-1" style={{ color: "#222" }}>비밀번호 변경</h2>
            <p className="text-[11px] mb-5" style={{ color: "#888" }}>새 비밀번호는 공백 없이 8~72자로 입력해주세요.</p>

            <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "#666" }}>현재 비밀번호</label>
            <input
              type="password"
              maxLength={72}
              value={pwCurrent}
              onChange={e => setPwCurrent(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3 tracking-normal"
              autoFocus
            />

            <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "#666" }}>새 비밀번호</label>
            <input
              type="password"
              maxLength={72}
              value={pwNew}
              onChange={e => setPwNew(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3 tracking-normal"
            />

            <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "#666" }}>새 비밀번호 확인</label>
            <input
              type="password"
              maxLength={72}
              value={pwConfirm}
              onChange={e => setPwConfirm(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) submitPwChange();
              }}
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3 tracking-normal"
            />

            {pwMsg && (
              <p className={`text-xs mb-3 ${pwMsg.kind === "ok" ? "text-green-600" : "text-red-500"}`}>{pwMsg.text}</p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setPwModalOpen(false)}
                disabled={pwBusy}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >취소</button>
              <button
                onClick={submitPwChange}
                disabled={pwBusy || !pwCurrent.length || pwNew.length < 8 || pwConfirm.length < 8}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-40"
                style={{ background: PINK }}
              >{pwBusy ? "변경 중..." : "변경하기"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
