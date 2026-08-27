import type { Metadata } from "next";
import GenderLanding from "@/components/GenderLanding";

export const metadata: Metadata = {
  title: "여성 회원 안내 | 인연연구소",
  description: "한국나이 기준 1988년생까지의 미혼 여성 대상. 가입비 0원, 매칭 성사 시 33,000원. 수도권 중심 1:1 연애정보회사에서 실제 대면 소개팅을 연결합니다.",
};

export default function WomenPage() {
  return <GenderLanding gender="women" />;
}
