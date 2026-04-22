import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import EventsFilters from "@/components/EventsFilters";
import { SunRule } from "@/components/Icons";
import { upcomingEvents } from "@/lib/data";

export const metadata = {
  title: "Events — Festivals, rodeos & holiday lights",
  description:
    "The Big Spring event calendar: Pops in the Park, Howard County Fair & Rodeo, Comanche Warrior Triathlon, Festival of Lights, and more.",
};

// Annual recurring events pulled from the CVB's official Visitor Guide.
// These are the drumbeats of the Big Spring year — shown alongside the
// dated event cards because visitors plan trips against this rhythm.
const annualCalendar: { month: string; events: string[] }[] = [
  {
    month: "January",
    events: [
      "Fraternal Order of Eagles Chili Cook-Off",
      "Hangar 25 Silver Wings Ball Museum Fundraiser",
    ],
  },
  {
    month: "February",
    events: [
      "Big Spring Symphony Orchestra Concert",
      "Run2Love2Run 5K",
    ],
  },
  {
    month: "March",
    events: [
      "Big Spring Prospector Club Gem &amp; Mineral Show",
      "Rotary Kids Trout Fishing Contest",
      "Tastes of the Symphony",
      "Pints for Polio",
    ],
  },
  {
    month: "April",
    events: [
      "Howard College Rodeo",
      "West Texas Disc Golf Championships",
      "State Park \"Master the Mountain\" Run/Walk",
      "Cars, Stars and Handlebars",
    ],
  },
  {
    month: "May",
    events: [
      "Cinco de Mayo Celebration",
      "Relay For Life",
      "Hangar 25 Memorial Day Celebration",
    ],
  },
  {
    month: "June",
    events: [
      "Cowboy Reunion &amp; PBRCA Sanctioned Rodeo",
      "Stargazing at Scenic Mountain State Park",
      "Juneteenth Celebration",
      "Downtown \"Funtastic Fourth Festival\"",
    ],
  },
  {
    month: "July",
    events: [
      "Pops in the Park — Patriotic Music &amp; Fireworks (July 3)",
    ],
  },
  {
    month: "August",
    events: ["United Way Kick-Off"],
  },
  {
    month: "September",
    events: [
      "Comanche Warrior Triathlon",
      "Howard County Fair",
      "Big Spring Symphony Orchestra Concert",
    ],
  },
  {
    month: "October",
    events: [
      "Pioneer Pumpkin Patch at the Potton House",
      "Ag Expo",
      "Prairie Dog Fly-In Breakfast",
      "Sandhill Crane migration viewing (late October)",
    ],
  },
  {
    month: "November",
    events: [
      "Alzheimer's Candlelight Vigil",
      "Christmas Tree Forest at the Heritage Museum",
    ],
  },
  {
    month: "December",
    events: [
      "Big Spring Herald Christmas Parade",
      "First United Methodist \"Living Christmas Tree\"",
      "Howard College Luminaria",
      "Comanche Trail Festival of Lights",
      "Big Spring Symphony Orchestra Concert",
    ],
  },
];

export default function EventsPage() {
  const items = upcomingEvents();
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Festivals, rodeos, and small-town holidays."
        subtitle="Symphony nights. Howard County rodeos. Pops in the Park every July 3rd. Festival of Lights through the holidays."
      />

      {/* Filter row */}
      <section className="container-bs py-10">
        <EventsFilters />
      </section>

      {/* Dated / featured events */}
      <section className="container-bs pb-20">
        <SunRule className="h-5 w-28 text-corten-500" />
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Upcoming</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <li key={e.slug}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      </section>

      {/* Annual calendar — the drumbeat of the Big Spring year */}
      <section
        aria-labelledby="annual-title"
        className="border-t border-corten-700/20 bg-limestone-50 py-20"
      >
        <div className="container-bs">
          <SunRule className="h-5 w-28 text-corten-500" />
          <p className="eyebrow mt-4">Every year, on repeat</p>
          <h2 id="annual-title" className="mt-3 font-display text-3xl md:text-5xl">
            The Big Spring calendar year.
          </h2>
          <p className="mt-4 max-w-2xl text-stone2-700">
            Beyond one-off concerts and festivals, Big Spring runs on a reliable
            annual rhythm of community events. Plan a visit around any of these.
          </p>

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {annualCalendar.map((m) => (
              <li
                key={m.month}
                className="rounded-sm border border-corten-700/15 bg-white p-6"
              >
                <div className="flex items-baseline justify-between">
                  <p className="slab text-[11px] uppercase tracking-[0.25em] text-corten-700">
                    {m.month}
                  </p>
                  <span className="font-display text-3xl text-corten-500">
                    {m.events.length}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-stone2-700">
                  {m.events.map((name) => (
                    <li key={name} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-corten-500"
                      />
                      <span dangerouslySetInnerHTML={{ __html: name }} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
