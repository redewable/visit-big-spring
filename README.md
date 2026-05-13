# Visit Big Spring

A Convention & Visitors Bureau prototype for the City of Big Spring, Texas — built as the public, evaluable artifact for COAT Creative's response to RFP No. 26-016 (Web Design & Digital Experience Services). Live at **https://visit-big-spring.vercel.app**.

The proposal was hand-delivered Friday, May 8, 2026; selection is scheduled for May 12, 2026.

---

## What's in here

**Nineteen routes**, fully static except for `/api/passes-interest` and one ISR-cached weather fetch. The proposal binder references this URL as the working artifact behind every §4 commitment.

| Route | Purpose |
| --- | --- |
| `/` | Proposal cover page (RFP No. 26-016) with deep link into the prototype |
| `/home` | Tourism homepage — monumental hero, intermissions, five pathways, meetings CTA, itinerary CTA |
| `/stay` · `/eat-drink` · `/explore` · `/history` · `/events` | Five RFP-required visitor pathways |
| `/meetings` | Capacity matrix + HOT-tax revenue loop + 7 venue cards |
| `/map` | Mapbox GL interactive map with category filters, clustered pins, popovers |
| `/itinerary` | Drag-to-order trip builder with share link |
| `/events/[slug]` | Event detail + JSON-LD + outdoor weather forecast |
| `/businesses/[slug]` | Listing detail + Editor's Pick / Heritage Member editorial block + know-before-you-go pattern |
| `/stories` · `/stories/[slug]` | Long-form editorial (3 pieces at ~400 words) |
| `/passes` | Explorer Pass pre-launch with email capture |
| `/accessibility` | WCAG 2.1 AA conformance statement + contact + tools |
| `/about/how-this-site-works` | Transparency: performance scores, ownership, HOT tax, Heritage Members |
| `/demo-admin` | Evaluator-only visualization of the WordPress admin (env-gated by `SHOW_DEMO_ADMIN=true`) |
| `/api/passes-interest` | First-party email capture endpoint for the Explorer Pass |

The `/` cover page and `/home` split was introduced for the May 7 hand delivery so the RFP package, the live site, and the evaluator-facing landing experience all read the same context. Pre-delivery, `/home` was simply `/`.

---

## Run it

Requires Node 18.18+ (Node 20 recommended to match Vercel / CI).

```bash
npm install
cp .env.example .env.local  # then fill in the Mapbox token
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

### Environment variables

| Var | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes, for `/map` | Public Mapbox token (`pk.…`). The map falls back to a text listing when unset. |
| `SHOW_DEMO_ADMIN` | No | Set to `true` to expose `/demo-admin` on the deployed URL. Leave unset in true production — the route 404s when this is falsy. Currently set to `true` on the Vercel prod environment so RFP evaluators can reach it. |

### Lighthouse

Run a mobile audit against the live URL and rewrite `public/lighthouse-scores.json` — the footer badge reads the file at build time.

```bash
npm run lighthouse              # audits https://visit-big-spring.vercel.app
npm run lighthouse:local        # audits http://localhost:3000
node scripts/lighthouse.mjs <any-url>
```

A GitHub Action (`.github/workflows/lighthouse.yml`) re-runs the audit on every push to `main` (with a 60-second pause to let Vercel deploy first) and commits any score change back.

**Current scores (post-delivery, mobile):** Performance 73 · Accessibility 96 · Best Practices 96 · SEO 60. The SEO regression to 60 traces to the new `/` cover page lacking proper meta / canonical / robots directives — top priority for post-award cleanup. Accessibility and Best Practices are within the launch-target band; the proposal frames the ≥95 Performance and ≥95 SEO numbers as **launch** acceptance criteria (post-asset-optimization with final photography pass), gated by Lighthouse CI in the deployment pipeline.

---

## Architecture

- **Next.js 15** App Router, fully static except for `/api/passes-interest` and the NWS weather fetch (ISR: 30-minute revalidate).
- **Tailwind CSS** with the COAT/CVB brand palette — mesa (terracotta `#A23B22`), dusk (deep sky `#2E3F5C`), sage (prairie `#6A8363`), limestone (sun-bleached neutral `#F2EDE2`), ink (warm near-black `#211F1B`). Type pairing: Fraunces (display), Inter (UI), Rye (vintage-slab accents). All fonts self-hosted via `next/font`.
- **Single data seam** at `lib/data.ts` — businesses, events, venues, and stories are all typed and colocated. When the City approves a headless CMS (proposed: WordPress + WPGraphQL), swap the exports for a typed client; every page stays unchanged.
- **`lib/weather.ts`** → National Weather Service (`api.weather.gov`). No key required. 30-minute ISR cache. Returns `null` on any failure — pages never break on a weather API outage.
- **Mapbox GL** lazy-loaded on `/map` only. Pins color- + shape-coded by category (WCAG 1.4.1). Filters are aria-pressed buttons.
- **JSON-LD** on every detail route: `LocalBusiness` for listings, `Event` for events, `Article` for stories, `Product` (PreOrder) for the Explorer Pass.
- **`next/image`** everywhere, with AVIF/WebP fallback. All photography lives under `public/assets/`.

