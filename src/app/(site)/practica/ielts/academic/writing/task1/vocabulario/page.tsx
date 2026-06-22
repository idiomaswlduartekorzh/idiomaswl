import type { Metadata } from 'next';
import VocabularioDatosContent from './Content';

export const metadata: Metadata = {
  title: 'Vocabulario de datos — IELTS Writing Task 1 | Idiomas WeLearn',
  description: 'Practica verbos y adverbios de tendencia para IELTS Writing Task 1: rise, fall, grow, sharply, gradually. Construye oraciones en tiempo real.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/vocabulario' },
};

export default function VocabularioPage() {
  return <VocabularioDatosContent />;
}
