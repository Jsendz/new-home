import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  sanityClient, PROPERTY_BY_SLUG_QUERY, PROPERTY_LOCALIZED_SLUGS_QUERY, urlForImage,
} from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { localizedField, localizedSlug, type Translations } from "@/lib/utils";
import { breadcrumbSchema, realEstateListingSchema } from "@/lib/schema";
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

interface LocalizedSlugRow {
  slug: string;
  translations?: Pick<Translations, "slug_es" | "slug_fr" | "slug_ca">;
}

export async function generateStaticParams() {
  let rows: LocalizedSlugRow[] = DEMO_LISTINGS.map((p) => ({ slug: p.slug.current }));
  try {
    const fetched = await sanityClient.fetch<LocalizedSlugRow[]>(PROPERTY_LOCALIZED_SLUGS_QUERY);
    if (fetched?.length) rows = fetched;
  } catch {
    // Sanity not configured — fall back to demo slugs
  }

  return routing.locales.flatMap((locale) =>
    rows.map((row) => ({ locale, slug: localizedSlug(row.slug, locale, row.translations) }))
  );
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

/** Every locale's path for this property — used for hreflang and to
 *  canonicalize to the correct translated slug for the requested locale. */
function buildLocalizedPaths(property: ListingProperty): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((l) => [l, `/listings/${localizedSlug(property.slug.current, l, property.translations)}`])
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const property = await getProperty(slug);

  if (!property) return { title: "Property Not Found" };

  const title = localizedField(property.title, "title", locale, property.translations);
  const seo = property.seo;
  const image = seo?.ogImage
    ? urlForImage(seo.ogImage).width(1200).height(630).url()
    : property.mainImage
    ? urlForImage(property.mainImage).width(1200).height(630).url()
    : property.image;

  const localizedPaths = buildLocalizedPaths(property);

  return buildMetadata({
    locale,
    path: localizedPaths[locale],
    localizedPaths,
    title: seo?.metaTitle || `${title} | The Sweet Home Co.`,
    description:
      seo?.metaDescription ||
      `${property.bedrooms} bed · ${property.bathrooms} bath · ${property.sqft?.toLocaleString("en-US")} m² — ${property.location}`,
    image,
    // Sold/rented listings are unavailable, so keep them out of search by default
    // unless an editor explicitly re-enables indexing via the SEO field.
    noIndex: seo?.noIndex ?? property.status !== "for_sale",
  });
}

export default async function PropertyPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const property = await getProperty(slug);
  if (!property) notFound();

  const tNav = await getTranslations({ locale, namespace: "nav" });

  const title = localizedField(property.title, "title", locale, property.translations);
  const localizedPaths = buildLocalizedPaths(property);
  const propertyUrl = localizedUrl(locale, localizedPaths[locale]);
  const listingImage = property.mainImage
    ? urlForImage(property.mainImage).width(1200).height(630).url()
    : property.image;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("listings"), url: localizedUrl(locale, "/listings") },
          { name: title, url: propertyUrl },
        ])}
      />
      <JsonLd
        data={realEstateListingSchema({
          name: title,
          description: property.description,
          url: propertyUrl,
          image: listingImage,
          price: property.price,
          status: property.status,
          propertyType: property.propertyType,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          floorSizeSqm: property.sqft,
          address: property.address,
        })}
      />
      <PageTransition>
        <PropertyDetail property={property} />
      </PageTransition>
    </>
  );
}
