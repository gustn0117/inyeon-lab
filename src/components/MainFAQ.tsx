"use client";
import { useState } from "react";
import { Sparkle, HandUnderline } from "@/components/Icons";

const fqs = [
  { q: "정말 가입비가 없나요?", a: "네, 가입비 0원입니다. 마음에 드는 분으로 매칭 성사 시에만 결제하는 100% 후불제입니다." },
  { q: "매칭까지 얼마나 걸리나요?", a: "서류 확인 후 평균 48시간 이내에 첫 프로필을 제안합니다. 마음에 안 들면 다른 분을 다시 추천드려요." },
  { q: "소개팅 앱과 뭐가 다른가요?", a: "앱은 사진으로만 판단하지만, 인연연구소는 서류 검증 + 전문 매칭사의 성격·가치관 분석 기반 매칭입니다." },
  { q: "결혼을 전제로 해야 하나요?", a: "아닙니다. 가벼운 소개팅부터 진지한 만남까지, 회원님의 목적에 맞춰 매칭해드립니다." },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="card-rainbow bg-white mb-3 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-5 sm:p-6 flex items-center justify-between text-left">
        <span className="text-base sm:text-lg font-bold text-ink pr-6" style={{ fontWeight: 700 }}>{q}</span>
        <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-accent text-white shadow-md transition-transform ${open ? "rotate-180" : ""}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-base text-ink-soft leading-relaxed font-medium">{a}</p>
      </div>
    </div>
  );
}

export default function MainFAQ() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-narrow">
        <div className="text-center mb-10 reveal">
          <div className="eyebrow-lined mb-4 mx-auto">QUICK FAQ</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            궁금한 점, <span className="text-rainbow relative inline-block">미리 답변<HandUnderline /></span>.
          </h2>
        </div>
        <div className="reveal">
          {fqs.map((f, i) => <Item key={i} {...f} i={i} />)}
        </div>
        <div className="text-center mt-6 reveal">
          <a href="/contact" className="btn-link text-sm">더 많은 질문 보기 →</a>
        </div>
      </div>
    </section>
  );
}
