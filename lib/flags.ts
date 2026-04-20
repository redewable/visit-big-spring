/**
 * Runtime feature flags. These are server-side only — the values never
 * reach the client bundle. Pages that branch on them should be marked
 * `dynamic = "force-dynamic"` so the check happens per-request.
 */

export function showDemoAdmin(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.SHOW_DEMO_ADMIN === "true"
  );
}
