"use client";
/* ═══ Apple-style 섹션 모음 — About/Pricing/Contact 페이지용 ═══ */

const ACCENT = "#ec4d7e";

// 공통 SVG
const I = {
  check: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  arrowR: (c = "w-4 h-4") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
  phone: (c = "w-5 h-5") => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
};

const KAKAO_ID = "inyeon_";
const INSTAGRAM = "https://www.instagram.com/inyeon_lab?igsh=cHphNHZnaDV1MGpr";

/* ═══ ABOUT — Apple split ═══ */
export function AppleAbout() {
  return (
    <section className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <div className="label-sm mb-5">ABOUT US</div>
            <h2 className="h-section font-bold text-ink mb-7" style={{ fontWeight: 700 }}>
              결혼정보회사가 아닌,<br />
              <span className="text-gradient">프리미엄 소개팅.</span>
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-8">
              20·30대를 위한 소개팅 전문.<br />
              가벼운 마음으로 좋은 사람을 만나세요.<br />
              단, 아무나 만나지는 않습니다.
            </p>
            <div className="space-y-3">
              {["매칭 후 결제 후불제", "거리·나이·직업 맞춤", "48시간 평균 매칭", "20·30대 전용"].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-base font-medium text-ink">
                  <span className="text-accent">{I.check("w-5 h-5")}</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { v: "9,999+", l: "누적 상담" },
                { v: "51 : 49", l: "남녀 성비" },
                { v: "48h", l: "평균 매칭" },
                { v: "100%", l: "신원 검증" },
              ].map((s, i) => (
                <div key={i} className="card p-7 sm:p-9 text-center">
                  <div className="num-huge text-3xl sm:text-4xl lg:text-5xl text-ink mb-2">{s.v}</div>
                  <div className="text-sm text-ink-soft font-semibold">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ MEMBER JOBS — Apple 카드 그리드 ═══ */
export function AppleMemberJobs() {
  const groups = [
    { label: "여성 회원", jobs: ["교사", "통역사", "간호사", "아나운서", "승무원", "공무원", "경리", "디자이너"] },
    { label: "남성 회원", jobs: ["공기업", "공무원", "대기업", "교사", "엔지니어", "사업가", "스타트업", "회계사"] },
  ];
  return (
    <section className="bg-sec py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="text-center mb-14 sm:mb-16 reveal">
          <div className="label-sm mb-5">ACTIVE MEMBERS</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            이런 분들이 함께하고 있어요.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">
            현재 활동 중인 검증된 회원들의 직업 분포
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 reveal">
          {groups.map((g, i) => (
            <div key={i} className="card p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-ink mb-6" style={{ fontWeight: 700 }}>{g.label}</h3>
              <div className="flex flex-wrap gap-2">
                {g.jobs.map((j, k) => (
                  <span key={k} className="px-4 py-2 rounded-full text-sm font-medium bg-white text-ink border border-line">
                    {j}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-8 text-ink-soft reveal">
          모든 회원은 재직증명서·신분 확인을 거친 검증된 실회원입니다.
        </p>
      </div>
    </section>
  );
}

/* ═══ PROMISE — Apple 3컬 카드 ═══ */
export function ApplePromise() {
  const promises = [
    { n: "01", t: "아무나 받지 않습니다", d: "전문 매칭사가 신원과 진정성을 직접 확인한 회원만 받습니다." },
    { n: "02", t: "딱 맞게 매칭해드립니다", d: "거리·나이·종교·직업·가치관까지 직접 분석해 한 분 한 분 맞춰드립니다." },
    { n: "03", t: "매칭 후 결제", d: "선불 결제 없음. 실제 매칭 성사 경우에만 결제하는 100% 후불제." },
    { n: "04", t: "사진·프로필 직접 전달", d: "실제 사진과 자세한 프로필을 매칭된 1:1 상대에게만 비공개로 전달." },
    { n: "05", t: "100% 실회원", d: "재직증명서·혼인관계증명서로 신원이 검증된 실제 회원과만 매칭." },
    { n: "06", t: "정성스러운 관리", d: "매칭 후 만남 피드백, 다음 소개 조정까지 전담 매칭사가 함께합니다." },
  ];
  return (
    <section className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="text-center mb-14 sm:mb-16 reveal">
          <div className="label-sm mb-5">OUR PROMISE</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            인연연구소의 약속.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">회원님께 드리는 6가지 다짐</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 reveal">
          {promises.map((p, i) => (
            <div key={i} className="card p-7 sm:p-9">
              <div className="label-sm mb-3">{p.n}</div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5" style={{ fontWeight: 700 }}>{p.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SAFETY FLOW — Apple 4단계 ═══ */
export function AppleSafety() {
  const steps = [
    { n: "01", t: "본인 확인", d: "재직증명서·혼인관계증명서 등으로 신원을 확인합니다. 검증 후 원본은 즉시 폐기." },
    { n: "02", t: "암호화 저장", d: "프로필 정보는 암호화되어 저장됩니다. 외부에서 절대 접근할 수 없습니다." },
    { n: "03", t: "1:1 비공개 전달", d: "프로필은 매칭이 확정된 상대에게만 비공개로 전달됩니다." },
    { n: "04", t: "종료 후 파기", d: "서비스 이용 종료 시 모든 개인정보를 즉시 파기합니다." },
  ];
  return (
    <section className="py-20 sm:py-28 lg:py-32" style={{ background: "linear-gradient(180deg, #fff5f8 0%, #ffe8ef 100%)" }}>
      <div className="container-apple">
        <div className="mb-14 sm:mb-16 reveal text-center">
          <div className="label-sm mb-5">PRIVACY & SAFETY</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            당신의 정보,<br />
            <span className="text-rainbow">이렇게 지킵니다.</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">프로필이 무분별하게 공개되지 않는 이유</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white p-7 border border-line shadow-sm hover-magnetic">
              <div className="label-sm mb-3">{s.n}</div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5" style={{ fontWeight: 700 }}>{s.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 sm:mt-14 max-w-2xl mx-auto text-center reveal">
          <p className="text-base font-semibold text-ink mb-2">개인정보보호법을 준수합니다.</p>
          <p className="text-sm text-ink-soft leading-relaxed">수집·이용·보관·파기 전 과정이 법적 기준을 충족하며, 매칭 외 목적으로 절대 사용되지 않습니다.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING — Apple 2x1 큰 카드 ═══ */
export function ApplePricing() {
  return (
    <section className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="text-center mb-14 sm:mb-16 reveal">
          <div className="label-sm mb-5">PRICING</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            가입비 없이, 매칭 후 결제.
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">합리적인 가격, 그 이상의 퀄리티</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto reveal">
          {/* 여성 */}
          <div className="card p-8 sm:p-10">
            <div className="label-sm mb-4">여성 회원</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="num-huge text-5xl text-ink">6만원</span>
              <span className="text-sm text-ink-soft">/회</span>
            </div>
            <p className="text-sm text-ink-soft mb-7">매칭 성사 시 결제 (후불제)</p>
            <div className="space-y-2.5 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink"><span className="text-accent">{I.check("w-4 h-4")}</span>{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-secondary w-full">상담 받기</a>
          </div>
          {/* 남성 */}
          <div className="card p-8 sm:p-10">
            <div className="label-sm mb-4">남성 회원</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="num-huge text-5xl text-ink">9만원</span>
              <span className="text-sm text-ink-soft">/회</span>
            </div>
            <p className="text-sm text-ink-soft mb-7">매칭 성사 시 결제 (후불제)</p>
            <div className="space-y-2.5 mb-8">
              {["신원보장 서류검토", "조건별 맞춤 매칭", "프로필 제공", "피드백 리포트"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink"><span className="text-accent">{I.check("w-4 h-4")}</span>{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-secondary w-full">상담 받기</a>
          </div>
          {/* 무제한 (밝은 핑크 — BEST) */}
          <div className="rounded-2xl p-8 sm:p-10 relative text-ink" style={{ background: "linear-gradient(135deg, #fff5f8 0%, #ffe8ef 50%, #ffd6e4 100%)", boxShadow: "0 25px 60px -15px rgba(236,77,126,0.3)" }}>
            <div className="absolute -top-3 right-6 text-white text-xs font-bold px-4 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #ec4d7e, #fb7185)" }}>BEST</div>
            <div className="label-sm mb-4">UNLIMITED</div>
            <div className="mb-2">
              <span className="num-huge text-4xl text-rainbow">무제한 매칭</span>
            </div>
            <p className="text-sm text-ink-soft mb-7">횟수 제한 없이 매칭 + 컨설팅</p>
            <div className="space-y-2.5 mb-8">
              {["매칭 횟수 무제한", "조건별 맞춤 매칭", "1:1 전문 컨설팅", "연애 코칭 & 스타일링", "VIP 전담 관리"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink"><span className="text-accent">{I.check("w-4 h-4")}</span>{t}</div>
              ))}
            </div>
            <a href="/contact" className="btn btn-gradient w-full">무제한 상담</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS — Apple 4단계 ═══ */
export function AppleProcess() {
  const steps = [
    { n: "01", t: "상담 신청", d: "카카오톡 ID inyeon_ 으로 간편하게 신청하세요." },
    { n: "02", t: "서류 검토", d: "재직증명서·혼인관계증명서 등으로 신원 확인" },
    { n: "03", t: "맞춤 매칭", d: "거리·나이·종교·직업 등 조건 반영 매칭" },
    { n: "04", t: "인연 시작", d: "프로필 전달 후 설레는 만남 시작" },
  ];
  return (
    <section className="bg-sec py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="text-center mb-14 sm:mb-16 reveal">
          <div className="label-sm mb-5">HOW IT WORKS</div>
          <h2 className="h-section font-bold text-ink mb-4" style={{ fontWeight: 700 }}>
            4단계로 시작하는 인연.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {steps.map((s, i) => (
            <div key={i} className="card p-7 sm:p-9">
              <div className="label-sm mb-3">{s.n}</div>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2" style={{ fontWeight: 700 }}>{s.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES — Apple 4컬 미니 카드 ═══ */
export function AppleFeatures() {
  const features = [
    { t: "매칭 후 결제 후불제", d: "매칭이 성사되어야 비용이 발생. 선불 부담 없이 안심하고 시작." },
    { t: "조건별 맞춤 매칭", d: "거리·나이·종교·직업 등 조건을 세밀하게 반영해 딱 맞는 상대를 찾아드립니다." },
    { t: "확실한 신원보장", d: "재직증명서·혼인관계증명서 등 꼼꼼한 서류검토로 안전한 만남 보장." },
    { t: "1:1 전문 컨설팅", d: "프로필 작성부터 만남 후 피드백까지, 연애 전문가가 함께합니다." },
  ];
  return (
    <section className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="container-apple">
        <div className="text-center mb-14 sm:mb-16 reveal">
          <div className="label-sm mb-5">WHY US</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            인연연구소만의 특별한 장점.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal">
          {features.map((f, i) => (
            <div key={i} className="card p-7 sm:p-9">
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5" style={{ fontWeight: 700 }}>{f.t}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONSULT — Apple 다크 풀폭 CTA ═══ */
export function AppleConsult() {
  return (
    <section className="bg-base py-16 sm:py-24 lg:py-28">
      <div className="container-apple">
        <div className="rounded-3xl p-10 sm:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-ink" style={{ background: "linear-gradient(135deg, #fff5f8 0%, #ffe8ef 50%, #ffd6e4 100%)", boxShadow: "0 25px 60px -15px rgba(236,77,126,0.25)" }}>
          <div>
            <div className="label-sm mb-5">CONSULTING</div>
            <h2 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
              전문 매칭사의<br />
              <span className="text-rainbow">1:1 컨설팅.</span>
            </h2>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
              첫 만남이 어색한 분, 연애가 오래 이어지지 않는 분.<br />
              연애 전문 상담사가 함께합니다.
            </p>
          </div>
          <div className="lg:text-right">
            <a href="/contact" className="btn btn-gradient inline-flex">
              상담 시작 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ — Apple Accordion ═══ */
import { useState } from "react";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} className="w-full py-6 sm:py-7 flex items-center justify-between text-left group">
        <span className="text-lg font-bold text-ink pr-6 group-hover:text-accent transition-colors" style={{ fontWeight: 700 }}>{q}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${open ? "bg-accent text-white rotate-180" : "bg-tertiary text-ink"}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-base text-ink-soft leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function AppleFAQ() {
  const fqs = [
    { q: "어떤 서류를 제출해야 하나요?", a: "재직증명서·혼인관계증명서 등을 기본으로 요청드립니다. 서류는 매칭 목적 외 절대 사용되지 않으며, 종료 후 안전하게 폐기됩니다." },
    { q: "매칭까지 얼마나 걸리나요?", a: "서류 확인 후 평균 48시간 이내에 첫 프로필을 제안합니다." },
    { q: "소개팅 앱과 뭐가 다른가요?", a: "앱은 사진으로만 판단하지만, 인연연구소는 서류 검증 + 전문 상담사의 성격·가치관 분석 기반 매칭입니다." },
    { q: "결혼을 전제로 해야 하나요?", a: "아닙니다. 가벼운 소개팅부터 진지한 만남까지, 목적에 맞춰 매칭해 드립니다." },
    { q: "개인정보는 안전한가요?", a: "모든 서류와 개인정보는 암호화 저장하며, 매칭 목적 외 절대 제3자에게 공유되지 않습니다." },
  ];
  return (
    <section className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="container-apple max-w-3xl">
        <div className="text-center mb-12 sm:mb-14 reveal">
          <div className="label-sm mb-5">FAQ</div>
          <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
            자주 묻는 질문.
          </h2>
        </div>
        <div className="reveal">
          {fqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT — Apple Big Dark CTA ═══ */
export function AppleContact() {
  return (
    <section className="bg-base py-16 sm:py-24 lg:py-28">
      <div className="container-apple">
        <div className="rounded-3xl p-10 sm:p-16 lg:p-20 text-center text-ink" style={{ background: "linear-gradient(135deg, #fff5f8 0%, #ffe8ef 50%, #ffd6e4 100%)", boxShadow: "0 25px 60px -15px rgba(236,77,126,0.25)" }}>
          <div className="label-sm mb-6">CONTACT</div>
          <h2 className="h-section font-bold text-ink mb-6" style={{ fontWeight: 700 }}>
            당신의 인연,<br />
            <span className="text-rainbow">여기서 시작됩니다.</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft mb-3">무료 상담으로 부담 없이 시작해 보세요.</p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm mb-10">
            <span className="text-xs font-bold text-accent">365일 · 밤 12시까지 상담</span>
          </div>

          {/* 카톡 ID 카드 */}
          <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl p-7 text-ink shadow-md">
            <div className="label-sm mb-4">카카오톡으로 문의 주세요</div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-yellow-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{KAKAO_ID}</span>
            </div>
            <p className="text-xs text-ink-soft">친구 추가 후 메시지를 보내주세요</p>
          </div>

          {/* 보조 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-white text-ink hover:bg-white/90 w-full sm:w-auto shadow-sm">
              인스타그램 @inyeon_lab
            </a>
            <a href="tel:010-7617-0181" className="btn btn-secondary bg-white text-ink hover:bg-white/90 w-full sm:w-auto shadow-sm">
              {I.phone("w-4 h-4")} 010-7617-0181
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
