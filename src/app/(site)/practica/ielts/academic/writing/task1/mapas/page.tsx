import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Mapas — Descripción de cambios espaciales',
  description: 'Ejercicios para describir mapas en el IELTS Writing Task 1. Vocabulario de cambio espacial, comparaciones temporales y estructura Band 7.',
  keywords: ['IELTS mapas','IELTS task 1 mapa','IELTS map task 1','IELTS spatial change'],
  openGraph: {
    title: 'IELTS Task 1: Mapas — Descripción de cambios espaciales',
    description: 'Ejercicios para describir mapas en el IELTS Writing Task 1. Vocabulario de cambio espacial, comparaciones temporales y estructura Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/mapas' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 mapas"
        path="/practica/ielts/academic/writing/task1/mapas"
        teaches={['map description', 'spatial language', 'change over time']}
      />
      <Content />
    </>
  )
}
