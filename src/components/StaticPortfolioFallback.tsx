import Button from "@/components/ui/Button";

export default function StaticPortfolioFallback({ reason }: { reason?: string }) {
  return (
    <main className="site-texture py-16 md:py-20">
      <div className="page-container">
        <section className="studio-sheet section-space motion-enter">
          <p className="section-kicker">PORTFOLIO / FALLBACK</p>
          <h1 className="hero-title mt-3 max-w-4xl">CMS temporarily unavailable</h1>
          <p className="mt-5 max-w-3xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[var(--ink-muted)]">
            The page is showing a fallback view while we reconnect to Storyblok.
          </p>
          {reason ? <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Reason: {reason}</p> : null}

          <div className="cta-row mt-8">
            <Button href="/">Back home</Button>
            <Button href="/portfolio/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
