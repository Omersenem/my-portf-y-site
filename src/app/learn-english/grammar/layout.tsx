"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearnT } from "../_lib/translations";

export default function GrammarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useLearnT();
  const pathname = (usePathname() ?? "").replace(/\/+$/, "");
  const onVocab = pathname.endsWith("/vocab");

  const tabs = [
    { href: "/learn-english/grammar/", label: t.grammar.topicsTab, active: !onVocab },
    { href: "/learn-english/grammar/vocab/", label: t.grammar.vocabTab, active: onVocab },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              tab.active
                ? "border-[var(--color-accent)]/50 text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
