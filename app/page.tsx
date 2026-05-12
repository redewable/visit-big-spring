import Link from "next/link";
import { showDemoAdmin } from "@/lib/flags";

export const metadata = {
  title: {
    absolute: "Visit Big Spring · RFP No. 26-016 — Prototype Cover",
  },
  description:
    "A working prototype of the next visitbigspring.com, curated for The City of Big Spring. RFP No. 26-016. Prepared by COAT Creative, a talormayde brand.",
  robots: { index: false, follow: false },
};

const VISITOR_LINKS = [
  { href: "/home", label: "Home", note: "The hero, the welcome, the weather chip." },
  { href: "/explore", label: "Explore", note: "Mesas, trails, museums, the spring itself." },
  { href: "/eat-drink", label: "Eat & Drink", note: "Local tables, BBQ, Tex-Mex." },
  { href: "/stay", label: "Stay", note: "Lodging across town and the interstate." },
  { href: "/events", label: "Events", note: "Rodeos, festivals, holiday lights." },
  { href: "/history", label: "History", note: "The spring, the railroad, the war years." },
  { href: "/stories", label: "Stories", note: "Long-form editorial features." },
];

const TOOL_LINKS = [
  { href: "/map", label: "Interactive Map", note: "Filterable, pannable, mobile-ready." },
  { href: "/itinerary", label: "Itinerary Builder", note: "One-day, weekend, week-long." },
  { href: "/passes", label: "Explorer Pass", note: "Digital pass with check-ins." },
  { href: "/meetings", label: "Meetings & Groups", note: "RFPs, venues, hotel blocks." },
];

const EVAL_LINKS_BASE = [
  { href: "/about/how-this-site-works", label: "How this site works", note: "Architecture, ownership, performance." },
  { href: "/accessibility", label: "Accessibility", note: "WCAG 2.1 AA conformance." },
];

export default function CoverPage() {
  const evalLinks = showDemoAdmin()
    ? [
        ...EVAL_LINKS_BASE,
        { href: "/demo-admin", label: "Admin Preview", note: "What CVB staff see in WordPress." },
      ]
    : EVAL_LINKS_BASE;

  const groups = [
    { heading: "The Visitor Experience", items: VISITOR_LINKS },
    { heading: "Planning Tools", items: TOOL_LINKS },
    { heading: "For Evaluators", items: evalLinks },
  ];

  return (
    <main id="main" className="min-h-screen bg-sand-50 text-stone2-900">
      <div className="container-bs flex flex-col gap-14 py-14 sm:gap-20 sm:py-20 md:py-24">
        {/* Title block */}
        <header>
          <span className="tick-rule block text-corten-500" aria-hidden="true" />
          <p className="cine-label mt-5 text-corten-700">
            Curated for The City of Big Spring · RFP No. <span className="slab">26-016</span>
          </p>
          <h1 className="monument mt-5 text-[clamp(2.5rem,11vw,5.75rem)] text-stone2-900">
            Visit Big Spring.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone2-700 sm:text-lg">
            A working, mobile-first prototype of the next visitbigspring.com —
            real photography, real local content, and the architecture, admin
            experience, and accessibility posture the City would receive on
            day one.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/home" className="btn-primary">
              Visit Big Spring <span aria-hidden="true">→</span>
            </Link>
            <Link href="/about/how-this-site-works" className="btn-ghost">
              How this site works
            </Link>
          </div>
        </header>

        {/* Page index */}
        <section aria-labelledby="cover-index-heading">
          <span className="tick-rule block text-corten-500" aria-hidden="true" />
          <h2
            id="cover-index-heading"
            className="cine-label mt-5 text-corten-700"
          >
            Or jump to any page
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
            {groups.map((g) => (
              <div key={g.heading}>
                <p className="font-display text-xl text-stone2-900">
                  {g.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        className="group block border-l-2 border-stone2-900/15 pl-3 transition hover:border-corten-500"
                      >
                        <span className="block font-display text-base text-stone2-900 group-hover:text-corten-700">
                          {i.label}
                        </span>
                        <span className="block text-xs leading-relaxed text-stone2-700">
                          {i.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Cover credit */}
        <footer className="border-t border-stone2-900/10 pt-6 text-xs leading-relaxed text-stone2-700">
          <p>
            Prepared by <span className="font-medium text-stone2-900">COAT Creative</span>
            {" · "}
            A{" "}
            <a
              href="https://talormayde.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit talormayde, the parent brand of COAT Creative"
              className="text-stone2-900 hover:text-corten-700 hover:underline"
            >
              talormayde
            </a>{" "}
            brand
          </p>
        </footer>
      </div>
    </main>
  );
}
