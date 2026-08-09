"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=85"
          alt="Scenic landscape"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <FadeInUp>
          <SectionLabel className="text-white/60 mb-4">{t("label")}</SectionLabel>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <h2 className="font-display text-display-lg text-white mb-5 text-balance tracking-wider">
            {t("title")}
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="text-white/70 text-base mb-8 leading-relaxed">{t("subtitle")}</p>
        </FadeInUp>
        <FadeInUp delay={0.28}>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-accent text-white font-medium px-8 py-4 rounded-full hover:bg-accent-dark transition-colors text-sm"
          >
            {t("button")}
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
}
