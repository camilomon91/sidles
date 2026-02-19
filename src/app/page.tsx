import AnimatedLink from "@/components/ui/AnimatedLink";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BrutalModeToggle from "@/components/home/BrutalModeToggle";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="site-texture">
      <div className="page-container py-10">
        <div className="grid-12 gap-8">
          <aside className="col-span-12 md:col-span-3">
            <div className="timeline-nav md:sticky md:top-6">
              <p className="text-xs font-black uppercase tracking-[0.2em]">Flow</p>
              <nav aria-label="Scroll progress" className="mt-4 grid gap-2">
                <AnimatedLink href="#brief">Brief</AnimatedLink>
                <AnimatedLink href="#build">Build</AnimatedLink>
                <AnimatedLink href="#qa">QA</AnimatedLink>
                <AnimatedLink href="#launch">Launch</AnimatedLink>
              </nav>
            </div>
          </aside>

          <div className="col-span-12 space-y-10 md:col-span-9 md:space-y-14">
            <header id="brief" className="section-space border-2 border-black bg-white p-6 md:p-10">
              <nav aria-label="Primary" className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.2em]">Sidlee • Full-stack + creative delivery</p>
                <div className="flex flex-wrap items-center gap-5">
                  <AnimatedLink href="#build">View work</AnimatedLink>
                  <AnimatedLink href="/sidlee/contact">Contact</AnimatedLink>
                  <BrutalModeToggle />
                </div>
              </nav>

              <div className="relative">
                <p className="hero-watermark" aria-hidden>
                  FULL STACK
                </p>
                <div className="relative z-10">
                  <h1 className="hero-title">
                    Full-stack developer with an <span className="underline-neon">agency mindset</span>.
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg font-medium">
                    I translate briefs into launch-ready product work by balancing UX, engineering, performance, and
                    creative direction.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button href="#build">View work</Button>
                    <Button href="/sidlee/contact" variant="ghost">
                      Contact / Download CV
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <section id="build" className="section-space border-2 border-black bg-zinc-50 p-6 md:p-10">
              <p className="section-kicker">What I notice</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] md:text-5xl">
                Most teams don&apos;t fail on code. They fail on unclear tradeoffs.
              </h2>
              <p className="mt-5 max-w-3xl text-lg font-medium">
                My lens: clarify constraints early, move fast with intent, and protect quality through progressive QA.
              </p>
            </section>

            <section id="qa" className="section-space border-2 border-black bg-white p-6 md:p-10">
              <p className="section-kicker">Proof</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.slug} className="motion-enter">
                    <h3 className="text-2xl font-black leading-[0.95]">{project.title}</h3>
                    <p className="mt-3 text-base font-medium">{project.result}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} label={tag} />
                      ))}
                    </div>

                    <details className="mt-5 rounded-2xl border-2 border-black p-3">
                      <summary className="cursor-pointer text-sm font-black uppercase tracking-wide">Reveal breakdown</summary>
                      <div className="mt-3 grid gap-2 text-sm">
                        <p>
                          <strong>Problem:</strong> {project.problem}
                        </p>
                        <p>
                          <strong>Approach:</strong> {project.approach}
                        </p>
                        <p>
                          <strong>Result:</strong> {project.outcome}
                        </p>
                      </div>
                    </details>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button href={project.liveUrl} variant="ghost">
                        Live
                      </Button>
                      <Button href={project.codeUrl} variant="ghost">
                        Code
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section id="launch" className="section-space border-2 border-black bg-zinc-50 p-6 md:p-10">
              <p className="section-kicker">How I work with PM / UX / Creative</p>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border-2 border-black bg-white p-4 text-sm font-bold uppercase">Briefing</div>
                <div className="rounded-2xl border-2 border-black bg-white p-4 text-sm font-bold uppercase">Tradeoffs</div>
                <div className="rounded-2xl border-2 border-black bg-white p-4 text-sm font-bold uppercase">Iteration</div>
                <div className="rounded-2xl border-2 border-black bg-white p-4 text-sm font-bold uppercase">QA + Launch</div>
              </div>
            </section>

            <section className="section-space border-2 border-black bg-white p-6 md:p-10">
              <p className="section-kicker">Final call</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] md:text-5xl">If the brief matters, execution matters more.</h2>
              <p className="mt-5 max-w-3xl text-lg font-medium">Let&apos;s build something bold, measurable, and shippable.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/sidlee/contact">Start a conversation</Button>
                <Button href="/sidlee" variant="ghost">
                  Open SIDLEE page
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
