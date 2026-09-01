"use client";

import { Suspense, useMemo, useState, type FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../_components/Providers";
import { useLearnT } from "../_lib/translations";
import {
  useAddContent,
  useContents,
  useCreateCard,
  useUpsertCheck,
} from "../_lib/queries";
import { lookupWord, type WordInfo } from "../_lib/dictionary";
import { speak } from "../_lib/speech";
import type { Content } from "../_lib/types";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function LibraryPage() {
  return (
    <Suspense fallback={null}>
      <LibraryInner />
    </Suspense>
  );
}

function LibraryInner() {
  const { user } = useAuth();
  const t = useLearnT();
  const router = useRouter();
  const params = useSearchParams();
  const { data: contents } = useContents(user?.id);
  const add = useAddContent(user?.id);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [level, setLevel] = useState("B1");

  const activeId = params?.get("id");
  const active = contents?.find((c) => c.id === activeId);

  async function onAdd(e: FormEvent) {
    e.preventDefault();
    await add.mutateAsync({ title, body, level });
    setTitle("");
    setBody("");
    setShowForm(false);
  }

  if (!user) return null;

  if (active) return <Reader content={active} onBack={() => router.push("/learn-english/library/")} />;

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{t.library.title}</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--color-accent)]"
        >
          + {t.library.addTitle}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={onAdd}
          className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
        >
          <div className="flex gap-3">
            <input
              required
              placeholder={t.listen.nameLabel}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-2 text-sm"
              aria-label={t.library.level}
            >
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <textarea
            required
            placeholder={t.library.body}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
          />
          <button
            type="submit"
            disabled={add.isPending}
            className="self-start rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04120c] disabled:opacity-50"
          >
            {t.common.save}
          </button>
        </form>
      )}

      <div className="flex flex-col gap-2">
        {(contents ?? []).map((c) => (
          <button
            key={c.id}
            onClick={() => router.push(`/learn-english/library/?id=${c.id}`)}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 px-4 py-3 text-left transition-colors hover:border-[var(--color-accent)]/40"
          >
            {c.level && (
              <span className="rounded-full border border-[var(--color-accent)]/40 px-2 py-0.5 font-mono text-[10px] text-[var(--color-accent)]">
                {c.level}
              </span>
            )}
            <span className="truncate font-medium">{c.title}</span>
            <span className="ml-auto shrink-0 font-mono text-xs text-[var(--color-muted)]">
              {c.body.split(/\s+/).length}w
            </span>
          </button>
        ))}
        {contents?.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">{t.library.empty}</p>
        )}
      </div>
    </div>
  );
}

function Reader({ content, onBack }: { content: Content; onBack: () => void }) {
  const { user } = useAuth();
  const t = useLearnT();
  const create = useCreateCard(user?.id);
  const upsertCheck = useUpsertCheck(user?.id);
  const [picked, setPicked] = useState<{ word: string; sentence: string } | null>(null);
  const [translation, setTranslation] = useState("");
  const [info, setInfo] = useState<WordInfo | null>(null);
  const [looking, setLooking] = useState(false);

  // Metni cümlelere, cümleleri kelimelere böl
  const sentences = useMemo(
    () => content.body.split(/(?<=[.!?])\s+/).filter(Boolean),
    [content.body]
  );

  async function saveCard(e: FormEvent) {
    e.preventDefault();
    if (!picked) return;
    await create.mutateAsync({
      word: picked.word,
      sentence: picked.sentence,
      translation: translation || undefined,
      source_content_id: content.id,
    });
    upsertCheck.mutate({ item_key: "reading", addMinutes: 0 });
    setPicked(null);
    setTranslation("");
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <button
        onClick={onBack}
        className="self-start text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
      >
        {t.library.back}
      </button>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{content.title}</h1>
        {content.level && (
          <span className="rounded-full border border-[var(--color-accent)]/40 px-2 py-0.5 font-mono text-xs text-[var(--color-accent)]">
            {content.level}
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--color-muted)]">{t.library.clickHint}</p>

      <article className="max-w-prose text-lg leading-relaxed">
        {sentences.map((sentence, si) => (
          <span key={si}>
            {sentence.split(/(\s+)/).map((token, ti) => {
              const clean = token.replace(/[^\p{L}'-]/gu, "");
              if (!clean) return <span key={ti}>{token}</span>;
              return (
                <button
                  key={ti}
                  onClick={async () => {
                    const word = clean.toLowerCase();
                    setPicked({ word, sentence });
                    setTranslation("");
                    setInfo(null);
                    setLooking(true);
                    speak(word);
                    const result = await lookupWord(word);
                    setInfo(result);
                    if (result.turkish) setTranslation(result.turkish);
                    setLooking(false);
                  }}
                  className="rounded transition-colors hover:bg-[var(--color-accent)]/20"
                >
                  {token}
                </button>
              );
            })}{" "}
          </span>
        ))}
      </article>

      {picked && (
        <form
          onSubmit={saveCard}
          className="sticky bottom-4 flex flex-col gap-3 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-card)] p-4 shadow-lg"
        >
          <div className="text-sm">
            <b className="gradient-text">{picked.word}</b>
            {info?.phonetic && (
              <span className="ml-2 font-mono text-xs text-[var(--color-muted)]">{info.phonetic}</span>
            )}
            <button
              onClick={() => speak(picked.word)}
              aria-label="Speak"
              className="ml-2 text-xs opacity-60 transition-opacity hover:opacity-100"
            >
              🔊
            </button>
            {looking && (
              <span className="ml-2 text-xs text-[var(--color-muted)]">{t.common.loading}</span>
            )}
            {info?.definition && (
              <p className="mt-1 text-xs text-[var(--color-text)]">
                {info.partOfSpeech && (
                  <i className="mr-1 text-[var(--color-muted)]">({info.partOfSpeech})</i>
                )}
                {info.definition}
              </p>
            )}
            <p className="mt-1 text-xs text-[var(--color-muted)]">{picked.sentence}</p>
          </div>
          <input
            placeholder={t.review.translation}
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={create.isPending}
              className="rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04120c] disabled:opacity-50"
            >
              {t.library.makeCard}
            </button>
            <button
              type="button"
              onClick={() => setPicked(null)}
              className="rounded-lg border border-[var(--color-border)] px-4 py-1.5 text-sm text-[var(--color-muted)]"
            >
              {t.common.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
