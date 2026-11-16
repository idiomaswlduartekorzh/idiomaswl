import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import FrenchAdvancedLevelHub from '@/components/practica/FrenchAdvancedLevelHub'

export const metadata = advancedLevelMetadata('frances', 'c1')

export default function Page() {
  return <FrenchAdvancedLevelHub level="c1" />
}
