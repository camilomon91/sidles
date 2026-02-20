import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="site-texture py-16" aria-labelledby="not-found-title">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">404 / NOT FOUND</p>
          <h1 id="not-found-title" className="mt-3 text-5xl font-black leading-[0.95] md:text-7xl">
            Wrong turn.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to something useful.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/sidlee"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-black bg-lime-300 px-6 py-3 text-sm font-bold uppercase tracking-wide transition active:scale-95 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111]"
            >
              Go to sidlee
            </Link>
            <Link
              href="/sidlee/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-black bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition active:scale-95 hover:bg-zinc-100"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
