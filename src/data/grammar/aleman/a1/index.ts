import type { GrammarTopic } from '../../types'
import personalpronomen from './personalpronomen'
import verbSein from './verb-sein'
import verbHaben from './verb-haben'
import artikel from './artikel'
import pluralNomen from './plural-nomen'
import prasensRegelmaessig from './prasens-regelmaessig'

const topics: GrammarTopic[] = [
  personalpronomen,
  verbSein,
  verbHaben,
  artikel,
  pluralNomen,
  prasensRegelmaessig,
]

export default topics
