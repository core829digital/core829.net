# Audit Log

## Milestone 1: Fondamenta

### Foundation changes implemented:
- **Argon2id** (memory 19MB, timeCost 2, parallelism 1) replaces bcryptjs for password hashing
- **Bcrypt→Argon2 migration** on login: detects old bcrypt hashes, rehashes with argon2
- **Zod 4 validation** on: `auth_actions` (signup/login/reset), `leads.create`, `projectRequests.create`, `contact.submit` — every input validated server-side before touching DB
- **`proxy.ts`** enhanced: now protects `/admin/*` and `/dashboard/*`, redirects logged-in users from `/login`/`/signup`
- **Logout now invalidates server-side session**: `DELETE /api/auth/session` calls Convex `auth:deleteSession` mutation before clearing cookies
- **`convex/validation.ts`** as single source of truth for Zod schemas; `src/lib/validation/schemas.ts` re-exports
- **`src/lib/design-tokens.ts`** with colors, fonts, spacing, easing constants
- **`AUDIT_LOG.md`** and **`BUILD_NOTES.md`** created
- **Session duration extended** from 7 to 30 days with rolling refresh pattern

| Date | Section | Category | Status | Issues |
|------|---------|----------|--------|--------|
| 2026-07-09 | Fondamenta | Autenticazione & Sicurezza | ✅ | Argon2 implemented. httpOnly cookies already set via `/api/auth/session`. Proxy.ts protects all private routes. Logout invalidates server-side session. Rate limiting active on login/signup/reset. |
| 2026-07-09 | Fondamenta | Backend / Integrità dati | ✅ | Zod validation added to all critical mutations/actions. Convex authHelpers check roles explicitly. No passwordHash exposed in queries. |
| 2026-07-09 | Fondamenta | Frontend / Qualità del codice | ✅ | Components reorganized into motion/ui/three subdirectories. Design tokens adopted in all Three.js files, layout, loading, hero. GSAP inline styles retain raw values by necessity. |
| 2026-07-09 | Fondamenta | Performance | ⏳ | Lighthouse run: Perf 46, A11y 94, BP 100, SEO 100. Three.js deferred 6s. Main bottleneck: large JS payload (Three.js + GSAP + framer-motion). |
| 2026-07-09 | Fondamenta | Accessibilità | ⏳ | Toast added aria-live region. CustomCursor respects reduced motion. Pending: axe-core audit. |
| 2026-07-09 | Fondamenta | SEO & Metadata | ✅ | Sitemap, robots.txt, JSON-LD Organization, OG tags all verified. Lighthouse SEO 100. |
| 2026-07-09 | Fondamenta | Design & Brand | ✅ | Design tokens in globals.css + design-tokens.ts. Color proportion respected. Typography consistent. |
| 2026-07-09 | Fondamenta | Animazione & Motion | ⏳ | GSAP + ScrollTrigger setup. ScrollReveal with prefers-reduced-motion. CustomCursor disables on reduced-motion. PageTransitionLayer uses gsap.context(). Pending: CPU throttle audit. |
| 2026-07-09 | Fondamenta | Contenuto & Copy | ✅ | Full audit of all 14 marketing page files — all production-ready with real copy, scroll animations, interactive demos. |
| 2026-07-09 | Fondamenta | Compliance legale | ⏳ | Privacy/terms pages exist as placeholders. [NEEDS CLIENT INPUT] for real GDPR text. |
| 2026-07-09 | Fondamenta | Cross-browser & Cross-device | ⏳ | Pending: test matrix execution. |
| 2026-07-09 | Sistemi Globali | CustomCursor | ✅ | Fixed ring initial border visibility. Touch-device disabled via pointer:fine media query. Reduced-motion support via useReducedMotion(). z-index: 9999→999. |
| 2026-07-09 | Sistemi Globali | PageTransitionLayer | ✅ | Uses gsap.context() with revert(). Respects prefers-reduced-motion. |
| 2026-07-09 | Sistemi Globali | Atmosphere | ✅ | Low-perf detection via hardwareConcurrency <= 4 reduces noise opacity. |
| 2026-07-09 | Sistemi Globali | Toast | ✅ | Added role="status", aria-live="polite", aria-atomic="true". Ref-based counter replaces Date.now()+random. |
| 2026-07-09 | Sistemi Globali | ErrorBoundary | ✅ | Branded fallback with signal color, retry button. |
| 2026-07-09 | Sistemi Globali | Providers | ✅ | Proper Lenis lifecycle, ScrollTrigger refresh on navigation. |
