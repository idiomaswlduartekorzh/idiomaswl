import { buildSatMock } from '../../build-sat-mock'
import { satSet3M1 } from './sat-set-3-m1'
import { satSet3M2Dificil } from './sat-set-3-m2-dificil'
import { satSet3M2Facil } from './sat-set-3-m2-facil'

/** Candidato completo de Set 3. Permanece fuera del registro mientras se valida producto. */
export const satSet3Candidate = buildSatMock({
  id: 'set-3',
  title: 'SAT · Reading and Writing — simulacro adaptativo 3',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet3M1,
  m2Facil: satSet3M2Facil,
  m2Dificil: satSet3M2Dificil,
})

export default satSet3Candidate
