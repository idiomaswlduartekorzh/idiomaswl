import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import PortugueseAdvancedLevelHub from '@/components/practica/PortugueseAdvancedLevelHub'

export const metadata = advancedLevelMetadata('portugues', 'b2')

export default function Page() {
  return <PortugueseAdvancedLevelHub level="b2" />
}
