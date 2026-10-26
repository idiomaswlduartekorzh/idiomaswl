import type { GrammarTopic } from '../../types.ts'
import { b2CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [...b2CurriculumTopics].sort((a, b) => a.order.localeCompare(b.order))

export default topics
