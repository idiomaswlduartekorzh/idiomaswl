import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Japonés B1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/japones/b1/vocabulario"
        description="Ejercicios de vocabulario de Japonés nivel B1: 8 sets temáticos con kanji, romaji y español. Flashcards, opción múltiple y escritura."
      />
      <Content />
    </>
  )
}
