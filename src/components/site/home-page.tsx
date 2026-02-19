import { siteContent } from "@/content/site";
import { CtaLink } from "./cta-link";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 px-6 py-16 sm:px-12">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{siteContent.title}</p>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {siteContent.subtitle}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {siteContent.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {siteContent.links.map((link) => (
          <CtaLink key={link.href} {...link} />
        ))}
      </div>
    </main>
  );
}
