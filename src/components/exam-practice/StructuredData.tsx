import type { PracticeFaq } from '@/data/practica-exams/seo-catalog';

function safeJsonLd(value: Record<string, unknown>) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function JsonLd({ value }: { value: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(value) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      value={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: PracticeFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <JsonLd
      value={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function LearningResourceJsonLd({
  name,
  url,
  description,
  teaches,
  inLanguage = 'es-CO',
  isPartOf,
}: {
  name: string;
  url: string;
  description: string;
  teaches: string[];
  inLanguage?: string;
  isPartOf: { name: string; url: string };
}) {
  return (
    <JsonLd
      value={{
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name,
        url,
        description,
        learningResourceType: ['Lesson', 'Practice', 'Quiz'],
        educationalUse: ['practice', 'self-study'],
        teaches: teaches.join(', '),
        inLanguage,
        isAccessibleForFree: true,
        provider: {
          '@type': 'Organization',
          name: 'Idiomas WeLearn',
          sameAs: 'https://www.idiomaswl.com',
        },
        isPartOf: {
          '@type': 'Course',
          name: isPartOf.name,
          url: isPartOf.url,
        },
      }}
    />
  );
}
