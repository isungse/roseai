import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = (await import(`../messages/${locale}.json`)).default;
  // The `works` product section is Korean-only (i18n.md "ko 전용
  // 네임스페이스"): its messages live in a separate file merged for `ko`
  // alone, so ko.json and en.json keep identical key trees.
  const works =
    locale === "ko" ? (await import("../messages/works.ko.json")).default : {};

  return {
    locale,
    messages: { ...base, ...works },
  };
});
