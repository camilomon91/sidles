import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="canvas">
      <section className="shell section">
        <p className="eyebrow">CONTACT</p>
        <h1 className="headline">Pitch me your brief.</h1>
        <p className="lede">
          Whether it’s a campaign microsite, an e-commerce story, or a proof of concept, I’m ready to build with
          precision and personality.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
