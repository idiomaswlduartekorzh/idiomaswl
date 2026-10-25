import type { GrammarTopic } from '../../types.ts'
import { mixedConditionals, modalPerfects, participleClauses, reportingPassives } from './pilot-topics.ts'
import { b2CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [mixedConditionals, modalPerfects, reportingPassives, participleClauses, ...b2CurriculumTopics]
  .sort((left, right) => left.order.localeCompare(right.order))

export default topics
