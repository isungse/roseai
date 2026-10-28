import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

export interface WorksImage {
  src: string;
  width: number;
  height: number;
}

type Kind = "desktop" | "mobile";

const DIMENSIONS: Record<Kind, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

// Every capture comes from the snapshot pipeline and is committed with the
// page that shows it. A missing file fails the build here rather than shipping
// an empty frame.
export function worksImage(src: string, kind: Kind = "desktop"): WorksImage {
  if (!existsSync(path.join(process.cwd(), "public", src))) {
    throw new Error(`Missing product capture ${src} — run the snapshot pipeline before building.`);
  }
  return { src, ...DIMENSIONS[kind] };
}

export function snapshotAvailable(slug: string): boolean {
  return existsSync(
    path.join(process.cwd(), "public", "demos", "works", slug, "index.html"),
  );
}

// The composed home hero artwork (works spec §3): real UI snapshots laid out
// as one image. It exists once the owner-picked draft is published; until then
// the hero overlaps the raw desktop and mobile captures.
const HERO_ARTWORK = { src: "/images/home-hero.jpg", width: 1600, height: 1200 };

export function heroArtwork(): WorksImage | null {
  const exists = existsSync(path.join(process.cwd(), "public", HERO_ARTWORK.src));
  return exists ? { ...HERO_ARTWORK } : null;
}
