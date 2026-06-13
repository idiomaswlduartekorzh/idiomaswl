import type { Metadata } from 'next';
import TOEFLHubClient from './TOEFLHubClient';

export const metadata: Metadata = {
  title: 'Práctica TOEFL — Reading Multiple Choice | Idiomas WeLearn',
  description: 'Practica TOEFL iBT Reading con pasaje académico real, 6 preguntas de opción múltiple y feedback inmediato con explicaciones detalladas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/toefl' },
};

export default function TOEFLPage() {
  return <TOEFLHubClient />;
}
