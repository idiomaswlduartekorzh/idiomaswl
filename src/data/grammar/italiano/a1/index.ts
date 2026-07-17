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

const topics: GrammarTopic[] = [
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
]

export default topics
