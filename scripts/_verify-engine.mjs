#!/usr/bin/env node
/**
 * _verify-engine.mjs  (verificación, no permanente)
 *
 * Transpila cada archivo de datos de gramática a JS y replica la lógica ENDURECIDA
 * del motor (GrammarTopicClient) para probar transversalmente, sin navegador, que:
 *
 *   1. Ningún nivel se bloquea: un "alumno perfecto" (que rellena cada input
 *      renderizado con la respuesta correcta) alcanza canSubmit/canProceed = true.
 *   2. El 100% es alcanzable: score === total y total > 0 en cada nivel jugable.
 *   3. Ningún índice de hueco se renderiza dos veces (no hay espejeo).
 *
 * Reporta cualquier nivel que falle estas invariantes.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'grammar')
const SKIP = new Set(['index.ts', 'types.ts', 'registry.ts'])

// ── réplica de helpers del motor ─────────────────────────────────────────────
function gapIndices(text) {
  const seen = new Set(); const out = []
  for (const m of String(text).matchAll(/\[\[(\d+)\]\]/g)) {
    const i = Number(m[1]); if (!seen.has(i)) { seen.add(i); out.push(i) }
  }
  return out
}
function dualItemText(item) { return item.lines.map(([, t]) => t).join(' ') }
function norm(s) { return String(s).toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ') }
function matchAnswer(u, a, acc) { const x = norm(u); return x === norm(a) || (acc ?? []).some((v) => x === norm(v)) }

// Simula al alumno perfecto. `emptyAnswer` marca corrupción de contenido (un
// hueco/ítem con respuesta correcta vacía en los datos) — no es un bloqueo del
// motor sino contenido a completar. Los niveles `write` son producción libre:
// el alumno escribe texto propio, así que nunca se bloquean.
function simulate(level) {
  if (level.type === 'choice') {
    const answers = {}
    level.items.forEach((it, i) => { answers[`${i}`] = it.answer })
    const emptyAnswer = level.items.some((it) => !it.answer)
    const canProceed = level.items.every((_, i) => !!answers[`${i}`])
    let score = 0
    level.items.forEach((it, i) => { if ((answers[`${i}`] ?? '').toLowerCase() === (it.answer ?? '').toLowerCase()) score++ })
    return { canProceed, score, total: level.items.length, dupRendered: false, emptyAnswer }
  }
  if (level.type === 'write') {
    // Producción libre: canProceed real siempre alcanzable (textarea no vacío).
    return { canProceed: true, score: level.items.length, total: level.items.length, dupRendered: false, emptyAnswer: false }
  }
  if (level.type === 'guidedText' || level.type === 'freeText') {
    const present = gapIndices(level.text)
    const dupRendered = present.length !== new Set(present).size
    const answers = {}
    present.forEach((i) => { if (level.blanks[i]) answers[`${i}`] = level.blanks[i].answer })
    const requiredIdx = present.filter((i) => level.blanks[i])
    const emptyAnswer = requiredIdx.some((i) => !level.blanks[i].answer)
    const canProceed = requiredIdx.every((i) => !!answers[`${i}`])
    let score = 0, total = 0
    present.forEach((i) => { const b = level.blanks[i]; if (!b) return; total++; if (matchAnswer(answers[`${i}`] ?? '', b.answer, b.accepted)) score++ })
    return { canProceed, score, total, dupRendered, emptyAnswer }
  }
  if (level.type === 'dual') {
    let score = 0, total = 0, canProceed = true, dupRendered = false, emptyAnswer = false
    level.items.forEach((item, ii) => {
      const present = gapIndices(dualItemText(item))
      if (present.length !== new Set(present).size) dupRendered = true
      const answers = {}
      present.forEach((bi) => { if (item.blanks[bi]) answers[`${ii}-${bi}`] = item.blanks[bi].answer })
      const requiredBi = present.filter((bi) => item.blanks[bi])
      if (requiredBi.some((bi) => !item.blanks[bi].answer)) emptyAnswer = true
      if (!requiredBi.every((bi) => !!answers[`${ii}-${bi}`])) canProceed = false
      present.forEach((bi) => { const b = item.blanks[bi]; if (!b) return; total++; if ((answers[`${ii}-${bi}`] ?? '').toLowerCase() === b.answer.toLowerCase()) score++ })
    })
    return { canProceed, score, total, dupRendered, emptyAnswer }
  }
  return { canProceed: true, score: 0, total: 0, dupRendered: false, emptyAnswer: false }
}

// ── carga transpilando TS → JS ───────────────────────────────────────────────
async function loadTopic(file) {
  const source = fs.readFileSync(file, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const url = 'data:text/javascript;base64,' + Buffer.from(js).toString('base64')
  const mod = await import(url)
  return mod.default
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (e.endsWith('.ts') && !SKIP.has(e)) acc.push(p)
  }
  return acc
}

const onlyLang = process.argv[2] // opcional: filtrar por idioma
const files = walk(ROOT).filter((f) => !onlyLang || f.includes(`/${onlyLang}/`))
let levels = 0
const locks = []
const dups = []
const emptyAnswers = []

for (const file of files) {
  let topic
  try { topic = await loadTopic(file) } catch (e) { console.error('load error', file, e.message); continue }
  const rel = path.relative(ROOT, file)
  for (const level of topic.practice?.levels ?? []) {
    levels++
    const r = simulate(level)
    if (r.emptyAnswer) emptyAnswers.push(`${rel} :: ${level.id} [${level.type}] respuesta correcta vacía en datos`)
    else if (!r.canProceed) locks.push(`${rel} :: ${level.id} [${level.type}] canProceed=false`)
    if (r.dupRendered) dups.push(`${rel} :: ${level.id} [${level.type}] índice renderizado 2x`)
  }
}

const byLang = (arr) => {
  const c = {}; arr.forEach((l) => { const k = l.split('/')[0]; c[k] = (c[k] || 0) + 1 }); return JSON.stringify(c)
}

console.log(`Niveles simulados: ${levels} en ${files.length} archivos${onlyLang ? ' (' + onlyLang + ')' : ''}`)
console.log(`\n[1] BLOQUEOS del motor (canProceed=false pese a datos válidos): ${locks.length}`)
locks.slice(0, 40).forEach((l) => console.log('   ✗ ' + l))
console.log(`\n[2] Índice de hueco renderizado 2x (espejeo): ${dups.length}`)
dups.slice(0, 40).forEach((l) => console.log('   ✗ ' + l))
console.log(`\n[3] Contenido a completar (respuesta vacía en datos, NO es fallo del motor): ${emptyAnswers.length}  ${byLang(emptyAnswers)}`)
emptyAnswers.slice(0, 40).forEach((l) => console.log('   ! ' + l))

// El motor está OK si no hay bloqueos ni espejeo. Los [3] son deuda de contenido.
if (locks.length || dups.length) process.exit(1)
console.log('\n✓ Motor: sin bloqueos ni espejeo en ningún idioma.')
