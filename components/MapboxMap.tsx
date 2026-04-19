"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl, { type LngLatLike, type Map as MbMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Business, SectionKey } from "@/lib/data";

const CATEGORY_COLOR: Record<SectionKey, string> = {
  stay: "#2f6d92",         // sky
  "eat-drink": "#B85C3A",  // mesa
  explore: "#6a8363",      // sage
  history: "#846b36",      // sand-dark
  events: "#8a3e23",       // mesa-deep
};

const CATEGORY_GLYPH: Record<SectionKey, string> = {
  stay: "▲",        // triangle (bed/roof)
  "eat-drink": "●", // disc
  explore: "■",     // square
  history: "◆",     // diamond
  events: "✶",      // star
};

const CATEGORY_LABEL: Record<SectionKey, string> = {
  stay: "Stay",
  "eat-drink": "Eat & Drink",
  explore: "Explore",
  history: "History",
  events: "Events",
};

type Props = {
  /** The CVB's Mapbox public token. Passed from the server component so
   *  we don't reach for `process.env` on the client. */
  token?: string;
  businesses: Business[];
};

const DEFAULT_CENTER: LngLatLike = [-101.4787, 32.2504]; // downtown Big Spring
const DEFAULT_ZOOM = 12.2;

/**
 * Client-only Mapbox map. Draws one pin per business, shape + color-coded by
 * category (color is never the sole indicator per WCAG 1.4.1 — every pin
 * carries its category glyph and, when focused, a text label).
 *
 * Falls back gracefully to a plain list if no token is configured.
 */
export default function MapboxMap({ token, businesses }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MbMap | null>(null);
  const [active, setActive] = useState<Business | null>(null);
  const [enabled, setEnabled] = useState<Record<SectionKey, boolean>>({
    stay: true,
    "eat-drink": true,
    explore: true,
    history: true,
    events: true,
  });
  const [ready, setReady] = useState(false);

  const visible = useMemo(
    () => businesses.filter((b) => enabled[b.category]),
    [businesses, enabled],
  );

  // Initialize map once.
  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      attributionControl: true,
      cooperativeGestures: true, // requires Ctrl-scroll on desktop — better page scroll UX
    });
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), "top-right");
    map.on("load", () => setReady(true));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  // Re-render markers when the visible set changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    // Clear existing markers by reusing a single container attribute.
    const existing = document.querySelectorAll(".vbs-marker-root");
    existing.forEach((el) => el.remove());

    for (const b of visible) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "vbs-marker-root";
      el.setAttribute(
        "aria-label",
        `${b.name} — ${CATEGORY_LABEL[b.category]}`,
      );
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.display = "grid";
      el.style.placeItems = "center";
      el.style.cursor = "pointer";
      el.style.border = "0";
      el.style.background = "transparent";
      el.style.padding = "0";

      el.innerHTML = `
        <span style="
          position:relative;
          display:grid;
          place-items:center;
          width:28px;
          height:28px;
          border-radius:50%;
          background:${CATEGORY_COLOR[b.category]};
          color:#f7f2e8;
          font-family: 'Rye', Georgia, serif;
          font-size:14px;
          line-height:1;
          border:2px solid #f7f2e8;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        ">${CATEGORY_GLYPH[b.category]}</span>
      `;
      el.addEventListener("click", () => setActive(b));
      el.addEventListener("keydown", (ev) => {
        if ((ev as KeyboardEvent).key === "Enter") setActive(b);
      });

      new mapboxgl.Marker({ element: el })
        .setLngLat([b.lng, b.lat])
        .addTo(map);
    }
  }, [visible, ready]);

  // -------- token missing → graceful fallback list --------
  if (!token) {
    return (
      <div className="border border-stone2-900/15 bg-white p-8">
        <p className="slab text-[10px] tracking-[0.25em] text-corten-700">
          Map unavailable
        </p>
        <p className="mt-2 max-w-prose text-sm text-stone2-700">
          The interactive map requires a Mapbox public token
          (<code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code>). Set one
          in your <code>.env.local</code> or Vercel environment to enable
          it. Meanwhile, below is the full list of mapped places.
        </p>
        <PinList businesses={businesses} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Category filters */}
      <div
        role="group"
        aria-label="Filter map pins by category"
        className="mb-4 flex flex-wrap gap-2"
      >
        {(Object.keys(CATEGORY_LABEL) as SectionKey[]).map((key) => {
          const on = enabled[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() =>
                setEnabled((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                on
                  ? "border-stone2-900 bg-stone2-900 text-limestone-50"
                  : "border-stone2-900/20 bg-white text-stone2-700 hover:border-stone2-900"
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-grid h-4 w-4 place-items-center rounded-full border border-white/30 font-display text-[10px]"
                style={{
                  background: CATEGORY_COLOR[key],
                  color: "#f7f2e8",
                }}
              >
                {CATEGORY_GLYPH[key]}
              </span>
              {CATEGORY_LABEL[key]}
            </button>
          );
        })}
      </div>

      {/* Map canvas */}
      <div
        ref={containerRef}
        role="application"
        aria-label="Interactive map of Big Spring attractions"
        className="relative h-[520px] w-full border border-stone2-900/15 bg-stone2-100"
        tabIndex={0}
      />

      {/* Popover */}
      {active && (
        <div
          role="dialog"
          aria-label={`${active.name} details`}
          className="absolute bottom-4 left-4 right-4 border border-stone2-900/15 bg-white p-5 shadow-lg md:left-4 md:right-auto md:w-80"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="slab text-[10px] tracking-[0.25em] text-corten-700">
                {CATEGORY_LABEL[active.category]}
              </p>
              <p className="mt-1 font-display text-xl">{active.name}</p>
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="rounded-sm px-2 py-1 text-stone2-500 hover:text-stone2-900"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 text-xs text-stone2-500">{active.address}</p>
          <a
            href={`/businesses/${active.slug}`}
            className="slab mt-4 inline-flex items-center gap-1 text-[10px] tracking-[0.25em] text-corten-700 hover:underline"
          >
            VIEW DETAILS →
          </a>
        </div>
      )}
    </div>
  );
}

function PinList({ businesses }: { businesses: Business[] }) {
  return (
    <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map((b) => (
        <li
          key={b.slug}
          className="flex items-start gap-3 border border-stone2-900/10 bg-sand-50 p-3 text-sm"
        >
          <span
            aria-hidden="true"
            className="mt-1 inline-block h-3 w-3 rounded-full"
            style={{ background: CATEGORY_COLOR[b.category] }}
          />
          <div>
            <p className="font-medium">{b.name}</p>
            <p className="text-xs text-stone2-500">{b.address}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
