"use client";

import { useCallback, useState } from "react";
import { useLearnT } from "../../_lib/translations";

// Türkçe konuşurlar için kritik ses karşıtlıkları
const PAIRS: [string, string][] = [
  ["ship", "sheep"],
  ["bit", "beat"],
  ["full", "fool"],
  ["bet", "bat"],
  ["men", "man"],
  ["wet", "vet"],
  ["west", "vest"],
  ["three", "tree"],
  ["thin", "tin"],
  ["they", "day"],
  ["breathe", "breed"],
  ["cat", "cut"],
  ["fan", "fun"],
  ["walk", "work"],
  ["law", "low"],
  ["coast", "cost"],
];

function speak(word: string) {
  const u = new SpeechSynthesisUtterance(word);
  u.lang = "en-US";
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function PairsPage() {
  const t = useLearnT();
  const [pairIdx, setPairIdx] = useState(() => Math.floor(Math.random() * PAIRS.length));
  const [answer, setAnswer] = useState<0 | 1>(() => (Math.random() < 0.5 ? 0 : 1));
  const [played, setPlayed] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const pair = PAIRS[pairIdx];

  const next = useCallback(() => {
    setPairIdx(Math.floor(Math.random() * PAIRS.length));
    setAnswer(Math.random() < 0.5 ? 0 : 1);
    setPlayed(false);
    setResult(null);
  }, []);

  function guess(i: 0 | 1) {
    if (!played || result) return;
    const correct = i === answer;
    setResult(correct ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(next, 1200);
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{t.extras.pairs}</h1>
        <span className="font-mono text-sm text-[var(--color-muted)]">
          {t.extras.pairsScore}: {score.correct}/{score.total}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8">
        <button
          onClick={() => {
            speak(pair[answer]);
            setPlayed(true);
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl text-[#04120c] transition-transform hover:scale-105"
          aria-label={t.extras.pairsPlay}
        >
          🔊
        </button>
        <p className="text-sm text-[var(--color-muted)]">{t.extras.pairsWhich}</p>
        <div className="flex gap-4">
          {([0, 1] as const).map((i) => (
            <button
              key={i}
              onClick={() => guess(i)}
              disabled={!played}
              className={`rounded-xl border px-8 py-4 text-xl font-medium transition-colors disabled:opacity-40 ${
                result && i === answer
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/20"
                  : result === "wrong" && i !== answer
                    ? "border-red-400/60"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {pair[i]}
            </button>
          ))}
        </div>
        {result && (
          <p className={result === "correct" ? "text-[var(--color-accent)]" : "text-red-400"}>
            {result === "correct" ? "✓" : `✗ — ${pair[answer]}`}
          </p>
        )}
      </div>
    </div>
  );
}
