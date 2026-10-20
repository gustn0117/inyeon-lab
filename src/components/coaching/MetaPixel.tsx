"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/lib/analytics";

export default function MetaPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const previous = useRef("");
  const admin = pathname.startsWith("/admin");
  useEffect(() => {
    if (!ready || admin || previous.current === pathname) return;
    previous.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname, ready, admin]);
  if (!pixelId || admin) return null;
  return <><Script id="inyeon-meta-pixel" strategy="afterInteractive" onReady={() => setReady(true)}>{`
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('set','autoConfig',false,'${pixelId}');
    fbq('init','${pixelId}');
  `}</Script><noscript><img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" /></noscript></>;
}
