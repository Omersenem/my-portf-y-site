"use client";

import { useState } from "react";
import { signedUrl, useDeleteRecording } from "../_lib/queries";
import { useLearnT } from "../_lib/translations";
import type { Recording } from "../_lib/types";

export function RecordingList({ recordings }: { recordings: Recording[] }) {
  const t = useLearnT();
  const del = useDeleteRecording();
  const [urls, setUrls] = useState<Record<string, string>>({});

  async function load(rec: Recording) {
    const url = await signedUrl(rec.storage_path);
    setUrls((u) => ({ ...u, [rec.id]: url }));
  }

  if (recordings.length === 0) {
    return <p className="text-sm text-[var(--color-muted)]">{t.shadow.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {recordings.map((rec) => (
        <div
          key={rec.id}
          className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-muted)]">
              {rec.recorded_on}
              {rec.duration_sec ? ` · ${rec.duration_sec}s` : ""}
            </span>
            <div className="ml-auto flex gap-2">
              {!urls[rec.id] && (
                <button
                  onClick={() => load(rec)}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs transition-colors hover:border-[var(--color-accent)]"
                >
                  ▶
                </button>
              )}
              <button
                onClick={() => del.mutate(rec)}
                aria-label={t.common.delete}
                className="text-xs text-[var(--color-muted)] transition-colors hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
          {urls[rec.id] && <audio controls autoPlay src={urls[rec.id]} className="w-full" />}
          {rec.transcript && (
            <p className="text-xs italic text-[var(--color-muted)]">“{rec.transcript}”</p>
          )}
        </div>
      ))}
    </div>
  );
}
