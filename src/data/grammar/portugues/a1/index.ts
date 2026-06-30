import type { GrammarTopic } from '../../types'
import pronomesPessoais from './pronomes-pessoais'
import serEEstar from './ser-e-estar'
import verboTer from './verbo-ter'
import artigos from './artigos'
import pluralSubstantivos from './plural-substantivos'
import presenteVerbosAr from './presente-verbos-ar'

const topics: GrammarTopic[] = [
  pronomesPessoais,
  serEEstar,
  verboTer,
  artigos,
  pluralSubstantivos,
  presenteVerbosAr,
]

export default topics
