import Link from "next/link";
import { type Event, formatEventDate } from "@/lib/data";

export default function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-stone2-900/10 bg-white transition hover:border-corten-500/50">
      <Link href={`/events/${event.slug}`} className="block focus:outline-none">
        <div className="relative">
          <div
            className="aspect-[4/3] w-full bg-stone2-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
            role="img"
            aria-label={event.title}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,20,0) 40%, rgba(11,10,20,0.7) 100%)",
            }}
          />
          <span className="absolute bottom-4 left-4 slab text-[10px] tracking-[0.25em] text-limestone-50">
            {formatEventDate(event)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight">
          <Link
            href={`/events/${event.slug}`}
            className="transition group-hover:text-corten-700"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone2-700">
          {event.summary}
        </p>
        <p className="mt-5 border-t border-stone2-900/10 pt-4 text-xs text-stone2-500">
          {event.location}
        </p>
      </div>
    </article>
  );
}
