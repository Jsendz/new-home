"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Bed, Bath, Maximize2, Home, ChevronDown,
  Star, ArrowLeft, Share2, Heart, Images,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice, localizedField } from "@/lib/utils";
import { localizedPath } from "@/lib/site";
import { urlForImage } from "@/lib/sanity";
import { DEMO_LISTINGS, type ListingProperty } from "@/lib/demo-listings";
import PropertyCard from "@/components/ui/PropertyCard";

// ── Types ──────────────────────────────────────────────────────────────────
export interface PropertyFull extends ListingProperty {
  description?: string;
  amenities?: string[];
  gallery?: Array<{ asset: { _ref: string }; alt?: string } | string>;
  parking?: number;
}

// ── Demo fill for missing Sanity data ──────────────────────────────────────
const DEMO_FULL: Partial<PropertyFull> = {
  description:
    "A bright, mountain-inspired home offering modern interiors, spacious living areas, and elegant finishes throughout. Ideal for buyers seeking comfort, style, and a well-located property close to Andorra's best amenities, ski access, and local attractions. The open-plan kitchen connects seamlessly to the dining and living spaces, all bathed in natural light through floor-to-ceiling windows.",
  amenities: [
    "Underfloor Heating", "In-unit Laundry", "Hardwood Floors",
    "Stainless Appliances", "Private Balcony", "Covered Parking",
    "Storage Unit", "Pet Friendly", "Ski Storage",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  ],
};

