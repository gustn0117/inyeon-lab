import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://inyeon-lab.hsweb.pics";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
