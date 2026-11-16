import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { RussianAdvancedGrammarLevel } from '@/data/russian-advanced-grammar-resources'

type Level = Extract<RussianAdvancedGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function RussianAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="ruso" level={level} />
}
