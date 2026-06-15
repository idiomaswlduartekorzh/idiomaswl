import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ingles', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Inglés A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/ingles/a2/gramatica"
        description="Ejercicios interactivos de gramática de Inglés nivel A2 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
