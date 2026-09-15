import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { getLegalContent, type LegalLocaleContent } from "@/lib/legal-content";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import LegalContent from "@/components/sections/LegalContent";
import PageTransition from "@/components/ui/PageTransition";

interface Props {
  params: Promise<{ locale: string }>;
}

/** Builds the generateMetadata + page component pair for one of the
 *  footer-only legal pages — the three route files just re-export these,
 *  since the only thing that differs between them is the document key
 *  and its URL path. */
export function createLegalPage(docKey: keyof LegalLocaleContent, path: string) {
  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const doc = getLegalContent(locale)[docKey];
    return buildMetadata({
      locale,
      path,
      title: `${doc.title} | The Sweet Home Co.`,
      description: doc.sections[0]?.body?.[0] ?? doc.title,
    });
  }

  async function Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const tNav = await getTranslations({ locale, namespace: "nav" });
    const tLegal = await getTranslations({ locale, namespace: "legal" });
    const doc = getLegalContent(locale)[docKey];

    return (
      <>
        <JsonLd
          data={breadcrumbSchema([
            { name: tNav("home"), url: localizedUrl(locale, "") },
            { name: doc.title, url: localizedUrl(locale, path) },
          ])}
        />
        <PageTransition>
          <div className="pt-[68px]">
            <PageHeader label={doc.pageLabel} title={doc.title} />
            <LegalContent document={doc} placeholdersLabel={tLegal("placeholders_label")} />
          </div>
        </PageTransition>
      </>
    );
  }

  return { generateMetadata, Page };
}
