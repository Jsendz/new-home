import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

// Queries
const PROPERTY_TRANSLATION_FIELDS = `translations { title_es, title_fr, title_ca, slug_es, slug_fr, slug_ca, description_es, description_fr, description_ca }`;
const SEO_FIELDS = `seo { metaTitle, metaDescription, ogImage, noIndex }`;

export const PROPERTIES_QUERY = `*[_type == "property" && defined(slug.current)] | order(_createdAt desc) {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, location, area, status, featured, propertyType, ${PROPERTY_TRANSLATION_FIELDS}
}`;

export const FEATURED_PROPERTIES_QUERY = `*[_type == "property" && featured == true && defined(slug.current)] | order(_createdAt desc)[0...6] {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, location, area, status, featured, propertyType, ${PROPERTY_TRANSLATION_FIELDS}
}`;

// Matches the requested slug against the English slug or any translated
// slug — a property is reachable by whichever slug variant was linked to it,
// regardless of which locale that slug "belongs" to. generateMetadata then
// canonicalizes to the correct slug for the current locale.
export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && (
  slug.current == $slug ||
  translations.slug_es.current == $slug ||
  translations.slug_fr.current == $slug ||
  translations.slug_ca.current == $slug
)][0] {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, gallery, location, area, address, status, featured, amenities, propertyType, parking,
  ${PROPERTY_TRANSLATION_FIELDS}, ${SEO_FIELDS}
}`;

// Slim query used only to build per-locale static params and sitemap entries.
export const PROPERTY_LOCALIZED_SLUGS_QUERY = `*[_type == "property" && defined(slug.current)] {
  "slug": slug.current,
  translations { slug_es, slug_fr, slug_ca }
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, mainImage, excerpt, readTime,
  author->{ name, photo, role }
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, mainImage, excerpt, body, readTime,
  author->{ name, photo, role }, ${SEO_FIELDS}
}`;

export const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)].slug.current`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt asc) {
  _id, quote, authorName, authorImage, rating
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  agencyName, logo, contactEmail, phone, address, socialLinks, defaultSeo
}`;

export const HERO_SECTION_QUERY = `*[_type == "heroSection"][0] {
  mainImage, secondaryImage, badgeText, clientCount,
  stats[]{ value, label }
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  heroHeadline, heroSubheadline, heroImage,
  storyHeadline, storyParagraphs, quoteText,
  quoteAuthorName, quoteAuthorRole, quoteAuthorImage,
  missionHeadline,
  missions[]{ title, body },
  stats[]{ value, label },
  team[]{ name, role, image }
}`;
