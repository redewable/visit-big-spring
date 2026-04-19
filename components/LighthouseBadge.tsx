import scores from "@/public/lighthouse-scores.json";

type Scores = {
  runOn: string;
  url: string;
  formFactor?: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  status?: string;
};

/**
 * Renders four Lighthouse badges plus an audit timestamp. If the scores
 * file hasn't been populated yet, renders a small "awaiting first audit"
 * placeholder instead.
 */
export default function LighthouseBadge() {
  const s = scores as Scores;
  const ready = s.status !== "awaiting-first-run" && s.performance > 0;

  if (!ready) {
    return (
      <div
        className="border border-limestone-100/15 bg-white/5 p-4"
        aria-label="Lighthouse audit pending"
      >
        <p className="slab text-[10px] tracking-[0.25em] text-corten-400">
          Lighthouse · awaiting first audit
        </p>
        <p className="mt-2 text-xs text-limestone-100/60">
          Scores populate after the next deploy. Re-run with{" "}
          <code className="font-mono">npm run lighthouse</code>.
        </p>
      </div>
    );
  }

  const date = new Date(s.runOn).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div aria-label="Latest Lighthouse audit scores">
      <p className="slab text-[10px] tracking-[0.25em] text-corten-400">
        Lighthouse · mobile
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill label="Performance" value={s.performance} />
        <Pill label="A11y" value={s.accessibility} />
        <Pill label="Best Practices" value={s.bestPractices} />
        <Pill label="SEO" value={s.seo} />
      </div>
      <p className="mt-3 text-[11px] text-limestone-100/60">
        Audited {date}
      </p>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: number }) {
  const bg =
    value >= 90 ? "#B85C3A" : value >= 70 ? "#2f6d92" : "#7b7566";
  return (
    <span
      className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 text-xs"
      title={`${label}: ${value} / 100`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: bg }}
      />
      <span className="slab text-[9px] tracking-[0.22em] text-limestone-100/70">
        {label}
      </span>
      <span className="font-display text-sm tabular-nums text-limestone-50">
        {value}
      </span>
    </span>
  );
}
