import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayHub } from '@/components/practica/roleplay/RoleplayExperience'
import { accompaniedSpeakingPath, getRoleplaySet } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'ingles'
const LEVEL = 'b1'
const set = getRoleplaySet(LANGUAGE, LEVEL)
const scenarioCount = set?.scenarios.length ?? 0

export const metadata: Metadata = {
  title: 'Roleplays de inglés B1 en pareja | Idiomas WeLearn',
  description: `${scenarioCount} conversaciones B1 para practicar inglés en pareja con fichas separadas, información oculta, complicaciones y cierres verificables.`,
  alternates: { canonical: `https://www.idiomaswl.com${accompaniedSpeakingPath(LANGUAGE, LEVEL)}` },
}

export default function Page() {
  if (!set) notFound()
  return <RoleplayHub set={set} />
}
