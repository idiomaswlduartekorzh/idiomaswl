import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('portugues', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Portugués A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/portugues/a2/gramatica"
        description="Ejercicios interactivos de gramática de Portugués nivel A2 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
