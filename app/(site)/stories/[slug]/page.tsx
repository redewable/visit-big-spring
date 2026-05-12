import Link from "next/link";
import { notFound } from "next/navigation";
import { storyBySlug, stories } from "@/lib/data";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = storyBySlug(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.dek };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.dek,
    datePublished: story.date,
    author: { "@type": "Organization", name: story.author },
    publisher: {
      "@type": "Organization",
      name: "Visit Big Spring",
    },
    image: story.image,
  };

  const paragraphs = story.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <article>
        <header
          className="relative isolate overflow-hidden bg-[#0b0a14] text-limestone-50"
        >
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${story.image})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,20,0.45) 0%, rgba(11,10,20,0.75) 75%, rgba(11,10,20,0.95) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="container-bs max-w-3xl py-28 md:py-40">
            <Link
              href="/stories"
              className="slab text-[10px] tracking-[0.25em] text-corten-400 hover:text-limestone-50"
            >
              ← STORIES
            </Link>
            <h1 className="monument mt-8 text-[clamp(2.5rem,6vw,4.5rem)]">
              {story.title}
            </h1>
            <p className="mt-6 font-display text-lg leading-relaxed text-limestone-50/85 md:text-xl">
              {story.dek}
            </p>
            <p className="cine-label mt-10 text-limestone-50/60">
              {new Date(story.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {story.readMinutes} min read · {story.author}
            </p>
          </div>
        </header>

        <div className="container-bs max-w-2xl py-20 md:py-28">
          {paragraphs.map((p, i) => {
            const isBoldLead = p.startsWith("**");
            return (
              <p
                key={i}
                className="mt-6 text-base leading-[1.7] text-stone2-900 md:text-lg md:leading-[1.75] first:mt-0"
                dangerouslySetInnerHTML={{
                  __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
                style={isBoldLead ? { marginTop: "2rem" } : undefined}
              />
            );
          })}

          <div className="mt-16 border-t border-stone2-900/15 pt-10">
            <p className="cine-label text-corten-700">Keep reading</p>
            <ul className="mt-6 space-y-6">
              {stories
                .filter((s) => s.slug !== story.slug)
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/stories/${s.slug}`} className="group block">
                      <p className="font-display text-2xl group-hover:text-corten-700">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm text-stone2-700">{s.dek}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
