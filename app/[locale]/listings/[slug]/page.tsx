import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityClient, PROPERTY_BY_SLUG_QUERY, PROPERTY_SLUGS_QUERY, urlForImage } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import PropertyDetail from "@/components/sections/PropertyDetail";
import { DEMO_LISTINGS, type ListingProperty } from "@/lib/demo-listings";
import PageTransition from "@/components/ui/PageTransition";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  let slugs: string[] = DEMO_LISTINGS.map((p) => p.slug.current);
  try {
    const fetched = await sanityClient.fetch<string[]>(PROPERTY_SLUGS_QUERY);
    if (fetched?.length) slugs = fetched;
  } catch {
    // Sanity not configured — fall back to demo slugs
  }

  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

async function getProperty(slug: string): Promise<ListingProperty | null> {
  let property: ListingProperty | null = null;
  try {
    property = await sanityClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
  } catch {
    // Sanity not configured — use demo
  }
  return property ?? DEMO_LISTINGS.find((p) => p.slug.current === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const property = await getProperty(slug);

  if (!property) return { title: "Property Not Found" };

  const image = property.mainImage
    ? urlForImage(property.mainImage).width(1200).height(630).url()
    : property.image;

  return buildMetadata({
    locale,
    path: `/listings/${slug}`,
    title: `${property.title} | The Sweet Home Co.`,
    description: `${property.bedrooms} bed · ${property.bathrooms} bath · ${property.sqft?.toLocaleString("en-US")} sqft — ${property.location}`,
    image,
  });
}

export default async function PropertyPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const property = await getProperty(slug);
  if (!property) notFound();

  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("listings"), url: localizedUrl(locale, "/listings") },
          { name: property.title, url: localizedUrl(locale, `/listings/${slug}`) },
        ])}
      />
      <PageTransition>
        <PropertyDetail property={property} />
      </PageTransition>
    </>
  );
}
