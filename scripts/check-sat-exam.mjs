#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Las doce puertas de calidad del SAT (docs/sat-ingles-blueprint.md §4).
 *
 * Existe porque los defectos que hunden un simulacro no se ven ítem por ítem. Cinco
 * series de este repo llegaron a producción con la respuesta correcta en la opción A el
 * 100 % de las veces y nadie lo vio leyéndolas una a una. Aquí se cuenta el conjunto.
 *
 * Ocho puertas son mecánicas y se miden aquí. Cuatro no lo son —clave única, prueba a
 * ciegas, equidad y originalidad—: exigen criterio. Para esas, el guardián no comprueba
 * el contenido, comprueba que **el auditor pasó y firmó**, leyendo el acta de
 * docs/sat-auditorias/<modulo>.json. Un acta que falta es un fallo, no una presunción de
 * inocencia: «seguramente alguien lo miró» es exactamente como llega a producción lo que
 * no debía.
 *
 *   node scripts/check-sat-exam.mjs
 *   node scripts/check-sat-exam.mjs --module sat-set-1-m1 --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const satDir = path.join(repoRoot, 'src/data/mocks/sat')
const actasDir = path.join(repoRoot, 'docs/sat-auditorias')

const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const onlyModule = args.includes('--module') ? args[args.indexOf('--module') + 1] : null

const DOMAIN_ORDER = ['CS', 'II', 'SEC', 'EOI']
const DOMAIN_COUNTS = { CS: 8, II: 7, SEC: 7, EOI: 5 }
const DOMAIN_NAMES = {
  CS: 'Craft and Structure',
  II: 'Information and Ideas',
  SEC: 'Standard English Conventions',
  EOI: 'Expression of Ideas',
}
const TYPES_BY_DOMAIN = {
  CS: ['words-in-context', 'text-structure-purpose', 'cross-text-connections'],
  II: ['central-ideas-details', 'command-of-evidence-textual', 'command-of-evidence-quantitative', 'inferences'],
  SEC: ['boundaries', 'form-structure-sense'],
  EOI: ['rhetorical-synthesis', 'transitions'],
}
const TOPICS = ['ciencia', 'historia', 'humanidades', 'literatura']
const ITEMS_PER_MODULE = 27
const LETTERS = ['A', 'B', 'C', 'D']

const STOPWORDS = new Set(`a an the and or but if then than that this these those of in on at to for with from by as is are was were be been being it its into about over under
after before while when where which who whom whose what how why not no nor so such can could may might must shall should will would do does did done have has had having
they them their there here he she his her him you your we our us i me my one two also more most other some any each both few many much very own same too only just`.split(/\s+/))

const modules = []
const failures = []
const warnings = []

function fail(mod, gate, msg) { failures.push({ mod, gate, msg }) }
function warn(mod, gate, msg) { warnings.push({ mod, gate, msg }) }

// ── carga ────────────────────────────────────────────────────────────────────
function loadTs(file) {
  const out = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const sandbox = { exports: {}, module: { exports: {} }, require, console }
  sandbox.module.exports = sandbox.exports
  vm.runInNewContext(out, sandbox, { filename: file })
  return sandbox.exports
}

function collectModules() {
  if (!fs.existsSync(satDir)) return
  for (const f of fs.readdirSync(satDir).sort()) {
    if (!f.endsWith('.ts') || f === 'module-types.ts') continue
    let exported
    try {
      exported = loadTs(path.join(satDir, f))
    } catch (err) {
      failures.push({ mod: f, gate: '—', msg: `no se pudo cargar: ${err.message}` })
      continue
    }
    for (const value of Object.values(exported)) {
      if (value && Array.isArray(value.items) && Array.isArray(value.meta) && value.id) {
        if (!onlyModule || value.id === onlyModule) modules.push({ file: f, ...value })
      }
    }
  }
}

// ── utilidades ───────────────────────────────────────────────────────────────
/** «Palabra» en el SAT son 6 caracteres: caracteres totales ÷ 6 (blueprint §2). */
const satWords = (text) => (text || '').length / 6

const contentWords = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))

const pct = (n, total) => (total ? (100 * n) / total : 0)
const fmt = (n) => n.toFixed(1).replace('.0', '')

