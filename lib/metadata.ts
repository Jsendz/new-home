import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/site";

const SITE_NAME = "The Sweet Home Co.";

interface BuildMetadataArgs {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  /** Keep this specific page out of search engines (e.g. sold/rented listings, manual override). */
  noIndex?: boolean;
  /** Per-locale path overrides for hreflang, for pages whose slug differs by
   *  locale (e.g. a translated property slug). Falls back to `path` for any
   *  locale not present in the map. */
  localizedPaths?: Partial<Record<string, string>>;
}

/** Builds title, description, canonical, hreflang, and OG/Twitter tags for
 *  a single page in one call — every page should route through this so the
 *  fields stay consistent across the site. */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
  localizedPaths,
}: BuildMetadataArgs): Metadata {
  const url = localizedUrl(locale, path);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, localizedPaths?.[l] ?? path)])
  );

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": localizedUrl(routing.defaultLocale, localizedPaths?.[routing.defaultLocale] ?? path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
