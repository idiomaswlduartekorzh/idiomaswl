import type { Metadata } from 'next';
import CoursePricingClient from './CoursePricingClient';
import { parseSelection, type Query } from '@/lib/course-pricing/catalog';
import { courseSalesEnabled } from '@/lib/course-pricing/release';

export const metadata: Metadata = {
  title: 'Clases de idiomas: elige tu plan | WeLearn',
  description: 'Elige tu idioma, objetivo y ritmo. Clases de 100 minutos en ciclos de cuatro semanas, desde $320.000 COP.',
  alternates: { canonical: 'https://www.idiomaswl.com/precios' },
  openGraph: { title: 'Tu idioma. Tu propio ritmo.', description: 'Clases de idiomas desde $320.000 COP por cuatro semanas.' },
};

export default async function PreciosPage({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const { selection, corrected } = parseSelection(query);
  const salesEnabled = courseSalesEnabled();
  return <CoursePricingClient key={JSON.stringify(selection)} initialSelection={selection} initialReviewing={query.paso === 'reglamento'} corrected={corrected} salesEnabled={salesEnabled} />;
}
