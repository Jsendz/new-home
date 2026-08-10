"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/site";
import {
  Bed, Bath, Maximize2, MapPin, ArrowRight,
  SlidersHorizontal, Check, X, ChevronDown,
} from "lucide-react";
import { urlForImage } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/ui/FadeInUp";
import { cn } from "@/lib/utils";

// ── Types & demo data (imported + re-exported from shared lib) ────────────
import { DEMO_LISTINGS, type ListingProperty } from "@/lib/demo-listings";
export type { ListingProperty };
export { DEMO_LISTINGS };

// ── Filter config ──────────────────────────────────────────────────────────
type StatusFilter = "all" | "for_sale" | "sold" | "rented";
type SortOption   = "default" | "price_asc" | "price_desc";

const PROPERTY_TYPES = ["Apartment", "Villa", "House", "Condo", "Townhouse"];
const CITIES = [
  "Andorra la Vella", "Escaldes-Engordany", "Encamp",
  "La Massana", "Ordino", "Sant Julià de Lòria", "Canillo",
];

interface PriceRange { label: string; min: number; max: number }
const PRICE_RANGES: PriceRange[] = [
  { label: "Under €400k",      min: 0,       max: 400000   },
  { label: "€400k – €700k",    min: 400000,  max: 700000   },
  { label: "€700k – €1.2M",    min: 700000,  max: 1200000  },
  { label: "€1.2M+",           min: 1200000, max: Infinity  },
];

// ── Main component ─────────────────────────────────────────────────────────
interface ListingsGridProps {
  properties?: ListingProperty[];
}

