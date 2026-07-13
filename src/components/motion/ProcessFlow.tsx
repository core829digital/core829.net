"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface FlowStage {
  id: string;
  label: string;
  duration: string;
  deliverable: string;
  description?: string;
}

interface ProcessFlowProps {
  stages: FlowStage[];
  title: string;
  subtitle: string;
  badge?: string;
}

export function ProcessFlow({ stages, title, subtitle, badge = "How it flows" }: ProcessFlowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const spacing = Math.max(120, Math.min(200, 1400 / stages.length));
  const totalWidth = stages.length * spacing;
  const viewBoxWidth = Math.max(totalWidth + 200, 900);
  const centerY = 200;
  const nodes = stages.map((s, i) => ({
    id: s.id,
    x: 100 + i * spacing + spacing / 2,
    y: i % 2 === 0 ? centerY - 60 : centerY + 60,
  }));
  const edges = nodes.slice(0, -1).map((n, i) => ({ from: n.id, to: nodes[i + 1].id }));

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] overflow-hidden">
      <div
        className="sticky top-0 min-h-dvh bg-graphite text-ink flex items-center justify-center"
        style={{ perspective: prefersReduced ? "none" : "1200px" }}
      >
        <svg
          viewBox={`0 0 ${viewBoxWidth} 400`}
          className="w-full h-full max-w-[95vw]"
          style={{ filter: prefersReduced ? "none" : undefined }}
        >
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {edges.map((edge) => {
            const from = nodes.find((n) => n.id === edge.from);
            const to = nodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="rgba(250,250,250,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {!prefersReduced && edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from);
            const to = nodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <circle key={`orbit-${i}`} r="3" fill="var(--color-signal)" opacity="0.6">
                <animateMotion
                  dur={`${3 + i * 0.8}s`}
                  repeatCount="indefinite"
                  path={`M${from.x},${from.y} L${to.x},${to.y}`}
                />
              </circle>
            );
          })}

          {!prefersReduced && (
            <>
              {nodes.map((node) => (
                <circle key={`pulse-${node.id}`} r="4" fill="var(--color-signal)" opacity="0.4">
                  <animate
                    attributeName="r"
                    values="4;12;4"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${nodes.indexOf(node) * 0.3}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${nodes.indexOf(node) * 0.3}s`}
                  />
                </circle>
              ))}
              {nodes.map((node) => (
                <circle key={`glow-${node.id}`} cx={node.x} cy={node.y} r="30" fill="url(#node-glow)">
                  <animate
                    attributeName="r"
                    values="20;35;20"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${nodes.indexOf(node) * 0.4}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${nodes.indexOf(node) * 0.4}s`}
                  />
                </circle>
              ))}
            </>
          )}

          {nodes.map((node) => {
            const info = stages.find((s) => s.id === node.id);
            return (
              <g
                key={node.id}
                data-node={node.id}
                className="flow-node cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                role="button"
                tabIndex={0}
                aria-label={`${node.id.toUpperCase()} ${info?.duration} — ${info?.label}: ${info?.deliverable}`}
              >
                <circle cx={node.x} cy={node.y} r="18" fill="transparent" stroke="rgba(250,250,250,0.15)" strokeWidth="1" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" fill="rgba(250,250,250,0.5)" fontSize="9" fontFamily="var(--font-mono)">
                  {node.id.toUpperCase()}
                </text>
                <text x={node.x} y={node.y + 42} textAnchor="middle" fill="rgba(250,250,250,0.25)" fontSize="8" fontFamily="var(--font-mono)">
                  {info?.duration}
                </text>
                {hoveredNode === node.id && info && (
                  <g>
                    <rect x={node.x - 70} y={node.y - 55} width="140" height="28" rx="4" fill="rgba(225,6,0,0.9)" />
                    <text x={node.x} y={node.y - 37} textAnchor="middle" fill="white" fontSize="8" fontFamily="var(--font-body)">
                      {info.deliverable}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {!prefersReduced && (
            <text x={viewBoxWidth / 2} y={370} textAnchor="middle" fill="rgba(250,250,250,0.08)" fontSize="10" fontFamily="var(--font-mono)">
              <animate attributeName="opacity" values="0.08;0.3;0.08" dur="4s" repeatCount="indefinite" />
              &lt; scroll to navigate /&gt;
            </text>
          )}
        </svg>

        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">{badge}</span>
          <h2 className="text-display text-2xl md:text-4xl tracking-tight mt-3 leading-tight">
            {title}
            <br />
            <span className="text-signal">{subtitle}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
