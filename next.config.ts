import type { NextConfig } from "next";

// ── Security headers applied to every response ────────────────────────────
// See: https://owasp.org/www-project-secure-headers/
const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from its declared content-type
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Prevent third-party framing while allowing same-origin teaching previews
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

  // Stop legacy IE from rendering the page in Compatibility View
  { key: 'X-UA-Compatible', value: 'IE=edge' },

  // Restrict how much referrer info is sent to third parties
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Limit which browser features this page can use
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',       // no camera access
      'microphone=(self)', // microphone only for own origin (audio recording feature)
      'geolocation=()',  // no geolocation
      'interest-cohort=()', // opt out of FLoC/Topics
      'payment=()',
    ].join(', '),
  },

  // Force HTTPS for 2 years once first visited (only meaningful on HTTPS deployments)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Content-Security-Policy
  // Notes:
  //   • 'unsafe-inline' on script-src is required by Next.js (inline hydration scripts)
  //     and the theme-flash prevention script in layout.tsx.
  //   • 'unsafe-eval' is required by Next.js dev mode only; prod builds don't need it
  //     but keeping it here avoids a broken dev experience.
  //   • frame-ancestors 'none' duplicates X-Frame-Options for modern browsers.
  //   • connect-src includes Supabase domains for auth + storage + DB.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // GTM + GA4 + Meta Pixel + Cloudflare Web Analytics script sources
      //
      // La última entrada lleva RUTA COMPLETA a propósito. Un tag de Meta publicado en el
      // contenedor de GTM carga su «CAPI param builder» desde unpkg.com, que es el CDN
      // público de npm: autorizar el host entero permitiría a cualquier paquete que exista o
      // llegue a existir en npm ejecutar código en todas las páginas del sitio. Con la ruta,
      // el navegador solo deja pasar ese fichero.
      //
      // Lo correcto de verdad sigue siendo pausar ese tag en GTM —el script solo enriquece
      // la cookie `_fbc` y no hace nada sin CAPI del lado servidor—, pero el contenedor vive
      // fuera del repositorio. Si algún día se pausa, esta línea sobra y se borra.
      //
      // Nota honesta sobre lo que esto protege: si unpkg responde con una redirección, el
      // navegador deja de comparar la ruta y solo mira el host. Así que esto no es una
      // garantía, es reducir mucho la superficie frente a poner `https://unpkg.com` a secas.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.wompi.co https://www.googletagmanager.com https://ssl.google-analytics.com https://connect.facebook.net https://static.cloudflareinsights.com https://unpkg.com/meta-capi-param-builder-clientjs/dist/clientParamBuilder.bundle.js",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // Supabase project URL for storage, auth and realtime + GA4 + Meta Pixel + Cloudflare Web Analytics
      "connect-src 'self' https://api.wompi.co https://api-sandbox.wompi.co https://sandbox.wompi.co https://production.wompi.co https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net https://cloudflareinsights.com",
      // Images: own domain + Supabase storage + data URIs + blob (canvas) + GA4 + Meta Pixel
      "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
      // GTM noscript iframe
      "frame-src 'self' https://checkout.wompi.co https://www.googletagmanager.com https://www.youtube.com",
      // Audio/video from own server + Supabase storage + blob (MediaRecorder)
      "media-src 'self' blob: https://*.supabase.co",
      // Worker scripts (Next.js service worker / audio worklets)
      "worker-src 'self' blob:",
      // No <object> or <embed>
      "object-src 'none'",
      // Forms only submit to own origin
      "form-action 'self'",
      // Prevent third-party framing while allowing same-origin teaching previews
      "frame-ancestors 'self'",
      // Upgrade any accidental http:// requests to https://
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  // Tree-shaking de barrels: importa solo lo usado de estas librerías pesadas
  // en lugar del paquete completo. Reduce el JS sin usar en el bundle inicial.
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'recharts',
      '@wavesurfer/react',
    ],
  },

  // Remove the X-Powered-By: Next.js response header (minor security improvement)
  poweredByHeader: false,

  // Image optimization — serve modern formats (WebP/AVIF) automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
    // Remote images from Supabase storage
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // Compress responses
  compress: true,

  // Route handlers read these standalone class assets at runtime on Vercel.
  outputFileTracingIncludes: {
    // El diccionario de pronunciación inglesa (3,45 MB) lo lee la ruta con `fs`, así que
    // tiene que viajar dentro de la función. Sin esta línea funciona en local —donde el
    // repositorio entero está en disco— y devuelve 500 en producción.
    '/api/fonetica': ['src/data/fonetica/en-cmudict.txt'],
    '/clase-claude': ['src/content/clase-claude/publico.html'],
    '/dashboard/admin/clase-claude': [
      'src/content/clase-claude/instructor.html',
    ],
    '/dashboard/admin/clase-claude/material-instructor': [
      'src/content/clase-claude/Paquete_Completo_Instructor_Casos_Claude.zip',
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Delegated IELTS links are short-lived bearer capabilities. Never
        // cache, index or forward their token in a Referer header.
        source: '/evaluacion-ielts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/practica/ielts/reading/tipos-de-preguntas/:slug',
          destination: '/practica/ielts/reading/international-question-type/:slug',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async redirects() {
    // ── Migración de slugs de gramática ─────────────────────────────────────
    // Las lecciones se renombraron del español al idioma que se enseña
    // (`verbo-to-be` -> `verb-to-be`, `la-negacion` -> `negazione`, ...) sin dejar
    // redirecciones. Google seguía indexando las URLs viejas, así que 75 páginas
    // que ya tenían posición devolvían 404.
    //
    // El caso más caro: `verbo-to-be` recibía 125 impresiones en posición 9,03 con
    // CERO clics — quien entraba se estrellaba contra un 404. Su reemplazo,
    // `verb-to-be`, con el mismo contenido, apenas tenía 13 impresiones.
    //
    // Medido en Search Console del 18 al 29 de julio de 2026. Los 69 destinos se
    // comprobaron devolviendo 200 el 2026-08-01.
    //
    // AL RENOMBRAR EL SLUG DE UNA LECCIÓN, AÑADIR AQUÍ SU REDIRECCIÓN.
    const g = (lang: string, lvl: string, from: string, to: string) => ({
      source: `/practica/${lang}/${lvl}/gramatica/${from}`,
      destination: `/practica/${lang}/${lvl}/gramatica/${to}`,
      permanent: true,
    });
    const idx = (lang: string, lvl: string, from: string) => ({
      source: `/practica/${lang}/${lvl}/gramatica/${from}`,
      destination: `/practica/${lang}/${lvl}/gramatica`,
      permanent: true,
    });
    /** Artículo del blog cuyo slug cambió. El destino se escribe completo
     *  porque a veces no es otro artículo, sino una página del sitio. */
    const b = (from: string, destination: string) => ({
      source: `/blog/${from}`,
      destination,
      permanent: true,
    });

    return [
      // ── Historias ────────────────────────────────────────────────────────
      // Las dos historias de inglés vivían sueltas en /practica/<slug>. Al
      // agruparlas en la sección Historias pasaron a /practica/ingles/historias/…
      // Estaban en el sitemap desde junio de 2026, así que van con 301.
      //
      // `the-grandmothers-ledger` además cambia de nombre: quien reclama los
      // regalos es el abuelo, no la abuela.
      {
        source: '/practica/the-locked-phone',
        destination: '/practica/ingles/historias/the-locked-phone',
        permanent: true,
      },
      {
        source: '/practica/the-grandmothers-ledger',
        destination: '/practica/ingles/historias/the-grandfathers-ledger',
        permanent: true,
      },

      // Alemán A1
      g('aleman', 'a1', 'acusativo', 'akkusativ'),
      g('aleman', 'a1', 'articulos-der-die-das', 'artikel'),
      g('aleman', 'a1', 'posesivos', 'possessivpronomen'),
      g('aleman', 'a1', 'pronombres-personales', 'personalpronomen'),
      g('aleman', 'a1', 'sein-haben', 'verb-sein'),
      g('aleman', 'a1', 'verbos-modales', 'modalverben'),
      g('aleman', 'a1', 'verbos-regulares-presente', 'prasens-regelmaessig'),

      // Coreano A1
      g('coreano', 'a1', 'haber-tener-isseoyo-eopseoyo', 'isseoyo-eopsoyo'),
      g('coreano', 'a1', 'hangeul-alfabeto-coreano', 'hangul-basico'),
      g('coreano', 'a1', 'negacion-an-ji-anhayo', 'negacion'),
      g('coreano', 'a1', 'numeros-coreanos-sino-nativos', 'numeros-sino-coreanos'),
      g('coreano', 'a1', 'particula-objeto-eul-reul', 'marcador-objeto'),
      g('coreano', 'a1', 'pasado-asseoyo-eosseoyo', 'pasado-asseoyo'),
      g('coreano', 'a1', 'querer-go-sipeoyo', 'querer-goshipda'),
      g('coreano', 'a1', 'ser-copula-ieyo-yeyo', 'ieoyo-yeyo'),

      // Francés A1
      g('frances', 'a1', 'adjetivos-posesivos', 'adjectifs-possessifs'),
      g('frances', 'a1', 'articulos-definidos-indefinidos', 'articles'),
      g('frances', 'a1', 'articulos-partitivos', 'articles'),
      g('frances', 'a1', 'la-negacion', 'negation-ne-pas'),
      g('frances', 'a1', 'preguntas', 'questions'),
      g('frances', 'a1', 'preposiciones-lugar-pais', 'prepositions-lieu'),
      g('frances', 'a1', 'pronombres-sujeto', 'pronoms-sujet'),
      g('frances', 'a1', 'verbo-etre', 'verbe-etre'),
      g('frances', 'a1', 'verbos-er-presente', 'present-verbes-er'),
      g('frances', 'a1', 'verbos-irregulares-aller-faire-venir', 'verbes-irreguliers'),

      // Inglés A1
      g('ingles', 'a1', 'adjetivos-posesivos', 'possessive-adjectives'),
      g('ingles', 'a1', 'adverbios-de-frecuencia', 'adverbs-frequency'),
      g('ingles', 'a1', 'can-cant', 'can-ability'),
      g('ingles', 'a1', 'demostrativos-this-that', 'demonstratives'),
      g('ingles', 'a1', 'preposiciones-de-lugar', 'prepositions-place'),
      g('ingles', 'a1', 'preposiciones-de-tiempo', 'prepositions-time'),
      g('ingles', 'a1', 'present-simple-afirmativo-negativo', 'present-simple-affirmative'),
      g('ingles', 'a1', 'present-simple-preguntas', 'present-simple-questions'),
      g('ingles', 'a1', 'verbo-to-be', 'verb-to-be'),

      // Inglés A2
      g('ingles', 'a2', 'superlativos', 'superlatives'),

      // Italiano A1
      g('italiano', 'a1', 'adjetivos-posesivos', 'aggettivi-possessivi'),
      g('italiano', 'a1', 'concordancia-adjetivos', 'aggettivi-qualificativi'),
      g('italiano', 'a1', 'genero-numero-nombres', 'genere-numero'),
      g('italiano', 'a1', 'la-negacion', 'negazione'),
      g('italiano', 'a1', 'preguntas', 'domande-interrogativi'),
      g('italiano', 'a1', 'preposiciones-articuladas', 'preposizioni-articolate'),
      g('italiano', 'a1', 'pronombres-sujeto', 'pronomi-soggetto'),
      g('italiano', 'a1', 'verbos-are', 'presente-verbi-are'),
      g('italiano', 'a1', 'verbos-irregulares-andare-fare-venire', 'verbi-irregolari'),

      // Japonés A1
      g('japones', 'a1', 'adjetivos-i', 'i-keiyoshi'),
      g('japones', 'a1', 'adjetivos-na', 'na-keiyoshi'),
      g('japones', 'a1', 'arimasu-imasu-existencia', 'arimasu-imasu'),
      g('japones', 'a1', 'hiragana-katakana', 'hiragana-basico'),
      g('japones', 'a1', 'negacion-masen-kunai-janai', 'negacion-completa'),
      g('japones', 'a1', 'palabras-interrogativas', 'interrogativos-ka'),
      g('japones', 'a1', 'particula-o-objeto', 'particula-wo-ni'),
      g('japones', 'a1', 'particulas-ni-e-de', 'particula-de-e'),
      g('japones', 'a1', 'querer-tai-y-pedir-tekudasai', 'tai-form'),
      g('japones', 'a1', 'verbos-masu-presente', 'masu-kei-conjugacion'),
      g('japones', 'a1', 'wa-desu-copula', 'desu-masu'),

      // Portugués A1
      g('portugues', 'a1', 'ha-tem', 'ha-tem-existe'),
      g('portugues', 'a1', 'perguntas', 'perguntas-interrogativas'),
      g('portugues', 'a1', 'verbo-estar', 'ser-e-estar'),
      g('portugues', 'a1', 'verbo-ser', 'ser-e-estar'),
      g('portugues', 'a1', 'verbos-ar', 'presente-verbos-ar'),
      g('portugues', 'a1', 'verbos-er-ir', 'presente-verbos-er-ir'),

      // Ruso A1
      g('ruso', 'a1', 'futuro-y-verbos-de-movimiento', 'futuro-byt'),
      g('ruso', 'a1', 'genero-de-los-sustantivos', 'genero-sustantivos'),
      g('ruso', 'a1', 'negacion-ne-net', 'negacion-ne'),
      g('ruso', 'a1', 'numeros-y-edad', 'numeros'),
      g('ruso', 'a1', 'palabras-interrogativas', 'preguntas-vopros'),
      g('ruso', 'a1', 'posesivos-moy-moya-moyo', 'adjetivos-posesivos'),
      g('ruso', 'a1', 'presente-primera-conjugacion', 'presente-verbos'),
      g('ruso', 'a1', 'pronombres-y-omision-de-ser', 'pronombres-personales'),

      // Sin equivalente actual: el tema se retiró, no se renombró. Van al índice de
      // su nivel, que es lo más cercano — la persona ve la lista y elige.
      idx('aleman', 'a1', 'orden-de-palabras'),
      idx('coreano', 'a1', 'demostrativos-i-geu-jeo'),
      idx('coreano', 'a1', 'imperativo-cortes-euseyo'),
      idx('frances', 'a1', 'il-y-a-c-est'),
      idx('japones', 'a1', 'demostrativos-kore-sore-are'),
      idx('japones', 'a1', 'pasado-mashita-deshita'),

      // ── Segunda tanda: las que se escaparon de la primera ─────────────────
      //
      // La tabla de arriba se armó con Search Console del 18 al 29 de julio de
      // 2026 y cubrió 69 slugs. Se quedaron 29 fuera, y Google las siguió
      // pidiendo: 21 de ellas las rastreó en agosto, ya con las redirecciones
      // anteriores publicadas, y se llevó un 404 cada vez.
      //
      // Medido en el informe de indexación del 13 de agosto de 2026, apartado
      // «Non trovata (404)», que listaba 38 URLs. Cada destino se comprobó
      // contra `src/data/grammar/<idioma>/<nivel>/` antes de escribirlo aquí:
      // el destino existe y el origen no es una lección viva.
      g('coreano', 'a1', 'presente-ayo-eoyo-haeyo', 'haeyo-presente'),
      g('coreano', 'a1', 'palabras-interrogativas', 'interrogativos'),
      g('coreano', 'a1', 'particula-tema-eun-neun', 'marcadores-tema-sujeto'),
      g('coreano', 'a1', 'particula-sujeto-i-ga', 'marcadores-tema-sujeto'),
      g('coreano', 'a1', 'particulas-lugar-tiempo-e-eseo', 'marcador-lugar-e'),

      g('frances', 'a1', 'concordancia-adjetivos', 'adjectifs-qualificatifs'),
      g('frances', 'a1', 'verbo-avoir', 'verbe-avoir'),
      g('frances', 'a1', 'futuro-proximo', 'futur-proche'),
      g('frances', 'a1', 'genero-numero-sustantivos', 'genre-noms'),

      g('aleman', 'a1', 'imperativo', 'imperativ'),
      g('aleman', 'a1', 'articulos-indefinidos-kein', 'artikel'),
      g('aleman', 'a1', 'es-gibt-acusativo', 'akkusativ'),
      g('aleman', 'a1', 'negacion-nicht-kein', 'verneinung'),
      g('aleman', 'a1', 'preguntas', 'w-fragen'),

      g('italiano', 'a1', 'verbos-ere-ire', 'presente-verbi-ere-ire'),
      g('italiano', 'a1', 'articulos-determinados', 'articoli'),
      g('italiano', 'a1', 'articulos-indeterminados', 'articoli'),
      g('italiano', 'a1', 'ci-e-ci-sono', 'ce-ci-sono'),

      g('portugues', 'a1', 'genero-plural-substantivos', 'plural-substantivos'),
      g('portugues', 'a1', 'a-negacao', 'negacao'),
      g('portugues', 'a1', 'presente-continuo', 'estar-gerundio'),
      g('portugues', 'a1', 'possessivos', 'adjetivos-possessivos'),

      g('japones', 'a1', 'numeros-y-contadores', 'numeros-contadores'),

      g('ingles', 'a1', 'articulos-a-an-the', 'articles'),
      g('ingles', 'a1', 'pronombres-personales', 'subject-pronouns'),
      g('ingles', 'a2', 'countable-uncountable-some-any', 'quantifiers'),

      g('ruso', 'a1', 'caso-preposicional-lugar', 'preposiciones-lugar-v-na'),

      // Estos dos no tienen equivalente: el tema no existe en ese idioma y nivel
      // (ruso A1 no cubre el pasado; japonés A1 no tiene la partícula の). Van al
      // índice, que es lo más cercano a lo que la persona buscaba.
      idx('ruso', 'a1', 'tiempo-pasado'),
      idx('japones', 'a1', 'particula-no-posesivo'),

      // ── Artículos del blog renombrados ────────────────────────────────────
      // Mismo problema, otra sección. `topik-i-` pasó a `topik-1-`: cambió una
      // letra por un número y la dirección vieja quedó muerta.
      b('topik-i-preparacion-guia-para-principiantes', '/blog/topik-1-preparacion-guia-para-principiantes'),
      b('ielts-writing-task-2-guia-completa-para-principiantes', '/blog/ielts-writing-task-2-tipos-de-ensayo-y-estructura'),
      b('ielts-bandas-0-9-que-significa-cada-puntaje', '/blog/como-sacar-band-7-en-ielts'),
      b('metodo-welearn-17-pasos-para-aprender-un-idioma', '/metodo'),

      // Página suelta de una versión anterior del sitio, aún rastreada.
      { source: '/interrogativos_coreano/index.html', destination: '/practica/coreano/a1/gramatica/interrogativos', permanent: true },
    ];
  },
};

export default nextConfig;
