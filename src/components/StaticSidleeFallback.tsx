export default function StaticSidleeFallback({ reason }: { reason?: string }) {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">SIDLEE</h1>
      <p className="mt-4 text-lg opacity-80">
        Our CMS is temporarily unavailable. You are seeing a static fallback page.
      </p>
      {reason ? <p className="mt-2 text-sm opacity-60">Reason: {reason}</p> : null}
      <section className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">What we build</h2>
        <p className="mt-2 opacity-80">Brand, product, and web experiences for modern teams.</p>
      </section>
    </main>
  );
}
