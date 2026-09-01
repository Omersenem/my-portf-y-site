# Learn English — Proje Dokümantasyonu

> Bu dosya Claude oturumları için referanstır: yeni bir istek geldiğinde önce burayı oku.
> Son güncelleme: 2026-09-01 — platform canlıda: https://omersenem.com/learn-english/

## Ne bu?

"Mezzofanti Metodu" (6 aşamalı dil edinim sistemi) üzerine kurulu, tek kullanıcılık kişisel
İngilizce öğrenme platformu. Portföy sitesinin (`omersenem.com`) içine `/learn-english`
segmenti olarak gömülü.

Metodun 6 aşaması: 1) Müziği duy (pasif dinleme) → 2) Shadowing → 3) i+1 anlaşılır girdi →
4) Aralıklı tekrar (SRS) → 5) Yapı sökümü (12 cümle) → 6) Konuş (hata saymadan).
Bonuslar: Goldlist, minimal çiftler, dili yaşa.

## Mimari (kritik kısıtlar)

```
Tarayıcı (GitHub Pages'ten statik sayfalar)
  └─ supabase-js ──► Supabase: Postgres (RLS) + Auth + Storage (recordings bucket)
```

- **Next 16 static export** (`output:"export"`, `trailingSlash:true`) → API route YOK, SSR YOK,
  `[id]` dinamik route YOK. Her şey `"use client"`; runtime veri için query param
  (`?id=...` + `useSearchParams` Suspense içinde).
- **AGENTS.md uyarısı geçerli**: Next 16 breaking changes — kod yazmadan önce
  `node_modules/next/dist/docs/` kontrol et.
- İç linkler HEP trailing slash: `/learn-english/review/`.
- **Supabase projesi**: `kdeokmoyllwtnlbjkxau` (eu). Tek kullanıcı (omerrsenem@gmail.com),
  sign-up KAPALI, güvenlik sınırı RLS (`user_id = auth.uid()`), anon key bilerek public.
- Env: `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — lokalde `.env.local`,
  CI'da GitHub repo **Variables** (build'e gömülür; key değişirse rebuild şart).
- Deploy: main'e push → `.github/workflows/deploy.yml` → GitHub Pages. Ayrıca
  `keepalive.yml` haftada 2 kez Supabase'e ping atar (free tier duraklamasın).
- **Claude API runtime'ı bilinçli ERTELENDİ** (Max aboneliği API içermiyor; kullanıcı erteledi).
  İleride istenirse tasarım hazır: Supabase Edge Functions proxy (`generate-card`,
  `speaking-feedback`, `generate-content`), JWT+owner check, CORS allowlist
  [omersenem.com, localhost:3000], key `supabase secrets` ile.

## Dosya yapısı

```
src/app/(portfolio)/          # portföy ana sayfa + Navbar (route group refactor yapıldı)
src/app/learn-english/
  layout.tsx                  # LearnProviders (Auth+ReactQuery) + LearnNav + learn.css
  page.tsx                    # Dashboard: 6'lı checklist, streak, ısı haritası, 100 gün
  login/  listen/  shadow/  library/  review/  journal/
  grammar/                    # layout (Konular|Kelimeler sekmeleri), page (26 konu+quiz), vocab/
  extras/                     # layout (alt sekmeler), grammar-map/, pairs/, goldlist/
  _components/                # Providers, LearnNav, Heatmap, RecordingList
  _lib/
    supabase.ts               # client singleton
    queries.ts                # TÜM React Query hook'ları (veri erişimi burada)
    srs.ts                    # SM-2 saf fonksiyon (schedule), tarih yardımcıları
    routine.ts                # 6 rutin maddesi + hedef dakikalar
    translations.ts           # LearnTranslation TR/EN + useLearnT() (portföyünkinden AYRI!)
    types.ts                  # DB satır tipleri
    speech.ts                 # speak() — SpeechSynthesis TTS
    dictionary.ts             # lookupWord() — dictionaryapi.dev + MyMemory (ücretsiz, keysiz)
    grammarData.ts            # 26 konu A1-A2 müfredat (TR anlatım+örnek+MCQ)
    vocabData.ts              # ~170 kelime, 12 tema, örnek cümleli
    useRecorder.ts            # MediaRecorder hook (webm-opus / Safari mp4)
  learn.css                   # .learn wrapper — accent'i yeşile (#34d399) çevirir
