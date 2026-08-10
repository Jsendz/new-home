import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { localizedPath } from "@/lib/site";
import { DEMO_LISTINGS } from "@/lib/demo-listings";
import PropertyCard, { type PropertyCardData } from "@/components/ui/PropertyCard";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

// Shown before Sanity is connected — first 3 of the shared demo dataset
const DEMO_PROPERTIES: PropertyCardData[] = DEMO_LISTINGS.slice(0, 3);

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
            href={localizedPath(locale, "/listings")}
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