export default function ListingsGrid({ properties }: ListingsGridProps) {
  const t      = useTranslations("listings");
  const locale = useLocale();
  const items  = properties?.length ? properties : DEMO_LISTINGS;

  const statusOptions: { key: StatusFilter; label: string }[] = [
    { key: "all",      label: t("status.all") },
    { key: "for_sale", label: t("status.for_sale") },
    { key: "sold",     label: t("status.sold") },
    { key: "rented",   label: t("status.rented") },
  ];

  const [status,       setStatus]       = useState<StatusFilter>("all");
  const [sort,         setSort]         = useState<SortOption>("default");
  const [typeFilters,  setTypeFilters]  = useState<Set<string>>(new Set());
  const [cityFilters,  setCityFilters]  = useState<Set<string>>(new Set());
  const [priceFilters, setPriceFilters] = useState<Set<string>>(new Set());
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  const toggleSet = useCallback(<T,>(prev: Set<T>, item: T): Set<T> => {
    const next = new Set(prev);
    if (next.has(item)) next.delete(item); else next.add(item);
    return next;
  }, []);

  const hasActiveFilters =
    status !== "all" || typeFilters.size > 0 || cityFilters.size > 0 || priceFilters.size > 0;

  const activeCount =
    (status !== "all" ? 1 : 0) + typeFilters.size + cityFilters.size + priceFilters.size;

  const clearAll = useCallback(() => {
    setStatus("all");
    setTypeFilters(new Set());
    setCityFilters(new Set());
    setPriceFilters(new Set());
  }, []);

  const filtered = useMemo(() => {
    let out = [...items];
    if (status !== "all")    out = out.filter((p) => p.status === status);
    if (typeFilters.size > 0)
      out = out.filter((p) => p.propertyType && typeFilters.has(p.propertyType));
    if (cityFilters.size > 0)
      out = out.filter((p) => cityFilters.has(p.location.split(", ").pop() ?? ""));
    if (priceFilters.size > 0)
      out = out.filter((p) =>
        PRICE_RANGES.some((r) => priceFilters.has(r.label) && p.price >= r.min && p.price < r.max)
      );
    if (sort === "price_asc")  out.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [items, status, sort, typeFilters, cityFilters, priceFilters]);

  const filterKey = `${status}-${sort}-${[...typeFilters]}-${[...cityFilters]}-${[...priceFilters]}`;

  // Shared sidebar content (rendered for both desktop & mobile)
  const sidebarContent = (
    <div className="space-y-6">
      {/* Status */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-3">Status</p>
        <div className="space-y-1">
          {statusOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatus(key)}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200",
                status === key
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-muted hover:text-foreground hover:bg-card"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Property Type */}
      <FilterSection title="Property Type">
        {PROPERTY_TYPES.map((type) => (
          <FilterCheckbox
            key={type}
            label={type}
            checked={typeFilters.has(type)}
            onChange={() => setTypeFilters((p) => toggleSet(p, type))}
          />
        ))}
      </FilterSection>

      <div className="h-px bg-border" />

      {/* Location */}
      <FilterSection title="Location">
        {CITIES.map((city) => (
          <FilterCheckbox
            key={city}
            label={city}
            checked={cityFilters.has(city)}
            onChange={() => setCityFilters((p) => toggleSet(p, city))}
          />
        ))}
      </FilterSection>

      <div className="h-px bg-border" />

      {/* Price Range */}
      <FilterSection title="Price Range">
        {PRICE_RANGES.map((range) => (
          <FilterCheckbox
            key={range.label}
            label={range.label}
            checked={priceFilters.has(range.label)}
            onChange={() => setPriceFilters((p) => toggleSet(p, range.label))}
          />
        ))}
      </FilterSection>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-muted hover:text-foreground border border-border rounded-full py-2 transition-colors hover:border-foreground/30"
        >
          <X size={11} strokeWidth={2.5} />
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-8 items-start">

      {/* ── Desktop sidebar ────────────────────────────────────────── */}
      <FadeInUp className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-border/60 shadow-sm p-5">
          {sidebarContent}
        </div>
      </FadeInUp>

      {/* ── Main column ────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Top bar */}
        <FadeInUp>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7">

            {/* Mobile: filter toggle */}
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="lg:hidden inline-flex items-center gap-2 text-sm font-semibold bg-card px-4 py-2 rounded-full"
            >
              <SlidersHorizontal size={13} strokeWidth={2} />
              Filters
              {activeCount > 0 && (
                <span className="bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeCount}
                </span>
              )}
              <ChevronDown
                size={13}
                className={cn("transition-transform duration-200", sidebarOpen && "rotate-180")}
              />
            </button>

            {/* Count + sort */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-muted">
                <span className="font-semibold text-foreground">{filtered.length}</span> properties
              </span>
              <div className="flex items-center gap-2 text-sm text-muted">
                <SlidersHorizontal size={13} strokeWidth={2} />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="bg-transparent text-sm text-muted focus:text-foreground outline-none cursor-pointer"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Mobile collapsible sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                {sidebarContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Uniform grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.map((property, i) => (
              <MasonryCard
                key={property._id}
                property={property}
                index={i}
                locale={locale}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <FadeInUp className="py-24 text-center">
            <p className="font-display text-2xl text-foreground mb-2 tracking-wider">No properties found</p>
            <p className="text-sm text-muted">Try adjusting the filters.</p>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}

// ── Sidebar sub-components ─────────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-3">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label, checked, onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} readOnly />
      <div
        onClick={onChange}
        className={cn(
          "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-150",
          checked
            ? "bg-accent border-accent"
            : "border-border group-hover:border-accent/60"
        )}
      >
        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
      </div>
      <span
        onClick={onChange}
        className={cn(
          "text-sm transition-colors select-none",
          checked ? "text-foreground font-medium" : "text-muted group-hover:text-foreground"
        )}
      >
        {label}
      </span>
    </label>
  );
}

// ── Masonry card ───────────────────────────────────────────────────────────
function MasonryCard({
  property, index, locale, t,
}: {
  property: ListingProperty;
  index: number;
  locale: string;
  t: (k: string) => string;
}) {
  const imageUrl =
    property.mainImage
      ? urlForImage(property.mainImage).width(900).url()
      : property.image ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80";

  const statusVariant =
    property.status === "sold"   ? "sold" :
    property.status === "rented" ? "rented" : "accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <Link href={localizedPath(locale, `/listings/${property.slug.current}`)} className="group block">
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-400">

          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={imageUrl}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/70 transition-all duration-300" />

            <div className="absolute top-3 left-3 z-10">
              <Badge variant={statusVariant}>{t(`status.${property.status}`)}</Badge>
            </div>

            {property.propertyType && (
              <div className="absolute top-3 right-3 z-10">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                  {property.propertyType}
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-8">
              <p className="font-serif text-white text-xl font-semibold leading-none">
                {formatPrice(property.price, locale)}
              </p>
            </div>

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileHover={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 bg-accent/90 backdrop-blur-sm py-3 text-white text-xs font-semibold uppercase tracking-wider"
            >
              {t("view_property")} <ArrowRight size={13} />
            </motion.div>
          </div>

          {/* Card body */}
          <div className="px-4 pt-3.5 pb-4">
            <p className="flex items-center gap-1.5 text-[11px] text-muted mb-1.5">
              <MapPin size={10} strokeWidth={2.5} />
              {property.location}
            </p>
            <h3 className="font-serif text-[1.0625rem] font-medium text-foreground leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <StatBadge icon={<Bed size={11} strokeWidth={2} />}      value={property.bedrooms}              label={t("details.beds")} />
              <StatBadge icon={<Bath size={11} strokeWidth={2} />}     value={property.bathrooms}             label={t("details.baths")} />
              <StatBadge icon={<Maximize2 size={11} strokeWidth={2} />} value={property.sqft.toLocaleString("en-US")} label={t("details.sqft")} />
            </div>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: number | string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-card text-muted text-[11px] font-medium px-2.5 py-1 rounded-full">
      {icon}
      <span className="text-foreground font-semibold">{value}</span>
      <span>{label}</span>
    </span>
  );
}
