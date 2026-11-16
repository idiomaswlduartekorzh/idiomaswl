import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import KoreanAdvancedLevelHub from '@/components/practica/KoreanAdvancedLevelHub'

export const metadata = advancedLevelMetadata('coreano', 'c1')

export default function Page() {
  return <KoreanAdvancedLevelHub level="c1" />
}
