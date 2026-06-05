"use client";

/* ═══ 고급 SVG 데코 모음 ═══ */

/** 큰 그라데이션 메시 (Hero 배경) */
export function MeshGradientBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="mg1" cx="20%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffd6e8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffd6e8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mg2" cx="80%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffe8d0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe8d0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mg3" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#fed4e4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fed4e4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#mg1)" />
      <rect width="1440" height="900" fill="url(#mg2)" />
      <rect width="1440" height="900" fill="url(#mg3)" />
    </svg>
  );
}

/** 떠다니는 스파클 (반짝임 별) */
export function Sparkles({ count = 8 }: { count?: number }) {
  const positions = [
    { top: "12%", left: "8%", s: 14, d: "0s" },
    { top: "18%", right: "12%", s: 10, d: "0.6s" },
    { top: "32%", left: "5%", s: 8, d: "1.2s" },
    { top: "45%", right: "8%", s: 12, d: "1.8s" },
    { bottom: "22%", left: "10%", s: 10, d: "0.3s" },
    { bottom: "30%", right: "15%", s: 14, d: "1.5s" },
    { top: "65%", left: "85%", s: 8, d: "2.2s" },
    { top: "75%", left: "20%", s: 12, d: "0.9s" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {positions.slice(0, count).map((p, i) => (
        <span key={i} className="absolute anim-twinkle text-accent" style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom, animationDelay: p.d }}>
          <svg width={p.s} height={p.s} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1l2.5 7L21 9.5l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7L3 9.5 9.5 8 12 1z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** 부드러운 글로우 원 (블롭) */
export function GlowOrbs({ variant = "default" }: { variant?: "default" | "wide" | "subtle" }) {
  const cfg = {
    default: [
      { className: "top-[-200px] right-[-100px] w-[500px] h-[500px] blob-pink", delay: "0s" },
      { className: "bottom-[-200px] left-[-100px] w-[500px] h-[500px] blob-pink opacity-60", delay: "2s" },
    ],
    wide: [
      { className: "top-[10%] left-[5%] w-[600px] h-[600px] blob-pink opacity-50", delay: "0s" },
      { className: "bottom-[5%] right-[5%] w-[700px] h-[700px] blob-pink opacity-40", delay: "3s" },
    ],
    subtle: [
      { className: "top-[20%] right-[20%] w-[400px] h-[400px] blob-pink opacity-30", delay: "0s" },
    ],
  }[variant];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {cfg.map((c, i) => (
        <div key={i} className={`absolute anim-float-slow ${c.className}`} style={{ animationDelay: c.delay }} />
      ))}
    </div>
  );
}

/** 큰 그라데이션 SVG 블롭 (anim morphing) */
export function BlobShape({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="blobGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ec4d7e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff8da8" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path className="anim-blob-morph" fill="url(#blobGrad)" d="M40,-65C50,-55,55,-40,62,-25C69,-10,78,5,75,18C72,31,57,42,42,52C27,62,12,72,-4,77C-20,82,-40,82,-52,71C-64,60,-68,38,-67,18C-66,-2,-60,-20,-50,-32C-40,-44,-26,-50,-11,-58C4,-66,18,-76,40,-65Z" transform="translate(100 100)" />
    </svg>
  );
}

/** 부드러운 wave 라인 SVG (구분선) */
export function WaveLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="waveGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#ec4d7e" stopOpacity="0" />
          <stop offset="50%" stopColor="#ec4d7e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ec4d7e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,50 Q360,10 720,50 T1440,50" stroke="url(#waveGrad)" strokeWidth="2" fill="none" />
      <path d="M0,60 Q360,20 720,60 T1440,60" stroke="url(#waveGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M0,70 Q360,30 720,70 T1440,70" stroke="url(#waveGrad)" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

/** 도트 패턴 (배경 텍스처) */
export function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true" style={{
      backgroundImage: `radial-gradient(rgba(236,77,126,0.18) 1.2px, transparent 1.2px)`,
      backgroundSize: "24px 24px",
    }} />
  );
}

/** 손글씨 밑줄 SVG (단어 강조) */
export function HandUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute left-0 right-0 -bottom-3 w-full pointer-events-none ${className}`} height="12" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ul" x1="0" x2="1">
          <stop offset="0%" stopColor="#ec4d7e" />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path d="M2,7 Q50,1 100,5 T198,4" stroke="url(#ul)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** 미세 노이즈 텍스처 (배경에 깊이) */
export function NoiseTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay" aria-hidden="true" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }} />
  );
}

/** 떠다니는 하트 (Hero/특수 섹션) */
export function FloatingHearts() {
  const hearts = [
    { top: "15%", left: "12%", s: 16, d: "0s" },
    { top: "30%", right: "10%", s: 12, d: "1.2s" },
    { bottom: "20%", left: "85%", s: 18, d: "0.6s" },
    { bottom: "30%", left: "8%", s: 14, d: "2.4s" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {hearts.map((h, i) => (
        <span key={i} className="absolute anim-drift-slow" style={{ top: h.top, left: h.left, right: h.right, bottom: h.bottom, animationDelay: h.d, color: "rgba(236,77,126,0.25)" }}>
          <svg width={h.s} height={h.s} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.35-9.5-9.55C.5 6.5 4.5 3 8 3c2 0 3.5 1 4 2.5C12.5 4 14 3 16 3c3.5 0 7.5 3.5 5.5 8.45C19 16.65 12 21 12 21z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** 큰 별 (헤딩 옆 액센트) */
export function StarAccent({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`inline-block ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="starGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ec4d7e" />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path fill="url(#starGrad)" d="M12 1l2.5 7L21 9.5l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7L3 9.5 9.5 8 12 1z" />
    </svg>
  );
}
