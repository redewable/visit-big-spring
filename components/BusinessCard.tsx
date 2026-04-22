import Link from "next/link";
import type { Business } from "@/lib/data";
import { splitAddress } from "@/lib/addr";

/**
 * Card treatments:
 *   - standard: no extra chrome
 *   - editors-pick: small filled star (mesa) next to the name + italic caption
 *   - heritage-member: terracotta dot + thin mesa-tinted border + caption
 *
 * Color is never the only indicator — both tiers always include text
 * captions (WCAG 1.4.1).
 */
export default function BusinessCard({ biz }: { biz: Business }) {
  const isEditor = biz.tier === "editors-pick";
  const isHeritage = biz.tier === "heritage-member";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border bg-white transition hover:border-corten-500/50 ${
        isHeritage ? "border-corten-500/50" : "border-stone2-900/10"
      }`}
    >
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
          {isHeritage && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 border border-limestone-50/70 bg-corten-500/85 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-limestone-50 backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-limestone-50"
              />
              Heritage
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start gap-2 font-display text-2xl leading-tight">
          {isEditor && <StarIcon />}
          <Link
            href={`/businesses/${biz.slug}`}
            className="transition group-hover:text-corten-700"
          >
            {biz.name}
          </Link>
        </h3>
        {isEditor && (
          <p className="mt-1 font-display text-sm italic text-corten-700">
            An Editor&apos;s Pick — locally loved.
          </p>
        )}
        {isHeritage && (
          <p className="slab mt-1 text-[10px] uppercase tracking-[0.2em] text-corten-700">
            Heritage Member
          </p>
        )}

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
        <address className="mt-5 not-italic border-t border-stone2-900/10 pt-4 text-xs leading-relaxed text-stone2-500">
          {(() => {
            const { street, cityState } = splitAddress(biz.address);
            return (
              <>
                <span className="block">{street}</span>
                {cityState && <span className="block">{cityState}</span>}
              </>
            );
          })()}
        </address>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-label="Editor's Pick"
      role="img"
      className="mt-[10px] shrink-0"
    >
      <path
        d="M12 2.5 L14.5 9 L21.5 9.5 L16 14 L18 21 L12 17 L6 21 L8 14 L2.5 9.5 L9.5 9 Z"
        fill="#B85C3A"
      />
    </svg>
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
