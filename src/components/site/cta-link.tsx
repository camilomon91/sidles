type CtaLinkProps = {
  href: string;
  label: string;
  kind: "primary" | "secondary";
};

const stylesByKind: Record<CtaLinkProps["kind"], string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
  secondary:
    "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
};

export function CtaLink({ href, label, kind }: CtaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${stylesByKind[kind]}`}
    >
      {label}
    </a>
  );
}
