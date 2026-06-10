"use client";

import { useLanguage } from "./LanguageProvider";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLanguage();

  const socials = [
    { href: site.github, label: "GitHub" },
    { href: site.linkedin, label: "LinkedIn" },
  ].filter((s) => s.href && !s.href.endsWith("/in/") && s.href !== "https://github.com/");

  return (
    <footer className="border-t border-[var(--color-border)] px-5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[var(--color-muted)]">
          © 2026 {site.name}. {t.footer.rights}
        </p>

        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {social.label}
            </a>
          ))}
          <span className="font-mono text-xs text-[var(--color-muted)]">
            {t.footer.builtWith}
          </span>
        </div>
      </div>
    </footer>
  );
}
