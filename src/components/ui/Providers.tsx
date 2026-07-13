"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { initSmoothScroll, destroySmoothScroll } from "@/lib/smooth-scroll";
import { registerEasing } from "@/lib/easing";
import { CustomCursor } from "./CustomCursor";
import { PageTransitionLayer } from "../motion/PageTransitionLayer";
import { ErrorBoundary } from "./ErrorBoundary";

gsap.registerPlugin(ScrollTrigger, CustomEase, MotionPathPlugin, Draggable);

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function GlobalSystems({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<ReturnType<typeof initSmoothScroll> | null>(null);

  useEffect(() => {
    registerEasing();
    lenisRef.current = initSmoothScroll();
    return () => {
      destroySmoothScroll(lenisRef.current);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh(true);
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.destroy();
      lenisRef.current = initSmoothScroll();
    }
  }, [pathname]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ErrorBoundary>
        <CustomCursor>
          <GlobalSystems>
            <PageTransitionLayer>{children}</PageTransitionLayer>
          </GlobalSystems>
        </CustomCursor>
      </ErrorBoundary>
    </ConvexProvider>
  );
}
