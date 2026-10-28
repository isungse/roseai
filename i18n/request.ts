import { getRequestConfig } from "next-intl/server";

// The site is Korean-only (i18n.md): there is no locale routing and no
// locale segment, so the request config pins `ko` and serves the one message
// file. Extension point: adding a language means restoring next-intl routing
// (routing.ts + navigation.ts + the proxy) — see i18n.md.
export default getRequestConfig(async () => ({
  locale: "ko",
  messages: (await import("../messages/ko.json")).default,
}));
