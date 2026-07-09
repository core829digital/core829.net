"use client";

import { useRef, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageTransitionLayer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    if (prefersReduced) {
      gsap.set(main, { opacity: 1, clipPath: "inset(0 0% 0 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(main, { opacity: 0, clipPath: "inset(0 0% 0 0%)" });
      gsap.fromTo(
        main,
        { opacity: 0, clipPath: "inset(0 5% 0 5%)" },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0%)",
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, main);

    return () => ctx.revert();
  }, [pathname, prefersReduced]);

  return (
    <div ref={mainRef}>
      {children}
    </div>
  );
}
