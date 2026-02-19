import Link from "next/link";

export default function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block min-h-11 py-2 text-sm font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </Link>
  );
}
