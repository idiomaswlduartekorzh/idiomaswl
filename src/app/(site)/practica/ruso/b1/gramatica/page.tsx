import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ruso', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Ruso B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/ruso/b1/gramatica"
        description="Ejercicios interactivos de gramática de Ruso nivel B1: aspectos verbales, caso instrumental, genitivo plural, condicionales y participios."
      />
      <Content />
    </>
  )
}
