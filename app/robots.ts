import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

// Preview deployments must not be indexed (deployment.md); Vercel sets
// VERCEL_ENV=production only for the production alias. The variable is
// optional platform metadata, so it is read directly rather than via lib/env.
export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV === "production";

  return {
    rules: production
      ? // Static UI snapshots carry their own noindex meta; keep crawlers out anyway.
        { userAgent: "*", allow: "/", disallow: "/demos/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
