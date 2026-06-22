import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Japonés A1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/japones/a1/gramatica"
        description="Ejercicios interactivos de gramática de Japonés nivel A1 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
