import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import GermanAdvancedLevelHub from '@/components/practica/GermanAdvancedLevelHub'

export const metadata = advancedLevelMetadata('aleman', 'c1')

export default function Page() {
  return <GermanAdvancedLevelHub level="c1" />
}
