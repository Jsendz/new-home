import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityClient, PROPERTIES_QUERY } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ListingsGrid from "@/components/sections/ListingsGrid";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/ui/PageTransition";

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.listings" });
  return buildMetadata({
    locale,
    path: "/listings",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ListingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "listings" });

  let properties = [];

  try {
    properties = await sanityClient.fetch(PROPERTIES_QUERY);
  } catch {
    // Sanity not configured — falls back to demo data in ListingsGrid
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("listings"), url: localizedUrl(locale, "/listings") },
        ])}
      />
      <PageTransition>
        <PageHeader
          label={t("page_label")}
          title={t("page_title")}
          subtitle={t("page_subtitle")}
        />
        <section className="section-padding bg-background">
          <div className="container-site">
            <Suspense fallback={null}>
              <ListingsGrid properties={properties} />
            </Suspense>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
