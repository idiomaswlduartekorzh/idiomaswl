import { buildSatMock } from './build-sat-mock'
import { satSet5M1 } from './sat-set-5-m1'
import { satSet5M2Dificil } from './sat-set-5-m2-dificil'
import { satSet5M2Facil } from './sat-set-5-m2-facil'

/** Quinto simulacro SAT adaptativo publicado. */
export const satSet5 = buildSatMock({
  id: 'set-5',
  title: 'SAT · Reading and Writing — simulacro adaptativo 5',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet5M1,
  m2Facil: satSet5M2Facil,
  m2Dificil: satSet5M2Dificil,
})

export default satSet5
