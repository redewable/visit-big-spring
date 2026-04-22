import PageHero from "@/components/PageHero";
import WeatherChip from "@/components/WeatherChip";
import MapClient from "./MapClient";
import { businesses } from "@/lib/data";

export const metadata = {
  title: "Interactive Map — Plan your route",
  description:
    "Explore Big Spring attractions, restaurants, hotels and event venues on the interactive map — filterable by category, with live weather.",
};

export default function MapPage() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <>
      <PageHero
        eyebrow="The map"
        title="One map. Every stop."
        subtitle="Filter by category. Plot a route. Every pin opens a full listing."
      />

      {/* Places count + live weather */}
      <section className="container-bs pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="cine-label text-corten-700">
            {businesses.length} places mapped
          </p>
          <WeatherChip tone="light" />
        </div>
      </section>

      <section className="container-bs py-10">
        <MapClient token={token} businesses={businesses} />
      </section>

      {/* Full listing for SEO + a11y fallback */}
      <section className="container-bs pb-24">
        <div className="flex items-end justify-between">
          <div>
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-5 text-corten-700">
              All pins · {businesses.length} stops
            </p>
            <h2 className="monument mt-3 text-[clamp(2rem,4vw,3rem)]">
              Everything on the map.
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
                <p className="truncate font-display text-lg">
                  <a
                    href={`/businesses/${b.slug}`}
                    className="hover:text-corten-700"
                  >
                    {b.name}
                  </a>
                </p>
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
    "eat-drink": "#B85C3A",
    explore: "#6a8363",
    history: "#846b36",
    events: "#8a3e23",
  };
  return map[k] ?? "#7b7566";
}
