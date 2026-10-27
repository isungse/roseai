import type { Metadata } from "next";

interface WorksMetadataInput {
  /** Path under the locale prefix, e.g. `/works/approval`. */
  path: string;
  title: string;
  description: string;
}

// The product section exists in Korean only (i18n.md "ko 전용 네임스페이스"),
// so hreflang lists `ko` and `x-default` and nothing else.
export function worksMetadata({
  path,
  title,
  description,
}: WorksMetadataInput): Metadata {
  const url = `/ko${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ko: url, "x-default": url },
    },
    openGraph: {
      type: "website",
      siteName: "ROSE-AI",
      title,
      description,
      url,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
