import type { GrammarTopic } from '../../types'
import pasadoVerbos from './pasado-verbos'
import aspectoVerbal from './aspecto-verbal'
import futuroImperfectivo from './futuro-imperfectivo'
import futuroPerfectivo from './futuro-perfectivo'
import genitivoCantidad from './genitivo-cantidad'
import dativoUso from './dativo-uso'
import instrumentalUso from './instrumental-uso'
import prepositivo from './prepositivo-avanzado'
import acusativoMovimiento from './acusativo-movimiento'
import verbosMovimiento from './verbos-movimiento'
import comparativos from './comparativos'
import superlativos from './superlativos'
import pronombreReflexivos from './pronombres-reflexivos'
import verbosPrefijados from './verbos-prefijados'
import condicional from './condicional'
import imperativo from './imperativo'
import oracionesSubordinadas from './oraciones-subordinadas'
import pronombreRelativo from './pronombres-relativos'
import adverbiosTiempo from './adverbios-tiempo'
import pluralesIrregulares from './plurales-irregulares'

const topics: GrammarTopic[] = [
  pasadoVerbos,
  aspectoVerbal,
  futuroImperfectivo,
  futuroPerfectivo,
  genitivoCantidad,
  dativoUso,
  instrumentalUso,
  prepositivo,
  acusativoMovimiento,
  verbosMovimiento,
  comparativos,
  superlativos,
  pronombreReflexivos,
  verbosPrefijados,
  condicional,
  imperativo,
  oracionesSubordinadas,
  pronombreRelativo,
  adverbiosTiempo,
  pluralesIrregulares,
]

export default topics
