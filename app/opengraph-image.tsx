import { readFile } from "node:fs/promises";
import path from "node:path";

import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

import { WORKS_PRODUCT_NAME } from "@/lib/data/works";

export const alt = WORKS_PRODUCT_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori cannot read CSS variables, so the design tokens (design-system.md)
// are repeated here as literals: ink #000000 · paper #ffffff · brand #e03131
// · g500 #737373.
const INK = "#000000";
const PAPER = "#ffffff";
const BRAND = "#e03131";
const G500 = "#737373";

function font(file: string) {
  return readFile(
    path.join(process.cwd(), "node_modules/pretendard/dist/public/static", file),
  );
}

// Shared by every route: the root segment's image cascades to nested segments.
export default async function Image() {
  const t = await getTranslations({ locale: "ko", namespace: "works.og" });
  const [bold, medium] = await Promise.all([
    font("Pretendard-Bold.otf"),
    font("Pretendard-Medium.otf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: PAPER,
          color: INK,
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", width: 30, height: 30, gap: 2 }}>
            <div style={{ width: 14, height: 14, background: INK }} />
            <div style={{ width: 14, height: 14, background: BRAND }} />
            <div style={{ width: 14, height: 14, background: INK }} />
            <div style={{ width: 14, height: 14, background: INK }} />
          </div>
          <div style={{ width: 1, height: 28, background: INK }} />
          <div style={{ display: "flex" }}>
            ROSE<span style={{ color: BRAND }}>·AI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ width: 96, height: 6, background: BRAND }} />
          <div style={{ fontSize: 40, fontWeight: 500, color: G500 }}>
            {t("title")}
          </div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {WORKS_PRODUCT_NAME}
          </div>
        </div>

        <div style={{ fontSize: 24, fontWeight: 500, color: G500 }}>
          {t("footer")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
