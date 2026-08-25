import { buildSatMock } from '../../build-sat-mock'
import { satSet4M1 } from './sat-set-4-m1'
import { satSet4M2Dificil } from './sat-set-4-m2-dificil'
import { satSet4M2Facil } from './sat-set-4-m2-facil'

/** Candidato completo de Set 4. Permanece fuera del registro mientras se valida producto. */
export const satSet4Candidate = buildSatMock({
  id: 'set-4',
  title: 'SAT · Reading and Writing — simulacro adaptativo 4',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet4M1,
  m2Facil: satSet4M2Facil,
  m2Dificil: satSet4M2Dificil,
})

export default satSet4Candidate
