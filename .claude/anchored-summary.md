# Core829 Renewed — Summary

## Objective
Complete a secure client portal with auth, quotes, documents, messaging, and full admin CRUD — accessible from the floating header.

## Stack
- **Framework:** Next.js 16 (app router, Turbopack)
- **Backend:** Convex (schema, mutations, queries, auth, storage)
- **Auth:** bcryptjs + session cookies (httpOnly + non-httpOnly for client reads)
- **Styling:** Tailwind CSS, custom design tokens (ink, paper, graphite, signal, mist)
- **Language:** TypeScript strict mode
- **Build:** 46 routes, 0 errors, 0 warnings

## Key Architecture Decisions
1. **Dual-cookie auth strategy** — httpOnly `session_token` for server-side validation, non-httpOnly `session_token_client` so client JS can read the token to pass to Convex queries. Fixes redirect loop caused by server-only cookie.
2. **CSRF on DELETE /api/auth/session** — requires custom `x-csrf-token` header matching cookie value to prevent logout CSRF.
3. **Storage proxy (`/api/storage/[id]`)** — reads from Convex storage, requires `session_token` cookie (32+ chars), streams response with correct MIME type.
4. **Cookie parsing extracted** to `src/lib/cookie.ts` → `getSessionToken()` helper, used by all client pages.
5. **Convex auth gate** — all admin-only mutations require a validated session token with admin role.
6. **Complete data isolation** — admin sees all data, client sees ONLY their own. Every query/mutation validates ownership (admin bypass) before returning data.
7. **Admin & client panels are completely separate route trees** — `/admin/*` has its own layout (sidebar), `/dashboard/*` has its own layout (sidebar). No nesting, no duplication. Login/signup redirect by role.

## Completed Work

### Auth & Session Management
- Redirect loop fixed — added `session_token_client` non-httpOnly cookie
- CSRF protection on DELETE /api/auth/session
- Rate limiting on signup (3 attempts per email)
- Password validation (min 8 chars)
- Storage proxy requires session token
- Cookie utility `getSessionToken()` extracted

## Data Isolation (NEW)
Every Convex query/mutation now enforces strict data isolation:
- **`projects.list`** — admin sees all, non-admin sees only projects where `clientUserId === user._id`
- **`projects.getByClient`** — requires session, verifies admin or client ownership
- **`projects.getByUser`** — verifies admin or self, returns `[]` if unauthorized
- **`messages.list`** — requires session, fetches project, verifies admin or project ownership
- **`documents.list`** — same as messages: verify admin or project ownership
- **`quotes.updateStatus`** — requires session, verifies admin or quote ownership
- **`quotes.list`** — admin sees all, non-admin sees only own quotes (by_user index)
- **`leads.updateStatus`** — admin-only (`requireAdmin`)
- **`projectRequests.updateStatus`** — admin-only (`requireAdmin`)
- **`projectRequests.getByUser`** — requires session, verifies admin or self
- **`leads.list`**, **`projectRequests.list`** — admin-only (existing)

### Admin Dashboard (`/admin/**`)
**Layout** (`layout.tsx`): Fixed left sidebar (w-56) with brand, 9 nav links with icons, active state highlighting, user info, client view link, logout.

**Pages** (each with search/filter inputs, modern cards, consistent design):

| Page | URL | Features |
|------|-----|----------|
| **Overview** | `/admin` | 6 stats cards, 4-stage pipeline funnel (Leads→Requests→Quotes→Projects), 3 recent activity feeds |
| **Leads** | `/admin/leads` | Search, status filter (all/new/contacted/qualified/converted/closed), status dropdown per lead, "Convert to Request" button, delete |
| **Requests** | `/admin/requests` | Search, status filter (all/new/reviewing/quoted/approved/declined), status per request, "Create Quote" with title input, delete |
| **Quotes** | `/admin/quotes` | Search, "New Quote" drawer (select user, title, amount), inline price input with Set Price & Send, status management, shows related user/request, delete |
| **Projects** | `/admin/projects` | Search, status filter, split-panel: project list (left) + detail panel (right) with price, IBAN, stage, status, timeline events, document upload, messaging, delete. Links to client view + quotes |
| **Users** | `/admin/users` | Search, role dropdown (lead/client/admin), ID display, delete |
| **Team** | `/admin/team` | Add member form, search, inline edit, active/inactive badge, delete |
| **Apps** | `/admin/apps` | Search, inline price/status edit, active/inactive badge, delete |
| **Cases** | `/admin/cases` | Search, publish/draft toggle, delete |

