import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import JapaneseAdvancedLevelHub from '@/components/practica/JapaneseAdvancedLevelHub'

export const metadata = advancedLevelMetadata('japones', 'b2')

export default function Page() {
  return <JapaneseAdvancedLevelHub level="b2" />
}
