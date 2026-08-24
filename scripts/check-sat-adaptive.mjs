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
 *   node scripts/check-sat-adaptive.mjs --candidate src/data/mocks/sat/sat-set-2.ts --export satSet2
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const cache = new Map()
const catalogFile = path.resolve('src/data/mocks/sat/catalog.json')
const args = process.argv.slice(2)
const candidateFile = args.includes('--candidate') ? args[args.indexOf('--candidate') + 1] : null
const candidateExport = args.includes('--export') ? args[args.indexOf('--export') + 1] : null

if (candidateFile && !candidateExport) {
  console.error('❌ --candidate exige --export para identificar el simulacro candidato.')
  process.exit(1)
}

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
    throw new Error(`${path.basename(r)} importa «${spec}», pero no existe`)
  }
  const sb = { exports: {}, module: { exports: {} }, require: localRequire, console }
  sb.module.exports = sb.exports
  vm.runInNewContext(texto, sb, { filename: r })
  cache.set(r, sb.exports)
  return sb.exports
}

const fallos = []
const fail = (m) => fallos.push(m)

let routing, buildSatMock, m1, publishedSets
try {
  ;({ elegirRamaModulo2: routing } = loadTs('src/data/mocks/sat/routing.ts'))
  const r = loadTs('src/data/mocks/sat/routing.ts')
  ;({ buildSatMock } = loadTs('src/data/mocks/sat/build-sat-mock.ts'))
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
  publishedSets = catalog.sets.filter((set) => set.status === 'published')
  if (!publishedSets.length) throw new Error('catalog.json no declara ningún SAT publicado')
  const firstM1 = publishedSets[0].modules?.find((module) => module.variant === 'M1')
  if (!firstM1) throw new Error(`${publishedSets[0].id} no declara M1 en catalog.json`)
  m1 = loadTs(firstM1.source)?.[firstM1.exportName]
  if (!m1) throw new Error(`${firstM1.source} no exporta ${firstM1.exportName}`)
  var partesServidas = r.partesServidas
  var partesNavegables = r.partesNavegables
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
const comoRama = (mod, variant, dificultad) => ({
  ...mod,
  variant,
  meta: mod.meta.map(item => ({ ...item, dificultad })),
})
const facilLaboratorio = comoRama(m1, 'M2-facil', 1)
const dificilLaboratorio = comoRama(m1, 'M2-dificil', 3)
const adap = buildSatMock({
  id: 'x', title: 't', subtitle: 's', m1,
  m2Facil: facilLaboratorio,
  m2Dificil: dificilLaboratorio,
})
if (!adap.adaptive) fail('con las dos ramas el examen no declara enrutado')
if (adap.sections.length !== 3) fail(`deberían escribirse 3 partes, hay ${adap.sections.length}`)
if (adap.timeMinutes !== 64) fail(`el estudiante hace 2 módulos: 64 minutos, no ${adap.timeMinutes}`)

// El constructor rechaza configuraciones que volverían incomparables las dos rutas.
const debeRechazar = (nombre, args) => {
  try {
    buildSatMock({ id: nombre, title: 't', subtitle: 's', m1, ...args })
    fail(`buildSatMock acepta ${nombre}`)
  } catch { /* era lo esperado */ }
}
debeRechazar('ramas con distinto número de ítems', {
  m2Facil: facilLaboratorio,
  m2Dificil: { ...dificilLaboratorio, items: dificilLaboratorio.items.slice(1), meta: dificilLaboratorio.meta.slice(1) },
})
debeRechazar('una rama fácil rotulada como difícil', {
  m2Facil: comoRama(m1, 'M2-dificil', 1),
  m2Dificil: dificilLaboratorio,
})
const metaDesbalanceada = dificilLaboratorio.meta.map((item, index) =>
  index === 0 ? { ...item, domain: item.domain === 'CS' ? 'II' : 'CS' } : item,
)
debeRechazar('ramas con distinto reparto por dominio', {
  m2Facil: facilLaboratorio,
  m2Dificil: { ...dificilLaboratorio, meta: metaDesbalanceada },
})
debeRechazar('una rama estándar tan difícil como el módulo 1', {
  m2Facil: { ...facilLaboratorio, meta: m1.meta },
  m2Dificil: dificilLaboratorio,
})
debeRechazar('una rama exigente más fácil que el módulo 1', {
  m2Facil: facilLaboratorio,
  m2Dificil: { ...dificilLaboratorio, meta: facilLaboratorio.meta },
})

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
    const antes = partesNavegables(null, R)
    const despues = partesNavegables(rama, R)
    if (antes.length !== 1 || antes[0] !== R.routeAfterPart) {
      fail(`antes del corte se puede navegar por ${antes.join(', ')}; solo debe existir M1`)
    }
    if (despues.length !== 1 || despues[0] !== partes[1]) {
      fail(`después del corte «${rama}» se puede navegar por ${despues.join(', ')}; solo debe existir la rama elegida`)
    }
    if (despues.includes(R.routeAfterPart)) {
      fail(`después del corte «${rama}» todavía permite volver al módulo entregado`)
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

  const reparto = (sec) => {
    const out = new Map()
    for (const insight of Object.values(sec?.insights || {})) {
      if (!insight?.domain) continue
      out.set(insight.domain, (out.get(insight.domain) || 0) + 1)
    }
    return [...out.entries()].sort().map(([domain, n]) => `${domain}:${n}`).join('|')
  }
  if (baja && alta && reparto(baja) !== reparto(alta)) {
    fail(`${quien}: las ramas no tienen el mismo reparto por dominio (${reparto(baja)} frente a ${reparto(alta)})`)
  }

  // Ramas intercambiadas: al que va bien se le sirve la fácil y la pantalla le dice que
  // hizo la difícil. Solo se puede detectar desde que la sección declara su `variant`.
  if (baja?.variant !== 'M2-facil') fail(`${quien}: lowPart sirve «${baja?.variant ?? 'sin variante'}» — al que NO llega al corte se le da la rama equivocada`)
  if (alta?.variant !== 'M2-dificil') fail(`${quien}: highPart sirve «${alta?.variant ?? 'sin variante'}» — al que SÍ llega al corte se le da la rama equivocada`)

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

// Y sobre TODOS los sets publicados, no solo sobre el laboratorio. La lista viene del
// mismo catálogo que genera las tarjetas y el registro: publicar set-2 obliga a que este
// bucle lo audite sin recordar añadir otro import a mano.
for (const set of publishedSets) {
  try {
    const real = loadTs(set.source)?.[set.exportName]
    if (!real) fail(`${set.id}: ${set.source} no exporta ${set.exportName}; no se está probando el producto real`)
    else {
      if (real.id !== set.id) fail(`${set.id}: el mock cargado declara id «${real.id}»`)
      cordura(real, set.id)
    }
  } catch (err) {
    fail(`${set.id}: no se pudo auditar el producto real: ${err.message}`)
  }
}

// Un set todavía en draft se puede probar de extremo a extremo sin registrarlo en el hub.
// Esto rompe el círculo peligroso de «publicarlo para poder comprobarlo»: el candidato
// tiene que superar primero el mismo contrato que los sets publicados.
if (candidateFile) {
  try {
    const candidate = loadTs(candidateFile)?.[candidateExport]
    if (!candidate) fail(`candidato: ${candidateFile} no exporta ${candidateExport}`)
    else cordura(candidate, `candidato ${candidate.id || candidateExport}`)
  } catch (err) {
    fail(`candidato: no se pudo auditar ${candidateFile}: ${err.message}`)
  }
}

console.log(`\n🔀 SAT — enrutado adaptativo\n`)
if (fallos.length) {
  for (const f of fallos) console.log(`   ❌ ${f}`)
  console.log(`\n❌ ${fallos.length} fallo(s).\n`)
  process.exit(1)
}
console.log(`✅ Enrutado correcto en los ${m1.items.length + 1} resultados posibles del módulo 1.`)
console.log(`   ${publishedSets.length} set(s) publicado(s) auditado(s). Corte: ${adap.adaptive.correctToRouteHigh} de ${m1.items.length}. Nunca se sirven las dos ramas.\n`)
