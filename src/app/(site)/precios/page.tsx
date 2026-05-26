import type { Metadata } from 'next';
import PreciosClient from './PreciosClient';

export const metadata: Metadata = {
  title: 'Planes y Precios',
  description:
    'Planes para preparar IELTS, TOEFL, ICFES, Goethe, DELF y más. Simulacros completos, retroalimentación con IA y tutorías en vivo. Desde $50.000/mes.',
  keywords: ['precio curso idiomas', 'suscripción WeLearn', 'preparación TOEFL precio', 'IELTS Colombia costo'],
  openGraph: {
    title: 'Planes y Precios — Idiomas WeLearn',
    description: 'Prepárate para TOEFL, IELTS, ICFES y más desde $50.000/mes.',
    url: 'https://idiomaswl.com/precios',
  },
  alternates: { canonical: 'https://idiomaswl.com/precios' },
};

export default function PreciosPage() {
  return <PreciosClient />;
}
