import PageHero from "@/components/PageHero";
import BusinessCard from "@/components/BusinessCard";
import WeatherChip from "@/components/WeatherChip";
import { businessesByCategory } from "@/lib/data";

// Big Spring State Park mesa — the weather readers come from this location
// (on top of Scenic Mountain) rather than downtown Big Spring, since this
// is the Explore page.
const STATE_PARK_LAT = 32.2285;
const STATE_PARK_LNG = -101.4902;

export const metadata = {
  title: "Explore — Parks, outdoor recreation, scenic drives",
  description:
    "Big Spring State Park, Comanche Trail Park, 18 holes of golf, the Sandhill Crane Observatory, and the 6,000-seat CCC amphitheater.",
};

export default function ExplorePage() {
  const items = businessesByCategory("explore");
  return (
    <>
      <PageHero
        eyebrow="03 · Explore"
        title="Mesas, lakes, tee boxes and trails."
        subtitle="A 382-acre state park on a mesa top, a 136-acre CCC-built recreation park with a 6,000-seat amphitheater, 18 holes of mesquite-lined golf — and a sandhill crane observatory for late October."
        accent="obsidian"
        image="/assets/venues/big-spring-state-park-sunset.png"
      />
      <section className="container-bs py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="cine-label text-corten-700">
            {items.length} places · Big Spring &amp; Howard County
          </p>
          <WeatherChip
            tone="light"
            showSuggestion
            label="Scenic Mountain · Now"
            lat={STATE_PARK_LAT}
            lng={STATE_PARK_LNG}
          />
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <li key={b.slug}>
              <BusinessCard biz={b} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
