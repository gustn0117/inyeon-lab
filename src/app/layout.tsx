import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "인연연구소 | 카톡으로 끝나지 않는 1:1 소개팅",
  description:
    "가입비 없이 시작하는 신원 확인 기반 1:1 소개팅. 조건에 맞는 상대와 매칭이 성사된 뒤 결제하고, 실제 대면 일정까지 연결합니다.",
  keywords: "소개팅, 인연매칭, 20대 소개팅, 30대 소개팅, 신원 확인, 대면 소개팅, 인연연구소",
  metadataBase: new URL("https://inyeon.today"),
  openGraph: {
    title: "인연연구소 | 카톡으로 끝나지 않는 1:1 소개팅",
    description: "가입비 0원, 매칭 성사 후 결제. 신원 확인 회원과 실제 대면 소개팅을 연결합니다.",
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
