import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-texture" aria-labelledby="not-found-title">
      <div className="page-container">
        <section className="studio-sheet motion-enter max-w-3xl">
          <p className="section-kicker">404 / NOT FOUND</p>
          <h1 id="not-found-title" className="hero-title mt-3 max-w-2xl text-[clamp(2.2rem,7vw,4.8rem)]">
            Page not found
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
            The page you requested does not exist or may have moved.
          </p>
          <Link
            className="mt-7 inline-flex min-h-11 items-center border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--accent-soft)_60%,var(--paper-soft))] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_22px_-18px_var(--shadow-hard)]"
            href="/"
          >
            Back to home
          </Link>
        </section>
      </div>
    </main>
  );
}
