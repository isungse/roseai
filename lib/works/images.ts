import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

export interface WorksImage {
  src: string;
  width: number;
  height: number;
  placeholder: boolean;
}

type Kind = "desktop" | "mobile";

const DIMENSIONS: Record<Kind, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const PLACEHOLDER: Record<Kind, string> = {
  desktop: "/images/works/_placeholder-desktop.svg",
  mobile: "/images/works/_placeholder-mobile.svg",
};

// Captures arrive from the snapshot pipeline after the pages are built. Until
// a file exists the layout renders a same-ratio placeholder; shipping with any
// placeholder left is blocked by the acceptance checks, so this never reaches
// production silently.
export function worksImage(src: string, kind: Kind = "desktop"): WorksImage {
  const exists = existsSync(path.join(process.cwd(), "public", src));
  return {
    src: exists ? src : PLACEHOLDER[kind],
    ...DIMENSIONS[kind],
    placeholder: !exists,
  };
}

export function snapshotAvailable(slug: string): boolean {
  return existsSync(
    path.join(process.cwd(), "public", "demos", "works", slug, "index.html"),
  );
}
