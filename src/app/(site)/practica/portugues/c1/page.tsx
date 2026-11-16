import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import PortugueseAdvancedLevelHub from '@/components/practica/PortugueseAdvancedLevelHub'

export const metadata = advancedLevelMetadata('portugues', 'c1')

export default function Page() {
  return <PortugueseAdvancedLevelHub level="c1" />
}
