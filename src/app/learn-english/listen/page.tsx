"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "../_components/Providers";
import { useLearnT } from "../_lib/translations";
import {
  useAddPodcast,
  useChecks,
  useDeletePodcast,
  usePodcasts,
  useUpsertCheck,
  today,
} from "../_lib/queries";
import { ROUTINE } from "../_lib/routine";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function ListenPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const { data: podcasts } = usePodcasts(user?.id);
  const { data: checks } = useChecks(user?.id, 2);
  const add = useAddPodcast(user?.id);
  const del = useDeletePodcast();
  const upsert = useUpsertCheck(user?.id);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const target =
    ROUTINE.find((r) => r.key === "listening")?.targetMin ?? 30;
  const savedMin =
    checks?.find((c) => c.date === today() && c.item_key === "listening")
      ?.minutes_done ?? 0;

  // Sayaç: her 60 sn'de bir DB'ye 1 dk yaz (sekme kapanırsa kayıp ≤1 dk)
  const upsertRef = useRef(upsert.mutate);
  useEffect(() => {
    upsertRef.current = upsert.mutate;
  }, [upsert.mutate]);
  useEffect(() => {
    if (!timerOn) return;
    const iv = setInterval(() => {
      setElapsedSec((s) => {
        const next = s + 1;
        if (next % 60 === 0) {
          upsertRef.current({
            item_key: "listening",
            addMinutes: 1,
            checked: savedMin + Math.floor(next / 60) >= target ? true : undefined,
          });
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [timerOn, savedMin, target]);

  async function onAdd(e: FormEvent) {
    e.preventDefault();
    const kind = youtubeId(url) ? "youtube" : "audio";
    await add.mutateAsync({ title, kind, url });
    setTitle("");
    setUrl("");
  }

  if (!user) return null;

  const activePodcast = podcasts?.find((p) => p.id === active);
  const totalMin = savedMin + Math.floor(elapsedSec / 60);

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <h1 className="text-3xl font-semibold">{t.listen.title}</h1>

      <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
        <button
          onClick={() => setTimerOn((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors ${
            timerOn
              ? "bg-[var(--color-accent)] text-[#04120c]"
              : "border border-[var(--color-border)] hover:border-[var(--color-accent)]"
          }`}
          aria-label={timerOn ? "Pause timer" : "Start timer"}
        >
          {timerOn ? "⏸" : "▶"}
        </button>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {t.listen.timer}:{" "}
            <span className="gradient-text font-mono">
              {totalMin}/{target} {t.common.minutes}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">{t.listen.timerHint}</p>
        </div>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--color-bg)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all"
            style={{ width: `${Math.min(100, (totalMin / target) * 100)}%` }}
          />
        </div>
      </div>

      {activePodcast && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="mb-2 text-sm font-medium">{activePodcast.title}</div>
          {activePodcast.kind === "youtube" ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId(activePodcast.url)}`}
                title={activePodcast.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <audio
              controls
              src={activePodcast.url}
              className="w-full"
              onPlay={() => setTimerOn(true)}
              onPause={() => setTimerOn(false)}
              onEnded={() => setTimerOn(false)}
            />
          )}
        </div>
      )}

      <section className="flex flex-col gap-2">
        {(podcasts ?? []).map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
              p.id === active
                ? "border-[var(--color-accent)]/40 bg-[var(--color-card)]"
                : "border-[var(--color-border)] bg-[var(--color-card)]/50"
            }`}
          >
            <button onClick={() => setActive(p.id)} className="min-w-0 flex-1 text-left">
              <span className="mr-2 font-mono text-[10px] uppercase text-[var(--color-muted)]">
                {p.kind === "youtube" ? t.listen.typeYoutube : t.listen.typeAudio}
              </span>
              <span className="truncate font-medium">{p.title}</span>
            </button>
            <button
              onClick={() => del.mutate(p.id)}
              aria-label={t.common.delete}
              className="text-xs text-[var(--color-muted)] transition-colors hover:text-red-400"
            >
              ✕
            </button>
          </div>
        ))}
        {podcasts?.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">{t.listen.empty}</p>
        )}
      </section>

      <form
        onSubmit={onAdd}
        className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
      >
        <h2 className="text-sm font-medium">{t.listen.addTitle}</h2>
        <input
          required
          placeholder={t.listen.nameLabel}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
        />
        <input
          required
          type="url"
          placeholder={t.listen.urlLabel}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
        />
        <button
          type="submit"
          disabled={add.isPending}
          className="self-start rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04120c] disabled:opacity-50"
        >
          {t.common.add}
        </button>
      </form>
    </div>
  );
}
