"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearnT } from "../_lib/translations";

export default function ExtrasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useLearnT();
  const pathname = usePathname() ?? "";

  const tabs = [
    { href: "/learn-english/extras/grammar-map/", label: t.extras.grammarMap },
    { href: "/learn-english/extras/pairs/", label: t.extras.pairs },
    { href: "/learn-english/extras/goldlist/", label: t.extras.goldlist },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs transition-colors ${
              pathname.startsWith(tab.href.replace(/\/$/, ""))
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
