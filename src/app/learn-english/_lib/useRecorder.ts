"use client";

import { useCallback, useRef, useState } from "react";

// MediaRecorder sarmalayıcı: Chrome/FF webm-opus, Safari mp4
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorderRef.current = rec;
      startedAtRef.current = Date.now();
      rec.start();
      setRecording(true);
    } catch {
      setError("mic-denied");
    }
  }, []);

  const stop = useCallback((): Promise<{
    blob: Blob;
    mimeType: string;
    durationSec: number;
  } | null> => {
    return new Promise((resolve) => {
      const rec = recorderRef.current;
      if (!rec || rec.state === "inactive") {
        setRecording(false);
        resolve(null);
        return;
      }
      rec.onstop = () => {
        const mimeType = rec.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const durationSec = Math.round((Date.now() - startedAtRef.current) / 1000);
        rec.stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
        resolve({ blob, mimeType, durationSec });
      };
      rec.stop();
    });
  }, []);

  return { recording, error, start, stop };
}
