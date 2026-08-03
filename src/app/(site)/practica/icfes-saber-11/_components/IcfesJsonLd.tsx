const BASE = 'https://www.idiomaswl.com';

export default function IcfesJsonLd({
  name,
  description,
  url,
  type = 'LearningResource',
  currentLabel,
  questionCount,
}: {
  name: string;
  description: string;
  url: string;
  type?: 'LearningResource' | 'Quiz';
  currentLabel: string;
  questionCount?: number;
}) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        name,
        description,
        url,
        inLanguage: 'es',
        educationalLevel: 'Educación media',
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: BASE },
        ...(type === 'Quiz' ? { about: 'Inglés ICFES Saber 11', ...(questionCount ? { numberOfQuestions: questionCount } : {}) } : { learningResourceType: ['Guía', 'Práctica interactiva'] }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: `${BASE}/practica` },
          { '@type': 'ListItem', position: 2, name: 'ICFES Saber 11', item: `${BASE}/practica/icfes-saber-11` },
          { '@type': 'ListItem', position: 3, name: currentLabel, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
