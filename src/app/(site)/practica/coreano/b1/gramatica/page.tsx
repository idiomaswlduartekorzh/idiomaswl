import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Coreano B1 — Condicionales, obligación, capacidad y razón"
        url="https://idiomaswl.com/practica/coreano/b1/gramatica"
        description="5 temas de gramática B1 coreano: -(으)면, -아/어야 하다, -(으)ㄹ 수 있다, -기 때문에, -는데. 50+ ejercicios interactivos."
      />
      <Content />
    </>
  )
}
