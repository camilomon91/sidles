"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="canvas">
      <section className="shell section">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          CONTACT
        </motion.p>
        <motion.h1 className="headline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Give me a real brief. I’ll answer with real execution.
        </motion.h1>
        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          I thrive in fast-moving constraints and collaborative feedback loops. Share your context and I’ll reply with a
          practical build plan.
        </motion.p>
        <ContactForm />
      </section>
    </main>
  );
}
