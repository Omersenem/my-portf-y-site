import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="text-5xl font-semibold gradient-text">404</h1>
      <p className="text-[var(--color-muted)]">Aradığın sayfa burada değil.</p>
      <Link
        href="/"
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-accent)]"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
