import type { Metadata } from "next";
import GenderLanding from "@/components/GenderLanding";

export const metadata: Metadata = {
  title: "여성 회원 안내 | 인연연구소",
  description: "35세 이하 미혼 여성 대상. 가입비 0원, 매칭 성사 시 33,000원. 신원 확인 회원과 실제 대면 소개팅을 연결합니다.",
};

export default function WomenPage() {
  return <GenderLanding gender="women" />;
}
