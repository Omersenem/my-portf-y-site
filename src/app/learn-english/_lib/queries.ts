"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { toDateString, schedule, type Rating, type SrsState } from "./srs";
import type {
  Card,
  Content,
  DailyCheck,
  GoldlistItem,
  GoldlistList,
  Podcast,
  Profile,
  Recording,
  RoutineKey,
} from "./types";

export function today(): string {
  return toDateString(new Date());
}

// ---------- profil ----------
export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .single();
      if (error) throw error;
      return data as Profile;
    },
  });
}

// ---------- günlük rutin ----------
export function useChecks(userId: string | undefined, sinceDays = 130) {
  return useQuery({
    queryKey: ["daily_checks", userId, sinceDays],
    enabled: !!userId,
    queryFn: async (): Promise<DailyCheck[]> => {
      const since = new Date();
      since.setDate(since.getDate() - sinceDays);
      const { data, error } = await supabase
        .from("daily_checks")
        .select("*")
        .gte("date", toDateString(since))
        .order("date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as DailyCheck[];
    },
  });
}

export function useUpsertCheck(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      item_key: RoutineKey;
      checked?: boolean;
      addMinutes?: number;
    }) => {
      const date = today();
      const { data: existing } = await supabase
        .from("daily_checks")
        .select("*")
        .eq("date", date)
        .eq("item_key", input.item_key)
        .maybeSingle();

      const minutes =
        (existing?.minutes_done ?? 0) + (input.addMinutes ?? 0);
      const checked = input.checked ?? existing?.checked ?? false;

      const { error } = await supabase.from("daily_checks").upsert(
        {
          user_id: userId!,
          date,
          item_key: input.item_key,
          minutes_done: minutes,
          checked,
        },
        { onConflict: "user_id,date,item_key" }
      );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["daily_checks"] }),
  });
}

// ---------- SRS ----------
export function useDueCards(userId: string | undefined) {
  return useQuery({
    queryKey: ["cards", "due", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Card[]> => {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .lte("due_date", today())
        .neq("status", "suspended")
        .order("due_date")
        .limit(100);
      if (error) throw error;
      return (data ?? []) as Card[];
    },
  });
}

export function useCardStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["cards", "stats", userId],
    enabled: !!userId,
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const [cardsRes, reviewsRes] = await Promise.all([
        supabase.from("cards").select("id", { count: "exact", head: true }),
        supabase
          .from("reviews")
          .select("rating")
          .gte("reviewed_at", since.toISOString()),
      ]);
      if (cardsRes.error) throw cardsRes.error;
      if (reviewsRes.error) throw reviewsRes.error;
      const reviews = reviewsRes.data ?? [];
      const good = reviews.filter((r) => r.rating >= 4).length;
      return {
        totalCards: cardsRes.count ?? 0,
        reviews30: reviews.length,
        retention: reviews.length ? Math.round((good / reviews.length) * 100) : null,
      };
    },
  });
}

export function useCreateCard(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      word: string;
      sentence: string;
      translation?: string;
      source_content_id?: string;
    }) => {
      const { error } = await supabase.from("cards").insert({
        user_id: userId!,
        word: input.word,
        sentence: input.sentence,
        translation: input.translation ?? null,
        source_content_id: input.source_content_id ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cards"] }),
  });
}

export function useReviewCard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ card, rating }: { card: Card; rating: Rating }) => {
      const prev: SrsState = {
        easeFactor: card.ease_factor,
        intervalDays: card.interval_days,
        repetitions: card.repetitions,
        lapses: card.lapses,
        dueDate: card.due_date,
        status: card.status,
      };
      const next = schedule(prev, rating, new Date());
      const { error } = await supabase.rpc("review_card", {
        p_card_id: card.id,
        p_rating: rating,
        p_ease: next.easeFactor,
        p_interval: next.intervalDays,
        p_reps: next.repetitions,
        p_lapses: next.lapses,
        p_due: next.dueDate,
        p_status: next.status,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cards"] }),
  });
}

// ---------- podcast ----------
export function usePodcasts(userId: string | undefined) {
  return useQuery({
    queryKey: ["podcasts", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Podcast[]> => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Podcast[];
    },
  });
}

export function useAddPodcast(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { title: string; kind: "audio" | "youtube"; url: string }) => {
      const { error } = await supabase.from("podcasts").insert({
        user_id: userId!,
        ...input,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["podcasts"] }),
  });
}

export function useDeletePodcast() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("podcasts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["podcasts"] }),
  });
}

// ---------- içerik ----------
export function useContents(userId: string | undefined) {
  return useQuery({
    queryKey: ["contents", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Content[]> => {
      const { data, error } = await supabase
        .from("contents")
        .select("id, user_id, title, level, kind, source_url, created_at, body")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Content[];
    },
  });
}

export function useAddContent(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { title: string; body: string; level: string }) => {
      const { error } = await supabase.from("contents").insert({
        user_id: userId!,
        title: input.title,
        body: input.body,
        level: input.level || null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contents"] }),
  });
}

// ---------- kayıtlar ----------
export function useRecordings(userId: string | undefined, kind: "shadowing" | "journal") {
  return useQuery({
    queryKey: ["recordings", userId, kind],
    enabled: !!userId,
    queryFn: async (): Promise<Recording[]> => {
      const { data, error } = await supabase
        .from("recordings")
        .select("*")
        .eq("kind", kind)
        .order("recorded_on", { ascending: false })
        .limit(60);
      if (error) throw error;
      return (data ?? []) as Recording[];
    },
  });
}

export function useUploadRecording(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      kind: "shadowing" | "journal";
      blob: Blob;
      mimeType: string;
      durationSec: number;
      transcript?: string;
    }) => {
      const ext = input.mimeType.includes("mp4") ? "mp4" : "webm";
      const id = crypto.randomUUID();
      const path = `${userId}/${input.kind}/${today()}-${id}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("recordings")
        .upload(path, input.blob, { contentType: input.mimeType });
      if (upErr) throw upErr;
      const { error } = await supabase.from("recordings").insert({
        user_id: userId!,
        kind: input.kind,
        storage_path: path,
        duration_sec: input.durationSec,
        transcript: input.transcript ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recordings"] }),
  });
}

export async function signedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from("recordings")
    .createSignedUrl(path, 60 * 60);
  if (error) throw error;
  return data.signedUrl;
}

export function useDeleteRecording() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rec: Recording) => {
      await supabase.storage.from("recordings").remove([rec.storage_path]);
      const { error } = await supabase.from("recordings").delete().eq("id", rec.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recordings"] }),
  });
}

// ---------- goldlist ----------
export function useGoldlists(userId: string | undefined) {
  return useQuery({
    queryKey: ["goldlists", userId],
    enabled: !!userId,
    queryFn: async () => {
      const [listsRes, itemsRes] = await Promise.all([
        supabase.from("goldlist_lists").select("*").order("created_on", { ascending: false }),
        supabase.from("goldlist_items").select("*"),
      ]);
      if (listsRes.error) throw listsRes.error;
      if (itemsRes.error) throw itemsRes.error;
      return {
        lists: (listsRes.data ?? []) as GoldlistList[],
        items: (itemsRes.data ?? []) as GoldlistItem[],
      };
    },
  });
}