### Client Dashboard (`/dashboard/**`)
**Layout** (`layout.tsx`): Fixed left sidebar with Overview, Projects, Quotes, Profile links. Shows username/email + admin link + logout.

**Pages:**

| Page | URL | Features |
|------|-----|----------|
| **Overview** | `/dashboard` | Welcome message, stats cards (active projects, pending quotes, total), pending quotes section with links, projects grid with stage/price/team/timeline |
| **Projects** | `/dashboard/projects` | Full project list with stage badges, price, team count, dates; link to new project; each card links to detail page |
| **Project Detail** | `/dashboard/projects/[id]` | Project info (price, IBAN, stage, timeline), documents downloads, messaging sidebar |
| **Quotes** | `/dashboard/quotes` | List of user's quotes with status + amounts |
| **Quote Detail** | `/dashboard/quotes/[id]` | Quote with accept/reject, PDF download, IBAN, project docs, messaging |
| **Profile** | `/dashboard/profile` | Read-only profile info |

### Circular Workflow (mini CRM)
- **Leads** → "Convert to Request" creates a `projectRequest` prefilled with lead data, marks lead as "converted"
- **Requests** → "Create Quote" creates a `quote` linked to the user (found by email), marks request as "quoted"
- **Quotes** → status workflow: draft → sent (on price set) → accepted/rejected
- **Projects** → detail panel links back to related quotes + client-facing view
- Each page has search + status filters for fluid navigation between pipeline stages

### Convex Backend
- `auth`: list, remove, updateRole, validateSession, createUser, etc.
- `leads`: create, list, updateStatus, remove
- `projectRequests`: create, list, getByUser, updateStatus, remove
- `quotes`: create, get, list, updatePrice, updateStatus, updatePdfStorage, remove
- `projects`: create, getByClient, getByUser, getById, list, updateProject, updateStatus, addTimelineEvent, remove
- `messages`: send, list, remove
- `documents`: generateUploadUrl, list, remove
- `teamMembers`: create, getByEmail, list, update, remove
- `rentableApps`: create, list, getBySlug, update, remove
- `caseStudies`: create, list, getBySlug, update, remove
- `profile`: getProfile, updateProfile

### Fixes & Polish
- generateMetadata in work/[slug] — async + await params
- Services page: "Six capabilities" → "Seven"
- MagneticButton outline hover fix
- Sitemap includes all slugs
- Navigation uses getSessionToken()
- Contact form: submitting guard prevents double-submit
- All client pages: migrated to getSessionToken()

## File Structure
```
src/app/
├── admin/                  ← COMPLETELY SEPARATE from dashboard
│   ├── layout.tsx          ← Admin sidebar layout (own layout, not nested)
│   ├── page.tsx            ← Admin overview (stats, pipeline)
│   ├── leads/page.tsx      ← Admin leads management
│   ├── requests/page.tsx   ← Admin requests management
│   ├── quotes/page.tsx     ← Admin quotes management
│   ├── projects/page.tsx   ← Admin projects management
│   ├── users/page.tsx      ← Admin users management
│   ├── team/page.tsx       ← Admin team management
│   ├── apps/page.tsx       ← Admin apps management
│   └── cases/page.tsx      ← Admin cases management
└── dashboard/              ← Client-only sidebar layout
    ├── layout.tsx          ← Client sidebar layout
    ├── page.tsx            ← Client overview
    ├── projects/
    │   ├── page.tsx        ← Client projects list
    │   └── [id]/page.tsx   ← Client project detail
    ├── quotes/
    │   ├── page.tsx        ← Client quotes list
    │   └── [id]/page.tsx   ← Client quote detail
    └── profile/
        └── page.tsx        ← Client profile
```
