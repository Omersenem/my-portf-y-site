"use client";

// SpeechSynthesis ile İngilizce telaffuz (tarayıcı yerleşik, ücretsiz)
export function speak(text: string, rate = 0.9) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.startsWith("en") && v.localService);
  if (voice) u.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
