import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { ItalianGrammarLevel } from '@/data/italian-grammar-resources'

type Level = Extract<ItalianGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function ItalianAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="italiano" level={level} />
}
