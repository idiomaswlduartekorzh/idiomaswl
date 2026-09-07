import type { Metadata } from 'next';
import PreciosClient from './PreciosClient';
import CoursePricingClient from './CoursePricingClient';
import { parseSelection, type Query } from '@/lib/course-pricing/catalog';

// Preview can show the candidate without changing the production catalog.
const preview = process.env.COURSE_PRICING_PREVIEW === 'true' && process.env.VERCEL_ENV !== 'production';
const candidate = preview || process.env.COURSE_PRICING_ENABLED === 'true';

const legacyMetadata: Metadata = {
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

export const metadata: Metadata = candidate ? {
  title: 'Clases de idiomas: elige tu plan | WeLearn',
  description: 'Elige tu idioma, objetivo y ritmo. Clases de 100 minutos en ciclos de cuatro semanas, desde $320.000 COP.',
  robots: { index: !preview, follow: !preview },
  alternates: { canonical: 'https://www.idiomaswl.com/precios' },
  openGraph: { title: 'Tu idioma. Tu propio ritmo.', description: 'Clases de idiomas desde $320.000 COP por cuatro semanas.' },
} : legacyMetadata;

export default async function PreciosPage({ searchParams }: { searchParams: Promise<Query> }) {
  if (candidate) {
    const { selection, corrected } = parseSelection(await searchParams);
    return <CoursePricingClient key={JSON.stringify(selection)} initialSelection={selection} corrected={corrected} />;
  }
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
