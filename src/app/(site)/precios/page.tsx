import type { Metadata } from 'next';
import PreciosClient from './PreciosClient';

export const metadata: Metadata = {
  title: 'Planes y Precios — Inglés, Coreano, IELTS, TOEFL',
  description:
    'Planes para preparar IELTS, TOEFL, ICFES, Goethe y DELF: simulacros ilimitados, feedback por sección y clases 1:1. Empieza con 3 días gratis.',
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
    title: 'Planes y Precios',
    description:
      'Planes desde $50.000/mes para inglés, coreano, francés, alemán y más. Simulacros ilimitados + tutor 1:1.',
    url: 'https://www.idiomaswl.com/precios',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/precios' },
};

export default function PreciosPage() {
  return (
    <>
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
