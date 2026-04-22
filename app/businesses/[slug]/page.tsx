import Link from "next/link";
import { notFound } from "next/navigation";
import { businessBySlug, businesses, googleMapsUrl } from "@/lib/data";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = businessBySlug(slug);
  if (!b) return { title: "Listing not found" };
  return { title: b.name, description: b.blurb };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const biz = businessBySlug(slug);
  if (!biz) notFound();

  const isEditor = biz.tier === "editors-pick";
  const isHeritage = biz.tier === "heritage-member";

  // Schema.org LocalBusiness
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    description: biz.blurb,
    address: biz.address,
    telephone: biz.phone,
    url: biz.website,
    image: biz.image,
    geo: {
      "@type": "GeoCoordinates",
      latitude: biz.lat,
      longitude: biz.lng,
    },
  };

  return (
    <>
      <article>
        <div
          className="aspect-[16/7] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${biz.image})` }}
          role="img"
          aria-label={biz.name}
        />
        <div className="container-bs -mt-24 pb-20">
          <div className="border border-stone2-900/10 bg-white p-8 shadow-card md:p-14">
            <p className="cine-label text-corten-700">{categoryLabel(biz.category)}</p>

            <h1 className="monument mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">
              {isEditor && <StarInline />}
              {biz.name}
            </h1>

            {isEditor && (
              <p className="mt-2 font-display text-lg italic text-corten-700">
                An Editor&apos;s Pick — locally loved.
              </p>
            )}
            {isHeritage && (
              <p className="slab mt-2 text-xs uppercase tracking-[0.25em] text-corten-700">
                Heritage Member
              </p>
            )}

            {/* Editorial block, only for Editor's Pick + Heritage Member */}
            {(isEditor || isHeritage) && biz.editorial && (
              <aside className="mt-8 border-l-2 border-corten-500 bg-sand-50 p-6 md:p-7">
                <p className="font-display text-lg italic leading-relaxed text-stone2-900">
                  {biz.editorial}
                </p>
                {isHeritage && (
                  <p className="mt-4 text-xs text-stone2-600">
                    <Link
                      href="/about/how-this-site-works#heritage"
                      className="underline decoration-corten-500 underline-offset-4 hover:text-corten-700"
                    >
                      What is a Heritage Member?
                    </Link>
                  </p>
                )}
              </aside>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {biz.tags.map((t) => (
                <span
                  key={t}
                  className="border border-stone2-900/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone2-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-stone2-700 md:text-lg">
              {biz.blurb}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <Detail
                label="Address"
                value={biz.address}
                href={googleMapsUrl(biz)}
              />
              {biz.phone && (
                <Detail label="Phone" value={biz.phone} href={`tel:${biz.phone}`} />
              )}
              {biz.website && (
                <Detail label="Website" value={biz.website} href={biz.website} />
              )}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/itinerary" className="btn-primary">
                Add to itinerary
              </Link>
              <Link href={`/map?focus=${biz.slug}`} className="btn-ghost">
                See on map
              </Link>
            </div>
          </div>
        </div>
      </article>

      {biz.gallery && biz.gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="bg-sand-50 py-20 md:py-28">
          <div className="container-bs">
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-5 text-corten-700">Gallery</p>
            <h2
              id="gallery-title"
              className="monument mt-3 text-[clamp(2rem,4.5vw,3.25rem)]"
            >
              More from {biz.name}.
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {biz.gallery.map((src, i) => (
                <li
                  key={src}
                  className={
                    // Break the rhythm — every 5th photo spans 2 cols on lg
                    i % 5 === 0
                      ? "lg:col-span-2 lg:row-span-2"
                      : ""
                  }
                >
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden border border-stone2-900/10 bg-stone2-100 bg-cover bg-center transition hover:border-corten-500/50"
                    style={{ backgroundImage: `url(${src})` }}
                    role="img"
                    aria-label={`${biz.name} — photograph ${i + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt className="slab text-[10px] tracking-[0.22em] text-stone2-500">
        {label.toUpperCase()}
      </dt>
      <dd className="mt-1 font-display text-lg">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-corten-700 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function StarInline() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      aria-label="Editor's Pick"
      role="img"
      className="mr-3 inline-block align-[-2px]"
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
