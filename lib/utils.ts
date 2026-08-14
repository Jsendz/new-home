import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: string = "ca"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

type SlugValue = { current?: string } | string | undefined;

export type Translations = {
  title_es?: string; title_fr?: string; title_ca?: string;
  description_es?: string; description_fr?: string; description_ca?: string;
  slug_es?: SlugValue; slug_fr?: SlugValue; slug_ca?: SlugValue;
};

export function localizedField(
  fallback: string | undefined,
  field: "title" | "description",
  locale: string,
  translations?: Translations
): string {
  if (!translations) return fallback ?? "";
  const key = `${field}_${locale}` as keyof Translations;
  const value = translations[key];
  return (typeof value === "string" && value) || fallback || "";
}

/** Resolves the URL slug for a property in a given locale, falling back to
 *  the base (English) slug when no translated slug has been set — so every
 *  locale always has a working URL, even before editors fill in translations. */
export function localizedSlug(
  baseSlug: string,
  locale: string,
  translations?: Translations
): string {
  if (!translations) return baseSlug;
  const key = `slug_${locale}` as keyof Translations;
  const value = translations[key] as SlugValue;
  const slug = typeof value === "string" ? value : value?.current;
  return slug || baseSlug;
}

export function formatDate(dateString: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
