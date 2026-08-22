#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import process from 'node:process'
import { createRequire } from 'node:module'

/**
 * Guardián del enrutado adaptativo del SAT.
 *
 * Qué protege. Con tres módulos escritos y solo dos servidos, hay una forma silenciosa
 * de romperlo: que el examen sirva las tres partes, o que sirva la rama equivocada, o
 * que el tiempo declarado cuente las tres. Nada de eso pone rojo un build ni un tipo —
 * el examen sigue existiendo y compilando, solo que miente.
 *
 * Se comprueba la función de decisión con TODOS los resultados posibles del módulo 1,
 * de 0 a 27, no con dos casos de ejemplo.
 *
 *   node scripts/check-sat-adaptive.mjs
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const cache = new Map()

function loadTs(file) {
  const r = path.resolve(file)
  if (cache.has(r)) return cache.get(r)
  // `transpileModule` no informa de errores por su cuenta: hay que pedírselos. Sin esto,
  // un fichero con un error de tipos se transpila a JS válido y el guardián lo aprueba.
  // Es el mismo agujero que tenía `check-sat-exam.mjs`.
  const out = ts.transpileModule(fs.readFileSync(r, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  })
  const rotos = (out.diagnostics || []).filter((d) => d.category === ts.DiagnosticCategory.Error)
  if (rotos.length) {
    throw new Error(`${path.basename(r)} no compila — ${ts.flattenDiagnosticMessageText(rotos[0].messageText, ' ')}`)
  }
  const texto = out.outputText
  const localRequire = (spec) => {
    if (!spec.startsWith('.')) return require(spec)
    const b = path.resolve(path.dirname(r), spec)
    for (const c of [b, `${b}.ts`, path.join(b, 'index.ts')]) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return loadTs(c)
    }
    return {}
  }
  const sb = { exports: {}, module: { exports: {} }, require: localRequire, console }
  sb.module.exports = sb.exports
  vm.runInNewContext(texto, sb, { filename: r })
  cache.set(r, sb.exports)
  return sb.exports
}

const fallos = []
const fail = (m) => fallos.push(m)

let routing, buildSatMock, m1
try {
  ;({ elegirRamaModulo2: routing } = loadTs('src/data/mocks/sat/routing.ts'))
  const r = loadTs('src/data/mocks/sat/routing.ts')
  ;({ buildSatMock } = loadTs('src/data/mocks/sat/build-sat-mock.ts'))
  ;({ satSet1M1: m1 } = loadTs('src/data/mocks/sat/sat-set-1-m1.ts'))
  var partesServidas = r.partesServidas
} catch (err) {
  console.error(`❌ No se pudo cargar el enrutado: ${err.message}`)
  process.exit(1)
}

// ── El contrato del constructor ──────────────────────────────────────────────
// Media adaptación no es adaptación: con una sola rama tiene que negarse.
let seQuejo = false
try { buildSatMock({ id: 'x', title: 't', subtitle: 's', m1, m2Facil: m1 }) } catch { seQuejo = true }
if (!seQuejo) fail('buildSatMock acepta una sola rama del módulo 2: serviría la misma a todo el mundo y lo llamaría adaptativo')

// Sin ramas: examen lineal de un módulo, sin `adaptive`.
const lineal = buildSatMock({ id: 'x', title: 't', subtitle: 's', m1 })
if (lineal.adaptive) fail('un examen de un solo módulo no debe declarar enrutado')
if (lineal.sections.length !== 1) fail(`un examen de un solo módulo trae ${lineal.sections.length} secciones`)
if (lineal.timeMinutes !== 32) fail(`un módulo son 32 minutos, no ${lineal.timeMinutes}`)

// Con las dos ramas: tres partes escritas, dos servidas, 64 minutos.
// El examen de laboratorio reutiliza el módulo 1 como las dos ramas —lo que se prueba
// aquí es la decisión, no el contenido— pero cada rama tiene que declarar la suya, o la
// comprobación de «ramas intercambiadas» se dispara sobre el propio andamio.
const comoRama = (mod, variant) => ({ ...mod, variant })
const adap = buildSatMock({
  id: 'x', title: 't', subtitle: 's', m1,
  m2Facil: comoRama(m1, 'M2-facil'),
  m2Dificil: comoRama(m1, 'M2-dificil'),
})
if (!adap.adaptive) fail('con las dos ramas el examen no declara enrutado')
if (adap.sections.length !== 3) fail(`deberían escribirse 3 partes, hay ${adap.sections.length}`)
if (adap.timeMinutes !== 64) fail(`el estudiante hace 2 módulos: 64 minutos, no ${adap.timeMinutes}`)

// ── La decisión, con todos los resultados posibles ───────────────────────────
if (adap.adaptive) {
  const R = adap.adaptive
  const total = m1.items.length
  let cambios = 0
  let anterior = null
  for (let aciertos = 0; aciertos <= total; aciertos++) {
    const rama = routing(aciertos, R)
    if (!['low', 'high'].includes(rama)) fail(`con ${aciertos} aciertos devuelve «${rama}»`)
    const esperado = aciertos >= R.correctToRouteHigh ? 'high' : 'low'
    if (rama !== esperado) fail(`con ${aciertos} aciertos sirve «${rama}» y tocaba «${esperado}»`)
    if (anterior && anterior !== rama) cambios++
    anterior = rama
    const partes = partesServidas(rama, R)
    if (partes.length !== 2) fail(`con ${aciertos} aciertos se sirven ${partes.length} partes`)
    if (partes[0] !== R.routeAfterPart) fail(`con ${aciertos} aciertos la primera parte no es la de enrutado`)
    if (partes.includes(R.lowPart) && partes.includes(R.highPart)) {
      fail(`con ${aciertos} aciertos se sirven LAS DOS ramas del módulo 2`)
    }
  }
  // Una sola frontera: si hubiera dos, el enrutado no sería monótono y un estudiante
  // que acierta más podría acabar en el módulo fácil.
  if (cambios !== 1) fail(`la decisión cambia de rama ${cambios} veces; debe cambiar exactamente una`)
  if (R.correctToRouteHigh <= 0 || R.correctToRouteHigh > total) {
    fail(`el corte (${R.correctToRouteHigh}) cae fuera de los aciertos posibles (0-${total})`)
  }
}

// ── Cordura de la configuración ──────────────────────────────────────────────
//
// Lo anterior comprueba que la DECISIÓN es correcta dada una configuración. Esto
// comprueba que la configuración lo sea. La auditoría del 22 ago 2026 pasó en verde,
// con el guardián de entonces, un corte de 1, un corte de 27, las dos ramas
// intercambiadas y una rama que apuntaba a una parte inexistente —esta última deja al
// estudiante con la pantalla en blanco—.
function cordura(mock, quien) {
  const R = mock.adaptive
  if (!R) return
  const porParte = new Map(mock.sections.map((sec) => [sec.part, sec]))
  const enrutadora = porParte.get(R.routeAfterPart)
  const total = enrutadora ? enrutadora.questions.length : 0

  for (const [nombre, parte] of [['routeAfterPart', R.routeAfterPart], ['lowPart', R.lowPart], ['highPart', R.highPart]]) {
    if (!porParte.has(parte)) fail(`${quien}: ${nombre} apunta a la parte ${parte}, que no existe — el estudiante se queda sin preguntas`)
  }
  if (R.lowPart === R.highPart) fail(`${quien}: las dos ramas son la misma parte (${R.lowPart})`)

  // Un corte en el extremo convierte el examen en lineal sin que nada falle.
  if (R.correctToRouteHigh <= 1 || R.correctToRouteHigh >= total) {
    fail(`${quien}: con un corte de ${R.correctToRouteHigh} sobre ${total}, prácticamente todo el mundo cae en la misma rama — eso no es adaptativo`)
  }
  if (!(R.minutesPerModule > 0)) fail(`${quien}: minutesPerModule es ${R.minutesPerModule}`)

  // Las dos ramas tienen que medir lo mismo, o el denominador de la nota depende de
  // qué rama tocó y dos estudiantes no son comparables ni de lejos.
  const baja = porParte.get(R.lowPart)
  const alta = porParte.get(R.highPart)
  if (baja && alta && baja.questions.length !== alta.questions.length) {
    fail(`${quien}: las ramas miden ${baja.questions.length} y ${alta.questions.length} ítems — el denominador de la nota dependería de la rama`)
  }

  // Ramas intercambiadas: al que va bien se le sirve la fácil y la pantalla le dice que
  // hizo la difícil. Solo se puede detectar desde que la sección declara su `variant`.
  if (baja?.variant && baja.variant !== 'M2-facil') fail(`${quien}: lowPart sirve «${baja.variant}» — al que NO llega al corte se le da la rama equivocada`)
  if (alta?.variant && alta.variant !== 'M2-dificil') fail(`${quien}: highPart sirve «${alta.variant}» — al que SÍ llega al corte se le da la rama equivocada`)

  // Ids repetidos entre módulos: el motor guarda las respuestas indexadas por id, así que
  // dos ítems con el mismo nombre son el mismo casillero. Contestar el módulo 1 rellenaba
  // solo el módulo 2. Medido: 27 de 27 y nada del módulo 2 daba 33/54.
  const ids = mock.sections.flatMap((sec) => sec.questions.map((q) => q.id))
  const repes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))]
  if (repes.length) {
    fail(`${quien}: ${repes.length} id(s) repetidos entre partes (${repes.slice(0, 3).join(', ')}…) — las respuestas de un módulo se copian al otro`)
  }
}

cordura(adap, 'examen adaptativo de prueba')

// Y sobre los sets de verdad, no solo sobre el de laboratorio: el guardián decía
// «enrutado correcto» habiendo probado únicamente un examen que se construye aquí mismo.
try {
  for (const m of Object.values(loadTs('src/data/mocks/sat/index.ts') || {})) {
    if (m && Array.isArray(m.sections) && m.adaptive) cordura(m, m.id)
  }
} catch {
  // Si no hay índice todavía, la comprobación de laboratorio sigue valiendo.
}

console.log(`\n🔀 SAT — enrutado adaptativo\n`)
if (fallos.length) {
  for (const f of fallos) console.log(`   ❌ ${f}`)
  console.log(`\n❌ ${fallos.length} fallo(s).\n`)
  process.exit(1)
}
console.log(`✅ Enrutado correcto en los ${m1.items.length + 1} resultados posibles del módulo 1.`)
console.log(`   Corte: ${adap.adaptive.correctToRouteHigh} de ${m1.items.length}. Nunca se sirven las dos ramas.\n`)
