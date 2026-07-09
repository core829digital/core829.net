import type { Metadata } from "next";
import { ServicesGrid } from "./ServicesGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven capabilities. One partner. From custom web development and mobile apps to CRM creation and rentable tools.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              Services
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Seven capabilities.
              <br />
              <span className="text-signal">One partner.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-2xl leading-relaxed">
              Core829 runs the full digital stack your business needs. Pick the capability that
              matters now — or let us handle the whole thing.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <ServicesGrid />
      </section>
    </>
  );
}

