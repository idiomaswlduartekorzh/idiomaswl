import type { Metadata } from 'next';
import PracticaClient from './PracticaClient';

export const metadata: Metadata = {
  title: 'Herramientas de Práctica — IELTS, ICFES, Coreano',
  description:
    'Practica IELTS Writing Task 1 (conectores Band 6–7), ICFES inglés bajo estrés y coreano con lector Hangul interactivo, batchim y ciclo de lectura A1–B1.',
  keywords: [
    'IELTS Writing Task 1 conectores', 'práctica IELTS gratuita',
    'ICFES inglés práctica', 'Hangul aprender', 'leer coreano', 'batchim reglas',
  ],
  openGraph: {
    title: 'Práctica de Idiomas y Exámenes',
    description: 'IELTS Writing Task 1, ICFES inglés bajo estrés y herramientas interactivas de coreano.',
    url: 'https://www.idiomaswl.com/practica',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/practica',
  },
};

export default function PracticaPage() {
  return <PracticaClient />;
}
