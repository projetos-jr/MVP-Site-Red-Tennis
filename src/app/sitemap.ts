import type { MetadataRoute } from "next";
import { nav, site } from "@/content/red";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...nav.map((n) => n.href)].map((caminho) => ({
    url: `${site.url}${caminho}`,
    changeFrequency: "monthly",
    priority: caminho === "/" ? 1 : 0.8,
  }));
}
