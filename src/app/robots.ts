import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://inyeon.today";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
