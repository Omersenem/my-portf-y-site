"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.projects.title}
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.projects.subtitle}</p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {t.projects.items.map((project) => (
          <Reveal key={project.name}>
            <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {project.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--color-bg-soft)] px-2.5 py-1 font-mono text-xs text-[var(--color-accent-2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
