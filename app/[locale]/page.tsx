import { sanityClient, FEATURED_PROPERTIES_QUERY, BLOG_POSTS_QUERY, TESTIMONIALS_QUERY } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import BlogPreview from "@/components/sections/BlogPreview";
import PageTransition from "@/components/ui/PageTransition";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
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
