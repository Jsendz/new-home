"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { localizedPath } from "@/lib/site";
import { ANDORRA_PARISHES, PRICE_MIN, PRICE_MAX, PRICE_STEP } from "@/lib/andorra";
import RangeSlider from "@/components/ui/RangeSlider";
import AreaSelect from "@/components/ui/AreaSelect";
import { cn } from "@/lib/utils";

// ── Animation config ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function formatCompactPrice(value: number) {
  if (value >= PRICE_MAX) return "€1.5M+";
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${Math.round(value / 1000)}k`;
  return `€${value}`;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const t      = useTranslations("hero");
  const tSearch = useTranslations("hero.search");
  const locale = useLocale();

  const [intent, setIntent]       = useState<"for_sale" | "rented">("for_sale");
  const [area, setArea]           = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  const searchHref = () => {
    const params = new URLSearchParams();
    params.set("status", intent);
    if (area !== "all") params.set("city", area);
    if (priceRange[0] > PRICE_MIN) params.set("priceMin", String(priceRange[0]));
    if (priceRange[1] < PRICE_MAX) params.set("priceMax", String(priceRange[1]));
    const query = params.toString();
    return `${localizedPath(locale, "/listings")}${query ? `?${query}` : ""}`;
  };

  return (
    <section className="relative bg-navy overflow-x-hidden">

      {/* ── Background image + headline ─────────────────────────────────── */}
      <div className="relative min-h-[72svh] lg:min-h-[100svh] w-full overflow-hidden pt-[68px] flex flex-col">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&q=90"
          alt="Luxury home exterior at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Navy gradient wash — keeps the site's palette, ensures text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/35 to-navy/85" />

        {/* Content — centered in the space above the search bar's overlap zone */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-light mb-5"
          >
            {t("label")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-white leading-[1.0] tracking-wider mb-6 max-w-4xl"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/85 text-[1.0625rem] leading-relaxed max-w-xl"
          >
            {t("subheadline")}
          </motion.p>
        </motion.div>

        {/* Reserved space — matches the negative margin the search bar uses to
            overlap the image below, so the text above always centers relative
            to the same fixed line regardless of viewport height. */}
        <div className="relative z-10 h-24 md:h-9 flex-shrink-0" aria-hidden />
      </div>

      {/* ── Search bar — overlaps the bottom edge of the image ──────────── */}
      <div className="container-site relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="-mt-24 md:-mt-28 bg-white rounded-2xl shadow-2xl border border-border/60 p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0"
        >
          {/* Buy / Rent toggle */}
          <div className="flex-shrink-0 flex items-center gap-1 bg-card rounded-xl p-1">
            {(["for_sale", "rented"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setIntent(key)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                  intent === key
                    ? "bg-navy text-white"
                    : "text-muted hover:text-foreground"
                )}
              >
                {key === "for_sale" ? tSearch("buy") : tSearch("rent")}
              </button>
            ))}
          </div>

          <div className="hidden md:block w-px bg-border self-stretch my-2 mx-1" />

          {/* Area dropdown */}
          <AreaSelect
            areas={ANDORRA_PARISHES}
            value={area}
            onChange={setArea}
            allLabel={tSearch("area_all")}
            areaLabel={tSearch("area_label")}
          />

          <div className="hidden md:block w-px bg-border self-stretch my-2 mx-1" />

          {/* Price range slider */}
          <div className="flex-1 min-w-0 px-4 py-2 md:py-0">
            <label className="block text-[10px] font-medium uppercase tracking-wider text-muted mb-2">
              {tSearch("price_label")}
            </label>
            <RangeSlider
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={priceRange}
              onChange={setPriceRange}
              formatValue={formatCompactPrice}
            />
          </div>

          <Link
            href={searchHref()}
            className="flex items-center justify-center gap-2 bg-navy hover:bg-foreground text-white text-sm font-semibold rounded-xl px-7 py-4 transition-colors duration-200 active:scale-95 mt-1 md:mt-0 md:ml-2 flex-shrink-0 w-full md:w-auto"
          >
            <Search size={15} />
            {tSearch("cta")}
          </Link>
        </motion.div>
      </div>

      <div className="h-16 md:h-10" />
    </section>
  );
}
