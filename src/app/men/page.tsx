import type { Metadata } from "next";
import GenderLanding from "@/components/GenderLanding";

export const metadata: Metadata = {
  title: "남성 회원 안내 | 인연연구소",
  description: "39세 이하 미혼 남성 대상. 가입비 0원, 원하는 거리·나이·스타일의 상대와 매칭 성사 시 44,000원. 실제 대면 소개팅을 연결합니다.",
};

export default function MenPage() {
  return <GenderLanding gender="men" />;
}
