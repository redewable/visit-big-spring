import PassesForm from "./PassesForm";

export const metadata = {
  title: "Big Spring Explorer Pass — Launching Fall 2026",
  description:
    "One pass. Every Big Spring attraction. The Explorer Pass launches Fall 2026 — sign up for first access.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Big Spring Explorer Pass",
  description:
    "A single pass granting access to Big Spring's participating attractions, museums, and activities.",
  brand: { "@type": "Organization", name: "Visit Big Spring" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "39.00",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-10-01",
  },
};

const included = [
  { name: "Big Spring State Park", note: "Scenic Mountain loop + pavilion" },
  { name: "Hangar 25 Air Museum", note: "Full museum admission" },
  { name: "Heritage Museum of Big Spring", note: "Rotating + permanent exhibits" },
  { name: "Potton House", note: "Appointment tours" },
  { name: "Comanche Trail Golf Course", note: "Discounted green fees" },
  { name: "Russ McEwen Aquatic Center", note: "Seasonal single-day pass" },
];

const howItWorks = [
  {
    step: "01",
    title: "Buy the pass",
    detail: "One price. One QR code. Valid 72 hours from first scan.",
  },
  {
    step: "02",
    title: "Scan at each attraction",
    detail:
      "Staff scan your code at the door. No re-buying tickets, no waiting in line.",
  },
  {
    step: "03",
    title: "See your itinerary fill in",
    detail:
      "Each scan checks off your itinerary and sends a digital postcard home.",
  },
];

export default function PassesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#0b0a14] text-limestone-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(65% 70% at 75% 20%, rgba(168,88,46,0.35), transparent 70%), radial-gradient(55% 60% at 15% 90%, rgba(47,109,146,0.3), transparent 70%)",
          }}
        />
        <div className="container-bs py-28 md:py-40">
          <span className="tick-rule block text-corten-400" />
          <p className="cine-label mt-6 text-corten-400">
            Launching · <span className="slab">Fall 2026</span>
          </p>
          <h1 className="monument mt-6 text-[clamp(2.25rem,7vw,5.5rem)]">
            The Big Spring<br />
            <span className="italic font-[500]">Explorer Pass.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-limestone-50/90 md:text-xl">
            One pass. Every participating attraction. Built for the weekend
            visitor who doesn&apos;t want to think about tickets.
          </p>
          <p className="cine-label mt-10 text-limestone-50/70">
            Placeholder · Pricing below · Final partners announced Q3 2026
          </p>
        </div>
      </section>

      {/* 3-card layout */}
      <section className="py-20 md:py-28">
        <div className="container-bs grid gap-8 md:grid-cols-3">
          {/* Included */}
          <div className="border border-stone2-900/15 bg-white p-6 md:p-8">
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-4 text-corten-700">What&apos;s included</p>
            <h2 className="monument mt-3 text-3xl">Participating.</h2>
            <ul className="mt-6 space-y-4 text-sm">
              {included.map((i) => (
                <li key={i.name} className="border-b border-stone2-900/10 pb-3 last:border-0">
                  <p className="font-display text-lg">{i.name}</p>
                  <p className="mt-1 text-xs text-stone2-600">{i.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-stone2-500">
              Partner list is preliminary. Final roster announced Q3 2026.
            </p>
          </div>

          {/* How it works */}
          <div className="border border-stone2-900/15 bg-white p-6 md:p-8">
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-4 text-corten-700">How it works</p>
            <h2 className="monument mt-3 text-3xl">Three steps.</h2>
            <ol className="mt-6 space-y-6">
              {howItWorks.map((s) => (
                <li key={s.step}>
                  <span className="slab text-[11px] tracking-[0.25em] text-corten-600">
                    {s.step}
                  </span>
                  <p className="mt-2 font-display text-lg">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone2-700">
                    {s.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Pricing */}
          <div className="border border-stone2-900/15 bg-corten-700 p-6 text-limestone-50 md:p-8">
            <span className="tick-rule block text-limestone-100/70" />
            <p className="cine-label mt-4 text-limestone-100/80">Pricing</p>
            <h2 className="monument mt-3 text-3xl">One price.</h2>
            <p
              className="monument mt-8 leading-none"
              style={{ fontSize: "clamp(4.5rem, 9vw, 7rem)" }}
            >
              $39
            </p>
            <p className="slab mt-4 text-[10px] tracking-[0.25em] text-limestone-100/70">
              USD · 72-hour window · one traveler
            </p>
            <p className="mt-6 text-sm leading-relaxed text-limestone-50/85">
              Family &amp; multi-day variants announced alongside the fall launch.
              Placeholder pricing — subject to final partner structure.
            </p>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container-bs grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <span className="tick-rule block text-corten-500" />
            <p className="cine-label mt-5 text-corten-700">Early access</p>
            <h2 className="monument mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              Be first to know.
            </h2>
            <p className="mt-5 max-w-md text-stone2-700">
              We&apos;ll send you one email when the Explorer Pass launches,
              with an early-access discount for folks who signed up before
              release. No spam, no other lists, no gimmicks.
            </p>
          </div>
          <div>
            <PassesForm />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
