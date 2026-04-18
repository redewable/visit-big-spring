# Visit Big Spring — Website Prototype

A pitch prototype for **City of Big Spring, RFP No. 26-016 — Web Design & Digital Experience Services**. Built as a mobile-first, accessibility-forward, headless-ready foundation that directly addresses every item in the Scope of Services.

---

## Why this stack beats the 10–15 competing bids

**Next.js 15 (App Router) + Tailwind CSS + headless-ready architecture**

| RFP requirement | How this prototype answers it |
| --- | --- |
| Mobile-first design | Tailwind breakpoints default to mobile; every layout is designed small-up. |
| Core Web Vitals / speed | Next.js pre-renders every route at build; zero client JS on most pages (only `/itinerary` and `Header` mobile menu ship JS). |
| CMS preference (WordPress, Drupal, equiv.) | `lib/data.ts` is the single source of truth — swap for a WPGraphQL client or Sanity/Payload with no page changes. Headless WordPress gives the City the admin experience they know and the performance most competitors can't deliver. |
| ADA / WCAG 2.1 | Skip-link, visible focus rings, `prefers-reduced-motion` honored, semantic landmarks (`<nav>`, `<main>`, `<article>`, `<aside>`), alt text on imagery, color-not-sole-indicator on the map. |
| SEO + Schema Markup | Per-page metadata, OpenGraph, and JSON-LD `Event` + `LocalBusiness` schema rendered on detail pages. |
| Stay / Eat & Drink / Explore / History / Events | Five dedicated routes with a shared, data-driven card system. |
| Event calendar | `/events` landing + `[slug]` detail with `.ics` download and Schema.org `Event`. |
| Business listings | `/businesses/[slug]` with Schema.org `LocalBusiness` — ready for Google Business Profile enrichment. |
| Itinerary builder (preferred) | Working interactive stub at `/itinerary` — add, reorder, print, share. |
| Interactive map | `/map` frame with filter UI, legend, Google Maps embed placeholder (production: Mapbox GL with clustered, route-aware markers). |
| First-party data + newsletter | Footer signup; form posts to `/api/newsletter` (to be wired to whichever ESP the City chooses). |
| Ownership & transition | Plain Git repo with no vendor-lock SDKs in the critical path. All assets, code and credentials transfer on request. |

---

## Run it

Requires Node 18.18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Build for production:

```bash
npm run build
npm start
```

---

## File map

```
app/
  layout.tsx             Root layout — skip-link, fonts, header, footer
  page.tsx               Homepage — hero, pathways, events, story, itinerary CTA
  stay/                  Lodging landing
  eat-drink/             Dining landing
  explore/               Outdoor / attractions landing
  history/               Heritage narrative + venues
  events/                Calendar landing
  events/[slug]/         Event detail (+ JSON-LD, .ics download)
  businesses/[slug]/     Business detail (+ JSON-LD)
  itinerary/             Interactive trip builder
  map/                   Interactive map frame
  not-found.tsx
  globals.css            Design tokens + base a11y styles

components/
  Header.tsx             Sticky nav, mobile menu
  Footer.tsx             Newsletter signup + CVB contact
  PageHero.tsx           Reusable section hero
  EventCard.tsx
  BusinessCard.tsx

lib/
  data.ts                Mock content — pure functions; swap for CMS client
```

---

## Brand palette

Drawn from Big Spring's mesa sunsets, caprock terracotta, big-sky blues, and sun-bleached limestone.

- **Mesa** (`#b85c3a`) — primary accent, CTAs
- **Sky** (`#2f6d92`) — deep dusk
- **Sage** (`#6a8363`) — state park brush
- **Sand** (`#fbf8f2`) — page background, prairie warmth
- **Stone** (`#211f1b`) — text + footer

Typography pairs **Fraunces** (display) with **Inter** (UI), both from Google Fonts via `next/font` — self-hosted, no layout shift, no third-party request at runtime.

---

## Next steps if awarded

1. **Headless CMS** — wire WordPress (WPGraphQL) or Payload into `lib/data.ts`. City staff keep the admin UX they know; visitors get the Next.js performance.
2. **DAM + photography** — load the City's visuals into the CMS media library with auto-`next/image` optimization.
3. **Analytics** — GA4 + Meta Pixel via a consent-aware loader (honors the cookie banner, CCPA/VCDPA-safe).
4. **Mapbox GL** — replace the `/map` placeholder with clustered markers and route generation fed from the itinerary builder.
5. **Search** — Algolia or Typesense index across pages, events, businesses.
6. **Newsletter / CRM** — connect Mailchimp, Brevo, or Klaviyo via first-party server route; preference is first-party-data-owned platforms per RFP §4G.
7. **Performance budget** — enforce Core Web Vitals in CI via Lighthouse budgets.
8. **Hosting** — recommend Vercel (free SSL, global edge cache, 99.99% uptime SLA), or a City-managed Node host if required.

---

## Accessibility checklist (WCAG 2.1 AA)

- [x] Skip-to-main-content link (2.4.1)
- [x] Visible focus indicator (2.4.7)
- [x] Color contrast ≥ 4.5:1 on body text, ≥ 3:1 on UI (1.4.3)
- [x] Semantic landmarks: `header`, `nav`, `main`, `footer`, `article`, `aside`
- [x] Form labels on every input (3.3.2)
- [x] `prefers-reduced-motion` honored (2.3.3)
- [x] Alt text / `aria-label` on all decorative and content imagery
- [x] Keyboard operability on all interactive elements
- [ ] Formal third-party audit (recommended after content load)
