# Assets

Drop images, graphics, and media here. Anything in `public/` is served at the
root of the site — a file at `public/assets/hero/sunset.jpg` becomes
`https://visit-big-spring.vercel.app/assets/hero/sunset.jpg`.

## Folder structure

```
public/assets/
├── hero/        # Homepage + section-page hero photography
├── events/      # Event flyers and cover images
├── businesses/  # Business / attraction photos (one per slug)
├── venues/      # Meeting-venue photos (for /meetings)
├── stories/     # Editorial article cover images
└── brand/       # Logos, wordmarks, favicons, social share cards
```

## Conventions

- **Format.** Prefer JPG for photos, PNG for logos/graphics with transparency,
  SVG for icons and line art. WebP is fine if your source has it.
- **Filenames.** kebab-case, no spaces: `hotel-settles-lobby.jpg`,
  `pops-in-the-park-2026.jpg`.
- **Sizes.** Hero imagery should be at least **2000 px wide**. Cards look best
  at **1400 × 1050** (4:3). Logos should be source SVG when possible.
- **One per slug.** For businesses and events, name the file after the slug
  in `lib/data.ts` so it's obvious which listing it belongs to:
  `businesses/hotel-settles.jpg`, `events/cowboy-reunion-rodeo.jpg`.

## Wiring a photo to a listing

The seed data in `lib/data.ts` uses an `image` field for each business /
event / venue. Replace the Unsplash URL with your uploaded path:

```ts
// Before:
image: "https://images.unsplash.com/photo-1551882547-…",
// After:
image: "/assets/businesses/hotel-settles.jpg",
```

Next.js serves these at build time with long-term caching headers, so
performance scores don't change.

## Rights & attribution

Only drop assets you have the right to publish. The City of Big Spring owns
anything shot on city property or commissioned for the CVB. Third-party
photos need written permission from the photographer and should be credited
in a `CREDITS.md` next to the file.
