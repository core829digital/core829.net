"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface InfiniteLoopBackgroundProps {
  variant?: "dots" | "grid" | "wave" | "pulse" | "orbits";
  density?: "low" | "medium" | "high";
}

export function InfiniteLoopBackground({ variant = "dots", density = "medium" }: InfiniteLoopBackgroundProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  const count = density === "low" ? 3 : density === "high" ? 8 : 5;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: 10 + (i * 140) % 90,
    cy: 10 + (i * 97) % 90,
    r: 1 + (i % 3),
    delay: i * 0.7,
    dur: 3 + (i % 3) * 2,
  }));

  if (variant === "orbits") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full opacity-[0.03]">
          {[1, 2, 3].map((ring) => (
            <g key={ring}>
              <ellipse
                cx="50%" cy="50%"
                rx={`${15 * ring}%`} ry={`${10 * ring}%`}
                fill="none" stroke="var(--color-signal)"
                strokeWidth="0.5"
                transform={`rotate(${ring * 30} 50% 50%)`}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`${ring * 30} 50% 50%`}
                  to={`${ring * 30 + 360} 50% 50%`}
                  dur={`${20 + ring * 10}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
              <circle r="2" fill="var(--color-signal)">
                <animateMotion
                  dur={`${20 + ring * 10}s`}
                  repeatCount="indefinite"
                  path={`M${50 + 15 * ring * Math.cos(ring * 0.5)},${50 + 10 * ring * Math.sin(ring * 0.5)} A${15 * ring} ${10 * ring} 0 1 1 ${50 + 15 * ring * Math.cos(ring * 0.5 + 0.01)},${50 + 10 * ring * Math.sin(ring * 0.5 + 0.01)}`}
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full opacity-[0.04]" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50" fill="none" stroke="var(--color-signal)" strokeWidth="1">
            <animate
              attributeName="d"
              values="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50;M0,50 Q25,70 50,50 T100,50 T150,50 T200,50;M0,50 Q25,30 50,50 T100,50 T150,50 T200,50"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M0,60 Q25,40 50,60 T100,60 T150,60 T200,60" fill="none" stroke="var(--color-signal)" strokeWidth="0.5" opacity="0.5">
            <animate
              attributeName="d"
              values="M0,60 Q25,40 50,60 T100,60 T150,60 T200,60;M0,60 Q25,80 50,60 T100,60 T150,60 T200,60;M0,60 Q25,40 50,60 T100,60 T150,60 T200,60"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full opacity-[0.03]">
          <circle cx="20%" cy="30%" r="0" fill="none" stroke="var(--color-signal)" strokeWidth="1">
            <animate attributeName="r" values="0;200" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="70%" r="0" fill="none" stroke="var(--color-signal)" strokeWidth="1">
            <animate attributeName="r" values="0;150" dur="4s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0.5;0" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="50%" cy="50%" r="0" fill="none" stroke="var(--color-signal)" strokeWidth="0.5">
            <animate attributeName="r" values="0;300" dur="7s" repeatCount="indefinite" begin="2s" />
            <animate attributeName="opacity" values="0.3;0" dur="7s" repeatCount="indefinite" begin="2s" />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg className="w-full h-full opacity-[0.03]">
        {particles.map((p) => (
          <g key={p.id}>
            <circle cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="var(--color-signal)">
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
              />
            </circle>
          </g>
        ))}
        {Array.from({ length: 2 }, (_, i) => (
          <g key={`orbit-${i}`}>
            <circle
              cx={`${30 + i * 40}%`}
              cy="50%"
              r="2"
              fill="var(--color-signal)"
            >
              <animateMotion
                dur={`${8 + i * 3}s`}
                repeatCount="indefinite"
                path={`M${30 + i * 40},50 C${40 + i * 30},30 ${60 + i * 20},30 ${70 + i * 10},50 C${60 + i * 20},70 ${40 + i * 30},70 ${30 + i * 40},50`}
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
