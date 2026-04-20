import { notFound } from "next/navigation";
import { showDemoAdmin } from "@/lib/flags";

export const metadata = {
  title: "Admin Preview — What CVB Staff See",
  description:
    "An evaluator-facing visualization of the WordPress admin experience CVB staff will use to publish events, update business listings, and review analytics.",
  robots: { index: false, follow: false },
};

/**
 * Force runtime rendering so toggling SHOW_DEMO_ADMIN in Vercel takes effect
 * immediately — no rebuild required. Tradeoff: one tiny server render per
 * request (the page has no external data calls, so it's still cheap).
 */
export const dynamic = "force-dynamic";

/**
 * /demo-admin is intentionally gated. Accessible in development and on the
 * deployed prototype URL only when SHOW_DEMO_ADMIN=true is set. In a true
 * production deploy — when this ships as the live visitbigspring.com
 * replacement — the env var gets cleared and this route 404s.
 */
export default function DemoAdminPage() {
  if (!showDemoAdmin()) notFound();

  return (
    <>
      <section className="bg-sand-50 py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">For RFP evaluators</p>
          <h1 className="monument mt-4 text-[clamp(2.5rem,6.5vw,5rem)]">
            Admin preview.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone2-700 md:text-lg">
            This is what City staff will see. Visitors never reach this
            interface — they see the lightning-fast Next.js front-end you&apos;re
            viewing everywhere else on this site.
          </p>
          <p className="slab mt-6 text-[10px] tracking-[0.25em] text-stone2-500">
            Route gated by <code className="font-mono">SHOW_DEMO_ADMIN</code> env flag ·
            Not indexed · Removed in production
          </p>
        </div>
      </section>

      {/* Scene 1 — add new event */}
      <Scene
        number="01"
        title="Adding a new event."
        caption="City staff select “Events → Add New,” fill in the familiar WordPress form with custom fields (date, location, outdoor flag, tags), attach a featured image, click Publish. The front-end rebuilds that page in under 30 seconds."
      >
        <AdminScreen title="Events › Add New · Edit Event">
          <div className="grid gap-4 md:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              <Field label="Title" value="Pops in the Park" />
              <Field
                label="Summary"
                value="The Big Spring Symphony's free Independence-Eve concert — patriotic music and fireworks finale."
                multiline
              />
              <Field
                label="Description"
                multiline
                value="Every July 3rd, the Big Spring Symphony Association's Pops in the Park fills the 6,000-seat CCC amphitheater..."
              />
            </div>
            <div className="space-y-3">
              <MetaBox title="Publish">
                <p className="text-xs text-stone2-500">Status: Draft</p>
                <div className="mt-2 flex gap-2">
                  <span className="border border-stone2-900/15 bg-white px-2 py-1 text-[11px]">
                    Save Draft
                  </span>
                  <span className="border border-corten-500 bg-corten-500 px-2 py-1 text-[11px] text-white">
                    Publish
                  </span>
                </div>
              </MetaBox>
              <MetaBox title="Event Details (ACF)">
                <Kv k="Start date" v="2026-07-03" />
                <Kv k="Start time" v="20:00" />
                <Kv k="Location" v="Comanche Trail Amphitheater" />
                <Kv k="Outdoor" v="☑ Yes" />
                <Kv k="Latitude" v="32.2118" />
                <Kv k="Longitude" v="-101.4831" />
              </MetaBox>
              <MetaBox title="Featured Image">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-corten-400 to-corten-700" />
                <p className="mt-2 text-[11px] text-stone2-500">
                  pops-in-the-park-2026.jpg · 1.2 MB
                </p>
              </MetaBox>
            </div>
          </div>
        </AdminScreen>
      </Scene>

      {/* Scene 2 — edit listing with ACF */}
      <Scene
        number="02"
        title="Editing a business listing."
        caption="Business listings are a custom post type. Hours, category, tier (standard / editor's pick / heritage member), coordinates, phone, website — every field is a first-class ACF input. Staff update a phone number once; every page showing that phone rebuilds automatically."
        reverse
      >
        <AdminScreen title="Businesses › Hotel Settles">
          <div className="grid gap-4 md:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              <Field label="Name" value="Hotel Settles" />
              <Field label="Slug" value="hotel-settles" />
              <Field
                label="Blurb"
                multiline
                value="A restored 1930 boutique landmark on the downtown skyline — 65 guest rooms, Settles Grill, Pharmacy Bar, and 15,000 sq ft of event space."
              />
              <Field
                label="Editorial intro (Editor's Pick)"
                multiline
                value="If you spend one night in Big Spring, spend it here. The Settles opened in 1930..."
              />
            </div>
            <div className="space-y-3">
              <MetaBox title="Category">
                <SelectMock value="Stay" />
              </MetaBox>
              <MetaBox title="Tier">
                <Radio label="Standard" />
                <Radio label="Editor's Pick" checked />
                <Radio label="Heritage Member" />
              </MetaBox>
              <MetaBox title="Location (ACF)">
                <Kv k="Address" v="200 E Third Street" />
                <Kv k="City" v="Big Spring, TX" />
                <Kv k="Lat" v="32.2525" />
                <Kv k="Lng" v="-101.4777" />
              </MetaBox>
              <MetaBox title="Contact">
                <Kv k="Phone" v="432-267-7500" />
                <Kv k="Website" v="hotelsettles.com" />
              </MetaBox>
            </div>
          </div>
        </AdminScreen>
      </Scene>

      {/* Scene 3 — Looker Studio */}
      <Scene
        number="03"
        title="Looker Studio analytics."
        caption="A single dashboard combines GA4, Search Console, and CVB-specific events (Pass scans, itinerary saves). Staff filter by date range, compare month-over-month, export for City Council reports. Reports are embeddable back into this admin if desired."
      >
        <AdminScreen title="Analytics · Looker Studio embed" chromeTone="dark">
          <div className="grid gap-3 md:grid-cols-4">
            <Kpi label="Sessions (30d)" value="14,820" delta="+18%" />
            <Kpi label="Avg engagement" value="2:44" delta="+12%" />
            <Kpi label="Room-night clicks" value="1,204" delta="+34%" />
            <Kpi label="Pass interest" value="186" delta="+—" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <FakeChart title="Sessions · last 30 days" />
            <FakeChart title="Top referrers" variant="bars" />
          </div>
        </AdminScreen>
      </Scene>

      {/* Scene 4 — published timeline */}
      <Scene
        number="04"
        title="What just changed."
        caption="A unified audit log shows every publish, edit, and rollback. City staff can revert any change within 30 days. The CVB marketing lead sees exactly what went out and when — the City Attorney sees a clean record."
        reverse
      >
        <AdminScreen title="Published · activity timeline">
          <ol className="divide-y divide-stone2-900/10">
            {[
              { who: "Terri T.", what: "Published event", target: "Festival of Lights 2026", when: "2h ago" },
              { who: "Albert B.", what: "Updated hours", target: "Comanche Trail Golf Course", when: "5h ago" },
              { who: "Terri T.", what: "Added image", target: "Hangar 25 Air Museum", when: "Yesterday · 4:32p" },
              { who: "System", what: "Scheduled publish", target: "Pops in the Park → July 3", when: "2d ago" },
              { who: "Terri T.", what: "Replied to a submission", target: "Accessibility inquiry", when: "3d ago" },
            ].map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span>
                  <span className="font-[600]">{a.who}</span>{" "}
                  <span className="text-stone2-600">{a.what} →</span>{" "}
                  <span className="text-corten-700">{a.target}</span>
                </span>
                <span className="slab text-[10px] tracking-[0.22em] text-stone2-500">
                  {a.when}
                </span>
              </li>
            ))}
          </ol>
        </AdminScreen>
      </Scene>

      <section className="bg-corten-700 py-16 text-limestone-50">
        <div className="container-bs text-center">
          <p className="cine-label text-limestone-100/80">One more thing</p>
          <p className="mx-auto mt-4 max-w-3xl font-display text-2xl leading-snug md:text-3xl">
            City staff edit content here. Visitors never see this interface —
            they see the lightning-fast Next.js front-end.
          </p>
        </div>
      </section>
    </>
  );
}

