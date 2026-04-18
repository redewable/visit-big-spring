import PageHero from "@/components/PageHero";
import { businesses, sections } from "@/lib/data";

export const metadata = {
  title: "Interactive Map — Plan your route",
  description:
    "Explore Big Spring attractions, restaurants, hotels and event venues on the interactive map.",
};

/**
 * Map page — frame only. In production, the iframe swaps for a Mapbox GL
 * canvas with clustered markers, Google Business Profile data, and route
 * generation fed from the itinerary builder.
 */
export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="The map"
        title="One map. Every stop."
        subtitle="Filter by category, plot a route, or focus on a single neighborhood. Pulls live hours and reviews from each venue's Google Business Profile."
      />

      <section className="container-bs py-16">
        <div className="overflow-hidden border border-stone2-900/15 bg-white">
          <div className="grid md:grid-cols-[280px,1fr]">
            {/* Filters / legend */}
            <aside className="border-b border-stone2-900/10 p-6 md:border-b-0 md:border-r">
              <p className="cine-label text-corten-700">Filter by</p>
              <ul className="mt-5 space-y-3 text-sm">
                {sections.map((s) => (
                  <li key={s.key}>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-corten-500"
                      />
                      <span
                        aria-hidden="true"
                        className="inline-block h-3 w-3 rounded-sm"
                        style={{ background: dotColor(s.key) }}
                      />
                      <span className="font-medium">{s.label}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <p className="cine-label mt-8 text-corten-700">Legend</p>
              <p className="mt-2 text-xs leading-relaxed text-stone2-500">
                Markers are shape-coded in addition to color, so visitors with
                color-vision differences can still distinguish categories
                (WCAG 1.4.1).
              </p>
            </aside>

            {/* Map canvas */}
            <div className="relative min-h-[480px]">
              <iframe
                title="Map of Big Spring, Texas"
                loading="lazy"
                src="https://www.google.com/maps?q=Big%20Spring%2C%20TX&output=embed"
                className="absolute inset-0 h-full w-full"
              />
              {/* Corner watermark */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-sm bg-white/90 px-3 py-1 backdrop-blur">
                <span className="slab text-[10px] tracking-[0.25em] text-stone2-900">
                  Big Spring · Howard Co., TX
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapped listings */}
      <section className="container-bs pb-24">
        <div className="flex items-end justify-between">
          <div>
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-5 text-corten-700">Mapped · {businesses.length} stops</p>
            <h2 className="monument mt-3 text-[clamp(2rem,4vw,3rem)]">
              All the pins.
            </h2>
          </div>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <li
              key={b.slug}
              className="flex items-start gap-3 border border-stone2-900/10 bg-white p-4"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-sm"
                style={{ background: dotColor(b.category) }}
              />
              <div className="min-w-0">
                <p className="truncate font-display text-lg">{b.name}</p>
                <p className="truncate text-xs text-stone2-500">{b.address}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function dotColor(k: string) {
  const map: Record<string, string> = {
    stay: "#2f6d92",
    "eat-drink": "#b85c3a",
    explore: "#6a8363",
    history: "#846b36",
    events: "#8a3e23",
  };
  return map[k] ?? "#7b7566";
}
