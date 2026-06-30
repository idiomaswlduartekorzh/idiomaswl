import type { GrammarTopic } from '../../types'
import pronomiSoggetto from './pronomi-soggetto'
import verboEssere from './verbo-essere'
import verboAvere from './verbo-avere'
import articoli from './articoli'
import genereNumero from './genere-numero'
import presenteVerbiAre from './presente-verbi-are'

const topics: GrammarTopic[] = [
  pronomiSoggetto,
  verboEssere,
  verboAvere,
  articoli,
  genereNumero,
  presenteVerbiAre,
]

export default topics
