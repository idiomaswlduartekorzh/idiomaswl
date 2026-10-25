import type { GrammarTopic } from '../../types.ts'
import { ellipsisSubstitution, evidentialModality, frontingInformation, registerTransformation } from './pilot-topics.ts'
import { c2CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [ellipsisSubstitution, frontingInformation, evidentialModality, registerTransformation, ...c2CurriculumTopics]
  .sort((left, right) => left.order.localeCompare(right.order))

export default topics
