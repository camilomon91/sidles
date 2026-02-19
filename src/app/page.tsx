import AnimatedLink from "@/components/ui/AnimatedLink";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BrutalModeToggle from "@/components/home/BrutalModeToggle";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="site-texture">
      <div className="page-container space-y-10 py-10 md:space-y-14">
        <header className="section-space border-2 border-black bg-white p-6 md:p-10">
          <nav aria-label="Primary" className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.2em]">Sidlee • Experimental Bold</p>
            <div className="flex flex-wrap items-center gap-5">
              <AnimatedLink href="#work">Work</AnimatedLink>
              <AnimatedLink href="/sidlee/contact">Contact</AnimatedLink>
              <BrutalModeToggle />
            </div>
          </nav>

          <div className="relative">
            <p className="hero-watermark" aria-hidden>
              FULL STACK
            </p>
            <div className="grid-12 relative z-10 items-end gap-y-10">
              <div className="col-span-12 md:col-span-8 motion-enter">
                <p className="section-kicker">01 / HERO</p>
                <h1 className="hero-title">
                  Building web experiences that feel <span className="underline-neon">impossible</span> to ignore.
                </h1>
                <p className="mt-6 max-w-xl text-lg font-medium">
                  I design and build high-impact frontend systems with CMS resilience, measurable performance,
                  and bold visual personality.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="#work">View work</Button>
                  <Button href="/sidlee/contact" variant="ghost">
                    Contact
                  </Button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 motion-enter md:justify-self-end">
                <div className="stamp">Available for internship</div>
              </div>
            </div>
          </div>
        </header>

        <section id="work" className="section-space border-2 border-black bg-zinc-50 p-6 md:p-10">
          <p className="section-kicker">02 / PROJECTS</p>
          <div className="grid-12 mt-8 gap-6">
            {projects.map((project) => (
              <Card key={project.slug} className="col-span-12 motion-enter md:col-span-6">
                <h2 className="text-3xl font-black leading-[0.95]">{project.title}</h2>
                <p className="mt-4 line-clamp-2 text-base font-medium">{project.result}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={project.liveUrl} variant="ghost">
                    Live
                  </Button>
                  {project.codeUrl ? (
                    <Button href={project.codeUrl} variant="ghost">
                      Code
                    </Button>
                  ) : null}
                  <Button href={`/projects/${project.slug}`}>Case study</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">03 / BUILD + QA</p>
          <div className="grid-12 mt-6 gap-6">
            <div className="col-span-12 md:col-span-7 motion-enter">
              <h2 className="text-4xl font-black leading-[0.95]">Brief → Build → QA → Launch</h2>
              <p className="mt-4 max-w-2xl text-lg font-medium">
                I keep design bold but controlled: one visual signature, measured motion, and accessibility that
                ships with confidence.
              </p>
            </div>
            <Card className="col-span-12 motion-enter md:col-span-5">
              <h3 className="text-2xl font-black">System highlights</h3>
              <ul className="mt-4 grid gap-3 text-sm font-bold uppercase tracking-wide">
                <li>12-col layout rhythm</li>
                <li>44px+ tap targets</li>
                <li>Reduced-motion support</li>
                <li>Server-first architecture</li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
