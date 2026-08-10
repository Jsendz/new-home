import { SITE_URL } from "@/lib/site";

const DEFAULT_NAME = "The Sweet Home Co.";

// Placeholder contact details until real business info is supplied via
// Sanity siteSettings — keeps structured data internally consistent with
// the footer rather than omitting address/phone entirely.
const DEFAULT_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Avinguda Meritxell, 1",
  postalCode: "AD500",
  addressLocality: "Andorra la Vella",
  addressCountry: "AD",
};
const DEFAULT_PHONE = "+376 800 100";
const DEFAULT_EMAIL = "info@thesweethomeco.ad";

interface SiteSettingsData {
  agencyName?: string;
  logo?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  socialLinks?: Record<string, string | undefined>;
}

export function organizationSchema(settings?: SiteSettingsData | null) {
  const sameAs = settings?.socialLinks
    ? Object.values(settings.socialLinks).filter(Boolean)
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: settings?.agencyName || DEFAULT_NAME,
    url: SITE_URL,
    ...(settings?.logo && { logo: settings.logo, image: settings.logo }),
    email: settings?.contactEmail || DEFAULT_EMAIL,
    telephone: settings?.phone || DEFAULT_PHONE,
    address: settings?.address
      ? { "@type": "PostalAddress", streetAddress: settings.address, addressCountry: "AD" }
      : DEFAULT_ADDRESS,
    areaServed: {
      "@type": "Country",
      name: "Andorra",
    },
    ...(sameAs.length && { sameAs }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema({
  title,
  description,
  image,
  datePublished,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    ...(image && { image: [image] }),
    ...(datePublished && { datePublished }),
    ...(authorName && { author: { "@type": "Person", name: authorName } }),
    publisher: {
      "@type": "Organization",
      name: DEFAULT_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
