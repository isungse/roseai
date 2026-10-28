import type { Metadata } from "next";

import { WORKS_PRODUCT_NAME } from "@/lib/data/works";

interface WorksMetadataInput {
  /** Site path, e.g. `/` or `/approval` — the site has no locale prefix. */
  path: string;
  title: string;
  description: string;
  /** Home keeps its title as-is instead of the layout's `%s | …` template. */
  absoluteTitle?: boolean;
}

// The site exists in Korean only (i18n.md), so a page carries its canonical
// URL and no hreflang alternates. Share cards don't get the layout's title
// template, so they carry the product name themselves.
export function worksMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: WorksMetadataInput): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${WORKS_PRODUCT_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: WORKS_PRODUCT_NAME,
      title: shareTitle,
      description,
      url: path,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
  };
}
