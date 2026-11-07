import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SoloQuestionsClient from '@/components/practica/improvisa/SoloQuestionsClient'
import { getImprovisaExercises } from '@/data/practica/improvisa/catalog'
import { IMPROVISA_LANGUAGES, IMPROVISA_LEVELS, isImprovisaLanguage, isImprovisaLevel, LANGUAGE_NAMES } from '@/data/practica/improvisa/config'

type Params = Promise<{ idioma: string; nivel: string }>

export function generateStaticParams() {
  return IMPROVISA_LANGUAGES.flatMap((idioma) => IMPROVISA_LEVELS.map((nivel) => ({ idioma, nivel })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { idioma, nivel } = await params
  if (!isImprovisaLanguage(idioma) || !isImprovisaLevel(nivel)) return {}
  const name = LANGUAGE_NAMES[idioma].es.toLowerCase()
  return {
    title: `Habla solo en ${name} ${nivel.toUpperCase()}: 20 preguntas | WeLearn`,
    description: `Elige entre 20 preguntas de práctica oral ${nivel.toUpperCase()} en ${name}. Cada ejercicio revela seis palabras sorpresa.`,
    alternates: { canonical: `https://www.idiomaswl.com/practica/${idioma}/${nivel}/habla/solo` },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { idioma, nivel } = await params
  if (!isImprovisaLanguage(idioma) || !isImprovisaLevel(nivel)) notFound()
  return <SoloQuestionsClient language={idioma} level={nivel} exercises={getImprovisaExercises(idioma, nivel)} />
}
