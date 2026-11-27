import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DilemmaCollection from '@/components/practica/speaking-dilemmas/DilemmaCollection'
import { DILEMMA_COPY } from '@/components/practica/speaking-dilemmas/copy'
import { LANGUAGE_NAMES } from '@/data/practica/improvisa/config'
import { DILEMMA_COLLECTION_PARAMS, loadDilemmaCollection } from '@/data/practica/speaking-dilemmas/catalog'
import { dilemmaCollectionPath } from '@/lib/practica/speaking-dilemma-routes'

type Props = { params: Promise<{ idioma: string; nivel: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return DILEMMA_COLLECTION_PARAMS
}

async function findCollection(params: Props['params']) {
  const { idioma, nivel } = await params
  const route = DILEMMA_COLLECTION_PARAMS.find((entry) => entry.idioma === idioma && entry.nivel === nivel)
  if (!route) notFound()
  return route
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma, nivel } = await findCollection(params)
  const copy = DILEMMA_COPY[idioma]
  const level = nivel.toUpperCase()
  return {
    title: idioma === 'ingles'
      ? `20 Speaking Dilemmas for English ${level} | WeLearn`
      : `${copy.collection} · ${LANGUAGE_NAMES[idioma].target} ${level} | WeLearn`,
    description: idioma === 'ingles'
      ? 'Choose from 20 speaking questions with vocabulary cards, short examples and three independent model answers.'
      : copy.collectionHint,
    alternates: { canonical: `https://www.idiomaswl.com${dilemmaCollectionPath(nivel, idioma)}` },
  }
}

export default async function Page({ params }: Props) {
  const { idioma, nivel } = await findCollection(params)
  const dilemmas = await loadDilemmaCollection(idioma, nivel)
  return <DilemmaCollection level={nivel} language={idioma} dilemmas={dilemmas} />
}
