import type { GrammarTopic } from '../../types'
import hangulBasico from './hangul-basico'
import estructuraSov from './estructura-sov'
import ieoyo from './ieoyo-yeyo'
import marcadoresTemaSujeto from './marcadores-tema-sujeto'
import isseoyo from './isseoyo-eopsoyo'

const topics: GrammarTopic[] = [
  hangulBasico,
  estructuraSov,
  ieoyo,
  marcadoresTemaSujeto,
  isseoyo,
]

export default topics
