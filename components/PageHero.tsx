type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  accent?: "corten" | "obsidian" | "sand";
};

/**
 * Reusable section hero — cinematic, monumental, mobile-first.
 * `accent` controls the background: corten (warm rust), obsidian (near-black),
 * or sand (light). `image` optionally layers a photograph underneath a dark wash.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  accent = "sand",
}: Props) {
  const onDark = accent !== "sand";

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-labelledby="page-hero-title"
      style={{ backgroundColor: bgColor(accent) }}
    >
      {image && (
        <>
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                accent === "obsidian"
                  ? "linear-gradient(180deg, rgba(11,10,20,0.75) 0%, rgba(11,10,20,0.55) 50%, rgba(11,10,20,0.9) 100%)"
                  : accent === "corten"
                  ? "linear-gradient(180deg, rgba(106,51,24,0.72) 0%, rgba(106,51,24,0.55) 50%, rgba(106,51,24,0.9) 100%)"
                  : "linear-gradient(180deg, rgba(11,10,20,0.12) 0%, rgba(251,248,242,0.6) 100%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="container-bs py-24 md:py-36">
        <span
          className="tick-rule block"
          style={{ color: onDark ? "#ebe2cf" : "#8c4622" }}
        />
        <p
          className="cine-label mt-5"
          style={{ color: onDark ? "rgba(235,226,207,0.8)" : "#6a3318" }}
        >
          {eyebrow}
        </p>
        <h1
          id="page-hero-title"
          className="monument mt-5 text-[clamp(2.75rem,8vw,6rem)]"
          style={{ color: onDark ? "#f7f2e8" : "#211f1b" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-7 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: onDark ? "rgba(247,242,232,0.88)" : "#4a463d" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

function bgColor(a: Props["accent"]) {
  if (a === "obsidian") return "#0b0a14";
  if (a === "corten") return "#6a3318";
  return "#fbf8f2";
}
