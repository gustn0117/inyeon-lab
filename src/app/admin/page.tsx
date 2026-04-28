"use client";
import { useState } from "react";

type Inquiry = { id: number; name: string; phone: string; created_at: string };

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Inquiry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchList = async (password = pw) => {
    const res = await fetch(`/api/inquiry?pw=${encodeURIComponent(password)}`);
    if (res.ok) {
      setData(await res.json());
      return true;
    }
    return false;
  };

  const login = async () => {
    setLoading(true);
    setError("");
    const ok = await fetchList(pw);
    if (ok) setAuthed(true);
    else setError("비밀번호가 틀렸습니다.");
    setLoading(false);
  };

  const removeOne = async (id: number) => {
    if (!confirm("이 문의를 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&id=${id}`, { method: "DELETE" });
    await fetchList();
    setBusy(false);
  };

  const purgeBots = async () => {
    if (!confirm("SQL 페이로드/봇 패턴이 포함된 문의를 모두 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&purgeBots=1`, { method: "DELETE" });
    await fetchList();
    setBusy(false);
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
            className="w-full rounded-xl py-3 text-sm font-bold text-white bg-[#d4567a] hover:bg-[#c44a6e] transition-colors disabled:opacity-50">
            {loading ? "확인 중..." : "로그인"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">문의 내역</h1>
          <div className="flex items-center gap-3">
            <button onClick={purgeBots} disabled={busy}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 font-medium">
              봇 일괄 삭제
            </button>
            <button onClick={() => fetchList()} disabled={busy}
              className="text-sm text-[#d4567a] font-medium hover:underline disabled:opacity-50">
              새로고침
            </button>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">아직 문의가 없습니다.</div>
        ) : (
          <div className="space-y-3">
            {data.map(d => (
              <div key={d.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{d.name}</div>
                  <a href={`tel:${d.phone}`} className="text-sm text-[#d4567a] block truncate">{d.phone}</a>
                </div>
                <div className="text-xs text-gray-400 text-right flex-shrink-0">
                  {new Date(d.created_at).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </div>
                <button
                  onClick={() => removeOne(d.id)}
                  disabled={busy}
                  className="flex-shrink-0 w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                  aria-label="삭제"
                >×</button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">총 {data.length}건</p>
      </div>
    </div>
  );
}
