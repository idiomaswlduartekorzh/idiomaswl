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
