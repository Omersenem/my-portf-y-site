"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { useLearnT } from "../_lib/translations";
import { supabase } from "../_lib/supabase";
import { useAuth } from "./Providers";

export function LearnNav() {
  const t = useLearnT();
  const { lang, toggle } = useLanguage();
  const { user } = useAuth();
  const pathname = usePathname() ?? "";

  const tabs = [
    { href: "/learn-english/", label: t.nav.today, exact: true },
    { href: "/learn-english/listen/", label: t.nav.listen },
    { href: "/learn-english/shadow/", label: t.nav.shadow },
    { href: "/learn-english/library/", label: t.nav.library },
    { href: "/learn-english/review/", label: t.nav.review },
    { href: "/learn-english/journal/", label: t.nav.journal },
    { href: "/learn-english/grammar/", label: t.nav.grammar, prefix: "/learn-english/grammar" },
    { href: "/learn-english/extras/grammar-map/", label: t.nav.extras, prefix: "/learn-english/extras" },
  ];

  const isActive = (tab: { href: string; exact?: boolean; prefix?: string }) => {
    const clean = (p: string) => p.replace(/\/+$/, "");
    if (tab.prefix) return pathname.startsWith(tab.prefix);
    if (tab.exact) return clean(pathname) === clean(tab.href);
    return pathname.startsWith(clean(tab.href));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-4xl items-center gap-1 overflow-x-auto px-4">
        <Link
          href="/"
          className="mr-2 shrink-0 font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          ←&nbsp;omersenem.com
        </Link>
        {user &&
          tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive(tab)
                  ? "bg-[var(--color-card)] text-[var(--color-text)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Change language"
            className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {lang === "tr" ? "EN" : "TR"}
          </button>
          {user && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {t.nav.logout}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
