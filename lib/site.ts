import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://new-home-one-topaz.vercel.app";

/** Builds a locale-correct path given the "as-needed" prefix strategy: the
 *  default locale has no prefix, every other locale is prefixed. */
export function localizedPath(locale: string, path: string = "") {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return locale === routing.defaultLocale ? suffix || "/" : `/${locale}${suffix}`;
}

export function localizedUrl(locale: string, path: string = "") {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}
