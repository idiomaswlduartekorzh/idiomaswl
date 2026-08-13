import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Párrafos de Cuerpo — estructura TEEL',
  description: 'Párrafos de cuerpo del IELTS Writing Task 2 con estructura TEEL: topic sentence, mecanismo, ejemplo con cifras y link. Cinco párrafos guiados.',
  keywords: ['IELTS párrafos cuerpo', 'IELTS TEEL structure', 'IELTS body paragraphs', 'IELTS writing argumentación'],
  openGraph: {
    title: 'IELTS Task 2: Párrafos de Cuerpo — estructura TEEL',
    description: 'Ejercicios de párrafos de cuerpo para el IELTS Writing Task 2 con la estructura TEEL: topic sentence, explicación del mecanismo, ejemplo con cifras y link. Ejemplo resuelto, 5 párrafos guiados y un diagnóstico de 7 observaciones.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/parrafos-cuerpo' },
}

import ParrafosCuerpoClient from './ParrafosCuerpoClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 párrafos de cuerpo"
        path="/practica/ielts/academic/writing/task2/parrafos-cuerpo"
        teaches={['body paragraphs', 'TEEL structure', 'idea development']}
      />
      <ParrafosCuerpoClient />
    </>
  );
}
