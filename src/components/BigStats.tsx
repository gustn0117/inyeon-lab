"use client";

const PINK = "#d4567a";
const GOLD = "#c9956b";
const PLUM = "#2d1f25";

export default function BigStats() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf7f1 0%, #faeede 100%)" }}>
      {/* 배경 데코 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-[8%] w-72 h-72 rounded-full blur-3xl" style={{ background: `${PINK}15` }} />
        <div className="absolute bottom-20 right-[8%] w-80 h-80 rounded-full blur-3xl" style={{ background: `${GOLD}20` }} />
        {/* 떠다니는 작은 점들 */}
        <div className="absolute top-32 right-[20%] w-2 h-2 rounded-full anim-twinkle" style={{ background: PINK, animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-[15%] w-1.5 h-1.5 rounded-full anim-twinkle" style={{ background: GOLD, animationDelay: "1.5s" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* 라벨 */}
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-white shadow-md" style={{ color: PINK }}>
            <span className="star-deco anim-twinkle" style={{ width: "10px", height: "10px" }} />
            <span className="text-[11px] font-extrabold tracking-[0.22em]">BY THE NUMBERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: PLUM, fontFamily: "'Cafe24SurroundAir', sans-serif" }}>
            숫자로 보는 <span className="text-aurora">인연연구소</span>
          </h2>
        </div>

        {/* Bento 그리드 — 다양한 크기 */}
        <div className="grid grid-cols-12 gap-3 sm:gap-5 reveal">
          {/* 메인 큰 숫자 */}
          <div className="col-span-12 sm:col-span-7 relative rounded-3xl p-8 sm:p-12 overflow-hidden text-white"
            style={{ background: `linear-gradient(135deg, ${PINK} 0%, #e8457f 60%, #c23065 100%)`, boxShadow: `0 20px 50px -10px ${PINK}50` }}>
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl bg-white opacity-15" />
            <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full blur-3xl" style={{ background: GOLD, opacity: 0.25 }} />
            <div className="relative">
              <div className="text-[11px] font-extrabold tracking-[0.22em] mb-3 text-white/80">CONSULTATIONS</div>
              <div className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-extrabold leading-none tracking-tighter tabular-nums" style={{ fontFamily: "'Nunito', sans-serif" }}>
                9,999<span className="text-[3rem] sm:text-[5rem] lg:text-[6rem] align-top" style={{ color: "#ffd6e1" }}>+</span>
              </div>
              <div className="text-base sm:text-xl font-bold mt-3 sm:mt-4">누적 상담 회수</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1.5">2026년 5월 기준</div>
            </div>
          </div>

          {/* 51:49 성비 */}
          <div className="col-span-6 sm:col-span-5 rounded-3xl p-6 sm:p-9 bg-white relative overflow-hidden card-luxe">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl" style={{ background: `${GOLD}25` }} />
            <div className="relative">
              <div className="text-[10px] font-extrabold tracking-[0.22em] mb-2" style={{ color: GOLD }}>GENDER RATIO</div>
              <div className="flex items-baseline gap-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <span className="text-5xl sm:text-7xl font-extrabold" style={{ color: PINK }}>51</span>
                <span className="text-2xl sm:text-4xl font-bold" style={{ color: GOLD }}>:</span>
                <span className="text-5xl sm:text-7xl font-extrabold" style={{ color: GOLD }}>49</span>
              </div>
              <div className="text-sm sm:text-base font-bold mt-2" style={{ color: PLUM }}>건강한 남녀 성비</div>
              <div className="text-[11px] sm:text-xs mt-1" style={{ color: "#888" }}>균형 잡힌 회원 풀</div>
              {/* 비율 바 */}
              <div className="mt-4 sm:mt-5 flex h-2 rounded-full overflow-hidden">
                <span className="block" style={{ width: "51%", background: PINK }} />
                <span className="block" style={{ width: "49%", background: GOLD }} />
              </div>
            </div>
          </div>

          {/* 48h */}
          <div className="col-span-6 sm:col-span-4 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-white" style={{ background: PLUM }}>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl" style={{ background: `${PINK}55` }} />
            <div className="relative">
              <div className="text-[10px] font-extrabold tracking-[0.22em] mb-2 text-white/60">AVG MATCH</div>
              <div className="text-5xl sm:text-7xl font-extrabold leading-none" style={{ fontFamily: "'Nunito', sans-serif", color: "#ffd6e1" }}>
                48<span className="text-2xl sm:text-3xl">h</span>
              </div>
              <div className="text-sm sm:text-base font-bold mt-2">평균 매칭 시간</div>
              <div className="text-[11px] sm:text-xs text-white/55 mt-1">상담 후 24~72시간 내</div>
            </div>
          </div>

          {/* 100% 신원 보장 */}
          <div className="col-span-12 sm:col-span-4 rounded-3xl p-6 sm:p-8 bg-white relative overflow-hidden card-luxe">
            <div className="text-[10px] font-extrabold tracking-[0.22em] mb-2" style={{ color: PINK }}>VERIFIED</div>
            <div className="text-5xl sm:text-7xl font-extrabold leading-none text-aurora" style={{ fontFamily: "'Nunito', sans-serif" }}>100%</div>
            <div className="text-sm sm:text-base font-bold mt-2" style={{ color: PLUM }}>실회원 신원 보장</div>
            <div className="text-[11px] sm:text-xs mt-1" style={{ color: "#888" }}>재직증명서·혼인관계증명서 검증</div>
          </div>

          {/* 0원 */}
          <div className="col-span-12 sm:col-span-4 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #b58050 100%)` }}>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-2xl bg-white opacity-20" />
            <div className="relative">
              <div className="text-[10px] font-extrabold tracking-[0.22em] mb-2 text-white/80">SIGN-UP FEE</div>
              <div className="text-5xl sm:text-7xl font-extrabold leading-none" style={{ fontFamily: "'Nunito', sans-serif" }}>0<span className="text-2xl sm:text-3xl">원</span></div>
              <div className="text-sm sm:text-base font-bold mt-2">가입비 없음</div>
              <div className="text-[11px] sm:text-xs text-white/75 mt-1">매칭 성사 시에만 결제</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
