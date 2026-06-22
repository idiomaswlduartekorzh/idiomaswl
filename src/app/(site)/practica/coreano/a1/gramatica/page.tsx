import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Coreano A1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/coreano/a1/gramatica"
        description="Ejercicios interactivos de gramática de Coreano nivel A1 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
