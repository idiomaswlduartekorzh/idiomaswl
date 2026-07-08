/**
 * LearningResource Schema Generator
 * Usado para páginas de práctica, temas de gramática y ejercicios
 * Google los reconoce como recursos educativos indexables
 */

interface LearningResourceProps {
  name: string;
  description: string;
  url: string;
  educationalLevel?: string;
  inLanguage?: string;
  teaches?: string;
  keywords?: string[];
  learningResourceType?: string[];
  author?: { name: string; url: string };
  datePublished?: string;
  dateModified?: string;
  coursePartOf?: { name: string; url: string };
  interactivityType?: 'mixed' | 'expositive' | 'interactive';
  aggregateRating?: { ratingValue: number; ratingCount: number };
}

export function generateLearningResourceSchema(props: LearningResourceProps): object {
  const {
    name,
    description,
    url,
    educationalLevel = 'A1',
    inLanguage = 'es',
    teaches = name,
    keywords = [],
    learningResourceType = ['Lesson', 'Practice', 'Quiz'],
    author = { name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
    datePublished,
    dateModified,
    coursePartOf,
    interactivityType = 'interactive',
    aggregateRating,
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    educationalLevel,
    inLanguage,
    teaches,
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    learningResourceType,
    author,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'Idiomas WeLearn',
      sameAs: 'https://www.idiomaswl.com',
      logo: 'https://www.idiomaswl.com/images/logo.png',
    },
    interactivityType,
    ...(coursePartOf && {
      isPartOf: {
        '@type': 'Course',
        name: coursePartOf.name,
        url: coursePartOf.url,
      },
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
      },
    }),
  };
}
