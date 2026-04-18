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
  strokeWidth: 1.5,
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
