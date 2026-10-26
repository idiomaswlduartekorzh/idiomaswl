import type { GrammarTopic } from '../../types.ts'
import { c2CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [...c2CurriculumTopics].sort((a, b) => a.order.localeCompare(b.order))

export default topics
