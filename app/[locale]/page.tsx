import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityClient, FEATURED_PROPERTIES_QUERY, BLOG_POSTS_QUERY, TESTIMONIALS_QUERY } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import BlogPreview from "@/components/sections/BlogPreview";
import PageTransition from "@/components/ui/PageTransition";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch from Sanity — falls back to demo data gracefully if no project ID is set
  let properties = [];
  let posts = [];
  let testimonials = [];

  try {
    [properties, posts, testimonials] = await Promise.all([
      sanityClient.fetch(FEATURED_PROPERTIES_QUERY),
      sanityClient.fetch(BLOG_POSTS_QUERY),
      sanityClient.fetch(TESTIMONIALS_QUERY),
    ]);
  } catch {
    // Sanity not configured yet — sections render with demo data
  }

  return (
    <PageTransition>
      <Hero />
      <FeaturedListings properties={properties} />
      <Features />
      <Testimonials testimonials={testimonials} />
      <CTABanner />
      <BlogPreview posts={posts} />
    </PageTransition>
  );
}
