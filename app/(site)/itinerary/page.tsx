"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { businesses, events, formatEventDate } from "@/lib/data";

type StopType = "business" | "event";
type Stop = { id: string; type: StopType; name: string; note: string };

export default function ItineraryBuilderPage() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [query, setQuery] = useState("");

  const candidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    const biz = businesses.map((b) => ({
      id: `b:${b.slug}`,
      type: "business" as const,
      name: b.name,
      note: b.address,
    }));
    const ev = events.map((e) => ({
      id: `e:${e.slug}`,
      type: "event" as const,
      name: e.title,
      note: `${formatEventDate(e)} · ${e.location}`,
    }));
    const all = [...biz, ...ev];
    if (!q) return all.slice(0, 8);
    return all.filter(
      (s) => s.name.toLowerCase().includes(q) || s.note.toLowerCase().includes(q)
    );
  }, [query]);

  const add = (s: Stop) => {
    if (stops.some((x) => x.id === s.id)) return;
    setStops((prev) => [...prev, s]);
  };
  const remove = (id: string) => setStops((prev) => prev.filter((s) => s.id !== id));
  const move = (id: string, dir: -1 | 1) => {
    setStops((prev) => {
      const i = prev.findIndex((s) => s.id === id);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const ids = stops.map((s) => s.id).join(",");
    return `${window.location.origin}/itinerary?t=${encodeURIComponent(ids)}`;
  }, [stops]);

  return (
    <section className="container-bs py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">Trip planner</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Build your Big Spring weekend.</h1>
        <p className="mt-4 text-stone2-700">
          Search attractions, dining and events, then drag the order that suits
          you. Save it, print it, or text the link to your travel crew. In
          production this will sync to the CMS and generate an optimized route
          on the interactive map.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Pick */}
        <section aria-labelledby="pick-title" className="rounded-2xl bg-white p-6 shadow-card">
          <h2 id="pick-title" className="font-display text-2xl">Add a stop</h2>
          <label className="mt-4 block">
            <span className="sr-only">Search attractions, restaurants or events</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places or events…"
              className="w-full rounded-full border border-stone2-200 px-4 py-2 text-sm"
            />
          </label>

          <ul className="mt-5 space-y-2">
            {candidates.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-stone2-100 p-3"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-stone2-500">{c.note}</p>
                </div>
                <button
                  type="button"
                  onClick={() => add(c)}
                  className="btn-ghost !py-1 !px-3 text-xs"
                >
                  Add
                </button>
              </li>
            ))}
            {candidates.length === 0 && (
              <li className="text-sm text-stone2-500">No matches — try another term.</li>
            )}
          </ul>
        </section>

        {/* Plan */}
        <section aria-labelledby="plan-title" className="rounded-2xl bg-white p-6 shadow-card">
          <h2 id="plan-title" className="font-display text-2xl">Your trip ({stops.length})</h2>
          {stops.length === 0 ? (
            <p className="mt-4 text-sm text-stone2-500">
              Nothing added yet — start from the list on the left.
            </p>
          ) : (
            <ol className="mt-4 space-y-3">
              {stops.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-start gap-3 rounded-xl border border-stone2-100 p-3"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mesa-500 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-stone2-500">{s.note}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={i === 0}
                      onClick={() => move(s.id, -1)}
                      className="rounded border border-stone2-200 px-2 py-1 text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={i === stops.length - 1}
                      onClick={() => move(s.id, 1)}
                      className="rounded border border-stone2-200 px-2 py-1 text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${s.name}`}
                      onClick={() => remove(s.id)}
                      className="rounded border border-stone2-200 px-2 py-1 text-xs text-mesa-700"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {stops.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
                className="btn-primary !py-2 text-sm"
              >
                Copy share link
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-ghost !py-2 text-sm"
              >
                Print
              </button>
              <Link href="/map" className="btn-ghost !py-2 text-sm">
                View on map
              </Link>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
