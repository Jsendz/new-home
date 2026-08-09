"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, Plus, Minus } from "lucide-react";
import { Star } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import SectionLabel from "@/components/ui/SectionLabel";

const FAQ = [
  {
    q: "How do I get started buying a home?",
    a: "Start by scheduling a free consultation with one of our agents. We'll walk you through your budget, neighborhood preferences, and timeline — no pressure, just clarity.",
  },
  {
    q: "What areas do you serve?",
    a: "We specialize in Wasilla, Anchorage, Palmer, Eagle River, and surrounding Mat-Su Valley communities.",
  },
  {
    q: "How long does the buying process take?",
    a: "On average 30–60 days once an offer is accepted, depending on financing and inspection timelines. We'll keep you informed at every step.",
  },
  {
    q: "Do you help with rentals?",
    a: "Yes — we work with both buyers and renters. Whether you're looking for a long-term lease or a seasonal rental, we can help you find the right fit.",
  },
  {
    q: "Can I sell and buy a new home at the same time?",
    a: "Absolutely. We have experience coordinating simultaneous transactions and can help you structure your timeline to minimize gaps and stress.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah & James K.",
    role: "Bought in Wasilla",
    quote: "Working with this team was an absolute pleasure. They found us our dream home in under three weeks.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
  {
    name: "Marcus T.",
    role: "Sold in Anchorage",
    quote: "Completely transparent from day one. They walked us through every step and sold our home above asking price.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Priya M.",
    role: "Bought in Palmer",
    quote: "As first-time buyers the process seemed daunting, but they made it feel simple and exciting. Exceptional service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    name: "David & Claire W.",
    role: "Bought in Wasilla",
    quote: "Their local knowledge is unmatched. They knew about the listing before it even hit the market.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm]       = useState({ fullName: "", email: "", propertyOfInterest: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");

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
              <SectionLabel className="text-white/50 mb-4">Contact us</SectionLabel>
              <h1 className="font-display text-display-lg text-white tracking-wider mb-4">
                Let&apos;s connect
              </h1>
              <p className="text-sm text-white/60 leading-relaxed mb-10 max-w-sm">
                Got a question? Want to schedule a viewing or just say hi? We&apos;d love to hear from you.
              </p>

              <ul className="space-y-6">
                {[
                  { Icon: Mail,  label: "Email",  value: "info@thesweethomeco.com" },
                  { Icon: Phone, label: "Phone",  value: "+1 (415) 555-0198" },
                  { Icon: Clock, label: "Hours",  value: "Mon–Fri, 9am to 6pm" },
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
                    <h3 className="font-semibold text-foreground mb-2">Message sent!</h3>
                    <p className="text-sm text-muted">We&apos;ll usually reply within a few hours.</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-accent font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">Name</label>
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
                        <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">Email</label>
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
                      <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">What can we help with?</label>
                      <select
                        value={form.propertyOfInterest}
                        onChange={(e) => setForm({ ...form, propertyOfInterest: e.target.value })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select...</option>
                        <option value="buying">Buying a home</option>
                        <option value="selling">Selling my home</option>
                        <option value="renting">Renting</option>
                        <option value="valuation">Property valuation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] block mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Your message..."
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
                      {status === "sending" ? "Sending…" : "Send your message"}
                    </button>

                    {status === "error" && (
                      <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>
                    )}

                    <p className="text-xs text-muted text-center">
                      We usually reply within a few hours. No bots — just real humans.
                    </p>
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
              <SectionLabel className="mb-3">FAQ</SectionLabel>
              <h2 className="font-display text-display-md text-foreground tracking-wider mb-4">
                Quick answers before<br />you reach out
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                Got something on your mind? Check below — or just send us a message, we&apos;ll take it from there.
              </p>
            </FadeInUp>

            <div className="divide-y divide-border">
              {FAQ.map((item, i) => (
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
              Still unsure? Here&apos;s what<br />our clients say.
            </h2>
            <p className="text-sm text-muted">
              Real words from people who reached out — and never looked back.
            </p>
          </FadeInUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <FadeInUp key={item.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={12} fill="#F07820" stroke="none" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 font-serif italic leading-relaxed flex-1 mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
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
