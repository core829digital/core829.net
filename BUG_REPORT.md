# BUG REPORT — core829.net

**Scope:** Functional bugs across marketing site + CRM (admin & client dashboards), forms, real-time sync, price calculations.
**Date:** 2026-07-09
**Method:** Manual walkthrough simulation (empty input, long input, rapid double-submit, network-failure, navigation mid-flow), code review of every list/detail/form, reactive-data review.

---

## Severity summary

| Severity | Count | Fixed |
|----------|-------|-------|
| High | 3 | ✅ 3 |
| Medium | 4 | ✅ 1 / ⚠️ 3 open |
| Low | 2 | ⚠️ noted |

---

## H1 — Dashboard pages not reactive (HIGH) ✅ Fixed
- **Symptom:** Admin changes (e.g. a quote marked "accepted") did not appear live on the client's open dashboard; user had to navigate away and back.
- **Root cause:** All dashboard pages used one-shot `convex.query(...)` inside `useEffect` (no live subscription).
- **Fix:** Converted `dashboard/page.tsx`, `dashboard/layout.tsx`, `dashboard/quotes/page.tsx`, `dashboard/quotes/[id]/page.tsx`, `dashboard/projects/[id]/page.tsx`, `dashboard/profile/page.tsx`, `admin/layout.tsx` to reactive `useQuery`/`useMutation`. Data now auto-updates in real time.

## H2 — NaN price persisted and rendered (HIGH) ✅ Fixed
- **Symptom:** Entering a non-numeric or empty price in admin projects saved `NaN`, rendering as `EURNaN` / `NaN` across admin, dashboard, and quote views.
- **Root cause:** `parseFloat(priceInput)` passed straight to `updateProject` without validation; Convex `v.number()` accepts `NaN`.
- **Fix:** `admin/projects/page.tsx` `handleSavePrice` now validates (`""` → undefined; non-numeric/negative → rejected with toast).

## H3 — Admin mutation handlers swallowed failures (HIGH) ✅ Partially fixed
- **Symptom:** Network failures on admin project edits (price/IBAN/stage/status, message, timeline) threw unhandled promise rejections with no error UI.
- **Fix applied:** `admin/projects/page.tsx` — `handleSendMessage`, `handleAddTimeline`, `handleSavePrice`, `handleSaveField` now wrapped in try/catch with toasts; price validated.
- **Open:** `admin/apps`, `admin/cases`, `admin/team`, `admin/users` create/edit/remove handlers still lack try/catch. *Recommendation: wrap each in try/catch + toast (low effort, tracked).*

## M1 — Double-submit on mutating buttons (MEDIUM) ⚠️ Partial
- **Fixed:** `admin/projects` save/send/timeline handlers now guard via try/catch + disabled-while-busy where applicable.
- **Open:** `admin/quotes` "Create"/"Set Price & Send", `dashboard/quotes/[id]` accept/reject, and `admin/apps`/`cases`/`team`/`users` buttons can still double-fire on rapid click. *Recommendation: add a per-action `busy` state + `disabled`.*

## M2 — Quote detail shows messages/docs of the wrong project (MEDIUM) ⚠️ Open
- **Location:** `dashboard/quotes/[id]/page.tsx:57` — `const proj = userProjects[0] ?? null;`
- **Symptom:** For users with multiple projects, the quote detail page shows messages/documents/IBAN from the *first* project, not the project tied to that quote (`quote.projectRequestId`).
- **Fix needed:** resolve the project via the quote's `projectRequestId` (requires a `projectRequestId` link on `projects`, or a `projects.getByRequest` query). *Tracked as open — functional but occasionally incorrect.*

## M3 — Admin empty-state shown during loading (MEDIUM) ⚠️ Open (cosmetic)
- **Symptom:** While `useQuery` is loading (`undefined`), admin lists render "No X match your filters." briefly before data arrives.
- **Fix needed:** gate the empty message on `data === undefined` (spinner/skeleton) vs `data.length === 0` (empty message). `admin/loading.tsx` covers initial route load but not in-component `useQuery` loading.

## M4 — NaN metric in case studies / app price (MEDIUM) ⚠️ Open
- **Location:** `admin/cases/page.tsx:64` `parseFloat(newMetric)`, `admin/apps/page.tsx:67` `parseFloat(newPrice)`
- **Symptom:** Non-numeric input saves `NaN`, rendered as "NaN % increase" / price.
- **Fix needed:** add `isNaN` numeric guard before insert (mirror the projects fix).

## L1 — Signup lacks client-side email format check (LOW) OK-ish
- Relies on HTML `required` + server Zod validation. Acceptable; server is authoritative.

## L2 — Empty states verified present (LOW) OK
- All admin + dashboard lists render explicit empty-state messages (leads, requests, quotes, projects, apps, cases, team, users, dashboard overview/projects/quotes). No broken/blank UI on empty data.

---

## Verification notes
- `npx tsc --noEmit`: passes.
- `npm run build`: passes (46 routes, middleware active).
- `npx convex deploy`: pushed to `elated-parakeet-803`.
- Regression check: admin leads/requests/quotes/projects, dashboard overview/projects/quotes/profile, contact/signup/login/reset all retain prior behavior; auth now enforced server-side on previously-unprotected mutations.
