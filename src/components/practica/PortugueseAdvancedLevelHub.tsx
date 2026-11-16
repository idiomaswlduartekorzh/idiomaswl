import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { PortugueseGrammarLevel } from '@/data/portuguese-grammar-resources'

type Level = Extract<PortugueseGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function PortugueseAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="portugues" level={level} />
}
