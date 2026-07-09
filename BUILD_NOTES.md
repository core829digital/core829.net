# Build Notes

## Known technical debt & shortcuts

- [x] ~~**bcryptjs → argon2**~~ — Done. Argon2id with OWASP-recommended parameters. Bcrypt→argon2 hash migration on login.
- [x] ~~**JS-accessible cookies**~~ — Addressed. `session_token` is httpOnly. `session_token_client` is JS-accessible only for pre-filling user data in contact form.
- [x] ~~**Zod validation**~~ — Done on all critical mutations/actions.
- [x] ~~**Middleware/Proxy**~~ — Enhanced to protect both `/dashboard/*` and `/admin/*`.
- [x] ~~**Folder structure**~~ — Components reorganized into motion/, ui/, three/ subdirectories.
- [x] ~~**Design tokens**~~ — Adopted in all Three.js files (Hero3DScene, ClientNetwork), layout, loading, hero section. GSAP inline styles retain raw values by necessity (CSS vars incompatible with opacity modifiers in JS style objects).
- [x] ~~**Marketing content audit**~~ — All 14 marketing page files reviewed; all production-ready.
- [ ] **Lighthouse Performance**: Current score 46. Bottleneck: large JS payload (Three.js + GSAP + framer-motion). Three.js deferred 6s post-mount.
- [ ] **Tests**: No vitest or Playwright setup
- [ ] **i18n**: No next-intl pre-structuring
- [ ] **CI/CD**: No GitHub branch protection or PR pipeline
- [ ] **Cross-browser testing**: Not yet executed

## Assets & content needing client input

- [NEEDS CLIENT INPUT] /legal/privacy: placeholder content, needs real GDPR-compliant text
- [NEEDS CLIENT INPUT] /legal/terms: placeholder content, needs real ToS text
- [NEEDS CLIENT INPUT] Case study testimonials: need client approval before publishing
