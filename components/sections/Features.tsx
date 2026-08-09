"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

const FEATURE_IMAGES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
];

export default function Features() {
  const t = useTranslations("features");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = t.raw("items") as { title: string; description: string }[];

  const toggle = (i: number) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="section-padding bg-card">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text accordion */}
          <div>
            <FadeInUp>
              <SectionLabel className="mb-3">{t("label")}</SectionLabel>
              <h2 className="font-display text-display-md text-foreground mb-12 text-balance tracking-wider">
                {t("title")}
              </h2>
            </FadeInUp>

            <div className="space-y-1">
              {items.map((item, i) => (
                <FadeInUp key={i} delay={i * 0.07}>
                  <div className="border-b border-border">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                      aria-expanded={activeIndex === i}
                    >
                      <span
                        className={`font-sans font-semibold text-base transition-colors ${
                          activeIndex === i ? "text-accent" : "text-foreground group-hover:text-accent"
                        }`}
                      >
                        {item.title}
                      </span>
                      <motion.span
                        animate={{ rotate: activeIndex === i ? 0 : 0 }}
                        className="flex-shrink-0 ml-4 text-muted"
                      >
                        {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeIndex === i && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="text-sm text-muted leading-relaxed pb-5 pr-8">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          {/* Right: crossfading image */}
          <FadeInUp delay={0.15}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex >= 0 ? activeIndex : 0}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={FEATURE_IMAGES[activeIndex >= 0 ? activeIndex % FEATURE_IMAGES.length : 0]}
                    alt="Feature"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Step counter */}
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-serif text-sm font-medium text-foreground">
                  {String(Math.max(activeIndex, 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
