"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  url: string;
  alt?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ImageLightbox({ images, index, open, onClose, onIndexChange }: ImageLightboxProps) {
  const count = images.length;

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose, goPrev, goNext]);

  if (typeof document === "undefined" || !open) return null;

  const current = images[index];
  if (!current) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 z-10 text-white/80 text-sm font-medium tabular-nums">
        {index + 1} / {count}
      </div>

      {/* Prev */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous image"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next image"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto my-auto px-16 py-16 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="relative w-full h-full"
        >
          <Image
            src={current.url}
            alt={current.alt || ""}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Thumbnail strip */}
      {count > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[92vw] overflow-x-auto px-2 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200",
                i === index
                  ? "ring-2 ring-white opacity-100"
                  : "ring-1 ring-white/20 opacity-50 hover:opacity-80"
              )}
            >
              <Image src={img.url} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
}
