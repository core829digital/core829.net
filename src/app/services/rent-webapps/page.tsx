"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { InteractiveCard } from "@/components/motion/InteractiveCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DEMO_MAP } from "./DemoPreviews";

const APPS = [
  {
    id: "booking-system",
    name: "Booking System",
    category: "Sales",
    tagline: "Accept, manage, and track appointments without double-booking.",
    price: 49,
    features: [
      "Calendar sync (Google/Outlook)",
      "Automated reminders",
      "Client management",
      "Payment processing",
      "Analytics dashboard",
    ],
    description:
      "A full-featured booking and appointment management system. Handle scheduling, reminders, payments, and client history from one interface. Your clients book online, your calendar stays synced, and no-shows drop with automated reminders.",
  },
  {
    id: "inventory-tracker",
    name: "Inventory Tracker",
    category: "Operations",
    tagline: "Know exactly what you have, where it is, and when to reorder.",
    price: 39,
    features: [
      "Real-time stock levels",
      "Low-stock alerts",
      "Supplier management",
      "Barcode/QR scanning",
      "Purchase order generation",
    ],
    description:
      "Track inventory across multiple locations with real-time updates. Set reorder thresholds, generate purchase orders automatically, and scan items in and out with any device.",
  },
  {
    id: "invoice-tool",
    name: "Invoice Tool",
    category: "Finance",
    tagline: "Create, send, and track invoices in minutes, not hours.",
    price: 29,
    features: [
      "Customizable invoice templates",
      "Recurring invoices",
      "Payment tracking",
      "Multi-currency support",
      "Expense reports",
    ],
    description:
      "Professional invoicing without the complexity of full accounting software. Create branded invoices, set up recurring billing, track payments, and generate expense reports.",
  },
  {
    id: "review-aggregator",
    name: "Review Aggregator",
    category: "Sales",
    tagline: "Collect, manage, and showcase customer reviews from every platform.",
    price: 34,
    features: [
      "Multi-platform review collection",
      "Auto-response templates",
      "Review widget for your site",
      "Sentiment analysis",
      "Competitor monitoring",
    ],
    description:
      "Aggregate reviews from Google, Facebook, Trustpilot, and more into one dashboard. Respond from one place, display your best reviews on your site, and track sentiment over time.",
  },
  {
    id: "lead-capture-kit",
    name: "Lead Capture Kit",
    category: "Sales",
    tagline: "Landing pages + forms + follow-ups, packaged and ready.",
    price: 44,
    features: [
      "Drag-and-drop page builder",
      "A/B testing variants",
      "Email auto-responder",
      "CRM integration",
      "Conversion analytics",
    ],
    description:
      "A complete lead generation system. Build landing pages without a developer, set up automated follow-up sequences, and pipe leads directly into your CRM or spreadsheet.",
  },
  {
    id: "crm-lite",
    name: "CRM Lite",
    category: "Customer",
    tagline: "Simple, opinionated CRM for small teams that hate CRM software.",
    price: 59,
    features: [
      "Pipeline management",
      "Contact history",
      "Task automation",
      "Email integration",
      "Team collaboration",
    ],
    description:
      "A CRM that doesn't force you to work differently. Track deals, log interactions, automate follow-ups, and see your pipeline at a glance. Built for teams that outgrew spreadsheets but don't need Salesforce.",
  },
  {
    id: "landing-page-kit",
    name: "Landing Page Kit",
    category: "Operations",
    tagline: "High-converting landing pages — set up in hours, not weeks.",
    price: 24,
    features: [
      "Professional templates",
      "SEO-optimized structure",
      "Form integrations",
      "Analytics built-in",
      "One-click publishing",
    ],
    description:
      "Launch landing pages fast with pre-built, conversion-optimized templates. Built-in SEO, analytics, and form handling — no design or development skills needed.",
  },
];

const FILTERS = ["All", "Operations", "Sales", "Finance", "Customer"];

export default function RentWebAppsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState<(typeof APPS)[0] | null>(null);

  const filtered = activeFilter === "All" ? APPS : APPS.filter((a) => a.category === activeFilter);

  return (
    <>
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              Rent-a-WebApp
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Software you use,
              <br />
              <span className="text-signal">not build.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-2xl leading-relaxed">
              Pre-built tools solving specific business problems. Licensed monthly, with hosting,
              updates, and support included. No development wait, no technical overhead.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="px-6 max-w-[1440px] mx-auto">
          {}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-mono tracking-wider uppercase border transition-colors whitespace-nowrap ${
                  activeFilter === f
                    ? "bg-signal text-ink border-signal"
                    : "border-mist text-ink/50 hover:border-ink/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((app, i) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <ScrollReveal variant="fade-up" delay={i * 0.04} start="top 90%">
                    <InteractiveCard
                      onClick={() => setSelectedApp(app)}
                      className="p-8 border border-mist hover:border-signal/20 hover:bg-white/5 transition-colors h-full w-full text-left"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="font-mono text-xs text-ink/60 uppercase tracking-wider">
                          {app.category}
                        </span>
                        <span className="font-mono text-lg text-signal tabular-nums">
                          €{app.price}<span className="text-xs text-ink/60">/mo</span>
                        </span>
                      </div>
                      <h3 className="text-display text-xl group-hover:text-signal transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-ink/60 mt-2 leading-relaxed">{app.tagline}</p>
                      <div className="mt-6 w-full h-32 bg-graphite rounded-lg p-2.5 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {(() => {
                          const Demo = DEMO_MAP[app.id];
                          return Demo ? <Demo /> : <span className="text-ink/30 text-xs font-mono">demo</span>;
                        })()}
                      </div>
                    </InteractiveCard>
                  </ScrollReveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-ink/60 font-mono text-sm py-20">
              No apps in this category yet.
            </p>
          )}
        </div>
      </section>

      {}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedApp(null)}
            />
            <motion.div
              layoutId={`app-${selectedApp.id}`}
              className="relative bg-graphite rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
            >
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-mist hover:bg-white/5"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>

              <span className="font-mono text-xs text-ink/60 uppercase tracking-wider">
                {selectedApp.category}
              </span>
              <h2 className="text-display text-3xl md:text-4xl tracking-tight mt-2">
                {selectedApp.name}
              </h2>
              <p className="mt-4 text-ink/60 leading-relaxed">{selectedApp.description}</p>

              <div className="mt-8">
                <span className="font-mono text-4xl text-signal tabular-nums">
                  €{selectedApp.price}
                  <span className="text-base text-ink/60">/month</span>
                </span>
                <p className="text-xs text-ink/40 mt-1">Hosting, updates, and support included</p>
              </div>

              <div className="mt-8">
                <h4 className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-4">
                  Features
                </h4>
                <ul className="space-y-3">
                  {selectedApp.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <MagneticButton href="/contact" variant="primary">
                  Request this app
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





