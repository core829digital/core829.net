"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STAGE_INFO: Record<string, { label: string; duration: string; deliverable: string }> = {
  intake: { label: "Intake", duration: "1-2 days", deliverable: "Discovery brief & fit assessment" },
  scope: { label: "Scope & Architecture", duration: "3-7 days", deliverable: "Scope document with fixed-cost quote" },
  design: { label: "Design", duration: "5-14 days", deliverable: "Interactive browser-based prototype" },
  build: { label: "Build", duration: "Varies by scope", deliverable: "Staging environment with live updates" },
  qa: { label: "QA & Testing", duration: "3-5 days", deliverable: "Test report & security review" },
  launch: { label: "Launch", duration: "1-2 days", deliverable: "Production deployment & handover" },
  support: { label: "Rent / Retainer", duration: "Ongoing", deliverable: "Hosting, updates & support channel" },
};

const NODES = [
  { id: "intake", x: 100, y: 250 },
  { id: "scope", x: 280, y: 150 },
  { id: "design", x: 460, y: 250 },
  { id: "build", x: 640, y: 150 },
  { id: "qa", x: 820, y: 250 },
  { id: "launch", x: 1000, y: 150 },
  { id: "support", x: 1180, y: 250 },
];

const EDGES = [
  { from: "intake", to: "scope" },
  { from: "scope", to: "design" },
  { from: "design", to: "build" },
  { from: "build", to: "qa" },
  { from: "qa", to: "launch" },
  { from: "launch", to: "support" },
];

export function FlowMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const totalLength = EDGES.length;
      const progress = { value: 0 };

      gsap.to(progress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: () => {
            const activeIndex = Math.min(Math.floor(progress.value * totalLength), totalLength - 1);
            NODES.forEach((node, i) => {
              const nodeEl = section.querySelector(`[data-node="${node.id}"]`);
              if (nodeEl) {
                nodeEl.classList.toggle("node-active", i <= activeIndex + 1);
              }
            });
            const particles = section.querySelectorAll(".progress-particle");
            if (particles.length >= 2) {
              const edgeIndex = Math.min(Math.floor(progress.value * totalLength), totalLength - 1);
              const edgeProgress = (progress.value * totalLength) - edgeIndex;
              if (edgeIndex < EDGES.length) {
                const from = NODES.find((n) => n.id === EDGES[edgeIndex].from);
                const to = NODES.find((n) => n.id === EDGES[edgeIndex].to);
                if (from && to) {
                  const x = from.x + (to.x - from.x) * edgeProgress;
                  const y = from.y + (to.y - from.y) * edgeProgress;
                  gsap.set(particles, { attr: { cx: x, cy: y } });
                }
              }
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} data-anim="flowmap" className="relative min-h-[300vh]">
      <div className="sticky top-0 min-h-dvh bg-graphite text-ink overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 1300 400" className="w-full h-full max-w-[90vw]" style={{ filter: prefersReduced ? "none" : undefined }}>
          {EDGES.map((edge) => {
            const from = NODES.find((n) => n.id === edge.from);
            const to = NODES.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(250,250,250,0.1)" strokeWidth="1" />;
          })}
          {!prefersReduced && EDGES.map((edge, i) => {
            const from = NODES.find((n) => n.id === edge.from);
            const to = NODES.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <circle key={`particle-${i}`} r="2" fill="var(--color-signal)">
                <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" path={`M${from.x},${from.y} L${to.x},${to.y}`} />
              </circle>
            );
          })}
          <circle className="progress-particle" r="6" fill="var(--color-signal)" opacity="0.8" />
          <circle className="progress-particle" r="12" fill="var(--color-signal)" opacity="0.2" />
          {NODES.map((node) => {
            const info = STAGE_INFO[node.id];
            return (
              <g key={node.id} data-node={node.id} className="flow-node cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                role="button" tabIndex={0}
                aria-label={`${node.id.toUpperCase()} ${info?.duration} — ${info?.label}: ${info?.deliverable}`}>
                <circle cx={node.x} cy={node.y} r="16" fill="transparent" stroke="rgba(250,250,250,0.2)" strokeWidth="1" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" fill="rgba(250,250,250,0.6)" fontSize="10" fontFamily="var(--font-mono)">{node.id.toUpperCase()}</text>
                <text x={node.x} y={node.y + 40} textAnchor="middle" fill="rgba(250,250,250,0.3)" fontSize="8" fontFamily="var(--font-mono)">{info?.duration}</text>
                {hoveredNode === node.id && (
                  <g>
                    <rect x={node.x - 60} y={node.y - 50} width="120" height="30" rx="4" fill="rgba(225,6,0,0.9)" />
                    <text x={node.x} y={node.y - 32} textAnchor="middle" fill="white" fontSize="8" fontFamily="var(--font-body)">{info?.deliverable}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">How it flows</span>
          <h2 className="text-display text-3xl md:text-5xl tracking-tight mt-4">From idea to<br /><span className="text-signal">running system.</span></h2>
        </div>
      </div>
    </section>
  );
}
