import type { GrammarTopic } from '../../types'
import alfabetoCirilico from './alfabeto-cirilico'
import pronombresPersonales from './pronombres-personales'
import generoSustantivos from './genero-sustantivos'
import presenteVerbos from './presente-verbos'
import negacionNe from './negacion-ne'

const topics: GrammarTopic[] = [
  alfabetoCirilico,
  pronombresPersonales,
  generoSustantivos,
  presenteVerbos,
  negacionNe,
]

export default topics
