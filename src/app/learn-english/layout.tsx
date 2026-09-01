import type { Metadata } from "next";
import "./learn.css";
import { LearnProviders } from "./_components/Providers";
import { LearnNav } from "./_components/LearnNav";

export const metadata: Metadata = {
  title: "Learn English — Ömer Senem",
  description: "Mezzofanti Metodu ile kişisel İngilizce öğrenme takibi",
  robots: { index: false },
};

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="learn">
      <LearnProviders>
        <LearnNav />
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </LearnProviders>
    </div>
  );
}
