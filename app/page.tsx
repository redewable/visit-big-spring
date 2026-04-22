import Link from "next/link";
import EventCard from "@/components/EventCard";
import BusinessCard from "@/components/BusinessCard";
import WeatherChip from "@/components/WeatherChip";
import { sections, upcomingEvents, businesses, venues } from "@/lib/data";

export default async function HomePage() {
  const featuredEvents = upcomingEvents(3);
  const featuredPlaces = businesses.slice(0, 3);

  return (
    <>
      {/* ================================================================ */}
      {/* HERO — monumental, cinematic, mobile-first                        */}
      {/* ================================================================ */}
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-[#0b0a14] text-limestone-50"
      >
        {/* Real CVB photography — Scenic Mountain at dusk, wind-turbine ridge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/assets/venues/sunset-wind-turbines.jpeg)",
          }}
        />
        {/* Dark-to-ground wash for type legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,10,20,0.65) 0%, rgba(11,10,20,0.25) 38%, rgba(11,10,20,0.55) 72%, rgba(11,10,20,0.88) 100%)",
          }}
        />

        <div className="container-bs flex min-h-[88vh] flex-col justify-end pb-12 pt-24 sm:min-h-[92vh] sm:pb-16 md:pb-20 md:pt-28">
          <p className="cine-label text-limestone-50/80">
            EST. <span className="slab">1882</span> · The Crossroads of West Texas
          </p>

          <h1
            id="hero-title"
            className="monument mt-5 text-[clamp(3.5rem,16vw,12rem)] text-white"
          >
            BIG<br />SPRING
          </h1>

          <p className="mt-7 max-w-[30ch] text-base leading-relaxed text-limestone-50/85 sm:max-w-xl sm:text-lg md:text-xl md:leading-relaxed">
            Mesa sunsets. Wind-turbine horizons. A spring that fed mastodons.
            Where the Caprock meets Interstate&nbsp;20.
          </p>

          <div className="mt-8">
            <WeatherChip tone="dark" showSuggestion />
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/itinerary" className="btn-primary">
              Plan your trip
              <Arrow />
            </Link>
            <Link
              href="/events"
              className="btn-ghost !border-white/30 !text-white hover:!bg-white/10"
            >
              Events
            </Link>
          </div>

          {/* Spec strip — single line, confident */}
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-limestone-50/20 pt-6 text-[11px] text-limestone-50/70 sm:gap-x-10">
            <span className="cine-label">
              HOWARD CO · <span className="slab">TX</span>
            </span>
            <Spacer />
            <span className="cine-label">
              I-20 <span className="slab">×</span> U.S.<span className="slab"> 87</span>
            </span>
            <Spacer />
            <span className="cine-label">ELEV. <span className="slab">2,405 ft</span></span>
            <Spacer className="hidden sm:inline-block" />
            <span className="hidden cine-label sm:inline">STATE PARK <span className="slab">382 ac</span></span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTERMISSION — Dune moment. One line. Negative space.             */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-[#0b0a14] py-28 text-limestone-50 sm:py-36">
        {/* Faint grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(rgba(168,88,46,0.25), transparent 70%)",
          }}
        />
        <div className="container-bs relative">
          <div className="max-w-4xl">
            <span className="tick-rule block text-corten-400" />
            <p className="mt-8 font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-[500] leading-[1.15] text-limestone-50">
              &ldquo;As a midpoint in West Texas, Big Spring delivers a mixture
              of yesterday, today, and tomorrow that welcomes the native and
              the newcomer alike.&rdquo;
            </p>
            <p className="cine-label mt-8 text-limestone-50/60">
              — The Official Visitor Guide
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PATHWAYS — vintage title-card stamps                              */}
      {/* ================================================================ */}
      <section aria-labelledby="pathways-title" className="bg-sand-50 py-20 md:py-28">
        <div className="container-bs">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="tick-rule block text-corten-500" />
              <p className="cine-label mt-5 text-corten-700">Five ways in</p>
              <h2
                id="pathways-title"
                className="monument mt-4 text-[clamp(2.5rem,6vw,4.5rem)]"
              >
                Where do you<br />start?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-stone2-700">
              Chase a sunset over Scenic Mountain. Hunt a historical-commission
              marker. Book a tee time. Order enchiladas. Pick a thread.
            </p>
          </div>

          <ul className="mt-16 grid gap-0 border-y border-stone2-900/15 md:grid-cols-5">
            {sections.map((s, i) => (
              <li
                key={s.key}
                className="border-b border-stone2-900/10 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <Link
                  href={s.href}
                  className="group block p-8 transition hover:bg-sand-100 focus:outline-none md:min-h-[260px]"
                >
                  <span className="slab text-[11px] tracking-[0.3em] text-corten-600">
                    № 0{i + 1}
                  </span>
                  <h3 className="monument mt-4 text-4xl text-stone2-900 md:text-3xl lg:text-4xl">
                    {s.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone2-700">
                    {s.tagline}
                  </p>
                  <span className="cine-label mt-6 inline-flex items-center gap-2 text-corten-700 transition group-hover:translate-x-1">
                    Enter <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================ */}
      {/* OLDER THAN TEXAS — corten panel, improved scale & type            */}
      {/* ================================================================ */}
      <section
        aria-labelledby="ancient-title"
        className="relative overflow-hidden bg-corten-700 py-24 text-limestone-50 md:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 80% at 25% 15%, rgba(255,180,100,0.3), transparent 70%), radial-gradient(50% 60% at 85% 95%, rgba(0,0,0,0.55), transparent 70%)",
          }}
        />
        <div className="container-bs relative grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <span className="tick-rule block text-limestone-100/70" />
            <p className="cine-label mt-5 text-limestone-100/80">
              The year · <span className="slab">1535</span>
            </p>
            <p
              className="monument mt-4 leading-none text-limestone-100"
              style={{ fontSize: "clamp(5rem, 16vw, 12rem)" }}
            >
              1535
            </p>
            <p className="cine-label mt-4 text-limestone-100/70">
              Cabeza de Vaca · crossed the Caprock
            </p>
          </div>
          <div className="md:col-span-7 md:pt-4">
            <h2
              id="ancient-title"
              className="monument text-[clamp(2.25rem,5.5vw,4rem)]"
            >
              Older than Texas.<br />
              <span className="italic font-[500] text-limestone-100/80">Older than most things.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-limestone-50/90 md:text-lg">
              Remains of mastodon, wooly mammoth, and saber-toothed tiger have
              been found near the spring. It was already the best water in
              West Texas before there <em>was</em> a West Texas.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-limestone-50/90 md:text-lg">
              Cabeza de Vaca noted it in 1535. Captain Randolph Marcy camped
              here in 1849. The Comanche gathered here on the Great Comanche
              War Trail. The railroad followed. The Bankhead Highway followed
              the railroad. I-20 followed the highway.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/history"
                className="btn-primary !bg-limestone-50 !text-corten-700 hover:!bg-limestone-100"
              >
                The eight stages
              </Link>
              <Link
                href="/businesses/historic-spring"
                className="btn-ghost !border-limestone-50/40 !text-limestone-50 hover:!bg-limestone-50/10"
              >
                Visit the spring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED EVENTS                                                   */}
      {/* ================================================================ */}
      <section aria-labelledby="events-title" className="bg-limestone-50 py-20 md:py-28">
        <div className="container-bs">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="tick-rule block text-corten-500" />
              <p className="cine-label mt-5 text-corten-700">Happening soon</p>
              <h2
                id="events-title"
                className="monument mt-4 text-[clamp(2.25rem,5vw,3.75rem)]"
              >
                This season<br />in Big Spring.
              </h2>
            </div>
            <Link href="/events" className="btn-ghost">
              The full calendar <Arrow />
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredEvents.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE SPRING — austere typographic moment, no illustration          */}
      {/* ================================================================ */}
      <section aria-labelledby="spring-title" className="bg-stone2-900 py-24 text-limestone-50 md:py-32">
        <div className="container-bs grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="tick-rule block text-corten-400" />
            <p className="cine-label mt-5 text-corten-400">Sulphur Draw</p>
            <h2
              id="spring-title"
              className="monument mt-4 text-[clamp(2.5rem,6.5vw,5rem)]"
            >
              The spring<br />
              that named{" "}
              <span className="italic font-[500]">a town.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-limestone-50/85 md:text-lg">
              A reliable spring in a rocky gorge, where the Edwards Plateau
              and the Caprock converge. For ten thousand years it pulled
              humans and animals out of the plain. In 2019 the Convention
              &amp; Visitors Bureau restored the site: eight corten-metal
              story boards on limestone, two observation decks, and a
              1,000-seat plaza.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/history"
                className="btn-primary !bg-limestone-50 !text-stone2-900 hover:!bg-limestone-100"
              >
                Read our history
              </Link>
              <Link href="/map" className="btn-ghost !border-limestone-50/30 !text-limestone-50 hover:!bg-limestone-50/10">
                See the map
              </Link>
            </div>
          </div>

          {/* Typographic panel — three moments, each with context */}
          <aside className="md:col-span-5">
            <div
              className="relative overflow-hidden border border-corten-700/60 bg-[#120808]"
              aria-hidden="true"
            >
              {/* Soft corten wash anchored bottom-right */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 70% at 80% 90%, rgba(168,88,46,0.35), transparent 70%)",
                }}
              />
              <div className="relative p-8 md:p-10">
                <span className="cine-label text-limestone-50/60">
                  Visited · Noted · Restored
                </span>

                <ol className="mt-8 divide-y divide-limestone-50/10">
                  <DateRow
                    era="XVI"
                    year="1535"
                    title="Cabeza de Vaca"
                    context="Noted the spring on his overland crossing."
                  />
                  <DateRow
                    era="XIX"
                    year="1849"
                    title="Captain Marcy"
                    context="Camped here on the Overland Trail to California."
                  />
                  <DateRow
                    era="XXI"
                    year="2019"
                    title="CVB Restoration"
                    context="Eight corten-metal story boards on limestone."
                  />
                </ol>

                <div className="mt-8 flex items-center justify-between border-t border-limestone-50/10 pt-5">
                  <span className="cine-label text-limestone-50/55">
                    Comanche Trail Park
                  </span>
                  <span className="slab text-[10px] uppercase tracking-[0.22em] text-limestone-50/40">
                    32.21° N · -101.48° W
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================================================================ */}
      {/* LOCAL FAVORITES                                                    */}
      {/* ================================================================ */}
      <section aria-labelledby="places-title" className="bg-sand-50 py-20 md:py-28">
        <div className="container-bs">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="tick-rule block text-corten-500" />
              <p className="cine-label mt-5 text-corten-700">Local favorites</p>
              <h2
                id="places-title"
                className="monument mt-4 text-[clamp(2.25rem,5vw,3.75rem)]"
              >
                Where locals send<br />out-of-towners.
              </h2>
            </div>
            <Link href="/explore" className="btn-ghost">
              More places <Arrow />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredPlaces.map((b) => (
              <li key={b.slug}>
                <BusinessCard biz={b} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================ */}
      {/* #SUNSETBIGSPRING — monumental typographic moment                  */}
      {/* ================================================================ */}
      <section
        aria-labelledby="sunset-title"
        className="relative overflow-hidden bg-[#1a1324] py-24 text-limestone-50 md:py-36"
      >
        {/* Real CVB Sunset Big Spring artwork behind the type */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-85"
          style={{
            backgroundImage: "url(/assets/brand/sunset-big-spring-art.png)",
          }}
        />
        {/* Wash for legibility — darker at top, clearer toward the horizon */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,19,36,0.55) 0%, rgba(26,19,36,0.15) 45%, rgba(26,19,36,0.45) 100%)",
          }}
        />
        <div className="container-bs relative text-center">
          <p className="cine-label text-limestone-50/80">#SUNSETBIGSPRING</p>
          <h2
            id="sunset-title"
            className="monument mx-auto mt-6 leading-[0.85] text-limestone-50"
            style={{ fontSize: "clamp(4rem, 18vw, 15rem)" }}
          >
            SUNSET
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-limestone-50/90 md:text-lg">
            Two hundred feet above the plain, Scenic Mountain turns every
            evening into a show. A canvas of colors in the sky.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/events/sunset-big-spring"
              className="btn-primary !bg-limestone-50 !text-stone2-900 hover:!bg-limestone-100"
            >
              Join a sunset walk
            </Link>
            <a
              href="https://www.instagram.com/explore/tags/sunsetbigspring/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !border-limestone-50/40 !text-limestone-50 hover:!bg-limestone-50/10"
            >
              See the hashtag
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MEETINGS CTA — capacity matrix                                    */}
      {/* ================================================================ */}
      <section aria-labelledby="mtg-title" className="bg-limestone-50 py-20 md:py-28">
        <div className="container-bs">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <span className="tick-rule block text-corten-500" />
              <p className="cine-label mt-5 text-corten-700">
                04 · Meet in Big Spring
              </p>
              <h2
                id="mtg-title"
                className="monument mt-4 text-[clamp(2.25rem,5vw,3.75rem)]"
              >
                Meetings built at<br />West Texas scale.
              </h2>
              <p className="mt-6 max-w-md text-stone2-700">
                One mesa-top amphitheater. A 90,000 square-foot coliseum. A
                restored 1930 grand ballroom. Seven venues from 250 guests
                to 6,000 — all bookable through the CVB.
              </p>
              <Link href="/meetings" className="btn-primary mt-8">
                Plan an event <Arrow />
              </Link>
            </div>

            {/* Mini capacity matrix — 4 top-tier venues */}
            <ol className="md:col-span-7 border-t border-stone2-900/15">
              {venues
                .slice()
                .sort((a, b) => b.capacity - a.capacity)
                .slice(0, 4)
                .map((v, i) => (
                  <li
                    key={v.slug}
                    className="grid grid-cols-[auto,1fr,auto] items-baseline gap-4 border-b border-stone2-900/15 py-5 md:grid-cols-[auto,1fr,auto,auto] md:gap-6 md:py-7"
                  >
                    <span className="slab text-xs tracking-[0.25em] text-corten-600">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-xl md:text-2xl">
                        {v.name}
                      </span>
                      <span className="cine-label mt-1 block text-stone2-500">
                        {v.setting}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-10 bg-stone2-900/20 md:inline-block"
                    />
                    <span className="text-right">
                      <span className="font-display text-3xl text-corten-700 md:text-4xl">
                        {v.capacity.toLocaleString()}
                      </span>
                      <span className="slab ml-2 text-[10px] uppercase tracking-[0.22em] text-stone2-500">
                        seats
                      </span>
                    </span>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ITINERARY — cleaner, single-color                                 */}
      {/* ================================================================ */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container-bs">
          <div className="border border-stone2-900/15 bg-white p-8 md:p-14 lg:p-20">
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <span className="tick-rule block text-corten-500" />
                <p className="cine-label mt-5 text-corten-700">The trip planner</p>
                <h2 className="monument mt-4 text-[clamp(2rem,5vw,3.5rem)]">
                  Build a weekend<br />you&apos;ll remember.
                </h2>
                <p className="mt-6 max-w-md text-stone2-700">
                  Pick attractions, add places to eat, reorder the day.
                  Save it, print it, text the share link to your travel crew.
                </p>
                <Link href="/itinerary" className="btn-primary mt-8">
                  Start planning <Arrow />
                </Link>
              </div>
              <ol className="md:col-span-6 space-y-0 border-t border-stone2-900/10">
                {[
                  { n: "01", label: "Scenic Drive overlook", time: "Day 1 · Sunrise" },
                  { n: "02", label: "Heritage Museum", time: "Day 1 · Midday" },
                  { n: "03", label: "Settles Grill", time: "Day 1 · Evening" },
                  { n: "04", label: "Hangar 25 Air Museum", time: "Day 2 · Morning" },
                ].map((r) => (
                  <li
                    key={r.n}
                    className="flex items-baseline justify-between gap-4 border-b border-stone2-900/10 py-4"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="slab text-xs tracking-[0.25em] text-corten-600">
                        {r.n}
                      </span>
                      <span className="font-display text-xl md:text-2xl">
                        {r.label}
                      </span>
                    </div>
                    <span className="cine-label text-stone2-500">{r.time}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DateRow({
  era,
  year,
  title,
  context,
}: {
  era: string;
  year: string;
  title: string;
  context: string;
}) {
  return (
    <li className="grid grid-cols-[auto,1fr] items-baseline gap-x-5 py-5 first:pt-0">
      <span className="slab text-xs tracking-[0.22em] text-corten-400">
        {era}
      </span>
      <span className="flex items-baseline gap-3">
        <span className="font-display text-4xl font-[500] text-limestone-50 md:text-5xl">
          {year}
        </span>
        <span className="font-display text-sm text-limestone-50/70">
          {title}
        </span>
      </span>
      <span aria-hidden="true" />
      <span className="mt-1 text-sm text-limestone-50/70">{context}</span>
    </li>
  );
}

function Spacer({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[1px] w-6 bg-limestone-50/40 ${className}`}
    />
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
