import Button from "@/components/ui/Button";

export default function StaticSidleeFallback({ reason }: { reason?: string }) {
  return (
    <main className="site-texture py-16 md:py-20">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">SIDLEE / FALLBACK</p>
          <h1 className="mt-3 text-5xl font-black leading-[0.95] md:text-7xl">CMS temporarily unavailable</h1>
          <p className="mt-5 max-w-2xl text-lg font-medium">
            The page is showing a fallback view while we reconnect to Storyblok.
          </p>
          {reason ? <p className="mt-3 text-sm font-semibold uppercase tracking-wide opacity-70">Reason: {reason}</p> : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Back home</Button>
            <Button href="/sidlee/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