// ── las doce puertas ─────────────────────────────────────────────────────────
function checkModule(mod) {
  const { id, items, meta } = mod
  const metaById = new Map(meta.map((m) => [m.id, m]))
  const stats = { id, variant: mod.variant }

  // ── estructura: sin esto, medir lo demás no significa nada ──
  if (items.length !== ITEMS_PER_MODULE) {
    fail(id, 'estructura', `${items.length} ítems, deben ser ${ITEMS_PER_MODULE}`)
  }
  const ids = new Set()
  for (const [i, q] of items.entries()) {
    const where = `${q.id || `#${i + 1}`}`
    if (!q.id) fail(id, 'estructura', `ítem #${i + 1} sin id`)
    if (ids.has(q.id)) fail(id, 'estructura', `id repetido: ${q.id}`)
    ids.add(q.id)
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      fail(id, 'estructura', `${where}: debe tener 4 opciones, tiene ${q.options?.length ?? 0}`)
    }
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3)) {
      fail(id, 'estructura', `${where}: answer fuera de rango (0-3): ${q.answer}`)
    }
    if (!q.stimulus || !q.stimulus.trim()) fail(id, 'estructura', `${where}: sin stimulus (el texto)`)
    if (!q.text || !q.text.trim()) fail(id, 'estructura', `${where}: sin enunciado`)
    if ((q.options || []).some((o) => !o || !o.trim())) fail(id, 'estructura', `${where}: opción vacía`)
    if (!metaById.has(q.id)) fail(id, 'estructura', `${where}: sin metadatos en meta[]`)
  }
  for (const m of meta) if (!ids.has(m.id)) fail(id, 'estructura', `meta huérfano: ${m.id}`)
  if (failures.some((f) => f.mod === id && f.gate === 'estructura')) return stats

  const metas = items.map((q) => metaById.get(q.id))

  // ── 1 · reparto de la clave ──
  const letterCount = { A: 0, B: 0, C: 0, D: 0 }
  for (const q of items) letterCount[LETTERS[q.answer]]++
  stats.letras = letterCount
  for (const l of LETTERS) {
    const p = pct(letterCount[l], items.length)
    if (p < 20 || p > 30) fail(id, '1 reparto de clave', `${l} sale ${letterCount[l]} veces (${fmt(p)} %), fuera de 20-30 %`)
  }
  let racha = 1
  for (let i = 1; i < items.length; i++) {
    racha = items[i].answer === items[i - 1].answer ? racha + 1 : 1
    if (racha >= 3) fail(id, '1 reparto de clave', `tres claves ${LETTERS[items[i].answer]} seguidas en ${items[i].id}`)
  }

  // ── 2 · la clave como opción más larga ──
  let masLarga = 0
  for (const q of items) {
    const lens = q.options.map((o) => o.length)
    if (lens[q.answer] === Math.max(...lens) && lens.filter((l) => l === Math.max(...lens)).length === 1) masLarga++
  }
  stats.masLargaPct = pct(masLarga, items.length)
  if (stats.masLargaPct > 30) {
    fail(id, '2 longitud de la clave', `la correcta es la más larga en ${masLarga}/${items.length} (${fmt(stats.masLargaPct)} %), máximo 30 %`)
  }

  // ── 3 · solape léxico con el texto, POR LAS DOS CARAS ──
  //
  // La segunda cara la enseñó el bloque Information and Ideas del primer módulo. Al
  // cumplir a rajatabla «parafrasea la clave y deja que un distractor repita el
  // vocabulario», la clave se volvió sistemáticamente la opción que MENOS palabras del
  // texto repite: en 5 de 6 ítems. Un estudiante que no entienda una sola palabra y solo
  // cuente coincidencias acierta 5 de 6. Arreglar la puerta por un lado abrió la misma
  // puerta por el otro, y ítem por ítem no se ve: solo se ve contando el conjunto.
  let claveGana = 0
  let clavePierde = 0
  for (const q of items) {
    const fuente = new Set(contentWords(q.stimulus))
    const solapes = q.options.map((o) => contentWords(o).filter((w) => fuente.has(w)).length)
    const clave = solapes[q.answer]
    const distractores = solapes.filter((_, i) => i !== q.answer)
    if (clave > Math.max(...distractores)) claveGana++
    if (clave < Math.min(...distractores)) clavePierde++
    if (clave - Math.max(...distractores) >= 3) {
      fail(id, '3 solape léxico', `${q.id}: la clave repite ${clave} palabras del texto y el mejor distractor ${Math.max(...distractores)}; se acierta emparejando`)
    }
  }
  stats.solapePct = pct(claveGana, items.length)
  stats.solapeBajoPct = pct(clavePierde, items.length)
  if (stats.solapePct > 40) {
    fail(id, '3 solape léxico', `la clave es la que más repite palabras del texto en ${claveGana}/${items.length} (${fmt(stats.solapePct)} %), máximo 40 %`)
  }
  if (stats.solapeBajoPct > 40) {
    fail(id, '3 solape léxico (cara inversa)', `la clave es la que MENOS repite palabras del texto en ${clavePierde}/${items.length} (${fmt(stats.solapeBajoPct)} %), máximo 40 %. Se acierta contando coincidencias y eligiendo la que menos tiene`)
  }

  // ── 5 · distractores vivos ──
  for (const m of metas) {
    const r = m.razones || {}
    for (const l of LETTERS) {
      if (!r[l] || r[l].trim().length < 20) {
        fail(id, '5 distractores vivos', `${m.id}: falta la razón de ${l} (o es demasiado corta para ser una razón)`)
      }
    }
    const q = items.find((x) => x.id === m.id)
    const distract = LETTERS.filter((_, i) => i !== q.answer).map((l) => (r[l] || '').trim().toLowerCase())
    if (new Set(distract).size !== distract.length) {
      fail(id, '5 distractores vivos', `${m.id}: dos distractores fallan por la misma razón, así que son uno solo`)
    }
  }

  // ── 7 · longitud del texto (palabras de 6 caracteres) ──
  for (const q of items) {
    const w = satWords(q.stimulus)
    if (w < 25 || w > 150) {
      fail(id, '7 longitud del texto', `${q.id}: ${fmt(w)} palabras-SAT (${q.stimulus.length} caracteres ÷ 6), fuera de 25-150`)
    }
  }

  // ── 8 · mezcla de dominios ──
  const domCount = { CS: 0, II: 0, SEC: 0, EOI: 0 }
  for (const m of metas) {
    if (!DOMAIN_ORDER.includes(m.domain)) { fail(id, '8 mezcla de dominios', `${m.id}: dominio desconocido «${m.domain}»`); continue }
    domCount[m.domain]++
    if (!TYPES_BY_DOMAIN[m.domain].includes(m.tipo)) {
      fail(id, '8 mezcla de dominios', `${m.id}: tipo «${m.tipo}» no pertenece a ${DOMAIN_NAMES[m.domain]}`)
    }
    if (m.domain === 'SEC' && !(m.regla || '').trim()) {
      fail(id, '8 mezcla de dominios', `${m.id}: ítem de convenciones sin la regla nombrada; si no se puede nombrar, es de estilo`)
    }
  }
  stats.dominios = domCount
  for (const d of DOMAIN_ORDER) {
    if (domCount[d] !== DOMAIN_COUNTS[d]) {
      fail(id, '8 mezcla de dominios', `${DOMAIN_NAMES[d]}: ${domCount[d]} ítems, deben ser exactamente ${DOMAIN_COUNTS[d]}`)
    }
  }

  // ── 9 · orden y curva de dificultad ──
  const seq = metas.map((m) => m.domain)
  const bloques = seq.filter((d, i) => d !== seq[i - 1])
  if (new Set(bloques).size !== bloques.length) {
    fail(id, '9 curva de dificultad', `los dominios no van en bloques contiguos: ${bloques.join(' → ')}`)
  } else if (bloques.join() !== DOMAIN_ORDER.filter((d) => bloques.includes(d)).join()) {
    fail(id, '9 curva de dificultad', `orden de dominios ${bloques.join(' → ')}; el oficial es ${DOMAIN_ORDER.join(' → ')}`)
  }
  for (const d of DOMAIN_ORDER) {
    const enDominio = metas.filter((m) => m.domain === d)
    if (!enDominio.length) continue
    if (d === 'SEC') {
      // La excepción verificada: SEC va de fácil a difícil sin agrupar por tipo.
      for (let i = 1; i < enDominio.length; i++) {
        if (enDominio[i].dificultad < enDominio[i - 1].dificultad) {
          fail(id, '9 curva de dificultad', `SEC: ${enDominio[i].id} (dif. ${enDominio[i].dificultad}) va detrás de ${enDominio[i - 1].id} (dif. ${enDominio[i - 1].dificultad})`)
          break
        }
      }
    } else {
      const tipos = enDominio.map((m) => m.tipo)
      const grupos = tipos.filter((t, i) => t !== tipos[i - 1])
      if (new Set(grupos).size !== grupos.length) {
        fail(id, '9 curva de dificultad', `${DOMAIN_NAMES[d]}: los tipos no van agrupados (${grupos.join(' → ')})`)
      }
      let inicio = 0
      for (let i = 1; i <= enDominio.length; i++) {
        if (i === enDominio.length || enDominio[i].tipo !== enDominio[inicio].tipo) {
          for (let j = inicio + 1; j < i; j++) {
            if (enDominio[j].dificultad < enDominio[j - 1].dificultad) {
              fail(id, '9 curva de dificultad', `${DOMAIN_NAMES[d]} / ${enDominio[j].tipo}: ${enDominio[j].id} rompe la curva de fácil a difícil`)
              break
            }
          }
          inicio = i
        }
      }
    }
  }

  // ── 12 · variedad temática ──
  const temas = {}
  for (const m of metas) {
    if (!TOPICS.includes(m.tema)) fail(id, '12 variedad temática', `${m.id}: tema desconocido «${m.tema}»`)
    temas[m.tema] = (temas[m.tema] || 0) + 1
  }
  stats.temas = temas
  for (const [tema, n] of Object.entries(temas)) {
    if (pct(n, items.length) > 40) {
      fail(id, '12 variedad temática', `${tema} ocupa ${n}/${items.length} (${fmt(pct(n, items.length))} %), máximo 40 %`)
    }
  }

  // ── 4, 6, 10, 11 · las que no son mecánicas: se exige el acta ──
  const acta = path.join(actasDir, `${id}.json`)
  if (!fs.existsSync(acta)) {
    fail(id, '4/6/10/11 actas', `no hay acta de auditoría en docs/sat-auditorias/${id}.json — sin acta no hay APTO`)
  } else {
    let a
    try { a = JSON.parse(fs.readFileSync(acta, 'utf8')) } catch (e) { a = null; fail(id, '4/6/10/11 actas', `acta ilegible: ${e.message}`) }
    if (a) {
      const req = ['clave', 'sesgo', 'equidad', 'lengua', 'dificultad', 'originalidad', 'simulacion']
      for (const k of req) {
        if (!a.auditorias?.[k]) fail(id, '4/6/10/11 actas', `el acta no incluye la auditoría «${k}»`)
        else if (a.auditorias[k].veredicto !== 'APTO') fail(id, '4/6/10/11 actas', `«${k}» viene ${a.auditorias[k].veredicto}, no APTO`)
      }
      const c = a.auditorias?.clave, s = a.auditorias?.sesgo, e = a.auditorias?.equidad
      const o = a.auditorias?.originalidad, sim = a.auditorias?.simulacion
      if (c && c.itemsConDosClaves > 0) fail(id, '4 clave única', `${c.itemsConDosClaves} ítems con dos claves defendibles; uno solo invalida el set`)
      if (s && !(s.pruebaACiegasPct <= 35)) fail(id, '6 prueba a ciegas', `sin el texto se acierta el ${s.pruebaACiegasPct} %; el máximo es 35 % (azar = 25 %)`)
      if (sim && !(sim.tramposoPct <= 35)) fail(id, '6 prueba a ciegas', `el perfil tramposo saca ${sim.tramposoPct} %; el máximo es 35 %`)
      if (e && e.banderas > 0) fail(id, '10 equidad', `${e.banderas} banderas de equidad sin resolver`)
      if (o && o.banderasRojas > 0) fail(id, '11 originalidad', `${o.banderasRojas} banderas rojas de originalidad; esto detiene el lote entero`)
      if (a.veredicto !== 'APTO') fail(id, 'veredicto', `el acta dice ${a.veredicto}`)
    }
  }

  return stats
}

