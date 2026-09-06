import type { Metadata } from "next";
import GenderLanding from "@/components/GenderLanding";

export const metadata: Metadata = {
  title: "남성 회원 안내 | 인연연구소",
  description: "한국나이 기준 1984년생까지의 미혼 남성 대상. 가입비 0원, 여성 회원 비중이 높은 회원풀에서 매칭 성사 시점에 결제하는 1회권 44,000원. 수도권 대면 소개팅을 연결합니다.",
};

export default function MenPage() {
  return <GenderLanding gender="men" />;
}