function getAccordionSections(t: ReturnType<typeof useTranslations>) {
  return [
    {
      key: "details",
      label: t("overview"),
      content: (p: PropertyFull) => (
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            [t("type_label"),   p.propertyType ?? "—"],
            [t("status_label"), p.status.replace("_", " ")],
            [t("beds_label"),   p.bedrooms],
            [t("baths_label"),  p.bathrooms],
            [t("sqft_label"),   p.sqft != null ? `${p.sqft.toLocaleString("en-US")} m²` : "—"],
            [t("parking_label"), p.parking ?? 1],
          ].map(([k, v]) => (
            <div key={String(k)}>
              <dt className="text-muted text-[11px] uppercase tracking-wider mb-0.5">{k}</dt>
              <dd className="font-medium text-foreground capitalize">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      key: "location",
      label: t("location_surroundings_label"),
      content: (p: PropertyFull) => (
        <p className="text-sm text-muted leading-relaxed">
          {t("location_note", { location: p.location })}
        </p>
      ),
    },
    {
      key: "amenities",
      label: t("amenities"),
      content: (p: PropertyFull) => {
        const list = p.amenities ?? DEMO_FULL.amenities ?? [];
        return (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {list.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        );
      },
    },
  ];
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PropertyDetail({ property }: { property: PropertyFull }) {
  const locale = useLocale();
  const t      = useTranslations("property");

  const title = localizedField(property.title, "title", locale, property.translations);
  const desc  = localizedField(
    property.description ?? DEMO_FULL.description,
    "description",
    locale,
    property.translations
  ) || DEMO_FULL.description!;
  const galleryRaw = (property.gallery?.length
    ? property.gallery
    : (DEMO_FULL.gallery as string[])
  ).filter((g) => typeof g === "string" || g.asset?._ref);

  const galleryUrls = galleryRaw.map((g) =>
    typeof g === "string"
      ? g
      : urlForImage(g as { asset: { _ref: string } }).width(900).url()
  );
  const galleryAlts = galleryRaw.map((g) =>
    typeof g === "string" ? undefined : g.alt
  );

  const mainImageUrl =
    property.mainImage
      ? urlForImage(property.mainImage).width(1200).height(700).url()
      : property.image ?? "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85";
  const mainImageAlt = property.mainImage?.alt || title;

  const similarProperties = DEMO_LISTINGS
    .filter((p) => p._id !== property._id && p.status === "for_sale")
    .slice(0, 3);

  return (
    <div className="bg-background pt-[68px]">

      {/* ── Image gallery ───────────────────────────────────────────── */}
      <div className="container-site pt-6 pb-0">
        {/* Back link */}
        <Link
          href={localizedPath(locale, "/listings")}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-5 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          {t("back_to_listings")}
        </Link>

        {/* Gallery grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2.5 h-[480px] rounded-2xl overflow-hidden">
          {/* Main image — spans full height on left */}
          <motion.div
            className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={mainImageUrl}
              alt={mainImageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 65vw, 840px"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
          </motion.div>

          {/* Top-right image */}
          <div className="relative overflow-hidden group cursor-pointer">
            {galleryUrls[0] && (
              <Image
                src={galleryUrls[0]}
                alt={galleryAlts[0] || `${title} — interior`}
                fill
                sizes="(max-width: 1280px) 35vw, 420px"
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            )}
          </div>

          {/* Bottom-right image */}
          <div className="relative overflow-hidden group cursor-pointer">
            {galleryUrls[1] && (
              <Image
                src={galleryUrls[1]}
                alt={galleryAlts[1] || `${title} — interior`}
                fill
                sizes="(max-width: 1280px) 35vw, 420px"
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            )}
            {/* Show all photos pill */}
            <div className="absolute bottom-3 right-3">
              <button className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white transition-colors shadow-sm">
                <Images size={12} />
                {t("show_all_photos")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column content ───────────────────────────────────────── */}
      <div className="container-site py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">

          {/* ── Left: property content ─────────────────────────────── */}
          <div className="min-w-0">

            {/* Location + actions row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={13} strokeWidth={2.5} className="text-accent flex-shrink-0" />
                {property.location}
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Share2 size={13} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-red-500 hover:border-red-200 transition-colors">
                  <Heart size={13} />
                </button>
              </div>
            </div>

            {/* Title + price row */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <h1
                className="font-display font-medium text-foreground tracking-wider leading-none"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                {title}
              </h1>
              <div className="text-right">
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">{t("listing_price_label")}</p>
                <p className="font-display text-foreground tracking-wide text-3xl">
                  {formatPrice(property.price, locale)}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {[
                { icon: Maximize2, label: t("sqft_label"),  value: property.sqft != null ? `${property.sqft.toLocaleString("en-US")} m²` : "—" },
                { icon: Bed,       label: t("beds_label"),  value: property.bedrooms },
                { icon: Bath,      label: t("baths_label"), value: property.bathrooms },
                { icon: Home,      label: t("type_label"),  value: property.propertyType ?? "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-card rounded-xl px-4 py-2.5 border border-border"
                >
                  <Icon size={14} strokeWidth={1.8} className="text-accent" />
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-foreground leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-sans font-medium text-base text-foreground mb-3">{t("overview")}</h2>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>

            {/* Accordions */}
            <div className="mb-10 border-t border-border">
              {getAccordionSections(t).map(({ key, label, content }) => (
                <Accordion key={key} label={label}>
                  {content(property)}
                </Accordion>
              ))}
            </div>

            {/* Gallery grid */}
            <div className="mb-10">
              <h2 className="font-sans font-medium text-base text-foreground mb-5">{t("gallery")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {galleryUrls.slice(0, 4).map((url, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={url}
                      alt={galleryAlts[i] || `${title} — ${t("gallery").toLowerCase()} ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 400px"
                      className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location map placeholder */}
            <div>
              <h2 className="font-sans font-medium text-base text-foreground mb-5">{t("location_map_label")}</h2>
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-accent mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-foreground">{property.location}</p>
                  <p className="text-xs text-muted mt-1">{t("map_integration_note")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: sticky sidebar ──────────────────────────────── */}
          <div className="lg:sticky lg:top-24">

            {/* Agent card */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">

              {/* Agent info */}
              <div className="p-5 border-b border-border flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-card">
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80"
                    alt="Niccola Sendzul"
                    width={48} height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">Niccola Sendzul</p>
                </div>
              </div>

              {/* Contact form */}
              <ContactForm />
            </div>

          </div>
        </div>
      </div>

      {/* ── Similar listings ────────────────────────────────────────── */}
      {similarProperties.length > 0 && (
        <div className="border-t border-border section-padding bg-card">
          <div className="container-site">
            <h2 className="font-display text-foreground tracking-wider mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              {t("similar")}
            </h2>
            <p className="text-sm text-muted mb-10">{t("similar_subtitle")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p, i) => (
                <PropertyCard key={p._id} property={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────────
function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className={`font-sans font-medium text-sm transition-colors ${open ? "text-accent" : "text-foreground group-hover:text-accent"}`}>
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-muted flex-shrink-0"
        >
          <ChevronDown size={17} strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-5 pr-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Contact form ───────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: form.name, email: form.email, message: form.message }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
          <Star size={18} fill="#F07820" stroke="none" />
        </div>
        <p className="font-semibold text-foreground text-sm mb-1">Message sent!</p>
        <p className="text-xs text-muted">Niccola will be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full text-sm border border-border rounded-lg px-3 py-2.5 bg-background placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          placeholder="yourname@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full text-sm border border-border rounded-lg px-3 py-2.5 bg-background placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">
          Message
        </label>
        <textarea
          placeholder="Your message here..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="w-full text-sm border border-border rounded-lg px-3 py-2.5 bg-background placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition resize-none"
        />
      </div>
      {state === "error" && (
        <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-foreground text-white text-sm font-semibold py-3 rounded-lg hover:bg-foreground/80 active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
