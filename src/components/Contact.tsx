"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 text-center"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
          {t.contact.subtitle}
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[#0b0b12] transition-transform hover:scale-[1.03]"
        >
          {t.contact.button}
        </a>

        <p className="mt-6 font-mono text-sm text-[var(--color-muted)]">
          {site.email}
        </p>
      </Reveal>
    </section>
  );
}
