import PrototypeBriefing from '@/components/practica/roleplay/prototype/PrototypeBriefing'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  speakingPrototype,
  speakingPrototypeRolePath,
  speakingPrototypeRoles,
} from '@/data/practica/habla-prototipo'

export default function Page() {
  const roles = (['a', 'b'] as const).map((roleId) => ({
    id: roleId,
    label: speakingPrototypeRoles[roleId].label,
    href: speakingPrototypeRolePath(roleId),
    starts: roleId === 'a',
  }))

  return <PrototypeBriefing accent={SKILL_ACCENT.habla.var} brief={speakingPrototype} roles={roles} />
}
