import Link from "next/link";

export const metadata = {
  title: "How This Site Works",
  description:
    "A transparent look at how Visit Big Spring is built, owned, and funded — including performance scores, the CMS architecture, and the Hotel Occupancy Tax revenue that makes it free to every traveler.",
};

import scoresJson from "@/public/lighthouse-scores.json";

type LighthouseScores = {
  runOn: string;
  url: string;
  formFactor?: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  status?: string;
};

export default async function HowThisSiteWorksPage() {
  const scores = scoresJson as LighthouseScores;
  const scoresReady = scores.status !== "awaiting-first-run" && scores.performance > 0;

  return (
    <>
      <section className="bg-sand-50 py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">About this site</p>
          <h1 className="monument mt-4 text-[clamp(2.5rem,6vw,4.75rem)]">
            How this site works.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone2-700 md:text-lg">
            No secret sauce. This is public infrastructure — funded by
            travelers, owned by the City, and built to outlast any single
            vendor. Here is how.
          </p>
        </div>
      </section>

      {/* Section list */}
      <section className="py-20 md:py-28">
        <div className="container-bs space-y-20 md:space-y-24">
          {/* Mobile-first */}
          <Pillar number="01" label="Performance" title="Built mobile-first.">
            <p>
              The site is designed at 360 pixels wide and scales up. The
              average visitor arrives on a phone from an I-20 hotel room, and
              that is who we optimize for.
            </p>
            <p>
              Every route is statically pre-rendered and served from Vercel&apos;s
              global edge network. The homepage ships roughly 106 kilobytes of
              JavaScript — a fraction of a typical CMS-rendered page — and
              the first content paints in under two seconds on a 4G
              connection.
            </p>
            {scoresReady && (
              <div className="mt-6 inline-flex flex-wrap gap-3 border border-stone2-900/15 bg-white p-4">
                <Score label="Performance" value={scores.performance} />
                <Score label="Accessibility" value={scores.accessibility} />
                <Score label="Best Practices" value={scores.bestPractices} />
                <Score label="SEO" value={scores.seo} />
                <span className="basis-full text-xs text-stone2-500">
                  Google Lighthouse · mobile simulation · last audited{" "}
                  {new Date(scores.runOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </Pillar>

          <Pillar number="02" label="Ownership" title="Owned by the City.">
            <p>
              Every line of code, every image, every database record belongs
              to the City of Big Spring. Not to a vendor. Not to a CMS
              platform. Not to any agency, including ours.
            </p>
            <p>
              Credentials, the Git repository, the deployment account, the
              CMS — all transfer on request. The contract explicitly requires
              it.
            </p>
          </Pillar>

          <Pillar number="03" label="Transparency" title="Open by design.">
            <p>
              A read-only public mirror of the source code is published on
              GitHub. Anyone can see what the City&apos;s tax dollars built —
              and point out anything that could be better.
            </p>
            <p>
              <Link
                href="https://github.com/redewable/visit-big-spring"
                className="underline decoration-corten-500 underline-offset-4 hover:text-corten-700"
              >
                github.com/redewable/visit-big-spring
              </Link>
            </p>
          </Pillar>

          <Pillar number="04" label="Accessibility" title="Accessible to everyone.">
            <p>
              The site conforms to WCAG 2.1 Level AA. Skip links, focus
              indicators, semantic landmarks, reduced-motion support, 44×44
              touch targets, color-as-never-sole-indicator — the whole list
              is posted on our{" "}
              <Link
                href="/accessibility"
                className="underline decoration-corten-500 underline-offset-4 hover:text-corten-700"
              >
                accessibility page
              </Link>
              .
            </p>
          </Pillar>

          {/* Architecture diagram */}
          <Pillar number="05" label="Architecture" title="Where the data lives.">
            <p>
              Staff edit content in a familiar WordPress admin. Visitors
              never see it. Instead, a Next.js front-end pulls published
              content through a GraphQL endpoint, pre-renders every page at
              build time, and serves the result from the edge.
            </p>
            <p>
              City staff get the CMS they know. Visitors get the speed of a
              static site.
            </p>
            <Diagram />
          </Pillar>

          <Pillar number="06" label="Partnership" title="Heritage Members." >
            <p id="heritage">
              A Heritage Member is a local business or institution that invests
              annually in keeping Visit Big Spring free, CVB-operated, and
              tax-funded for every traveler. In exchange, their listing carries
              a small Heritage Member mark and an editorial introduction
              written by the CVB team — the same kind of introduction a
              reliable local friend would give you.
            </p>
            <p>
              Heritage Members are not advertisers. Their listing appears the
              same places every other listing appears. The CVB writes its own
              editorial, with its own voice, independent of member feedback.
              This keeps the site useful for visitors and fair for
              non-member businesses.
            </p>
            <p>
              Inquiries about the program: <a
                href="mailto:info@visitbigspring.com?subject=Heritage%20Member%20program"
                className="underline decoration-corten-500 underline-offset-4 hover:text-corten-700"
              >
                info@visitbigspring.com
              </a>.
            </p>
          </Pillar>

          <Pillar number="07" label="Funding" title="Funded by Hotel Occupancy Tax.">
            <p>
              Every hotel night booked in Big Spring contributes to a
              dedicated fund called the Hotel Occupancy Tax (HOT). Under
              Texas Tax Code Chapter 351, the City can only spend that money
              on activities that bring more visitors back — destination
              marketing, event recruitment, the Convention & Visitors Bureau,
              and this website.
            </p>
            <p>
              It is not funded by your property taxes. It is not funded by
              water bills. It is a self-sustaining visitor-economy loop — and
              every room booked through this site is what pays for the next
              improvement, the next festival, the next reason to come back.
            </p>
          </Pillar>
        </div>
      </section>
    </>
  );
}

function Pillar({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="grid gap-8 md:grid-cols-12 md:gap-12">
      <header className="md:col-span-4">
        <span className="slab text-[11px] tracking-[0.3em] text-corten-700">
          № {number}
        </span>
        <p className="cine-label mt-2 text-stone2-500">{label}</p>
        <h2 className="monument mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
          {title}
        </h2>
      </header>
      <div className="md:col-span-8 space-y-5 text-base leading-relaxed text-stone2-700 md:text-lg [&_p]:text-stone2-700">
        {children}
      </div>
    </article>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  const color =
    value >= 90 ? "#a8582e" : value >= 70 ? "#2f6d92" : "#7b7566";
  return (
    <span className="inline-flex items-center gap-2 border border-stone2-900/10 px-3 py-1">
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      <span className="slab text-[10px] tracking-[0.2em] text-stone2-500">
        {label}
      </span>
      <span className="font-display text-lg tabular-nums">{value}</span>
    </span>
  );
}

function Diagram() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {[
        { label: "Visitors", sub: "Phone · Desktop · Screen reader" },
        { label: "Next.js", sub: "Edge-cached HTML + JSON" },
        { label: "WordPress", sub: "CMS · City staff only" },
      ].map((b, i) => (
        <div key={b.label} className="relative">
          <div className="border border-corten-500/40 bg-corten-500/10 p-5">
            <span className="slab text-[10px] tracking-[0.25em] text-corten-700">
              Box {i + 1}
            </span>
            <p className="mt-2 font-display text-xl">{b.label}</p>
            <p className="mt-1 text-xs text-stone2-600">{b.sub}</p>
          </div>
          {i < 2 && (
            <span
              aria-hidden="true"
              className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 sm:inline-block"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12h16M14 6l6 6-6 6"
                  stroke="#a8582e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
