"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { localizedPath } from "@/lib/site";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { key: "home",     href: (l: string) => localizedPath(l) },
  { key: "listings", href: (l: string) => localizedPath(l, "/listings") },
  { key: "blog",     href: (l: string) => localizedPath(l, "/blog") },
  { key: "about",    href: (l: string) => localizedPath(l, "/about") },
];

const LOCALES = [
  { code: "ca", label: "CA" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export default function Navbar() {
  const t        = useTranslations("nav");
  const locale   = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        animate={{
          backgroundColor: "rgba(255,255,255,1)",
          boxShadow: scrolled
            ? "0 1px 20px 0 rgba(0,0,0,0.08)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container-site h-[68px] flex items-center">

          {/* ── Logo ── */}
          <Link
            href={localizedPath(locale)}
            className="flex-shrink-0 flex items-center gap-2.5 mr-auto"
          >
            {/* S-house logomark */}
            <svg
              viewBox="0 0 70 82"
              className="h-8 w-auto text-accent flex-shrink-0"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4,14 L40,14 L40,7 L53,7 L53,0 L61,0 L61,8 L52,8 L48,14 L48,22 L4,22 Z"/>
              <path d="M48,22 L58,22 L22,64 L12,64 Z"/>
              <path d="M12,64 L66,64 L66,75 L46,75 L46,82 L30,82 L30,75 L12,75 Z"/>
            </svg>
            {/* Brand wordmark */}
            <span className="font-display tracking-widest text-foreground uppercase leading-none text-[0.85rem]">
              The Sweet Home Co.
            </span>
          </Link>

          {/* ── Desktop centre nav ── */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ key, href }) => {
              const active = pathname === href(locale);
              return (
                <Link
                  key={key}
                  href={href(locale)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-1",
                    active ? "text-accent" : "text-muted hover:text-foreground"
                  )}
                >
                  {t(key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop right: locale + CTA ── */}
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            <LocaleSwitcher locale={locale} />
            <Link
              href={localizedPath(locale, "/contact")}
              className="text-sm font-semibold px-5 py-2 rounded-full bg-accent text-white hover:bg-accent-dark active:scale-95 transition-all duration-200"
            >
              {t("contact")}
            </Link>
          </div>

          {/* ── Mobile right: locale + hamburger ── */}
          <div className="lg:hidden flex items-center gap-3 ml-auto">
            <LocaleSwitcher locale={locale} compact />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-card transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={1.8} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate:   0, opacity: 1 }}
                    exit={{   rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={1.8} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>

        {/* ── Mobile slide-down menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
              className="bg-white border-t border-border lg:hidden"
            >
              <div className="container-site py-6 flex flex-col gap-1">

                {NAV_LINKS.map(({ key, href }, i) => {
                  const active = pathname === href(locale);
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={href(locale)}
                        className={cn(
                          "flex items-center justify-between py-3.5 border-b border-border text-sm font-medium",
                          active ? "text-accent" : "text-foreground"
                        )}
                      >
                        {t(key)}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className="pt-5 flex flex-col gap-4"
                >
                  <Link
                    href={localizedPath(locale, "/contact")}
                    className="bg-accent text-white text-sm font-semibold px-6 py-3 rounded-full text-center hover:bg-accent-dark transition-colors"
                  >
                    {t("contact")}
                  </Link>

                  <div className="flex items-center gap-2 justify-center pt-1">
                    <span className="text-xs text-muted mr-1">Language</span>
                    {LOCALES.map(({ code, label }) => (
                      <Link
                        key={code}
                        href={localizedPath(code)}
                        className={cn(
                          "text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors",
                          locale === code
                            ? "bg-foreground text-white border-foreground"
                            : "border-border text-muted hover:text-foreground hover:border-foreground/30"
                        )}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>
    </>
  );
}

// ── Locale switcher ────────────────────────────────────────────────────────
function LocaleSwitcher({
  locale,
  compact = false,
}: {
  locale: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-0.5">
        {LOCALES.map(({ code, label }) => (
          <Link
            key={code}
            href={localizedPath(code)}
            className={cn(
              "text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors duration-200",
              locale === code
                ? "bg-foreground text-white"
                : "text-muted hover:text-foreground"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full p-0.5 bg-card">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={localizedPath(code)}
          className={cn(
            "text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200",
            locale === code
              ? "bg-foreground text-white shadow-sm"
              : "text-muted hover:text-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
