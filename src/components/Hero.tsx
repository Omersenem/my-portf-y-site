"use client";

import { useLanguage } from "./LanguageProvider";
import { site } from "@/lib/site";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 pt-16">
      <div className="animate-fade-up mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">
          {t.hero.greeting}
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="gradient-text">{t.hero.name}</span>
        </h1>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--color-muted)] sm:text-3xl">
          {t.hero.role}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#projects"
            className="w-full rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#0b0b12] transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {t.hero.ctaProjects}
          </a>
          <a
            href="#contact"
            className="w-full rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] sm:w-auto"
          >
            {t.hero.ctaContact}
          </a>
          <a
            href={site.cv}
            download
            className="w-full rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] sm:w-auto"
          >
            {t.hero.ctaCv}
          </a>
        </div>
      </div>
    </section>
  );
}