/* -------- scene chrome -------- */

function Scene({
  number,
  title,
  caption,
  children,
  reverse = false,
}: {
  number: string;
  title: string;
  caption: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="border-t border-stone2-900/10 py-16 md:py-24">
      <div className="container-bs grid gap-10 md:grid-cols-12 md:gap-14">
        <header className={`md:col-span-4 ${reverse ? "md:order-2" : ""}`}>
          <span className="slab text-[11px] tracking-[0.3em] text-corten-700">
            № {number}
          </span>
          <h2 className="monument mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone2-700">{caption}</p>
        </header>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function AdminScreen({
  title,
  children,
  chromeTone = "light",
}: {
  title: string;
  children: React.ReactNode;
  chromeTone?: "light" | "dark";
}) {
  const darkChrome = chromeTone === "dark";
  return (
    <div className="overflow-hidden border border-stone2-900/15 bg-white shadow-sm">
      {/* Browser chrome */}
      <div
        className={`flex items-center gap-3 border-b px-4 py-2 text-xs ${
          darkChrome
            ? "border-stone2-900/40 bg-stone2-900 text-limestone-100/70"
            : "border-stone2-900/10 bg-stone2-100 text-stone2-500"
        }`}
      >
        <span className="flex gap-1.5">
          <Dot />
          <Dot />
          <Dot />
        </span>
        <span className="ml-2 font-mono">{title}</span>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2.5 w-2.5 rounded-full bg-stone2-900/20"
    />
  );
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="slab text-[10px] tracking-[0.22em] text-stone2-500">
        {label.toUpperCase()}
      </span>
      {multiline ? (
        <div className="mt-1 min-h-[72px] border border-stone2-900/15 bg-sand-50 px-3 py-2 text-sm">
          {value}
        </div>
      ) : (
        <div className="mt-1 border border-stone2-900/15 bg-sand-50 px-3 py-2 text-sm">
          {value}
        </div>
      )}
    </label>
  );
}

function MetaBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-stone2-900/10">
      <header className="border-b border-stone2-900/10 bg-stone2-50 px-3 py-2">
        <span className="slab text-[10px] tracking-[0.22em] text-stone2-600">
          {title.toUpperCase()}
        </span>
      </header>
      <div className="p-3 text-xs text-stone2-700 space-y-1">{children}</div>
    </section>
  );
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-stone2-500">{k}</dt>
      <dd className="font-mono text-[11px]">{v}</dd>
    </div>
  );
}

