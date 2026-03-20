export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-9 items-center border border-[var(--line)] bg-[color-mix(in_oklch,var(--accent-soft)_58%,var(--paper-soft))] px-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
      {label}
    </span>
  );
}
