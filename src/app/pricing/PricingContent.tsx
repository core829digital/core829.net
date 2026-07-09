"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { InteractiveCard } from "@/components/motion/InteractiveCard";
import { MagneticButton } from "@/components/motion/MagneticButton";

const MODELS = [
  {
    name: "Project Build",
    problem: "For when you have a clear scope and need it built, on time, on budget.",
    tagline: "Fixed scope, fixed price, delivered.",
    description:
      "For well-defined projects with clear requirements. We scope it, price it, build it, and hand it over. You own everything we produce.",
    features: [
      "Fixed-price quote after scope",
      "2-8 week delivery timeline",
      "Full source code ownership",
      "30-day post-launch support",
      "Hosting setup included",
    ],
    cta: "Get a quote",
    href: "/contact",
  },
  {
    name: "Rent-a-WebApp",
    problem: "For when you need a working tool today, not a development project.",
    tagline: "Pre-built tools, monthly license.",
    description:
      "Our fastest path to value. Pick a pre-built tool, use it today, cancel anytime. Hosting, updates, and support included in the monthly price.",
    features: [
      "Ready in hours, not months",
      "All hosting & updates included",
      "Cancel anytime",
      "Custom branding available",
      "Priority support channel",
    ],
    cta: "Browse apps",
    href: "/services/rent-webapps",
  },
  {
    name: "Retainer",
    problem: "For when you need ongoing development without hiring a full-time team.",
    tagline: "Ongoing development, predictable budget.",
    description:
      "For teams that need continuous development. A monthly allocation of engineering time for features, maintenance, and improvements. Scale up or down.",
    features: [
      "Monthly time allocation",
      "Dedicated communication channel",
      "Priority turnaround",
      "No long-term commitment",
      "Monthly reporting",
    ],
    cta: "Get a quote",
    href: "/contact",
  },
];

export function PricingContent() {
  return (
    <>
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              Pricing
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Pick your model.
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-2xl leading-relaxed">
              Three ways to work with Core829. Project-based builds for defined scope, monthly
              retainer for ongoing development, and rentable apps for instant capability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((model, i) => (
              <ScrollReveal key={model.name} variant="fade-up" delay={i * 0.1}>
                <InteractiveCard className="h-full">
                  <div className="p-8 md:p-10 h-full flex flex-col bg-graphite border border-mist rounded-2xl">
                    <div className="flex-1">
                      <p className="text-sm text-signal/80 font-mono leading-relaxed">
                        {model.problem}
                      </p>
                      <h3 className="text-display text-2xl mt-6">{model.name}</h3>
                      <p className="mt-1 text-sm text-ink/40">{model.tagline}</p>
                      <p className="mt-4 text-sm text-ink/50 leading-relaxed">
                        {model.description}
                      </p>
                      <ul className="mt-8 space-y-3">
                        {model.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-sm text-ink/60"
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-signal" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-10">
                      <MagneticButton href={model.href} variant="primary">
                        {model.cta}
                      </MagneticButton>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-mist">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-6">
            <h2 className="text-display text-3xl md:text-4xl tracking-tight">
              Not sure which model fits?
            </h2>
            <p className="mt-4 text-ink/50 leading-relaxed">
              Every project is different. Tell us what you need and we&apos;ll recommend the right
              approach — no obligation, no sales pitch.
            </p>
            <div className="mt-8">
              <MagneticButton href="/contact" variant="ghost">
                Contact us
              </MagneticButton>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0">
            <div className="p-6 bg-graphite rounded-2xl border border-mist">
              <p className="text-sm font-mono uppercase tracking-wider text-ink/40">
                Quick links
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="/services" className="text-sm text-ink/60 hover:text-signal transition-colors">
                    View all services
                  </a>
                </li>
                <li>
                  <a href="/process" className="text-sm text-ink/60 hover:text-signal transition-colors">
                    How we work
                  </a>
                </li>
                <li>
                  <a href="/services/rent-webapps" className="text-sm text-ink/60 hover:text-signal transition-colors">
                    Browse rentable apps
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
