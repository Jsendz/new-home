import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";
import { sanityClient, ABOUT_PAGE_QUERY, urlForImage } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

const DEFAULT_STATS = [
  { value: "15+", label: "Years of experience" },
  { value: "250+", label: "Homes sold" },
  { value: "98%", label: "Client satisfaction" },
  { value: "9",   label: "Industry awards" },
];

const DEFAULT_MISSIONS = [
  {
    title: "Putting families first",
    body: "Every decision we make starts with one question: what's best for the people we serve? We believe a home is more than a transaction — it's where life happens.",
  },
  {
    title: "Local expertise, world-class service",
    body: "Rooted in Alaska's real estate market, we combine hyper-local knowledge with genuine care to deliver outcomes that consistently exceed expectations.",
  },
];

const DEFAULT_TEAM = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Lead Agent",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=600&q=80",
  },
  {
    name: "James Kowalski",
    role: "Senior Property Consultant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Elena Reyes",
    role: "Client Relations Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
];

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: "nav" });

  let data: Record<string, any> | null = null;
  try {
    data = await sanityClient.fetch(ABOUT_PAGE_QUERY);
  } catch {
    // Sanity not configured — use defaults
  }

  const heroHeadline    = data?.heroHeadline    ?? "Crafting homes\nthat feel like yours";
  const heroSubheadline = data?.heroSubheadline ?? "We turn ideas into inviting, functional spaces — thoughtfully designed for the way you live every day.";
  const heroImageUrl    = data?.heroImage ? urlForImage(data.heroImage).width(1600).url() : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80";

  const storyHeadline   = data?.storyHeadline ?? "The story behind\nour creative craft";
  const storyParagraphs = data?.storyParagraphs?.length ? data.storyParagraphs : [
    "We started with a vision: transform the way Alaska families find their perfect home. What began as a small, passionate team has grown into a full-service real estate agency dedicated to our clients from the very first conversation to the moment the keys are handed over.",
    "Over the years, our dedication to integrity, detail, and genuine relationships has helped shape hundreds of lives across Wasilla, Anchorage, Palmer, and the Mat-Su Valley. We design every interaction with intention — blending local expertise and warmth to make real estate feel personal, not transactional.",
  ];
  const quoteText        = data?.quoteText       ?? "Every home we help someone find is a chance to change their life. That responsibility drives everything we do — every call, every showing, every negotiation.";
  const quoteAuthorName  = data?.quoteAuthorName  ?? "Sarah Mitchell";
  const quoteAuthorRole  = data?.quoteAuthorRole  ?? "Founder & Lead Agent";
  const quoteAuthorImage = data?.quoteAuthorImage ? urlForImage(data.quoteAuthorImage).width(100).url() : "https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=100&q=80";

  const missionHeadline = data?.missionHeadline ?? "Purpose that\ndrives every detail";
  const missions        = data?.missions?.length ? data.missions : DEFAULT_MISSIONS;
  const stats           = data?.stats?.length   ? data.stats   : DEFAULT_STATS;
  const team            = data?.team?.length     ? data.team.map((m: any) => ({
    name:  m.name,
    role:  m.role,
    image: m.image ? urlForImage(m.image).width(600).url() : DEFAULT_TEAM[0].image,
  })) : DEFAULT_TEAM;

  return (
    <div className="pt-[68px]">
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: localizedUrl(locale, "") },
          { name: tNav("about"), url: localizedUrl(locale, "/about") },
        ])}
      />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <Image
          src={heroImageUrl}
          alt="Beautiful home"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="relative container-site pb-16">
          <SectionLabel className="text-white/60 mb-3">About us</SectionLabel>
          <h1 className="font-display text-display-xl text-white leading-none whitespace-pre-line">
            {heroHeadline}
          </h1>
          <p className="mt-4 text-white/70 max-w-md text-sm leading-relaxed">
            {heroSubheadline}
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeInUp>
              <SectionLabel className="mb-3">Our story</SectionLabel>
              <h2 className="font-display text-display-md text-foreground tracking-wider mb-6 whitespace-pre-line">
                {storyHeadline}
              </h2>
              <div className="space-y-4 text-sm text-muted leading-relaxed">
                {storyParagraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeInUp>

            <FadeInUp delay={0.12}>
              <div className="bg-card rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-6 font-display text-[8rem] leading-none text-accent/10 select-none">
                  &ldquo;
                </div>
                <p className="font-serif italic text-foreground/80 text-sm leading-relaxed mb-8 relative z-10">
                  &ldquo;{quoteText}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-border flex-shrink-0">
                    <Image
                      src={quoteAuthorImage}
                      alt={quoteAuthorName}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{quoteAuthorName}</p>
                    <p className="text-xs text-muted">{quoteAuthorRole}</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section-padding bg-navy">
        <div className="container-site">
          <FadeInUp>
            <SectionLabel className="text-white/50 mb-3">Our mission</SectionLabel>
            <h2 className="font-display text-display-md text-white tracking-wider mb-12 whitespace-pre-line">
              {missionHeadline}
            </h2>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 gap-10 max-w-2xl">
            {missions.map((m: { title: string; body: string }, i: number) => (
              <FadeInUp key={m.title} delay={i * 0.1}>
                <div className="border-l-2 border-accent pl-5">
                  <h3 className="font-semibold text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{m.body}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <FadeInUp className="text-center mb-14">
            <SectionLabel className="mb-3">Proven results</SectionLabel>
            <h2 className="font-display text-display-md text-foreground tracking-wider">
              Where vision meets<br />measurable impact
            </h2>
            <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
              Our client-driven approach has earned trust and delivered lasting results across Alaska&apos;s real estate market.
            </p>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s: { value: string; label: string }, i: number) => (
              <FadeInUp key={s.value} delay={i * 0.08}>
                <div className="bg-card rounded-2xl p-8 text-center">
                  <p className="font-display text-5xl text-accent tracking-wider">{s.value}</p>
                  <p className="text-xs text-muted mt-2">{s.label}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-site">
          <FadeInUp className="text-center mb-14">
            <SectionLabel className="mb-3">Our team</SectionLabel>
            <h2 className="font-display text-display-md text-foreground tracking-wider">
              The dedicated team<br />behind the craft
            </h2>
            <p className="mt-4 text-sm text-muted max-w-md mx-auto">
              Our team unites agents, advisors, and support staff who care about every single detail.
            </p>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member: { name: string; role: string; image: string }, i: number) => (
              <FadeInUp key={member.name} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-5 relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted mt-1">{member.role}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    {["𝕏", "IG", "in"].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-[10px] font-semibold text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
