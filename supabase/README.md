# Supabase kurulumu (learn-english)

## 1. Proje oluştur
1. [supabase.com](https://supabase.com) → New project (ücretsiz plan yeterli). Region: eu-central (Frankfurt) önerilir.
2. Project Settings → API'den şu iki değeri al:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Şemayı uygula
En kolayı: Supabase Dashboard → SQL Editor → `migrations/0001_init.sql` içeriğini yapıştır ve çalıştır.

CLI ile (opsiyonel): `npx supabase login` → `npx supabase link --project-ref <ref>` → `npx supabase db push`

## 3. Kendi hesabını aç, kayıtları kapat
1. Authentication → Users → "Add user" → e-posta + şifre (kendi hesabın). "Auto Confirm User" işaretle.
2. Authentication → Sign In / Up → **Allow new users to sign up: OFF** (tek kullanıcı kilidi).

## 4. Env değerleri
- Lokal: repo kökünde `.env.local` (git'e girmez):
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
  ```
- Deploy: GitHub repo → Settings → Secrets and variables → Actions → **Variables** sekmesi →
  `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` ekle.
  (Bu değerler build sırasında bundle'a gömülür; anon key public olacak şekilde tasarlanmıştır — güvenlik sınırı RLS + kapalı kayıt.)

## Notlar
- Anon key değiştirirsen site yeniden build/deploy edilmeli (değer bundle'a gömülü).
- Ücretsiz plan ~1 hafta inaktivitede projeyi duraklatır; `.github/workflows/keepalive.yml` haftalık ping atarak bunu önler (repo variable'ları tanımlı olmalı).
- Ses kayıtları `recordings` bucket'ında (`<user_id>/<kind>/<tarih>-<id>.<uzantı>`), private; erişim signed URL ile.
