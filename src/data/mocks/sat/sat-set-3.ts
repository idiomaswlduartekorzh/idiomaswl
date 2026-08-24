import { buildSatMock } from './build-sat-mock'
import { satSet3M1 } from './sat-set-3-m1'
import { satSet3M2Dificil } from './sat-set-3-m2-dificil'
import { satSet3M2Facil } from './sat-set-3-m2-facil'

/** Tercer simulacro SAT adaptativo publicado. */
export const satSet3 = buildSatMock({
  id: 'set-3',
  title: 'SAT · Reading and Writing — simulacro adaptativo 3',
  subtitle: '54 preguntas nuevas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet3M1,
  m2Facil: satSet3M2Facil,
  m2Dificil: satSet3M2Dificil,
})

export default satSet3
