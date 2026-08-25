import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayScenarioSetup } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplayScenario, getRoleplaySet, roleplayScenarioPath } from '@/data/practica/habla-acompanado'
import { fitDescription, fitTitle } from '@/lib/seo-snippet'

type Props = { params: Promise<{ slug: string }> }
const LANGUAGE = 'japones'
const LEVEL = 'a2'

export function generateStaticParams() {
  return getRoleplaySet(LANGUAGE, LEVEL)?.scenarios.map((scenario) => ({ slug: scenario.slug })) ?? []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const scenario = getRoleplayScenario(LANGUAGE, LEVEL, slug)
  if (!scenario) return { title: 'Escenario no encontrado', robots: { index: false } }
  const url = `https://www.idiomaswl.com${roleplayScenarioPath(scenario)}`
  return {
    title: fitTitle(`${scenario.title} — Roleplay en japonés A2`),
    description: fitDescription(`${scenario.settingEs} Juego de rol de ${scenario.minutes} minutos para dos personas, con fichas separadas y práctica de japonés A2.`),
    alternates: { canonical: url },
    openGraph: { title: scenario.title, description: scenario.settingEs, url, type: 'article', locale: 'es_CO' },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const scenario = getRoleplayScenario(LANGUAGE, LEVEL, slug)
  if (!scenario) notFound()
  return <RoleplayScenarioSetup scenario={scenario} />
}
