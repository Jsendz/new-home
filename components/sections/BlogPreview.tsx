import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";
import { formatDate } from "@/lib/utils";
import { DEMO_POSTS, type BlogPost } from "@/lib/demo-blog";

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const items = posts?.length ? posts : DEMO_POSTS;

  return (
    <section className="section-padding bg-background">
      <div className="container-site">
        {/* Header */}
        <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel className="mb-3">{t("label")}</SectionLabel>
            <h2 className="font-display text-display-md text-foreground max-w-md tracking-wider">
              {t("title")}
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm leading-relaxed">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all flex-shrink-0"
          >
            {t("view_all")} <ArrowRight size={16} />
          </Link>
        </FadeInUp>

        {/* Grid — featured (large) + two smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured large post */}
          {items[0] && (
            <FadeInUp className="lg:col-span-3">
              <BlogCard post={items[0]} locale={locale} t={t} large />
            </FadeInUp>
          )}

          {/* Two stacked smaller posts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.slice(1, 3).map((post, i) => (
              <FadeInUp key={post._id} delay={(i + 1) * 0.08}>
                <BlogCard post={post} locale={locale} t={t} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogCard({
  post,
  locale,
  t,
  large = false,
}: {
  post: BlogPost;
  locale: string;
  t: (key: string) => string;
  large?: boolean;
}) {
  const imageUrl =
    post.mainImage ?? "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80";

  return (
    <Link href={`/${locale}/blog/${post.slug.current}`} className="group block">
      <article className="bg-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[2/1]"}`}>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 ${large ? "p-8" : ""}`}>
          <div className="flex items-center gap-4 text-xs text-muted mb-3">
            {post.author && <span>{post.author.name}</span>}
            <span>·</span>
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span className="flex items-center gap-1 ml-auto">
              <Clock size={11} />
              {post.readTime} {t("min_read")}
            </span>
          </div>

          <h3
            className={`font-serif font-medium text-foreground group-hover:text-accent transition-colors leading-snug mb-2 ${
              large ? "text-2xl" : "text-base"
            }`}
          >
            {post.title}
          </h3>

          {large && (
            <p className="text-sm text-muted leading-relaxed mt-3">{post.excerpt}</p>
          )}

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-4 group-hover:gap-2 transition-all">
            {t("read_more")} <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </Link>
  );
}
