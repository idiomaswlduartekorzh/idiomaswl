import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DilemmaExercise from '@/components/practica/speaking-dilemmas/DilemmaExercise'
import { DILEMMAS_BY_LEVEL } from '@/data/practica/speaking-dilemmas/levels'
import { ADDITIONAL_DILEMMA_LEVELS, dilemmaPath, isAdditionalDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'

type Props = { params: Promise<{ idioma: string; nivel: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return ADDITIONAL_DILEMMA_LEVELS.flatMap((nivel) => (
    DILEMMAS_BY_LEVEL[nivel].map(({ slug }) => ({ idioma: 'ingles', nivel, slug }))
  ))
}

async function findDilemma(params: Props['params']) {
  const { idioma, nivel, slug } = await params
  if (idioma !== 'ingles' || !isAdditionalDilemmaLevel(nivel)) notFound()
  const dilemma = DILEMMAS_BY_LEVEL[nivel].find((item) => item.slug === slug)
  if (!dilemma) notFound()
  return { dilemma, nivel }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dilemma, nivel } = await findDilemma(params)
  return {
    title: `${dilemma.title} — Speaking ${nivel.toUpperCase()} | WeLearn`,
    description: dilemma.prompt,
    alternates: { canonical: `https://www.idiomaswl.com${dilemmaPath(nivel, dilemma.slug)}` },
  }
}

export default async function Page({ params }: Props) {
  const { dilemma, nivel } = await findDilemma(params)
  return <DilemmaExercise level={nivel} dilemma={dilemma} />
}
