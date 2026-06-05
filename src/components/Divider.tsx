"use client";

type Props = { from?: string; to?: string; height?: string };

/** 부드러운 물결 (위 → 아래로 다음 섹션 색감으로 전환) */
export function WaveDivider({ from = "#ffffff", to = "#fdf7f1", height = "h-[60px] sm:h-[90px]" }: Props) {
  return (
    <div className="w-full overflow-hidden leading-[0]" style={{ background: from }}>
      <svg className={`block w-full ${height}`} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C240,90 480,0 720,40 C960,80 1200,20 1440,50 L1440,90 L0,90 Z" fill={to} />
      </svg>
    </div>
  );
}

/** 큰 곡선 (잡지 스타일 섹션 전환) */
export function CurveDivider({ from = "#fff0f5", to = "#fff", height = "h-[50px] sm:h-[80px]" }: Props) {
  return (
    <div className="w-full overflow-hidden leading-[0]" style={{ background: from }}>
      <svg className={`block w-full ${height}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 Q720,100 1440,0 L1440,80 L0,80 Z" fill={to} />
      </svg>
    </div>
  );
}

/** 비스듬한 라인 (얇고 모던) */
export function SlantDivider({ from = "#fff", to = "#fdf7f1", height = "h-[40px] sm:h-[60px]" }: Props) {
  return (
    <div className="w-full overflow-hidden leading-[0]" style={{ background: from }}>
      <svg className={`block w-full ${height}`} viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 L1440,0 L1440,60 Z" fill={to} />
      </svg>
    </div>
  );
}

/** 점선 + 작은 다이아몬드 (감성 디바이더 — 섹션 강조용) */
export function OrnamentDivider({ color = "#d4567a" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4" aria-hidden="true">
      <span className="block w-12 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}80)` }} />
      <span className="block w-1.5 h-1.5 rotate-45" style={{ background: color }} />
      <svg width="14" height="14" viewBox="0 0 24 24" fill={color} style={{ opacity: 0.7 }}>
        <path d="M12 1l2.5 7L21 9.5l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7L3 9.5 9.5 8 12 1z" />
      </svg>
      <span className="block w-1.5 h-1.5 rotate-45" style={{ background: color }} />
      <span className="block w-12 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${color}80, transparent)` }} />
    </div>
  );
}
