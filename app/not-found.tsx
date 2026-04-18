import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-bs flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-5xl">Trail&apos;s end.</h1>
      <p className="mt-4 max-w-md text-stone2-700">
        We couldn&apos;t find that page. Try the homepage, or ask a local at the
        CVB — they&apos;re friendlier than most search boxes.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Visit Big Spring
      </Link>
    </section>
  );
}