function Radio({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-[12px]">
      <span
        aria-hidden="true"
        className={`inline-block h-3 w-3 rounded-full border ${
          checked ? "border-corten-500 bg-corten-500" : "border-stone2-900/30"
        }`}
      />
      {label}
    </label>
  );
}

function Kpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="border border-stone2-900/10 bg-sand-50 p-3">
      <p className="slab text-[9px] tracking-[0.22em] text-stone2-500">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 font-display text-2xl">{value}</p>
      <p className="mt-0.5 text-[11px] text-corten-700">{delta}</p>
    </div>
  );
}

function FakeChart({
  title,
  variant = "line",
}: {
  title: string;
  variant?: "line" | "bars";
}) {
  return (
    <div className="border border-stone2-900/10 bg-sand-50 p-4">
      <p className="slab text-[10px] tracking-[0.22em] text-stone2-500">
        {title.toUpperCase()}
      </p>
      <svg viewBox="0 0 200 80" className="mt-3 w-full" role="img" aria-label={title}>
        {variant === "line" ? (
          <polyline
            points="0,55 20,48 40,52 60,38 80,42 100,30 120,36 140,22 160,28 180,18 200,22"
            fill="none"
            stroke="#a8582e"
            strokeWidth="1.5"
          />
        ) : (
          [60, 72, 40, 88, 55, 30, 48].map((h, i) => (
            <rect
              key={i}
              x={10 + i * 28}
              y={80 - h}
              width={18}
              height={h}
              fill="#a8582e"
            />
          ))
        )}
      </svg>
    </div>
  );
}

function SelectMock({ value }: { value: string }) {
  return (
    <div className="border border-stone2-900/15 bg-sand-50 px-3 py-1.5 text-xs">
      {value} ▾
    </div>
  );
}
