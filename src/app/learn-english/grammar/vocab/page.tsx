"use client";

import { useState } from "react";
import { useAuth } from "../../_components/Providers";
import { useLearnT } from "../../_lib/translations";
import { useCreateCard } from "../../_lib/queries";
import { VOCAB_THEMES } from "../../_lib/vocabData";
import { speak } from "../../_lib/speech";

export default function VocabPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const create = useCreateCard(user?.id);
  const [openTheme, setOpenTheme] = useState<string | null>(VOCAB_THEMES[0]?.id ?? null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  async function addCard(word: { en: string; tr: string; example: string }) {
    if (added.has(word.en)) return;
    await create.mutateAsync({
      word: word.en,
      sentence: word.example,
      translation: word.tr,
    });
    setAdded((s) => new Set(s).add(word.en));
  }

  const totalWords = VOCAB_THEMES.reduce((sum, theme) => sum + theme.words.length, 0);

  return (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{t.grammar.vocabTab} (A1-A2)</h1>
        <span className="font-mono text-sm text-[var(--color-muted)]">{totalWords}</span>
      </div>

      {VOCAB_THEMES.map((theme) => {
        const open = openTheme === theme.id;
        return (
          <section
            key={theme.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50"
          >
            <button
              onClick={() => setOpenTheme(open ? null : theme.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-medium">{theme.title}</span>
              <span className="font-mono text-xs text-[var(--color-muted)]">
                {theme.words.length} {open ? "▾" : "▸"}
              </span>
            </button>
            {open && (
              <div className="flex flex-col border-t border-[var(--color-border)]">
                {theme.words.map((word) => (
                  <div
                    key={word.en}
                    className="flex items-center gap-3 border-b border-[var(--color-border)]/50 px-4 py-2.5 last:border-0"
                  >
                    <button
                      onClick={() => speak(word.en)}
                      aria-label="Speak"
                      className="text-sm opacity-60 transition-opacity hover:opacity-100"
                    >
                      🔊
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <b>{word.en}</b>
                        <span className="text-sm text-[var(--color-muted)]">{word.tr}</span>
                      </div>
                      <p className="truncate text-xs italic text-[var(--color-muted)]">
                        {word.example}
                      </p>
                    </div>
                    {user && (
                      <button
                        onClick={() => addCard(word)}
                        disabled={added.has(word.en) || create.isPending}
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs transition-colors ${
                          added.has(word.en)
                            ? "border-[var(--color-accent)]/40 text-[var(--color-accent)]"
                            : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        {added.has(word.en) ? t.grammar.added : `+ ${t.grammar.addCard}`}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
