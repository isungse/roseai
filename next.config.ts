import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    // The /works product section is Korean-only (i18n.md "ko 전용
    // 네임스페이스"). Config redirects run before the i18n proxy, so the
    // English prefix never reaches a page without `works.*` messages.
    return [
      { source: "/en/works", destination: "/ko/works", permanent: true },
      {
        source: "/en/works/:path*",
        destination: "/ko/works/:path*",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
