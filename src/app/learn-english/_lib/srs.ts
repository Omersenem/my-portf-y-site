import type { CardStatus } from "./types";

// SM-2 tabanlı zamanlama. 4 tuş: Again(0) / Hard(3) / Good(4) / Easy(5)
export type Rating = 0 | 3 | 4 | 5;

export interface SrsState {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
  dueDate: string; // YYYY-MM-DD
  status: CardStatus;
}

const MIN_EASE = 1.3;
const MAX_INTERVAL = 365;

export function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function schedule(prev: SrsState, rating: Rating, today: Date): SrsState {
  if (rating === 0) {
    // Again: baştan öğrenmeye döner, yarın tekrar sorulur
    return {
      easeFactor: Math.max(MIN_EASE, prev.easeFactor - 0.2),
      intervalDays: 1,
      repetitions: 0,
      lapses: prev.lapses + 1,
      dueDate: toDateString(addDays(today, 1)),
      status: "learning",
    };
  }

  // SM-2 ease güncellemesi: EF' = EF + (0.1 - (5-q)(0.08 + (5-q)*0.02))
  const q = rating;
  const ease = Math.max(
    MIN_EASE,
    prev.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  const reps = prev.repetitions + 1;
  let interval: number;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 6;
  else interval = Math.round(prev.intervalDays * ease);

  // Hard biraz kısar, Easy biraz uzatır
  if (rating === 3) interval = Math.max(1, Math.round(interval * 0.8));
  if (rating === 5) interval = Math.round(interval * 1.3);
  interval = Math.min(MAX_INTERVAL, Math.max(1, interval));

  return {
    easeFactor: ease,
    intervalDays: interval,
    repetitions: reps,
    lapses: prev.lapses,
    dueDate: toDateString(addDays(today, interval)),
    status: reps < 3 ? "learning" : "review",
  };
}
