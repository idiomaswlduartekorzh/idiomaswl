import { buildSatMock } from './build-sat-mock'
import { satSet1M1 } from './sat-set-1-m1'

/**
 * Primer simulacro SAT publicable: **un módulo de 27 ítems, 32 minutos**.
 *
 * No es medio examen mal contado. El SAT real tiene dos módulos por sección y el segundo
 * se adapta al primero; nuestro motor sirve secciones lineales, así que servir dos módulos
 * seguidos sin adaptación sería imitar la forma y perder lo que la forma significa. Se
 * publica un módulo, se dice que es un módulo, y el estudiante recibe un diagnóstico
 * honesto de 27 preguntas en vez de un examen completo fingido.
 *
 * Lo que este simulacro sí garantiza, y está medido: **no se puede resolver sin leer los
 * textos**. Dieciséis solucionadores sin acceso a los pasajes sacaron un 25,5 %, con el
 * azar en 25 %. La serie de mediciones está en docs/sat-ingles-blueprint.md §4 ter.
 */
export const satSet1 = buildSatMock({
  id: 'set-1',
  title: 'SAT · Reading and Writing — Módulo 1',
  subtitle: '27 preguntas · 32 minutos · Craft and Structure, Information and Ideas, Standard English Conventions y Expression of Ideas',
  m1: satSet1M1,
})

export default satSet1
