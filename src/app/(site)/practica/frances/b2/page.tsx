import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import FrenchAdvancedLevelHub from '@/components/practica/FrenchAdvancedLevelHub'

export const metadata = advancedLevelMetadata('frances', 'b2')

export default function Page() {
  return <FrenchAdvancedLevelHub level="b2" />
}
