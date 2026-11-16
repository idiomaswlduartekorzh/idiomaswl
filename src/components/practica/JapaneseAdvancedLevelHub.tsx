import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { JapaneseAdvancedGrammarLevel } from '@/data/japanese-advanced-grammar-resources'

type Level = Extract<JapaneseAdvancedGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function JapaneseAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="japones" level={level} />
}
