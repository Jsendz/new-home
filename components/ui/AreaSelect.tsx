"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaSelectProps {
  areas: readonly string[];
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  areaLabel: string;
}

export default function AreaSelect({ areas, value, onChange, allLabel, areaLabel }: AreaSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative flex-1 px-4 py-2 md:py-0">
      <label className="block text-[10px] font-medium uppercase tracking-wider text-muted mb-0.5">
        {areaLabel}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 text-sm font-medium text-foreground focus:outline-none cursor-pointer"
      >
        <span className="truncate">{value === "all" ? allLabel : value}</span>
        <ChevronDown
          size={14}
          className={cn("text-muted transition-transform duration-200 flex-shrink-0", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 md:right-auto top-full mt-3 md:w-72 bg-white rounded-xl shadow-2xl border border-border/60 py-2 z-30 origin-top max-h-80 overflow-y-auto"
          >
            <li role="none">
              <button
                type="button"
                role="option"
                aria-selected={value === "all"}
                onClick={() => select("all")}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-150",
                  value === "all" ? "text-navy font-semibold bg-card" : "text-foreground hover:bg-card"
                )}
              >
                {allLabel}
                {value === "all" && <Check size={15} className="text-accent flex-shrink-0" />}
              </button>
            </li>

            <li role="none" className="my-1.5 border-t border-border/60" />

            {areas.map((parish) => (
              <li role="none" key={parish}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === parish}
                  onClick={() => select(parish)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors duration-150",
                    value === parish ? "text-navy font-semibold bg-card" : "text-foreground hover:bg-card"
                  )}
                >
                  <MapPin size={14} className={cn("flex-shrink-0", value === parish ? "text-accent" : "text-muted")} />
                  <span className="flex-1 truncate">{parish}</span>
                  {value === parish && <Check size={15} className="text-accent flex-shrink-0" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
