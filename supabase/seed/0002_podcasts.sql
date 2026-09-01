-- Başlangıç podcast listesi (A1-A2, doğrulanmış URL'ler — Eylül 2026).
-- SQL Editor'de çalıştır; profiles'taki tek kullanıcıya bağlanır.
-- Not: mp3 URL'leri RSS feed'lerinden alındı ve HTTP ile test edildi;
-- YouTube linkleri oEmbed ile doğrulandı. Bölümler zamanla eskiyebilir —
-- yenilerini uygulamadan ekleyebilirsin.

insert into public.podcasts (user_id, title, kind, url, sort_order)
select p.id, v.title, v.kind, v.url, v.sort_order
from public.profiles p,
(values
  -- A1 — gerçek başlangıç
  ('VOA — Let''s Learn English: Lesson 1 (A1)', 'youtube', 'https://www.youtube.com/watch?v=WR9_nsLyaEY', 1),
  ('VOA — Let''s Learn English: Lesson 4 (A1)', 'youtube', 'https://www.youtube.com/watch?v=Z5PF-vJdUdc', 2),
  ('BBC — Easy English Conversations Ep.1 (A1)', 'youtube', 'https://www.youtube.com/watch?v=I_tRSrPru94', 3),
  ('Easy Stories — How the Moon Became Beautiful (A1-A2)', 'audio', 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/tracking.swap.fm/track/6bpBPtHL977KJxLX2zPs/pscrb.fm/rss/p/traffic.megaphone.fm/GLSS4901376127.mp3', 4),
  ('Easy Stories — The Demon Cats (A1-A2)', 'audio', 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/tracking.swap.fm/track/6bpBPtHL977KJxLX2zPs/pscrb.fm/rss/p/traffic.megaphone.fm/GLSS3275823417.mp3', 5),
  -- A2 — yavaş ve net
  ('Speak English Now — 389 How Listening Helps (A2)', 'audio', 'https://traffic.libsyn.com/secure/speakenglishpodcast/389_How_Listening_Helps_you_Speak_English.mp3?dest-id=491662', 6),
  ('Speak English Now — 388 Alice in Wonderland (A2)', 'audio', 'https://traffic.libsyn.com/secure/speakenglishpodcast/388_Alice_in_Wonderland.mp3?dest-id=491662', 7),
  ('Podcasts in English Lv.1 — Plumes (A2)', 'audio', 'https://traffic.libsyn.com/podcastsinenglish/plumes.mp3', 8),
  ('Podcasts in English Lv.1 — Horses (A2)', 'audio', 'https://traffic.libsyn.com/podcastsinenglish/horses.mp3', 9),
  ('SEND7 — Simple English News Daily (A2)', 'audio', 'https://dts.podtrac.com/redirect.mp3/op3.dev/e/adbarker.com/stream/K1GF85x83ZWP88Cz18NfA8bx/api.spreaker.com/download/episode/74759283/31_08_26.mp3', 10),
  ('Espresso English — 10 Fluent Phrases (A2)', 'audio', 'https://dts.podtrac.com/redirect.mp3/pscrb.fm/rss/p/traffic.libsyn.com/secure/espressoenglish/10-phrases-transformed.mp3?dest-id=212704', 11),
  ('Easy Stories — The Animals'' Peace Party (A2)', 'audio', 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/tracking.swap.fm/track/6bpBPtHL977KJxLX2zPs/pscrb.fm/rss/p/traffic.megaphone.fm/GLSS8399405421.mp3', 12),
  -- A2 üstü — ~30 dk'lık oturumlar
  ('Culips — Simplified Speech 252 (A2, 37dk)', 'audio', 'https://media.blubrry.com/culips/content.blubrry.com/culips/SS252_Regular.mp3', 13),
  ('Culips — Fall Between the Cracks (A2, 29dk)', 'audio', 'https://media.blubrry.com/culips/content.blubrry.com/culips/B180_Regular.mp3', 14),
  ('Adept English — Ep.876 Friends vs Followers (A2)', 'audio', 'https://traffic.megaphone.fm/APO8544482195.mp3', 15),
  ('Adept English — Ep.875 Phone-free Week (A2)', 'audio', 'https://traffic.megaphone.fm/APO5891365936.mp3', 16),
  ('BBC 6 Minute English — Politeness (A2-B1)', 'youtube', 'https://www.youtube.com/watch?v=5wynL5ttotw', 17),
  ('BBC 6 Minute — Food BOX SET (A2, ~30dk)', 'youtube', 'https://www.youtube.com/watch?v=bKfFvme1b8I', 18),
  ('BBC 6 Minute — Green Issues BOX SET (A2, ~30dk)', 'youtube', 'https://www.youtube.com/watch?v=2Hko4TrWZYI', 19)
) as v(title, kind, url, sort_order);
