import Link from "next/link";
import { notFound } from "next/navigation";
import { businessBySlug, businesses } from "@/lib/data";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = businessBySlug(slug);
  if (!b) return { title: "Listing not found" };
  return { title: b.name, description: b.blurb };
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const biz = businessBySlug(slug);
  if (!biz) notFound();

  // Schema.org LocalBusiness — supports RFP's Schema Markup + Google Business tie-in
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    description: biz.blurb,
    address: biz.address,
    telephone: biz.phone,
    url: biz.website,
    image: biz.image,
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
        <div className="container-bs -mt-24 pb-16">
          <div className="rounded-3xl bg-white p-8 shadow-card md:p-12">
            <p className="eyebrow">{categoryLabel(biz.category)}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{biz.name}</h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {biz.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-stone2-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-lg text-stone2-700">{biz.blurb}</p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <Detail label="Address" value={biz.address} />
              {biz.phone && <Detail label="Phone" value={biz.phone} href={`tel:${biz.phone}`} />}
              {biz.website && <Detail label="Website" value={biz.website} href={biz.website} />}
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
      <dt className="text-xs uppercase tracking-widest text-stone2-500">{label}</dt>
      <dd className="mt-1">
        {href ? (
          <a href={href} className="text-mesa-700 hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function categoryLabel(c: string) {
  const map: Record<string, string> = {
    stay: "Stay",
    "eat-drink": "Eat & Drink",
    explore: "Explore",
    history: "History",
    events: "Events",
  };
  return map[c] ?? c;
}