supabase/
  migrations/0001_init.sql    # şema+RLS+trigger+review_card RPC+storage policy (UYGULANDI)
  seed/0001_starter_content.sql  # 3 i+1 metni + 12 kart (kullanıcı çalıştırdı)
  seed/0002_podcasts.sql      # 19 doğrulanmış A1-A2 podcast (mp3 HEAD-test + YT oEmbed)
  README.md                   # kurulum adımları
```

## DB şeması (özet)

`profiles` (start_date→100 gün, settings jsonb) · `daily_checks` (date+item_key unique,
minutes_done, checked) · `cards` (SM-2 alanları: ease_factor, interval_days, repetitions,
lapses, due_date, status) · `reviews` (rating 0/3/4/5) · `contents` (i+1, level A1-C2) ·
`podcasts` (kind: audio|youtube|rss) · `recordings` (kind: shadowing|journal, storage_path
`<uid>/<kind>/<tarih>-<id>.<ext>`) · `goldlist_lists` (unlocks_on = created_on+14 generated)
+ `goldlist_items`. RPC: `review_card(...)` — kart update + review insert atomik.

## Kurallar / konvansiyonlar

- Yeni learn sayfası: `"use client"`, `useAuth()` ile `if (!user) return null`, metinler
  `useLearnT()` üzerinden (TR+EN ikisi de doldurulur), veri erişimi `_lib/queries.ts`'e hook.
- Rutin otomasyonu: bir aktivite tamamlanınca `useUpsertCheck` ile ilgili `item_key`
  işaretlenir/dakika eklenir (örn. SRS kuyruğu bitince `srs: checked`).
- Gramer ilerlemesi localStorage'da (`learn-grammar-progress`), DB'de değil.
- Commit: lowercase `feat:`/`fix:` Türkçe mesaj + Co-Authored-By/Claude-Session footer.
  Kullanıcı isterse commit atılır; **push kullanıcının terminalinden**:
  `! git -C /c/Users/OmerSenem/omersenem-web push` (Claude'un shell'inde GCM prompt açamıyor).
- Lint tuzağı: `react-hooks/set-state-in-effect` — localStorage okumak için effect'te setState
  gerekiyorsa gerekçeli `eslint-disable-next-line` kullan (mevcut örnekler var).

## Durum (2026-09-01)

**Canlıda çalışıyor:** tüm modüller (dashboard, SRS+telaffuz, dinleme+sayaç, shadowing,
kütüphane+sözlük, günlük, gramer 26 konu+egzersiz, kelimeler ~170, minimal çiftler,
goldlist, dil haritası). Deploy yeşil, env bundle'da doğrulandı, RLS test edildi.

**Kullanıcının bekleyen işi:** `seed/0002_podcasts.sql`'i SQL Editor'de çalıştırmak
(yaptıysa Dinle sekmesinde 19 podcast görünür).

**Muhtemel sonraki adımlar (istenirse):**
- Claude API entegrasyonu (Edge Functions — tasarım yukarıda)
- RSS feed desteği (CORS sorunu → Edge Function proxy gerekir)
- YouTube IFrame API ile play-state'e bağlı otomatik sayaç (şimdilik manuel başlat/durdur)
- Kart düzenleme/silme UI'ı, kart arama
- Gramer ilerlemesini DB'ye taşıma (çok cihaz senkronu)
- shadowing için kayıt-orijinal karşılaştırma görünümü
