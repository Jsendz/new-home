"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  rating: number;
  authorImage?: string;
}

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80",
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations("testimonials");
  const translatedItems: Omit<Testimonial, "_id" | "rating" | "authorImage">[] = t.raw("items");
  const demoTestimonials: Testimonial[] = translatedItems.map((item, i) => ({
    ...item,
    _id: String(i + 1),
    rating: 5,
    authorImage: DEMO_IMAGES[i % DEMO_IMAGES.length],
  }));
  const items = testimonials?.length ? testimonials : demoTestimonials;
  const doubled = [...items, ...items]; // duplicate for seamless loop

  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const animRef = useRef<number | undefined>(undefined);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 340 + 24; // card width + gap
    const half = cardWidth * items.length;

    const step = () => {
      if (!paused) {
        posRef.current += 0.6;
        if (posRef.current >= half) posRef.current -= half;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [paused, items.length]);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-site mb-12">
        <FadeInUp className="text-center">
          <SectionLabel className="mb-3">{t("label")}</SectionLabel>
          <h2 className="font-display text-display-md text-foreground tracking-wider">{t("title")}</h2>
        </FadeInUp>
      </div>

      {/* Scrolling track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 w-max will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {doubled.map((item, i) => (
              <TestimonialCard key={`${item._id}-${i}`} testimonial={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[340px] flex-shrink-0 bg-card rounded-2xl p-7">
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#F07820" stroke="none" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-6 font-serif italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-border flex-shrink-0">
          {testimonial.authorImage && (
            <Image
              src={testimonial.authorImage}
              alt={testimonial.authorName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.authorName}</p>
          {testimonial.authorRole && (
            <p className="text-xs text-muted">{testimonial.authorRole}</p>
          )}
        </div>
      </div>
    </div>
  );
}
