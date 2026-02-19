import AnimatedLink from "@/components/ui/AnimatedLink";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BrutalModeToggle from "@/components/home/BrutalModeToggle";

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
                <AnimatedLink href="#work">Work</AnimatedLink>
                <AnimatedLink href="#contact">Contact</AnimatedLink>
              </nav>
            </div>
          </aside>

          <div className="col-span-12 space-y-10 md:col-span-9 md:space-y-14">
            <header id="brief" className="section-space border-2 border-black bg-white p-6 md:p-10">
              <nav aria-label="Primary" className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.2em]">Sidlee • Full-stack + creative delivery</p>
                <div className="flex flex-wrap items-center gap-5">
                  <AnimatedLink href="#work">View work</AnimatedLink>
                  <AnimatedLink href="#contact">Contact</AnimatedLink>
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
                    I build practical, high-quality experiences from concept to launch with strong UX, engineering,
                    and QA discipline.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button href="#work">View work</Button>
                    <Button href="/sidlee/contact" variant="ghost">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <section id="work" className="section-space border-2 border-black bg-white p-6 md:p-10">
              <p className="section-kicker">Work</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="motion-enter">
                  <h2 className="text-2xl font-black">SIDLEE page</h2>
                  <p className="mt-3 text-base font-medium">
                    Storyblok-driven page with resilient fallback behavior and clear structure.
                  </p>
                  <div className="mt-6">
                    <Button href="/sidlee" variant="ghost">
                      Open SIDLEE page
                    </Button>
                  </div>
                </Card>

                <Card className="motion-enter">
                  <h2 className="text-2xl font-black">Contact flow</h2>
                  <p className="mt-3 text-base font-medium">
                    Accessible form with validation, anti-spam checks, and clean success feedback.
                  </p>
                  <div className="mt-6">
                    <Button href="/sidlee/contact" variant="ghost">
                      Open contact form
                    </Button>
                  </div>
                </Card>
              </div>
            </section>

            <section id="contact" className="section-space border-2 border-black bg-zinc-50 p-6 md:p-10">
              <p className="section-kicker">Final call</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] md:text-5xl">Let&apos;s build something bold and shippable.</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/sidlee/contact">Start a conversation</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
