import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

const FEATURE_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80";

interface FeatureItem {
  title: string;
  description: string;
}

function FeatureCard({ index, title, description }: FeatureItem & { index: number }) {
  return (
    <div className="h-full border border-border rounded-2xl p-6 sm:p-8 bg-background">
      <p className="font-display text-4xl text-foreground tracking-wider mb-4 sm:mb-5">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="font-sans font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

export default function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureItem[];
  const [left, right] = [items.slice(0, 2), items.slice(2, 4)];

  return (
    <section className="section-padding bg-card">
      <div className="container-site">
        <FadeInUp className="text-center mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="h-px flex-1 max-w-12 sm:max-w-24 bg-border" />
            <SectionLabel>{t("label")}</SectionLabel>
            <span className="h-px flex-1 max-w-12 sm:max-w-24 bg-border" />
          </div>
          <h2 className="font-display text-display-md text-foreground tracking-wider mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </FadeInUp>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {left.map((item, i) => (
              <FadeInUp key={item.title} delay={i * 0.08}>
                <FeatureCard index={i + 1} {...item} />
              </FadeInUp>
            ))}
          </div>

          <FadeInUp
            delay={0.16}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px]"
          >
            <Image
              src={FEATURE_IMAGE}
              alt="Our real estate team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </FadeInUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {right.map((item, i) => (
              <FadeInUp key={item.title} delay={(i + 2) * 0.08}>
                <FeatureCard index={i + 3} {...item} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
