import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Reading — práctica Academic y General Training',
  description: 'Practica IELTS Academic Reading: True/False/Not Given con pasaje real, feedback inmediato y estrategias para Band 6–8.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/reading' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/reading'

const FAQS = [
  {
    question: '¿Qué se practica en IELTS Reading?',
    answer:
      'IELTS Reading exige leer textos y responder tipos oficiales como multiple choice, matching, completion, diagram labeling, true/false/not given y short-answer questions.',
  },
  {
    question: '¿Skimming y scanning son tipos oficiales de pregunta?',
    answer:
      'No. Skimming y scanning son habilidades WeLearn de lectura que ayudan a resolver tipos oficiales, pero viven separadas de las rutas de tipos de pregunta.',
  },
]

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Reading práctica"
        url={URL}
        description="Práctica de IELTS Reading con tipos oficiales de pregunta, habilidades WeLearn y ejercicios con respuestas explicadas."
        teaches={['IELTS Reading', 'true false not given', 'matching', 'completion', 'reading skills']}
        isPartOf={{ name: 'IELTS Academic', url: 'https://www.idiomaswl.com/practica/ielts/academic' }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS Reading', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
