export const metadata = {
  title: "Accessibility",
  description:
    "Visit Big Spring's commitment to WCAG 2.1 AA conformance, the specific accessibility features implemented, and how to contact the CVB about an access issue.",
};

const implementations = [
  {
    title: "Skip to content",
    detail:
      "Every page begins with a hidden-until-focused “Skip to main content” link (WCAG 2.4.1).",
  },
  {
    title: "Visible focus indicators",
    detail:
      "All interactive elements show a high-contrast focus ring of at least 2px at a 3:1 contrast ratio (WCAG 2.4.7).",
  },
  {
    title: "Keyboard operability",
    detail:
      "Every link, button, menu, form control, filter, and map pin is reachable and operable via keyboard alone (WCAG 2.1.1).",
  },
  {
    title: "Semantic landmarks",
    detail:
      "Pages use <header>, <nav>, <main>, <article>, <aside>, and <footer> so screen readers can jump between regions (WCAG 1.3.1, 2.4.1).",
  },
  {
    title: "Color is never the sole indicator",
    detail:
      "Map markers are shape-coded in addition to color. Error states pair color with an icon and text. Featured-business treatments pair color with a star or dot icon plus caption text (WCAG 1.4.1).",
  },
  {
    title: "Sufficient color contrast",
    detail:
      "Body text exceeds 4.5:1 against every background used; large headings and UI exceed 3:1 (WCAG 1.4.3).",
  },
  {
    title: "Reduced motion honored",
    detail:
      "Users who set a system preference for reduced motion get no animation — the hero landscape animations are paused, transitions shortened to near-zero (WCAG 2.3.3).",
  },
  {
    title: "Text alternatives",
    detail:
      "Informative images carry alt text. Decorative imagery is marked aria-hidden and not announced (WCAG 1.1.1).",
  },
  {
    title: "Form labels",
    detail:
      "Every form control — newsletter, itinerary search, pass interest, event filters — has a visible or programmatic label (WCAG 3.3.2).",
  },
  {
    title: "Touch target size",
    detail:
      "All interactive targets meet the 44×44px minimum recommended by WCAG 2.5.5 AAA and Apple's HIG.",
  },
  {
    title: "Language of page declared",
    detail:
      "The root <html> element declares lang=\"en\" so screen readers pronounce content correctly (WCAG 3.1.1).",
  },
  {
    title: "Descriptive links",
    detail:
      "Link text describes the destination (\"Read the eight stages,\" not \"click here\") so link lists are meaningful out of context (WCAG 2.4.4).",
  },
];

const limitations = [
  {
    title: "Map pin clustering at high density",
    detail:
      "Overlapping markers at maximum zoom can reduce the keyboard-tab ordering clarity. The category filter provides a workaround; we're investigating per-pin ordering.",
  },
  {
    title: "Third-party video (when provided)",
    detail:
      "The hero is currently animated SVG with reduced-motion support. When the City's drone footage is loaded, we'll provide captions per WCAG 1.2.2 and ensure controls are keyboard-operable.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-sand-50 py-24 md:py-28">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <p className="cine-label mt-5 text-corten-700">Our commitment</p>
          <h1 className="monument mt-4 text-[clamp(2rem,6vw,4.5rem)]">
            Accessibility at<br />
            <span className="italic font-[500]">Visit Big Spring.</span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-pretty text-base leading-relaxed text-stone2-700 md:text-lg">
            Visit Big Spring is a public, tax-funded resource. Every traveler
            deserves equal access — regardless of ability, device, or
            network. This site conforms to the{" "}
            <a
              href="https://www.w3.org/TR/WCAG21/"
              className="underline decoration-corten-500 underline-offset-4 hover:text-corten-700"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1 Level&nbsp;AA
            </a>
            . Here is the concrete list.
          </p>
        </div>
      </section>

      {/* Implementations */}
      <section className="py-20 md:py-28">
        <div className="container-bs">
          <h2 className="font-display text-3xl md:text-4xl">Implementations</h2>
          <p className="mt-2 max-w-2xl text-stone2-700">
            Each item maps to a specific WCAG 2.1 success criterion.
          </p>
          <ul className="mt-10 grid gap-px bg-stone2-900/15 md:grid-cols-2">
            {implementations.map((i) => (
              <li key={i.title} className="bg-sand-50 p-6 md:p-7">
                <h3 className="font-display text-xl leading-tight">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone2-700">
                  {i.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Known limitations */}
      <section className="bg-limestone-50 py-20 md:py-24">
        <div className="container-bs">
          <span className="tick-rule block text-corten-500" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            Known limitations
          </h2>
          <p className="mt-3 max-w-2xl text-stone2-700">
            Being honest about what doesn&apos;t yet pass. These are tracked and
            scheduled for remediation.
          </p>
          <ul className="mt-10 space-y-6">
            {limitations.map((l) => (
              <li
                key={l.title}
                className="border-l-2 border-corten-500 bg-white p-5 md:p-6"
              >
                <h3 className="font-display text-lg">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone2-700">
                  {l.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact + tools */}
      <section className="py-20 md:py-24">
        <div className="container-bs grid gap-12 md:grid-cols-2">
          <div>
            <span className="tick-rule block text-corten-500" />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">
              Tell us about a barrier.
            </h2>
            <p className="mt-4 max-w-md text-stone2-700">
              If you encountered something on this site that didn&apos;t work
              for your assistive technology, please let us know. We respond to
              access reports within 3 business days.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="slab text-[10px] tracking-[0.25em] text-stone2-500">
                  EMAIL
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:info@visitbigspring.com?subject=Accessibility"
                    className="font-display text-xl text-corten-700 hover:underline"
                  >
                    info@visitbigspring.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="slab text-[10px] tracking-[0.25em] text-stone2-500">
                  PHONE
                </dt>
                <dd className="mt-1">
                  <a
                    href="tel:+14322638235"
                    className="font-display text-xl text-corten-700 hover:underline"
                  >
                    432.263.8235
                  </a>
                </dd>
              </div>
              <div>
                <dt className="slab text-[10px] tracking-[0.25em] text-stone2-500">
                  RESPONSE SLA
                </dt>
                <dd className="mt-1 font-display text-xl">
                  3 business days
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <span className="tick-rule block text-corten-500" />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Tools we use</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["axe-core", "https://github.com/dequelabs/axe-core", "Automated accessibility linting in CI"],
                ["Lighthouse", "https://developer.chrome.com/docs/lighthouse/accessibility/", "Per-deploy accessibility audits"],
                ["NVDA", "https://www.nvaccess.org/", "Screen-reader testing (Windows)"],
                ["VoiceOver", "https://www.apple.com/accessibility/", "Screen-reader testing (macOS/iOS)"],
                ["WAVE", "https://wave.webaim.org/", "Manual in-browser audits"],
              ].map(([name, href, desc]) => (
                <li key={name} className="border border-stone2-900/10 bg-white p-4">
                  <a
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg text-corten-700 hover:underline"
                  >
                    {name}
                  </a>
                  <p className="mt-1 text-xs text-stone2-600">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
