import { advancedLevelMetadata } from '@/components/practica/AdvancedLevelSkillHub'
import ItalianAdvancedLevelHub from '@/components/practica/ItalianAdvancedLevelHub'

export const metadata = advancedLevelMetadata('italiano', 'c1')

export default function Page() {
  return <ItalianAdvancedLevelHub level="c1" />
}
