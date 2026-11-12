import type { GrammarTopic } from '../../types'
import congiuntivoPresente from './congiuntivo-presente-b1'
import congiuntivoPassato from './congiuntivo-passato-b1'
import condizionalePassato from './condizionale-passato-b1'
import trapassatoProssimo from './trapassato-prossimo-b1'
import futuroAnteriore from './futuro-anteriore-b1'
import periodoIpotetico from './periodo-ipotetico-b1'
import supplementTopics from './supplement-topics'
import { closeItalianFoundationTopic } from '../quality-closeout'

const sourceTopics: GrammarTopic[] = [
  congiuntivoPresente,
  congiuntivoPassato,
  condizionalePassato,
  trapassatoProssimo,
  futuroAnteriore,
  periodoIpotetico,
  ...supplementTopics,
]

const topics = sourceTopics.map((topic, index) => closeItalianFoundationTopic(topic, 'b1', index + 1))

export default topics
