export function GET() {
  const base = "https://inyeon-lab.hsweb.pics";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>인연연구소 | 프리미엄 소개팅</title>
    <link>${base}</link>
    <description>신원보장된 20·30대를 위한 프리미엄 소개팅 매칭 서비스</description>
    <language>ko</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>인연연구소 프리미엄 소개팅 서비스 오픈</title>
      <link>${base}</link>
      <description>결혼정보회사가 아닌, 부담 없는 가격으로 확실한 만남을 시작하세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${base}</guid>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
