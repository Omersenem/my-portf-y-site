"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/translations";

// Portföyün Translation tipini şişirmemek için learn modülünün sözlüğü ayrı tutulur.
export type LearnTranslation = {
  nav: {
    today: string;
    listen: string;
    shadow: string;
    library: string;
    review: string;
    journal: string;
    grammar: string;
    extras: string;
    logout: string;
  };
  grammar: {
    title: string;
    topicsTab: string;
    vocabTab: string;
    examples: string;
    startQuiz: string;
    next: string;
    finish: string;
    score: string;
    passed: string;
    retry: string;
    completed: string;
    addCard: string;
    added: string;
    backToTopics: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    add: string;
    close: string;
    minutes: string;
    error: string;
  };
  login: {
    title: string;
    email: string;
    password: string;
    submit: string;
    failed: string;
  };
  dashboard: {
    title: string;
    streak: string;
    days: string;
    hundredDays: string;
    routineTitle: string;
    heatmapTitle: string;
    items: Record<string, { name: string; hint: string }>;
    minutesOf: string; // "12 / 30 dk"
  };
  listen: {
    title: string;
    addTitle: string;
    urlLabel: string;
    nameLabel: string;
    typeAudio: string;
    typeYoutube: string;
    timer: string;
    timerHint: string;
    empty: string;
  };
  shadow: {
    title: string;
    sourceLabel: string;
    loopA: string;
    loopB: string;
    loopClear: string;
    speed: string;
    record: string;
    stopRecord: string;
    archive: string;
    empty: string;
    micDenied: string;
  };
  library: {
    title: string;
    addTitle: string;
    level: string;
    body: string;
    clickHint: string;
    makeCard: string;
    empty: string;
    back: string;
  };
  review: {
    title: string;
    due: string;
    newCard: string;
    word: string;
    sentence: string;
    translation: string;
    showAnswer: string;
    again: string;
    hard: string;
    good: string;
    easy: string;
    done: string;
    stats: string;
    retention: string;
    totalCards: string;
    reviewsLast30: string;
  };
  journal: {
    title: string;
    hint: string;
    record: string;
    stop: string;
    saving: string;
    archive: string;
    transcriptLabel: string;
    empty: string;
  };
  extras: {
    pairs: string;
    goldlist: string;
    grammarMap: string;
    pairsPlay: string;
    pairsWhich: string;
    pairsScore: string;
    glNew: string;
    glLocked: string;
    glUnlocks: string;
    glDistill: string;
    glHint: string;
    glEnPlaceholder: string;
    glTrPlaceholder: string;
  };
};

