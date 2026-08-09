import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "ca"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
