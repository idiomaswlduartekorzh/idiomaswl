import type { GrammarTopic } from '../../types.ts'
import { c1CurriculumTopics } from './curriculum-topics.ts'

const topics: GrammarTopic[] = [...c1CurriculumTopics].sort((a, b) => a.order.localeCompare(b.order))

export default topics
