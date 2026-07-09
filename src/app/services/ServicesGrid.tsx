"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/brand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { InteractiveCard } from "@/components/motion/InteractiveCard";

export function ServicesGrid() {
  return (
    <div className="grid-12 gap-y-12">
      {SERVICES.map((service, i) => (
        <ScrollReveal key={service.id} variant="fade-up" delay={i * 0.06} className="col-span-12 md:col-span-4">
          <Link href={`/services/${service.slug}`} className="block h-full">
            <InteractiveCard className="p-8 border border-mist hover:border-signal/20 hover:bg-white/5 transition-colors h-full">
              <span className="font-mono text-signal text-lg">{service.numeral}</span>
              <h2 className="text-display text-2xl mt-4 group-hover:text-signal transition-colors">
                {service.name}
              </h2>
              <p className="text-sm text-ink/60 mt-3 leading-relaxed">{service.tagline}</p>
              <p className="text-sm text-ink/40 mt-4 leading-relaxed line-clamp-3">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-signal mt-6 uppercase tracking-wider group-hover:gap-3 transition-all">
                Learn more →
              </span>
            </InteractiveCard>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
