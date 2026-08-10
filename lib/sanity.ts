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
const PROPERTY_TRANSLATION_FIELDS = `translations { title_es, title_fr, title_ca, description_es, description_fr, description_ca }`;

export const PROPERTIES_QUERY = `*[_type == "property" && defined(slug.current)] | order(_createdAt desc) {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, location, status, featured, propertyType, ${PROPERTY_TRANSLATION_FIELDS}
}`;

export const FEATURED_PROPERTIES_QUERY = `*[_type == "property" && featured == true && defined(slug.current)] | order(_createdAt desc)[0...6] {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, location, status, featured, propertyType, ${PROPERTY_TRANSLATION_FIELDS}
}`;

export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  _id, title, slug, price, bedrooms, bathrooms, sqft,
  description, mainImage, gallery, location, status, featured, amenities, propertyType, parking, ${PROPERTY_TRANSLATION_FIELDS}
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, mainImage, excerpt, readTime,
  author->{ name, photo, role }
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, mainImage, excerpt, body, readTime,
  author->{ name, photo, role }
}`;

export const PROPERTY_SLUGS_QUERY = `*[_type == "property" && defined(slug.current)].slug.current`;

export const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)].slug.current`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt asc) {
  _id, quote, authorName, authorImage, rating
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  agencyName, logo, contactEmail, phone, address, socialLinks
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
