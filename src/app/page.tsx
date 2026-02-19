import ScrollHeroBox from "@/components/home/ScrollHeroBox";

export default function Home() {
  return (
    <main className="site-texture py-16 md:py-24">
      <div className="page-container space-y-16 md:space-y-24">
        <ScrollHeroBox />

        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">Scroll narrative</p>
          <h2 className="mt-3 text-4xl font-black leading-[0.95] md:text-5xl">
            The center panel scales with scroll until it dominates the viewport.
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium">
            This gives a campaign-like entrance while keeping your real actions clear: SIDLEE page and contact form.
          </p>
        </section>
      </div>
    </main>
  );
}
