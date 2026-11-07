import type { Metadata } from 'next'
import SoloQuestionsClient from '@/components/practica/improvisa/SoloQuestionsClient'
import { getImprovisaExercises } from '@/data/practica/improvisa/catalog'

export const metadata: Metadata = {
  title: 'Habla solo ingles A1: 20 preguntas | WeLearn',
  description: 'Elige entre 20 preguntas de práctica oral A1. Cada reto revela seis palabras sorpresa.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a1/habla/solo' },
}

export default function Page() {
  return <SoloQuestionsClient language="ingles" level="a1" exercises={getImprovisaExercises('ingles', 'a1')} />
}
