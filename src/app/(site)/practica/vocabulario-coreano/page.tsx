import type { Metadata } from 'next';
import VocabQuizClient from './VocabQuizClient';

export const metadata: Metadata = {
  title: 'Vocabulario Coreano — Diagnóstico A1',
  description: 'Quiz de vocabulario coreano: ve la imagen, escucha el audio y selecciona qué significa en coreano. Descubre si estás en nivel A1 o necesitas empezar desde el Hangul.',
  robots: { index: false, follow: false },
};

export default function VocabularioCoreanoPage() {
  return <VocabQuizClient />;
}
