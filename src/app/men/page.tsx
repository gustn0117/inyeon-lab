import type { Metadata } from "next";
import GenderLanding from "@/components/GenderLanding";

export const metadata: Metadata = {
  title: "남성 회원 안내 | 인연연구소",
  description: "한국나이 기준 1984년생까지의 미혼 남성 대상. 가입비 0원, 매칭 성사 후 기본 1회권 33,000원 결제. 다양한 매력의 여성 회원이 많은 수도권 1:1 대면 소개팅입니다.",
};

export default function MenPage() {
  return <GenderLanding gender="men" />;
}
