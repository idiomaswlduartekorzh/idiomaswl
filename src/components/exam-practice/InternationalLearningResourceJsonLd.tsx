export default function InternationalLearningResourceJsonLd({
  name,
  url,
  description,
  teaches,
  isPartOf,
}: {
  name: string;
  url: string;
  description: string;
  teaches: string[];
  isPartOf: { name: string; url: string };
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name,
          url,
          description,
          learningResourceType: ['Lesson', 'Practice', 'Quiz'],
          educationalUse: ['practice', 'self-study'],
          teaches,
          inLanguage: 'en',
          isAccessibleForFree: true,
          provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
          isPartOf: { '@type': 'Course', ...isPartOf },
        }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
