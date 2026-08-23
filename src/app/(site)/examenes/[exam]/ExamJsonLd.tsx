import type { Exam } from '@/data/exams';
import type { ExamGuide } from '@/data/examGuides';
import { SAT_GUIDES } from '@/data/satGuides';

const BASE = 'https://www.idiomaswl.com';

/**
 * Datos estructurados de una página de examen.
 *
 * Por qué existe. La página tenía `FAQPage` y nada más: ni migas, ni la ficha del
 * recurso, ni una sola referencia a la fuente oficial. Para Google eso es una página
 * de FAQ suelta; para un motor de respuesta —ChatGPT, Perplexity, AI Overviews— es
 * texto sin entidad a la que anclarlo, y por eso puede resumirnos sin nombrarnos.
 *
 * Lo que se declara aquí, y solo esto:
 *  - `BreadcrumbList`: la miga que ya está en pantalla, en marcado.
 *  - `LearningResource`: qué es esta página, en qué idioma, quién la publica y que
 *    es gratis. Sin inventar precio, duración de curso ni valoraciones.
 *  - `citation` + `about.sameAs`: los enlaces oficiales que la guía ya cita a la
 *    vista del lector. Es lo que ata nuestra página a la entidad «SAT» de College
 *    Board en lugar de dejarla flotando.
 *
 * Regla al tocarlo: nada que no esté visible en la página. Un marcado que afirma
 * más que el texto es justo lo que Google penaliza, y lo que hace que un motor de
 * respuesta deje de fiarse de la fuente.
 */
export default function ExamJsonLd({ exam, guide }: { exam: Exam; guide?: ExamGuide }) {
  const url = `${BASE}/examenes/${exam.slug}`;
  const official = guide?.sources?.[0]?.url;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/home` },
        { '@type': 'ListItem', position: 2, name: 'Exámenes', item: `${BASE}/examenes` },
        { '@type': 'ListItem', position: 3, name: exam.name, item: url },
      ],
    },
    {
      '@type': 'LearningResource',
      '@id': `${url}#recurso`,
      name: guide?.title ?? `${exam.fullName}: guía y simulacros`,
      description: guide?.description ?? exam.description,
      url,
      inLanguage: 'es',
      isAccessibleForFree: exam.mocks.some(m => m.free),
      learningResourceType: guide ? ['Guía de examen', 'Simulacro gratuito'] : ['Simulacro gratuito'],
      educationalUse: 'Preparación de examen',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Idiomas WeLearn',
        url: BASE,
        areaServed: ['CO', 'US'],
      },
      author: { '@type': 'EducationalOrganization', name: 'Idiomas WeLearn', url: BASE },
      publisher: { '@type': 'EducationalOrganization', name: 'Idiomas WeLearn', url: BASE },
      about: {
        '@type': 'Thing',
        name: exam.fullName,
        ...(official ? { sameAs: official } : {}),
      },
      ...(guide?.checkedISO ? { dateModified: guide.checkedISO } : {}),
      ...(guide?.sources?.length
        ? { citation: guide.sources.map(s => ({ '@type': 'CreativeWork', name: s.label, url: s.url })) }
        : {}),
    },
  ];

  if (exam.slug === 'sat') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#guias`,
      name: 'Guías del SAT digital en español',
      numberOfItems: SAT_GUIDES.length,
      itemListElement: SAT_GUIDES.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.h1,
        url: `${BASE}/examenes/sat/guia/${item.slug}`,
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }}
    />
  );
}
