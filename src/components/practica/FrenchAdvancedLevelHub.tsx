import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { FrenchGrammarLevel } from '@/data/french-grammar-resources'

type Level = Extract<FrenchGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function FrenchAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="frances" level={level} />
}
