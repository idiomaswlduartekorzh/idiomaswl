import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank'
import { IELTS_TASK2_PROMPT_BANK } from '@/data/practica-exams/seo-catalog'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2'

const FAQS = [
  {
    question: '¿Qué pide IELTS Academic Writing Task 2?',
    answer:
      'Pide escribir un ensayo de al menos 250 palabras en respuesta a un punto de vista, argumento o problema. La respuesta debe desarrollar una posición clara con ideas organizadas.',
  },
  {
    question: '¿Los tipos de ensayo son categorías oficiales?',
    answer:
      'No son nombres oficiales de tareas separadas. WeLearn los usa como categorías pedagógicas para practicar instrucciones frecuentes como opinion, discussion, advantages/disadvantages, problem-solution y direct question.',
  },
]

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 2 — Ensayo argumentativo Band 7',
  description: 'Practica el IELTS Writing Task 2: tipos de ensayo, introducción, párrafos cuerpo, linking language, conclusión y tarea completa. Estrategias pedagógicas Band 7+.',
  keywords: ['IELTS writing task 2', 'IELTS task 2 ejercicios', 'IELTS ensayo argumentativo', 'IELTS task 2 band 7', 'IELTS opinion essay', 'IELTS linking words'],
  openGraph: {
    title: 'IELTS Writing Task 2',
    description: 'Ejercicios progresivos de IELTS Writing Task 2: ensayo argumentativo paso a paso.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: URL },
}

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing Task 2"
        url={URL}
        description="Hub de práctica para IELTS Academic Writing Task 2 con habilidades de ensayo, tipos de prompt y banco original."
        teaches={[
          'IELTS Academic Writing Task 2',
          'essay planning',
          'opinion essay',
          'discussion essay',
          'problem solution essay',
          'direct question essay',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: URL },
        ]}
      />
      <Content />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <IeltsTask2PromptBank prompts={IELTS_TASK2_PROMPT_BANK} />
        </div>
      </section>
    </>
  )
}
