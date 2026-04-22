/**
 * Address formatting helpers.
 *
 * Convention across the whole site: addresses display on two lines.
 *
 *   Line 1 · the street part
 *   Line 2 · City, ST ZIP
 *
 * The underlying data stays a single comma-separated string (compatible
 * with Schema.org `PostalAddress.streetAddress` / `addressLocality`),
 * and we split at the FIRST comma at render time.
 *
 * Examples:
 *   "1 Scenic Drive, Big Spring, TX 79720"
 *     → { street: "1 Scenic Drive", cityState: "Big Spring, TX 79720" }
 *
 *   "200 E 3rd St, Big Spring, TX 79720"
 *     → { street: "200 E 3rd St",  cityState: "Big Spring, TX 79720" }
 *
 * If no comma is present, `street` is the whole string and `cityState`
 * is empty — the caller should fall back gracefully.
 */
export function splitAddress(input: string): {
  street: string;
  cityState: string;
} {
  const i = input.indexOf(",");
  if (i === -1) return { street: input.trim(), cityState: "" };
  return {
    street: input.slice(0, i).trim(),
    cityState: input.slice(i + 1).trim(),
  };
}
