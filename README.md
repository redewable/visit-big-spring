# Visit Big Spring

A Convention & Visitors Bureau prototype for the City of Big Spring, Texas — built as part of RFP No. 26-016 (Web Design & Digital Experience Services). Live at **https://visit-big-spring.vercel.app**.

---

## What's in here

**Thirteen routes, fifty-nine static pages, one hundred and three kilobytes of First Load JS.**

| Route | Purpose |
| --- | --- |
| `/` | Monumental hero, intermissions, pathways, meetings CTA, itinerary CTA |
| `/stay` · `/eat-drink` · `/explore` · `/history` · `/events` | Five RFP-required visitor pathways |
| `/meetings` | Capacity matrix + HOT-tax revenue loop + 7 venue cards |
| `/map` | Mapbox GL interactive map with category filters, clustered pins, popovers |
| `/itinerary` | Drag-to-order trip builder with share link |
| `/events/[slug]` | Event detail + JSON-LD + outdoor weather forecast |
| `/businesses/[slug]` | Listing detail + Editor's Pick / Heritage Member editorial block |
| `/stories` · `/stories/[slug]` | Long-form editorial (3 pieces at ~400 words) |
| `/passes` | Explorer Pass pre-launch with email capture |
| `/accessibility` | WCAG 2.1 AA conformance statement + contact + tools |
| `/about/how-this-site-works` | Transparency: performance scores, ownership, HOT tax, Heritage Members |
| `/demo-admin` | Evaluator-only visualization of the WordPress admin (env-gated) |

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
| `SHOW_DEMO_ADMIN` | No | Set to `true` to expose `/demo-admin` on the deployed URL. Leave unset in true production — the route 404s when this is falsy. |

### Lighthouse

Run a mobile audit against the live URL and rewrite `public/lighthouse-scores.json` — the footer badge reads the file at build time.

```bash
npm run lighthouse              # audits https://visit-big-spring.vercel.app
npm run lighthouse:local        # audits http://localhost:3000
node scripts/lighthouse.mjs <any-url>
```

A GitHub Action (`.github/workflows/lighthouse.yml`) re-runs the audit on every push to `main` (with a 60-second pause to let Vercel deploy first) and commits any score change back.

---

## Architecture

- **Next.js 15** App Router, fully static except for `/api/passes-interest` and the NWS weather fetch (ISR: 30-minute revalidate).
- **Tailwind CSS** with mesa/corten/limestone/stone palette. Fraunces (display), Inter (UI), Rye (vintage slab accents).
- **Single data seam** at `lib/data.ts` — businesses, events, venues, and stories are all typed and colocated. When the City approves a headless CMS (proposed: WordPress + WPGraphQL), swap the exports for a typed client; every page stays unchanged.
- **lib/weather.ts** → National Weather Service (`api.weather.gov`). No key required. 30-minute ISR cache. Returns `null` on any failure — pages never break on a weather API outage.
- **Mapbox GL** lazy-loaded on `/map` only. Pins color- + shape-coded by category (WCAG 1.4.1). Filters are aria-pressed buttons.
- **JSON-LD** on every detail route: `LocalBusiness` for listings, `Event` for events, `Article` for stories, `Product` (PreOrder) for the Explorer Pass.

---

## Content sources & verification

Seed content was verified against:

- **visitbigspring.com** (current CVB site) — lodging roster, venue list, annual recurring events
- **tpwd.texas.gov/state-parks/big-spring** — state park hours, address, activities
- **hangar25airmuseum.org** — aviation museum address and phone
- **Big Spring Visitor Guide (print edition)** — historical narrative, trivia, capacity numbers
- **Google Maps** — cross-checked addresses and coordinates

Entries that **could not be fully verified** at the time of writing carry a `// VERIFY` comment next to the field. A human should confirm these before final submission. Examples: Moss Creek Lake's precise address, Sandhill Crane Observatory's street, and 2026 event times that aren't in the Visitor Guide's recurring schedule.

