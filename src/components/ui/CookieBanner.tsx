"use client";

import { useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("cookie_consent");
    }
    return false;
  });

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-3xl bg-graphite border border-mist rounded-2xl p-5 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 text-sm text-ink/80 leading-relaxed">
            <p>
              <span className="text-ink font-medium">We use essential cookies only.</span>{" "}
              These are strictly necessary for authentication and basic site
              functionality. No tracking or analytics cookies are used.
            </p>
            <p className="mt-1">
              <Link
                href="/legal/cookies"
                className="text-signal hover:underline text-xs font-mono tracking-wider"
              >
                Cookie Policy
              </Link>
              <span className="mx-2 text-mist">|</span>
              <Link
                href="/legal/privacy"
                className="text-signal hover:underline text-xs font-mono tracking-wider"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
          <button
            onClick={accept}
            className="shrink-0 px-6 py-2.5 bg-signal text-ink text-sm font-mono tracking-wider rounded-full hover:bg-signal-dim transition-colors focus-visible:outline-2 focus-visible:outline-signal"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
