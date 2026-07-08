import type { Metadata } from 'next';
import PreciosClient from './PreciosClient';

export const metadata: Metadata = {
  title: 'Planes y Precios — Inglés, Coreano, IELTS, TOEFL | WeLearn',
  description:
    'Planes accesibles para preparar IELTS, TOEFL, ICFES, Goethe, DELF y más. Simulacros ilimitados, feedback por sección y clases 1:1 con tutor. Empieza con 3 días gratis.',
  keywords: [
    'precio curso inglés Colombia',
    'precio clases idiomas online',
    'preparación IELTS precio Colombia',
    'plan TOEFL precio',
    'costo clases coreano',
    'WeLearn precios',
    'clases idiomas baratos Colombia',
  ],
  openGraph: {
    title: 'Planes y Precios — Idiomas WeLearn',
    description:
      'Planes desde $50.000/mes para inglés, coreano, francés, alemán y más. Simulacros ilimitados + tutor 1:1.',
    url: 'https://www.idiomaswl.com/precios',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/precios' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Puedo cambiar de idioma con el mismo plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Los planes WeLearn cubren todos los idiomas disponibles: inglés, coreano, francés, alemán, italiano y portugués. Puedes practicar con el idioma que necesites sin cambiar de plan.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay una clase de prueba gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Todos los planes incluyen 3 días de prueba gratis sin necesidad de tarjeta de crédito. Además, los planes con tutor ofrecen una clase de diagnóstico inicial gratuita.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los simulacros de IELTS, TOEFL e ICFES están incluidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Todos los planes incluyen simulacros ilimitados para IELTS, TOEFL iBT, ICFES, Goethe, DELF, CILS y CELPE-Bras. El banco de preguntas se actualiza periódicamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo cancelar en cualquier momento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. No hay contratos ni permanencia mínima. Puedes cancelar tu suscripción en cualquier momento desde tu panel de cuenta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto duran las sesiones en vivo del plan Intensivo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las sesiones en vivo del plan Intensivo son de 60 minutos cada una. Puedes elegir entre 2 o 4 sesiones por semana según tu disponibilidad.',
      },
    },
  ],
};

export default function PreciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
            { '@type': 'ListItem', position: 2, name: 'Planes y Precios', item: 'https://www.idiomaswl.com/precios' },
          ],
        }) }}
      />
      <PreciosClient />
    </>
  );
}
