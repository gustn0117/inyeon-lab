import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "인연연구소 | 프리미엄 소개팅 인연매칭",
  description:
    "신원보장된 20·30대를 위한 프리미엄 소개팅 매칭 서비스. 결혼정보회사가 아닌, 부담 없는 가격으로 확실한 만남을 시작하세요.",
  keywords: "소개팅, 인연매칭, 프리미엄 소개팅, 20대 소개팅, 30대 소개팅, 신원보장, 인연연구소",
  verification: {
    other: { "naver-site-verification": "3f576b63e955749cb9e716a67f9688c89ad3f5f2" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