---

## Photography & brand assets

Real CVB photography is wired across the site as of late April. Files live under `public/assets/`:

- `public/assets/brand/` — official CVB logo and color tokens
- `public/assets/hero/` — homepage hero footage
- `public/assets/venues/` — meeting-space photography (16 venues)
- `public/assets/businesses/` — featured business shots
- `public/assets/events/` — annual recurring events
- `public/assets/stories/` — editorial story imagery

No placeholders remain in production routes. The `WestTexasScene` component still accepts an optional `videoSrc` prop for CVB drone footage once that file is delivered.

---

## Content sources & verification

Seed content was verified against:

- **visitbigspring.com** (current CVB site) — lodging roster, venue list, annual recurring events
- **tpwd.texas.gov/state-parks/big-spring** — state park hours, address, activities
- **hangar25airmuseum.org** — aviation museum address and phone
- **Big Spring Visitor Guide (print edition)** — historical narrative, trivia, capacity numbers
- **Google Maps** — cross-checked addresses and coordinates

Entries that **could not be fully verified** at the time of writing carry a `// VERIFY` comment next to the field. Examples: Moss Creek Lake's precise address, Sandhill Crane Observatory's street, and 2026 event times that aren't in the Visitor Guide's recurring schedule.

Google Place IDs are deliberately left empty — they'll be resolved post-award via the Places API and a one-shot script. The `googleMapsUrl()` helper in `lib/data.ts` produces working place-query URLs in the meantime.

---

## Featured businesses

Three tiers, three UI treatments:

- **Standard** — default card, no extra chrome.
- **Editor's Pick** (mesa-filled star + italic caption) — CVB-written editorial intro on the detail page. *Currently: Big Spring State Park, Hotel Settles, Settles Grill.*
- **Heritage Member** (terracotta dot + thin mesa-tinted border + caption) — sustaining program supporters. Editorial intro on detail page + link to the Heritage Member explainer on `/about/how-this-site-works#heritage`. *Currently: Heritage Museum, Hangar 25 Air Museum.*

Color is never the sole indicator. Both tiered treatments always carry text labels (WCAG 1.4.1).

Listing detail pages also surface a **know-before-you-go** block (hours, parking, accessibility notes, kid-friendly flag) where the data is available — supporting the planning-stage visitor without making them leave the page.

---

## Accessibility

The site targets **WCAG 2.1 Level AA**. Conformance details are on `/accessibility`. Highlights:

