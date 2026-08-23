import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { EXAMS } from '@/data/exams';
import { SAT_GUIDE_SLUGS } from '@/data/satGuides';
import { grammarRegistry } from '@/data/grammar/registry';
import { EXAM_PRACTICE_ROUTES } from '@/data/practica-exams/seo-catalog';
import { publishedReadingExercises } from '@/lib/reading/catalog';
import { readingExercisePath } from '@/lib/reading/routes';
import { SIMULACROS } from '@/data/mocks/icfes-simulacros';
import { GUIDED_MOCK_IDS, GUIDED_WORKBOOK_IDS } from '@/data/icfes/guided-registry';
import { getVocabLevels } from '@/data/practica/vocabulario/registry';
import { HISTORIA_LANG_KEYS, getHistorias } from '@/data/practica/historias';
import { ROLEPLAY_INGLES_A2 } from '@/data/practica/habla-acompanado';
import { IDIOMAS_PUBLICADOS } from '@/data/fonetica/idiomas';

// www es el dominio canónico (idiomaswl.com hace 307 → www.idiomaswl.com).
// Las URLs del sitemap deben ser las canónicas finales, no redirecciones.
const BASE = 'https://www.idiomaswl.com';

// Fuente única para hubs, rutas indexables y validación de gramática A1–B1.
// No mantener listas manuales de temas en cada consumidor.
const GRAMMAR_ENTRIES = Object.entries(grammarRegistry).flatMap(([lang, levels]) =>
  Object.entries(levels).flatMap(([level, topics]) =>
    topics.map((topic) => ({ lang, level, topic }))
  )
);
const PRACTICE_LANGUAGES = Object.keys(grammarRegistry);

const PUBLISHED_DAYS = [1, 2, 3, 4, 6, 7];

// Se deriva de EXAMS, no se escribe a mano. Esta lista era manual y se quedó sin
// `sat` cuando se publicó el examen: el hub existía, compilaba y se veía, pero
// Google no lo tenía en el sitemap. Un catálogo con dos fuentes acaba siempre así.
const EXAM_SLUGS = Object.keys(EXAMS).filter((slug) => EXAMS[slug].available);

