import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sanityClient, SITE_SETTINGS_QUERY, urlForImage } from "@/lib/sanity";
import { organizationSchema } from "@/lib/schema";
import { fontVariables } from "@/lib/fonts";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "New Home | Real Estate",
  description: "Find your perfect place to call home.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es" | "fr" | "ca")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  let settings: Record<string, any> | null = null;
  try {
    settings = await sanityClient.fetch(SITE_SETTINGS_QUERY);
  } catch {
    // Sanity not configured — Organization schema falls back to defaults
  }

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <JsonLd
            data={organizationSchema({
              agencyName: settings?.agencyName,
              logo: settings?.logo ? urlForImage(settings.logo).width(400).url() : undefined,
              contactEmail: settings?.contactEmail,
              phone: settings?.phone,
              address: settings?.address,
              socialLinks: settings?.socialLinks,
            })}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
