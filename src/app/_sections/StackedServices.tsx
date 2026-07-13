"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/brand";
import { InteractiveCard } from "@/components/motion/InteractiveCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function ServiceDiagram({ id }: { id: string }) {
  const size = 120;
  switch (id) {
    case "rent-webapps":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><rect x="10" y="20" width="60" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /><rect x="20" y="30" width="40" height="6" rx="2" fill="currentColor" opacity="0.2" /><rect x="20" y="42" width="30" height="4" rx="1" fill="currentColor" opacity="0.3" /><rect x="20" y="52" width="35" height="4" rx="1" fill="currentColor" opacity="0.3" /><line x1="70" y1="60" x2="90" y2="60" stroke="var(--color-signal)" strokeWidth="1.5" strokeDasharray="4 2"><animate attributeName="strokeDashoffset" values="0;-12" dur="1s" repeatCount="indefinite" /></line><rect x="90" y="35" width="25" height="50" rx="4" fill="none" stroke="var(--color-signal)" strokeWidth="1" /><text x="102" y="65" textAnchor="middle" fontSize="10" fill="var(--color-signal)">€</text></svg>);
    case "web-design":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><rect x="15" y="25" width="50" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" /><rect x="55" y="25" width="50" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /><line x1="15" y1="45" x2="55" y2="45" stroke="var(--color-signal)" strokeWidth="1.5" strokeDasharray="4 2"><animate attributeName="strokeDashoffset" values="0;-12" dur="1.5s" repeatCount="indefinite" /></line><line x1="55" y1="50" x2="105" y2="50" stroke="var(--color-signal)" strokeWidth="1.5" strokeDasharray="4 2"><animate attributeName="strokeDashoffset" values="0;-12" dur="1.5s" repeatCount="indefinite" /></line></svg>);
    case "app-development":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><rect x="10" y="10" width="45" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="1" /><rect x="65" y="10" width="45" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /><path d="M40 100 L60 40 L80 100" fill="none" stroke="var(--color-signal)" strokeWidth="1.5"><animate attributeName="strokeDashoffset" values="120;0" dur="2s" repeatCount="indefinite" /></path><circle cx="60" cy="30" r="4" fill="var(--color-signal)" opacity="0.5" /></svg>);
    case "executable-software":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><rect x="15" y="15" width="90" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /><rect x="15" y="15" width="90" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="30" cy="25" r="3" fill="var(--color-signal)" opacity="0.5" /><circle cx="40" cy="25" r="3" fill="currentColor" opacity="0.3" /><circle cx="50" cy="25" r="3" fill="currentColor" opacity="0.3" /><rect x="25" y="45" width="70" height="6" rx="2" fill="var(--color-signal)" opacity="0.3"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" /></rect><rect x="25" y="55" width="50" height="4" rx="1" fill="currentColor" opacity="0.2" /></svg>);
    case "social-media":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><rect x="10" y="15" width="25" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin="0s" /></rect><rect x="47" y="15" width="25" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin="0.3s" /></rect><rect x="84" y="15" width="25" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin="0.6s" /></rect><path d="M22 50 L60 70 L97 50" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" /><rect x="40" y="65" width="40" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" /></svg>);
    case "crm":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><circle cx="25" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="60" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="60" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="95" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1" /><line x1="37" y1="60" x2="48" y2="30" stroke="var(--color-signal)" strokeWidth="1" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" /></line><line x1="37" y1="60" x2="48" y2="90" stroke="var(--color-signal)" strokeWidth="1" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.5s" repeatCount="indefinite" /></line><line x1="72" y1="30" x2="83" y2="60" stroke="var(--color-signal)" strokeWidth="1" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.25s" repeatCount="indefinite" /></line><line x1="72" y1="90" x2="83" y2="60" stroke="var(--color-signal)" strokeWidth="1" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.75s" repeatCount="indefinite" /></line></svg>);
    case "ai-automation":
      return (<svg width={size} height={size} viewBox="0 0 120 120"><circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" /><circle cx="90" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" /><circle cx="30" cy="90" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" /><circle cx="90" cy="90" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" /><circle cx="60" cy="60" r="18" fill="none" stroke="var(--color-signal)" strokeWidth="1.5"><animate attributeName="r" values="16;20;16" dur="3s" repeatCount="indefinite" /></circle><circle cx="60" cy="60" r="4" fill="var(--color-signal)" opacity="0.6" /><animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" /><line x1="38" y1="38" x2="42" y2="42" stroke="var(--color-signal)" strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="2s" begin="0s" repeatCount="indefinite" /></line><line x1="82" y1="38" x2="78" y2="42" stroke="var(--color-signal)" strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="2s" begin="0.5s" repeatCount="indefinite" /></line><line x1="38" y1="82" x2="42" y2="78" stroke="var(--color-signal)" strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="2s" begin="1s" repeatCount="indefinite" /></line><line x1="82" y1="82" x2="78" y2="78" stroke="var(--color-signal)" strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="2s" begin="1.5s" repeatCount="indefinite" /></line></svg>);
    default: return null;
  }
}

export function StackedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".service-card");

    const sts: ScrollTrigger[] = [];

    cards.forEach((card) => {
      const numeral = card.querySelector(".service-numeral") as HTMLElement;
      if (!numeral) return;

      const st = ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "center center",
        onUpdate: (self) => {
          const r = Math.min(1, self.progress * 2);
          if (r > 0.5) {
            const c = Math.min(1, (r - 0.5) * 2);
            numeral.style.color = `rgba(225, 6, 0, ${c})`;
            numeral.style.setProperty("-webkit-text-stroke", "0px transparent");
            numeral.style.setProperty("-webkit-text-fill-color", `rgba(225, 6, 0, ${c})`);
            numeral.style.setProperty("text-stroke", "0px transparent");
          } else {
            numeral.style.color = "currentColor";
            numeral.style.setProperty("-webkit-text-stroke", "1px currentColor");
            numeral.style.setProperty("-webkit-text-fill-color", "transparent");
            numeral.style.setProperty("text-stroke", "1px currentColor");
          }
        },
      });
      sts.push(st);
    });

    return () => {
      sts.forEach((st) => st.kill());
    };
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="pt-20 pb-10">
        <div className="grid-12 mb-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">What we actually do</span>
            <h2 className="text-display text-3xl md:text-6xl tracking-tight mt-3">Seven capabilities.<br />One partner.</h2>
          </div>
        </div>
      </div>
      {SERVICES.map((service) => (
        <Link key={service.id} href={`/services/${service.slug}`} data-anim="service-card" data-card-border className="block service-card min-h-[70dvh] border-b border-mist">
          <InteractiveCard className="h-full flex items-center" tiltAmount={3} glare={false}>
            <div className="grid-12 items-center py-16">
              <div className="col-span-12 md:col-span-1">
                <span data-numeral className="service-numeral font-mono text-7xl md:text-9xl font-bold leading-none"
                  style={{ color: "currentColor", WebkitTextStroke: "1px currentColor", WebkitTextFillColor: "transparent" }}>
                  {service.numeral}
                </span>
              </div>
              <div data-card-content className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                <h3 className="text-display text-3xl md:text-5xl tracking-tight">{service.name}</h3>
                <p className="mt-6 text-ink/60 leading-relaxed max-w-lg">{service.description}</p>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-8 mt-8 md:mt-0">
                <div className="w-full aspect-square max-w-[200px] mx-auto text-ink/50">
                  <ServiceDiagram id={service.id} />
                </div>
              </div>
            </div>
          </InteractiveCard>
        </Link>
      ))}
    </section>
  );
}

