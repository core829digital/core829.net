"use client";

import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { InteractiveCard } from "@/components/motion/InteractiveCard";

const TEASER_APPS = [
  {
    name: "Booking System",
    problem: "Accept, manage, and track appointments without double-booking.",
    price: "€49",
  },
  {
    name: "Inventory Tracker",
    problem: "Know exactly what you have, where it is, and when to reorder.",
    price: "€39",
  },
  {
    name: "Invoice Tool",
    problem: "Create, send, and track invoices in minutes, not hours.",
    price: "€29",
  },
];

export function RentTeaser() {
  return (
    <section data-anim="rent-teaser" className="py-24">
      <div className="grid-12">
        <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-6">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
            Rent-a-WebApp
          </span>
          <h2 className="text-display text-4xl md:text-6xl tracking-tight mt-4">
            Software you use,
            <br />
            <span className="text-signal">not build.</span>
          </h2>
          <p className="mt-6 text-ink/60 text-lg max-w-md leading-relaxed">
            Pre-built tools for specific business problems. Licensed monthly, hosted and maintained by
            us. No development wait, no dev overhead, cancel anytime.
          </p>
          <div className="mt-8">
            <MagneticButton href="/services/rent-webapps" variant="primary">
              Browse all apps
            </MagneticButton>
          </div>
        </ScrollReveal>

        <div className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0 space-y-4">
          {TEASER_APPS.map((app, i) => (
            <ScrollReveal key={app.name} variant="fade-right" delay={i * 0.1}>
              <Link href="/services/rent-webapps" className="block">
                <InteractiveCard data-anim="rent-card" className="p-6 border border-mist hover:border-signal/20 hover:bg-ghost transition-colors" tiltAmount={5}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-display text-lg group-hover:text-signal transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-ink/50 mt-1">{app.problem}</p>
                    </div>
                    <span className="font-mono text-lg tabular-nums text-signal">{app.price}<span className="text-xs text-ink/60">/mo</span></span>
                  </div>
                </InteractiveCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

