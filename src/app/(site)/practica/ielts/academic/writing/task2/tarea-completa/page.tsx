import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Tarea Completa — IELTS Writing Task 2 integrado',
  description: '25 enunciados de las cinco familias, cada uno con su ensayo modelo completo. Planifica, escribe con temporizador de 40 minutos y compara párrafo a párrafo.',
  keywords: ['IELTS task 2 completo', 'IELTS writing task 2 full essay', 'IELTS tarea completa task 2', 'IELTS band 7 essay'],
  openGraph: {
    title: 'IELTS Task 2: Tarea Completa — IELTS Writing Task 2 integrado',
    description: '25 enunciados de las cinco familias, cada uno con su ensayo modelo completo. Planifica, escribe con temporizador de 40 minutos y compara párrafo a párrafo.',
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
