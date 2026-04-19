#!/usr/bin/env node
/**
 * Runs Google Lighthouse against a URL (default: the live Vercel deploy)
 * and writes a compact score JSON to `public/lighthouse-scores.json` for
 * the Footer badge component to read at build time.
 *
 * Usage:
 *   node scripts/lighthouse.mjs                      # live URL
 *   node scripts/lighthouse.mjs http://localhost:3000  # local
 *
 * Depends on `npx lighthouse` (no local install needed).
 */

import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, unlinkSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const url = process.argv[2] || "https://visit-big-spring.vercel.app/";
const tmp = resolve(process.cwd(), ".lighthouse.tmp.json");
const out = resolve(process.cwd(), "public/lighthouse-scores.json");

console.log(`➜  Running Lighthouse against ${url}`);
console.log(`   (this takes ~40 seconds — grab a coffee)\n`);

try {
  execSync(
    [
      "npx", "-y", "lighthouse",
      `"${url}"`,
      "--output=json",
      `--output-path="${tmp}"`,
      '--chrome-flags="--headless --no-sandbox --disable-gpu"',
      "--only-categories=performance,accessibility,best-practices,seo",
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",
      "--quiet",
    ].join(" "),
    { stdio: "inherit" },
  );
} catch (err) {
  console.error("Lighthouse run failed.");
  if (existsSync(tmp)) unlinkSync(tmp);
  process.exit(1);
}

const raw = JSON.parse(readFileSync(tmp, "utf8"));
unlinkSync(tmp);

const score = (cat) => Math.round((raw.categories?.[cat]?.score ?? 0) * 100);

const compact = {
  runOn: new Date().toISOString(),
  url,
  formFactor: "mobile",
  performance: score("performance"),
  accessibility: score("accessibility"),
  bestPractices: score("best-practices"),
  seo: score("seo"),
  status: "ok",
};

writeFileSync(out, JSON.stringify(compact, null, 2) + "\n");
console.log("\n✓  Wrote", out);
console.log(`   Performance   ${compact.performance}`);
console.log(`   Accessibility ${compact.accessibility}`);
console.log(`   Best Practices ${compact.bestPractices}`);
console.log(`   SEO           ${compact.seo}`);
