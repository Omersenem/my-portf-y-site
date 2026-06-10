import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Yazılım Geliştirici`,
  description:
    "Ömer Senem — React, Next.js, Vue ve React Native ile web ve mobil uygulamalar geliştiren yazılım geliştirici. Veriforce'ta Software Developer.",
  keywords: [
    "Ömer Senem",
    "yazılım geliştirici",
    "software developer",
    "frontend developer",
    "React",
    "Next.js",
    "Vue.js",
    "React Native",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — Yazılım Geliştirici`,
    description:
      "React Native, Next.js ve Go ile mobil ve web uygulamaları geliştiren yazılımcı.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
