import type { Metadata } from 'next'

import { FAQS_FRANCES } from '@/data/fonetica/faq-frances'

import TranscriptorClient from './TranscriptorClient'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica/frances'

export const metadata: Metadata = {
  title: 'Transcripción fonética del francés — qué letras suenan',
  description:
    'Pega texto en francés y ve qué letras se pronuncian y cuáles no. Con la liaison marcada: «les amis» suena /le‿zami/. Gratis, sin registro.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Transcripción fonética del francés',
    description: 'Qué letras suenan, cuáles callan y dónde reaparecen. Con la liaison marcada.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function TranscripcionFoneticaFrancesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Transcripción fonética del francés',
        url: PAGE_URL,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        isAccessibleForFree: true,
        inLanguage: 'es',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' },
        description:
          'Convierte texto en francés a alfabeto fonético internacional, marcando las letras mudas y la liaison.',
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
          { '@type': 'ListItem', position: 3, name: 'Transcripción fonética', item: 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica' },
          { '@type': 'ListItem', position: 4, name: 'Francés', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_FRANCES.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <TranscriptorClient />
    </>
  )
}
