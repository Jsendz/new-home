import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { ArrowLeft, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityClient, BLOG_POST_BY_SLUG_QUERY, BLOG_SLUGS_QUERY, urlForImage } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl, localizedPath, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import { routing } from "@/i18n/routing";
import { DEMO_POSTS, type BlogPost } from "@/lib/demo-blog";
import { formatDate } from "@/lib/utils";
import JsonLd from "@/components/JsonLd";
import FadeInUp from "@/components/ui/FadeInUp";
import PageTransition from "@/components/ui/PageTransition";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  let slugs: string[] = DEMO_POSTS.map((p) => p.slug.current);
  try {
    const fetched = await sanityClient.fetch<string[]>(BLOG_SLUGS_QUERY);
    if (fetched?.length) slugs = fetched;
  } catch {
    // Sanity not configured — fall back to demo slugs
  }

  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  readTime: number;
  mainImage?: { asset: { _ref: string }; alt?: string };
  body?: PortableTextBlock[];
  author?: { name: string; role?: string; photo?: { asset: { _ref: string } } };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { _ref: string } };
    noIndex?: boolean;
  };
}

async function getPost(slug: string): Promise<SanityBlogPost | BlogPost | null> {
  let post: SanityBlogPost | null = null;
  try {
    post = await sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
  } catch {
    // Sanity not configured — use demo
  }
  return post ?? DEMO_POSTS.find((p) => p.slug.current === slug) ?? null;
}

function resolveImage(post: SanityBlogPost | BlogPost, width: number, height?: number) {
  if ("mainImage" in post && post.mainImage && typeof post.mainImage !== "string") {
    const builder = urlForImage(post.mainImage as { asset: { _ref: string } }).width(width);
    return (height ? builder.height(height) : builder).url();
  }
  return typeof post.mainImage === "string" ? post.mainImage : undefined;
}

function resolveImageAlt(post: SanityBlogPost | BlogPost) {
  if ("mainImage" in post && post.mainImage && typeof post.mainImage !== "string") {
    return (post.mainImage as { alt?: string }).alt || post.title;
  }
  return post.title;
}

function resolveAuthorPhoto(post: SanityBlogPost | BlogPost) {
  const author = post.author as SanityBlogPost["author"] | BlogPost["author"];
  if (!author?.photo) return undefined;
  return typeof author.photo === "string"
    ? author.photo
    : urlForImage(author.photo as { asset: { _ref: string } }).width(80).url();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Article Not Found" };

  const seo = post.seo;
  const image = seo?.ogImage
    ? urlForImage(seo.ogImage).width(1200).height(630).url()
    : resolveImage(post, 1200, 630);

  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: seo?.metaTitle || `${post.title} | The Sweet Home Co.`,
    description: seo?.metaDescription || post.excerpt,
    image,
    noIndex: seo?.noIndex,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const imageUrl = resolveImage(post, 1600, 800);
  const authorPhoto = resolveAuthorPhoto(post);
  const postUrl = localizedUrl(locale, `/blog/${slug}`);
  const articleImage = resolveImage(post, 1200, 630) ?? `${SITE_URL}/logo.svg`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("blog"), url: localizedUrl(locale, "/blog") },
          { name: post.title, url: postUrl },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          image: articleImage,
          datePublished: post.publishedAt,
          authorName: post.author?.name,
          url: postUrl,
        })}
      />

      <PageTransition>
        <div className="pt-[68px]">
          <article className="section-padding bg-background">
            <div className="container-site max-w-3xl">
              <FadeInUp>
                <Link
                  href={localizedPath(locale, "/blog")}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors mb-8"
                >
                  <ArrowLeft size={14} /> {t("back_to_articles")}
                </Link>

                <h1 className="font-display text-display-lg text-foreground tracking-wider mb-5 text-balance">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted mb-10">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      {authorPhoto && (
                        <Image
                          src={authorPhoto}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span>
                        {t("by")} <span className="font-medium text-foreground">{post.author.name}</span>
                      </span>
                    </div>
                  )}
                  <span>·</span>
                  <span>{formatDate(post.publishedAt, locale)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime} {t("min_read")}
                  </span>
                </div>
              </FadeInUp>

              {imageUrl && (
                <FadeInUp delay={0.08}>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12">
                    <Image
                      src={imageUrl}
                      alt={resolveImageAlt(post)}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                </FadeInUp>
              )}

              <FadeInUp delay={0.12}>
                <div className="prose-content space-y-5 text-[15px] text-foreground/85 leading-relaxed font-serif">
                  {Array.isArray(post.body) && typeof post.body[0] === "string" ? (
                    (post.body as string[]).map((paragraph, i) => <p key={i}>{paragraph}</p>)
                  ) : post.body ? (
                    <PortableText value={post.body as PortableTextBlock[]} />
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                </div>
              </FadeInUp>
            </div>
          </article>
        </div>
      </PageTransition>
    </>
  );
}
