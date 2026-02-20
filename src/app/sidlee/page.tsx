import Link from "next/link";

const sprintBoard = [
  {
    step: "01 Discover",
    detail: "Translate the brief into opportunity zones: storytelling, utility, and technical credibility.",
  },
  {
    step: "02 Define",
    detail: "Set constraints: fast loading, inclusive UX, clear architecture, bilingual-friendly copy system.",
  },
  {
    step: "03 Design + Build",
    detail: "Craft a bold art direction and ship with reusable components + API-first contact workflow.",
  },
  {
    step: "04 Validate",
    detail: "Run tests, review responsiveness, and pressure-test user flows like a real project handoff.",
  },
];

const stack = ["React", "Next.js App Router", "Node API routes", "Testing mindset", "Performance & a11y focus"];

export default function SidleePage() {
  return (
    <main className="canvas">
      <section className="shell section">
        <p className="eyebrow">CREATIVE EXECUTION</p>
        <h1 className="headline">Atypical Resume, in product form.</h1>
        <p className="lede">
          I wanted to show more than words on a PDF. This prototype is my way of demonstrating craft, systems thinking,
          and the energy I would bring to Sid Lee.
        </p>
      </section>

      <section className="shell split section" aria-label="Mission and profile">
        <article className="panel">
          <h2>Why me / Pourquoi moi</h2>
          <p>
            I enjoy building at the intersection of creative ambition and technical rigor. I can prototype quickly,
            collaborate deeply with cross-functional teams, and keep quality high under time constraints.
          </p>
        </article>
        <article className="panel">
          <h2>What I’d bring to your team</h2>
          <ul>
            <li>Strong front-end craft with semantic, accessible UI.</li>
            <li>Reliable back-end habits: validation, anti-spam, and safe error handling.</li>
            <li>Curiosity for tools, trends, and team rituals that improve delivery.</li>
          </ul>
        </article>
      </section>

      <section className="shell section" aria-label="Process board">
        <h2 className="sectionTitle">How I execute</h2>
        <div className="board">
          {sprintBoard.map((item) => (
            <article key={item.step} className="note">
              <h3>{item.step}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section" aria-label="Technology stack">
        <h2 className="sectionTitle">Stack I used here</h2>
        <div className="tags">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <Link href="/sidlee/contact" className="cta cta-primary mt-6">
          Let’s build something together
        </Link>
      </section>
    </main>
  );
}
