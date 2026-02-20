"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const process = [
  ["Discover", "Convert the brief into opportunity zones: narrative, UX utility, and delivery velocity."],
  ["Design", "Build a visual language that feels editorial, bold, and presentation-ready for stakeholders."],
  ["Develop", "Implement reusable components and robust form/API interactions with graceful failure states."],
  ["Validate", "Test core flows and optimize for readability, responsiveness, and accessibility."],
] as const;

export default function SidleePage() {
  return (
    <main className="canvas">
      <section className="shell section">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          CREATIVE EXECUTION
        </motion.p>
        <motion.h1 className="headline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Internship application, translated into a digital product.
        </motion.h1>
        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Instead of simply describing what I can do, I prototyped how I would contribute inside a real agency team:
          strategy-minded, hands-on, and detail-obsessed.
        </motion.p>
      </section>

      <section className="shell split section" aria-label="Fit">
        <article className="panel">
          <h2>Role Fit</h2>
          <p>
            I like cross-functional environments where PMs, strategists, designers, and developers collaborate tightly.
            I enjoy turning ambiguity into clear shippable outputs.
          </p>
        </article>
        <article className="panel">
          <h2>Expertise Snapshot</h2>
          <ul>
            <li>HTML, CSS, JavaScript and modern React/Next.js workflows.</li>
            <li>CMS understanding and API-first integration mindset.</li>
            <li>Quality habits: semantic markup, responsive behavior, and resilient forms.</li>
          </ul>
        </article>
      </section>

      <section className="shell section" aria-label="Process">
        <h2 className="sectionTitle">Execution Loop</h2>
        <div className="board">
          {process.map(([title, text], index) => (
            <motion.article
              key={title}
              className="note"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="shell section" aria-label="Call to action">
        <h2 className="sectionTitle">Let’s build work that matters.</h2>
        <p className="lede">If this thinking aligns with Sid Lee’s energy, I’m ready to contribute from day one.</p>
        <Link href="/sidlee/contact" className="cta cta-primary mt-6">
          Start a conversation
        </Link>
      </section>
    </main>
  );
}
