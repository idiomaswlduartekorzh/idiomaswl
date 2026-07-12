interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url: string;
  educationalLevel?: string;
  teaches?: string;
  inLanguage?: string;
}

export function CourseSchema({
  name, description, provider = 'Idiomas WeLearn', url,
  educationalLevel, teaches, inLanguage,
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: { '@type': 'Organization', name: provider, sameAs: 'https://www.idiomaswl.com' },
    url,
    ...(educationalLevel && { educationalLevel }),
    ...(teaches && { teaches }),
    ...(inLanguage && { inLanguage }),
    isAccessibleForFree: true,
    courseMode: 'online',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function QuizSchema({ name, url, description }: { name: string; url: string; description: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name,
    url,
    description,
    educationalUse: 'practice',
    isAccessibleForFree: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface GrammarLessonSchemaProps {
  name: string;
  url: string;
  description: string;
  educationalLevel?: string;
  inLanguage?: string;
  keywords?: string[];
  course?: { name: string; url: string };
}

// Lección de gramática (explicación + ejercicios): LearningResource para
// que Google entienda que es contenido educativo indexable por tema.
export function GrammarLessonSchema({
  name, url, description, educationalLevel = 'A1', inLanguage = 'en', keywords,
  course = { name: 'Gramática de Inglés A1', url: 'https://www.idiomaswl.com/practica/ingles/a1/gramatica' },
}: GrammarLessonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    url,
    description,
    learningResourceType: ['Lesson', 'Quiz'],
    educationalLevel,
    inLanguage,
    teaches: name,
    isAccessibleForFree: true,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    provider: { '@type': 'Organization', name: 'Idiomas WeLearn', sameAs: 'https://www.idiomaswl.com' },
    isPartOf: {
      '@type': 'Course',
      name: course.name,
      url: course.url,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LearningResourceSchemaProps {
  name: string;
  url: string;
  description: string;
  inLanguage?: string;
  keywords?: string[];
}

// Recurso de referencia standalone (ej. lista de verbos irregulares con PDF),
// sin depender de isPartOf de un Course específico como GrammarLessonSchema.
export function LearningResourceSchema({
  name, url, description, inLanguage = 'en', keywords,
}: LearningResourceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    url,
    description,
    learningResourceType: ['Reference', 'Dataset'],
    inLanguage,
    teaches: name,
    isAccessibleForFree: true,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    provider: { '@type': 'Organization', name: 'Idiomas WeLearn', sameAs: 'https://www.idiomaswl.com' },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage — habilita los "recuadros de respuesta" (fragmentos destacados) en Google
// y alimenta a las IA generativas (AEO). Se emite solo si el tema define preguntas.
export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  if (!items || items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