const tr: LearnTranslation = {
  nav: {
    today: "Bugün",
    listen: "Dinle",
    shadow: "Shadowing",
    library: "Kütüphane",
    review: "Tekrar",
    journal: "Günlük",
    grammar: "Gramer",
    extras: "Ekstra",
    logout: "Çıkış",
  },
  grammar: {
    title: "Gramer (A1-A2)",
    topicsTab: "Konular",
    vocabTab: "Kelimeler",
    examples: "Örnekler",
    startQuiz: "Egzersize başla",
    next: "Sonraki",
    finish: "Bitir",
    score: "Skor",
    passed: "Geçtin! 🎉",
    retry: "Tekrar dene",
    completed: "tamamlandı",
    addCard: "Karta ekle",
    added: "Eklendi ✓",
    backToTopics: "← Konulara dön",
  },
  common: {
    loading: "Yükleniyor…",
    save: "Kaydet",
    cancel: "Vazgeç",
    delete: "Sil",
    add: "Ekle",
    close: "Kapat",
    minutes: "dk",
    error: "Bir şeyler ters gitti",
  },
  login: {
    title: "Learn English — Giriş",
    email: "E-posta",
    password: "Şifre",
    submit: "Giriş yap",
    failed: "Giriş başarısız — bilgileri kontrol et",
  },
  dashboard: {
    title: "Bugün",
    streak: "Seri",
    days: "gün",
    hundredDays: "İlk 100 gün",
    routineTitle: "Günlük Rutin",
    heatmapTitle: "Son 4 ay",
    items: {
      listening: { name: "Pasif dinleme", hint: "Arka planda podcast — anlamaya çalışma" },
      shadowing: { name: "Shadowing", hint: "Duyduğunu eş zamanlı sesli tekrar et" },
      reading: { name: "i+1 içerik", hint: "Seviyenin bir adım üstünde oku/izle" },
      srs: { name: "Kart tekrarı", hint: "Bugünün kartlarını bitir" },
      speaking: { name: "1 dakika konuş", hint: "Günü İngilizce anlat, kaydet" },
      goldlist: { name: "Goldlist", hint: "Yeni liste yaz ya da açılan listeyi damıt" },
    },
    minutesOf: "dk",
  },
  listen: {
    title: "Dinleme",
    addTitle: "Kaynak ekle",
    urlLabel: "URL (mp3 veya YouTube linki)",
    nameLabel: "Ad",
    typeAudio: "Ses",
    typeYoutube: "YouTube",
    timer: "Bugünkü dinleme",
    timerHint: "Sayaç yalnız oynatma sürerken işler; her dakika kaydedilir.",
    empty: "Henüz kaynak yok — bir podcast mp3 linki ya da YouTube videosu ekle.",
  },
  shadow: {
    title: "Shadowing",
    sourceLabel: "Ses dosyası URL'i (mp3)",
    loopA: "A noktası",
    loopB: "B noktası",
    loopClear: "Döngüyü temizle",
    speed: "Hız",
    record: "Kaydı başlat",
    stopRecord: "Kaydı bitir",
    archive: "Kayıt arşivi",
    empty: "Henüz kayıt yok.",
    micDenied: "Mikrofon izni gerekli — tarayıcı ayarlarından izin ver.",
  },
  library: {
    title: "Kütüphane (i+1)",
    addTitle: "İçerik ekle",
    level: "Seviye",
    body: "Metin / transkript",
    clickHint: "Bilmediğin kelimeye tıkla → kart oluştur.",
    makeCard: "Kart oluştur",
    empty: "Henüz içerik yok — bir transkript ya da kısa metin ekle.",
    back: "← Listeye dön",
  },
  review: {
    title: "Kart Tekrarı",
    due: "Bugün",
    newCard: "Yeni kart",
    word: "Kelime",
    sentence: "Cümle (bağlam)",
    translation: "Türkçesi",
    showAnswer: "Cevabı göster",
    again: "Tekrar",
    hard: "Zor",
    good: "İyi",
    easy: "Kolay",
    done: "Bugünlük bitti 🎉",
    stats: "İstatistik",
    retention: "Hatırlama (30 gün)",
    totalCards: "Toplam kart",
    reviewsLast30: "Tekrar (30 gün)",
  },
  journal: {
    title: "Konuşma Günlüğü",
    hint: "Günde 1 dakika: bugün ne yaptığını İngilizce anlat. Hata sayılmaz.",
    record: "Kayda başla",
    stop: "Bitir",
    saving: "Kaydediliyor…",
    archive: "Arşiv",
    transcriptLabel: "Transkript (Chrome)",
    empty: "Henüz kayıt yok — ilk 1 dakikanı bugün kaydet.",
  },
  extras: {
    pairs: "Minimal Çiftler",
    goldlist: "Goldlist",
    grammarMap: "Dil Haritası",
    pairsPlay: "Dinle",
    pairsWhich: "Hangisini duydun?",
    pairsScore: "Skor",
    glNew: "Yeni liste",
    glLocked: "Kilitli",
    glUnlocks: "Açılış",
    glDistill: "Damıt: hatırlamadıklarını yeni listeye taşı",
    glHint: "20-25 ifade yaz, ezberlemeye çalışma. Liste 14 gün kilitlenir.",
    glEnPlaceholder: "İngilizce ifade",
    glTrPlaceholder: "Türkçesi",
  },
};

