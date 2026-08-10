"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, Plus, Minus } from "lucide-react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

const TESTIMONIAL_IMAGES = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
];

export default function ContactContent() {
  const t = useTranslations("contact");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm]       = useState({ fullName: "", email: "", propertyOfInterest: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");

  const faq = t.raw("faq") as { q: string; a: string }[];
  const testimonials = t.raw("testimonials") as { name: string; role: string; quote: string }[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setForm({ fullName: "", email: "", propertyOfInterest: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-[68px]">

      {/* ── Hero / Contact split ── */}
      <section className="section-padding bg-navy">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: info */}
            <FadeInUp>
              <SectionLabel className="text-white/50 mb-4">{t("hero_label")}</SectionLabel>
              <h1 className="font-display text-display-lg text-white tracking-wider mb-4">
                {t("hero_headline")}
              </h1>
              <p className="text-sm text-white/60 leading-relaxed mb-10 max-w-sm">
                {t("hero_subheadline")}
              </p>

              <ul className="space-y-6">
                {[
                  { Icon: Mail,  label: t("info_email_label"), value: "info@thesweethomeco.ad" },
                  { Icon: Phone, label: t("info_phone_label"), value: "+376 800 100" },
                  { Icon: Clock, label: t("info_hours_label"), value: t("info_hours_value") },
                ].map(({ Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-0.5">{label}</p>
                      <p className="text-sm text-white">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-8">
                {["Instagram", "Facebook", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-xs font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white/50 rounded-full px-4 py-2 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </FadeInUp>

            {/* Right: form */}
            <FadeInUp delay={0.12}>
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-black/10">
                {status === "sent" ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{t("form.success_title")}</h3>
                    <p className="text-sm text-muted">{t("form.success_body")}</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-accent font-semibold hover:underline"
                    >
                      {t("form.submit")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">{t("form.name")}</label>
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          required
                          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">{t("form.email")}</label>
                        <input
                          type="email"
                          placeholder="jane@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">{t("form.property")}</label>
                      <select
                        value={form.propertyOfInterest}
                        onChange={(e) => setForm({ ...form, propertyOfInterest: e.target.value })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">...</option>
                        <option value="buying">{t("form.option_buying")}</option>
                        <option value="selling">{t("form.option_selling")}</option>
                        <option value="renting">{t("form.option_renting")}</option>
                        <option value="valuation">{t("form.option_valuation")}</option>
                        <option value="other">{t("form.option_other")}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">{t("form.message")}</label>
                      <textarea
                        rows={5}
                        placeholder="..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-navy text-white font-semibold text-sm py-4 rounded-xl hover:bg-navy/90 active:scale-[0.99] transition-all disabled:opacity-60"
                    >
                      {t("form.submit")}
                    </button>

                    {status === "error" && (
                      <p className="text-xs text-red-500 text-center">{t("form.error")}</p>
                    )}
                  </form>
                )}
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeInUp>
              <SectionLabel className="mb-3">{t("faq_label")}</SectionLabel>
              <h2 className="font-display text-display-md text-foreground tracking-wider mb-4">
                {t("faq_headline")}
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                {t("faq_subtitle")}
              </p>
            </FadeInUp>

            <div className="divide-y divide-border">
              {faq.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 text-muted">
                      {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="text-sm text-muted leading-relaxed pb-5">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding bg-card">
        <div className="container-site">
          <FadeInUp className="text-center mb-12">
            <h2 className="font-display text-display-md text-foreground tracking-wider mb-3">
              {t("testimonials_headline")}
            </h2>
            <p className="text-sm text-muted">
              {t("testimonials_subtitle")}
            </p>
          </FadeInUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((item, i) => (
              <FadeInUp key={item.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={12} fill="#F07820" stroke="none" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 font-serif italic leading-relaxed flex-1 mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={TESTIMONIAL_IMAGES[i % TESTIMONIAL_IMAGES.length]}
                      alt={item.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted">{item.role}</p>
                    </div>
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
