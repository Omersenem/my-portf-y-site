"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.skills.title}
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.skills.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
