import { notFound } from 'next/navigation'
import PrototypeRole from '@/components/practica/roleplay/prototype/PrototypeRole'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  isSpeakingPrototypeRole,
  SPEAKING_PROTOTYPE_PATH,
  speakingPrototype,
  speakingPrototypeRoles,
} from '@/data/practica/habla-prototipo'

type Props = { params: Promise<{ role: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return [{ role: 'a' }, { role: 'b' }]
}

export default async function Page({ params }: Props) {
  const { role } = await params
  if (!isSpeakingPrototypeRole(role)) notFound()

  return (
    <PrototypeRole
      accent={SKILL_ACCENT.habla.var}
      brief={speakingPrototype}
      role={speakingPrototypeRoles[role]}
      backHref={SPEAKING_PROTOTYPE_PATH}
    />
  )
}
