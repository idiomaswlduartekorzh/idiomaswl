import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayToolkitPage } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet, roleplayToolkitPath } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'japones'
const LEVEL = 'a2'

export const metadata: Metadata = {
  title: 'Herramientas para hablar japonés A2 | Idiomas WeLearn',
  description: 'Frases de apoyo para pedir aclaraciones, explicar límites, proponer alternativas y cerrar acuerdos con cortesía en japonés A2.',
  alternates: { canonical: `https://www.idiomaswl.com${roleplayToolkitPath(LANGUAGE, LEVEL)}` },
}

export default function Page() {
  const set = getRoleplaySet(LANGUAGE, LEVEL)
  if (!set) notFound()
  return <RoleplayToolkitPage set={set} />
}
