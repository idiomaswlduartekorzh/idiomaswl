import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('portugues', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Portugués B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/portugues/b1/vocabulario"
        description="Ejercicios de vocabulario de Portugués nivel B1: 8 conjuntos temáticos con flashcards, múltipla escolha e escrita."
      />
      <Content />
    </>
  )
}
