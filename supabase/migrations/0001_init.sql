-- learn-english: ilk şema
-- Tek kullanıcılı kurulum; RLS yine çok-kullanıcı-doğru yazıldı (user_id = auth.uid()).

-- ---------- profiles ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  start_date date not null default current_date,
  timezone text not null default 'Europe/Istanbul',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "own profile" on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

-- auth.users'a kayıt gelince profil satırını otomatik aç
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- günlük rutin ----------
create table public.daily_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  date date not null,
  item_key text not null check (item_key in ('listening','shadowing','srs','reading','speaking','goldlist')),
  minutes_done int not null default 0,
  checked boolean not null default false,
  unique (user_id, date, item_key)
);

alter table public.daily_checks enable row level security;
create policy "own rows" on public.daily_checks
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index daily_checks_user_date on public.daily_checks (user_id, date desc);

-- ---------- i+1 içerik ----------
create table public.contents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  level text check (level in ('A1','A2','B1','B2','C1','C2')),
  kind text not null default 'transcript',
  source_url text,
  created_at timestamptz not null default now()
);

alter table public.contents enable row level security;
create policy "own rows" on public.contents
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- SRS ----------
create table public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  word text not null,
  sentence text not null,
  translation text,
  notes text,
  source_content_id uuid references public.contents (id) on delete set null,
  status text not null default 'new' check (status in ('new','learning','review','suspended')),
  ease_factor real not null default 2.5,
  interval_days int not null default 0,
  repetitions int not null default 0,
  lapses int not null default 0,
  due_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.cards enable row level security;
create policy "own rows" on public.cards
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index cards_user_due on public.cards (user_id, due_date) where status <> 'suspended';

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  card_id uuid not null references public.cards (id) on delete cascade,
  rating smallint not null check (rating in (0, 3, 4, 5)),
  interval_before int,
  interval_after int,
  ease_after real,
  reviewed_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
create policy "own rows" on public.reviews
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index reviews_user_time on public.reviews (user_id, reviewed_at desc);

-- Kart durumunu güncelle + review satırını tek işlemde yaz
create function public.review_card(
  p_card_id uuid,
  p_rating smallint,
  p_ease real,
  p_interval int,
  p_reps int,
  p_lapses int,
  p_due date,
  p_status text
) returns void
language plpgsql
security invoker
as $$
declare
  v_before int;
begin
  select interval_days into v_before from public.cards where id = p_card_id;

  update public.cards
     set ease_factor = p_ease,
         interval_days = p_interval,
         repetitions = p_reps,
         lapses = p_lapses,
         due_date = p_due,
         status = p_status
   where id = p_card_id;

  insert into public.reviews (user_id, card_id, rating, interval_before, interval_after, ease_after)
  values (auth.uid(), p_card_id, p_rating, v_before, p_interval, p_ease);
end;
$$;

-- ---------- podcast / dinleme ----------
create table public.podcasts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('audio','youtube','rss')),
  url text not null,
  last_position_sec int not null default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.podcasts enable row level security;
create policy "own rows" on public.podcasts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- ses kayıtları (dosyalar Storage 'recordings' bucket'ında) ----------
create table public.recordings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('shadowing','journal')),
  storage_path text not null,
  duration_sec int,
  recorded_on date not null default current_date,
  transcript text,
  feedback jsonb,
  created_at timestamptz not null default now()
);

alter table public.recordings enable row level security;
create policy "own rows" on public.recordings
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index recordings_user_date on public.recordings (user_id, recorded_on desc);

-- ---------- goldlist ----------
create table public.goldlist_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  list_no int not null,
  parent_list_id uuid references public.goldlist_lists (id) on delete set null,
  created_on date not null default current_date,
  unlocks_on date generated always as (created_on + 14) stored
);

alter table public.goldlist_lists enable row level security;
create policy "own rows" on public.goldlist_lists
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.goldlist_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.goldlist_lists (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  text_en text not null,
  text_tr text not null,
  distilled boolean not null default false
);

alter table public.goldlist_items enable row level security;
create policy "own rows" on public.goldlist_items
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- Storage: recordings bucket ----------
insert into storage.buckets (id, name, public)
values ('recordings', 'recordings', false)
on conflict (id) do nothing;

create policy "own recordings select" on storage.objects
  for select using (
    bucket_id = 'recordings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own recordings insert" on storage.objects
  for insert with check (
    bucket_id = 'recordings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own recordings delete" on storage.objects
  for delete using (
    bucket_id = 'recordings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
