import type { GrammarTopic } from '../../types'
import alfabetoCirilico from './alfabeto-cirilico'
import pronombresPersonales from './pronombres-personales'
import generoSustantivos from './genero-sustantivos'
import presenteVerbos from './presente-verbos'
import negacionNe from './negacion-ne'
import casoNominativo from './caso-nominativo'
import casoAcusativo from './caso-acusativo'
import casoGenitivo from './caso-genitivo'
import adjetivosConcordancia from './adjetivos-concordancia'
import preguntasVopros from './preguntas-vopros'
import preposicionesLugarVNa from './preposiciones-lugar-v-na'
import preposicionesDireccion from './preposiciones-direccion'
import adjetivosPosesivos from './adjetivos-posesivos'
import verbosMovimiento from './verbos-movimiento'
import numeros from './numeros'
import tiempoExpresiones from './tiempo-expresiones'
import futuroByt from './futuro-byt'
import verbosIrregularesBasicos from './verbos-irregulares-basicos'
import imperativo from './imperativo'
import casoDativoBasico from './caso-dativo-basico'

const topics: GrammarTopic[] = [
  alfabetoCirilico,
  pronombresPersonales,
  generoSustantivos,
  presenteVerbos,
  negacionNe,
  casoNominativo,
  casoAcusativo,
  casoGenitivo,
  adjetivosConcordancia,
  preguntasVopros,
  preposicionesLugarVNa,
  preposicionesDireccion,
  adjetivosPosesivos,
  verbosMovimiento,
  numeros,
  tiempoExpresiones,
  futuroByt,
  verbosIrregularesBasicos,
  imperativo,
  casoDativoBasico,
]

export default topics
