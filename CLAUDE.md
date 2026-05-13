# Project instructions for Claude — Visit Big Spring (RFP No. 26-016)

Read this on every session. These rules supersede any default behavior.

---

## Identity & attribution

- **Do not add `Co-Authored-By: Claude` or any AI attribution trailer to commit messages.** No "🤖 Generated with Claude Code" lines either. Commits should appear authored solely by Talor Byington.
- **Do not mention Claude, AI, or LLM generation in any user-facing copy, README, comments in shipped code, or anywhere the City evaluators might see.** The RFP positions COAT Creative as a human-led studio; AI assistance is an internal tooling choice, not a brand attribute.
- If asked to add credits or studio info to the site, attribute to **COAT Creative** only.

---

## Git workflow — auto-commit and auto-push by default

After any code change that compiles and passes basic checks:

1. **Stage all related changes** (`git add -A` for the affected files, or specific paths if the change is focused).
2. **Write a concise conventional-commit message**: `<type>(<scope>): <summary>` — e.g., `fix(home): ...`, `feat(events): ...`, `polish(footer): ...`, `chore(lighthouse): ...`. No body needed for small changes; for bigger ones, 1–3 lines explaining the why.
3. **Commit** without the AI co-author trailer (see above).
4. **Push to origin/main** unless I explicitly say "stage only" or "don't push."
5. **Don't ask permission** for routine commit+push on small fixes. Just do it and report the SHA + summary.

Exceptions where you should ask first:
- Rewriting git history (rebase, force-push, filter-repo)
- Deleting branches
- Touching `.env*`, secrets, API keys, or credentials
- Changes that would break the live URL (`https://visit-big-spring.vercel.app`)

---

## Critical guarantees that must not regress

These are written into the RFP proposal. Don't undermine them.

### Performance / Lighthouse targets at launch
- Mobile Performance ≥ 95 (Lighthouse)
- Accessibility = 100
- Best Practices ≥ 95
- SEO ≥ 95
- LCP ≤ 1.8s · INP ≤ 150ms · CLS ≤ 0.05

If a commit causes any score to drop, flag it in the commit message and propose the fix in the same session. **Current known issue: SEO dropped to 60 after adding RFP cover at `/`** — likely missing `<meta>` tags / canonical / robots. Top priority to investigate post-delivery (after 2026-05-12).

### Accessibility — WCAG 2.1 AA, every page
- Skip-link, visible focus rings, semantic landmarks, prefers-reduced-motion, 44×44px touch targets, color-is-never-sole-indicator, alt text on every image, aria-label on every interactive element.
- Test new components with axe-core if at all possible before committing.

### Ownership / portability
- No proprietary CMS, no vendor-locked SDK, no recurring per-seat license in the critical path.
- Every credential and account is created in the City's name on day one of any future engagement.

### HOT-tax compliance
- The site is funded by Texas Hotel Occupancy Tax. Per TX Tax Code §351.101, content must promote Big Spring as a tourism destination. Don't add city-government features (permits, utility billing, council agendas) — those belong on mybigspring.com.

---

## Repo conventions

### Routing
- `app/(site)/...` is the route group for visitor-facing pages.
- **`/` is the RFP cover page** (added 2026-05-07). **`/home` is the actual tourism homepage.** Don't accidentally swap them.
- `/demo-admin` is env-gated by `SHOW_DEMO_ADMIN=true`. Must 404 in true production unless explicitly enabled. Currently enabled on the Vercel preview for RFP evaluators.
- API routes live at `app/api/...`.

### Data layer
- `lib/data.ts` is the single seam for businesses, events, venues, and stories. When a headless WordPress CMS is wired in post-award, replace the exports with a typed WPGraphQL client — every page should stay unchanged.
- Entries marked `// VERIFY` in `lib/data.ts` are content that couldn't be confirmed at scaffold time. Don't remove those markers without checking the source.
- Google Place IDs are intentionally empty — they'll be resolved post-award via the Places API and a one-shot script.

### Imagery
- All photography routes through `next/image` for AVIF/WebP optimization and responsive sizing.
- Real CVB photography is in `public/assets/` (per April 22 commits). Don't replace it with placeholders.
- Brand asset folder at `public/assets/brand/` contains the official CVB logo and color tokens.

### Styling
- Tailwind with mobile-first breakpoints. Default = mobile. `sm:` / `md:` / `lg:` / `xl:` are enhancements.
- Brand palette (used across site + proposal docs):
  - Mesa (terracotta accent): `#A23B22`
  - Dusk (deep sky blue): `#2E3F5C`
  - Sage (prairie sage): `#6A8363`
  - Limestone (sun-bleached neutral): `#F2EDE2`
  - Ink (warm near-black): `#211F1B`
- Typography: **Fraunces** display, **Inter** UI, **Rye** for vintage-slab accents. All self-hosted via `next/font` — never load fonts from a third-party CDN.

### Components
- `components/` has reusable React components. New ones should follow the existing naming pattern (PascalCase, single file per component).
- Skip-link is in `components/Header.tsx`. Don't remove it.
- The Lighthouse badge in the footer reads from `public/lighthouse-scores.json` at build time — refresh that file with `npm run lighthouse` after deploys.

---

## Lighthouse CI

- The GitHub Action `.github/workflows/lighthouse.yml` re-runs the audit on every push to `main`, waits 60s for Vercel to deploy, then commits the updated `public/lighthouse-scores.json` back. **Don't manually commit a stale score file** — let the action handle it.
- If you need to test locally: `npm run lighthouse:local` (uses localhost) or `npm run lighthouse` (uses the live URL).

---

## Deployment

- **Live URL: `https://visit-big-spring.vercel.app`** — this is referenced in the RFP proposal. If it breaks, the proposal loses its single biggest differentiator. Treat it as production.
- Vercel auto-deploys from `main` on every push. There is no staging slot — `main` is production for the prototype.
- Environment variables on Vercel:
  - `NEXT_PUBLIC_MAPBOX_TOKEN` — required for `/map` to render tiles
  - `SHOW_DEMO_ADMIN=true` — required for `/demo-admin` to be reachable during RFP evaluation. Currently set; do not unset until after award.

---

## What's not in scope (so we don't drift)

The prototype is the **CVB tourism property**. City government functions stay at mybigspring.com. Don't add:
- Permit applications, utility billing, council agendas, "How Do I?" pages
- General municipal news
- Any feature that doesn't promote tourism per HOT-tax statutory categories

A few tourism-adjacent items currently on mybigspring.com *could* surface as deep links (golf tee-time booking, city event feed, Points of Interest PDF) — but only after explicit City sign-off during contract negotiation.

---

## Tone for any user-facing copy

- Lean editorial, never AI-flavored. "We're proud to..." > "We are excited to deliver..."
- No emojis in shipped copy unless specifically asked.
- No "delve / leverage / synergize / dive deep / unlock potential" type LLM phrasing.
- Brand voice = Texas-confident, plain-spoken, slightly understated. Big Spring is not Marfa or Austin; the copy shouldn't try to be.

---

## When unsure

- Default to **don't break the live URL** over **do the elegant thing**.
- Default to **conservative commit + push** over **batch big changes**.
- Default to **ask Talor** if a change touches: brand identity, pricing claims, RFP commitments, or anything that contradicts the COAT Creative proposal.
