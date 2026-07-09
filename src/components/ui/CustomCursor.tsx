"use client";

import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CursorState {
  variant: "default" | "link" | "view" | "drag";
  label: string | null;
}

const CursorContext = createContext<{
  setCursor: (variant: CursorState["variant"], label?: string | null) => void;
}>({
  setCursor: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CustomCursor({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<CursorState>({ variant: "default", label: null });
  const prefersReduced = useReducedMotion();
  const isFineRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setCursor = useCallback(
    (variant: CursorState["variant"], label?: string | null) => {
      stateRef.current = { variant, label: label ?? null };
      if (!ringRef.current || !dotRef.current) return;

      const configs: Record<string, gsap.TweenVars> = {
        default: { scale: 1, background: "transparent", borderColor: "rgba(250,250,250,0.2)" },
        link: { scale: 1.6, background: "rgba(225,6,0,0.12)", borderColor: "var(--color-signal)" },
        view: { scale: 2.4, background: "rgba(225,6,0,0.1)", borderColor: "var(--color-signal)" },
        drag: { scale: 2.0, background: "rgba(250,250,250,0.06)", borderColor: "var(--color-ink)" },
      };

      gsap.to(ringRef.current, {
        ...configs[variant],
        duration: 0.35,
        ease: "back.out(1.5)",
      });
      gsap.to(dotRef.current, {
        opacity: variant === "default" ? 1 : 0,
        duration: 0.2,
      });

      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: label ? 1 : 0,
          duration: 0.15,
          onStart: () => {
            if (labelRef.current && label) labelRef.current.textContent = label;
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    isFineRef.current = window.matchMedia("(pointer: fine)").matches;
    if (!isFineRef.current || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set(ring, { borderColor: "rgba(250,250,250,0.2)" });

    const dotX = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onPointerMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [prefersReduced]);

  if (!mounted) return <>{children}</>;

  const isFine = window.matchMedia("(pointer: fine)").matches;
  if (!isFine) {
    return <CursorContext.Provider value={{ setCursor }}>{children}</CursorContext.Provider>;
  }

  return (
    <CursorContext.Provider value={{ setCursor }}>
      {children}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[999] flex items-center justify-center"
        style={{
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(250,250,250,0.2)",
          backgroundColor: "transparent",
        }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-mono uppercase tracking-widest text-signal opacity-0"
        />
      </div>
    </CursorContext.Provider>
  );
}
