"use client";

import { SERVICES } from "@/lib/brand";
import { MarqueeTrack } from "@/components/motion/MarqueeTrack";
import Link from "next/link";

export function CapabilityStrip() {
  return (
    <section className="py-12 border-b border-mist">
      <div className="mb-6 px-6">
        <span className="font-mono text-[10px] text-ink/60 tracking-[0.2em] uppercase">
          Everything you need
        </span>
      </div>
      <MarqueeTrack speed={0.3}>
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex items-center gap-4 px-6 py-3 border border-mist rounded-full hover:border-signal/30 transition-colors"
          >
            <span className="font-mono text-signal text-xs">{service.numeral}</span>
            <span className="text-sm font-medium whitespace-nowrap">{service.name}</span>
            <span className="text-xs text-ink/60 group-hover:text-signal transition-colors">
              {service.tagline}
            </span>
          </Link>
        ))}
      </MarqueeTrack>
    </section>
  );
}

