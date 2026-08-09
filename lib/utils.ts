import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

type Translations = {
  title_es?: string; title_fr?: string; title_ca?: string;
  description_es?: string; description_fr?: string; description_ca?: string;
};

export function localizedField(
  fallback: string | undefined,
  field: "title" | "description",
  locale: string,
  translations?: Translations
): string {
  if (!translations) return fallback ?? "";
  const key = `${field}_${locale}` as keyof Translations;
  return translations[key] || fallback || "";
}

export function formatDate(dateString: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
