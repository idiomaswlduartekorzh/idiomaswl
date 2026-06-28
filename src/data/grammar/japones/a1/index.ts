import type { GrammarTopic } from '../../types'
import hiraganaBasico from './hiragana-basico'
import estructuraSovParticulas from './estructura-sov-particulas'
import desuMasu from './desu-masu'
import particulaWaGa from './particula-wa-ga'
import particulaWoNi from './particula-wo-ni'

const topics: GrammarTopic[] = [
  hiraganaBasico,
  estructuraSovParticulas,
  desuMasu,
  particulaWaGa,
  particulaWoNi,
]

export default topics
