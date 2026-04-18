import Link from "next/link";
import { notFound } from "next/navigation";
import { eventBySlug, events, formatEventDate } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = eventBySlug(slug);
  if (!e) return { title: "Event not found" };
  return { title: e.title, description: e.summary };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  // Schema.org Event markup — RFP calls out Schema Markup under SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    endDate: event.endDate,
    location: { "@type": "Place", name: event.location, address: event.location },
    description: event.description,
    image: event.image,
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <article>
        <div
          className="aspect-[16/7] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
          role="img"
          aria-label={event.title}
        />
        <div className="container-bs -mt-24 pb-16">
          <div className="rounded-3xl bg-white p-8 shadow-card md:p-12">
            <p className="eyebrow">{formatEventDate(event)}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{event.title}</h1>
            <p className="mt-2 text-stone2-700">{event.location}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {event.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-stone2-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-lg text-stone2-700">{event.description}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/itinerary" className="btn-primary">
                Add to itinerary
              </Link>
              <Link href={`/map?focus=${event.slug}`} className="btn-ghost">
                See on map
              </Link>
              <a
                href={`data:text/calendar;charset=utf-8,${icsFor(event)}`}
                download={`${event.slug}.ics`}
                className="btn-ghost"
              >
                Add to calendar
              </a>
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

function icsFor(e: { title: string; date: string; endDate?: string; location: string }) {
  const dtStart = toIcsDate(e.date);
  const dtEnd = toIcsDate(e.endDate ?? e.date);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${e.title}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `LOCATION:${e.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return encodeURIComponent(body);
}

function toIcsDate(d: string) {
  return new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
