import AdvancedLevelSkillHub from './AdvancedLevelSkillHub'
import type { KoreanAdvancedGrammarLevel } from '@/data/korean-advanced-grammar-resources'

type Level = Extract<KoreanAdvancedGrammarLevel, 'b2' | 'c1' | 'c2'>

export default function KoreanAdvancedLevelHub({ level }: { level: Level }) {
  return <AdvancedLevelSkillHub language="coreano" level={level} />
}
