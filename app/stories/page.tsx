import Link from "next/link";
import { stories } from "@/lib/data";

export const metadata = {
  title: "Stories — Essays on Big Spring",
  description:
    "Long-form essays on the Historic Spring, Big Spring's aviation heritage, and the outdoors beyond I-20.",
};

export default function StoriesIndexPage() {
  const sorted = [...stories].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <>
      <section className="bg-sand-50 py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">Stories</p>
          <h1 className="monument mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">
            Essays on <span className="italic font-[500]">Big Spring.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone2-700 md:text-lg">
            Place-grounded, warm, honest. Written by the CVB editorial team — no
            press release voice, no SEO padding.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-bs">
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/stories/${s.slug}`}
                  className="group block focus:outline-none"
                >
                  <div
                    className="aspect-[4/3] w-full border border-stone2-900/10 bg-cover bg-center transition group-hover:border-corten-500/50"
                    style={{ backgroundImage: `url(${s.image})` }}
                    role="img"
                    aria-label={s.title}
                  />
                  <p className="slab mt-6 text-[10px] tracking-[0.25em] text-corten-700">
                    {s.readMinutes} MIN READ
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight transition group-hover:text-corten-700 md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone2-700">
                    {s.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
