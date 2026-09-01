import type { RoutineKey } from "./types";

export type RoutineItem = {
  key: RoutineKey;
  targetMin: number | null; // null → süre değil, yapıldı/yapılmadı
  stage: string; // metottaki aşama etiketi
  href: string;
};

// Mezzofanti Metodu günlük rutini. Sıra, dashboard'daki görünüm sırasıdır.
export const ROUTINE: RoutineItem[] = [
  { key: "listening", targetMin: 30, stage: "1", href: "/learn-english/listen/" },
  { key: "shadowing", targetMin: 15, stage: "2", href: "/learn-english/shadow/" },
  { key: "reading", targetMin: 20, stage: "3", href: "/learn-english/library/" },
  { key: "srs", targetMin: 15, stage: "4", href: "/learn-english/review/" },
  { key: "speaking", targetMin: 1, stage: "6", href: "/learn-english/journal/" },
  { key: "goldlist", targetMin: null, stage: "B", href: "/learn-english/extras/goldlist/" },
];

export const FIRST_MILESTONE_DAYS = 100;
