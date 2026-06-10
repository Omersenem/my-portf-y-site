"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.about.title}
        </h2>
        <div className="mt-6 space-y-4">
          {t.about.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
