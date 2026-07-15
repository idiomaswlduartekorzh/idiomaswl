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
import { TOPICS as INGLES_A2_GRAMMAR } from '@/data/practica/ingles-a2-gramatica';
import { EXAM_PRACTICE_ROUTES } from '@/data/practica-exams/seo-catalog';

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

const PUBLISHED_EXAM_PRACTICE_ROUTES = EXAM_PRACTICE_ROUTES.filter((route) => route.status === 'published');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core pages ─────────────────────────────────────────────────────────────
    { url: BASE,                      lastModified: now, changeFrequency: 'monthly', priority: 1    },
    { url: `${BASE}/home`,            lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/metodo`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/leccion`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/practica`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/nivel-radar`,     lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
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

    // ── Practice — A2 grammar topics (one indexable URL per topic) ─────────────
    ...INGLES_A2_GRAMMAR.map((t) => ({
      url: `${BASE}/practica/ingles/a2/gramatica/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),

    // ── Practice — ICFES Saber 11 ────────────────────────────────────────────
    { url: `${BASE}/practica/icfes-saber-11`,                                  lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/icfes-saber-11/examenes`,                         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/icfes-saber-11/gramatica-conjunciones`,           lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/sinonimos-inferencia`,             lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },

    // ── Practice — IELTS ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/ielts`,                          lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/ielts/general-training`,         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/general-training/reading`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.67 },
    { url: `${BASE}/practica/ielts/general-training/writing/task1`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/general-training/writing/task2`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/reading`,                   lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/reading/tipos-de-preguntas`, lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.76 },
    { url: `${BASE}/practica/ielts/reading/habilidades`,        lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.74 },
    { url: `${BASE}/practica/ielts/academic`,                 lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.8  },
    { url: `${BASE}/practica/ielts/academic/writing`,         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/academic/writing/rubrica`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/ielts/academic/writing/task1`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    { url: `${BASE}/practica/ielts/academic/writing/task2`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    ...(['introduccion', 'overview', 'tendencias', 'comparaciones', 'procesos', 'mapas', 'vocabulario', 'tarea-completa', 'graficos-lineales', 'graficos-de-barras', 'pie-charts', 'tablas'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task1/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    { url: `${BASE}/recursos/ielts-writing-task-1-introduccion-pdf`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.78 },
    ...(['tipo-ensayo', 'introduccion', 'parrafos-cuerpo', 'linking-language', 'conclusion', 'tarea-completa', 'opinion', 'discussion', 'advantages-disadvantages', 'problem-solution', 'direct-question', 'model-answers'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task2/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...PUBLISHED_EXAM_PRACTICE_ROUTES.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    // ── Practice — TOEFL ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/toefl`,                            lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.84 },
    { url: `${BASE}/practica/toefl/reading`,                    lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/reading/tipos-de-preguntas`, lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.76 },
    { url: `${BASE}/practica/toefl/writing`,                    lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/writing/model-answers`,      lastModified: now, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/rubrica`,            lastModified: now, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/grammar-for-writing`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/academic-discussion/banco-de-prompts`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.69 },
    { url: `${BASE}/practica/toefl/writing/write-an-email/banco-de-prompts`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.69 },

    // ── Korean lesson steps ────────────────────────────────────────────────────
    ...PUBLISHED_DAYS.map((day) => ({
      url: `${BASE}/courses/korean/step/${day}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
