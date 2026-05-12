/**
 * Icon set — small editorial SVGs specific to Big Spring's visual vocabulary.
 * Not Heroicons / Lucide. Drawn by hand for this site.
 */

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function TurbineIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Tower */}
      <path d="M12 22V11" />
      {/* Hub */}
      <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
      {/* 3 blades */}
      <path d="M12 10 L12 2" />
      <path d="M12 10 L19 14" />
      <path d="M12 10 L5 14" />
    </svg>
  );
}

export function WindmillIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Tower */}
      <path d="M9 22 L11 8 M15 22 L13 8" />
      <path d="M10 18 L14 18" />
      <path d="M10.5 14 L13.5 14" />
      {/* Hub + spokes */}
      <circle cx="12" cy="8" r="2.7" />
      <path d="M12 8 L12 3 M12 8 L17 8 M12 8 L8.5 11.5 M12 8 L15.5 11.5 M12 8 L8.5 4.5 M12 8 L15.5 4.5 M12 8 L7 8 M12 8 L12 13" strokeWidth="1" />
      {/* Tail */}
      <path d="M15 8 L21 6 L21 10 Z" />
    </svg>
  );
}

export function MesaIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M2 18 L6 12 L10 13 L13 8 L18 9 L22 14 L22 18 Z" />
      <path d="M2 18 L22 18" />
    </svg>
  );
}

export function CactusIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 22 V10 M12 14 Q9 14 9 11 V8 M12 16 Q15 16 15 13 V10" />
      <path d="M10 22 L14 22" />
    </svg>
  );
}

export function SpringIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3 C 8 8, 8 11, 12 14 C 16 11, 16 8, 12 3 Z" />
      <path d="M5 20 Q 8 18, 12 20 T 19 20" />
      <path d="M4 16 Q 8 14, 12 16 T 20 16" />
    </svg>
  );
}

export function PlaqueIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M8 9 H16 M8 13 H14 M8 17 H12" />
    </svg>
  );
}

export function CompassIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 L13 10 L12 12 L11 10 Z" fill="currentColor" />
      <path d="M12 21 L11 14 L12 12 L13 14 Z" />
    </svg>
  );
}

/* -------------------------------------------------------------- */
/* Pathway icons — used on the home page "Where do you start?"     */
/* -------------------------------------------------------------- */

export function HotelIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Tower with Art Deco stepped crown — Hotel Settles, 12 stories above podium */}
      <path d="M10 17 V7 H11 V6 H12 V5 H13 V6 H14 V7 H15 V17 Z" />
      {/* Center column hint */}
      <path d="M12.5 7 V17" />
      {/* Podium / base — extends only ~3 "windows" beyond tower on each side */}
      <path d="M7.5 17 H17.5 V20 H7.5 Z" />
      {/* Arched entrance at center */}
      <path d="M11.5 20 V18.5 Q12.5 17.8 13.5 18.5 V20" />
    </svg>
  );
}

export function CocktailGlassIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Martini bowl — wide V tapering to a point */}
      <path d="M4 4 L20 4 L12 13 Z" />
      {/* Stem */}
      <path d="M12 13 V20" />
      {/* Foot */}
      <path d="M7 20 H17" />
      {/* Olive garnish */}
      <circle cx="9" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BootIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Cowboy boot — tall shaft w/ v-notch, pointed toe, stacked heel */}
      <path
        d="M5 3 L7 3 L8 4.5 L9 3 L11 3 L11 12 L20 14 L22 15 L19 17 L9 17 L9 21 L3 21 L5 17 Z"
      />
      {/* Welt stitch at the instep — separates shaft from foot */}
      <path d="M11 13.5 L8.5 14.5" />
      {/* Pull strap on the back of the shaft */}
      <path d="M5.5 4.5 L5.5 7" />
    </svg>
  );
}

export function MapIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Folded map — three panels */}
      <path d="M3 5 L9 3 L15 5 L21 3 V19 L15 21 L9 19 L3 21 Z" />
      <path d="M9 3 V19" />
      <path d="M15 5 V21" />
      {/* Pin marker */}
      <path d="M12 8 Q10.5 8 10.5 9.5 Q10.5 11 12 12 Q13.5 11 13.5 9.5 Q13.5 8 12 8 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      {/* Body */}
      <rect x="3" y="5" width="18" height="16" rx="1" />
      {/* Header bar */}
      <path d="M3 10 H21" />
      {/* Binder rings */}
      <path d="M8 3 V7" />
      <path d="M16 3 V7" />
      {/* Date dots */}
      <circle cx="8" cy="14" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * A hand-drawn-feel horizontal rule with a small sun glyph in the middle.
 * Used as a section divider instead of straight Tailwind lines.
 */
export function SunRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 20"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M2 10 Q 20 8, 90 10" />
      <circle cx="110" cy="10" r="4.5" fill="currentColor" />
      <g stroke="currentColor">
        <path d="M110 2 L110 0.5" />
        <path d="M110 20 L110 18.5" />
        <path d="M103 4 L101.5 2.5" />
        <path d="M117 4 L118.5 2.5" />
        <path d="M103 16 L101.5 17.5" />
        <path d="M117 16 L118.5 17.5" />
      </g>
      <path d="M130 10 Q 200 12, 218 10" />
    </svg>
  );
}
