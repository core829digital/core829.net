"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/brand";
import { MagneticButton } from "../motion/MagneticButton";
import { getSessionToken } from "@/lib/cookie";
import { shouldSimplifyAnimations } from "@/lib/deviceCapability";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Services", href: "/services", hasMega: true },
  { label: "Work", href: "/work" },
  { label: "Use Cases", href: "/usecases" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = getSessionToken();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token && token.length >= 32) setAuthed(true);
    setLoading(false);
  }, []);
  return { authed, loading };
}

export function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authed, loading } = useAuth();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (shouldSimplifyAnimations()) return;
    const nav = navRef.current;
    if (!nav) return;

    const st = ScrollTrigger.create({
      start: "top -80px",
      end: "bottom -80px",
      onToggle: (self) => {
        if (self.isActive) {
          nav.classList.add("nav-solid");
        } else {
          nav.classList.remove("nav-solid");
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-3 px-3 sm:px-4 transition-all duration-300"
      >
        <style>{`
          .nav-solid .nav-glass {
            background: rgba(10, 10, 10, 0.85) !important;
            border-color: rgba(42, 42, 42, 0.6) !important;
          }
        `}</style>
        <div
          className="nav-glass w-full max-w-5xl rounded-2xl border border-white/10 flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14 transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 0 60px rgba(250,250,250,0.03), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex-shrink-0 mr-4">
            <Link href="/" data-nav="primary" className="text-display text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
              CORE<span className="text-signal">829</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            <LayoutGroup>
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.hasMega && setMegaOpen(true)}
                  onMouseLeave={() => item.hasMega && setMegaOpen(false)}
                  onFocus={() => item.hasMega && setMegaOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node) && item.hasMega) {
                      setMegaOpen(false);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    data-nav="primary"
                    aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
                    className={`text-xs tracking-wide uppercase py-2 relative whitespace-nowrap ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-ink"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {(pathname === item.href || pathname.startsWith(item.href + "/")) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-signal"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </LayoutGroup>
          </div>

          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            {!loading && (
              authed ? (
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-ink/70 hover:text-ink transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-ink/70 hover:text-ink transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider bg-signal/10 text-signal hover:bg-signal/20 rounded-full transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
            <div className="hidden sm:block">
              <MagneticButton variant="primary" href="/contact" className="text-xs px-4 py-2">
                Start a project
              </MagneticButton>
            </div>
            <button
              data-nav="primary"
              className="md:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  className="block h-[2px] w-full origin-center"
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  style={{ backgroundColor: "currentColor" }}
                  transition={prefersReduced ? { duration: 0 } : undefined}
                />
                <motion.span
                  className="block h-[2px] w-full"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  style={{ backgroundColor: "currentColor" }}
                  transition={prefersReduced ? { duration: 0 } : undefined}
                />
                <motion.span
                  className="block h-[2px] w-full origin-center"
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  style={{ backgroundColor: "currentColor" }}
                  transition={prefersReduced ? { duration: 0 } : undefined}
                />
              </div>
            </button>
          </div>
        </div>

        {}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-4xl bg-graphite/95 backdrop-blur-xl border border-white/10 rounded-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="grid grid-cols-3 gap-4 p-6">
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <span className="font-mono text-signal text-xs">{service.numeral}</span>
                    <h3 className="text-display text-base mt-2 group-hover:text-signal transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-ink/60 mt-1 leading-relaxed">{service.tagline}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-graphite/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav id="mobile-menu" className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-display text-4xl md:text-6xl tracking-tight hover:text-signal transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: NAV_ITEMS.length * 0.08 }}
                >
                  {authed ? (
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="text-display text-4xl md:text-6xl tracking-tight text-signal hover:text-signal-dim transition-colors"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-display text-4xl md:text-6xl tracking-tight text-signal hover:text-signal-dim transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
