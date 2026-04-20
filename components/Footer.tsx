import Link from "next/link";
import { sections } from "@/lib/data";
import LighthouseBadge from "@/components/LighthouseBadge";
import { showDemoAdmin } from "@/lib/flags";

export default function Footer() {
  const demoAdmin = showDemoAdmin();
  return (
    <footer className="mt-24 bg-[#0b0a14] text-limestone-100">
      <div className="container-bs grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="tick-rule block text-corten-400" />
          <p className="cine-label mt-5 text-corten-400">
            Visit Big Spring · West Texas
          </p>
          <h2 className="monument mt-4 text-[clamp(2rem,4vw,3.25rem)] text-limestone-50">
            Wide skies.<br />Bigger welcome.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-limestone-100/70">
            The City of Big Spring Convention &amp; Visitors Bureau helps
            travelers discover the people, places and stories of Howard County.
          </p>

          <form
            action="/api/newsletter"
            method="post"
            className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            aria-label="Newsletter signup"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full flex-1 rounded-none border border-limestone-100/25 bg-transparent px-4 py-3 text-sm text-limestone-50 placeholder:text-limestone-100/40 focus:border-corten-400"
            />
            <button type="submit" className="btn-primary shrink-0 !rounded-none">
              Sign up
            </button>
          </form>
        </div>

        <nav aria-label="Explore" className="md:col-span-2">
          <p className="cine-label text-corten-400">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {sections.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="font-display text-xl hover:text-corten-400">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/meetings" className="font-display text-xl hover:text-corten-400">
                Meetings
              </Link>
            </li>
            <li>
              <Link href="/stories" className="font-display text-xl hover:text-corten-400">
                Stories
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Plan" className="md:col-span-2">
          <p className="cine-label text-corten-400">Plan</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/map" className="font-display text-xl hover:text-corten-400">
                Interactive Map
              </Link>
            </li>
            <li>
              <Link href="/itinerary" className="font-display text-xl hover:text-corten-400">
                Itinerary Builder
              </Link>
            </li>
            <li>
              <Link href="/passes" className="font-display text-xl hover:text-corten-400">
                Explorer Pass
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="About" className="md:col-span-3">
          <p className="cine-label text-corten-400">About</p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-limestone-100/80">
            Big Spring Convention<br />
            &amp; Visitors Bureau<br />
            113 E 3rd Street<br />
            Big Spring, TX 79720
          </address>
          <p className="mt-4 text-sm">
            <a href="tel:+14322638235" className="slab hover:text-corten-400">
              432.263.8235
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a
              href="tel:+18664307100"
              className="text-xs text-limestone-100/60 hover:text-corten-400"
            >
              Toll free · 866.430.7100
            </a>
          </p>
          <ul className="mt-6 space-y-1.5 text-sm">
            <li>
              <Link
                href="/about/how-this-site-works"
                className="hover:text-corten-400"
              >
                How this site works
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-corten-400">
                Accessibility
              </Link>
            </li>
            {demoAdmin && (
              <li>
                <Link
                  href="/demo-admin"
                  className="text-xs text-limestone-100/60 hover:text-corten-400"
                >
                  Admin preview (for evaluators)
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Lighthouse scores strip */}
      <div className="border-t border-limestone-100/10">
        <div className="container-bs py-6">
          <LighthouseBadge />
        </div>
      </div>

      <div className="border-t border-limestone-100/15">
        <div className="container-bs flex flex-col items-start justify-between gap-4 py-6 text-[11px] tracking-[0.15em] uppercase text-limestone-100/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} City of Big Spring · All rights reserved.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="hover:text-limestone-50">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-limestone-50">Terms</Link></li>
            <li><Link href="/accessibility" className="hover:text-limestone-50">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
