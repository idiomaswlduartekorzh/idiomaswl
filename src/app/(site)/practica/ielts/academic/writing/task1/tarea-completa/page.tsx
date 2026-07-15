import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Tarea Completa — Writing Task 1 integrado',
  description: 'Practica el IELTS Writing Task 1 completo desde introducción hasta overview y detalles. Ejercicio integral con checklist Band 6–7.',
  keywords: ['IELTS task 1 completo','IELTS writing task 1 full','IELTS tarea completa','IELTS band 7 writing'],
  openGraph: {
    title: 'IELTS Task 1: Tarea Completa — Writing Task 1 integrado',
    description: 'Practica el IELTS Writing Task 1 completo desde introducción hasta overview y detalles. Ejercicio integral con checklist Band 6–7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tarea-completa' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 tarea completa"
        path="/practica/ielts/academic/writing/task1/tarea-completa"
        teaches={['full task response', 'timed writing', 'self review']}
      />
      <Content />
    </>
  )
}
