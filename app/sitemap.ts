import type { MetadataRoute } from "next";

import { WORKS_FEATURE_SLUGS } from "@/lib/data/works";
import { env } from "@/lib/env";

// `lastModified` / `changeFrequency` are deliberately omitted: seo.md forbids
// invented values and the site has no per-route change tracking.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl;
  const rootAlternates = {
    languages: { ko: `${base}/ko`, en: `${base}/en` },
  };

  const root: MetadataRoute.Sitemap = [
    { url: `${base}/ko`, alternates: rootAlternates },
    { url: `${base}/en`, alternates: rootAlternates },
  ];

  // The product section is Korean-only (i18n.md), so no en alternates here.
  const works: MetadataRoute.Sitemap = [
    "",
    "/tour",
    ...WORKS_FEATURE_SLUGS.map((slug) => `/${slug}`),
  ].map((suffix) => ({ url: `${base}/ko/works${suffix}` }));

  return [...root, ...works];
}
