import Link from "next/link";

const values = [
  {
    title: "Real briefs, real impact",
    description:
      "I designed this app like an agency sprint: strategy first, then UX, then execution with measurable outcomes.",
  },
  {
    title: "Bilingual thinking",
    description:
      "EN + FR voice is integrated across the experience to reflect Montreal collaboration in local and global contexts.",
  },
  {
    title: "Full-stack mindset",
    description:
      "Polished UI, resilient API, accessibility-first interactions, and code quality checks all in one package.",
  },
];

export default function Home() {
  return (
    <main className="canvas">
      <section className="hero shell">
        <p className="eyebrow">PROPEL YOUR TALENT</p>
        <h1>
          I rebuilt this app from scratch as a <span>living internship application.</span>
        </h1>
        <p className="lede">
          Not a static portfolio. A creative execution about how I think, build, collaborate, and ship under pressure.
        </p>

        <div className="actions">
          <Link href="/sidlee" className="cta cta-primary">
            Enter the experience
          </Link>
          <Link href="/sidlee/contact" className="cta cta-ghost">
            Contact / Contactez-moi
          </Link>
        </div>
      </section>

      <section className="shell cards" aria-label="Application pillars">
        {values.map((item) => (
          <article key={item.title} className="card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
