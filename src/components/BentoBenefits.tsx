"use client";

const PINK = "#d4567a";
const GOLD = "#c9956b";
const PLUM = "#2d1f25";

const Icons = {
  shield: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  currency: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  sparkle: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  chat: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
  eye: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  users: (c = "w-6 h-6") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
};

export default function BentoBenefits() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden mesh-blush">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-white shadow-sm" style={{ color: PINK }}>
            <span className="star-deco anim-twinkle" style={{ width: "10px", height: "10px" }} />
            <span className="text-[11px] font-extrabold tracking-[0.22em]">WHY US</span>
          </div>
          <h2 className="font-impact text-[1.8rem] sm:text-4xl lg:text-5xl tracking-tight" style={{ color: PLUM, lineHeight: 1.15 }}>
            인연연구소만의 <span className="text-aurora">차별점</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-3 sm:gap-5 reveal auto-rows-[120px] sm:auto-rows-[150px]">
          {/* 1. 큰 카드 - 후불제 */}
          <div className="col-span-12 sm:col-span-7 row-span-2 rounded-3xl p-7 sm:p-10 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${PINK} 0%, #e8457f 100%)`, boxShadow: `0 20px 50px -10px ${PINK}50` }}>
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl bg-white opacity-20" />
            <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full blur-3xl" style={{ background: GOLD, opacity: 0.3 }} />
            <div className="relative h-full flex flex-col justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                {Icons.currency("w-7 h-7 text-white")}
              </div>
              <div>
                <div className="text-[11px] font-extrabold tracking-[0.22em] mb-2 text-white/85">100% AFTER-PAY</div>
                <h3 className="font-impact text-[1.7rem] sm:text-[2.2rem] lg:text-[2.8rem] leading-[1.15] mb-3 tracking-tight">
                  매칭 후 결제,<br />가입비는 0원
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                  선결제 부담 없이 시작하세요. 마음에 드는 이성과 매칭이 성사된 경우에만 결제됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 2. 사진/프로필 전달 */}
          <div className="col-span-6 sm:col-span-5 row-span-2 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-white" style={{ background: PLUM }}>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl" style={{ background: `${PINK}55` }} />
            <div className="relative h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                {Icons.eye("w-6 h-6 text-white")}
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-[0.22em] mb-2" style={{ color: "#ffd6e1" }}>PRIVATE</div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-2">
                  사진·프로필<br />직접 전달
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  실제 사진과 자세한 프로필을<br />1:1 비공개로 보내드립니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3. 신원 검증 */}
          <div className="col-span-6 sm:col-span-4 rounded-3xl p-5 sm:p-6 bg-white card-luxe relative overflow-hidden">
            <div className="flex items-start gap-3 h-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${PINK}15`, color: PINK }}>
                {Icons.shield("w-5 h-5")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-extrabold mb-1" style={{ color: PLUM }}>신원 100% 검증</div>
                <div className="text-[11px] sm:text-xs leading-relaxed" style={{ color: "#777" }}>재직증명서·혼인관계증명서 확인</div>
              </div>
            </div>
          </div>

          {/* 4. 전문 매칭사 */}
          <div className="col-span-6 sm:col-span-4 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #b58050 100%)` }}>
            <div className="flex items-start gap-3 h-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20">
                {Icons.sparkle("w-5 h-5 text-white")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-extrabold mb-1">전문 매칭사 1:1</div>
                <div className="text-[11px] sm:text-xs text-white/80 leading-relaxed">AI 아닌 사람이 직접 분석</div>
              </div>
            </div>
          </div>

          {/* 5. 대면 보장 */}
          <div className="col-span-12 sm:col-span-4 rounded-3xl p-5 sm:p-6 bg-white card-luxe relative overflow-hidden">
            <div className="flex items-start gap-3 h-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${PINK}15`, color: PINK }}>
                {Icons.users("w-5 h-5")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-extrabold mb-1" style={{ color: PLUM }}>대면 소개팅 보장</div>
                <div className="text-[11px] sm:text-xs leading-relaxed" style={{ color: "#777" }}>실제 만남 일정까지 책임</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
