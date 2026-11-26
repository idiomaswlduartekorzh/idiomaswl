import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DilemmaCollection from '@/components/practica/speaking-dilemmas/DilemmaCollection'
import { DILEMMAS_BY_LEVEL } from '@/data/practica/speaking-dilemmas/levels'
import { ADDITIONAL_DILEMMA_LEVELS, dilemmaCollectionPath, isAdditionalDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'

type Props = { params: Promise<{ idioma: string; nivel: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return ADDITIONAL_DILEMMA_LEVELS.map((nivel) => ({ idioma: 'ingles', nivel }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma, nivel } = await params
  if (idioma !== 'ingles' || !isAdditionalDilemmaLevel(nivel)) notFound()

  return {
    title: `20 Speaking Dilemmas for English ${nivel.toUpperCase()} | WeLearn`,
    description: 'Choose from 20 speaking questions with vocabulary cards, short examples and three independent model answers.',
    alternates: { canonical: `https://www.idiomaswl.com${dilemmaCollectionPath(nivel)}` },
  }
}

export default async function Page({ params }: Props) {
  const { idioma, nivel } = await params
  if (idioma !== 'ingles' || !isAdditionalDilemmaLevel(nivel)) notFound()

  return <DilemmaCollection level={nivel} dilemmas={DILEMMAS_BY_LEVEL[nivel]} />
}
