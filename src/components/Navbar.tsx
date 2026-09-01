"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { site } from "@/lib/site";

export function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/#experience", label: t.nav.experience },
    { href: "/#skills", label: t.nav.skills },
    { href: "/#projects", label: t.nav.projects },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {site.name.split(" ")[0].toLowerCase()}
          <span className="gradient-text">.dev</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggle}
          aria-label="Change language"
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]"
        >
          <span className={lang === "tr" ? "gradient-text" : ""}>TR</span>
          <span className="text-[var(--color-border)]">|</span>
          <span className={lang === "en" ? "gradient-text" : ""}>EN</span>
        </button>
      </nav>
    </header>
  );
}
