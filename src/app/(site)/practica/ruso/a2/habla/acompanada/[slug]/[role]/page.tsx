import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayRolePage } from '@/components/practica/roleplay/RoleplayExperience'
import {
  getRoleplayRole,
  getRoleplayScenario,
  getRoleplaySet,
  isRoleId,
  roleplayRolePath,
} from '@/data/practica/habla-acompanado'
import { fitDescription, fitTitle } from '@/lib/seo-snippet'

type Props = { params: Promise<{ slug: string; role: string }> }
const LANGUAGE = 'ruso'
const LEVEL = 'a2'

export function generateStaticParams() {
  return getRoleplaySet(LANGUAGE, LEVEL)?.scenarios.flatMap((scenario) => [
    { slug: scenario.slug, role: 'a' },
    { slug: scenario.slug, role: 'b' },
  ]) ?? []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, role } = await params
  const scenario = getRoleplayScenario(LANGUAGE, LEVEL, slug)
  if (!scenario || !isRoleId(role)) return { title: 'Ficha no encontrada', robots: { index: false } }
  const selectedRole = getRoleplayRole(scenario, role)
  if (!selectedRole) return { title: 'Ficha no encontrada', robots: { index: false } }
  const url = `https://www.idiomaswl.com${roleplayRolePath(scenario, role)}`
  return {
    title: fitTitle(`${scenario.title}: rol ${role.toUpperCase()} — Speaking A2`),
    description: fitDescription(`Ficha del rol ${role.toUpperCase()} para practicar “${scenario.title}” en ruso A2 con otra persona.`),
    alternates: { canonical: url },
  }
}

export default async function Page({ params }: Props) {
  const { slug, role } = await params
  const scenario = getRoleplayScenario(LANGUAGE, LEVEL, slug)
  if (!getRoleplaySet(LANGUAGE, LEVEL) || !scenario || !isRoleId(role)) notFound()
  const selectedRole = getRoleplayRole(scenario, role)
  if (!selectedRole) notFound()
  return <RoleplayRolePage role={selectedRole} scenario={scenario} />
}
