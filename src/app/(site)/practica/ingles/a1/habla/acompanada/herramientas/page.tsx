import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayToolkitPage } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet, roleplayToolkitPath } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'ingles'
const LEVEL = 'a1'

export const metadata: Metadata = {
  title: 'Caja de herramientas para hablar inglés A1 | Idiomas WeLearn',
  description: 'Frases cortas para abrir y cerrar conversaciones, pedir repetición, decir no, explicar una razón y verificar acuerdos en inglés A1.',
  alternates: { canonical: `https://www.idiomaswl.com${roleplayToolkitPath(LANGUAGE, LEVEL)}` },
}

export default function Page() {
  const set = getRoleplaySet(LANGUAGE, LEVEL)
  if (!set) notFound()
  return <RoleplayToolkitPage set={set} />
}
