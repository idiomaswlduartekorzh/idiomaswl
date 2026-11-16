import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import RussianAdvancedLevelHub from '@/components/practica/RussianAdvancedLevelHub'

export const metadata = advancedLevelMetadata('ruso', 'c2')

export default function Page() {
  return <RussianAdvancedLevelHub level="c2" />
}
