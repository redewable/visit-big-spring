import { getCurrent, suggestionFor } from "@/lib/weather";

type Props = {
  /** Override coordinates (e.g. for an outdoor event at the state park). */
  lat?: number;
  lng?: number;
  /** Visual tone — matches the background it sits on. */
  tone?: "dark" | "light";
  /** Show the context-aware suggestion line under the reading. */
  showSuggestion?: boolean;
  /**
   * Optional small label (e.g. "Now · Big Spring", "At the venue").
   * Omit for the cleanest inline reading.
   */
  label?: string;
  className?: string;
};

/**
 * Typographic weather reading. No border, no background — flows as type.
 * Default output:
 *
 *   [☀]  72°  CLEAR
 *
 * With a label + suggestion, it layers like a dateline:
 *
 *   AT THE VENUE
 *   [☀]  72°  CLEAR
 *        Perfect for the Scenic Mountain loop.
 *
 * Server component. Returns null on fetch failure so the page never breaks.
 */
export default async function WeatherChip({
  lat,
  lng,
  tone = "dark",
  showSuggestion = false,
  label,
  className = "",
}: Props) {
  const w = await getCurrent(lat, lng);
  if (!w) return null;

  const isDark = tone === "dark";

  const labelClass = isDark ? "text-limestone-50/60" : "text-stone2-500";
  const tempClass = isDark ? "text-limestone-50" : "text-stone2-900";
  const condClass = isDark ? "text-limestone-50/70" : "text-stone2-600";
  const dotClass = isDark ? "bg-limestone-50/35" : "bg-stone2-900/25";
  const suggestionClass = isDark ? "text-limestone-50/80" : "text-stone2-700";

  return (
    <div
      className={`flex items-start gap-3 ${className}`}
      aria-label={`Current conditions in Big Spring, ${w.temperature} degrees Fahrenheit, ${w.condition}`}
    >
      <ConditionGlyph condition={w.condition} isDark={isDark} />
      <div className="leading-[1.15]">
        {label && (
          <p className={`slab text-[10px] tracking-[0.28em] uppercase ${labelClass}`}>
            {label}
          </p>
        )}
        <p
          className={`flex items-baseline gap-2.5 ${
            label ? "mt-1.5" : ""
          }`}
        >
          <span
            className={`font-display text-[26px] font-[600] tabular-nums ${tempClass}`}
          >
            {w.temperature}°
          </span>
          <span
            aria-hidden="true"
            className={`inline-block h-1 w-1 rounded-full ${dotClass}`}
          />
          <span
            className={`slab text-[10px] tracking-[0.25em] uppercase ${condClass}`}
          >
            {w.condition}
          </span>
        </p>
        {showSuggestion && (
          <p
            className={`mt-2 max-w-xs font-display text-sm italic leading-snug ${suggestionClass}`}
          >
            {suggestionFor(w)}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Inline SVG condition glyph. A shape always conveys the category even
 * when color shifts or contrast inverts (WCAG 1.4.1).
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
  const opacity = isDark ? 0.85 : 0.7;
  const p = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeOpacity: opacity,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "mt-2 shrink-0",
  };

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
