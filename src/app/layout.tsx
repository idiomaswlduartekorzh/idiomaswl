import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idiomas WeLearn — aprender idiomas, en serio",
  description: "Once pasos diarios diseñados para que cada concepto se interiorice. Vocabulario, gramática, escucha, patrón y examen acumulativo.",
};

// Blocking script — runs before paint to avoid flash of wrong theme
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('wl-theme');
    var resolved = stored === 'dark' ? 'dark'
      : stored === 'light' ? 'light'
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolved);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
