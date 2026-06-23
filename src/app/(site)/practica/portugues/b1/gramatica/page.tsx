import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('portugues', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Portugués B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/portugues/b1/gramatica"
        description="Ejercicios interactivos de gramática de Portugués nivel B1: subjuntivo, condicional, voz passiva, pronomes relativos e discurso indireto."
      />
      <Content />
    </>
  )
}
