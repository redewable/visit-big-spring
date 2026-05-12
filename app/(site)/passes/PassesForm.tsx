"use client";

import { useState } from "react";

export default function PassesForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const disabled = state === "submitting" || state === "ok";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/passes-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState("ok");
      setMessage("Thanks — we'll email you when the Pass launches.");
    } catch {
      setState("error");
      setMessage("Couldn't reach the server. Please try again.");
    }
  }

  if (state === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-corten-500 bg-corten-500/10 p-6"
      >
        <p className="slab text-[10px] tracking-[0.25em] text-corten-700">
          You&apos;re on the list.
        </p>
        <p className="mt-2 font-display text-xl">{message}</p>
        <p className="mt-3 text-sm text-stone2-600">
          We&apos;ll send one email when the Pass launches. No other lists.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md" aria-label="Notify me about the Explorer Pass">
      <label htmlFor="pass-email" className="slab text-[10px] tracking-[0.25em] text-corten-700">
        Email — early access
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="pass-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          className="w-full flex-1 border border-stone2-900/20 bg-white px-4 py-3 text-sm focus:border-corten-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled}
          className="btn-primary !rounded-none shrink-0 disabled:opacity-50"
        >
          {state === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {state === "error" && (
        <p
          role="alert"
          className="mt-3 text-sm text-corten-700"
        >
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-stone2-500">
        One email. When the Pass launches. That&apos;s it.
      </p>
    </form>
  );
}
