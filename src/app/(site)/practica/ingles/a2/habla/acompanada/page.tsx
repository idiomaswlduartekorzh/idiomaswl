import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayHub } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet } from '@/data/practica/habla-acompanado'

export const metadata: Metadata = {
  title: 'Roleplays de inglés A2 en pareja | Idiomas WeLearn',
  description: 'Ocho conversaciones A2 para practicar inglés en pareja con fichas separadas, información oculta, complicaciones y cierres verificables.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2/habla/acompanada' },
}

export default function Page() {
  const set = getRoleplaySet('ingles', 'a2')
  if (!set) notFound()
  return <RoleplayHub set={set} />
}
