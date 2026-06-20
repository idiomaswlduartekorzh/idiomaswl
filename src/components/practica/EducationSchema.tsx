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
}

// Lección de gramática (explicación + ejercicios): LearningResource para
// que Google entienda que es contenido educativo indexable por tema.
export function GrammarLessonSchema({
  name, url, description, educationalLevel = 'A1', inLanguage = 'en', keywords,
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
      name: 'Gramática de Inglés A1',
      url: 'https://www.idiomaswl.com/practica/ingles/a1/gramatica',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
