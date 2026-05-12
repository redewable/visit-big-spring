import PageHero from "@/components/PageHero";
import BusinessCard from "@/components/BusinessCard";
import { businessesByCategory } from "@/lib/data";

export const metadata = {
  title: "Eat & Drink — Restaurants, cafés & bars",
  description:
    "Tex-Mex institutions, a 1930 hotel dining room, downtown cigar lounges and art-gallery-by-night bars.",
};

export default function EatDrinkPage() {
  const items = businessesByCategory("eat-drink");
  return (
    <>
      <PageHero
        eyebrow="02 · Eat & Drink"
        title="Hometown tables, long tabs."
        subtitle="Generations-old Tex-Mex. A 1930 hotel kitchen. A downtown gallery that pours after dark."
        accent="corten"
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=70"
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
