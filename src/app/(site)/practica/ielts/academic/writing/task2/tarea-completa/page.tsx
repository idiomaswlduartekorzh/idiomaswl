import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Tarea Completa — IELTS Writing Task 2 integrado',
  description: 'Practica el IELTS Writing Task 2 completo: planificación, introducción, párrafos cuerpo, conclusión y revisión. Ejercicio integral con checklist Band 7.',
  keywords: ['IELTS task 2 completo', 'IELTS writing task 2 full essay', 'IELTS tarea completa task 2', 'IELTS band 7 essay'],
  openGraph: {
    title: 'IELTS Task 2: Tarea Completa — IELTS Writing Task 2 integrado',
    description: 'Practica el IELTS Writing Task 2 completo: planificación, introducción, párrafos cuerpo, conclusión y revisión. Ejercicio integral con checklist Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/tarea-completa' },
}

import TareaCompletaTask2Client from './TareaCompletaTask2Client';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 tarea completa"
        path="/practica/ielts/academic/writing/task2/tarea-completa"
        teaches={['full essay', 'timed writing', 'self review']}
      />
      <TareaCompletaTask2Client />
    </>
  );
}
