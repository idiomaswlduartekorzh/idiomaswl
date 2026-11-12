import type { GrammarTopic } from '../../types'
import pronomiSoggetto from './pronomi-soggetto'
import verboEssere from './verbo-essere'
import verboAvere from './verbo-avere'
import articoli from './articoli'
import genereNumero from './genere-numero'
import presenteVerbiAre from './presente-verbi-are'
import presenteVerbiEreIre from './presente-verbi-ere-ire'
import negazione from './negazione'
import domandeInterrogativi from './domande-interrogativi'
import aggettiviPossessivi from './aggettivi-possessivi'
import aggettiviQualificativi from './aggettivi-qualificativi'
import preposizioniSemplici from './preposizioni-semplici'
import preposizioniArticolate from './preposizioni-articolate'
import ceCiSono from './ce-ci-sono'
import verbiIrregolari from './verbi-irregolari'
import stareGerundio from './stare-gerundio'
import imperativo from './imperativo'
import avverbiFrequenza from './avverbi-frequenza'
import supplementTopics from './supplement-topics'
import { closeItalianFoundationTopic } from '../quality-closeout'

const sourceTopics: GrammarTopic[] = [
  pronomiSoggetto,
  verboEssere,
  verboAvere,
  articoli,
  genereNumero,
  presenteVerbiAre,
  presenteVerbiEreIre,
  negazione,
  domandeInterrogativi,
  aggettiviPossessivi,
  aggettiviQualificativi,
  preposizioniSemplici,
  preposizioniArticolate,
  ceCiSono,
  verbiIrregolari,
  stareGerundio,
  imperativo,
  avverbiFrequenza,
  ...supplementTopics,
]

const topics = sourceTopics.map((topic, index) => closeItalianFoundationTopic(topic, 'a1', index + 1))

export default topics
