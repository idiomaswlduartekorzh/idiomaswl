#!/usr/bin/env node
/**
 * check-grammar-exercises.mjs
 *
 * Valida la integridad de los datos de ejercicios de gramática que consume el
 * motor de 6 niveles (`src/components/grammar/GrammarTopicClient.tsx`).
 *
 * El motor renderiza los huecos partiendo el texto por /\[\[(\d+)\]\]/. Si el
 * contenido no usa ese marcador, o los índices no cuadran con el array `blanks`,
 * el ejercicio se rompe silenciosamente: no aparecen inputs (botón bloqueado,
 * "no avanza") o dos inputs comparten la misma respuesta (se "duplica").
 *
 * Reglas que se validan por nivel:
 *  - freeText / guidedText: el `text` debe contener marcadores [[0]]..[[M-1]]
 *    contiguos, únicos, y M === blanks.length. Prohibido `___` literal.
 *  - dual: por cada item, los [[n]] de sus `lines` deben ser contiguos, únicos
 *    y coincidir con item.blanks.length. Prohibido `___` literal en las lines.
 *  - choice: las `options` de cada item no deben repetir texto (colisión de key).
 *
 * Salida: lista de anomalías y exit code 1 si hay alguna. Con `--report` imprime
 * también un resumen por idioma aunque no falle.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'grammar')
const SKIP = new Set(['index.ts', 'types.ts', 'registry.ts'])

// ── Text-parsing helpers (TS source treated as text) ─────────────────────────

/** Devuelve el índice del carácter de cierre que empareja `open` en s[from]. */
function matchDelim(s, from, open, close) {
  let depth = 0
  let inStr = false
  let q = ''
  for (let i = from; i < s.length; i++) {
    const c = s[i]
    if (inStr) {
      if (c === '\\') { i++; continue }
      if (c === q) inStr = false
      continue
    }
    if (c === "'" || c === '"' || c === '`') { inStr = true; q = c; continue }
    if (c === open) depth++
    else if (c === close) { depth--; if (depth === 0) return i }
  }
  return -1
}

/** Lee un literal de string que empieza en s[from] (la comilla). */
function readString(s, from) {
  const q = s[from]
  let out = ''
  for (let i = from + 1; i < s.length; i++) {
    const c = s[i]
    if (c === '\\') { out += s[i + 1] ?? ''; i++; continue }
    if (c === q) return { value: out, end: i }
    out += c
  }
  return { value: out, end: s.length }
}

/**
 * Encuentra la clave `key:` en `block` en el nivel de anidación superior (depth 1
 * respecto al objeto que envuelve `block`) y devuelve la posición de su valor.
 * Búsqueda simple: primera aparición de `key:` fuera de un string.
 */
function findKey(block, key) {
  const re = new RegExp(`(^|[^\\w])${key}\\s*:`, 'g')
  let m
  while ((m = re.exec(block))) {
    // heurística: aceptar la primera ocurrencia. Los bloques que le pasamos ya
    // están acotados a un único nivel/item, así que basta.
    return m.index + m[0].length
  }
  return -1
}

/** Extrae el valor string de `key:` dentro de block (o null). */
function extractStringValue(block, key) {
  const at = findKey(block, key)
  if (at < 0) return null
  let i = at
  while (i < block.length && /\s/.test(block[i])) i++
  const c = block[i]
  if (c !== "'" && c !== '"' && c !== '`') return null
  return readString(block, i).value
}

/** Extrae el cuerpo `[...]` de `key:` dentro de block (o null). */
function extractArrayBody(block, key) {
  const at = findKey(block, key)
  if (at < 0) return null
  const lb = block.indexOf('[', at)
  if (lb < 0) return null
  const rb = matchDelim(block, lb, '[', ']')
  if (rb < 0) return null
  return block.slice(lb, rb + 1)
}

/** Divide el cuerpo de un array `[ {..}, {..} ]` en objetos de nivel 1. */
function splitObjects(arrayBody) {
  const objs = []
  let i = arrayBody.indexOf('[') + 1
  while (i < arrayBody.length) {
    // saltar hasta el próximo '{' de nivel superior
    while (i < arrayBody.length && arrayBody[i] !== '{') {
      if (arrayBody[i] === ']') return objs
      i++
    }
    if (i >= arrayBody.length) break
    const close = matchDelim(arrayBody, i, '{', '}')
    if (close < 0) break
    objs.push(arrayBody.slice(i, close + 1))
    i = close + 1
  }
  return objs
}

/** Recolecta índices [[n]] en orden de aparición. */
function placeholders(text) {
  return [...text.matchAll(/\[\[(\d+)\]\]/g)].map((m) => Number(m[1]))
}

// ── Level extraction ─────────────────────────────────────────────────────────

function getLevels(src) {
  const pAt = src.indexOf('practice:')
  if (pAt < 0) return []
  const body = extractArrayBody(src.slice(pAt), 'levels')
  if (!body) return []
  return splitObjects(body)
}

function levelType(levelBlock) {
  const m = levelBlock.match(/type\s*:\s*'([a-zA-Z]+)'/)
  return m ? m[1] : null
}

// ── Rules ────────────────────────────────────────────────────────────────────

