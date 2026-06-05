"use client";

const Icons = {
  shield: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  currency: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  sparkle: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  eye: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  users: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
};

export default function BentoBenefits() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-paper">
      {/* 배경 데코 */}
      <div className="absolute top-20 left-[8%] w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "#c23065" }} />
      <div className="absolute bottom-20 right-[8%] w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#b8854a" }} />

      <div className="container-ed relative">
        {/* 헤더 */}
        <div className="mb-14 sm:mb-20 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-ink/30" />
            <span className="label-ed">OUR PROMISE</span>
          </div>
          <h2 className="h-display text-ink" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
            인연연구소만의 <span className="text-gradient">차별점.</span>
          </h2>
          <p className="text-base sm:text-lg mt-6 max-w-xl text-ink-soft">
            평범하지 않은 서비스를 위해, 평범하지 않은 약속을 드립니다.
          </p>
        </div>

        {/* Bento — 12컬럼 비대칭 */}
        <div className="grid grid-cols-12 gap-3 sm:gap-5 reveal">
          {/* 1. 큰 카드 - 후불제 (좌 8컬럼 + 큰 행) */}
          <article className="col-span-12 sm:col-span-8 row-span-2 relative rounded-2xl overflow-hidden p-8 sm:p-12 bg-ink text-white min-h-[340px] sm:min-h-[420px]">
            <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(194,48,101,0.6)" }} />
            <div className="absolute -bottom-16 -left-12 w-56 h-56 rounded-full blur-3xl" style={{ background: "rgba(184,133,74,0.45)" }} />

            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                  {Icons.currency("w-7 h-7 text-white")}
                </div>
                <div className="text-right">
                  <div className="label-ed" style={{ color: "var(--gold-soft)" }}>01</div>
                  <div className="text-[10px] text-white/40 mt-0.5">CORE PROMISE</div>
                </div>
              </div>

              <div>
                <h3 className="font-impact text-3xl sm:text-5xl lg:text-6xl mb-4 leading-[1.1]">
                  매칭 <span className="text-gradient">후 결제</span>,<br />
                  가입비는 <span className="font-serif-en italic">제로</span>.
                </h3>
                <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed">
                  선결제 부담은 잊으세요. 마음에 드는 이성과 매칭이 성사된 경우에만 결제됩니다.
                  <span className="block mt-2 text-white/45 text-xs">여성 회원은 첫 매칭 1회 무료.</span>
                </p>
              </div>
            </div>
          </article>

          {/* 2. 사진/프로필 (우 4컬럼 큰 행) */}
          <article className="col-span-12 sm:col-span-4 row-span-2 relative rounded-2xl overflow-hidden p-7 sm:p-9 text-white min-h-[280px]" style={{ background: "linear-gradient(135deg, #c23065 0%, #6e1a3e 100%)" }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl bg-white/20" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                {Icons.eye("w-6 h-6 text-white")}
              </div>
              <div>
                <div className="label-ed mb-3" style={{ color: "var(--gold-soft)" }}>02 · PRIVATE</div>
                <h3 className="font-impact text-2xl sm:text-3xl leading-tight mb-3">
                  사진과 프로필,<br />직접 전달.
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  실제 사진과 자세한 정보를 1:1 비공개로 보내드립니다.
                </p>
              </div>
            </div>
          </article>

          {/* 3. 신원 검증 */}
          <article className="col-span-6 sm:col-span-4 card-ed border-gradient p-6 sm:p-7 relative">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-brand/10 text-brand">
              {Icons.shield("w-6 h-6")}
            </div>
            <div className="label-ed mb-2">03</div>
            <h3 className="font-impact text-lg sm:text-xl text-ink mb-2 leading-tight">신원 100% 검증</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">재직증명서·혼인관계증명서 확인</p>
          </article>

          {/* 4. 전문 매칭사 (골드) */}
          <article className="col-span-6 sm:col-span-4 rounded-2xl p-6 sm:p-7 relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #b8854a 0%, #8e6840 100%)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-white/15">
              {Icons.sparkle("w-6 h-6 text-white")}
            </div>
            <div className="label-ed mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>04</div>
            <h3 className="font-impact text-lg sm:text-xl mb-2 leading-tight">전문 매칭사 1:1</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">AI 아닌 사람이 직접 분석</p>
          </article>

          {/* 5. 대면 보장 */}
          <article className="col-span-12 sm:col-span-4 card-ed p-6 sm:p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-brand/10 text-brand">
              {Icons.users("w-6 h-6")}
            </div>
            <div className="label-ed mb-2">05</div>
            <h3 className="font-impact text-lg sm:text-xl text-ink mb-2 leading-tight">대면 소개팅 보장</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">실제 만남 일정까지 책임</p>
          </article>
        </div>
      </div>
    </section>
  );
}
