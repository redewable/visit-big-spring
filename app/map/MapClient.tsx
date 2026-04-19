"use client";

import dynamic from "next/dynamic";
import type { Business } from "@/lib/data";

/**
 * Client wrapper that lazy-loads the real MapboxMap (~450 kB of mapbox-gl)
 * only when this component mounts. Keeps the initial /map payload small and
 * lets Lighthouse score the page fairly on TBT/LCP.
 */
const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-live="polite"
      className="flex h-[520px] w-full items-center justify-center border border-stone2-900/15 bg-stone2-100 text-stone2-500"
    >
      <span className="slab text-[10px] tracking-[0.25em]">
        Loading the map…
      </span>
    </div>
  ),
});

export default function MapClient({
  token,
  businesses,
}: {
  token?: string;
  businesses: Business[];
}) {
  return <MapboxMap token={token} businesses={businesses} />;
}
