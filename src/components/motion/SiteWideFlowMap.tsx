"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const SITE_NODES = [
  { id: "home", label: "Home", x: 700, y: 80, href: "/" },
  { id: "services", label: "Services", x: 200, y: 200, href: "/services" },
  { id: "work", label: "Work", x: 1200, y: 200, href: "/work" },
  { id: "process", label: "Process", x: 100, y: 360, href: "/process" },
  { id: "usecases", label: "Use Cases", x: 500, y: 340, href: "/usecases" },
  { id: "about", label: "About", x: 900, y: 340, href: "/about" },
  { id: "pricing", label: "Pricing", x: 1300, y: 360, href: "/pricing" },
  { id: "contact", label: "Contact", x: 300, y: 500, href: "/contact" },
  { id: "work-with-us", label: "Careers", x: 700, y: 500, href: "/work-with-us" },
  { id: "rent-webapps", label: "Rent Apps", x: 1100, y: 500, href: "/services/rent-webapps" },
];

const CONNECTIONS = [
  { from: "home", to: "services" },
  { from: "home", to: "work" },
  { from: "services", to: "process" },
  { from: "services", to: "usecases" },
  { from: "work", to: "about" },
  { from: "process", to: "about" },
  { from: "usecases", to: "contact" },
  { from: "about", to: "pricing" },
  { from: "pricing", to: "contact" },
  { from: "contact", to: "work-with-us" },
  { from: "work", to: "rent-webapps" },
  { from: "services", to: "rent-webapps" },
  { from: "home", to: "about" },
  { from: "home", to: "contact" },
];

const COMET_PATH = CONNECTIONS.map((c) => {
  const from = SITE_NODES.find((n) => n.id === c.from);
  const to = SITE_NODES.find((n) => n.id === c.to);
  if (!from || !to) return "";
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 40;
  return `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`;
}).join(" ");

const particleDurations = CONNECTIONS.map(() => 4 + Math.random() * 3);
const orbitDurations = SITE_NODES.map(() => 12 + Math.random() * 8);

export function SiteWideFlowMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const prefersReduced = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNode = useCallback((id: string) => SITE_NODES.find((n) => n.id === id), []);

  useEffect(() => {
    if (prefersReduced || !cometRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        defaults: { ease: "power1.inOut" },
      });

      tl.to(cometRef.current, {
        motionPath: {
          path: COMET_PATH,
          align: COMET_PATH,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        duration: 1,
      });

      CONNECTIONS.forEach((conn) => {
        const lineEl = sectionRef.current?.querySelector(`[data-line="${conn.from}-${conn.to}"]`);
        if (!lineEl) return;

        gsap.fromTo(
          lineEl,
          { "--progress": 0 },
          {
            "--progress": 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
            duration: 1,
            ease: "none",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-graphite overflow-hidden"
    >
      <div className="sticky top-0 min-h-dvh flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 1450 620"
          className="w-full h-full max-w-[95vw] max-h-[95vh]"
          style={{ filter: prefersReduced ? "none" : undefined }}
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(225,6,0,0)" />
              <stop offset="50%" stopColor="rgba(225,6,0,0.3)" />
              <stop offset="100%" stopColor="rgba(225,6,0,0)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CONNECTIONS.map((conn, ci) => {
            const from = getNode(conn.from);
            const to = getNode(conn.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 40;
            return (
              <g key={`conn-${conn.from}-${conn.to}`}>
                <path
                  data-line={`${conn.from}-${conn.to}`}
                  d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                  fill="none"
                  stroke="rgba(250,250,250,0.06)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
                {!prefersReduced && (
                  <circle r="2.5" fill="var(--color-signal)" opacity="0.5">
                    <animateMotion
                      dur={`${particleDurations[ci]}s`}
                      repeatCount="indefinite"
                      path={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {!prefersReduced && SITE_NODES.map((node, oi) => (
            <circle key={`orbit-${node.id}`} cx={node.x} cy={node.y} r="55" fill="none" stroke="rgba(225,6,0,0.05)" strokeWidth="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${node.x} ${node.y}`}
                to={`360 ${node.x} ${node.y}`}
                dur={`${orbitDurations[oi]}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {!prefersReduced && SITE_NODES.map((node, i) => (
            <circle key={`pulse-${node.id}`} r="5" fill="var(--color-signal)" opacity="0.3">
              <animate
                attributeName="r"
                values="3;18;3"
                dur={`${2.5 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur={`${2.5 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
          ))}

          {!prefersReduced && (
            <>
              {[0, 1, 2].map((ring) => (
                <ellipse
                  key={`galaxy-${ring}`}
                  cx="700" cy="280"
                  rx={`${200 + ring * 120}`}
                  ry={`${80 + ring * 50}`}
                  fill="none"
                  stroke="rgba(225,6,0,0.04)"
                  strokeWidth="0.5"
                  transform={`rotate(${ring * 25} 700 280)`}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`${ring * 25} 700 280`}
                    to={`${ring * 25 + 360} 700 280`}
                    dur={`${30 + ring * 10}s`}
                    repeatCount="indefinite"
                  />
                </ellipse>
              ))}
              <circle cx="700" cy="280" r="1" fill="var(--color-signal)">
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path="M700,180 C800,180 800,380 700,380 C600,380 600,180 700,180"
                />
              </circle>
            </>
          )}

          <circle
            ref={cometRef}
            r="8"
            fill="var(--color-signal)"
            filter="url(#glow)"
            opacity={prefersReduced ? 0 : 1}
          >
            {prefersReduced && <animate attributeName="opacity" values="0;0" dur="1s" />}
          </circle>

          <circle cx="700" cy="280" r="60" fill="url(#nodeGlow)" opacity="0.4">
            {!prefersReduced && (
              <animate attributeName="r" values="50;75;50" dur="4s" repeatCount="indefinite" />
            )}
          </circle>

          {SITE_NODES.map((node) => (
            <g
              key={node.id}
              data-node={node.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              role="button"
              tabIndex={0}
              aria-label={`Go to ${node.label}`}
            >
              <rect
                x={node.x - 50}
                y={node.y - 18}
                width="100"
                height="36"
                rx="18"
                fill={hoveredNode === node.id ? "rgba(225,6,0,0.15)" : "rgba(250,250,250,0.04)"}
                stroke={hoveredNode === node.id ? "rgba(225,6,0,0.4)" : "rgba(250,250,250,0.1)"}
                strokeWidth="1"
              >
                {!prefersReduced && (
                  <animate
                    attributeName="stroke-opacity"
                    values="0.1;0.3;0.1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              <text
                x={node.x}
                y={node.y + 3}
                textAnchor="middle"
                fill={hoveredNode === node.id ? "var(--color-signal)" : "rgba(250,250,250,0.5)"}
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="2"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
            Site Map
          </span>
          <h2 className="text-display text-2xl md:text-4xl tracking-tight mt-2">
            The full <span className="text-signal">ecosystem.</span>
          </h2>
          <p className="text-xs text-ink/30 font-mono mt-2 tracking-wider animate-pulse-slow">
            Scroll to explore the journey
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center pointer-events-none">
          {SITE_NODES.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className="pointer-events-auto text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/5 text-ink/30 hover:text-signal hover:border-signal/30 transition-all duration-300"
              style={{
                opacity: hoveredNode === null || hoveredNode === node.id ? 1 : 0.4,
              }}
            >
              {node.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
