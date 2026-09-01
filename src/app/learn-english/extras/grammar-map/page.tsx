"use client";

import { useLearnT } from "../../_lib/translations";

// Tim Ferriss'in yapı-söküm cümleleri + İngilizce için çıkarılan kurallar.
const SENTENCES: { en: string; tr: string }[] = [
  { en: "The apple is red.", tr: "Elma kırmızıdır." },
  { en: "It is John's apple.", tr: "Bu John'un elması." },
  { en: "I give John the apple.", tr: "John'a elmayı veriyorum." },
  { en: "We give him the apple.", tr: "Ona elmayı veriyoruz." },
  { en: "He gives it to John.", tr: "Onu John'a veriyor." },
  { en: "She gives it to him.", tr: "Onu ona veriyor." },
  { en: "I must give it to him.", tr: "Onu ona vermeliyim." },
  { en: "I want to give it to her.", tr: "Onu ona vermek istiyorum." },
  { en: "I'm going to know tomorrow.", tr: "Yarın öğreneceğim." },
  { en: "I can't eat the apple.", tr: "Elmayı yiyemem." },
  { en: "I have eaten the apple.", tr: "Elmayı yedim (yemiş durumdayım)." },
  { en: "I gave John the apple yesterday.", tr: "Dün John'a elmayı verdim." },
];

const RULES: { q: string; a: string }[] = [
  {
    q: "Kelime sırası nasıl?",
    a: "Özne–Fiil–Nesne (SVO): \"I give John the apple.\" Türkçe SOV'dan farklı — fiil başa yakın gelir.",
  },
  {
    q: "Sıfat isimden önce mi sonra mı?",
    a: "Önce: \"the red apple\". Türkçeyle aynı yön.",
  },
  {
    q: "Çoğul nasıl yapılıyor?",
    a: "Genelde -s / -es: apple → apples. Düzensizler ezber: man → men, child → children.",
  },
  {
    q: "Zaman ekleri nereye geliyor?",
    a: "Fiil değişir veya yardımcı fiil eklenir: give → gave (geçmiş), will give (gelecek), have given (perfect). Ek yığmak yerine küçük kelimeler eklenir.",
  },
  {
    q: "Soru cümlesi nasıl kurulur?",
    a: "Yardımcı fiil başa gelir: \"You can eat.\" → \"Can you eat?\" Do/does/did soru makinesi: \"Do you like apples?\"",
  },
  {
    q: "İyelik nasıl gösterilir?",
    a: "'s veya of: \"John's apple\" / \"the color of the apple\". Zamirlerde my, your, his, her.",
  },
];

export default function GrammarMapPage() {
  const t = useLearnT();

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <h1 className="text-3xl font-semibold">{t.extras.grammarMap}</h1>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          12 cümle
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <tbody>
              {SENTENCES.map((s, i) => (
                <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs text-[var(--color-muted)]">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2.5 font-medium">{s.en}</td>
                  <td className="px-4 py-2.5 text-[var(--color-muted)]">{s.tr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Harita
        </h2>
        <div className="flex flex-col gap-3">
          {RULES.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 p-4"
            >
              <h3 className="font-medium text-[var(--color-accent)]">{r.q}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{r.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
