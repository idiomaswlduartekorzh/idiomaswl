import type { GrammarTopic } from '../../types'
import hangulBasico from './hangul-basico'
import estructuraSov from './estructura-sov'
import ieoyo from './ieoyo-yeyo'
import marcadoresTemaSujeto from './marcadores-tema-sujeto'
import isseoyo from './isseoyo-eopsoyo'
import haeyoPresente from './haeyo-presente'
import marcadorObjeto from './marcador-objeto'
import marcadorLugarE from './marcador-lugar-e'
import marcadorLugarEseo from './marcador-lugar-eseo'
import negacion from './negacion'
import interrogativos from './interrogativos'
import numerosSinoCoreanos from './numeros-sino-coreanos'
import numerosNativosContadores from './numeros-nativos-contadores'
import tiempoHoras from './tiempo-horas'
import quererGoshipda from './querer-goshipda'
import conjuncionHago from './conjuncion-hago'
import pasadoAsseoyo from './pasado-asseoyo'
import adverbiosTiempo from './adverbios-tiempo'
import formaFormalHabnida from './forma-formal-habnida'
import expresionesCotidianas from './expresiones-cotidianas'

const topics: GrammarTopic[] = [
  hangulBasico,
  estructuraSov,
  ieoyo,
  marcadoresTemaSujeto,
  isseoyo,
  haeyoPresente,
  marcadorObjeto,
  marcadorLugarE,
  marcadorLugarEseo,
  negacion,
  interrogativos,
  numerosSinoCoreanos,
  numerosNativosContadores,
  tiempoHoras,
  quererGoshipda,
  conjuncionHago,
  pasadoAsseoyo,
  adverbiosTiempo,
  formaFormalHabnida,
  expresionesCotidianas,
]

export default topics
