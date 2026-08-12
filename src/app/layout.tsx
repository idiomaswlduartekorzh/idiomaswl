import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const GTM_ID = 'GTM-57NXLPZV';

/**
 * GTM no se carga en las vistas previa.
 *
 * Iba sin ninguna condición, así que cada despliegue de Vercel —uno por cada push, y hay
 * decenas— cargaba el contenedor de producción y mandaba datos a GA4 y al píxel de Meta. La
 * diagnóstica de GTM lo destapó: la lista de «dominios detectados» son todos
 * `idiomaswl-<hash>-…vercel.app`. Eso ensucia las conversiones con tráfico de pruebas, el mío
 * incluido.
 *
 * La condición está escrita al revés a propósito: **se carga salvo que sepamos que es una
 * preview**. Si mañana esto se despliega en otro sitio y `VERCEL_ENV` no existe, el tag sigue
 * funcionando. Quedarse sin analítica en producción por una variable de entorno ausente sería
 * mucho peor que un poco de ruido de preview.
 */
const ENTORNO = process.env.VERCEL_ENV;
// The canonical deployment is Vercel production. Local `next start`, previews
// and other hosts must not pollute analytics or execute remote GTM tags.
const CARGAR_GTM = process.env.NODE_ENV === 'production' && ENTORNO === 'production';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const BASE_URL = 'https://www.idiomaswl.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Idiomas WeLearn — Aprende un idioma, en serio',
    template: '%s · Idiomas WeLearn',
  },
  description:
    'Aprende coreano, inglés, francés, alemán, italiano y más con el método WeLearn: once pasos diarios que imitan cómo el cerebro interioriza un idioma. Simulacros completos de TOEFL, IELTS e ICFES.',
  keywords: [
    'aprender idiomas', 'coreano online', 'aprender inglés', 'TOEFL simulacro',
    'IELTS práctica', 'ICFES inglés', 'Saber 11 inglés', 'método WeLearn',
    'curso de coreano', 'certificación idiomas', 'aprender francés',
  ],
  authors: [{ name: 'Idiomas WeLearn', url: BASE_URL }],
  creator: 'Idiomas WeLearn',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: BASE_URL,
    siteName: 'Idiomas WeLearn',
    title: 'Idiomas WeLearn — Aprende un idioma, en serio',
    description:
      'Aprende coreano, inglés, francés y más con once pasos diarios. Simulacros de TOEFL, IELTS e ICFES.',
    // opengraph-image.tsx in this directory auto-generates the OG image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idiomas WeLearn — Aprende un idioma, en serio',
    description:
      'Aprende coreano, inglés, francés y más con once pasos diarios. Simulacros de TOEFL, IELTS e ICFES.',
    // OG image auto-generated from opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0d0d14' },
  ],
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        {/* Theme: must run synchronously before paint — keep as inline script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Preconnect to external domains to reduce latency */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) — immediately after <body> open */}
        {CARGAR_GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider>{children}</ThemeProvider>

        {/* Google Tag Manager — afterInteractive: loads once the page is interactive */}
        {CARGAR_GTM && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </body>
    </html>
  );
}
