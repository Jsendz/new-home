import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/site";
import { sanityClient, PROPERTY_SLUGS_QUERY, BLOG_SLUGS_QUERY } from "@/lib/sanity";
import { DEMO_LISTINGS } from "@/lib/demo-listings";
import { DEMO_POSTS } from "@/lib/demo-blog";

const STATIC_PATHS = ["", "/about", "/contact", "/listings", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let propertySlugs: string[] = DEMO_LISTINGS.map((p) => p.slug.current);
  let blogSlugs: string[] = DEMO_POSTS.map((p) => p.slug.current);

  try {
    const [properties, posts] = await Promise.all([
      sanityClient.fetch<string[]>(PROPERTY_SLUGS_QUERY),
      sanityClient.fetch<string[]>(BLOG_SLUGS_QUERY),
    ]);
    if (properties?.length) propertySlugs = properties;
    if (posts?.length) blogSlugs = posts;
  } catch {
    // Sanity not configured — fall back to demo slugs
  }

  const paths = [
    ...STATIC_PATHS,
    ...propertySlugs.map((slug) => `/listings/${slug}`),
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ];

  return paths.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, path)])
      ),
    },
  }));
}
