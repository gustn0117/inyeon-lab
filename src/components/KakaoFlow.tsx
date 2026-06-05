"use client";

const PINK = "#d4567a";

type Msg = { from: "lab" | "user"; text: string; time?: string };

const CONV: Msg[] = [
  { from: "lab", text: "안녕하세요, 인연연구소입니다!\n어떤 이상형을 찾고 계신가요?", time: "오후 2:14" },
  { from: "user", text: "30대 초반, 서울 사시는 분이면 좋겠어요.", time: "오후 2:15" },
  { from: "user", text: "직업은 안정적인 분이면 좋고, 차분한 스타일 선호해요.", time: "오후 2:15" },
  { from: "lab", text: "확인했습니다 :)\n조건에 맞는 회원 두 분 추천드릴게요!", time: "오후 2:18" },
  { from: "lab", text: "✓ 31세 공무원, 서울 거주\n✓ 33세 대기업, 경기 거주\n어느 분과 먼저 만나보시겠어요?", time: "오후 2:18" },
  { from: "user", text: "첫 번째 분으로 부탁드려요!", time: "오후 2:22" },
  { from: "lab", text: "조율되는 대로 만남 일정 안내드릴게요.\n매칭 성사 시에만 결제 진행됩니다 ☺️", time: "오후 2:23" },
];

export default function KakaoFlow() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff9f3 0%, #faeede 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "#ffe0e8" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "#fff0d6" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-14 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: `${PINK}10`, color: PINK }}>
            <span className="text-[11px] font-bold tracking-widest">HOW IT WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Cafe24SurroundAir', sans-serif", color: "#222" }}>
            카톡으로 이렇게 진행됩니다
          </h2>
          <p className="text-sm mt-3" style={{ color: "#666" }}>
            앱 설치 없이, 카톡 한 번으로 매칭사가 직접 도와드려요.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center reveal">
          {/* 좌: 안내 텍스트 */}
          <div className="space-y-5 order-2 lg:order-1">
            {[
              { n: "01", t: "카톡으로 문의", d: "ID inyeon_으로 메시지 보내주세요." },
              { n: "02", t: "이상형 알려주시면", d: "나이·지역·직업·스타일 등 원하는 조건을 알려주세요." },
              { n: "03", t: "사진·프로필 전달", d: "조건에 맞는 검증된 회원의 실제 사진과 자세한 프로필을 1:1로 보내드려요." },
              { n: "04", t: "대면 소개팅 진행", d: "매칭이 성사되면 만남 일정을 잡아드립니다." },
              { n: "05", t: "후불제 결제", d: "매칭이 성사된 경우에만 결제하시면 됩니다." },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-extrabold" style={{ background: `${PINK}10`, color: PINK }}>
                  {s.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold" style={{ color: "#222" }}>{s.t}</div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "#777" }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 중: 화살표 (PC 전용) */}
          <div className="hidden lg:flex flex-col items-center order-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          {/* 우: 폰 mockup + 카톡 대화 */}
          <div className="order-1 lg:order-3 mx-auto" style={{ perspective: "1200px" }}>
            <div className="relative w-[300px] sm:w-[320px] rounded-[2.5rem] bg-black p-3 shadow-2xl" style={{ transform: "rotate(-1deg)" }}>
              {/* 상태바 영역 */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
              <div className="rounded-[2rem] overflow-hidden bg-[#9aafc0]">
                {/* 카톡 헤더 */}
                <div className="px-4 pt-8 pb-3 flex items-center gap-3 text-white" style={{ background: "#a4b8c7" }}>
                  <button className="text-white/90">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold">인연연구소</div>
                  </div>
                </div>

                {/* 메시지 영역 */}
                <div className="bg-[#a4b8c7] px-3 py-4 space-y-2.5 min-h-[420px] max-h-[480px] overflow-y-auto">
                  {CONV.map((m, i) => {
                    if (m.from === "user") {
                      return (
                        <div key={i} className="flex justify-end items-end gap-1">
                          <span className="text-[9px] text-white/70 mb-0.5">{m.time}</span>
                          <div className="max-w-[75%] px-3 py-2 rounded-xl bg-[#FEE500] text-[11.5px] leading-relaxed text-[#222] whitespace-pre-line">
                            {m.text}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
                          인
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[9.5px] text-white/80 mb-0.5">인연연구소</span>
                          <div className="flex items-end gap-1">
                            <div className="max-w-[80%] px-3 py-2 rounded-xl bg-white text-[11.5px] leading-relaxed text-[#222] whitespace-pre-line shadow-sm">
                              {m.text}
                            </div>
                            <span className="text-[9px] text-white/70 mb-0.5">{m.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-extrabold text-white shadow-xl shadow-pink-200/40 hover:shadow-2xl transition-all"
            style={{ background: `linear-gradient(135deg, ${PINK}, #e8457f)` }}>
            지금 카톡으로 시작하기
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
