import { buildSatMock } from './build-sat-mock'
import { satSet2M1 } from './sat-set-2-m1'
import { satSet2M2Dificil } from './sat-set-2-m2-dificil'
import { satSet2M2Facil } from './sat-set-2-m2-facil'

/** Candidato completo del segundo simulacro; el catálogo decide cuándo puede publicarse. */
export const satSet2 = buildSatMock({
  id: 'set-2',
  title: 'SAT · Reading and Writing — simulacro adaptativo 2',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet2M1,
  m2Facil: satSet2M2Facil,
  m2Dificil: satSet2M2Dificil,
})

export default satSet2
