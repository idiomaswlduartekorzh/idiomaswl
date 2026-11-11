import type { GrammarTopic } from '../../types'
import pronomsSujet from './pronoms-sujet'
import verbeEtre from './verbe-etre'
import verbeAvoir from './verbe-avoir'
import articles from './articles'
import articlesPartitifs from './articles-partitifs'
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
import demonstratifsPresentatifs from './demonstratifs-presentatifs'
import { closeFrenchFoundationTopic } from '../quality-closeout'

const topics: GrammarTopic[] = [
  pronomsSujet,
  verbeEtre,
  verbeAvoir,
  articles,
  articlesPartitifs,
  demonstratifsPresentatifs,
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
].map((topic, index) => closeFrenchFoundationTopic(topic, 'a1', index + 1))

export default topics