const en: LearnTranslation = {
  nav: {
    today: "Today",
    listen: "Listen",
    shadow: "Shadowing",
    library: "Library",
    review: "Review",
    journal: "Journal",
    grammar: "Grammar",
    extras: "Extras",
    logout: "Sign out",
  },
  grammar: {
    title: "Grammar (A1-A2)",
    topicsTab: "Topics",
    vocabTab: "Vocabulary",
    examples: "Examples",
    startQuiz: "Start exercise",
    next: "Next",
    finish: "Finish",
    score: "Score",
    passed: "Passed! 🎉",
    retry: "Try again",
    completed: "completed",
    addCard: "Add card",
    added: "Added ✓",
    backToTopics: "← Back to topics",
  },
  common: {
    loading: "Loading…",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    add: "Add",
    close: "Close",
    minutes: "min",
    error: "Something went wrong",
  },
  login: {
    title: "Learn English — Sign in",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    failed: "Sign-in failed — check your credentials",
  },
  dashboard: {
    title: "Today",
    streak: "Streak",
    days: "days",
    hundredDays: "First 100 days",
    routineTitle: "Daily Routine",
    heatmapTitle: "Last 4 months",
    items: {
      listening: { name: "Passive listening", hint: "Podcast in the background — don't try to understand" },
      shadowing: { name: "Shadowing", hint: "Repeat what you hear in near real-time" },
      reading: { name: "i+1 input", hint: "Read/watch one step above your level" },
      srs: { name: "Card review", hint: "Finish today's cards" },
      speaking: { name: "Speak 1 minute", hint: "Describe your day in English, record it" },
      goldlist: { name: "Goldlist", hint: "Write a new list or distill an unlocked one" },
    },
    minutesOf: "min",
  },
  listen: {
    title: "Listening",
    addTitle: "Add source",
    urlLabel: "URL (mp3 or YouTube link)",
    nameLabel: "Name",
    typeAudio: "Audio",
    typeYoutube: "YouTube",
    timer: "Today's listening",
    timerHint: "The timer only runs while playing; saved every minute.",
    empty: "No sources yet — add a podcast mp3 link or a YouTube video.",
  },
  shadow: {
    title: "Shadowing",
    sourceLabel: "Audio file URL (mp3)",
    loopA: "Point A",
    loopB: "Point B",
    loopClear: "Clear loop",
    speed: "Speed",
    record: "Start recording",
    stopRecord: "Stop recording",
    archive: "Recording archive",
    empty: "No recordings yet.",
    micDenied: "Microphone permission needed — allow it in browser settings.",
  },
  library: {
    title: "Library (i+1)",
    addTitle: "Add content",
    level: "Level",
    body: "Text / transcript",
    clickHint: "Click an unknown word → create a card.",
    makeCard: "Create card",
    empty: "No content yet — add a transcript or short text.",
    back: "← Back to list",
  },
  review: {
    title: "Card Review",
    due: "Due today",
    newCard: "New card",
    word: "Word",
    sentence: "Sentence (context)",
    translation: "Turkish",
    showAnswer: "Show answer",
    again: "Again",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    done: "Done for today 🎉",
    stats: "Stats",
    retention: "Retention (30 days)",
    totalCards: "Total cards",
    reviewsLast30: "Reviews (30 days)",
  },
  journal: {
    title: "Speaking Journal",
    hint: "1 minute a day: describe your day in English. Mistakes don't count.",
    record: "Start recording",
    stop: "Stop",
    saving: "Saving…",
    archive: "Archive",
    transcriptLabel: "Transcript (Chrome)",
    empty: "No recordings yet — record your first minute today.",
  },
  extras: {
    pairs: "Minimal Pairs",
    goldlist: "Goldlist",
    grammarMap: "Language Map",
    pairsPlay: "Play",
    pairsWhich: "Which one did you hear?",
    pairsScore: "Score",
    glNew: "New list",
    glLocked: "Locked",
    glUnlocks: "Unlocks",
    glDistill: "Distill: move what you forgot to a new list",
    glHint: "Write 20-25 phrases, don't try to memorize. The list locks for 14 days.",
    glEnPlaceholder: "English phrase",
    glTrPlaceholder: "Turkish",
  },
};

export const learnTranslations: Record<Lang, LearnTranslation> = { tr, en };

export function useLearnT(): LearnTranslation {
  const { lang } = useLanguage();
  return learnTranslations[lang];
}
