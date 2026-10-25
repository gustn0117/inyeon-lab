import type { Icon } from "@phosphor-icons/react";
import { ArrowsClockwise, ChatCircleText, ChatsCircle, Coffee, Compass, HandHeart, Heart, TShirt } from "@phosphor-icons/react/dist/ssr";

// 연애코칭 서비스 7종 + 소개팅 주선 아이콘 — 첫 화면 목록과 서비스 카드가 함께 쓴다 (서버·클라이언트 컴포넌트 공용)
export const SERVICE_ICONS: Record<string, Icon> = {
  concern: ChatCircleText,
  "kakao-talk": ChatsCircle,
  flirting: Heart,
  "first-date": Coffee,
  styling: TShirt,
  "love-pattern": ArrowsClockwise,
  total: Compass,
  matching: HandHeart,
};
