import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'b1', 'escritura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Scrittura Italiano B1 — Compiti guidati"
        url="https://www.idiomaswl.com/practica/italiano/b1/escritura"
        description="5 compiti di scrittura B1 de italiano: email formali, saggi di opinione, descrizioni comparative con testo modello y lista di verifica."
      />
      <Content />
    </>
  )
}