const PUBLISHED_EXAM_PRACTICE_ROUTES = EXAM_PRACTICE_ROUTES.filter((route) => route.status === 'published');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publishedReadings = publishedReadingExercises();

  return [
    // ── Core pages ─────────────────────────────────────────────────────────────
    { url: BASE,                      lastModified: now, changeFrequency: 'monthly', priority: 1    },
    { url: `${BASE}/metodo`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/leccion`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/practica`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/nivel-radar`,     lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // ── Herramientas gratuitas ────────────────────────────────────────────────
    // Una URL por idioma a propósito: «transcripción fonética inglés» y «cómo se
    // pronuncia en coreano» son búsquedas distintas y no comparten página.
    // Los idiomas salen del registro, no de una lista a mano: así añadir uno no puede
    // dejarlo fuera del sitemap.
    { url: `${BASE}/herramientas`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/herramientas/quizes`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/herramientas/quizes/italiano`,        lastModified: now, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/ingles`,           lastModified: now, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/transcripcion-fonetica`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    ...IDIOMAS_PUBLICADOS.map((idioma) => ({
      url: `${BASE}/herramientas/transcripcion-fonetica/${idioma.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    { url: `${BASE}/precios`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7  },

    // ── High-intent landing pages ──────────────────────────────────────────────
    { url: `${BASE}/clases-de-idiomas`,    lastModified: now, changeFrequency: 'monthly', priority: 0.93 },
    { url: `${BASE}/clases-de-ingles`,     lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/clases-de-coreano`,    lastModified: now, changeFrequency: 'monthly', priority: 0.92 },
    { url: `${BASE}/clases-de-frances`,    lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-aleman`,     lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-italiano`,   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/clases-de-portugues`,  lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/clases-de-ruso`,       lastModified: now, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/quienes-somos`,       lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/clases-de-japones`,   lastModified: now, changeFrequency: 'monthly', priority: 0.82 },
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
    // Espinazo del superhub de SAT — ver docs/sat-superhub-plan.md
    ...SAT_GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/examenes/sat/guia/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
    ...PRACTICE_LANGUAGES.map((lang) => ({
      url: `${BASE}/practica/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // ── Practice — level pages ────────────────────────────────────────────────
    ...PRACTICE_LANGUAGES.flatMap((lang) =>
      Object.keys(grammarRegistry[lang]).map((level) => ({ lang, level }))
    ).map(({ lang, level }) => ({
      url: `${BASE}/practica/${lang}/${level}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),

    // ── Practice — skill pages ────────────────────────────────────────────────
    // `escucha` existe para los 8 idiomas × 3 niveles (24 páginas verificadas en disco).
    // `vocabulario` entra más abajo, y solo por los niveles escritos: sale del registro,
    // no de esta lista. Las otras tres destrezas (escritura, habla, lectura) también tienen
    // página y siguen fuera del sitemap: es una decisión aparte, no un olvido de este cambio.
    ...PRACTICE_LANGUAGES.flatMap((lang) =>
      Object.keys(grammarRegistry[lang]).flatMap((level) =>
        ['gramatica', 'escucha'].map((skill) => ({ lang, level, skill }))
      )
    ).map(({ lang, level, skill }) => ({
      url: `${BASE}/practica/${lang}/${level}/${skill}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),

    // ── Practice — Habla acompañada, piloto de inglés A2 ────────────────────
    // Cada rol tiene URL propia a propósito: dos personas abren dos pantallas y ninguna
    // recibe los datos ocultos de la otra. El catálogo sale del registro, no de una lista.
    { url: `${BASE}/practica/ingles/a2/habla`, lastModified: now, changeFrequency: 'monthly', priority: 0.74 },
    { url: `${BASE}/practica/ingles/a2/habla/solo`, lastModified: now, changeFrequency: 'monthly', priority: 0.68 },
    { url: `${BASE}/practica/ingles/a2/habla/acompanada`, lastModified: now, changeFrequency: 'monthly', priority: 0.76 },
    { url: `${BASE}/practica/ingles/a2/habla/acompanada/herramientas`, lastModified: now, changeFrequency: 'monthly', priority: 0.64 },
    ...ROLEPLAY_INGLES_A2.flatMap((scenario) => [
      {
        url: `${BASE}/practica/ingles/a2/habla/acompanada/${scenario.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      },
      ...scenario.roles.map((role) => ({
        url: `${BASE}/practica/ingles/a2/habla/acompanada/${scenario.slug}/${role.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.66,
      })),
    ]),

    // ── Practice — grammar topics A1–B1 (one indexable URL per topic) ─────────
    ...GRAMMAR_ENTRIES.map(({ lang, level, topic }) => ({
      url: `${BASE}/practica/${lang}/${level}/gramatica/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),

    // ── Practice — vocabulary, hub + one URL per themed block ─────────────────
    // Solo los niveles del registro, que son los que han pasado su Puerta 2. Un nivel a
    // medias no entra aquí ni lleva `noindex` en la ruta: sencillamente no está escrito.
    ...getVocabLevels().flatMap((nivel) => [
      {
        url: `${BASE}/practica/${nivel.lang}/${nivel.nivel}/vocabulario`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...nivel.bloques.map((bloque) => ({
        url: `${BASE}/practica/${nivel.lang}/${nivel.nivel}/vocabulario/${bloque.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      })),
    ]),

    // ── Reading engine — only human-reviewed, published exercises ───────────
    ...publishedReadings.flatMap((exercise) => {
      const esPath = readingExercisePath('es', exercise.language, exercise.level.cefr, exercise.slug);
      const enPath = readingExercisePath('en', exercise.language, exercise.level.cefr, exercise.slug);
      const lastModified = new Date(exercise.seo.lastModified);
      // Idiomas con URL canónica unificada (ej. inglés en /practica/...): una sola entrada, sin hreflang duplicado.
      if (esPath === enPath) {
        return [{ url: `${BASE}${esPath}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.72 }];
      }
      const alternates = {
        languages: {
          es: `${BASE}${esPath}`,
          en: `${BASE}${enPath}`,
          'x-default': `${BASE}${esPath}`,
        },
      };
      return [
        { url: `${BASE}${esPath}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.72, alternates },
        { url: `${BASE}${enPath}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7, alternates },
      ];
    }),

    // ── Practice — Historias: comprensión integrada en los 8 idiomas ─────────
    // Derivado del registro, no una lista a mano: al añadir una historia entra
    // aquí sola. El hub de cada idioma va antes que sus historias.
    ...HISTORIA_LANG_KEYS.flatMap((lang) => [
      { url: `${BASE}/practica/${lang}/historias`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.74 },
      ...getHistorias(lang).map((h) => ({
        url: `${BASE}/practica/${lang}/historias/${h.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      })),
    ]),

    // ── Practice — ICFES Saber 11 ────────────────────────────────────────────
    { url: `${BASE}/practica/icfes-saber-11`,                                  lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/icfes-saber-11/diagnostico`,                      lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/plan-de-estudio`,                  lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8  },
    { url: `${BASE}/practica/icfes-saber-11/simulacro-guiado`,                 lastModified: now, changeFrequency: 'monthly' as const, priority: 0.84 },
    ...GUIDED_MOCK_IDS.map((mockId) => ({ url: `${BASE}/examenes/icfes/practica/${mockId}/guiado`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.76 })),
    { url: `${BASE}/practica/icfes-saber-11/pregunta-del-dia`,                 lastModified: now, changeFrequency: 'daily'   as const, priority: 0.78 },
    ...(['parte-1', 'parte-2', 'parte-3', 'parte-4', 'parte-5', 'parte-6', 'parte-7'] as const).map((part) => ({
      url: `${BASE}/practica/icfes-saber-11/${part}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${BASE}/practica/icfes-saber-11/examenes`,                         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    ...SIMULACROS.filter((exam) => exam.assessment === 'saber-11').map((exam) => ({ url: `${BASE}/practica/icfes-saber-11/examenes/${exam.id}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.72 })),
    ...GUIDED_WORKBOOK_IDS.map((examId) => ({ url: `${BASE}/practica/icfes-saber-11/examenes/${examId}/guiado`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.78 })),
    { url: `${BASE}/practica/icfes-saber-11/vocabulario`,                      lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/gramatica-conjunciones`,           lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/sinonimos-inferencia`,             lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.82 },

    // ── Practice — IELTS ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/ielts`,                          lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/ielts/general-training`,         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/general-training/reading`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.67 },
    { url: `${BASE}/practica/ielts/general-training/writing/task1`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/general-training/writing/task2`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/reading`,                   lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/reading/mixed-practice`,    lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/reading/tipos-de-preguntas`, lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.76 },
    { url: `${BASE}/practica/ielts/reading/habilidades`,        lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.74 },
    { url: `${BASE}/practica/ielts/academic`,                 lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.8  },
    { url: `${BASE}/practica/ielts/academic/writing`,         lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/academic/writing/rubrica`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/ielts/academic/writing/task1`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    { url: `${BASE}/practica/ielts/academic/writing/task2`,   lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7  },
    ...(['introduccion', 'overview', 'body-1', 'body-2', 'tendencias', 'comparaciones', 'procesos', 'mapas', 'vocabulario', 'tarea-completa', 'graficos-lineales', 'graficos-de-barras', 'pie-charts', 'tablas'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task1/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    { url: `${BASE}/recursos/ielts-writing-task-1-introduccion-pdf`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.78 },
    // Una URL por familia de conectores. Cada una responde a una búsqueda distinta
    // —«conectores de contraste en inglés», «conectores de causa y efecto»— que en una sola
    // página larga competirían entre sí.
    ...(['addition', 'contrast', 'cause-and-effect', 'examples', 'concession', 'comparison', 'conclusion', 'condition', 'correlative'] as const).map((f) => ({
      url: `${BASE}/practica/ielts/academic/writing/task2/linking-language/${f}`,
      lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6,
    })),
    ...(['analisis-pregunta', 'tipo-ensayo', 'introduccion', 'body-1', 'body-2', 'parrafos-cuerpo', 'linking-language', 'conclusion', 'revision-final', 'tarea-completa', 'opinion', 'discussion', 'advantages-disadvantages', 'problem-solution', 'direct-question', 'model-answers'] as const).map((s) => ({
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
    { url: `${BASE}/practica/toefl/listening`,                  lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/writing`,                    lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/speaking`,                   lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.78 },
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
