import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityClient, BLOG_POSTS_QUERY } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { DEMO_POSTS, type BlogPost } from "@/lib/demo-blog";
import JsonLd from "@/components/JsonLd";
import { BlogCard } from "@/components/sections/BlogPreview";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/ui/PageTransition";
import FadeInUp from "@/components/ui/FadeInUp";

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  let posts: BlogPost[] = [];
  try {
    posts = await sanityClient.fetch(BLOG_POSTS_QUERY);
  } catch {
    // Sanity not configured — falls back to demo posts
  }
  const items = posts?.length ? posts : DEMO_POSTS;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("blog"), url: localizedUrl(locale, "/blog") },
        ])}
      />
      <PageTransition>
        <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
        <section className="section-padding bg-background">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((post, i) => (
                <FadeInUp key={post._id} delay={(i % 3) * 0.08}>
                  <BlogCard post={post} locale={locale} t={t} />
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
