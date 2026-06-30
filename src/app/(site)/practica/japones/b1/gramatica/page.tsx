import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Japonés B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/japones/b1/gramatica"
        description="Ejercicios de gramática de Japonés nivel B1: 〜てもいい/〜てはいけない, 受身形 (voz pasiva), 使役形 (causativa), 〜たら y 〜のに."
      />
      <Content />
    </>
  )
}
