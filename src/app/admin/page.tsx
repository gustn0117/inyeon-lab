"use client";
import { useState } from "react";

type Inquiry = { id: number; name: string; phone: string; created_at: string };
type Review = { id: number; author: string; content: string };
type Tab = "inquiries" | "reviews";

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("inquiries");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  // 후기 작성 폼
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [postMsg, setPostMsg] = useState("");

  const fetchInquiries = async (password = pw) => {
    const res = await fetch(`/api/inquiry?pw=${encodeURIComponent(password)}`);
    if (res.ok) { setInquiries(await res.json()); return true; }
    return false;
  };
  const fetchReviews = async () => {
    const res = await fetch(`/api/review`);
    if (res.ok) setReviews(await res.json());
  };

  const login = async () => {
    setLoading(true);
    setError("");
    const ok = await fetchInquiries(pw);
    if (ok) {
      await fetchReviews();
      setAuthed(true);
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
    setLoading(false);
  };

  const removeInquiry = async (id: number) => {
    if (!confirm("이 문의를 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&id=${id}`, { method: "DELETE" });
    await fetchInquiries();
    setBusy(false);
  };

  const purgeBots = async () => {
    if (!confirm("SQL 페이로드/봇 패턴이 포함된 문의를 모두 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/inquiry?pw=${encodeURIComponent(pw)}&purgeBots=1`, { method: "DELETE" });
    await fetchInquiries();
    setBusy(false);
  };

  const submitReview = async () => {
    setPostMsg("");
    if (!content.trim()) { setPostMsg("후기 내용을 입력해주세요."); return; }
    setBusy(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pw, author: author.trim() || "익명", content }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setAuthor(""); setContent("");
      await fetchReviews();
      setPostMsg("등록되었습니다.");
    } else {
      setPostMsg(data?.error || "등록 실패");
    }
    setBusy(false);
  };

  const removeReview = async (id: number) => {
    if (!confirm("이 후기를 삭제할까요?")) return;
    setBusy(true);
    await fetch(`/api/review?pw=${encodeURIComponent(pw)}&id=${id}`, { method: "DELETE" });
    await fetchReviews();
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm">
          <button
            onClick={() => setTab("inquiries")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === "inquiries" ? "bg-[#d4567a] text-white" : "text-gray-500 hover:bg-gray-50"}`}
          >문의 내역 ({inquiries.length})</button>
          <button
            onClick={() => setTab("reviews")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors ${tab === "reviews" ? "bg-[#d4567a] text-white" : "text-gray-500 hover:bg-gray-50"}`}
          >후기 관리 ({reviews.length})</button>
        </div>

        {tab === "inquiries" && (
          <>
            <div className="flex items-center justify-end gap-3 mb-4">
              <button onClick={purgeBots} disabled={busy}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 font-medium">
                봇 일괄 삭제
              </button>
              <button onClick={() => fetchInquiries()} disabled={busy}
                className="text-sm text-[#d4567a] font-medium hover:underline disabled:opacity-50">
                새로고침
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">아직 문의가 없습니다.</div>
            ) : (
              <div className="space-y-3">
                {inquiries.map(d => (
                  <div key={d.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">{d.name}</div>
                      <a href={`tel:${d.phone}`} className="text-sm text-[#d4567a] block truncate">{d.phone}</a>
                    </div>
                    <div className="text-xs text-gray-400 text-right flex-shrink-0">
                      {new Date(d.created_at).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <button onClick={() => removeInquiry(d.id)} disabled={busy}
                      className="flex-shrink-0 w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                      aria-label="삭제">×</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "reviews" && (
          <>
            {/* 후기 작성 폼 */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
              <h2 className="text-sm font-bold mb-4">새 후기 작성</h2>
              <input
                type="text"
                placeholder="작성자명 (예: 김OO 28세 여성)"
                value={author}
                maxLength={30}
                onChange={e => setAuthor(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none mb-3"
              />
              <textarea
                placeholder="후기 내용을 입력해주세요..."
                value={content}
                maxLength={2000}
                rows={5}
                onChange={e => setContent(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-pink-400 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-3 gap-3">
                {postMsg ? (
                  <p className={`text-xs flex-1 ${postMsg.includes("등록") ? "text-green-600" : "text-red-500"}`}>{postMsg}</p>
                ) : (
                  <span className="text-xs text-gray-400 flex-1">{content.length}/2000</span>
                )}
                <button onClick={submitReview} disabled={busy || !content.trim()}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#d4567a] hover:bg-[#c44a6e] transition-colors disabled:opacity-40">
                  {busy ? "등록 중..." : "등록"}
                </button>
              </div>
            </div>

            {/* 후기 목록 */}
            {reviews.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">아직 등록된 후기가 없습니다.</div>
            ) : (
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-bold text-sm" style={{ color: "#333" }}>{r.author}</div>
                      <button onClick={() => removeReview(r.id)} disabled={busy}
                        className="flex-shrink-0 text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="삭제">삭제</button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words text-gray-600 leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
