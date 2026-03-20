"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled app error", error.message);
  }, [error]);

  return (
    <main className="site-texture" aria-labelledby="error-title">
      <div className="page-container">
        <section className="studio-sheet motion-enter max-w-3xl">
          <p className="section-kicker">APP ERROR</p>
          <h1 id="error-title" className="hero-title mt-3 max-w-2xl text-[clamp(2.2rem,7vw,4.8rem)]">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
            Please retry. If this keeps happening, use the contact page and include what you were doing.
          </p>
          <button
            className="mt-7 min-h-11 border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--accent-soft)_66%,var(--paper-soft))] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_22px_-18px_var(--shadow-hard)] active:scale-[0.985]"
            onClick={() => reset()}
          >
            Try again
          </button>
        </section>
      </div>
    </main>
  );
}
