import { NextResponse } from "next/server";

/**
 * POST /api/passes-interest
 * Accepts: { email: string }
 *
 * In the prototype we log to stdout and store in an in-memory Set so repeat
 * submissions are de-duped during the process lifetime. On Vercel this will
 * reset on every invocation — that's fine for the pitch.
 *
 * TODO: Post-award, swap this for a call into Mailchimp/Klaviyo/Brevo via
 * their HTTP APIs. Keep this route shape stable so the client form doesn't
 * need to change.
 */

const seen = new Set<string>();

function isEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // fall through — invalid JSON caught below
  }

  const email = (body as { email?: unknown } | null)?.email;
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  const normalized = email.trim().toLowerCase();
  const wasNew = !seen.has(normalized);
  seen.add(normalized);

  // eslint-disable-next-line no-console
  console.log(
    `[passes-interest] ${wasNew ? "NEW" : "dup"} submission: ${normalized} — total in memory: ${seen.size}`,
  );

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Never expose real addresses; just confirm the endpoint is alive.
  return NextResponse.json({ ok: true, route: "passes-interest" });
}
