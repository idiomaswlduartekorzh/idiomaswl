import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import GermanAdvancedLevelHub from '@/components/practica/GermanAdvancedLevelHub'

export const metadata = advancedLevelMetadata('aleman', 'b2')

export default function Page() {
  return <GermanAdvancedLevelHub level="b2" />
}
