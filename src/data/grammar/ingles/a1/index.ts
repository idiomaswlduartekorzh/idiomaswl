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
import presentSimpleQuestions from './present-simple-questions'
import demonstratives from './demonstratives'
import adjectivesBasic from './adjectives-basic'
import prepositionsPlace from './prepositions-place'
import presentContinuous from './present-continuous'

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
  presentSimpleQuestions,
  demonstratives,
  adjectivesBasic,
  prepositionsPlace,
  presentContinuous,
]

export default topics
