import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Italiano A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/italiano/a2/gramatica"
        description="Ejercicios interactivos de gramática de Italiano nivel A2 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
