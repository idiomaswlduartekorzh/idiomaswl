import type { GrammarTopic } from '../../types.ts'
import { ellipsisSubstitution, evidentialModality, frontingInformation, registerTransformation } from './pilot-topics.ts'

const topics: GrammarTopic[] = [ellipsisSubstitution, frontingInformation, evidentialModality, registerTransformation]

export default topics
