"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, SERVICES } from "@/lib/brand";
import { MagneticButton } from "../motion/MagneticButton";

function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IT", {
          timeZone: BRAND.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function Footer() {
  const localTime = useLocalTime();
  const year = new Date().getFullYear();
  const spanRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;
    const fit = () => {
      const w = document.documentElement.clientWidth - 12;
      span.style.fontSize = "100px";
      const m = span.offsetWidth;
      if (m > 0) {
        span.style.fontSize = `${((100 * w) / m).toFixed(1)}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <footer className="relative bg-graphite text-ink overflow-x-hidden p-0 m-0">
      {}
      <div className="select-none pointer-events-none m-0 p-0">
        <span
          ref={spanRef}
          className="inline-block text-display font-bold whitespace-nowrap text-ink leading-none"
          style={{
            fontSize: "100px",
            opacity: 0.04,
            letterSpacing: "-0.08em",
          }}
        >
          CORE 829
        </span>
      </div>

      {}
      <div className="relative z-10">
        <div className={`grid-12 pb-16 ${isHome ? "pt-0" : "pt-8"}`}>
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-display text-4xl md:text-6xl tracking-tight leading-none">
              Let&apos;s build
              <br />
              <span className="text-signal">something real.</span>
            </h2>
            <p className="mt-6 text-ink/60 text-lg max-w-md leading-relaxed">
              Project, retainer, or rentable app — pick the model that fits your business.
            </p>
            <div className="mt-8 flex gap-4">
              <MagneticButton href="/contact" variant="primary">
                Start a project
              </MagneticButton>
              <MagneticButton href="/services/rent-webapps" variant="outline">
                Rent an app
              </MagneticButton>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 mt-16 md:mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-ink/60 mb-4">
                  Services
                </div>
                <ul className="space-y-3">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-sm text-ink/70 hover:text-ink transition-colors"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-ink/60 mb-4">
                  Company
                </div>
                <ul className="space-y-3">
                  {["Work", "Process", "About", "Pricing", "Contact"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-sm text-ink/70 hover:text-ink transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-ink/60 mb-4">
                  Contact
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-sm text-ink/70 hover:text-ink transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </li>
                  <li className="text-sm text-ink/60 font-mono">
                    {localTime && `${localTime} ${BRAND.timezone.split("/")[1]}`}
                  </li>
                </ul>
                <div className="mt-6 flex gap-4">
                  {Object.entries(BRAND.social).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink/60 hover:text-signal transition-colors text-sm uppercase tracking-wider font-mono"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-mist py-6">
          <div className="grid-12">
            <p className="col-span-6 text-xs text-ink/60 font-mono">
              &copy; {year} {BRAND.name}. All rights reserved.
            </p>
            <div className="col-span-6 flex gap-6 justify-end">
              <Link
                href="/legal/privacy"
                className="text-xs text-ink/60 hover:text-ink/60 transition-colors font-mono"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="text-xs text-ink/60 hover:text-ink/60 transition-colors font-mono"
              >
                Terms
              </Link>
              <Link
                href="/legal/cookies"
                className="text-xs text-ink/60 hover:text-ink/60 transition-colors font-mono"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
