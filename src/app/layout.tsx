import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "인연연구소 | 프리미엄 소개팅 인연매칭",
  description:
    "신원보장된 20·30대를 위한 프리미엄 소개팅 매칭 서비스. 결혼정보회사가 아닌, 부담 없는 가격으로 확실한 만남을 시작하세요.",
  keywords: "소개팅, 인연매칭, 프리미엄 소개팅, 20대 소개팅, 30대 소개팅, 신원보장, 인연연구소",
  metadataBase: new URL("https://inyeon.today"),
  openGraph: {
    title: "인연연구소 | 프리미엄 소개팅 인연매칭",
    description: "신원보장된 20·30대를 위한 프리미엄 소개팅 매칭 서비스. 결혼정보회사가 아닌, 부담 없는 가격으로 확실한 만남을 시작하세요.",
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
  return (
    <html lang="ko">
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '926857046612598');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=926857046612598&ev=PageView&noscript=1" alt="" />
        </noscript>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
