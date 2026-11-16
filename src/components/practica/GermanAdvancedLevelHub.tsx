import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { GermanGrammarLevel } from '@/data/german-grammar-resources'

type Level = Extract<GermanGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function GermanAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="aleman" level={level} />
}
