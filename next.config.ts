import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// The site used to live under /ko and /en (brand landing) with the product
// under /ko/works; it is now the product site on short Korean-only paths.
// Every old address lands on its new page in one 308 hop. Redirects run before
// the filesystem and the first match wins, so the specific rules come first.
const LEGACY_PREFIXES = ["/ko/works", "/en/works", "/works", "/ko", "/en"];

// Static demos of earlier products, unlinked since the one-page redesign.
const LEGACY_DEMOS = ["performance", "service-desk", "workforce-monitor"];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      ...LEGACY_PREFIXES.flatMap((prefix) => [
        { source: prefix, destination: "/", permanent: true },
        { source: `${prefix}/:path+`, destination: "/:path+", permanent: true },
      ]),
      ...LEGACY_DEMOS.map((demo) => ({
        source: `/demos/${demo}/:path*`,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
