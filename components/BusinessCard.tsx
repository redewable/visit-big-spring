import Link from "next/link";
import type { Business } from "@/lib/data";

export default function BusinessCard({ biz }: { biz: Business }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-stone2-900/10 bg-white transition hover:border-corten-500/50">
      <Link
        href={`/businesses/${biz.slug}`}
        className="block focus:outline-none"
      >
        <div className="relative">
          <div
            className="aspect-[4/3] w-full bg-stone2-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${biz.image})` }}
            role="img"
            aria-label={biz.name}
          />
          <span className="absolute left-4 top-4 slab text-[10px] tracking-[0.25em] text-white drop-shadow">
            {categoryLabel(biz.category)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight">
          <Link
            href={`/businesses/${biz.slug}`}
            className="transition group-hover:text-corten-700"
          >
            {biz.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone2-700">
          {biz.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {biz.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="border border-stone2-900/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-stone2-700"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-5 border-t border-stone2-900/10 pt-4 text-xs text-stone2-500">
          {biz.address}
        </p>
      </div>
    </article>
  );
}

function categoryLabel(c: string) {
  return (
    {
      stay: "Stay",
      "eat-drink": "Eat & Drink",
      explore: "Explore",
      history: "History",
      events: "Events",
    }[c] ?? c
  );
}
