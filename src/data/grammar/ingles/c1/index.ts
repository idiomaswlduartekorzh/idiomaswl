import type { GrammarTopic } from '../../types.ts'
import { cleftSentences, hedgingStance, inversionEmphasis, nominalisation } from './pilot-topics.ts'
import { c1CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [inversionEmphasis, cleftSentences, hedgingStance, nominalisation, ...c1CurriculumTopics]
  .sort((left, right) => left.order.localeCompare(right.order))

export default topics
