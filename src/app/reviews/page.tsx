"use client";
import { useEffect, useState } from "react";

type Review = { id: number; author: string; content: string };

const pk = "#d4567a";
const gd = "#c9956b";
const mt = "#666";
const sb = "#333";

const Star = ({ c = "w-3 h-3" }: { c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
  </svg>
);

const ArrowL = ({ c = "w-4 h-4" }: { c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const Heart = ({ c = "w-4 h-4" }: { c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[] | null>(null);

  useEffect(() => {
    fetch("/api/review").then(r => r.ok ? r.json() : []).then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #fff8fa, #fdf6f8)" }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-pink-50 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: sb }}>
            <ArrowL />홈으로
          </a>
          <a href="/" className="flex items-center gap-2">
            <span style={{ color: pk }}><Heart /></span>
            <span className="font-logo text-base sm:text-lg" style={{ letterSpacing: "-0.02em" }}>인연<span style={{ color: pk }}>연구소</span></span>
          </a>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${pk}10`, border: `1px solid ${pk}20` }}>
              <span style={{ color: pk }}><Star c="w-3.5 h-3.5" /></span>
              <span className="text-xs font-bold" style={{ color: pk }}>Review Board</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
              회원 후기 <span style={{ background: `linear-gradient(135deg, ${pk}, #e8457f)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>전체 보기</span>
            </h1>
            <p className="text-sm mt-3" style={{ color: sb }}>실제 사용하신 분들만 작성 가능한 게시판입니다.</p>
          </div>

          {items === null ? (
            <div className="text-center py-20 text-sm" style={{ color: mt }}>불러오는 중...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-pink-200 bg-white/60" style={{ color: mt }}>
              <p className="text-sm">아직 등록된 후기가 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(r => (
                <li key={r.id} className="bg-white rounded-2xl border border-pink-50 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #fff0f5, #fce4ec)", color: pk }}>
                      {r.author?.[0] ?? "익"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: sb }}>{r.author}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: gd }}><Star /></span>)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words" style={{ color: sb, lineHeight: 1.75 }}>{r.content}</p>
                </li>
              ))}
            </ul>
          )}

          {items && items.length > 0 && (
            <p className="text-center text-xs mt-10" style={{ color: mt }}>총 {items.length}건의 후기</p>
          )}
        </div>
      </section>
    </main>
  );
}
