import sharp from "sharp";
import { renderToBuffer } from "@react-pdf/renderer";
import { sanityClient, PROPERTY_BY_SLUG_QUERY, urlForImage } from "@/lib/sanity";
import { DEMO_LISTINGS, DEMO_DESCRIPTION, type ListingProperty } from "@/lib/demo-listings";
import { formatPrice, localizedField } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import PropertyPdfDocument from "@/lib/pdf/PropertyPdfDocument";

// Intl.NumberFormat uses narrow/non-breaking space characters (U+202F,
// U+00A0) as thousand separators for several locales. Those code points
// fall outside the base PDF fonts' single-byte encoding and silently drop,
// which collapses "2 250 000 €" into "2250000 €" — swap them for a plain
// space so every string embeds safely regardless of locale.
function pdfSafe(text: string | null | undefined): string {
  return (text ?? "").replace(/[  ]/g, " ");
}

const AGENCY_PHONE = "+376 800 100";
const AGENCY_EMAIL = "info@thesweethomeco.ad";
const BRAND_NAME = "The Sweet Home Co.";

const MESSAGE_LOADERS: Record<string, () => Promise<{ default: any }>> = {
  ca: () => import("@/messages/ca.json"),
  es: () => import("@/messages/es.json"),
  fr: () => import("@/messages/fr.json"),
  en: () => import("@/messages/en.json"),
};

async function getProperty(slug: string): Promise<ListingProperty | null> {
  let property: ListingProperty | null = null;
  try {
    property = await sanityClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
  } catch {
    // Sanity not configured — fall back to demo data
  }
  return property ?? DEMO_LISTINGS.find((p) => p.slug.current === slug) ?? null;
}

async function toJpegBuffer(source: ArrayBuffer): Promise<Buffer> {
  return sharp(Buffer.from(source)).jpeg({ quality: 85 }).toBuffer();
}

async function fetchAsJpeg(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await toJpegBuffer(await res.arrayBuffer());
  } catch {
    return null;
  }
}

interface Gallery {
  asset?: { _ref: string };
  alt?: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams, origin } = new URL(request.url);

  const requestedLocale = searchParams.get("locale") ?? routing.defaultLocale;
  const locale = routing.locales.includes(requestedLocale as (typeof routing.locales)[number])
    ? requestedLocale
    : routing.defaultLocale;

  const property = await getProperty(slug);
  if (!property) {
    return new Response("Property not found", { status: 404 });
  }

  const messages = (await MESSAGE_LOADERS[locale]()).default;
  const t = messages.property;

  const title = localizedField(property.title, "title", locale, property.translations);
  const description =
    localizedField(
      property.description ?? DEMO_DESCRIPTION,
      "description",
      locale,
      property.translations
    ) || DEMO_DESCRIPTION;

  const galleryRaw: (Gallery | string)[] = ((property as any).gallery ?? []).filter(
    (g: Gallery | string) => typeof g === "string" || g.asset?._ref
  );

  // Route property photos through the existing watermark endpoint (same
  // protection as the web pages) before converting to JPEG for embedding —
  // react-pdf only supports JPG/PNG/base64, not the webp it returns.
  const watermarkedUrl = (sanityUrl: string) =>
    `${origin}/api/watermark?src=${encodeURIComponent(sanityUrl)}`;

  const [logoImage, mainImage, ...galleryImages] = await Promise.all([
    fetchAsJpeg(`${origin}/logo.svg`),
    property.mainImage
      ? fetchAsJpeg(watermarkedUrl(urlForImage(property.mainImage).width(1200).height(700).url()))
      : property.image
      ? fetchAsJpeg(property.image)
      : Promise.resolve(null),
    ...galleryRaw.slice(0, 6).map((g) =>
      typeof g === "string"
        ? fetchAsJpeg(g)
        : fetchAsJpeg(watermarkedUrl(urlForImage(g as { asset: { _ref: string } }).width(700).url()))
    ),
  ]);

  if (!logoImage) {
    return new Response("Failed to build PDF", { status: 500 });
  }

  const stats = [
    { label: t.sqft_label, value: property.sqft != null ? `${property.sqft.toLocaleString("en-US")} m²` : "—" },
    { label: t.beds_label, value: String(property.bedrooms) },
    { label: t.baths_label, value: String(property.bathrooms) },
    { label: t.type_label, value: property.propertyType ?? "—" },
  ].map((stat) => ({ label: pdfSafe(stat.label), value: pdfSafe(stat.value) }));

  const buffer = await renderToBuffer(
    <PropertyPdfDocument
      logoImage={logoImage}
      brandName={BRAND_NAME}
      title={pdfSafe(title)}
      priceLabel={pdfSafe(formatPrice(property.price, locale))}
      location={pdfSafe(property.location)}
      stats={stats}
      description={pdfSafe(description)}
      mainImage={mainImage ?? undefined}
      galleryImages={galleryImages.filter((b): b is Buffer => b !== null)}
      labels={{ overviewLabel: pdfSafe(t.overview), galleryLabel: pdfSafe(t.gallery) }}
      agencyPhone={AGENCY_PHONE}
      agencyEmail={AGENCY_EMAIL}
      propertyUrl={`${origin}/${locale === routing.defaultLocale ? "" : locale + "/"}listings/${slug}`}
    />
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
