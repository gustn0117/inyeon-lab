"use client";
/* ═══ 고급 SVG 아이콘 컬렉션 ═══ */

const PINK = "#ec4d7e";
const PINK_SOFT = "#fde7ee";

type Props = { size?: number; className?: string; color?: string };

/** 하트 (충전 + 글로우) */
export function IconHeart({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`heartG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path
        d="M16 28 C 16 28, 4 21, 4 12 C 4 7, 8 4, 12 4 C 14 4, 15.5 5, 16 7 C 16.5 5, 18 4, 20 4 C 24 4, 28 7, 28 12 C 28 21, 16 28, 16 28 Z"
        fill={`url(#heartG-${size})`}
      />
    </svg>
  );
}

/** 다이아몬드 (반지 보석) */
export function IconDiamond({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`diamondG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffb3c8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <g fill={`url(#diamondG-${size})`}>
        <path d="M16 4 L26 12 L16 28 L6 12 Z" opacity="0.95" />
        <path d="M6 12 L26 12 L16 28 Z" opacity="0.7" />
        <path d="M16 4 L20 12 L16 28 L12 12 Z" opacity="0.85" />
      </g>
      {/* highlight */}
      <path d="M11 8 L13 11 L10 12 Z" fill="white" opacity="0.7" />
    </svg>
  );
}

/** 반지 (결혼) */
export function IconRing({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`ringG-${size}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      {/* 보석 */}
      <path d="M16 4 L18.5 7 L16 10 L13.5 7 Z" fill={`url(#ringG-${size})`} />
      <path d="M13.5 7 L18.5 7 L19 9 L13 9 Z" fill={color} opacity="0.6" />
      {/* 링 */}
      <ellipse cx="16" cy="20" rx="9" ry="8" fill="none" stroke={`url(#ringG-${size})`} strokeWidth="3" />
    </svg>
  );
}

/** 큰 별 (4점) */
export function IconStarShine({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`starG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z" fill={`url(#starG-${size})`} />
    </svg>
  );
}

/** 꽃 (매칭) */
export function IconFlower({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`flowerG-${size}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffb3c8" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      {/* 5장 꽃잎 */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={i} cx="16" cy="9" rx="3.5" ry="6.5" fill={`url(#flowerG-${size})`} opacity="0.85" transform={`rotate(${deg} 16 16)`} />
      ))}
      {/* 가운데 */}
      <circle cx="16" cy="16" r="2.8" fill="#fcd34d" />
      <circle cx="16" cy="16" r="1.2" fill="#f59e0b" />
    </svg>
  );
}

/** 쉴드 (안전) */
export function IconShield({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`shieldG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path
        d="M16 3 L27 7 L27 16 C 27 22, 22 27, 16 29 C 10 27, 5 22, 5 16 L 5 7 Z"
        fill={`url(#shieldG-${size})`}
      />
      <path d="M11 16 L14 19 L21 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 컨설팅 (대화) */
export function IconChat({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`chatG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path
        d="M6 6 L24 6 C 26 6, 27 7, 27 9 L 27 19 C 27 21, 26 22, 24 22 L 14 22 L 8 28 L 8 22 L 6 22 C 4 22, 3 21, 3 19 L 3 9 C 3 7, 4 6, 6 6 Z"
        fill={`url(#chatG-${size})`}
      />
      <circle cx="11" cy="14" r="1.5" fill="white" />
      <circle cx="15" cy="14" r="1.5" fill="white" />
      <circle cx="19" cy="14" r="1.5" fill="white" />
    </svg>
  );
}

/** 사람 둘 (커플) */
export function IconCouple({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`coupleG-${size}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="10" r="4" fill={`url(#coupleG-${size})`} />
      <circle cx="21" cy="10" r="4" fill={`url(#coupleG-${size})`} />
      <path d="M3 26 C 3 20, 7 17, 11 17 C 15 17, 19 20, 19 26 Z" fill={`url(#coupleG-${size})`} />
      <path d="M13 26 C 13 20, 17 17, 21 17 C 25 17, 29 20, 29 26 Z" fill={`url(#coupleG-${size})`} opacity="0.85" />
      {/* 하트 위 */}
      <path d="M16 2 L17.5 4 L16 6 L14.5 4 Z" fill={color} />
    </svg>
  );
}

/** 체크 동그라미 */
export function IconCheck({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`checkG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#checkG-${size})`} />
      <path d="M10 16 L14 20 L22 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 문서 (서류) */
export function IconDocument({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`docG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d="M7 3 L20 3 L26 9 L26 28 C 26 29, 25 30, 24 30 L 8 30 C 7 30, 6 29, 6 28 L 6 5 C 6 4, 7 3, 7 3 Z" fill={`url(#docG-${size})`} />
      <path d="M20 3 L20 9 L26 9 Z" fill="white" opacity="0.4" />
      <rect x="10" y="14" width="12" height="1.5" rx="0.75" fill="white" opacity="0.85" />
      <rect x="10" y="18" width="12" height="1.5" rx="0.75" fill="white" opacity="0.85" />
      <rect x="10" y="22" width="8" height="1.5" rx="0.75" fill="white" opacity="0.85" />
    </svg>
  );
}

/** 인용 따옴표 */
export function IconQuote({ size = 36, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`quoteG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={PINK_SOFT} />
        </linearGradient>
      </defs>
      <path d="M11 24 L7 24 C 4 24, 3 22, 3 19 L 3 14 C 3 10, 6 7, 10 7 L 11 7 L 11 11 L 10 11 C 8 11, 7 12, 7 14 L 7 15 L 11 15 Z" fill={`url(#quoteG-${size})`} />
      <path d="M25 24 L21 24 C 18 24, 17 22, 17 19 L 17 14 C 17 10, 20 7, 24 7 L 25 7 L 25 11 L 24 11 C 22 11, 21 12, 21 14 L 21 15 L 25 15 Z" fill={`url(#quoteG-${size})`} />
    </svg>
  );
}

/** 시계 (시간) */
export function IconClock({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`clockG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill={`url(#clockG-${size})`} />
      <circle cx="16" cy="16" r="10" fill="white" />
      <path d="M16 9 L16 16 L21 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="16" r="1.5" fill={color} />
    </svg>
  );
}

/** 돈 (가격) */
export function IconCurrency({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`coinG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffb3c8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill={`url(#coinG-${size})`} />
      <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">₩</text>
    </svg>
  );
}

/** 캘린더 (만남 일정) */
export function IconCalendar({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`calG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="22" rx="3" fill={`url(#calG-${size})`} />
      <rect x="4" y="6" width="24" height="6" rx="3" fill={color} opacity="0.85" />
      <rect x="8" y="3" width="2" height="6" rx="1" fill="white" />
      <rect x="22" y="3" width="2" height="6" rx="1" fill="white" />
      <circle cx="11" cy="17" r="1.5" fill="white" />
      <circle cx="16" cy="17" r="1.5" fill="white" />
      <circle cx="21" cy="17" r="1.5" fill="white" />
      <circle cx="11" cy="22" r="1.5" fill="white" />
      <circle cx="16" cy="22" r="1.5" fill="white" opacity="0.6" />
    </svg>
  );
}

/** 위치 핀 (지역 매칭) */
export function IconLocation({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`locG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path d="M16 2 C 10 2, 6 6, 6 12 C 6 19, 16 30, 16 30 C 16 30, 26 19, 26 12 C 26 6, 22 2, 16 2 Z" fill={`url(#locG-${size})`} />
      <circle cx="16" cy="12" r="4" fill="white" />
      <circle cx="16" cy="12" r="2" fill={color} />
    </svg>
  );
}

/** 왕관 (프리미엄 BEST) */
export function IconCrown({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`crownG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d="M4 22 L 6 10 L 11 16 L 16 6 L 21 16 L 26 10 L 28 22 Z" fill={`url(#crownG-${size})`} />
      <rect x="4" y="22" width="24" height="5" rx="1" fill={color} />
      <circle cx="6" cy="10" r="1.5" fill="#ffd700" />
      <circle cx="16" cy="6" r="1.5" fill="#ffd700" />
      <circle cx="26" cy="10" r="1.5" fill="#ffd700" />
    </svg>
  );
}

/** 자물쇠 (개인정보 보호) */
export function IconLock({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lockG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <rect x="6" y="14" width="20" height="16" rx="2" fill={`url(#lockG-${size})`} />
      <path d="M10 14 V 10 C 10 6, 13 3, 16 3 C 19 3, 22 6, 22 10 V 14" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="16" cy="20" r="2.5" fill="white" />
      <rect x="14.5" y="20" width="3" height="5" fill="white" />
    </svg>
  );
}

/** 인증 배지 (체크 + 다이아) */
export function IconBadge({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`badgeG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <path d="M16 2 L 19 5 L 23 4 L 25 8 L 29 10 L 28 14 L 30 18 L 27 21 L 27 25 L 23 26 L 21 30 L 17 28 L 13 30 L 11 26 L 7 25 L 7 21 L 4 18 L 6 14 L 5 10 L 9 8 L 11 4 L 15 5 Z" fill={`url(#badgeG-${size})`} />
      <path d="M11 16 L 15 20 L 22 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 별 무리 (작은 별 클러스터) */
export function IconSparkleCluster({ size = 36, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`clG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={PINK} />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
      </defs>
      <g fill={`url(#clG-${size})`}>
        <path d="M20 4 L 22 12 L 30 14 L 22 16 L 20 24 L 18 16 L 10 14 L 18 12 Z" />
        <path d="M32 22 L 33 26 L 37 27 L 33 28 L 32 32 L 31 28 L 27 27 L 31 26 Z" opacity="0.8" />
        <path d="M8 24 L 9 28 L 13 29 L 9 30 L 8 34 L 7 30 L 3 29 L 7 28 Z" opacity="0.6" />
      </g>
    </svg>
  );
}

/** 커피잔 (카페 데이트) */
export function IconCoffee({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`cafG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* 김 */}
      <path d="M11 4 Q 12 7, 11 9 Q 10 11, 11 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M16 4 Q 17 7, 16 9 Q 15 11, 16 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M21 4 Q 22 7, 21 9 Q 20 11, 21 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* 컵 */}
      <path d="M5 15 L 5 24 C 5 27, 7 29, 10 29 L 19 29 C 22 29, 24 27, 24 24 L 24 15 Z" fill={`url(#cafG-${size})`} />
      {/* 손잡이 */}
      <path d="M24 17 C 28 17, 28 24, 24 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 컵 안 */}
      <ellipse cx="14.5" cy="16.5" rx="8" ry="2" fill="#fff" opacity="0.4" />
    </svg>
  );
}

/** 봉투 (메시지/연락) */
export function IconMail({ size = 28, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`mailG-${size}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8da8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <rect x="3" y="7" width="26" height="20" rx="2.5" fill={`url(#mailG-${size})`} />
      <path d="M3 9 L 16 19 L 29 9" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 작은 하트 */}
      <path d="M22 3 L 23 4.5 L 22 6 L 21 4.5 Z" fill={color} />
    </svg>
  );
}

/** 큰 커플 일러스트 (섹션 사이드용) */
export function IllustCouple({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`ipG-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ec4d7e" />
          <stop offset="100%" stopColor="#ff8da8" />
        </linearGradient>
        <radialGradient id={`ipBg-${size}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fde7ee" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#ipBg-${size})`} />
      {/* 남자 실루엣 */}
      <circle cx="75" cy="80" r="18" fill={`url(#ipG-${size})`} opacity="0.95" />
      <path d="M55 130 C 55 110, 65 100, 75 100 C 85 100, 95 110, 95 130 Q 95 160, 75 165 Q 55 160, 55 130 Z" fill={`url(#ipG-${size})`} opacity="0.95" />
      {/* 여자 실루엣 */}
      <circle cx="125" cy="80" r="18" fill={`url(#ipG-${size})`} opacity="0.85" />
      <path d="M105 130 C 105 110, 115 100, 125 100 C 135 100, 145 110, 145 130 Q 145 170, 125 175 Q 105 170, 105 130 Z" fill={`url(#ipG-${size})`} opacity="0.85" />
      {/* 위 하트 */}
      <path d="M100 35 C 100 28, 92 25, 88 30 C 85 33, 86 38, 100 50 C 114 38, 115 33, 112 30 C 108 25, 100 28, 100 35 Z" fill={`url(#ipG-${size})`} />
      {/* 별들 */}
      <path d="M40 50 L 42 56 L 48 57 L 42 58 L 40 64 L 38 58 L 32 57 L 38 56 Z" fill={`url(#ipG-${size})`} opacity="0.6" />
      <path d="M160 60 L 161 64 L 165 65 L 161 66 L 160 70 L 159 66 L 155 65 L 159 64 Z" fill={`url(#ipG-${size})`} opacity="0.6" />
      <path d="M170 130 L 172 136 L 178 137 L 172 138 L 170 144 L 168 138 L 162 137 L 168 136 Z" fill={`url(#ipG-${size})`} opacity="0.5" />
    </svg>
  );
}

/** 플러스 그리드 패턴 (배경) */
export function PlusGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true" style={{
      backgroundImage: `
        linear-gradient(rgba(236,77,126,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(236,77,126,0.1) 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
    }} />
  );
}

/** 웨이브 SVG 배경 */
export function WavePattern({ className = "", color = PINK }: { className?: string; color?: string }) {
  return (
    <svg className={`absolute inset-x-0 pointer-events-none ${className}`} viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`waveG-${color}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 80 Q 360 20, 720 80 T 1440 80" stroke={`url(#waveG-${color})`} strokeWidth="2" fill="none" />
      <path d="M0 110 Q 360 50, 720 110 T 1440 110" stroke={`url(#waveG-${color})`} strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M0 140 Q 360 80, 720 140 T 1440 140" stroke={`url(#waveG-${color})`} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

/** 손글씨 밑줄 (단어 강조) */
export function HandUnderline({ className = "", color = PINK }: { className?: string; color?: string }) {
  return (
    <svg className={`absolute left-0 right-0 -bottom-2 w-full pointer-events-none ${className}`} height="14" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 8 Q 50 2, 100 6 T 198 7"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** 부드러운 곡선 디바이더 (섹션 사이) */
export function CurveDivider({ className = "", color = "#fff5f8" }: { className?: string; color?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true" style={{ height: "60px" }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0 30 Q 360 0, 720 30 T 1440 30 L 1440 60 L 0 60 Z" fill={color} />
      </svg>
    </div>
  );
}

/** 도트 패턴 (배경 데코) */
export function DotPattern({ className = "", color = "#ec4d7e" }: { className?: string; color?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(${color}20 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    />
  );
}

/** 코너 장식 (카드 모서리 SVG 액센트) */
export function CornerOrnament({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`corner-${size}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={PINK} stopOpacity="0.4" />
          <stop offset="100%" stopColor={PINK} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 30 Q 0 0, 30 0" stroke={`url(#corner-${size})`} strokeWidth="2" fill="none" />
      <path d="M5 30 Q 5 5, 30 5" stroke={`url(#corner-${size})`} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="3" cy="3" r="2" fill={PINK} opacity="0.4" />
    </svg>
  );
}

/** 작은 반짝임 (요소 옆) */
export function Sparkle({ size = 16, className = "", color = PINK }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={color} />
    </svg>
  );
}

/** 매거진 라벨 SVG 프레임 */
export function LabelFrame({ children, color = PINK }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 relative px-4 py-1.5 rounded-full bg-white">
      <Sparkle size={12} color={color} />
      {children}
    </span>
  );
}