- Skip-to-main-content link on every page
- Visible focus indicators, 3:1 contrast minimum
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`)
- `prefers-reduced-motion` freezes hero animations
- 44×44 px minimum touch targets
- Map markers are shape + color coded (not color alone)
- NWS weather component degrades to nothing on API failure; no broken UI
- All interactive elements are keyboard-reachable and screen-reader-labeled

---

## Deployment

Vercel auto-deploys from `main` on every push. There is no staging slot — `main` is production for the prototype. The live URL is referenced in the RFP proposal binder, so don't merge anything that risks breaking it.

The lighthouse GitHub Action runs ~70 seconds after every push and commits a fresh `public/lighthouse-scores.json` back to `main`. The footer badge reads that file at build time.

---

## What's NOT in scope

This site is the **CVB tourism property**, funded by Hotel Occupancy Tax (TX Tax Code §351.101). City government functions (permits, utility billing, council agendas, "How Do I?") live at **mybigspring.com** and should stay there — different audience, different fund, different IA.

A couple of tourism-adjacent items currently on the city site could optionally surface as deep links from this property (golf tee-time booking, the city event feed, the "Points of Interest" PDF). Worth discussing during contract negotiation.

---

## RFP compliance matrix

| RFP clause | Status |
| --- | --- |
| §3 Revenue generation framework | ✅ `/meetings` with HOT-tax narrative |
| §4A Mobile-first | ✅ Designed at 375 px; mobile-first Tailwind breakpoints |
| §4A Core Web Vitals | ✅ Static build; current footer Lighthouse scores published |
| §4A Stay / Eat / Explore / History / Events pathways | ✅ All five built and content-ready |
| §4B Branding & storytelling | ✅ Monumental hero + `/stories` + `/history` timeline |
| §4C Photography / video | ✅ Real CVB photography wired across hero, venues, businesses, events, stories |
| §4D Event calendar | ✅ Annual calendar + 8 seeded events + detail pages + .ics download |
| §4D Business listings | ✅ 30 listings + `LocalBusiness` schema + know-before-you-go pattern |
| §4D Itinerary builder | ✅ Working with share link |
| §4D Interactive map | ✅ Mapbox GL with filters, popovers, keyboard nav |
| §4D Google Business Profile tie-in | ✅ `googleMapsUrl()` helper + Place ID fields ready |
| §4E CMS framework | ⚠️ Headless WordPress concept; swap-in via `lib/data.ts` happens post-award |
| §4F SEO + Schema Markup | ✅ JSON-LD on every detail route · ⚠️ SEO score regression on `/` cover page — fix post-award |
| §4F Google Analytics + Meta Pixel | 🕐 Wire post-award via a consent-aware loader |
| §4G First-party data | ✅ `/passes` interest capture + newsletter form + `/api/passes-interest` endpoint |
| §4H ADA / WCAG 2.1 | ✅ `/accessibility` statement + implementations |
| §4H HOT funding alignment | ✅ Explicit on `/stay` subtitle + `/meetings` + `/about` |

---

## Post-delivery to-do (priority order, May 12 onward)

1. **Fix `/` SEO regression** — add `<title>`, `<meta description>`, canonical, and OpenGraph tags to the RFP cover page. Re-run lighthouse, expect SEO back to ≥95.
2. **Resolve `// VERIFY` markers** in `lib/data.ts` — confirm or correct each flagged address/time.
3. **Wire Google Place IDs** via the Places API + a one-shot script (post-award, with City-approved API quota).
4. **Optional cleanup**: strip the `Co-Authored-By: Claude` trailers from pre-CLAUDE.md commit history via `git filter-repo` if desired (this rewrites SHAs; force-push required).

---

## Project conventions

See `CLAUDE.md` in the repo root for the working agreement that applies to any AI-assisted contribution to this repo — covering attribution, commit/push behavior, performance/accessibility/HOT-tax guarantees, routing conventions, brand palette, and out-of-scope features.

---

## Contact

For questions about this prototype or the proposal: **team@coatcreative.com**.

For CVB inquiries: **info@visitbigspring.com**, **432.263.8235**.
