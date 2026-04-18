/**
 * WestTexasScene — cinematic SVG of the Big Spring horizon.
 *
 * Drawn for this site. Layers, back to front:
 *   1. Graded dusk sky (obsidian → wine → rust → bone)
 *   2. Sun glow + hard sun disc, offset
 *   3. Far caprock ridgeline (hazed atmosphere)
 *   4. Wind-turbine ridge — West Texas signature, visible from I-20
 *   5. Mid ridge
 *   6. Lone ranch windmill
 *   7. Near foreground plain
 *   8. Dark vignette top and bottom for cinematic crop
 *
 * No clip-art flora. No cartoon cactus. Just a horizon.
 */

type Props = {
  className?: string;
  /**
   * Optional: when CVB supplies real drone footage, pass its URL here.
   * The video overlays the SVG, which remains as a graceful fallback and
   * poster during load. Muted, looped, inline — no autoplay controls.
   */
  videoSrc?: string;
  /** Optional poster frame for the video. */
  videoPoster?: string;
};

export default function WestTexasScene({
  className = "",
  videoSrc,
  videoPoster,
}: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {videoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          poster={videoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${videoSrc ? "opacity-0" : ""}`}
      role="img"
    >
      <defs>
        {/* Graded dusk: obsidian up top, wine, rust core, faint bone on horizon */}
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b0a14" />
          <stop offset="22%" stopColor="#1a1324" />
          <stop offset="45%" stopColor="#4a2230" />
          <stop offset="68%" stopColor="#8f3f24" />
          <stop offset="88%" stopColor="#d88a4e" />
          <stop offset="100%" stopColor="#e6b57a" />
        </linearGradient>

        {/* Localized sun glow */}
        <radialGradient id="sunGlow" cx="0.68" cy="0.72" r="0.45">
          <stop offset="0%" stopColor="#ffe3b3" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#f0a35f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8f3f24" stopOpacity="0" />
        </radialGradient>

        {/* Atmospheric haze pushed into far ridge */}
        <linearGradient id="farHaze" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8f3f24" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a0a0d" stopOpacity="0.5" />
        </linearGradient>

        {/* Bottom vignette for cinematic crop */}
        <linearGradient id="bottomVignette" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.75" />
        </linearGradient>

        {/* Top vignette */}
        <linearGradient id="topVignette" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* SVG noise texture */}
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#sky)" />
      <rect width="1600" height="900" fill="url(#sunGlow)" />

      {/* Sun disc — low, warm, slightly flattened; slow drift downward */}
      <ellipse
        cx="1100"
        cy="640"
        rx="70"
        ry="64"
        fill="#ffd995"
        opacity="0.92"
        className="ws-sun"
      />

      {/* Layer 2 — farthest ridge (heavily hazed) */}
      <g opacity="0.6">
        <path
          d="M0,660 L160,640 L310,655 L460,620 L620,645 L800,610 L960,630 L1140,590
             L1320,620 L1500,595 L1600,610 L1600,900 L0,900 Z"
          fill="#6a3318"
        />
      </g>

      {/* Layer 3 — wind turbine ridge (CSS-animated rotors) */}
      <g>
        <Turbine x={150} y={690} scale={0.62} speed={14} />
        <Turbine x={290} y={700} scale={0.54} speed={11} />
        <Turbine x={430} y={675} scale={0.68} speed={17} />
        <Turbine x={600} y={685} scale={0.58} speed={13} />
        <Turbine x={760} y={668} scale={0.64} speed={19} />
        <Turbine x={1300} y={618} scale={0.58} speed={12} />
        <Turbine x={1440} y={605} scale={0.64} speed={16} />
      </g>

      {/* Layer 4 — near ridge, darker */}
      <path
        d="M0,760 L140,735 L260,755 L400,722 L560,745 L720,718 L880,738 L1040,710
           L1200,740 L1360,720 L1520,745 L1600,730 L1600,900 L0,900 Z"
        fill="#2a1210"
      />

      {/* Layer 5 — lone ranch windmill, silhouetted against near ridge */}
      <Windmill x={1220} y={770} />

      {/* Layer 6 — prairie floor, near solid */}
      <path d="M0,820 L1600,820 L1600,900 L0,900 Z" fill="#0a0404" />

      {/* Atmospheric horizon wash over ridges */}
      <rect y="580" width="1600" height="320" fill="url(#farHaze)" opacity="0.7" />

      {/* Vignettes */}
      <rect width="1600" height="240" fill="url(#topVignette)" />
      <rect y="660" width="1600" height="240" fill="url(#bottomVignette)" />

      {/* Subtle film grain */}
      <rect width="1600" height="900" filter="url(#grain)" opacity="0.4" />
    </svg>
    </div>
  );
}

function Turbine({
  x,
  y,
  scale = 1,
  speed = 16,
}: {
  x: number;
  y: number;
  scale?: number;
  /** Seconds per full rotation. Larger turbines turn slower. */
  speed?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#0a0505">
      <polygon points="-2.5,0 2.5,0 1.8,-110 -1.8,-110" />
      <rect x="-6" y="-116" width="14" height="6" rx="2" />
      <g transform="translate(0 -113)">
        {/* Rotor group — CSS rotates this around its local origin (hub) */}
        <g
          className="ws-turbine-rotor"
          style={{ "--ws-speed": `${speed}s` } as React.CSSProperties}
        >
          <circle r="2.4" />
          <Blade />
          <g transform="rotate(120)">
            <Blade />
          </g>
          <g transform="rotate(240)">
            <Blade />
          </g>
        </g>
      </g>
    </g>
  );
}

function Blade() {
  return (
    <path
      d="M0,0 Q1.6,-18 0.8,-42 Q0,-48 -0.8,-42 Q-1.6,-18 0,0 Z"
      fill="#0a0505"
    />
  );
}

function Windmill({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="#060202"
      stroke="#060202"
      strokeWidth="1.3"
    >
      {/* Tower — lattice */}
      <polyline points="-11,0 -4,-74 4,-74 11,0" fill="none" />
      <polyline points="-7,-26 7,-26" />
      <polyline points="-5,-46 5,-46" />
      <polyline points="-9,-14 9,-14" strokeOpacity="0.5" />
      {/* Hub */}
      <circle cx="0" cy="-80" r="2" />
      {/* Fan */}
      <g transform="translate(0 -80) rotate(10)">
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d="M0,0 L8,-0.8 L8,0.8 Z"
            transform={`rotate(${(i * 360) / 14})`}
          />
        ))}
      </g>
      {/* Tail vane */}
      <polygon points="3,-78 20,-84 20,-72" />
    </g>
  );
}
