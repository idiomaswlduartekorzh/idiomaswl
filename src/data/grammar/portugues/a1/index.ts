import type { GrammarTopic } from '../../types'
import pronomesPessoais from './pronomes-pessoais'
import serEEstar from './ser-e-estar'
import verboTer from './verbo-ter'
import artigos from './artigos'
import pluralSubstantivos from './plural-substantivos'
import presenteVerbosAr from './presente-verbos-ar'
import presenteVerbosErIr from './presente-verbos-er-ir'
import negacao from './negacao'
import perguntasInterrogativas from './perguntas-interrogativas'
import adjetivosPossessivos from './adjetivos-possessivos'
import adjetivosQualificativos from './adjetivos-qualificativos'
import preposicoesLugar from './preposicoes-lugar'
import contracoes from './contracoes'
import haTemExiste from './ha-tem-existe'
import verbosIrregulares from './verbos-irregulares'
import estarGerundio from './estar-gerundio'
import irFuturo from './ir-futuro'
import adverbiosFrequencia from './adverbios-frequencia'

const topics: GrammarTopic[] = [
  pronomesPessoais,
  serEEstar,
  verboTer,
  artigos,
  pluralSubstantivos,
  presenteVerbosAr,
  presenteVerbosErIr,
  negacao,
  perguntasInterrogativas,
  adjetivosPossessivos,
  adjetivosQualificativos,
  preposicoesLugar,
  contracoes,
  haTemExiste,
  verbosIrregulares,
  estarGerundio,
  irFuturo,
  adverbiosFrequencia,
]

export default topics
