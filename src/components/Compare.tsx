"use client";
import { IconCheck, IconCrown, Sparkle, HandUnderline } from "@/components/Icons";

const rows = [
  { label: "가입비", app: "보통 무료", marriage: "100~500만원", us: "0원" },
  { label: "결제 시점", app: "월 구독", marriage: "선불", us: "매칭 성사 후" },
  { label: "신원 확인", app: "사진만", marriage: "꼼꼼함", us: "재직·혼인관계 검증" },
  { label: "매칭 방식", app: "AI 추천", marriage: "주선자", us: "전문 매칭사 1:1" },
  { label: "타겟", app: "전 연령", marriage: "30~50대", us: "20·30대 전용" },
  { label: "분위기", app: "가벼움", marriage: "결혼 전제", us: "딱 그 사이" },
];

/* ═══ COMPARE — vs 앱 vs 결정사 비교 ═══ */
export default function Compare() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container-apple relative">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle size={14} />
            <span className="label-sm">COMPARE</span>
            <Sparkle size={14} />
          </div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            왜 <span className="text-rainbow relative inline-block">인연연구소<HandUnderline /></span>인가.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mt-4 font-medium">소개팅 앱과 결혼정보회사, 그 사이</p>
        </div>

        <div className="reveal">
          {/* 헤더 */}
          <div className="hidden sm:grid grid-cols-12 gap-3 mb-3 px-2">
            <div className="col-span-3"></div>
            <div className="col-span-3 text-center caption-xs">소개팅 앱</div>
            <div className="col-span-3 text-center caption-xs">결혼정보회사</div>
            <div className="col-span-3 text-center">
              <div className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider">
                <IconCrown size={14} />
                인연연구소
              </div>
            </div>
          </div>

          {/* 행들 */}
          <div className="card-rainbow bg-white overflow-hidden">
            {rows.map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 sm:grid-cols-12 gap-3 px-4 sm:px-6 py-4 sm:py-5 ${i !== 0 ? "border-t border-pink-100" : ""}`}
              >
                <div className="col-span-2 sm:col-span-3 text-sm sm:text-base font-extrabold text-ink">{r.label}</div>
                <div className="sm:col-span-3 text-sm text-ink-soft sm:text-center">
                  <span className="sm:hidden caption-xs block mb-1">앱</span>
                  {r.app}
                </div>
                <div className="sm:col-span-3 text-sm text-ink-soft sm:text-center">
                  <span className="sm:hidden caption-xs block mb-1">결정사</span>
                  {r.marriage}
                </div>
                <div className="sm:col-span-3 text-sm sm:text-base font-extrabold text-accent sm:text-center flex items-center sm:justify-center gap-1.5">
                  <span className="sm:hidden caption-xs">우리</span>
                  <IconCheck size={16} />
                  {r.us}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