Google Place IDs are deliberately left empty — they'll be resolved post-award via the Places API and a one-shot script. The `googleMapsUrl()` helper in `lib/data.ts` produces working place-query URLs in the meantime.

---

## Featured businesses

Three tiers, three UI treatments:

- **Standard** — default card, no extra chrome.
- **Editor's Pick** (mesa-filled star + italic caption) — CVB-written editorial intro on the detail page. *Currently: Big Spring State Park, Hotel Settles, Settles Grill.*
- **Heritage Member** (terracotta dot + thin mesa-tinted border + caption) — sustaining program supporters. Editorial intro on detail page + link to the Heritage Member explainer on `/about/how-this-site-works#heritage`. *Currently: Heritage Museum, Hangar 25 Air Museum.*

Color is never the sole indicator. Both tiered treatments always carry text labels (WCAG 1.4.1).

---

## Accessibility

The site targets **WCAG 2.1 Level AA**. Conformance details are on `/accessibility`. Quick highlights:

- Skip-to-main-content link on every page
- Visible focus indicators, 3:1 contrast minimum
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`)
- `prefers-reduced-motion` freezes hero animations
- 44×44 px minimum touch targets
- Map markers are shape + color coded (not color alone)
- NWS weather component degrades to nothing on API failure; no broken UI

---

## Pre-submission deployment

```bash
# 1. Local build check
npm run build

# 2. Push; Vercel auto-deploys from main.
git push origin main

# 3. After Vercel reports "Ready," run the Lighthouse audit.
npm run lighthouse
# Check the updated public/lighthouse-scores.json

# 4. Commit + push the new scores so the badge updates on the next build.
git add public/lighthouse-scores.json
git commit -m "chore(lighthouse): refresh scores"
git push
```

(The GitHub Action does steps 3–4 automatically on every push.)

---

## What's NOT in scope

This site is the **CVB tourism property**, funded by Hotel Occupancy Tax. City government functions (permits, utility billing, council agendas, "How Do I?") live at **mybigspring.com** and should stay there — they have a different audience, a different fund, and a different IA.

A couple of tourism-adjacent items currently on the city site could optionally surface as deep links from this property (golf tee-time booking, the city event feed, the "Points of Interest" PDF). Worth discussing during contract negotiation.

---

## RFP compliance matrix

| RFP clause | Status |
| --- | --- |
| §3 Revenue generation framework | ✅ `/meetings` with HOT-tax narrative |
| §4A Mobile-first | ✅ Designed at 375 px |
| §4A Core Web Vitals | ✅ Static build; see footer Lighthouse scores |
| §4A Stay / Eat / Explore / History / Events pathways | ✅ |
| §4B Branding & storytelling | ✅ Monumental hero + `/stories` + `/history` timeline |
| §4C Photography / video | ⚠️ Placeholder imagery; `WestTexasScene` component accepts a `videoSrc` prop for CVB drone footage |
| §4D Event calendar | ✅ Annual calendar + 8 seeded events + detail pages |
| §4D Business listings | ✅ 30 listings + `LocalBusiness` schema |
| §4D Itinerary builder | ✅ Working with share link |
| §4D Interactive map | ✅ Mapbox GL with filters, popovers, keyboard nav |
| §4D Google Business Profile tie-in | ✅ `googleMapsUrl()` helper + Place ID fields ready |
| §4E CMS framework | ⚠️ Headless WordPress concept; swap-in happens post-award |
| §4F SEO + Schema Markup | ✅ JSON-LD on every detail route |
| §4F Google Analytics + Meta Pixel | 🕐 Wire post-award via a consent-aware loader |
| §4G First-party data | ✅ `/passes` interest capture + newsletter form |
| §4H ADA / WCAG 2.1 | ✅ `/accessibility` statement + implementations |
| §4H HOT funding alignment | ✅ Explicit on `/stay` subtitle + `/meetings` + `/about` |

---

## Contact

For questions about this prototype or the pitch, contact the agency at the email associated with the GitHub repository. For CVB inquiries: **info@visitbigspring.com**, **432.263.8235**.
