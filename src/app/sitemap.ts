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
import {
  ROLEPLAY_SETS,
  accompaniedSpeakingPath,
  roleplayRolePath,
  roleplayScenarioPath,
  roleplayToolkitPath,
  soloSpeakingPath,
  speakingPath,
} from '@/data/practica/habla-acompanado';
import { IDIOMAS_PUBLICADOS } from '@/data/fonetica/idiomas';
import { EXAM_PODCASTS } from '@/data/practica/exam-podcast-catalog';

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
  const publishedReadings = publishedReadingExercises();

  return [
    // ── Core pages ─────────────────────────────────────────────────────────────
    { url: BASE, changeFrequency: 'monthly', priority: 1    },
    { url: `${BASE}/metodo`, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/leccion`, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/practica`, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/podcasts`, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/nivel-radar`, changeFrequency: 'monthly', priority: 0.85 },

    // ── Herramientas gratuitas ────────────────────────────────────────────────
    // Una URL por idioma a propósito: «transcripción fonética inglés» y «cómo se
    // pronuncia en coreano» son búsquedas distintas y no comparten página.
    // Los idiomas salen del registro, no de una lista a mano: así añadir uno no puede
    // dejarlo fuera del sitemap.
    { url: `${BASE}/herramientas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/herramientas/quizes`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/herramientas/quizes/italiano`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/ingles`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/frances`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/portugues`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/aleman`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/ruso`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/japones`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/quizes/coreano`, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/herramientas/transcripcion-fonetica`, changeFrequency: 'monthly', priority: 0.75 },
    ...IDIOMAS_PUBLICADOS.map((idioma) => ({
      url: `${BASE}/herramientas/transcripcion-fonetica/${idioma.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    { url: `${BASE}/precios`, changeFrequency: 'monthly', priority: 0.7  },

    // ── High-intent landing pages ──────────────────────────────────────────────
    { url: `${BASE}/clases-de-idiomas`, changeFrequency: 'monthly', priority: 0.93 },
    { url: `${BASE}/clases-de-ingles`, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/clases-de-coreano`, changeFrequency: 'monthly', priority: 0.92 },
    { url: `${BASE}/clases-de-frances`, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-aleman`, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/clases-de-italiano`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/clases-de-portugues`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/clases-de-ruso`, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/quienes-somos`, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/clases-de-japones`, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/preparacion-icfes`, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/miembro-fundador`, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/clases-de-ingles-bucaramanga`, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/aprende-coreano/palabras-compuestas`, changeFrequency: 'monthly', priority: 0.82 },

    // ── Exams ──────────────────────────────────────────────────────────────────
    { url: `${BASE}/examenes`, changeFrequency: 'weekly',  priority: 0.9  },
    ...EXAM_SLUGS.map((slug) => ({
      url: `${BASE}/examenes/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    // Cada episodio vive dentro de su examen y tiene contenido editorial propio.
    // El catálogo es la única fuente para el índice /podcasts, los hubs y el sitemap.
    ...EXAM_PODCASTS.map((episode) => ({
      url: `${BASE}${episode.href}`,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    })),
    // Espinazo del superhub de SAT — ver docs/sat-superhub-plan.md
    ...SAT_GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/examenes/sat/guia/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // ── Blog ───────────────────────────────────────────────────────────────────
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_POSTS.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),

    // ── Practice — language hubs ───────────────────────────────────────────────
    ...PRACTICE_LANGUAGES.map((lang) => ({
      url: `${BASE}/practica/${lang}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // ── Practice — level pages ────────────────────────────────────────────────
    ...PRACTICE_LANGUAGES.flatMap((lang) =>
      Object.keys(grammarRegistry[lang]).map((level) => ({ lang, level }))
    ).map(({ lang, level }) => ({
      url: `${BASE}/practica/${lang}/${level}`,
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
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),

    // ── Practice — Habla acompañada ─────────────────────────────────────────
    // Cada rol tiene URL propia a propósito: dos personas abren dos pantallas y ninguna
    // recibe los datos ocultos de la otra. Sets, rutas y slugs salen del registro vivo.
    ...ROLEPLAY_SETS.flatMap((set) => [
      { url: `${BASE}${speakingPath(set.language, set.level)}`, changeFrequency: 'monthly' as const, priority: 0.74 },
      { url: `${BASE}${soloSpeakingPath(set.language, set.level)}`, changeFrequency: 'monthly' as const, priority: 0.68 },
      { url: `${BASE}${accompaniedSpeakingPath(set.language, set.level)}`, changeFrequency: 'monthly' as const, priority: 0.76 },
      { url: `${BASE}${roleplayToolkitPath(set.language, set.level)}`, changeFrequency: 'monthly' as const, priority: 0.64 },
      ...set.scenarios.flatMap((scenario) => [
        {
          url: `${BASE}${roleplayScenarioPath(scenario)}`,
          changeFrequency: 'monthly' as const,
          priority: 0.72,
        },
        ...scenario.roles.map((role) => ({
          url: `${BASE}${roleplayRolePath(scenario, role.id)}`,
          changeFrequency: 'monthly' as const,
          priority: 0.66,
        })),
      ]),
    ]),

    // ── Practice — grammar topics A1–B1 (one indexable URL per topic) ─────────
    ...GRAMMAR_ENTRIES.map(({ lang, level, topic }) => ({
      url: `${BASE}/practica/${lang}/${level}/gramatica/${topic.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),

    // ── Practice — vocabulary, hub + one URL per themed block ─────────────────
    // Solo los niveles del registro, que son los que han pasado su Puerta 2. Un nivel a
    // medias no entra aquí ni lleva `noindex` en la ruta: sencillamente no está escrito.
    ...getVocabLevels().flatMap((nivel) => [
      {
        url: `${BASE}/practica/${nivel.lang}/${nivel.nivel}/vocabulario`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...nivel.bloques.map((bloque) => ({
        url: `${BASE}/practica/${nivel.lang}/${nivel.nivel}/vocabulario/${bloque.id}`,
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
      { url: `${BASE}/practica/${lang}/historias`, changeFrequency: 'monthly' as const, priority: 0.74 },
      ...getHistorias(lang).map((h) => ({
        url: `${BASE}/practica/${lang}/historias/${h.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.72,
      })),
    ]),

    // ── Practice — ICFES Saber 11 ────────────────────────────────────────────
    { url: `${BASE}/practica/icfes-saber-11`, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/icfes-saber-11/diagnostico`, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/plan-de-estudio`, changeFrequency: 'monthly' as const, priority: 0.8  },
    { url: `${BASE}/practica/icfes-saber-11/simulacro-guiado`, changeFrequency: 'monthly' as const, priority: 0.84 },
    ...GUIDED_MOCK_IDS.map((mockId) => ({ url: `${BASE}/examenes/icfes/practica/${mockId}/guiado`, changeFrequency: 'monthly' as const, priority: 0.76 })),
    { url: `${BASE}/practica/icfes-saber-11/pregunta-del-dia`, changeFrequency: 'daily'   as const, priority: 0.78 },
    ...(['parte-1', 'parte-2', 'parte-3', 'parte-4', 'parte-5', 'parte-6', 'parte-7'] as const).map((part) => ({
      url: `${BASE}/practica/icfes-saber-11/${part}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${BASE}/practica/icfes-saber-11/examenes`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    ...SIMULACROS.filter((exam) => exam.assessment === 'saber-11').map((exam) => ({ url: `${BASE}/practica/icfes-saber-11/examenes/${exam.id}`, changeFrequency: 'monthly' as const, priority: 0.72 })),
    ...GUIDED_WORKBOOK_IDS.map((examId) => ({ url: `${BASE}/practica/icfes-saber-11/examenes/${examId}/guiado`, changeFrequency: 'monthly' as const, priority: 0.78 })),
    { url: `${BASE}/practica/icfes-saber-11/vocabulario`, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/gramatica-conjunciones`, changeFrequency: 'weekly'  as const, priority: 0.82 },
    { url: `${BASE}/practica/icfes-saber-11/sinonimos-inferencia`, changeFrequency: 'weekly'  as const, priority: 0.82 },

    // ── Practice — IELTS ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/ielts`, changeFrequency: 'weekly'  as const, priority: 0.85 },
    { url: `${BASE}/practica/ielts/general-training`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/general-training/reading`, changeFrequency: 'monthly' as const, priority: 0.67 },
    { url: `${BASE}/practica/ielts/general-training/writing/task1`, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/general-training/writing/task2`, changeFrequency: 'monthly' as const, priority: 0.66 },
    { url: `${BASE}/practica/ielts/reading`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/ielts/reading/mixed-practice`, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/reading/tipos-de-preguntas`, changeFrequency: 'weekly'  as const, priority: 0.76 },
    { url: `${BASE}/practica/ielts/reading/habilidades`, changeFrequency: 'weekly'  as const, priority: 0.74 },
    { url: `${BASE}/practica/ielts/academic`, changeFrequency: 'weekly'  as const, priority: 0.8  },
    { url: `${BASE}/practica/ielts/academic/writing`, changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${BASE}/practica/ielts/academic/writing/rubrica`, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/ielts/academic/writing/task1`, changeFrequency: 'monthly' as const, priority: 0.7  },
    { url: `${BASE}/practica/ielts/academic/writing/task2`, changeFrequency: 'monthly' as const, priority: 0.7  },
    ...(['introduccion', 'overview', 'body-1', 'body-2', 'tendencias', 'comparaciones', 'procesos', 'mapas', 'vocabulario', 'tarea-completa', 'graficos-lineales', 'graficos-de-barras', 'pie-charts', 'tablas'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task1/${s}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    { url: `${BASE}/recursos/ielts-writing-task-1-introduccion-pdf`, changeFrequency: 'monthly' as const, priority: 0.78 },
    // Una URL por familia de conectores. Cada una responde a una búsqueda distinta
    // —«conectores de contraste en inglés», «conectores de causa y efecto»— que en una sola
    // página larga competirían entre sí.
    ...(['addition', 'contrast', 'cause-and-effect', 'examples', 'concession', 'comparison', 'conclusion', 'condition', 'correlative'] as const).map((f) => ({
      url: `${BASE}/practica/ielts/academic/writing/task2/linking-language/${f}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...(['analisis-pregunta', 'tipo-ensayo', 'introduccion', 'body-1', 'body-2', 'parrafos-cuerpo', 'linking-language', 'conclusion', 'revision-final', 'tarea-completa', 'opinion', 'discussion', 'advantages-disadvantages', 'problem-solution', 'direct-question', 'model-answers'] as const).map((s) => ({
      url: `${BASE}/practica/ielts/academic/writing/task2/${s}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...PUBLISHED_EXAM_PRACTICE_ROUTES.map((route) => ({
      url: `${BASE}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    // ── Practice — TOEFL ──────────────────────────────────────────────────────
    { url: `${BASE}/practica/toefl`, changeFrequency: 'weekly'  as const, priority: 0.84 },
    { url: `${BASE}/practica/toefl/reading`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/reading/tipos-de-preguntas`, changeFrequency: 'weekly'  as const, priority: 0.76 },
    { url: `${BASE}/practica/toefl/listening`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/writing`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/speaking`, changeFrequency: 'weekly'  as const, priority: 0.78 },
    { url: `${BASE}/practica/toefl/writing/model-answers`, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/rubrica`, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/grammar-for-writing`, changeFrequency: 'monthly' as const, priority: 0.68 },
    { url: `${BASE}/practica/toefl/writing/academic-discussion/banco-de-prompts`, changeFrequency: 'monthly' as const, priority: 0.69 },
    { url: `${BASE}/practica/toefl/writing/write-an-email/banco-de-prompts`, changeFrequency: 'monthly' as const, priority: 0.69 },

    // ── Korean lesson steps ────────────────────────────────────────────────────
    ...PUBLISHED_DAYS.map((day) => ({
      url: `${BASE}/courses/korean/step/${day}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
