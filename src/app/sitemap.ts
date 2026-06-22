import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { TOPICS as INGLES_GRAMMAR } from '@/data/practica/ingles-a1-gramatica';
import { TOPICS as FRANCES_GRAMMAR } from '@/data/practica/frances-a1-gramatica';
import { TOPICS as ITALIANO_GRAMMAR } from '@/data/practica/italiano-a1-gramatica';
import { TOPICS as PORTUGUES_GRAMMAR } from '@/data/practica/portugues-a1-gramatica';
import { TOPICS as ALEMAN_GRAMMAR } from '@/data/practica/aleman-a1-gramatica';
import { TOPICS as COREANO_GRAMMAR } from '@/data/practica/coreano-a1-gramatica';
import { TOPICS as RUSO_GRAMMAR } from '@/data/practica/ruso-a1-gramatica';
import { TOPICS as JAPONES_GRAMMAR } from '@/data/practica/japones-a1-gramatica';

// www es el dominio canónico (idiomaswl.com hace 307 → www.idiomaswl.com).
// Las URLs del sitemap deben ser las canónicas finales, no redirecciones.
const BASE = 'https://www.idiomaswl.com';

// Temas de gramática A1 con URL propia (una por tema) — clave para que Google
// muestre estas páginas al buscar "verbo to be explicación", etc.
const A1_GRAMMAR = [
  { lang: 'ingles', topics: INGLES_GRAMMAR },
  { lang: 'frances', topics: FRANCES_GRAMMAR },
  { lang: 'italiano', topics: ITALIANO_GRAMMAR },
  { lang: 'portugues', topics: PORTUGUES_GRAMMAR },
  { lang: 'aleman', topics: ALEMAN_GRAMMAR },
  { lang: 'coreano', topics: COREANO_GRAMMAR },
  { lang: 'ruso', topics: RUSO_GRAMMAR },
  { lang: 'japones', topics: JAPONES_GRAMMAR },
] as const;

const PUBLISHED_DAYS = [1, 2, 3, 4, 6, 7];

const EXAM_SLUGS = ['ielts', 'toefl', 'icfes', 'topik', 'goethe', 'cils-celi', 'delf-dalf', 'celpe-bras', 'cambridge-b2'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core pages ─────────────────────────────────────────────────────────────
    { url: BASE,                      lastModified: now, changeFrequency: 'monthly', priority: 1    },
    { url: `${BASE}/home`,            lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/metodo`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/leccion`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/practica`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/precios`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7  },

    // ── High-intent landing pages ──────────────────────────────────────────────
    { url: `${BASE}/clases-de-idiomas`,    lastModified: now, changeFrequency: 'monthly', priority: 0.93 },
    { url: `${BASE}/clases-de-ingles`,     lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/clases-de-coreano`,    lastModified: now, changeFrequency: 'monthly', priority: 0.92 },
    { url: `${BASE}/clases-de-frances`,    lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-aleman`,     lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-italiano`,   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/clases-de-portugues`,  lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/preparacion-icfes`,              lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/miembro-fundador`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/clases-de-ingles-bucaramanga`,              lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/aprende-coreano/palabras-compuestas`,       lastModified: now, changeFrequency: 'monthly', priority: 0.82 },

    // ── Exams ──────────────────────────────────────────────────────────────────
    { url: `${BASE}/examenes`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    ...EXAM_SLUGS.map((slug) => ({
      url: `${BASE}/examenes/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),

    // ── Blog ───────────────────────────────────────────────────────────────────
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_POSTS.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),

    // ── Practice — language hubs ───────────────────────────────────────────────
    ...(['ingles', 'frances', 'portugues', 'aleman', 'italiano', 'coreano', 'japones', 'ruso'] as const).map((lang) => ({
      url: `${BASE}/practica/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // ── Practice — level pages ────────────────────────────────────────────────
    ...([] as { lang: string; level: string }[]).concat(
      ['ingles', 'frances', 'portugues', 'aleman'].flatMap((lang) =>
        ['a1', 'a2'].map((level) => ({ lang, level }))
      ),
      ['italiano', 'coreano', 'japones', 'ruso'].map((lang) => ({ lang, level: 'a1' }))
    ).map(({ lang, level }) => ({
      url: `${BASE}/practica/${lang}/${level}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),

    // ── Practice — skill pages ────────────────────────────────────────────────
    ...([] as { lang: string; level: string; skill: string }[]).concat(
      ['ingles', 'frances', 'portugues', 'aleman'].flatMap((lang) =>
        ['a1', 'a2'].flatMap((level) =>
          ['lectura', 'gramatica', 'escritura', 'vocabulario', 'habla', 'escucha'].map((skill) => ({ lang, level, skill }))
        )
      ),
      ['italiano', 'coreano', 'japones', 'ruso'].flatMap((lang) =>
        ['lectura', 'gramatica', 'escritura', 'vocabulario', 'habla', 'escucha'].map((skill) => ({ lang, level: 'a1', skill }))
      )
    ).map(({ lang, level, skill }) => ({
      url: `${BASE}/practica/${lang}/${level}/${skill}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),

    // ── Practice — A1 grammar topics (one indexable URL per topic) ─────────────
    ...A1_GRAMMAR.flatMap(({ lang, topics }) =>
      topics.map((t) => ({
        url: `${BASE}/practica/${lang}/a1/gramatica/${t.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      }))
    ),

    // ── Practice — IELTS ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/ielts`,                          lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/ielts/academic`,                 lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.8  },
    { url: `${BASE}/practica/ielts/academic/writing`,         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/academic/writing/task1`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    { url: `${BASE}/practica/ielts/academic/writing/task2`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    ...(['introduccion', 'overview', 'tendencias', 'comparaciones', 'procesos', 'mapas', 'tarea-completa'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task1/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...(['tipo-ensayo', 'introduccion', 'parrafos-cuerpo', 'linking-language', 'conclusion', 'tarea-completa'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task2/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),

    // ── Korean lesson steps ────────────────────────────────────────────────────
    ...PUBLISHED_DAYS.map((day) => ({
      url: `${BASE}/courses/korean/step/${day}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
