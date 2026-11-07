import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ImprovisaClient from '@/components/practica/improvisa/ImprovisaClient'
import { getImprovisaExercises } from '@/data/practica/improvisa/catalog'
import {
  IMPROVISA_LANGUAGES, IMPROVISA_LEVELS,
  isImprovisaLanguage, isImprovisaLevel, LANGUAGE_NAMES, improvisaPath,
} from '@/data/practica/improvisa/config'

type Params = Promise<{ idioma: string; nivel: string }>

export function generateStaticParams() {
  return IMPROVISA_LANGUAGES.flatMap((idioma) => IMPROVISA_LEVELS.map((nivel) => ({ idioma, nivel })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { idioma, nivel } = await params
  if (!isImprovisaLanguage(idioma) || !isImprovisaLevel(nivel)) return {}
  const name = LANGUAGE_NAMES[idioma].es.toLowerCase()
  return {
    title: `Improvisa en ${name} ${nivel.toUpperCase()}: 20 retos orales | WeLearn`,
    description: `20 ejercicios progresivos de expresión oral ${nivel.toUpperCase()} en ${name}, con preguntas y seis palabras sorpresa por ronda.`,
    alternates: { canonical: `https://www.idiomaswl.com${improvisaPath(idioma, nivel)}` },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { idioma, nivel } = await params
  if (!isImprovisaLanguage(idioma) || !isImprovisaLevel(nivel)) notFound()
  return <ImprovisaClient language={idioma} level={nivel} exercises={getImprovisaExercises(idioma, nivel)} />
}
