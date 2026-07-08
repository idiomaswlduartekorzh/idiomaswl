/**
 * Course Schema Generator - Mejorado
 * Para páginas de nivel de práctica y landing pages de cursos
 */

interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  educationalLevel?: string;
  inLanguage?: string;
  teaches?: string;
  image?: string;
  instructor?: { name: string; url: string };
  aggregateRating?: { ratingValue: number; ratingCount: number };
  courseMode?: 'online' | 'onsite' | 'hybrid';
  duration?: string;
  skills?: string[];
}

export function generateCourseSchema(props: CourseSchemaProps): object {
  const {
    name,
    description,
    url,
    provider = 'Idiomas WeLearn',
    educationalLevel,
    inLanguage = 'es',
    teaches = name,
    image,
    instructor,
    aggregateRating,
    courseMode = 'online',
    duration,
    skills = [],
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://www.idiomaswl.com',
      logo: 'https://www.idiomaswl.com/images/logo.png',
    },
    ...(image && { image }),
    ...(educationalLevel && { educationalLevel }),
    inLanguage,
    teaches,
    ...(instructor && { instructor }),
    isAccessibleForFree: true,
    courseMode,
    ...(duration && { duration }),
    ...(skills.length > 0 && { teaches: skills }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
      },
    }),
  };
}

/**
 * AggregateRating Schema - para agregar ratings a cursos
 */
interface AggregateRatingProps {
  ratingValue: number; // 1-5
  ratingCount: number;
  reviewCount?: number;
}

export function generateAggregateRatingSchema(props: AggregateRatingProps): object {
  const { ratingValue, ratingCount, reviewCount } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    ratingCount,
    ...(reviewCount && { reviewCount }),
  };
}
