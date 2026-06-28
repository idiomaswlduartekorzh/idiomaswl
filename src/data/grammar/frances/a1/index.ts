import type { GrammarTopic } from '../../types'
import pronomsSujet from './pronoms-sujet'
import verbeEtre from './verbe-etre'
import verbeAvoir from './verbe-avoir'
import articles from './articles'
import genreNoms from './genre-noms'
import presentVerbesEr from './present-verbes-er'

const topics: GrammarTopic[] = [
  pronomsSujet,
  verbeEtre,
  verbeAvoir,
  articles,
  genreNoms,
  presentVerbesEr,
]

export default topics
