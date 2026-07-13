"use client";

import Link from "next/link";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";

const USE_CASES = [
  {
    industry: "E-commerce & Marketplaces",
    description: "Custom storefronts, auction platforms, booking systems, and inventory management that go beyond generic Shopify/WooCommerce templates.",
    services: ["rent-webapps", "web-design", "app-development"],
  },
  {
    industry: "Manufacturing & Joinery",
    description: "Trilingual corporate sites, product configurators with instant pricing, dealer management portals, and quote-to-order pipelines.",
    services: ["web-design", "app-development", "executable-software", "ai-automation"],
  },
  {
    industry: "Home Renovation & Construction",
    description: "End-to-end project management platforms connecting clients, suppliers, and on-site teams with payment verification and automated workflows.",
    services: ["app-development", "workflow-automation", "ai-automation"],
  },
  {
    industry: "Professional Services",
    description: "Custom CRM systems, client portals, proposal generators, and internal automation tools that match how your firm actually operates.",
    services: ["crm", "social-media", "ai-automation"],
  },
  {
    industry: "SaaS & Digital Products",
    description: "Full-stack web applications with subscription billing, user dashboards, AI features, and scaling infrastructure from MVP to production.",
    services: ["app-development", "web-design", "rent-webapps"],
  },
  {
    industry: "Automotive & Mobility",
    description: "Inventory trackers for automotive parts, booking schedulers for service centers, and customer retention portals.",
    services: ["app-development", "executable-software", "rent-webapps"],
  },
  {
    industry: "Real Estate & Property",
    description: "Property listing platforms, virtual tour integrations, client inquiry management, and automated follow-up pipelines.",
    services: ["web-design", "app-development", "crm"],
  },
  {
    industry: "Hospitality & Events",
    description: "Booking engines, event scheduling tools, review aggregators, and multi-language guest experience sites.",
    services: ["rent-webapps", "web-design"],
  },
];

const USECASES_FLOW = [
  { id: "listen", label: "Listen", duration: "1 call", deliverable: "Industry & pain point analysis" },
  { id: "map", label: "Map", duration: "1-2 days", deliverable: "Solution architecture matched to use case" },
  { id: "build", label: "Build", duration: "2-10 weeks", deliverable: "Tailored system in staging" },
  { id: "deploy", label: "Deploy", duration: "1-2 days", deliverable: "Live system with training" },
  { id: "optimize", label: "Optimize", duration: "Ongoing", deliverable: "Iteration based on real usage" },
];

const SERVICE_LABELS: Record<string, string> = {
  "rent-webapps": "Rent-a-WebApp",
  "web-design": "Web Design",
  "app-development": "App Development",
  "executable-software": "Executable Software",
  "social-media": "Social Media",
  "crm": "CRM",
  "workflow-automation": "Automation",
  "ai-automation": "AI Automation",
};

export default function UseCasesClient() {
  return (
    <>
      <InfiniteLoopBackground variant="grid" />
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Applications</span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Use cases.
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
              Our services apply across industries. Whether you run a manufacturing floor, a
              professional services firm, or a digital marketplace — the same stack adapts.
            </p>
          </div>
        </div>
      </section>

      <ProcessFlow
        stages={USECASES_FLOW}
        title="Every industry gets"
        subtitle="the same rigour."
        badge="Our approach"
      />

      <section className="section-padding pt-0">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.industry} className="bg-graphite rounded-2xl border border-mist p-8 md:p-10">
                <h2 className="text-display text-xl md:text-2xl tracking-tight">{uc.industry}</h2>
                <p className="mt-4 text-ink/60 text-sm leading-relaxed">{uc.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {uc.services.map((s) => (
                    <Link
                      key={s}
                      href={`/services/${s}`}
                      className="text-xs font-mono uppercase tracking-wider text-ink/40 px-3 py-1 bg-white/5 rounded-full hover:text-signal transition-colors"
                    >
                      {SERVICE_LABELS[s] || s}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <h2 className="text-display text-3xl md:text-5xl tracking-tight">
              Not sure where you fit?
            </h2>
            <p className="mt-4 text-ink/60 max-w-md mx-auto leading-relaxed">
              Tell us about your business and we&apos;ll map the right service model — project,
              retainer, or rentable app.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-signal text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-signal-dim transition-colors"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
