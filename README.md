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

## Otomatik yayın (CI/CD)

`.github/workflows/deploy.yml` her `main` push'ta:

1. Projeyi build eder (`npm run build` → `out/`)
2. `out/` içeriğini FTP ile Hostinger'a yükler

### Gerekli GitHub Secrets

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret         | Açıklama                                               |
| -------------- | ------------------------------------------------------ |
| `FTP_SERVER`   | Hostinger FTP host (hPanel → Dosyalar → FTP Hesapları) |
| `FTP_USERNAME` | FTP kullanıcı adı                                      |
| `FTP_PASSWORD` | FTP şifresi                                            |

> `server-dir` ana domain için `./public_html/`. Ek (addon) domain ise
> `deploy.yml` içindeki `server-dir` değerini güncelle.
