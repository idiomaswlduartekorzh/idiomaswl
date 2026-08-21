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
  const out = ts.transpileModule(fs.readFileSync(r, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
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
  vm.runInNewContext(out, sb, { filename: r })
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
const adap = buildSatMock({ id: 'x', title: 't', subtitle: 's', m1, m2Facil: m1, m2Dificil: m1 })
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

console.log(`\n🔀 SAT — enrutado adaptativo\n`)
if (fallos.length) {
  for (const f of fallos) console.log(`   ❌ ${f}`)
  console.log(`\n❌ ${fallos.length} fallo(s).\n`)
  process.exit(1)
}
console.log(`✅ Enrutado correcto en los ${m1.items.length + 1} resultados posibles del módulo 1.`)
console.log(`   Corte: ${adap.adaptive.correctToRouteHigh} de ${m1.items.length}. Nunca se sirven las dos ramas.\n`)
