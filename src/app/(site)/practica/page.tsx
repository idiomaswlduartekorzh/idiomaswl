import type { Metadata } from 'next';
import PracticaClient from './PracticaClient';

export const metadata: Metadata = {
  title: 'Práctica de Coreano y Lectura',
  description:
    'Herramientas interactivas para dominar el coreano: lector con desglose silábico Hangul, pronunciación en tiempo real, reglas fonéticas del batchim y ciclo de lectura con textos A1–B1.',
  keywords: [
    'Hangul aprender', 'leer coreano', 'batchim reglas', 'práctica coreano',
    'desglose silábico coreano', 'textos coreanos A1 B1',
  ],
  openGraph: {
    title: 'Práctica de Coreano — Idiomas WeLearn',
    description: 'Lector Hangul interactivo, reglas fonéticas del batchim y ciclo de lectura con textos A1–B1.',
    url: 'https://idiomaswl.com/practica',
  },
  alternates: {
    canonical: 'https://idiomaswl.com/practica',
  },
};

export default function PracticaPage() {
  return <PracticaClient />;
}
