"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { formatPrice, localizedField } from "@/lib/utils";
import { localizedPath } from "@/lib/site";
import { urlForImage } from "@/lib/sanity";
import Badge from "./Badge";

export interface PropertyCardData {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  status: "for_sale" | "sold" | "rented";
  mainImage?: { asset: { _ref: string } };
  image?: string;
  translations?: {
    title_es?: string; title_fr?: string; title_ca?: string;
    description_es?: string; description_fr?: string; description_ca?: string;
  };
}

interface PropertyCardProps {
  property: PropertyCardData;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const t = useTranslations("listings");
  const locale = useLocale();

  const title = localizedField(property.title, "title", locale, property.translations);

  const imageUrl =
    property.mainImage
      ? urlForImage(property.mainImage).width(800).height(540).url()
      : property.image ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

  const statusVariant =
    property.status === "sold"
      ? "sold"
      : property.status === "rented"
      ? "rented"
      : "accent";

  const statusLabel = t(`status.${property.status}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link href={localizedPath(locale, `/listings/${property.slug.current}`)} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs text-muted mb-2">
            <MapPin size={11} strokeWidth={2} />
            {property.location}
          </p>

          {/* Title */}
          <h3 className="font-serif text-lg font-medium text-foreground leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-muted mb-4">
            <span className="flex items-center gap-1.5">
              <Bed size={13} strokeWidth={2} />
              {property.bedrooms} {t("details.beds")}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={13} strokeWidth={2} />
              {property.bathrooms} {t("details.baths")}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 size={13} strokeWidth={2} />
              {property.sqft.toLocaleString("en-US")} {t("details.sqft")}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl font-semibold text-foreground">
              {formatPrice(property.price, locale)}
            </p>
            <span className="text-xs font-medium text-accent border border-accent/30 px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors">
              {t("view_property")} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
