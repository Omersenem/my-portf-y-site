import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger statik hosting için: `next build` çıktısını `out/` klasörüne
  // saf HTML/CSS/JS olarak üretir.
  output: "export",

  // Her route'u kendi klasöründe index.html olarak üretir (/iletisim/index.html).
  // Statik sunucularda temiz URL'ler için en sorunsuz seçenek.
  trailingSlash: true,

  // next/image optimizasyonu sunucu gerektirir; statik export'ta kapatılır.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
