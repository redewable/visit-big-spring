import Link from "next/link";
import { venues } from "@/lib/data";

export const metadata = {
  title: "Meetings & Event Venues",
  description:
    "From a 6,000-seat CCC amphitheater to a restored 1930 ballroom — meeting, wedding and convention venues in Big Spring, Texas.",
};

export default function MeetingsPage() {
  const sorted = [...venues].sort((a, b) => a.tier - b.tier);

  return (
    <>
      {/* =========================================================== */}
      {/* HERO — obsidian, monumental                                   */}
      {/* =========================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0b0a14] text-limestone-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 30% 20%, rgba(168,88,46,0.35), transparent 70%), radial-gradient(50% 60% at 85% 90%, rgba(47,109,146,0.28), transparent 70%)",
          }}
        />
        <div className="container-bs py-28 md:py-40">
          <span className="tick-rule block text-corten-400" />
          <p className="cine-label mt-6 text-corten-400">
            04 · Meetings & Events
          </p>
          <h1 className="monument mt-6 text-[clamp(3rem,8vw,6.5rem)] text-limestone-50">
            Meetings built<br />
            <span className="italic font-[500] text-limestone-50/85">
              at West Texas scale.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-limestone-50/85 md:text-lg">
            One mesa-top amphitheater. A 90,000 square-foot coliseum. A
            restored 1930 grand ballroom. Seven venues across Big Spring and
            Howard County, from 250 guests to 6,000 — and the Convention &amp;
            Visitors Bureau to help you land the right one.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="mailto:info@visitbigspring.com" className="btn-primary">
              Request a site visit
            </a>
            <Link
              href="#capacity"
              className="btn-ghost !border-limestone-50/30 !text-limestone-50 hover:!bg-limestone-50/10"
            >
              Compare capacity
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* REVENUE LOOP — the HOT tax story, on corten                  */}
      {/* =========================================================== */}
      <section className="bg-corten-700 py-24 text-limestone-50 md:py-32">
        <div className="container-bs grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="tick-rule block text-limestone-100/70" />
            <p className="cine-label mt-5 text-limestone-100/80">
              The revenue loop
            </p>
            <p
              className="monument mt-4 leading-none text-limestone-100"
              style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)" }}
            >
              HOT
            </p>
            <p className="slab mt-3 text-xs uppercase tracking-[0.3em] text-limestone-100/80">
              Hotel Occupancy Tax
            </p>
          </div>
          <div className="md:col-span-7 md:pt-3">
            <h2 className="monument text-[clamp(2rem,4.5vw,3.5rem)]">
              Heads in beds<br />
              pay for all of this.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-limestone-50/90 md:text-lg">
              Every hotel night booked in Big Spring contributes Hotel
              Occupancy Tax. Under Texas law, HOT revenue can only be spent on
              activities that bring more visitors — venue marketing, event
              recruitment, convention hosting, and the destination website you
              are reading right now.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-limestone-50/90 md:text-lg">
              Booking a conference here doesn&apos;t just fill a ballroom. It
              pays for the next festival, the next scenic-mountain run, and
              the next traveler who fills a room after you leave.
            </p>
            <dl className="mt-10 grid gap-6 border-t border-limestone-50/20 pt-8 sm:grid-cols-3">
              <LoopStat value="7" label="Venues in the program" />
              <LoopStat value="10k+" label="Combined capacity" />
              <LoopStat value="40+" label="Annual events hosted" />
            </dl>
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* CAPACITY MATRIX                                              */}
      {/* =========================================================== */}
      <section id="capacity" className="bg-limestone-50 py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">The capacity matrix</p>
          <h2 className="monument mt-3 text-[clamp(2rem,5vw,3.75rem)]">
            Find the right fit.
          </h2>
          <p className="mt-4 max-w-2xl text-stone2-700">
            Sorted largest to most intimate. All venues bookable via the
            Convention &amp; Visitors Bureau.
          </p>

          {/* Mobile: cards. Desktop: table. */}
          <div className="mt-12 hidden md:block">
            <table className="w-full border-collapse border-y border-stone2-900/20 text-left">
              <thead className="border-b border-stone2-900/20">
                <tr>
                  <Th>Venue</Th>
                  <Th>Capacity</Th>
                  <Th>Sq ft</Th>
                  <Th>Setting</Th>
                  <Th>Booking</Th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((v) => (
                  <tr
                    key={v.slug}
                    className="border-b border-stone2-900/10 transition hover:bg-white/60"
                  >
                    <Td>
                      <span className="font-display text-xl">{v.name}</span>
                      {v.capacityNote && (
                        <span className="block text-xs text-stone2-500">
                          {v.capacityNote}
                        </span>
                      )}
                    </Td>
                    <Td>
                      <span className="font-display text-2xl text-corten-700">
                        {v.capacity.toLocaleString()}
                      </span>
                    </Td>
                    <Td className="text-sm">
                      {v.sqft ? v.sqft.toLocaleString() : "—"}
                    </Td>
                    <Td className="text-sm capitalize">{v.setting}</Td>
                    <Td className="text-sm">
                      {v.phone ? (
                        <a href={`tel:${v.phone}`} className="slab hover:text-corten-700">
                          {v.phone}
                        </a>
                      ) : (
                        <span className="slab text-stone2-500">CVB</span>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <ul className="mt-10 grid gap-3 md:hidden">
            {sorted.map((v) => (
              <li
                key={v.slug}
                className="border border-stone2-900/15 bg-white p-5"
              >
                <p className="font-display text-xl">{v.name}</p>
                {v.capacityNote && (
                  <p className="mt-1 text-xs text-stone2-500">
                    {v.capacityNote}
                  </p>
                )}
                <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-stone2-900/10 pt-4 text-xs">
                  <Mobile value={v.capacity.toLocaleString()} label="Capacity" />
                  <Mobile
                    value={v.sqft ? v.sqft.toLocaleString() : "—"}
                    label="Sq ft"
                  />
                  <Mobile value={v.setting} label="Setting" cap />
                </dl>
                {v.phone && (
                  <p className="mt-4 border-t border-stone2-900/10 pt-3 text-xs">
                    <a
                      href={`tel:${v.phone}`}
                      className="slab text-corten-700"
                    >
                      {v.phone}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================== */}
      {/* VENUE CARDS                                                   */}
      {/* =========================================================== */}
      <section className="py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">The venues</p>
          <h2 className="monument mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">
            Seven places to host.
          </h2>

          <ul className="mt-14 space-y-20">
            {sorted.map((v, i) => (
              <li
                key={v.slug}
                className={`grid gap-10 md:grid-cols-12 md:gap-14 ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:col-span-7 md:[direction:ltr]">
                  <div
                    className="aspect-[16/10] w-full border border-stone2-900/10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${v.image})` }}
                    role="img"
                    aria-label={v.name}
                  />
                </div>
                <div className="md:col-span-5 md:[direction:ltr]">
                  <p className="slab text-[11px] tracking-[0.3em] text-corten-600">
                    № 0{i + 1}
                  </p>
                  <h3 className="monument mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
                    {v.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-stone2-700">
                    {v.blurb}
                  </p>

                  {/* Spec line */}
                  <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-stone2-900/15 py-5 text-xs">
                    <div>
                      <dt className="slab tracking-[0.2em] text-stone2-500">
                        CAPACITY
                      </dt>
                      <dd className="mt-1 font-display text-2xl text-corten-700">
                        {v.capacity.toLocaleString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="slab tracking-[0.2em] text-stone2-500">
                        SQ FT
                      </dt>
                      <dd className="mt-1 font-display text-2xl">
                        {v.sqft ? v.sqft.toLocaleString() : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="slab tracking-[0.2em] text-stone2-500">
                        SETTING
                      </dt>
                      <dd className="mt-1 font-display text-2xl capitalize">
                        {v.setting}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-5 space-y-2 text-sm text-stone2-700">
                    {v.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-2 inline-block h-1 w-3 shrink-0 bg-corten-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {v.phone && (
                    <p className="mt-6 text-sm">
                      <a
                        href={`tel:${v.phone}`}
                        className="slab text-corten-700 hover:underline"
                      >
                        Booking · {v.phone}
                      </a>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================== */}
      {/* FINAL CTA                                                     */}
      {/* =========================================================== */}
      <section className="bg-stone2-900 py-24 text-limestone-50 md:py-28">
        <div className="container-bs text-center">
          <span className="tick-rule mx-auto block text-corten-400" />
          <p className="cine-label mt-5 text-corten-400">The next step</p>
          <h2 className="monument mx-auto mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4rem)]">
            Let the CVB<br />do the matchmaking.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-limestone-50/80 md:text-lg">
            Tell us the event, the headcount and the date. We&apos;ll come
            back with shortlisted venues, catering options, and block-rate
            hotel quotes.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:info@visitbigspring.com?subject=Venue%20inquiry"
              className="btn-primary !bg-limestone-50 !text-stone2-900 hover:!bg-limestone-100"
            >
              Email the CVB
            </a>
            <a
              href="tel:+14322638235"
              className="btn-ghost !border-limestone-50/40 !text-limestone-50 hover:!bg-limestone-50/10"
            >
              Call 432.263.8235
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="slab py-4 pr-6 text-[11px] uppercase tracking-[0.22em] text-stone2-500">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`py-4 pr-6 align-top ${className}`}>{children}</td>;
}

function Mobile({
  value,
  label,
  cap = false,
}: {
  value: string;
  label: string;
  cap?: boolean;
}) {
  return (
    <div>
      <dt className="slab tracking-[0.2em] text-stone2-500">{label}</dt>
      <dd
        className={`mt-1 font-display text-lg text-corten-700 ${
          cap ? "capitalize" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function LoopStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="slab tracking-[0.22em] text-xs text-limestone-100/70">
        {label}
      </dt>
      <dd className="mt-2 font-display text-4xl text-limestone-50">{value}</dd>
    </div>
  );
}
