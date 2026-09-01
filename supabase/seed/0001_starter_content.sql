-- Başlangıç içeriği (dev aşamasında üretildi).
-- Owner hesabı oluşturulduktan SONRA SQL Editor'de çalıştır — profiles'taki tek kullanıcıya bağlanır.

-- i+1 örnek metinleri
insert into public.contents (user_id, title, body, level, kind)
select p.id, v.title, v.body, v.level, 'transcript'
from public.profiles p,
(values
  ('A Morning in Denizli', 'I wake up at seven o''clock. The sun is already up. I make coffee and look out the window. The streets are quiet. I eat breakfast with my family. Then I open my laptop and start to work. I write code for an American company. In the afternoon I take a walk. The weather is warm. I listen to an English podcast while I walk. I do not understand everything, but that is okay. Every day I understand a little more.', 'A2'),
  ('Why I Learn English', 'Learning a language is like building a house. First you need a strong foundation. For a language, the foundation is not grammar. It is sound. Babies listen for a whole year before they say their first word. They hear the music of the language every day. Adults often skip this step, and that is why they struggle. I decided to learn English differently this time. I listen every day, even when I do not understand. I repeat what I hear. I read stories that are just a little difficult for me. Slowly, the language is becoming part of my life instead of a subject to study.', 'B1'),
  ('The Developer''s Day', 'Every morning I check my tasks before the daily meeting. My team works in a different time zone, so most of my messages arrive at night. I read the code reviews first because other people are waiting for my answers. Then I pick the most important task and work on it without interruption for two hours. Deep work is difficult but valuable. When I get stuck, I explain the problem out loud, sometimes in English. Explaining a problem is often enough to solve it. After lunch I test my changes and write short notes about what I did. Good notes today save hours tomorrow.', 'B1')
) as v(title, body, level);

-- Başlangıç SRS kartları (cümle bağlamlı)
insert into public.cards (user_id, word, sentence, translation)
select p.id, v.word, v.sentence, v.translation
from public.profiles p,
(values
  ('foundation', 'First you need a strong foundation.', 'temel'),
  ('struggle', 'Adults often skip this step, and that is why they struggle.', 'zorlanmak'),
  ('quiet', 'The streets are quiet.', 'sessiz'),
  ('interruption', 'I work on it without interruption for two hours.', 'kesinti'),
  ('valuable', 'Deep work is difficult but valuable.', 'değerli'),
  ('stuck', 'When I get stuck, I explain the problem out loud.', 'takılmak, sıkışmak'),
  ('arrive', 'Most of my messages arrive at night.', 'ulaşmak, gelmek'),
  ('skip', 'Adults often skip this step.', 'atlamak'),
  ('whole', 'Babies listen for a whole year.', 'bütün, tam'),
  ('slowly', 'Slowly, the language is becoming part of my life.', 'yavaşça'),
  ('instead of', 'Part of my life instead of a subject to study.', 'yerine'),
  ('enough', 'Explaining a problem is often enough to solve it.', 'yeterli')
) as v(word, sentence, translation);