// ── informe ──────────────────────────────────────────────────────────────────
collectModules()

if (!modules.length) {
  const msg = onlyModule ? `no existe el módulo «${onlyModule}»` : 'todavía no hay módulos SAT escritos'
  console.log(`ℹ️  check:sat — ${msg}. Nada que comprobar.`)
  process.exit(onlyModule ? 1 : 0)
}

console.log(`\n🎓 SAT — doce puertas de calidad · ${modules.length} módulo(s)\n`)
for (const mod of modules) {
  const s = checkModule(mod)
  const errs = failures.filter((f) => f.mod === mod.id)
  console.log(`${errs.length ? '❌' : '✅'} ${mod.id} · ${mod.variant} · ${mod.items.length} ítems`)
  if (verbose && s.letras) {
    console.log(`   claves ${LETTERS.map((l) => `${l}:${s.letras[l]}`).join(' ')} · clave más larga ${fmt(s.masLargaPct)} % · solape alto ${fmt(s.solapePct)} % · solape bajo ${fmt(s.solapeBajoPct)} %`)
    console.log(`   dominios ${DOMAIN_ORDER.map((d) => `${d}:${s.dominios?.[d] ?? 0}`).join(' ')} · temas ${Object.entries(s.temas || {}).map(([t, n]) => `${t}:${n}`).join(' ')}`)
  }
  for (const e of errs) console.log(`   · [${e.gate}] ${e.msg}`)
}

for (const w of warnings) console.log(`⚠️  ${w.mod} · ${w.msg}`)

if (failures.length) {
  console.error(`\n❌ ${failures.length} problema(s) en ${new Set(failures.map((f) => f.mod)).size} módulo(s). NO APTO.`)
  console.error('   No se baja ningún umbral para que pase un lote (blueprint §5). Se rehace el ítem.\n')
  process.exit(1)
}
console.log(`\n✅ Las doce puertas, superadas.\n`)
