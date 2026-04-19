import { getCurrent, suggestionFor } from "@/lib/weather";

type Props = {
  /** Override coordinates (e.g. for an outdoor event at the state park). */
  lat?: number;
  lng?: number;
  /** Visual tone — matches the background it sits on. */
  tone?: "dark" | "light";
  /** Whether to show the context-aware suggestion string. */
  showSuggestion?: boolean;
  /** Prefix label (e.g. "NOW", "AT EVENT TIME"). */
  label?: string;
  className?: string;
};

/**
 * Server component that fetches current NWS conditions and renders a
 * small, accessible chip. Returns null if the fetch fails — the page
 * never breaks.
 */
export default async function WeatherChip({
  lat,
  lng,
  tone = "dark",
  showSuggestion = false,
  label = "Now in Big Spring",
  className = "",
}: Props) {
  const w = await getCurrent(lat, lng);
  if (!w) return null;

  const isDark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center gap-3 border px-3.5 py-2 text-sm ${
        isDark
          ? "border-limestone-50/25 bg-black/30 text-limestone-50 backdrop-blur"
          : "border-stone2-900/15 bg-white text-stone2-900"
      } ${className}`}
      aria-label={`Current conditions in Big Spring, ${w.temperature}°F, ${w.condition}`}
    >
      <ConditionGlyph condition={w.condition} isDark={isDark} />
      <div className="flex flex-col leading-tight">
        <span
          className={`slab text-[10px] tracking-[0.22em] ${
            isDark ? "text-limestone-50/70" : "text-stone2-500"
          }`}
        >
          {label}
        </span>
        <span className="font-display text-base">
          <span className="font-[600]">{w.temperature}°F</span>
          <span
            className={`mx-1.5 ${isDark ? "text-limestone-50/40" : "text-stone2-400"}`}
            aria-hidden="true"
          >
            ·
          </span>
          <span>{w.condition}</span>
        </span>
        {showSuggestion && (
          <span
            className={`text-xs ${
              isDark ? "text-limestone-50/75" : "text-stone2-600"
            }`}
          >
            {suggestionFor(w)}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Inline SVG condition glyph — not color-only per WCAG 1.4.1. A shape
 * always conveys the category even when the text wraps or color shifts.
 */
function ConditionGlyph({
  condition,
  isDark,
}: {
  condition: string;
  isDark: boolean;
}) {
  const c = condition.toLowerCase();
  const stroke = isDark ? "#f7f2e8" : "#211f1b";
  const size = 22;
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (c.includes("rain") || c.includes("shower")) {
    return (
      <svg {...p}>
        <path d="M7 14 a4 4 0 1 1 1 -7 a5 5 0 0 1 9 1 a3 3 0 0 1 1 6 Z" />
        <path d="M9 18 l-1 3 M13 18 l-1 3 M17 18 l-1 3" />
      </svg>
    );
  }
  if (c.includes("snow")) {
    return (
      <svg {...p}>
        <path d="M12 3 v18 M4 7 l16 10 M4 17 l16 -10" />
      </svg>
    );
  }
  if (c.includes("storm") || c.includes("thunder")) {
    return (
      <svg {...p}>
        <path d="M7 14 a4 4 0 1 1 1 -7 a5 5 0 0 1 9 1 a3 3 0 0 1 1 6 Z" />
        <path d="M11 15 l-2 4 h3 l-1 3" />
      </svg>
    );
  }
  if (c.includes("cloud")) {
    return (
      <svg {...p}>
        <path d="M7 17 a4 4 0 1 1 1 -7 a5 5 0 0 1 9 1 a3 3 0 0 1 1 6 Z" />
      </svg>
    );
  }
  if (c.includes("wind")) {
    return (
      <svg {...p}>
        <path d="M3 9 h13 a3 3 0 1 0 -3 -3 M3 15 h16 a3 3 0 1 1 -3 3" />
      </svg>
    );
  }
  if (c.includes("fog") || c.includes("haz")) {
    return (
      <svg {...p}>
        <path d="M3 8 h18 M3 12 h14 M3 16 h16" />
      </svg>
    );
  }
  // Default: sun
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2 v3 M12 19 v3 M2 12 h3 M19 12 h3 M5 5 l2 2 M17 17 l2 2 M5 19 l2 -2 M17 7 l2 -2" />
    </svg>
  );
}
