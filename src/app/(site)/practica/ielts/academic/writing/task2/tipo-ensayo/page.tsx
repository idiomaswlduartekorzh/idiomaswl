import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Tipos de Ensayo — Opinion, Discussion, Problem-Solution | Idiomas WeLearn',
  description: 'Aprende a identificar y estructurar los 5 tipos de ensayo del IELTS Writing Task 2: opinión, discusión, problema-solución, ventajas-desventajas y doble pregunta. Estrategias Band 7.',
  keywords: ['IELTS task 2 tipos', 'IELTS opinion essay', 'IELTS discussion essay', 'IELTS writing task 2 tipos de ensayo'],
  openGraph: {
    title: 'IELTS Task 2: Tipos de Ensayo — Opinion, Discussion, Problem-Solution | Idiomas WeLearn',
    description: 'Aprende a identificar y estructurar los 5 tipos de ensayo del IELTS Writing Task 2: opinión, discusión, problema-solución, ventajas-desventajas y doble pregunta. Estrategias Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/tipo-ensayo' },
}

import TipoEnsayoClient from './TipoEnsayoClient';
export default function Page() { return <TipoEnsayoClient />; }
