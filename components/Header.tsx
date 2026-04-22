"use client";

import Link from "next/link";
import { useState } from "react";
import { sections } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone2-900/10 bg-sand-50/85 backdrop-blur">
      <div className="container-bs flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Visit Big Spring — home"
        >
          {/* Official Visit Big Spring wordmark (PNG-in-SVG, 332×199) */}
          <img
            src="/assets/brand/big-spring-logo.svg"
            alt="Visit Big Spring"
            width="332"
            height="199"
            className="h-12 w-auto md:h-14"
            decoding="async"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {sections.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              className="cine-label text-stone2-900/80 transition hover:text-corten-700"
              style={{ letterSpacing: "0.22em", fontSize: "0.7rem" }}
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/meetings"
            className="cine-label text-stone2-900/80 transition hover:text-corten-700"
            style={{ letterSpacing: "0.22em", fontSize: "0.7rem" }}
          >
            Meetings
          </Link>
          <Link
            href="/stories"
            className="cine-label text-stone2-900/80 transition hover:text-corten-700"
            style={{ letterSpacing: "0.22em", fontSize: "0.7rem" }}
          >
            Stories
          </Link>
          <Link
            href="/itinerary"
            className="btn-primary !py-2 !px-5 text-xs"
            style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Plan a Trip
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-stone2-900/20 md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-stone2-900/10 bg-sand-50 md:hidden"
        >
          <ul className="container-bs flex flex-col py-2">
            {sections.map((s) => (
              <li key={s.key} className="border-b border-stone2-900/10 last:border-0">
                <Link
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl text-stone2-900"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-stone2-900/10">
              <Link
                href="/meetings"
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-stone2-900"
              >
                Meetings
              </Link>
            </li>
            <li className="border-b border-stone2-900/10">
              <Link
                href="/stories"
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-stone2-900"
              >
                Stories
              </Link>
            </li>
            <li className="py-4">
              <Link
                href="/itinerary"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Plan a Trip
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

