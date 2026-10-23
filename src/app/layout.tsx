import type { Metadata } from "next";
import MetaPixel from "@/components/coaching/MetaPixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "인연연구소 | 나에게 맞는 1:1 카카오톡 연애코칭",
  description:
    "AI가 아닌, 사람이 직접 듣고 코칭합니다. 실제 소개팅 운영 경험을 바탕으로 남녀 상담사가 체계적이고 전문적인 1:1 카카오톡 연애코칭을 제공합니다. 대화 분석, 소개팅 실전 피드백, 무료 연애진단까지, 인연연구소.",
  keywords: "연애코칭, 연애상담, 카톡 대화 코칭, 소개팅 코칭, 썸 상담, 무료 연애진단, 소개팅 주선, 스타일링, 인연연구소",
  metadataBase: new URL("https://inyeon.today"),
  openGraph: {
    title: "인연연구소 | 연애에도 연습이 필요합니다",
    description: "남녀 상담사가 직접 듣고 체계적으로 코칭합니다. 카톡 한 줄부터 소개팅에서의 대화까지, 나에게 맞는 관계의 방식을 전문적인 1:1 카카오톡 코칭으로 함께 찾아갑니다.",
    url: "https://inyeon.today",
    siteName: "인연연구소",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    other: { "naver-site-verification": "3f576b63e955749cb9e716a67f9688c89ad3f5f2" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configuredPixel = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "926857046612598";
  const pixelId = /^\d+$/.test(configuredPixel) ? configuredPixel : "";
  return (
    <html lang="ko">
      <body className="antialiased">{children}<MetaPixel pixelId={pixelId} /></body>
    </html>
  );
}
