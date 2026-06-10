# omersenem.com

Kişisel yazılımcı tanıtım sitesi. **Next.js 16 + Tailwind CSS** ile geliştirildi, **statik export** olarak build edilir ve **GitHub Actions** ile her push'ta otomatik olarak **Hostinger**'a yüklenir.

## Geliştirme

```bash
npm install      # bağımlılıkları kur (ilk sefer)
npm run dev      # http://localhost:3000 üzerinde canlı önizleme
npm run build    # statik çıktıyı out/ klasörüne üretir
```

## İçeriği düzenleme

- **Metinler (TR/EN):** `src/lib/translations.ts`
- **Kişisel bilgiler / linkler / yetenekler:** `src/lib/site.ts`
- **Renkler / tema:** `src/app/globals.css` (`@theme` bloğu)

## Otomatik yayın (CI/CD) — GitHub Pages

`.github/workflows/deploy.yml` her `main` push'ta:

1. Projeyi build eder (`npm run build` → `out/`)
2. Çıktıyı **GitHub Pages**'e (ücretsiz) yayınlar

Özel domain (`omersenem.com`) `public/CNAME` dosyası ile tanımlıdır.

### Tek seferlik kurulum

1. Repo **Public** olmalı (özel repolarda Pages ücretsiz değil).
2. GitHub repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Settings → Pages → Custom domain** → `omersenem.com` yaz, kaydet, "Enforce HTTPS" işaretle.
4. Domain DNS'i (Hostinger) GitHub Pages'e yönlendirilir:
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `omersenem.github.io`
