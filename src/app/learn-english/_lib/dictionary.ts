"use client";

// Ücretsiz, anahtar gerektirmeyen sözlük servisleri (CORS açık):
// - dictionaryapi.dev → İngilizce tanım + fonetik
// - MyMemory → Türkçe karşılık (günlük anonim kota var; hata olursa boş döner)

export type WordInfo = {
  phonetic: string | null;
  definition: string | null;
  partOfSpeech: string | null;
  turkish: string | null;
};

type DictEntry = {
  phonetic?: string;
  phonetics?: { text?: string }[];
  meanings?: {
    partOfSpeech?: string;
    definitions?: { definition?: string }[];
  }[];
};

export async function lookupWord(word: string): Promise<WordInfo> {
  const [dict, tr] = await Promise.allSettled([
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`).then(
      (r) => (r.ok ? (r.json() as Promise<DictEntry[]>) : null)
    ),
    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|tr`
    ).then((r) => (r.ok ? r.json() : null)),
  ]);

  let phonetic: string | null = null;
  let definition: string | null = null;
  let partOfSpeech: string | null = null;
  if (dict.status === "fulfilled" && dict.value?.[0]) {
    const entry = dict.value[0];
    phonetic =
      entry.phonetic ?? entry.phonetics?.find((p) => p.text)?.text ?? null;
    const meaning = entry.meanings?.[0];
    partOfSpeech = meaning?.partOfSpeech ?? null;
    definition = meaning?.definitions?.[0]?.definition ?? null;
  }

  let turkish: string | null = null;
  if (tr.status === "fulfilled" && tr.value?.responseData?.translatedText) {
    const text = String(tr.value.responseData.translatedText);
    // MyMemory bazen kaynak metni aynen döndürür — o zaman gösterme
    if (text.toLowerCase() !== word.toLowerCase()) turkish = text.toLowerCase();
  }

  return { phonetic, definition, partOfSpeech, turkish };
}
