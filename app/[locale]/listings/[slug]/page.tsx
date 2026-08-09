import { notFound } from "next/navigation";
import { sanityClient, PROPERTY_BY_SLUG_QUERY } from "@/lib/sanity";
import PropertyDetail from "@/components/sections/PropertyDetail";
import { DEMO_LISTINGS, type ListingProperty } from "@/lib/demo-listings";
import PageTransition from "@/components/ui/PageTransition";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let property: ListingProperty | null = null;
  try {
    property = await sanityClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
  } catch {
    // Sanity not configured — use demo
  }
  if (!property) {
    property = DEMO_LISTINGS.find((p) => p.slug.current === slug) ?? null;
  }

  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | The Sweet Home Co.`,
    description: `${property.bedrooms} bed · ${property.bathrooms} bath · ${property.sqft?.toLocaleString()} sqft — ${property.location}`,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  let property: ListingProperty | null = null;

  try {
    property = await sanityClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
  } catch {
    // Sanity not configured — fall through to demo
  }

  if (!property) {
    property = DEMO_LISTINGS.find((p) => p.slug.current === slug) ?? null;
  }

  if (!property) notFound();

  return (
    <PageTransition>
      <PropertyDetail property={property} />
    </PageTransition>
  );
}
