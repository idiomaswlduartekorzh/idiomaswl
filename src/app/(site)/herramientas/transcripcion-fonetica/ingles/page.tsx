import type { Metadata } from 'next'

import { FAQS_INGLES } from '@/data/fonetica/faq-ingles'

import TranscriptorClient from './TranscriptorClient'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica/ingles'

export const metadata: Metadata = {
  // «traductor» y «cómo se pronuncia» son lo que la gente escribe de verdad; «AFI» lo
  // conoce una minoría. El acrónimo se queda porque también se busca, pero después.
  title: 'Transcripción fonética del inglés — traductor a AFI',
  description:
    'Traductor de inglés a transcripción fonética: pega un texto y ve cómo se pronuncia. Acento británico y americano, con el acento tónico marcado. Gratis.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Transcripción fonética del inglés (AFI)',
    description:
      'Pega un texto en inglés y obtén su transcripción en alfabeto fonético, en británico o americano.',
    url: PAGE_URL,
    type: 'website',
    // Declarar `openGraph` **reemplaza** el del layout raíz, no lo completa. Sin estas
    // dos líneas la página perdía el nombre del sitio y el idioma.
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

/**
 * Herramienta pública de transcripción fonética.
 *
 * Es una ruta por idioma a propósito: quien busca «transcripción fonética inglés» y quien
 * busca «cómo se pronuncia en coreano» son dos búsquedas distintas y merecen dos páginas.
 * Cuando entren más idiomas, cada uno tendrá la suya al lado de esta.
 */
export default function TranscripcionFoneticaInglesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Transcripción fonética del inglés (AFI)',
        url: PAGE_URL,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requiere JavaScript',
        isAccessibleForFree: true,
        inLanguage: 'es',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' },
        description:
          'Convierte texto en inglés a alfabeto fonético internacional, en acento británico (RP) o americano (General American).',
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
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Herramientas',
            item: 'https://www.idiomaswl.com/herramientas',
          },
          { '@type': 'ListItem', position: 3, name: 'Transcripción fonética del inglés', item: PAGE_URL },
        ],
      },
      {
        // Se deriva de FAQS_INGLES, que es lo mismo que pinta la página. Escribir las
        // preguntas aquí a mano fue el error de la primera versión: el marcado declaraba
        // un FAQ que no existía en pantalla, y eso Google lo trata como engañoso.
        '@type': 'FAQPage',
        mainEntity: FAQS_INGLES.map((faq) => ({
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
        dangerouslySetInnerHTML={{
          // `<` escapado: si algún día una respuesta lleva un signo de menor que, sin esto
          // cerraría la etiqueta antes de tiempo. Mismo criterio que ReadingStructuredData.
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <TranscriptorClient />
    </>
  )
}
