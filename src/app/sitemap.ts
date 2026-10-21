import { MetadataRoute } from "next";
import { DEFAULT_PROGRAMS } from "@/lib/coaching";
import { COACHING_SERVICES } from "@/lib/coaching-services";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://inyeon.today";
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    ...COACHING_SERVICES.map(service => ({ url: `${base}/services/${service.id}`, lastModified, changeFrequency: "monthly" as const, priority: .9 })),
    { url: `${base}/programs`, lastModified, changeFrequency: "weekly", priority: .9 },
    ...DEFAULT_PROGRAMS.map(p => ({ url: `${base}/programs/${p.id}`, lastModified, changeFrequency: "weekly" as const, priority: .8 })),
    { url: `${base}/diagnosis`, lastModified, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/apply`, lastModified, changeFrequency: "monthly", priority: .7 },
    ...["privacy", "terms", "refund"].map(page => ({ url: `${base}/${page}`, lastModified, changeFrequency: "monthly" as const, priority: .3 })),
  ];
}
