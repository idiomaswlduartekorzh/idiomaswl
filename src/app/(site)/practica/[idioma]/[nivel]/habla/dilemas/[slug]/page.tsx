import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DilemmaExercise from '@/components/practica/speaking-dilemmas/DilemmaExercise'
import { DILEMMA_COPY } from '@/components/practica/speaking-dilemmas/copy'
import { DILEMMA_COLLECTION_PARAMS, loadDilemmaCollection } from '@/data/practica/speaking-dilemmas/catalog'
import { dilemmaPath } from '@/lib/practica/speaking-dilemma-routes'

type Props = { params: Promise<{ idioma: string; nivel: string; slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const collections = await Promise.all(DILEMMA_COLLECTION_PARAMS.map(async ({ idioma, nivel }) => {
    const dilemmas = await loadDilemmaCollection(idioma, nivel)
    return dilemmas.map(({ slug }) => ({ idioma, nivel, slug }))
  }))
  return collections.flat()
}

async function findDilemma(params: Props['params']) {
  const { idioma, nivel, slug } = await params
  const route = DILEMMA_COLLECTION_PARAMS.find((entry) => entry.idioma === idioma && entry.nivel === nivel)
  if (!route) notFound()
  const dilemmas = await loadDilemmaCollection(route.idioma, route.nivel)
  const dilemma = dilemmas.find((item) => item.slug === slug)
  if (!dilemma) notFound()
  return { ...route, dilemma }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma, dilemma, nivel } = await findDilemma(params)
  return {
    title: `${dilemma.title} — ${DILEMMA_COPY[idioma].speaking} ${nivel.toUpperCase()} | WeLearn`,
    description: dilemma.prompt,
    alternates: { canonical: `https://www.idiomaswl.com${dilemmaPath(nivel, dilemma.slug, idioma)}` },
  }
}

export default async function Page({ params }: Props) {
  const { idioma, dilemma, nivel } = await findDilemma(params)
  return <DilemmaExercise level={nivel} language={idioma} dilemma={dilemma} />
}
