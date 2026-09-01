"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLearnT } from "../_lib/translations";
import {
  GRAMMAR_TOPICS,
  GRAMMAR_PASS_PERCENT,
  type GrammarTopic,
} from "../_lib/grammarData";
import { speak } from "../_lib/speech";

const PROGRESS_KEY = "learn-grammar-progress";

function readProgress(): Record<string, number> {
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export default function GrammarPage() {
  return (
    <Suspense fallback={null}>
      <GrammarInner />
    </Suspense>
  );
}

function GrammarInner() {
  const t = useLearnT();
  const router = useRouter();
  const params = useSearchParams();
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage statik export'ta ancak ilk render sonrası okunabilir
    setProgress(readProgress());
  }, []);

  const activeId = params?.get("id");
  const active = GRAMMAR_TOPICS.find((topic) => topic.id === activeId);

  if (active) {
    return (
      <TopicView
        topic={active}
        onBack={() => {
          setProgress(readProgress());
          router.push("/learn-english/grammar/");
        }}
      />
    );
  }

  const doneCount = GRAMMAR_TOPICS.filter(
    (topic) => (progress[topic.id] ?? 0) >= GRAMMAR_PASS_PERCENT
  ).length;

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{t.grammar.title}</h1>
        <span className="font-mono text-sm text-[var(--color-muted)]">
          {doneCount}/{GRAMMAR_TOPICS.length} {t.grammar.completed}
        </span>
      </div>

      {(["A1", "A2"] as const).map((level) => (
        <section key={level}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
            {level}
          </h2>
          <div className="flex flex-col gap-2">
            {GRAMMAR_TOPICS.filter((topic) => topic.level === level).map((topic) => {
              const score = progress[topic.id];
              const passed = (score ?? 0) >= GRAMMAR_PASS_PERCENT;
              return (
                <button
                  key={topic.id}
                  onClick={() => router.push(`/learn-english/grammar/?id=${topic.id}`)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors hover:border-[var(--color-accent)]/40 ${
                    passed
                      ? "border-[var(--color-accent)]/40 bg-[var(--color-card)]"
                      : "border-[var(--color-border)] bg-[var(--color-card)]/50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                      passed
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#04120c]"
                        : "border-[var(--color-border)] text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="flex-1 font-medium">{topic.title}</span>
                  {score !== undefined && (
                    <span className="font-mono text-xs text-[var(--color-muted)]">%{score}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function TopicView({ topic, onBack }: { topic: GrammarTopic; onBack: () => void }) {
  const t = useLearnT();
  const [quizOn, setQuizOn] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const exercise = topic.exercises[qIndex];
  const scorePercent = Math.round((correctCount / topic.exercises.length) * 100);

  function choose(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === exercise.answer) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (qIndex + 1 >= topic.exercises.length) {
      setFinished(true);
      const final = Math.round((correctCount / topic.exercises.length) * 100);
      try {
        const p = readProgress();
        p[topic.id] = Math.max(p[topic.id] ?? 0, final);
        window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
      } catch {
        // localStorage yoksa sessizce geç
      }
    } else {
      setQIndex((i) => i + 1);
      setChosen(null);
    }
  }

  function restart() {
    setQIndex(0);
    setChosen(null);
    setCorrectCount(0);
    setFinished(false);
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <button
        onClick={onBack}
        className="self-start text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
      >
        {t.grammar.backToTopics}
      </button>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{topic.title}</h1>
        <span className="rounded-full border border-[var(--color-accent)]/40 px-2 py-0.5 font-mono text-xs text-[var(--color-accent)]">
          {topic.level}
        </span>
      </div>

      {!quizOn ? (
        <>
          <div className="flex max-w-prose flex-col gap-3">
            {topic.explanation.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[var(--color-text)]">
                {p}
              </p>
            ))}
          </div>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
              {t.grammar.examples}
            </h2>
            <div className="flex flex-col gap-2">
              {topic.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 px-4 py-3"
                >
                  <p className="font-medium">
                    {ex.en}{" "}
                    <button
                      onClick={() => speak(ex.en)}
                      aria-label="Speak"
                      className="text-sm opacity-60 transition-opacity hover:opacity-100"
                    >
                      🔊
                    </button>
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">{ex.tr}</p>
                </div>
              ))}
            </div>
          </section>

          <button
            onClick={() => setQuizOn(true)}
            className="self-start rounded-lg bg-[var(--color-accent)] px-5 py-2 font-medium text-[#04120c] transition-opacity hover:opacity-90"
          >
            {t.grammar.startQuiz} ({topic.exercises.length})
          </button>
        </>
      ) : finished ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
          <div className="text-4xl font-semibold gradient-text">%{scorePercent}</div>
          <p className="text-lg">
            {scorePercent >= GRAMMAR_PASS_PERCENT ? t.grammar.passed : `${correctCount}/${topic.exercises.length}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={restart}
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-accent)]"
            >
              {t.grammar.retry}
            </button>
            <button
              onClick={onBack}
              className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[#04120c]"
            >
              {t.grammar.backToTopics.replace("← ", "")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--color-muted)]">
            <span>
              {qIndex + 1}/{topic.exercises.length}
            </span>
            <span>
              {t.grammar.score}: {correctCount}
            </span>
          </div>
          <p className="text-lg font-medium">{exercise.q}</p>
          <div className="flex flex-col gap-2">
            {exercise.options.map((opt, i) => {
              let cls = "border-[var(--color-border)] hover:border-[var(--color-accent)]/60";
              if (chosen !== null) {
                if (i === exercise.answer)
                  cls = "border-[var(--color-accent)] bg-[var(--color-accent)]/15";
                else if (i === chosen) cls = "border-red-400/60 bg-red-400/10";
                else cls = "border-[var(--color-border)] opacity-50";
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <button
              onClick={next}
              className="self-end rounded-lg bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-[#04120c]"
            >
              {qIndex + 1 >= topic.exercises.length ? t.grammar.finish : t.grammar.next}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
