import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ca", "es", "fr", "en"],
  defaultLocale: "ca",
  localePrefix: "as-needed",
  // Without this, the middleware overrides an explicit "/" visit with the
  // locale stored in the NEXT_LOCALE cookie from a previous visit — which
  // makes the default locale (Catalan) unreachable once you've switched
  // away from it, since its URL has no prefix to distinguish it.
  localeDetection: false,
});
