"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function Experience() {
  const { t } = useLanguage();
  const { experience: exp } = t;

  return (
    <section
      id="experience"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {exp.title}
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">{exp.subtitle}</p>
      </Reveal>

      {/* Zaman çizelgesi */}
      <div className="mt-10 space-y-6">
        {exp.items.map((item) => (
          <Reveal key={item.company}>
            <article className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {item.role}
                  <span className="text-[var(--color-accent)]"> · {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {item.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                {item.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
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

      {/* Eğitim + Başarı */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {exp.educationTitle}
            </h3>
            <p className="mt-3 font-medium text-[var(--color-text)]">
              {exp.education.school}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {exp.education.field}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">
              {exp.education.period}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {exp.awardTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">
              🏆 {exp.award}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
