// A1-A2 gramer müfredatı (dev aşamasında derlendi).
// Yapı: kısa TR anlatım → örnekler → çoktan seçmeli egzersiz.

export type GrammarTopic = {
  id: string;
  title: string;
  level: "A1" | "A2";
  explanation: string[];
  examples: { en: string; tr: string }[];
  exercises: { q: string; options: string[]; answer: number }[];
};

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // ================= A1 =================
  {
    id: "to-be",
    title: "am / is / are — olmak fiili",
    level: "A1",
    explanation: [
      "İngilizcede 'olmak' fiili özneye göre değişir: I am, you/we/they are, he/she/it is.",
      "Olumsuz için not eklenir: is not (isn't), are not (aren't). Soru için fiil başa gelir: Are you...? Is she...?",
      "Türkçedeki '-dır/-im' eklerinin karşılığıdır ama İngilizcede asla atlanmaz: 'Ben yorgunum' → 'I am tired.'",
    ],
    examples: [
      { en: "I am a software developer.", tr: "Ben bir yazılım geliştiricisiyim." },
      { en: "She is from Denizli.", tr: "O Denizlili." },
      { en: "They are at home now.", tr: "Onlar şimdi evde." },
      { en: "It isn't cold today.", tr: "Bugün hava soğuk değil." },
      { en: "Are you ready? — Yes, I am.", tr: "Hazır mısın? — Evet, hazırım." },
    ],
    exercises: [
      { q: "I ___ a teacher.", options: ["am", "is", "are"], answer: 0 },
      { q: "She ___ my sister.", options: ["am", "is", "are"], answer: 1 },
      { q: "They ___ in the garden.", options: ["am", "is", "are"], answer: 2 },
      { q: "___ you from Turkey?", options: ["Am", "Is", "Are"], answer: 2 },
      { q: "It ___ not expensive.", options: ["am", "is", "are"], answer: 1 },
      { q: "We ___ very happy today.", options: ["am", "is", "are"], answer: 2 },
    ],
  },
  {
    id: "pronouns",
    title: "Zamirler — I/you/he... ve my/your/his...",
    level: "A1",
    explanation: [
      "Özne zamirleri: I, you, he, she, it, we, they. Nesne zamirleri: me, you, him, her, it, us, them.",
      "İyelik sıfatları isimden önce gelir: my, your, his, her, its, our, their.",
      "Türkçeden farkı: he/she/it ayrımı vardır. Erkek → he, kadın → she, nesne/hayvan → it.",
    ],
    examples: [
      { en: "This is my brother. He is tall.", tr: "Bu benim kardeşim. O uzun." },
      { en: "I like her, and she likes me.", tr: "Ondan hoşlanıyorum, o da benden hoşlanıyor." },
      { en: "Our house is small but their house is big.", tr: "Bizim evimiz küçük ama onların evi büyük." },
      { en: "Give it to them, please.", tr: "Onu onlara ver lütfen." },
    ],
    exercises: [
      { q: "This is Ayşe. ___ is my friend.", options: ["He", "She", "It"], answer: 1 },
      { q: "I have a dog. ___ name is Max.", options: ["Its", "His", "Their"], answer: 0 },
      { q: "We love ___ parents.", options: ["us", "our", "we"], answer: 1 },
      { q: "Can you help ___? (ben)", options: ["I", "my", "me"], answer: 2 },
      { q: "John and Mary are here. I know ___.", options: ["they", "them", "their"], answer: 1 },
    ],
  },
  {
    id: "articles",
    title: "a / an / the — tanımlıklar",
    level: "A1",
    explanation: [
      "a/an = 'bir': sayılabilir tekil isimlerle. Sessiz harfle başlayan sese a (a car), sesli sese an (an apple, an hour).",
      "the = 'o/malum olan': hem konuşan hem dinleyen hangisinden bahsedildiğini biliyorsa kullanılır.",
      "Genel konuşurken çoğulda tanımlık yok: 'I like apples' (elmaları genel olarak severim).",
    ],
    examples: [
      { en: "I have a car and an old bike.", tr: "Bir arabam ve eski bir bisikletim var." },
      { en: "The car is in the garage.", tr: "Araba garajda. (hangi araba olduğu belli)" },
      { en: "She is an engineer.", tr: "O bir mühendis." },
      { en: "Dogs are friendly animals.", tr: "Köpekler dost canlısı hayvanlardır. (genel)" },
    ],
    exercises: [
      { q: "I eat ___ apple every day.", options: ["a", "an", "the"], answer: 1 },
      { q: "She has ___ new phone.", options: ["a", "an", "—"], answer: 0 },
      { q: "Close ___ door, please. (belli bir kapı)", options: ["a", "an", "the"], answer: 2 },
      { q: "He is ___ honest man. ('h' okunmuyor)", options: ["a", "an", "the"], answer: 1 },
      { q: "I like ___ music. (genel olarak)", options: ["a", "the", "—"], answer: 2 },
    ],
  },
  {
    id: "plurals",
    title: "Çoğul yapma — -s / -es / düzensizler",
    level: "A1",
    explanation: [
      "Genel kural -s: book → books. -s, -sh, -ch, -x, -o ile bitenlere -es: bus → buses, watch → watches.",
      "Sessiz harf + y → -ies: city → cities. Ama boy → boys (sesli + y).",
      "Düzensizler ezberlenir: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth.",
    ],
    examples: [
      { en: "Two coffees and three sandwiches, please.", tr: "İki kahve ve üç sandviç lütfen." },
      { en: "The children are playing outside.", tr: "Çocuklar dışarıda oynuyor." },
      { en: "Many people live in big cities.", tr: "Birçok insan büyük şehirlerde yaşar." },
    ],
    exercises: [
      { q: "one box → two ___", options: ["boxs", "boxes", "boxies"], answer: 1 },
      { q: "one city → three ___", options: ["citys", "cityes", "cities"], answer: 2 },
      { q: "one child → many ___", options: ["childs", "children", "childrens"], answer: 1 },
      { q: "one man → two ___", options: ["mans", "men", "mens"], answer: 1 },
      { q: "one key → five ___", options: ["keys", "keies", "keyes"], answer: 0 },
    ],
  },
  {
    id: "this-that",
    title: "this / that / these / those",
    level: "A1",
    explanation: [
      "Yakındaki tekil → this (bu), uzaktaki tekil → that (şu/o).",
      "Yakındaki çoğul → these (bunlar), uzaktaki çoğul → those (şunlar/onlar).",
    ],
    examples: [
      { en: "This is my desk, and that is your desk.", tr: "Bu benim masam, şu da senin masan." },
      { en: "These shoes are new.", tr: "Bu ayakkabılar yeni." },
      { en: "Those mountains are beautiful.", tr: "Şu dağlar çok güzel." },
    ],
    exercises: [
      { q: "___ book here is mine. (yakın, tekil)", options: ["This", "That", "These"], answer: 0 },
      { q: "___ birds over there are storks. (uzak, çoğul)", options: ["These", "Those", "That"], answer: 1 },
      { q: "___ is my father in this photo. (tekil)", options: ["These", "Those", "This"], answer: 2 },
      { q: "Are ___ your keys here?", options: ["this", "these", "that"], answer: 1 },
    ],
  },
  {
    id: "have-got",
    title: "have / has — sahiplik",
    level: "A1",
    explanation: [
      "Sahiplik için have kullanılır; he/she/it ile has olur: I have, she has.",
      "Olumsuz ve soru genelde do/does ile yapılır: I don't have..., Does she have...?",
      "İngiliz İngilizcesinde 'have got' da yaygındır: I've got a car. = I have a car.",
    ],
    examples: [
      { en: "I have two brothers.", tr: "İki erkek kardeşim var." },
      { en: "She has a good idea.", tr: "Onun iyi bir fikri var." },
      { en: "Do you have time tomorrow?", tr: "Yarın vaktin var mı?" },
      { en: "He doesn't have a car.", tr: "Onun arabası yok." },
    ],
    exercises: [
      { q: "I ___ a laptop.", options: ["have", "has", "am"], answer: 0 },
      { q: "My sister ___ long hair.", options: ["have", "has", "is"], answer: 1 },
      { q: "___ you have a pen?", options: ["Do", "Does", "Are"], answer: 0 },
      { q: "He ___ have any money.", options: ["don't", "doesn't", "isn't"], answer: 1 },
    ],
  },
  {
    id: "present-simple",
    title: "Present Simple — geniş zaman",
    level: "A1",
    explanation: [
      "Alışkanlıklar ve genel doğrular için: I work every day. Water boils at 100°C.",
      "He/she/it'te fiile -s eklenir: She works. He watches. (-ch/-sh/-o → -es; study → studies)",
      "Olumsuz: don't/doesn't + fiil yalın. Soru: Do/Does + özne + fiil yalın. Does'lu cümlede fiile -s GELMEZ: Does she work?",
    ],
    examples: [
      { en: "I drink coffee every morning.", tr: "Her sabah kahve içerim." },
      { en: "She works at a hospital.", tr: "O bir hastanede çalışır." },
      { en: "We don't watch TV much.", tr: "Pek televizyon izlemeyiz." },
      { en: "Does he play football? — No, he doesn't.", tr: "O futbol oynar mı? — Hayır, oynamaz." },
    ],
    exercises: [
      { q: "She ___ English at school.", options: ["teach", "teaches", "teachs"], answer: 1 },
      { q: "I ___ up at 7 o'clock.", options: ["get", "gets", "getting"], answer: 0 },
      { q: "___ he like pizza?", options: ["Do", "Does", "Is"], answer: 1 },
      { q: "They ___ live in İstanbul.", options: ["doesn't", "aren't", "don't"], answer: 2 },
      { q: "My father ___ to work by bus.", options: ["go", "gos", "goes"], answer: 2 },
      { q: "Does she ___ tea? (soruda fiil yalın)", options: ["drink", "drinks", "drinking"], answer: 0 },
    ],
  },
  {
    id: "frequency",
    title: "always / usually / sometimes — sıklık zarfları",
    level: "A1",
    explanation: [
      "Sıklık sırası: always (her zaman) → usually (genellikle) → often (sık sık) → sometimes (bazen) → rarely (nadiren) → never (asla).",
      "Normal fiilden ÖNCE, to be'den SONRA gelir: I usually walk. / I am usually tired.",
      "never zaten olumsuzdur, ayrıca not kullanılmaz: I never smoke.",
    ],
    examples: [
      { en: "I always brush my teeth before bed.", tr: "Yatmadan önce her zaman dişlerimi fırçalarım." },
      { en: "She is often late.", tr: "O sık sık geç kalır." },
      { en: "We sometimes eat out on Fridays.", tr: "Cuma günleri bazen dışarıda yeriz." },
      { en: "He never drinks coffee at night.", tr: "O gece asla kahve içmez." },
    ],
    exercises: [
      { q: "I ___ go to bed early. (her zaman)", options: ["always", "never", "rarely"], answer: 0 },
      { q: "Doğru sıra hangisi?", options: ["She late is often", "She is often late", "She often is late"], answer: 1 },
      { q: "Doğru sıra hangisi?", options: ["I drink usually tea", "Usually I drink am tea", "I usually drink tea"], answer: 2 },
      { q: "He ___ eats meat. He is vegetarian. (asla)", options: ["always", "never", "usually"], answer: 1 },
    ],
  },
  {
    id: "can",
    title: "can / can't — yapabilmek",
    level: "A1",
    explanation: [
      "Yetenek ve izin için: I can swim (yüzebilirim). Can I open the window? (açabilir miyim?)",
      "Her özneyle aynıdır, -s almaz: She can drive. Fiil hep yalın: can go, can speak.",
      "Olumsuz: can't (cannot). Soru: Can + özne + fiil: Can you help me?",
    ],
    examples: [
      { en: "I can speak a little English.", tr: "Biraz İngilizce konuşabilirim." },
      { en: "She can't come to the party.", tr: "Partiye gelemez." },
      { en: "Can you swim? — Yes, I can.", tr: "Yüzebilir misin? — Evet, yüzebilirim." },
      { en: "You can sit here.", tr: "Buraya oturabilirsin. (izin)" },
    ],
    exercises: [
      { q: "She ___ play the guitar very well.", options: ["can", "cans", "can to"], answer: 0 },
      { q: "I ___ swim. I'm afraid of water.", options: ["can", "can't", "don't can"], answer: 1 },
      { q: "___ you help me, please?", options: ["Do can", "Can", "Are"], answer: 1 },
      { q: "He can ___ three languages.", options: ["speaks", "speaking", "speak"], answer: 2 },
    ],
  },
  {
    id: "there-is",
    title: "there is / there are — var",
    level: "A1",
    explanation: [
      "Bir yerde bir şeyin varlığını söyler: There is (tekil), There are (çoğul).",
      "Olumsuz: There isn't / There aren't. Soru: Is there...? / Are there...?",
      "Türkçedeki 'var/yok' yapısının tam karşılığıdır.",
    ],
    examples: [
      { en: "There is a park near my house.", tr: "Evimin yakınında bir park var." },
      { en: "There are two cafes on this street.", tr: "Bu caddede iki kafe var." },
      { en: "There isn't any milk in the fridge.", tr: "Buzdolabında hiç süt yok." },
      { en: "Are there any questions?", tr: "Soru var mı?" },
    ],
    exercises: [
      { q: "___ a big tree in the garden.", options: ["There is", "There are", "It is"], answer: 0 },
      { q: "___ many books on the shelf.", options: ["There is", "There are", "They are"], answer: 1 },
      { q: "___ there a bank near here?", options: ["Is", "Are", "Do"], answer: 0 },
      { q: "There ___ any people in the room.", options: ["isn't", "aren't", "not"], answer: 1 },
    ],
  },
  {
    id: "prepositions-place",
    title: "in / on / under / next to — yer edatları",
    level: "A1",
    explanation: [
      "in = içinde (in the box), on = üstünde (on the table), under = altında (under the bed).",
      "next to = yanında, between = arasında, behind = arkasında, in front of = önünde, near = yakınında.",
      "Şehir/ülke → in (in Denizli), cadde → on (on Main Street), adres noktası → at (at home, at work).",
    ],
    examples: [
      { en: "The keys are on the table.", tr: "Anahtarlar masanın üstünde." },
      { en: "The cat is under the chair.", tr: "Kedi sandalyenin altında." },
      { en: "The bank is next to the pharmacy.", tr: "Banka eczanenin yanında." },
      { en: "I live in Denizli. I'm at home now.", tr: "Denizli'de yaşıyorum. Şimdi evdeyim." },
    ],
    exercises: [
      { q: "The book is ___ the bag. (içinde)", options: ["on", "in", "under"], answer: 1 },
      { q: "The picture is ___ the wall. (üstünde/yüzeyde)", options: ["on", "in", "at"], answer: 0 },
      { q: "The dog sleeps ___ the table. (altında)", options: ["next to", "on", "under"], answer: 2 },
      { q: "She is ___ work now.", options: ["at", "on", "in"], answer: 0 },
      { q: "The market is ___ the school and the park. (arasında)", options: ["behind", "between", "under"], answer: 1 },
    ],
  },
  {
    id: "question-words",
    title: "What / Where / When / Who / Why / How",
    level: "A1",
    explanation: [
      "What = ne, Where = nerede, When = ne zaman, Who = kim, Why = neden, How = nasıl.",
      "How many (kaç tane - sayılabilir), How much (ne kadar - sayılamaz/fiyat), How old (kaç yaşında).",
      "Soru sırası: Soru kelimesi + yardımcı fiil + özne + fiil: Where do you live?",
    ],
    examples: [
      { en: "What is your name?", tr: "Adın ne?" },
      { en: "Where do you work?", tr: "Nerede çalışıyorsun?" },
      { en: "Why are you late?", tr: "Neden geç kaldın?" },
      { en: "How many languages do you speak?", tr: "Kaç dil konuşuyorsun?" },
      { en: "How much is this jacket?", tr: "Bu ceket ne kadar?" },
    ],
    exercises: [
      { q: "___ is your birthday? — In May.", options: ["What", "When", "Who"], answer: 1 },
      { q: "___ do you live? — In Denizli.", options: ["Where", "When", "What"], answer: 0 },
      { q: "___ is that man? — He's my uncle.", options: ["What", "Why", "Who"], answer: 2 },
      { q: "___ money do you have? (sayılamaz)", options: ["How many", "How much", "How old"], answer: 1 },
      { q: "___ are you sad? — Because I lost my keys.", options: ["Why", "Where", "Who"], answer: 0 },
    ],
  },
  {
    id: "imperatives",
    title: "Emir cümleleri — Open the door!",
    level: "A1",
    explanation: [
      "Emir/rica için fiil yalın halde başa gelir, özne yoktur: Sit down. Open your book.",
      "Olumsuz emir: Don't + fiil: Don't worry. Don't be late.",
      "please ekleyerek kibarlaştırılır: Please close the window. / Close the window, please.",
    ],
    examples: [
      { en: "Listen carefully, please.", tr: "Lütfen dikkatlice dinle." },
      { en: "Don't touch that!", tr: "Ona dokunma!" },
      { en: "Turn left at the bank.", tr: "Bankadan sola dön." },
    ],
    exercises: [
      { q: "___ quiet, please. (ol)", options: ["Are", "Be", "Being"], answer: 1 },
      { q: "___ forget your keys! (olumsuz)", options: ["Don't", "Not", "No"], answer: 0 },
      { q: "___ me the salt, please.", options: ["Passing", "Passes", "Pass"], answer: 2 },
    ],
  },
  // ================= A2 =================
  {
    id: "present-continuous",
    title: "Present Continuous — şimdiki zaman",
    level: "A2",
    explanation: [
      "Şu anda olan işler için: am/is/are + fiil-ing: I am working now.",
      "Yazım: make → making (e düşer), run → running (ünsüz ikizlenir), study → studying.",
      "Yakın gelecek planları için de kullanılır: I'm meeting Ali tomorrow. (yarın buluşuyorum)",
    ],
    examples: [
      { en: "I am learning English with podcasts.", tr: "Podcast'lerle İngilizce öğreniyorum." },
      { en: "She is cooking dinner right now.", tr: "O şu anda akşam yemeği pişiriyor." },
      { en: "They aren't sleeping; they're watching TV.", tr: "Uyumuyorlar; televizyon izliyorlar." },
      { en: "What are you doing? — I'm reading.", tr: "Ne yapıyorsun? — Kitap okuyorum." },
    ],
    exercises: [
      { q: "Look! It ___ raining.", options: ["is", "are", "am"], answer: 0 },
      { q: "I ___ working now, call me later.", options: ["is", "am", "are"], answer: 1 },
      { q: "run fiilinin -ing hali:", options: ["runing", "running", "runnig"], answer: 1 },
      { q: "They ___ football at the moment.", options: ["play", "plays", "are playing"], answer: 2 },
      { q: "___ she studying for the exam?", options: ["Is", "Does", "Are"], answer: 0 },
    ],
  },
  {
    id: "simple-vs-continuous",
    title: "Present Simple mi, Continuous mu?",
    level: "A2",
    explanation: [
      "Alışkanlık/genel → Simple: I drink coffee every day. Şu an → Continuous: I am drinking coffee now.",
      "İpucu kelimeler — Simple: every day, usually, always, on Mondays. Continuous: now, right now, at the moment, Look!, Listen!",
      "Bazı fiiller genelde -ing almaz (durum fiilleri): like, love, want, know, need, understand: I want water (I am wanting ✗).",
    ],
    examples: [
      { en: "I usually walk to work, but today I am taking the bus.", tr: "Genelde işe yürürüm ama bugün otobüse biniyorum." },
      { en: "She speaks three languages.", tr: "O üç dil konuşur. (genel yetenek)" },
      { en: "Be quiet! The baby is sleeping.", tr: "Sessiz ol! Bebek uyuyor." },
      { en: "I know the answer.", tr: "Cevabı biliyorum. (knowing ✗)" },
    ],
    exercises: [
      { q: "Listen! Someone ___ the piano.", options: ["plays", "is playing", "play"], answer: 1 },
      { q: "Water ___ at 100 degrees. (genel doğru)", options: ["boils", "is boiling", "boil"], answer: 0 },
      { q: "I ___ this song. (durum fiili)", options: ["am loving", "love", "loves"], answer: 1 },
      { q: "She ___ TV every evening.", options: ["is watching", "watch", "watches"], answer: 2 },
      { q: "Right now, we ___ dinner.", options: ["have", "are having", "has"], answer: 1 },
    ],
  },
  {
    id: "countable",
    title: "some / any — sayılabilir ve sayılamaz",
    level: "A2",
    explanation: [
      "Sayılamayan isimler çoğul olmaz, a/an almaz: water, money, bread, rice, information, music.",
      "some = biraz/birkaç (olumlu cümle): I have some money. any = hiç (olumsuz ve soru): I don't have any money. Do you have any questions?",
      "Rica/teklif sorularında some kullanılır: Would you like some tea?",
    ],
    examples: [
      { en: "There is some milk in the fridge.", tr: "Buzdolabında biraz süt var." },
      { en: "We don't have any bread.", tr: "Hiç ekmeğimiz yok." },
      { en: "Are there any messages for me?", tr: "Bana mesaj var mı?" },
      { en: "Would you like some coffee?", tr: "Biraz kahve ister misin?" },
    ],
    exercises: [
      { q: "I need ___ information. (olumlu)", options: ["some", "any", "a"], answer: 0 },
      { q: "She doesn't have ___ friends here.", options: ["some", "any", "a"], answer: 1 },
      { q: "Do you have ___ questions?", options: ["some", "a", "any"], answer: 2 },
      { q: "Hangisi sayılamaz?", options: ["apple", "money", "book"], answer: 1 },
      { q: "Would you like ___ tea? (teklif)", options: ["any", "some", "an"], answer: 1 },
    ],
  },
  {
    id: "much-many",
    title: "much / many / a lot of",
    level: "A2",
    explanation: [
      "many + sayılabilir çoğul: many books. much + sayılamaz: much time.",
      "a lot of ikisiyle de olur ve olumlu cümlede en doğalıdır: a lot of books, a lot of time.",
      "much/many daha çok soru ve olumsuzda: How many people? I don't have much time.",
    ],
    examples: [
      { en: "How many hours do you work?", tr: "Kaç saat çalışıyorsun?" },
      { en: "I don't have much free time.", tr: "Çok boş vaktim yok." },
      { en: "There are a lot of tourists in summer.", tr: "Yazın çok turist olur." },
    ],
    exercises: [
      { q: "How ___ water do you drink?", options: ["many", "much", "a lot"], answer: 1 },
      { q: "How ___ brothers do you have?", options: ["much", "many", "some"], answer: 1 },
      { q: "She has ___ of friends. (olumlu)", options: ["much", "many", "a lot"], answer: 2 },
      { q: "We don't have ___ money.", options: ["much", "many", "a"], answer: 0 },
    ],
  },
  {
    id: "past-be",
    title: "was / were — geçmişte olmak",
    level: "A2",
    explanation: [
      "am/is'in geçmişi was; are'ın geçmişi were: I/he/she/it was, you/we/they were.",
      "Olumsuz: wasn't / weren't. Soru: Was she...? Were you...?",
    ],
    examples: [
      { en: "I was very tired yesterday.", tr: "Dün çok yorgundum." },
      { en: "They were at the cinema last night.", tr: "Dün gece sinemadaydılar." },
      { en: "The weather wasn't good.", tr: "Hava iyi değildi." },
      { en: "Were you at home? — Yes, I was.", tr: "Evde miydin? — Evet, evdeydim." },
    ],
    exercises: [
      { q: "I ___ at work yesterday.", options: ["was", "were", "am"], answer: 0 },
      { q: "They ___ happy with the result.", options: ["was", "were", "are"], answer: 1 },
      { q: "___ she at the meeting?", options: ["Was", "Were", "Did"], answer: 0 },
      { q: "We ___ not ready. (geçmiş)", options: ["was", "are", "were"], answer: 2 },
    ],
  },
  {
    id: "past-simple",
    title: "Past Simple — geçmiş zaman",
    level: "A2",
    explanation: [
      "Bitmiş geçmiş olaylar için. Düzenli fiillere -ed: work → worked, play → played, study → studied, stop → stopped.",
      "Düzensizler ezberlenir: go → went, have → had, make → made, see → saw, come → came, take → took, get → got, say → said.",
      "Olumsuz ve soruda did kullanılır, fiil YALIN olur: I didn't go. Did you see it? (Did you saw ✗)",
    ],
    examples: [
      { en: "I watched a movie last night.", tr: "Dün gece bir film izledim." },
      { en: "She went to İzmir last week.", tr: "Geçen hafta İzmir'e gitti." },
      { en: "We didn't finish the project.", tr: "Projeyi bitirmedik." },
      { en: "Did you sleep well? — Yes, I did.", tr: "İyi uyudun mu? — Evet." },
    ],
    exercises: [
      { q: "go fiilinin geçmişi:", options: ["goed", "went", "gone"], answer: 1 },
      { q: "I ___ TV yesterday evening.", options: ["watch", "watches", "watched"], answer: 2 },
      { q: "She ___ come to the party.", options: ["didn't", "doesn't", "wasn't"], answer: 0 },
      { q: "___ you call me last night?", options: ["Do", "Did", "Were"], answer: 1 },
      { q: "Did he ___ the email? (soruda yalın)", options: ["sent", "send", "sends"], answer: 1 },
      { q: "study fiilinin geçmişi:", options: ["studyed", "studied", "studdied"], answer: 1 },
    ],
  },
  {
    id: "comparatives",
    title: "Comparative — daha... (more / -er)",
    level: "A2",
    explanation: [
      "Kısa sıfatlara -er: old → older, big → bigger, easy → easier. Karşılaştırılan şeyden önce than gelir: older than me.",
      "Uzun sıfatlara (2+ hece) more: more expensive, more beautiful, more interesting.",
      "Düzensizler: good → better, bad → worse, far → further.",
    ],
    examples: [
      { en: "My new phone is faster than the old one.", tr: "Yeni telefonum eskisinden daha hızlı." },
      { en: "This book is more interesting than that one.", tr: "Bu kitap şundan daha ilginç." },
      { en: "Her English is better than mine.", tr: "Onun İngilizcesi benimkinden daha iyi." },
    ],
    exercises: [
      { q: "İstanbul is ___ than Denizli.", options: ["biger", "bigger", "more big"], answer: 1 },
      { q: "This exam is ___ than the last one.", options: ["difficulter", "more difficult", "difficultest"], answer: 1 },
      { q: "good sıfatının karşılaştırması:", options: ["gooder", "more good", "better"], answer: 2 },
      { q: "Today is ___ than yesterday.", options: ["hoter", "hotter", "more hot"], answer: 1 },
      { q: "She is taller ___ her brother.", options: ["that", "then", "than"], answer: 2 },
    ],
  },
  {
    id: "superlatives",
    title: "Superlative — en... (the most / -est)",
    level: "A2",
    explanation: [
      "Kısa sıfatlara the + -est: the oldest, the biggest, the easiest.",
      "Uzun sıfatlara the most: the most expensive, the most beautiful.",
      "Düzensizler: good → the best, bad → the worst. Başında the unutulmaz!",
    ],
    examples: [
      { en: "Everest is the highest mountain in the world.", tr: "Everest dünyanın en yüksek dağıdır." },
      { en: "This is the most beautiful city I know.", tr: "Bu bildiğim en güzel şehir." },
      { en: "Friday is the best day of the week.", tr: "Cuma haftanın en iyi günüdür." },
    ],
    exercises: [
      { q: "This is ___ restaurant in town. (iyi)", options: ["the goodest", "the best", "the better"], answer: 1 },
      { q: "She is ___ student in the class. (çalışkan-uzun sıfat)", options: ["the most hardworking", "the hardworkingest", "more hardworking"], answer: 0 },
      { q: "Winter is ___ season here. (soğuk)", options: ["the coldest", "the most cold", "colder"], answer: 0 },
      { q: "That was ___ day of my life. (kötü)", options: ["the baddest", "the worst", "the most bad"], answer: 1 },
    ],
  },
  {
    id: "going-to",
    title: "be going to — gelecek planları",
    level: "A2",
    explanation: [
      "Önceden kararlaştırılmış planlar için: am/is/are + going to + fiil: I am going to visit my family.",
      "Belirtilere dayalı tahmin için de: Look at the clouds! It's going to rain.",
    ],
    examples: [
      { en: "I am going to start a new project next month.", tr: "Gelecek ay yeni bir projeye başlayacağım." },
      { en: "She is going to study abroad.", tr: "Yurt dışında okuyacak." },
      { en: "They aren't going to sell the house.", tr: "Evi satmayacaklar." },
      { en: "What are you going to do this weekend?", tr: "Bu hafta sonu ne yapacaksın?" },
    ],
    exercises: [
      { q: "I ___ going to learn English this year.", options: ["am", "is", "are"], answer: 0 },
      { q: "He is going ___ buy a car.", options: ["for", "to", "at"], answer: 1 },
      { q: "We ___ going to travel in July.", options: ["am", "is", "are"], answer: 2 },
      { q: "Look at those clouds! It ___ rain.", options: ["goes to", "is going to", "going to"], answer: 1 },
    ],
  },
  {
    id: "will",
    title: "will — anlık karar ve tahmin",
    level: "A2",
    explanation: [
      "Konuşma anında verilen kararlar: The phone is ringing — I'll answer it.",
      "Tahmin ve söz verme: I think it will be sunny. I will help you.",
      "Her özneyle aynı: will + yalın fiil. Olumsuz: won't (will not).",
    ],
    examples: [
      { en: "I'm tired. I think I'll go to bed.", tr: "Yorgunum. Sanırım yatacağım." },
      { en: "Don't worry, I will help you.", tr: "Merak etme, sana yardım edeceğim." },
      { en: "It won't be easy, but we can do it.", tr: "Kolay olmayacak ama yapabiliriz." },
    ],
    exercises: [
      { q: "I'm thirsty. I ___ get some water. (anlık karar)", options: ["will", "going to", "am"], answer: 0 },
      { q: "She ___ be here tomorrow, I promise.", options: ["will", "wills", "is will"], answer: 0 },
      { q: "It ___ rain tomorrow, the sky is clear. (olumsuz)", options: ["will", "won't", "doesn't"], answer: 1 },
      { q: "will'den sonra fiil nasıl gelir?", options: ["-ing ile", "-s ile", "yalın"], answer: 2 },
    ],
  },
  {
    id: "must-have-to",
    title: "must / have to / should — zorunluluk ve tavsiye",
    level: "A2",
    explanation: [
      "must / have to = -meli, zorunda: I must go. She has to work tomorrow.",
      "mustn't = yasak (yapmamalısın): You mustn't smoke here. don't have to = gerek yok: You don't have to come.",
      "should = tavsiye (-se iyi olur): You should sleep more. shouldn't = yapmasan iyi olur.",
    ],
    examples: [
      { en: "I have to finish this report today.", tr: "Bu raporu bugün bitirmek zorundayım." },
      { en: "You mustn't use your phone here.", tr: "Burada telefon kullanmak yasak." },
      { en: "You don't have to pay; it's free.", tr: "Ödemene gerek yok; ücretsiz." },
      { en: "You should listen to English every day.", tr: "Her gün İngilizce dinlemelisin." },
    ],
    exercises: [
      { q: "You look tired. You ___ rest. (tavsiye)", options: ["should", "mustn't", "don't have to"], answer: 0 },
      { q: "It's free. You ___ pay. (gerek yok)", options: ["mustn't", "don't have to", "shouldn't"], answer: 1 },
      { q: "You ___ drive fast here. It's a school zone. (yasak)", options: ["mustn't", "don't have to", "should"], answer: 0 },
      { q: "She ___ to wake up early for work.", options: ["must", "has", "should"], answer: 1 },
    ],
  },
  {
    id: "like-ing",
    title: "like / love / hate + -ing",
    level: "A2",
    explanation: [
      "Sevme/sevmeme fiillerinden sonra gelen fiil -ing alır: I like swimming. She loves reading.",
      "Türkçesi '-meyi severim' kalıbıdır: I hate waiting = Beklemeyi hiç sevmem.",
      "would like to ise farklıdır → 'istemek': I would like to order (sipariş vermek istiyorum).",
    ],
    examples: [
      { en: "I love learning new things.", tr: "Yeni şeyler öğrenmeyi çok severim." },
      { en: "He hates driving in traffic.", tr: "Trafikte araba kullanmaktan nefret eder." },
      { en: "Do you like cooking?", tr: "Yemek yapmayı sever misin?" },
      { en: "I would like to have a coffee.", tr: "Bir kahve almak istiyorum." },
    ],
    exercises: [
      { q: "I enjoy ___ podcasts.", options: ["listen", "listening", "to listening"], answer: 1 },
      { q: "She loves ___ in the sea.", options: ["swim", "swims", "swimming"], answer: 2 },
      { q: "I'd like ___ a table for two. (istemek)", options: ["booking", "to book", "book"], answer: 1 },
      { q: "They hate ___ up early.", options: ["getting", "get", "to getting"], answer: 0 },
    ],
  },
  {
    id: "present-perfect",
    title: "Present Perfect — have/has + V3 (giriş)",
    level: "A2",
    explanation: [
      "Geçmişte olmuş ama etkisi/bağı şimdiye uzanan olaylar: I have finished my work (işim şu an bitmiş durumda).",
      "have/has + fiilin 3. hali: work → worked, go → gone, see → seen, do → done, be → been.",
      "ever (hiç) ve never (asla) ile deneyim sorulur: Have you ever been to London? — I have never tried sushi.",
    ],
    examples: [
      { en: "I have finished the report.", tr: "Raporu bitirdim (şu an bitmiş durumda)." },
      { en: "She has lived here for five years.", tr: "Beş yıldır burada yaşıyor." },
      { en: "Have you ever been to İstanbul?", tr: "Hiç İstanbul'a gittin mi?" },
      { en: "I have never eaten sushi.", tr: "Hiç suşi yemedim." },
    ],
    exercises: [
      { q: "I ___ finished my homework.", options: ["have", "has", "am"], answer: 0 },
      { q: "She ___ never seen snow.", options: ["have", "has", "is"], answer: 1 },
      { q: "go fiilinin 3. hali:", options: ["went", "gone", "goed"], answer: 1 },
      { q: "___ you ever tried Turkish coffee?", options: ["Did", "Do", "Have"], answer: 2 },
    ],
  },
];

export const GRAMMAR_PASS_PERCENT = 80;
