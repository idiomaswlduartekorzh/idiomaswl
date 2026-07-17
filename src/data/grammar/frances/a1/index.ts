import type { GrammarTopic } from '../../types'
import pronomsSujet from './pronoms-sujet'
import verbeEtre from './verbe-etre'
import verbeAvoir from './verbe-avoir'
import articles from './articles'
import genreNoms from './genre-noms'
import presentVerbesEr from './present-verbes-er'
import negationNePas from './negation-ne-pas'
import questions from './questions'
import adjectifsPossessifs from './adjectifs-possessifs'
import adjectifsQualificatifs from './adjectifs-qualificatifs'
import plurielNoms from './pluriel-noms'
import presentVerbesIr from './present-verbes-ir'
import verbesIrreguliers from './verbes-irreguliers'
import prepositionsLieu from './prepositions-lieu'
import prepositionsTemps from './prepositions-temps'
import futurProche from './futur-proche'
import adverbesFrequence from './adverbes-frequence'
import imperatif from './imperatif'

const topics: GrammarTopic[] = [
  pronomsSujet,
  verbeEtre,
  verbeAvoir,
  articles,
  genreNoms,
  presentVerbesEr,
  negationNePas,
  questions,
  adjectifsPossessifs,
  adjectifsQualificatifs,
  plurielNoms,
  presentVerbesIr,
  verbesIrreguliers,
  prepositionsLieu,
  prepositionsTemps,
  futurProche,
  adverbesFrequence,
  imperatif,
]

export default topics
