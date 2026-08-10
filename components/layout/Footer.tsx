import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { localizedPath } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-navy text-white">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <svg viewBox="0 0 70 82" className="h-8 w-auto text-accent flex-shrink-0" fill="currentColor" aria-hidden>
                <path d="M4,14 L40,14 L40,7 L53,7 L53,0 L61,0 L61,8 L52,8 L48,14 L48,22 L4,22 Z"/>
                <path d="M48,22 L58,22 L22,64 L12,64 Z"/>
                <path d="M12,64 L66,64 L66,75 L46,75 L46,82 L30,82 L30,75 L12,75 Z"/>
              </svg>
              <p className="font-display text-2xl tracking-widest uppercase text-white">The Sweet Home Co.</p>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">{t("tagline")}</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t("links")}</p>
            <ul className="space-y-2">
              {[
                { href: localizedPath(locale), label: nav("home") },
                { href: localizedPath(locale, "/about"), label: nav("about") },
                { href: localizedPath(locale, "/listings"), label: nav("listings") },
                { href: localizedPath(locale, "/blog"), label: nav("blog") },
                { href: localizedPath(locale, "/contact"), label: nav("contact") },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t("contact")}</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Avinguda Meritxell, 1</li>
              <li>AD500 Andorra la Vella, Andorra</li>
              <li className="pt-2">+376 800 100</li>
              <li>info@thesweethomeco.ad</li>
            </ul>

            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-6 mb-3">{t("socials")}</p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} The Sweet Home Co. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href={localizedPath(locale, "/about")} className="hover:text-white/60 transition-colors">{nav("about")}</Link>
            <Link href={localizedPath(locale, "/listings")} className="hover:text-white/60 transition-colors">{nav("listings")}</Link>
            <Link href={localizedPath(locale, "/contact")} className="hover:text-white/60 transition-colors">{nav("contact")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
