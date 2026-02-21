import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="site-texture py-16 md:py-20" aria-labelledby="home-title">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">SIDLEE / HOME</p>
          <h1 id="home-title" className="mt-3 text-5xl font-black leading-[0.95] md:text-7xl">
            Welcome
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium">
            Use this homepage to navigate the portfolio and contact form.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/sidlee">View portfolio</Button>
            <Button href="/sidlee/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
