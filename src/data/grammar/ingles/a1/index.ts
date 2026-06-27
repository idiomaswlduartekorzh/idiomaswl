import type { GrammarTopic } from '../../types'
import subjectPronouns from './subject-pronouns'
import verbToBe from './verb-to-be'
import articles from './articles'
import pluralNouns from './plural-nouns'
import possessiveAdjectives from './possessive-adjectives'
import presentSimpleAffirmative from './present-simple-affirmative'
import presentSimpleNegative from './present-simple-negative'
import objectPronouns from './object-pronouns'
import thereIsThereAre from './there-is-there-are'
import canAbility from './can-ability'

const topics: GrammarTopic[] = [
  subjectPronouns,
  verbToBe,
  articles,
  pluralNouns,
  possessiveAdjectives,
  presentSimpleAffirmative,
  presentSimpleNegative,
  objectPronouns,
  thereIsThereAre,
  canAbility,
]

export default topics
