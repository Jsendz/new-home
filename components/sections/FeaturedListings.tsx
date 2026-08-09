import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import PropertyCard, { type PropertyCardData } from "@/components/ui/PropertyCard";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

// Static demo properties shown before Sanity is connected
const DEMO_PROPERTIES: PropertyCardData[] = [
  {
    _id: "1",
    title: "Ravenwood Corner Condo",
    slug: { current: "ravenwood-corner-condo" },
    price: 489000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1020,
    location: "51 Bogard Rd, Wasilla",
    status: "for_sale",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    _id: "2",
    title: "Meridian Heights Villa",
    slug: { current: "meridian-heights-villa" },
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    location: "14 Crestline Ave, Anchorage",
    status: "for_sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    _id: "3",
    title: "Lakewood Terrace House",
    slug: { current: "lakewood-terrace-house" },
    price: 620000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1680,
    location: "88 Lakeshore Dr, Palmer",
    status: "for_sale",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
];

interface FeaturedListingsProps {
  properties?: PropertyCardData[];
}

export default function FeaturedListings({ properties }: FeaturedListingsProps) {
  const t = useTranslations("listings");
  const locale = useLocale();
  const items = properties?.length ? properties : DEMO_PROPERTIES;

  return (
    <section className="section-padding bg-background">
      <div className="container-site">
        {/* Header */}
        <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel className="mb-3">{t("title")}</SectionLabel>
            <h2 className="font-display text-display-md text-foreground max-w-md tracking-wider">
              {t("subtitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/listings`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
          >
            {t("view_all")} <ArrowRight size={16} />
          </Link>
        </FadeInUp>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((property, i) => (
            <PropertyCard key={property._id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
