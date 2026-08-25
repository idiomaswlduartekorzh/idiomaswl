import { buildSatMock } from '../../build-sat-mock'
import { satSet5M1 } from './sat-set-5-m1'
import { satSet5M2Dificil } from './sat-set-5-m2-dificil'
import { satSet5M2Facil } from './sat-set-5-m2-facil'

/** Candidato completo de Set 5. Permanece fuera del registro mientras se valida producto. */
export const satSet5Candidate = buildSatMock({
  id: 'set-5',
  title: 'SAT · Reading and Writing — simulacro adaptativo 5',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet5M1,
  m2Facil: satSet5M2Facil,
  m2Dificil: satSet5M2Dificil,
})

export default satSet5Candidate
