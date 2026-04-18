import PageHero from "@/components/PageHero";
import BusinessCard from "@/components/BusinessCard";
import { businessesByCategory } from "@/lib/data";

export const metadata = {
  title: "Stay — Hotels & lodging",
  description:
    "Hotels, inns and historic lodging in Big Spring, Texas. From the 1930 Hotel Settles to dependable chain stays off I-20.",
};

export default function StayPage() {
  const items = businessesByCategory("stay");
  return (
    <>
      <PageHero
        eyebrow="01 · Stay"
        title="Rest easy under a wide Texas sky."
        subtitle="Historic downtown landmarks and dependable interstate stays. Proceeds from hotel occupancy tax fund the Convention & Visitors Bureau's work — including what you're reading now."
        accent="obsidian"
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=70"
      />
      <section className="container-bs py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between">
          <p className="cine-label text-corten-700">
            {items.length} Properties · All registered with the CVB
          </p>
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
