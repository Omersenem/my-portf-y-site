export type RoutineKey =
  | "listening"
  | "shadowing"
  | "srs"
  | "reading"
  | "speaking"
  | "goldlist";

export type CardStatus = "new" | "learning" | "review" | "suspended";

export type Profile = {
  id: string;
  display_name: string | null;
  start_date: string;
  timezone: string;
  settings: {
    newCardsPerDay?: number;
    listeningTargetMin?: number;
    shadowingTargetMin?: number;
    readingTargetMin?: number;
  };
  created_at: string;
};

export type DailyCheck = {
  id: string;
  user_id: string;
  date: string;
  item_key: RoutineKey;
  minutes_done: number;
  checked: boolean;
};

export type Card = {
  id: string;
  user_id: string;
  word: string;
  sentence: string;
  translation: string | null;
  notes: string | null;
  source_content_id: string | null;
  status: CardStatus;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  lapses: number;
  due_date: string;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  card_id: string;
  rating: 0 | 3 | 4 | 5;
  interval_before: number | null;
  interval_after: number | null;
  ease_after: number | null;
  reviewed_at: string;
};

export type Content = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | null;
  kind: string;
  source_url: string | null;
  created_at: string;
};

export type Podcast = {
  id: string;
  user_id: string;
  title: string;
  kind: "audio" | "youtube" | "rss";
  url: string;
  last_position_sec: number;
  sort_order: number;
  created_at: string;
};

export type Recording = {
  id: string;
  user_id: string;
  kind: "shadowing" | "journal";
  storage_path: string;
  duration_sec: number | null;
  recorded_on: string;
  transcript: string | null;
  feedback: unknown;
  created_at: string;
};

export type GoldlistList = {
  id: string;
  user_id: string;
  list_no: number;
  parent_list_id: string | null;
  created_on: string;
  unlocks_on: string;
};

export type GoldlistItem = {
  id: string;
  list_id: string;
  user_id: string;
  text_en: string;
  text_tr: string;
  distilled: boolean;
};
