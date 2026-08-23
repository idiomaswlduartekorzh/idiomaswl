import { buildSatMock } from './build-sat-mock'
import { satSet1M1 } from './sat-set-1-m1'
import { satSet1M2Dificil } from './sat-set-1-m2-dificil'
import { satSet1M2Facil } from './sat-set-1-m2-facil'

/**
 * Simulacro adaptativo completo de Reading and Writing: M1 y una de dos ramas de M2.
 * El corte de M1 decide la rama, el estudiante siempre responde 54 preguntas en 64 minutos
 * y nunca ve el rótulo interno de dificultad durante el intento.
 */
export const satSet1 = buildSatMock({
  id: 'set-1',
  title: 'SAT · Reading and Writing — simulacro adaptativo',
  subtitle: '54 preguntas · 64 minutos · dos módulos y cuatro dominios del SAT digital',
  m1: satSet1M1,
  m2Facil: satSet1M2Facil,
  m2Dificil: satSet1M2Dificil,
})

export default satSet1
