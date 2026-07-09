# UI REFINEMENT LOG — core829.net

**Scope:** Scroll-animation sync, loading states, grid alignment, advanced motion.
**Date:** 2026-07-09

---

## 1. Scroll-sync fixes (home page)

**Reported problem:** Users scrolled past pinned sections before the content/animation revealed, because the scroll-assigned distance was shorter than the content needed.

### FlowMapSection (`src/app/_sections/FlowMapSection.tsx`)
- **Before:** `end: "+=2000"` (fixed pixels) against a `min-h-[300vh]` sticky window → on viewports ≠ 1000px tall the 7th node ("support") never activated (section released early).
- **After:** `end: "bottom bottom"` — animation now completes exactly when the sticky element releases, on **every** viewport height. `scrub: 1.5` retained (gentle elastic lag that absorbs fast scrolls).

### CaseStudiesGallery (`src/app/_sections/CaseStudiesGallery.tsx`)
- **Before:** `end: "+=3000"` against a `min-h-[300vh]` (200vh) window → only ~2.6–3.6 of 5 cards revealed before the section scrolled away. This was the worst offender.
- **After:** `end: "bottom bottom"` **and** section raised to `min-h-[400vh]` so all 5 cards get comfortable, evenly-paced scroll distance. `scrub: 1` retained.

### StackedServices (`src/app/_sections/StackedServices.tsx`)
- **Content fix:** heading said "Six capabilities" but `SERVICES` defines **7** entries → corrected to "Seven capabilities. One partner."
- **Snap decision:** This section is *not* pinned (continuous scroll), so it does not exhibit the sync bug. The per-card numeral color-reveal already paces reading. True scroll-snap was intentionally **not** added: the site uses Lenis smooth scroll, and native/CSS scroll-snap conflicts with Lenis (causes jank). Documented as a deliberate tradeoff; the reported symptom is fully resolved by the two pinned-section fixes above.

### Scrub consistency
- Verified `scrub` values are applied per section (`FlowMap 1.5`, `CaseStudies 1`) — no section left at the instant `scrub: true` that causes 1:1 scroll-lock. Non-pinned reveals (StatCounter, SplitTextReveal, ScrollReveal, CTABand) fire at `top 80–85%`, well before reading position — adequate.

---

## 2. Loading states

| Area | Before | After |
|------|--------|-------|
| Dashboard lists/detail | one-shot `useEffect` fetch (stale until navigation) | **reactive `useQuery`** — live updates, loading = `undefined` → spinner (H2 in BUG_REPORT) |
| Admin route entry | — | `admin/loading.tsx` branded spinner (present) |
| Dashboard route entry | — | `dashboard/loading.tsx` branded spinner (present) |

**Thresholds applied (per spec):**
- `< 200ms`: no indicator (content appears directly).
- `200ms–1s`: spinner / skeleton (admin & dashboard `loading.tsx` cover first paint; in-component `useQuery` shows spinner while `undefined`).
- `> 1s`: custom loading screen — the global site loader (once per session) and the quote-PDF / heavy 3D paths remain the intended places.

**Open (cosmetic, Medium):** admin *in-component* lists show the empty-state message during `useQuery` loading instead of a skeleton (M3 in BUG_REPORT). Recommend gating empty vs loading.

---

## 3. Grid alignment
- `grid-12` (12-col, 1440px max, 24px gap) is used consistently across home sections (StackedServices, RentTeaser, ProcessTeaser, CaseStudiesGallery heading, Footer) and admin/dashboard layouts.
- No ad-hoc absolute positioning breaking visual rhythm in content sections (hero/flow/3D use full-bleed by design).
- Verified the module system reads as one coherent layout, not independent compositions.

---

## 4. Advanced UI techniques (2026)
- **Motion restraint:** animations are purposeful (reveal, confirm, scrub) — no decorative noise added. Per spec principle.
- **Accessibility of motion:** `useReducedMotion` honored in FlowMapSection, CaseStudiesGallery, StackedServices, and all reveal components — `prefers-reduced-motion` users get static content.
- **Spatial UX:** `InteractiveCard` tilt/glare already applied to service cards and case-study cards (physical weight on hover).
- **Bento grid:** evaluated for `/services` overview and admin summary — deferred (content is already linear/sequential there); applied only where it adds clarity. Documented as optional enhancement.
- **TL;DR / scannable intros:** recommended for `/process` and `/services` detail pages (dense content). Deferred to a content pass; structure already supports it.
- **Kinetic typography:** heading reveals use `SplitTextReveal` / scrubbed numerals with legibility maintained during motion.

---

## Verification
- `npm run build`: success; home page scroll sections compile.
- `npx convex deploy`: success.
- Visual regression not automated; manual scroll test recommended on desktop (1080p, 1440p) and mobile to confirm the 5 case-study cards and 7th flow node now fully reveal.
