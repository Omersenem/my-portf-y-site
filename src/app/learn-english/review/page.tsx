"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../_components/Providers";
import { useLearnT } from "../_lib/translations";
import {
  useCardStats,
  useCreateCard,
  useDueCards,
  useReviewCard,
  useUpsertCheck,
} from "../_lib/queries";
import type { Rating } from "../_lib/srs";
import { speak } from "../_lib/speech";

export default function ReviewPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const { data: due, isLoading } = useDueCards(user?.id);
  const { data: stats } = useCardStats(user?.id);
  const review = useReviewCard();
  const create = useCreateCard(user?.id);
  const upsertCheck = useUpsertCheck(user?.id);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [word, setWord] = useState("");
  const [sentence, setSentence] = useState("");
  const [translation, setTranslation] = useState("");

  const current = due?.[0];

  async function rate(rating: Rating) {
    if (!current) return;
    setShowAnswer(false);
    await review.mutateAsync({ card: current, rating });
    // Kuyruk bittiyse rutin maddesini otomatik işaretle
    if ((due?.length ?? 0) <= 1) {
      upsertCheck.mutate({ item_key: "srs", checked: true });
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await create.mutateAsync({ word, sentence, translation });
    setWord("");
    setSentence("");
    setTranslation("");
    setShowForm(false);
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{t.review.title}</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--color-accent)]"
        >
          + {t.review.newCard}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={onCreate}
          className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
        >
          <input
            required
            placeholder={t.review.word}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
          />
          <textarea
            required
            placeholder={t.review.sentence}
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            rows={2}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
          />
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
              {t.common.save}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-[var(--color-border)] px-4 py-1.5 text-sm text-[var(--color-muted)]"
            >
              {t.common.cancel}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-[var(--color-muted)]">{t.common.loading}</p>
      ) : current ? (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
          <span className="font-mono text-xs text-[var(--color-muted)]">
            {t.review.due}: {due!.length}
          </span>
          <p className="text-lg leading-relaxed">
            {current.sentence.split(new RegExp(`(${escapeReg(current.word)})`, "i")).map((part, i) =>
              part.toLowerCase() === current.word.toLowerCase() ? (
                <button
                  key={i}
                  onClick={() => speak(current.word)}
                  title="🔊"
                  className="gradient-text font-bold underline decoration-dotted underline-offset-4"
                >
                  {part}
                </button>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
            <button
              onClick={() => speak(current.sentence)}
              aria-label="Speak sentence"
              className="ml-2 align-middle text-sm opacity-60 transition-opacity hover:opacity-100"
            >
              🔊
            </button>
          </p>
          {showAnswer ? (
            <>
              <div className="text-[var(--color-muted)]">
                <p className="text-xl font-medium text-[var(--color-text)]">
                  {current.word}{" "}
                  <button
                    onClick={() => speak(current.word)}
                    aria-label="Speak word"
                    className="text-base opacity-60 transition-opacity hover:opacity-100"
                  >
                    🔊
                  </button>
                </p>
                {current.translation && <p className="mt-1">{current.translation}</p>}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <RateBtn label={t.review.again} onClick={() => rate(0)} className="border-red-400/40 text-red-300" />
                <RateBtn label={t.review.hard} onClick={() => rate(3)} className="border-amber-400/40 text-amber-300" />
                <RateBtn label={t.review.good} onClick={() => rate(4)} className="border-[var(--color-accent)]/50 text-[var(--color-accent)]" />
                <RateBtn label={t.review.easy} onClick={() => rate(5)} className="border-sky-400/40 text-sky-300" />
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="rounded-lg bg-[var(--color-accent)] px-6 py-2 font-medium text-[#04120c] transition-opacity hover:opacity-90"
            >
              {t.review.showAnswer}
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-lg">
          {t.review.done}
        </div>
      )}

      {stats && (
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
            {t.review.stats}
          </h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label={t.review.totalCards} value={String(stats.totalCards)} />
            <Stat label={t.review.reviewsLast30} value={String(stats.reviews30)} />
            <Stat
              label={t.review.retention}
              value={stats.retention === null ? "—" : `%${stats.retention}`}
            />
          </div>
        </section>
      )}
    </div>
  );
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function RateBtn({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border bg-[var(--color-bg)] px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${className}`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <div className="text-2xl font-semibold gradient-text">{value}</div>
      <div className="mt-1 text-xs text-[var(--color-muted)]">{label}</div>
    </div>
  );
}
