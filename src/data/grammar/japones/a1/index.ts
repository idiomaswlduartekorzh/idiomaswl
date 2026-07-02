import type { GrammarTopic } from '../../types'
import hiraganaBasico from './hiragana-basico'
import estructuraSovParticulas from './estructura-sov-particulas'
import desuMasu from './desu-masu'
import particulaWaGa from './particula-wa-ga'
import particulaWoNi from './particula-wo-ni'
import katakanaBasico from './katakana-basico'
import particulaDeE from './particula-de-e'
import arimasuImasu from './arimasu-imasu'
import iKeiyoshi from './i-keiyoshi'
import naKeiyoshi from './na-keiyoshi'
import masuKeiConjugacion from './masu-kei-conjugacion'
import interrogativosKa from './interrogativos-ka'
import numerosContadores from './numeros-contadores'
import jikanTiempo from './jikan-tiempo'
import taiForm from './tai-form'
import teFormPermission from './te-form-permission'
import adverbiosFrecuencia from './adverbios-frecuencia'
import negacionCompleta from './negacion-completa'
import conjunciones from './conjunciones'
import expresionesCotidianas from './expresiones-cotidianas'

const topics: GrammarTopic[] = [
  hiraganaBasico,
  estructuraSovParticulas,
  desuMasu,
  particulaWaGa,
  particulaWoNi,
  katakanaBasico,
  particulaDeE,
  arimasuImasu,
  iKeiyoshi,
  naKeiyoshi,
  masuKeiConjugacion,
  interrogativosKa,
  numerosContadores,
  jikanTiempo,
  taiForm,
  teFormPermission,
  adverbiosFrecuencia,
  negacionCompleta,
  conjunciones,
  expresionesCotidianas,
]

export default topics
