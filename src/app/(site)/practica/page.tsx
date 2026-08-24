import type { Metadata } from 'next';
import PracticaClient from './PracticaClient';

export const metadata: Metadata = {
  title: 'Práctica — Idiomas, Exámenes e Ideas Avanzadas',
  description:
    'Practica idiomas, IELTS, TOEFL e ICFES, o desarrolla inglés B2–C1 con ciclos de escucha, lectura larga, vocabulario y pensamiento crítico.',
  keywords: [
    'IELTS Writing Task 1 conectores', 'práctica IELTS gratuita',
    'ICFES inglés práctica', 'Hangul aprender', 'leer coreano', 'batchim reglas',
    'inglés avanzado B2 C1', 'sesgos cognitivos en inglés',
  ],
  openGraph: {
    title: 'Práctica de Idiomas y Exámenes',
    description: 'Idiomas, exámenes e ideas avanzadas con práctica integrada de escucha, lectura, vocabulario y producción.',
    url: 'https://www.idiomaswl.com/practica',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/practica',
  },
};

export default function PracticaPage() {
  return <PracticaClient />;
}
