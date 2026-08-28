import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a2', 'escritura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Escritura en Japonés A2 — Tareas guiadas"
        url="https://www.idiomaswl.com/practica/japones/a2/escritura"
        description="5 tareas de escritura en japonés nivel A2: emails, relatos, comparaciones y más. Con modelo, criterios y checklist."
      />
      <Content />
    </>
  )
}