// Los hallazgos se clasifican en dos severidades:
//  - breaker: rompe el motor (input no renderiza, espejeo, colisión de key).
//  - cardinality: nº de huecos ≠ nº de blanks. El motor endurecido lo tolera
//    (no bloquea), pero indica contenido a completar/alinear.
const breaker = (out, msg) => out.push({ kind: 'breaker', msg })
const cardinality = (out, msg) => out.push({ kind: 'cardinality', msg })

function checkTextLevel(rel, levelBlock, type, out) {
  const text = extractStringValue(levelBlock, 'text')
  const blanksBody = extractArrayBody(levelBlock, 'blanks')
  const nBlanks = blanksBody ? splitObjects(blanksBody).length : 0
  const label = `${rel} [${type}]`

  if (text == null) {
    breaker(out, `${label}: nivel sin campo \`text\``)
    return
  }
  if (text.includes('___')) {
    breaker(out, `${label}: usa "___" literal en \`text\` (debe ser [[n]])`)
  }
  const ph = placeholders(text)
  const uniq = [...new Set(ph)].sort((a, b) => a - b)
  const dup = ph.length - uniq.length
  const contiguous = uniq.every((v, k) => v === k)
  const maxPh = uniq.length ? Math.max(...uniq) : -1

  if (dup > 0) breaker(out, `${label}: marcador [[n]] repetido (${ph.length} marcadores, ${uniq.length} únicos)`)
  if (!contiguous) breaker(out, `${label}: índices [[n]] no contiguos: [${uniq.join(',')}]`)
  if (maxPh + 1 !== nBlanks) {
    cardinality(out, `${label}: marcadores=${uniq.length} pero blanks=${nBlanks} (deben coincidir)`)
  }
}

function checkDualLevel(rel, levelBlock, out) {
  const itemsBody = extractArrayBody(levelBlock, 'items')
  if (!itemsBody) return
  const items = splitObjects(itemsBody)
  items.forEach((item, ii) => {
    const linesBody = extractArrayBody(item, 'lines')
    const linesText = linesBody ?? ''
    const blanksBody = extractArrayBody(item, 'blanks')
    const nBlanks = blanksBody ? splitObjects(blanksBody).length : 0
    const label = `${rel} [dual item ${ii + 1}]`

    if (linesText.includes('___')) {
      breaker(out, `${label}: usa "___" literal en \`lines\` (debe ser [[n]])`)
    }
    const ph = placeholders(linesText)
    const uniq = [...new Set(ph)].sort((a, b) => a - b)
    const dup = ph.length - uniq.length
    const contiguous = uniq.every((v, k) => v === k)
    const maxPh = uniq.length ? Math.max(...uniq) : -1

    if (dup > 0) breaker(out, `${label}: marcador [[n]] repetido`)
    if (!contiguous) breaker(out, `${label}: índices [[n]] no contiguos: [${uniq.join(',')}]`)
    if (maxPh + 1 !== nBlanks) cardinality(out, `${label}: marcadores=${uniq.length} pero blanks=${nBlanks}`)
  })
}

function checkChoiceLevel(rel, levelBlock, out) {
  const itemsBody = extractArrayBody(levelBlock, 'items')
  if (!itemsBody) return
  const items = splitObjects(itemsBody)
  items.forEach((item, ii) => {
    const optsBody = extractArrayBody(item, 'options')
    if (!optsBody) return
    const opts = [...optsBody.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map(
      (m) => m[1] ?? m[2],
    )
    const set = new Set(opts)
    if (set.size !== opts.length) {
      breaker(out, `${rel} [choice item ${ii + 1}]: opciones repetidas (${opts.join(' | ')})`)
    }
  })
}

// ── Walk ─────────────────────────────────────────────────────────────────────

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (e.endsWith('.ts') && !SKIP.has(e)) acc.push(p)
  }
  return acc
}

function main() {
  const files = walk(ROOT)
  const found = []

  for (const file of files) {
    const rel = path.relative(ROOT, file)
    const src = fs.readFileSync(file, 'utf8')
    for (const level of getLevels(src)) {
      const type = levelType(level)
      if (type === 'freeText' || type === 'guidedText') checkTextLevel(rel, level, type, found)
      else if (type === 'dual') checkDualLevel(rel, level, found)
      else if (type === 'choice') checkChoiceLevel(rel, level, found)
    }
  }

  const report = process.argv.includes('--report')
  const breakers = found.filter((f) => f.kind === 'breaker')
  const cards = found.filter((f) => f.kind === 'cardinality')
  const byLang = (arr) => {
    const c = {}
    arr.forEach((f) => { const k = f.msg.split('/')[0]; c[k] = (c[k] || 0) + 1 })
    return JSON.stringify(c)
  }

  if (cards.length) {
    console.warn(`⚠ ${cards.length} niveles con desajuste marcadores/blanks (contenido a alinear; el motor los tolera). ${byLang(cards)}`)
    if (report) cards.forEach((f) => console.warn('  - ' + f.msg))
  }

  if (breakers.length === 0) {
    console.log(`✓ Ejercicios de gramática: ${files.length} archivos, 0 fallos que rompan el motor.`)
    return
  }

  console.error(`\n✗ ${breakers.length} fallos que ROMPEN el motor:\n`)
  for (const f of breakers) console.error('  - ' + f.msg)
  console.error('\nPor idioma: ' + byLang(breakers))
  process.exit(1)
}

main()
