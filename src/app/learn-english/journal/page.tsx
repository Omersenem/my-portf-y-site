"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../_components/Providers";
import { RecordingList } from "../_components/RecordingList";
import { useLearnT } from "../_lib/translations";
import { useRecordings, useUploadRecording, useUpsertCheck } from "../_lib/queries";
import { useRecorder } from "../_lib/useRecorder";

// Web Speech API (pratikte Chrome) — yoksa transkriptsiz devam
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
};

function makeRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = false;
  return rec;
}

export default function JournalPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const { data: recordings } = useRecordings(user?.id, "journal");
  const upload = useUploadRecording(user?.id);
  const upsertCheck = useUpsertCheck(user?.id);
  const recorder = useRecorder();

  const [seconds, setSeconds] = useState(0);
  const transcriptRef = useRef("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (!recorder.recording) return;
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [recorder.recording]);

  async function toggle() {
    if (recorder.recording) {
      recognitionRef.current?.stop();
      const result = await recorder.stop();
      if (result) {
        await upload.mutateAsync({
          kind: "journal",
          ...result,
          transcript: transcriptRef.current || undefined,
        });
        upsertCheck.mutate({ item_key: "speaking", checked: true });
      }
      setSeconds(0);
      transcriptRef.current = "";
    } else {
      transcriptRef.current = "";
      const rec = makeRecognition();
      if (rec) {
        rec.onresult = (e) => {
          let text = "";
          for (let i = 0; i < e.results.length; i++) {
            text += e.results[i][0].transcript + " ";
          }
          transcriptRef.current = text.trim();
        };
        recognitionRef.current = rec;
        try {
          rec.start();
        } catch {
          // zaten çalışıyorsa yut
        }
      }
      await recorder.start();
      setSeconds(0);
    }
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-semibold">{t.journal.title}</h1>
        <p className="mt-2 max-w-lg text-sm text-[var(--color-muted)]">{t.journal.hint}</p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8">
        <div className="font-mono text-4xl tabular-nums">
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </div>
        <button
          onClick={toggle}
          disabled={upload.isPending}
          className={`rounded-full px-8 py-3 font-medium transition-colors ${
            recorder.recording
              ? "bg-red-500 text-white"
              : "bg-[var(--color-accent)] text-[#04120c]"
          } disabled:opacity-50`}
        >
          {upload.isPending
            ? t.journal.saving
            : recorder.recording
              ? `⏹ ${t.journal.stop}`
              : `🎙 ${t.journal.record}`}
        </button>
        {seconds >= 60 && recorder.recording && (
          <p className="text-sm text-[var(--color-accent)]">✓ 1:00</p>
        )}
        {recorder.error && <p className="text-sm text-red-400">{t.shadow.micDenied}</p>}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t.journal.archive}
        </h2>
        <RecordingList recordings={recordings ?? []} />
      </section>
    </div>
  );
}
