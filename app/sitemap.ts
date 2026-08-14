import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/site";
import { localizedSlug, type Translations } from "@/lib/utils";
import { sanityClient, PROPERTY_LOCALIZED_SLUGS_QUERY, BLOG_SLUGS_QUERY } from "@/lib/sanity";
import { DEMO_LISTINGS } from "@/lib/demo-listings";
import { DEMO_POSTS } from "@/lib/demo-blog";

const STATIC_PATHS = ["", "/about", "/contact", "/listings", "/blog"];

interface LocalizedSlugRow {
  slug: string;
  translations?: Pick<Translations, "slug_es" | "slug_fr" | "slug_ca">;
}

/** Builds one sitemap entry whose URL (and hreflang alternates) can resolve
 *  to a different path per locale — needed for properties, whose slug is
 *  translated, and reused as-is for pages that share one path across locales. */
function localizedEntry(pathForLocale: (locale: string) => string): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(routing.defaultLocale, pathForLocale(routing.defaultLocale)),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, pathForLocale(locale))])
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let propertyRows: LocalizedSlugRow[] = DEMO_LISTINGS.map((p) => ({ slug: p.slug.current }));
  let blogSlugs: string[] = DEMO_POSTS.map((p) => p.slug.current);

  try {
    const [properties, posts] = await Promise.all([
      sanityClient.fetch<LocalizedSlugRow[]>(PROPERTY_LOCALIZED_SLUGS_QUERY),
      sanityClient.fetch<string[]>(BLOG_SLUGS_QUERY),
    ]);
    if (properties?.length) propertyRows = properties;
    if (posts?.length) blogSlugs = posts;
  } catch {
    // Sanity not configured — fall back to demo slugs
  }

  const staticEntries = STATIC_PATHS.map((path) => localizedEntry(() => path));
  const blogEntries = blogSlugs.map((slug) => localizedEntry(() => `/blog/${slug}`));
  const propertyEntries = propertyRows.map((row) =>
    localizedEntry((locale) => `/listings/${localizedSlug(row.slug, locale, row.translations)}`)
  );

  return [...staticEntries, ...propertyEntries, ...blogEntries];
}
