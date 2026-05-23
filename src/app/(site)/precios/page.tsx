import type { Metadata } from 'next';
import PreciosClient from './PreciosClient';

export const metadata: Metadata = {
  title: 'Precios — Idiomas WeLearn',
  description: 'Planes para preparar IELTS, TOEFL, ICFES, Goethe, DELF y más. Simulacros, retroalimentación y tutorías en vivo. Desde $50.000/mes.',
};

export default function PreciosPage() {
  return <PreciosClient />;
}
