import type { MetadataRoute } from "next";

import { featureHref, TOUR_HREF, WORKS_FEATURE_SLUGS } from "@/lib/data/works";
import { env } from "@/lib/env";

// Seven Korean-only pages, no hreflang alternates (seo.md). `lastModified` /
// `changeFrequency` are deliberately omitted: seo.md forbids invented values
// and the site has no per-route change tracking. Snapshots stay out (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...WORKS_FEATURE_SLUGS.map(featureHref), TOUR_HREF];
  // Same shape as the canonical tags: the home URL has no trailing slash.
  return paths.map((path) => ({
    url: new URL(path, env.siteUrl).toString().replace(/\/$/, ""),
  }));
}
