"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../_components/Providers";
import { RecordingList } from "../_components/RecordingList";
import { useLearnT } from "../_lib/translations";
import { useRecordings, useUploadRecording, useUpsertCheck } from "../_lib/queries";
import { useRecorder } from "../_lib/useRecorder";

export default function ShadowPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const { data: recordings } = useRecordings(user?.id, "shadowing");
  const upload = useUploadRecording(user?.id);
  const upsertCheck = useUpsertCheck(user?.id);
  const recorder = useRecorder();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [src, setSrc] = useState("");
  const [srcInput, setSrcInput] = useState("");
  const [loopA, setLoopA] = useState<number | null>(null);
  const [loopB, setLoopB] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);

  // A-B döngüsü
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (loopA !== null && loopB !== null && audio.currentTime >= loopB) {
        audio.currentTime = loopA;
      }
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [loopA, loopB]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, src]);

  async function toggleRecord() {
    if (recorder.recording) {
      const result = await recorder.stop();
      if (result) {
        await upload.mutateAsync({ kind: "shadowing", ...result });
        upsertCheck.mutate({
          item_key: "shadowing",
          addMinutes: Math.max(1, Math.round(result.durationSec / 60)),
        });
      }
    } else {
      recorder.start();
    }
  }

  if (!user) return null;

  const fmt = (s: number | null) =>
    s === null ? "—" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <h1 className="text-3xl font-semibold">{t.shadow.title}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSrc(srcInput);
        }}
        className="flex gap-2"
      >
        <input
          type="url"
          required
          placeholder={t.shadow.sourceLabel}
          value={srcInput}
          onChange={(e) => setSrcInput(e.target.value)}
          className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
        />
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[#04120c]"
        >
          OK
        </button>
      </form>

      {src && (
        <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <audio ref={audioRef} controls src={src} className="w-full" />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <button
              onClick={() => setLoopA(audioRef.current?.currentTime ?? null)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 transition-colors hover:border-[var(--color-accent)]"
            >
              {t.shadow.loopA}: {fmt(loopA)}
            </button>
            <button
              onClick={() => setLoopB(audioRef.current?.currentTime ?? null)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 transition-colors hover:border-[var(--color-accent)]"
            >
              {t.shadow.loopB}: {fmt(loopB)}
            </button>
            <button
              onClick={() => {
                setLoopA(null);
                setLoopB(null);
              }}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-muted)]"
            >
              {t.shadow.loopClear}
            </button>
            <label className="ml-auto flex items-center gap-2 text-[var(--color-muted)]">
              {t.shadow.speed}
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1"
              >
                <option value={0.5}>0.5×</option>
                <option value={0.75}>0.75×</option>
                <option value={1}>1×</option>
                <option value={1.25}>1.25×</option>
              </select>
            </label>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={toggleRecord}
          disabled={upload.isPending}
          className={`rounded-lg px-5 py-2.5 font-medium transition-colors ${
            recorder.recording
              ? "bg-red-500 text-white"
              : "bg-[var(--color-accent)] text-[#04120c]"
          } disabled:opacity-50`}
        >
          {recorder.recording ? `⏹ ${t.shadow.stopRecord}` : `🎙 ${t.shadow.record}`}
        </button>
        {recorder.error && (
          <p className="text-sm text-red-400">{t.shadow.micDenied}</p>
        )}
        {upload.isPending && (
          <p className="text-sm text-[var(--color-muted)]">{t.journal.saving}</p>
        )}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t.shadow.archive}
        </h2>
        <RecordingList recordings={recordings ?? []} />
      </section>
    </div>
  );
}
