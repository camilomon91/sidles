"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Agency Thinking",
    text: "I treat each feature like a client deliverable: clear objective, sharp execution, measurable impact.",
  },
  {
    title: "Bilingual Collaboration",
    text: "Conception en français, delivery in English — designed for real multicultural team workflows.",
  },
  {
    title: "Full-Stack Precision",
    text: "From interface systems to resilient API handling, I build experiences that look bold and behave reliably.",
  },
];

export default function Home() {
  return (
    <main className="canvas">
      <section className="shell hero">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          PROPEL YOUR TALENT
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          I rebuilt this app as a <span>creative execution, not just a portfolio.</span>
        </motion.h1>

        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          This is my internship application in product form: strategy, storytelling, interaction, and engineering in one
          cohesive build.
        </motion.p>

        <motion.div
          className="actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/sidlee" className="cta cta-primary">
            Enter experience
          </Link>
          <Link href="/sidlee/contact" className="cta cta-ghost">
            Contact / Contactez-moi
          </Link>
        </motion.div>
      </section>

      <section className="shell cards" aria-label="Execution highlights">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            className="card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
          >
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
