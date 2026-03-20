import Link from "next/link";

export default function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block min-h-11 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--line-strong)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </Link>
  );
}
