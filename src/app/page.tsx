import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="site-texture py-16 md:py-20" aria-labelledby="home-title">
      <div className="page-container">
        <section className="studio-sheet section-space motion-enter">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-kicker">PORTFOLIO STUDIO / HOME</p>
              <h1 id="home-title" className="hero-title mt-3 max-w-4xl">
                Camilo Montero
              </h1>
              <p className="mt-6 max-w-3xl text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-[var(--ink-muted)]">
                This portfolio pairs Storyblok flexibility with polished React and Next.js implementation. The goal is
                simple: move from good-looking pages to memorable digital experiences.
              </p>
              <div className="cta-row mt-8">
                <Button href="/portfolio">View portfolio</Button>
                <Button href="/portfolio/contact" variant="ghost">
                  Start a project
                </Button>
              </div>
            </div>

            <aside className="studio-note">
              <p className="section-kicker">CREATIVE STACK</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed">
                React 19, Next.js App Router, Tailwind CSS, Storyblok content modeling, and motion-led interactions
                tuned for usability and speed.
              </p>
              <p className="mt-3 text-[0.98rem] leading-relaxed">
                Built to be edited by content teams, but still feel hand-crafted at the interface layer.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
