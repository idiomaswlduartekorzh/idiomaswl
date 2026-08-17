import type { Metadata } from 'next'

import { FAQS_COREANO } from '@/data/fonetica/faq-coreano'

import TranscriptorClient from './TranscriptorClient'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica/coreano'

export const metadata: Metadata = {
  title: 'Transcripción fonética del coreano — cómo suena',
  description:
    'Pega texto en hangul y ve cómo suena de verdad, con las reglas de cambio fonético. 학교 no suena «hak-gyo», suena 학꾜. Alfabeto fonético, gratis.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Transcripción fonética del coreano',
    description: 'Pega texto en hangul y ve cómo suena de verdad, con las reglas de 변동.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function TranscripcionFoneticaCoreanoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Transcripción fonética del coreano',
        url: PAGE_URL,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        isAccessibleForFree: true,
        inLanguage: 'es',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' },
        description:
          'Convierte texto en hangul a alfabeto fonético internacional aplicando las reglas de cambio fonético del coreano (음운 변동).',
        provider: {
          '@type': 'Organization',
          '@id': 'https://www.idiomaswl.com/#organization',
          name: 'Idiomas WeLearn',
          url: 'https://www.idiomaswl.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.idiomaswl.com/herramientas' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Transcripción fonética',
            item: 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica',
          },
          { '@type': 'ListItem', position: 4, name: 'Coreano', item: PAGE_URL },
        ],
      },
      {
        // Derivado de FAQS_COREANO, que es lo mismo que pinta la página.
        '@type': 'FAQPage',
        mainEntity: FAQS_COREANO.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <TranscriptorClient />
    </>
  )
}
