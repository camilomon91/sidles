import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="site-texture py-16 md:py-24">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">Portfolio With Storyblok</p>
          <h1 className="hero-title mt-4">Storyblok page + contact flow</h1>
          <p className="mt-6 max-w-3xl text-lg font-medium">
            This app has two main routes: the Storyblok page at <strong>/sidlee</strong> and the contact form at
            <strong> /sidlee/contact</strong>.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/sidlee">See Projects</Button>
            <Button href="/sidlee/contact" variant="ghost">
              Open contact form
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
