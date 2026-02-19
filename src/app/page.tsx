import Link from "next/link";

const links = [
  { href: "/sidlee", label: "Storyblok-driven SIDLEE page" },
  { href: "/sidlee/contact", label: "Contact form demo" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold">SIDLEE Microsite</h1>
      <p className="text-lg opacity-80">Storyblok content delivery with resilient fallback and secure contact flow.</p>

      <nav aria-label="Main" className="grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            className="inline-block rounded-lg border px-4 py-3 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
