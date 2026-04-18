import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import { SunRule } from "@/components/Icons";
import { businessesByCategory } from "@/lib/data";

export const metadata = {
  title: "History — Heritage, museums & the spring itself",
  description:
    "From mastodon remains to Cabeza de Vaca, from the Bankhead Highway to Webb AFB — eight stages of the historic spring that named Big Spring, Texas.",
};

// Eight stages matching the corten-metal story boards installed at the
// real Historic Spring in Comanche Trail Park during its 2019 restoration.
const stages = [
  {
    n: "01",
    era: "Ice Age",
    title: "Mastodons came first.",
    body:
      "Remains of mastodon, wooly mammoth and saber-toothed tiger have been found near the spring. It was the best reliable water on the southern Llano Estacado long before any of us got here.",
  },
  {
    n: "02",
    era: "1535",
    title: "Cabeza de Vaca passed through.",
    body:
      "The Spanish explorer <em>Álvar Núñez Cabeza de Vaca</em> documented the site on his overland crossing. For two more centuries, Spanish expeditions used the spring as a waypoint on the Chihuahua trail.",
  },
  {
    n: "03",
    era: "1700s–1840s",
    title: "The Great Comanche War Trail.",
    body:
      "Comanche, Kiowa and Apache bands gathered at the spring as they set out on the Great Comanche War Trail. The rocky gorge made it a natural meeting point.",
  },
  {
    n: "04",
    era: "1849",
    title: "Captain Randolph Marcy camped here.",
    body:
      "Marcy's expedition, returning from Santa Fe, marked the spring as a campsite on the Overland Trail to California. Signal Mountain, ten miles southeast, was his landmark.",
  },
  {
    n: "05",
    era: "1881–1882",
    title: "Railroad and incorporation.",
    body:
      "The Texas &amp; Pacific Railroad arrived in 1881. Big Spring was incorporated the following year. The tent city disappeared; permanent buildings followed.",
  },
  {
    n: "06",
    era: "1920s–1930s",
    title: "Bankhead Highway & Hotel Settles.",
    body:
      "The Bankhead Highway — the \"Broadway of America\" — ran right down Third Street. In 1930, W.R. Settles opened his $500,000 hotel on the corner of 3rd and Runnels. Elvis would later play the Municipal Auditorium built across the street in 1932.",
  },
  {
    n: "07",
    era: "1942–1977",
    title: "Bombardier School to Webb AFB.",
    body:
      "Big Spring Army Air Field trained WWII bombardiers. The base reopened as Webb AFB in 1952 and trained over 10,000 pilots before closing in 1977. Its last T-hangar is now Hangar 25 Air Museum.",
  },
  {
    n: "08",
    era: "Today",
    title: "A destination reborn.",
    body:
      "Scenic Mountain, a restored downtown, and the Festival of Lights in the Poinsettia Capital of Texas bring visitors back to the spring that started it all.",
  },
];

export default function HistoryPage() {
  const items = businessesByCategory("history");
  return (
    <>
      {/* Rich custom hero instead of generic PageHero */}
      <section className="relative isolate overflow-hidden bg-corten-700 text-limestone-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 80% at 20% 10%, rgba(255,180,100,0.4), transparent 70%), radial-gradient(50% 60% at 90% 95%, rgba(0,0,0,0.55), transparent 70%)",
          }}
        />
        <div className="container-bs relative grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-8">
            <p className="slab text-xs tracking-[0.3em] text-limestone-50/80">
              HISTORY · BIG SPRING, TEXAS
            </p>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95]">
              Eight stages,<br />
              <span className="italic">one spring.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-limestone-50/90">
              The Big Spring Convention &amp; Visitors Bureau recently restored
              the historic spring in Comanche Trail Park — eight corten-metal
              story boards on limestone, two observation decks, and a 1,000-seat
              plaza. This is the story those boards tell.
            </p>
          </div>

          <aside className="md:col-span-4 self-end">
            <div className="rounded-sm border border-limestone-50/25 bg-stone2-900/40 p-6 backdrop-blur">
              <p className="slab text-[10px] uppercase tracking-[0.25em] text-limestone-100/80">
                Quick facts
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Incorporated" value="1882" />
                <Fact label="County seat" value="Howard County" />
                <Fact label="Elevation" value="2,405 ft" />
                <Fact label="Namesake" value="Sulphur Draw spring" />
                <Fact label="TX markers" value="17 state · 27 county" />
                <Fact label="Claim to fame" value="Poinsettia Capital of TX" />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Corten-metal story boards */}
      <section aria-labelledby="stages-title" className="bg-limestone-50 py-24">
        <div className="container-bs">
          <SunRule className="h-5 w-28 text-corten-500" />
          <p className="eyebrow mt-4">The story boards</p>
          <h2 id="stages-title" className="mt-3 font-display text-4xl md:text-5xl">
            Read them in order.
          </h2>
          <p className="mt-4 max-w-2xl text-stone2-700">
            The real boards are engraved corten metal, five feet by ten, mounted
            on limestone. Below is the digital edition.
          </p>

          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {stages.map((s, i) => (
              <li
                key={s.n}
                className={`plaque overflow-hidden p-7 md:p-8 ${
                  i % 2 === 1 ? "md:translate-y-8" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="slab text-5xl leading-none text-limestone-50 md:text-6xl">
                    {s.n}
                  </span>
                  <span className="slab text-[10px] uppercase tracking-[0.3em] text-limestone-50/80">
                    {s.era}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl text-limestone-50 md:text-3xl">
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-sm text-limestone-50/90"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-wrap gap-3">
            <Link href="/businesses/historic-spring" className="btn-primary">
              Visit the spring
            </Link>
            <Link href="/map" className="btn-ghost">
              Heritage route on the map
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage venues */}
      <section className="py-24">
        <div className="container-bs">
          <SunRule className="h-5 w-28 text-corten-500" />
          <p className="eyebrow mt-4">Where the story is on display</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Heritage venues</h2>
          <p className="mt-3 max-w-2xl text-stone2-700">
            From an 1898 sandstone home to a WWII T-hangar to the oldest
            continuously-operating auditorium in West Texas.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((b) => (
              <li key={b.slug}>
                <BusinessCard biz={b} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-limestone-50/15 pb-2 last:border-0">
      <dt className="text-limestone-100/70">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}
