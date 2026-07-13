"use client";

import { useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { InteractiveCard } from "@/components/motion/InteractiveCard";
import type { ServiceData } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const PAIN_ICONS = ["⚡", "🔒", "⏱️", "📉", "🔄"];
const FEATURE_ICONS = ["🎯", "⚡", "🛡️", "📊", "🔗"];

export function ServiceDetailClient({
  service,
  otherServices,
}: {
  service: ServiceData;
  otherServices: ServiceData[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {}
      <section data-anim="service-hero" className="pt-40 min-h-dvh flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--color-signal),transparent_70%)]" />
        </div>
        <div className="grid-12 relative z-10">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono text-signal text-6xl md:text-8xl font-bold leading-none"
              style={{ WebkitTextStroke: "1px currentColor", WebkitTextFillColor: "transparent" }}>
              {service.numeral}
            </span>
          </div>
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-7 mt-4 md:mt-0">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Service</span>
            <h1 className="text-display text-5xl md:text-7xl tracking-tight mt-2">{service.name}</h1>
            <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">{service.tagline}</p>
            <p className="mt-4 text-ink/50 leading-relaxed max-w-xl">{service.description}</p>
            <div className="mt-10">
              <MagneticButton href="/contact" variant="primary">Discuss this service</MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {}
      <section data-anim="service-problem" className="section-padding border-t border-mist relative">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-5">
            <ScrollReveal variant="fade-left">
              <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">The Problem</span>
              <h2 className="text-display text-3xl md:text-5xl tracking-tight mt-4">{service.problem.title}</h2>
              <p className="mt-6 text-ink/50 leading-relaxed">{service.problem.description}</p>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 mt-12 md:mt-0">
            <div className="space-y-4">
              {service.problem.pains.map((pain, i) => (
                <ScrollReveal key={i} variant="fade-right" delay={i * 0.08}>
                  <div className="group flex items-start gap-4 p-5 rounded-xl border border-mist hover:border-signal/20 hover:bg-white/[0.02] transition-all">
                    <span className="text-lg flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-signal/10 text-signal">
                      {PAIN_ICONS[i % PAIN_ICONS.length]}
                    </span>
                    <p className="text-sm text-ink/70 leading-relaxed pt-1">{pain}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section data-anim="service-approach" className="section-padding bg-graphite border-t border-mist">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-5">
            <ScrollReveal variant="fade-up">
              <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Our Approach</span>
              <h2 className="text-display text-3xl md:text-5xl tracking-tight mt-4">{service.solution.title}</h2>
              <p className="mt-6 text-ink/50 leading-relaxed">{service.solution.description}</p>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 mt-12 md:mt-0">
            <div className="grid gap-4">
              {service.solution.benefits.map((benefit, i) => (
                <ScrollReveal key={i} variant="fade-right" delay={i * 0.1}>
                  <div className="p-6 rounded-xl border border-mist bg-paper/50 hover:border-signal/20 transition-all group">
                    <span className="font-mono text-signal text-xs tracking-wider uppercase">{benefit.label}</span>
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">{benefit.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section data-anim="service-features" className="section-padding border-t border-mist">
        <ScrollReveal variant="fade-up">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Features</span>
              <h2 className="text-display text-3xl md:text-5xl tracking-tight mt-4">What you actually get.</h2>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid-12 mt-12 gap-y-8">
          {service.features.map((feature, i) => (
            <ScrollReveal key={i} variant="fade-up" delay={i * 0.06} className="col-span-12 md:col-span-4">
              <div className="p-6 rounded-2xl border border-mist h-full hover:border-signal/20 hover:bg-white/[0.01] transition-all group">
                <span className="text-2xl">{FEATURE_ICONS[i % FEATURE_ICONS.length]}</span>
                <h3 className="text-display text-lg mt-4 group-hover:text-signal transition-colors">{feature.label}</h3>
                <p className="text-sm text-ink/50 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {}
      {service.faq.length > 0 && (
        <section data-anim="service-faq" className="section-padding border-t border-mist bg-graphite/30">
          <ScrollReveal variant="fade-up">
            <div className="grid-12">
              <div className="col-span-12 md:col-span-8">
                <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">FAQ</span>
                <h2 className="text-display text-3xl md:text-5xl tracking-tight mt-4">Common questions.</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid-12 mt-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <div className="space-y-3">
                {service.faq.map((item, i) => (
                  <ScrollReveal key={i} variant="fade-up" delay={i * 0.06}>
                    <div className="border border-mist rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-sm font-medium text-ink/80 pr-4">{item.q}</span>
                        <span className={`text-signal text-lg flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="px-6 pb-5 text-sm text-ink/50 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {}
      <section data-anim="service-cta" className="section-padding bg-signal/5 border-t border-mist">
        <ScrollReveal variant="scale-in" className="text-center">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Ready to start?</span>
          <h2 className="text-display text-3xl md:text-6xl tracking-tight mt-4">
            Let&apos;s talk about your
            <br />
            <span className="text-signal">{service.name.toLowerCase()} project.</span>
          </h2>
          <p className="mt-6 text-ink/50 max-w-md mx-auto">
            No pitch, no pressure. A 15-minute call to see if there&apos;s a fit.
          </p>
          <div className="mt-10">
            <MagneticButton href="/contact" variant="primary">Start the conversation</MagneticButton>
          </div>
        </ScrollReveal>
      </section>

      {}
      <section data-anim="service-other" className="section-padding border-t border-mist">
        <ScrollReveal variant="fade-up">
          <div className="grid-12">
            <div className="col-span-12">
              <h2 className="text-display text-3xl md:text-4xl tracking-tight">Other services</h2>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid-12 mt-8 gap-y-6">
          {otherServices.map((s, i) => (
            <ScrollReveal key={s.id} variant="fade-up" delay={i * 0.08} className="col-span-12 md:col-span-4">
              <Link href={`/services/${s.slug}`} className="block h-full">
                <InteractiveCard className="p-6 border border-mist hover:border-signal/20 hover:bg-white/5 transition-colors h-full" tiltAmount={5}>
                  <span className="font-mono text-signal text-xs">{s.numeral}</span>
                  <h3 className="text-display text-xl mt-2 group-hover:text-signal transition-colors">{s.name}</h3>
                  <p className="text-sm text-ink/50 mt-2">{s.tagline}</p>
                </InteractiveCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
