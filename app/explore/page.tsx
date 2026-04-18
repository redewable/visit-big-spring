import PageHero from "@/components/PageHero";
import BusinessCard from "@/components/BusinessCard";
import { businessesByCategory } from "@/lib/data";

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
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=70"
      />
      <section className="container-bs py-20 md:py-28">
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
