import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import { SUBSET_CHARS } from "@/app/fonts/subset-chars";
import messages from "@/messages/ko.json";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Pretendard Variable cut down to the characters the site uses (app/fonts/subset.mjs): 100 KB instead
// of 2 MB, every weight kept.
export const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.subset.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

// Copy with a character outside the subset would quietly render in a system font, so stop the build
// instead and regenerate with `npm run font:subset`.
const missing = [...new Set(JSON.stringify(messages))].filter(
  (ch) => ch.codePointAt(0)! > 0x7e && !SUBSET_CHARS.includes(ch),
);
if (missing.length > 0) {
  throw new Error(`Pretendard subset lacks ${missing.join("")} — run \`npm run font:subset\`.`);
}
