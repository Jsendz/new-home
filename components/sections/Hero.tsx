"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";

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

// ── Search bar field config ──────────────────────────────────────────────────
const SEARCH_FIELDS = [
  { key: "buy",  label: "Buy",  options: ["Buy", "Resale", "New Project"] },
  { key: "rent", label: "Rent", options: ["Rent", "Short-term", "Long-term"] },
  { key: "sell", label: "Sell", options: ["Sell", "List your Property", "Get a Valuation"] },
] as const;

// ── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [selections, setSelections] = useState<Record<string, string>>({
    buy: "Buy",
    rent: "Rent",
    sell: "Sell",
  });

  return (
    <section className="relative bg-navy overflow-x-hidden">

      {/* ── Background image + headline ─────────────────────────────────── */}
      <div className="relative min-h-[72svh] lg:min-h-[78svh] w-full overflow-hidden pt-[68px] flex flex-col">
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
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light mb-5"
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
        <div className="relative z-10 h-14 md:h-9 flex-shrink-0" aria-hidden />
      </div>

      {/* ── Search bar — overlaps the bottom edge of the image ──────────── */}
      <div className="container-site relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="-mt-14 md:-mt-9 bg-white rounded-2xl shadow-2xl border border-border/60 p-3 flex flex-col md:flex-row items-stretch md:items-center gap-1 md:gap-0"
        >
          {SEARCH_FIELDS.map(({ key, options }, i) => (
            <div key={key} className="contents">
              <div className="flex-1 relative px-5 py-3">
                <select
                  value={selections[key]}
                  onChange={(e) =>
                    setSelections((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full appearance-none bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer pr-6"
                >
                  {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
              </div>
              {i < SEARCH_FIELDS.length - 1 && (
                <>
                  <div className="md:hidden h-px w-full bg-border" />
                  <div className="hidden md:block w-px bg-border self-stretch my-2" />
                </>
              )}
            </div>
          ))}

          <Link
            href={`/${locale}/listings`}
            className="flex items-center justify-center gap-2 bg-navy hover:bg-foreground text-white text-sm font-semibold rounded-xl px-7 py-4 transition-colors duration-200 active:scale-95 mt-1 md:mt-0 md:ml-2 flex-shrink-0 w-full md:w-auto"
          >
            <Search size={15} />
            Find Property
          </Link>
        </motion.div>
      </div>

      <div className="h-16 md:h-10" />
    </section>
  );
}
