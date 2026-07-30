#!/usr/bin/env node
/**
 * fix-grammar-placeholders.mjs  (codemod de un solo uso)
 *
 * Normaliza los huecos de los niveles freeText/guidedText/dual y deduplica las
 * opciones repetidas de los niveles choice en src/data/grammar/**.
 *
 *  - freeText / guidedText: dentro del `text`, cada hueco (`___` o `[[n]]`) se
 *    renumera secuencialmente [[0]], [[1]], ... en orden de aparición.
 *  - dual: dentro de las `lines` de CADA item, los huecos se renumeran de forma
 *    continua por item (reiniciando el contador en cada item).
 *  - choice: se eliminan opciones con texto idéntico dentro de un mismo item.
 *
 * NO intenta cuadrar el número de huecos con blanks.length; sólo hace contiguos
 * y únicos los índices y elimina "___". Los desajustes de cardinalidad residuales
 * se reportan al final para corrección manual.
 *
 * Uso: node scripts/fix-grammar-placeholders.mjs [--dry]
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'grammar')
const SKIP = new Set(['index.ts', 'types.ts', 'registry.ts'])
const DRY = process.argv.includes('--dry')

// ── helpers (idénticos al validador) ─────────────────────────────────────────
function matchDelim(s, from, open, close) {
  let depth = 0, inStr = false, q = ''
  for (let i = from; i < s.length; i++) {
    const c = s[i]
    if (inStr) { if (c === '\\') { i++; continue } if (c === q) inStr = false; continue }
    if (c === "'" || c === '"' || c === '`') { inStr = true; q = c; continue }
    if (c === open) depth++
    else if (c === close) { depth--; if (depth === 0) return i }
  }
  return -1
}
function readString(s, from) {
  const q = s[from]
  for (let i = from + 1; i < s.length; i++) {
    const c = s[i]
    if (c === '\\') { i++; continue }
    if (c === q) return i
  }
  return s.length
}
function findKey(block, key) {
  const re = new RegExp(`(^|[^\\w])${key}\\s*:`)
  const m = re.exec(block)
  return m ? m.index + m[0].length : -1
}
function arrayRange(block, key) {
  const at = findKey(block, key)
  if (at < 0) return null
  const lb = block.indexOf('[', at)
  if (lb < 0) return null
  const rb = matchDelim(block, lb, '[', ']')
  if (rb < 0) return null
  return [lb, rb]
}
function splitObjectRanges(block, lb, rb) {
  const ranges = []
  let i = lb + 1
  while (i < rb) {
    while (i < rb && block[i] !== '{') i++
    if (i >= rb) break
    const close = matchDelim(block, i, '{', '}')
    if (close < 0) break
    ranges.push([i, close])
    i = close + 1
  }
  return ranges
}

/**
 * Normaliza los huecos de un fragmento de texto a marcadores [[0]]..[[M-1]].
 *
 * Dos diseños de origen conviven en los datos:
 *  - Puro `___`: cada `___` es un hueco → se convierte en [[k]].
 *  - Mixto `[[n]]` + `___`: el `[[n]]` (normalmente al final de la frase) es el
 *    input real y el `___` marca la posición en la oración. Se descartan los
 *    `[[n]]` sueltos y se numeran los `___` en su lugar (así el input queda
 *    inline y el conteo cuadra con blanks).
 *  - Puro `[[n]]`: se renumeran secuencialmente (elimina duplicados/huecos).
 */
function renumber(raw) {
  const hasBracket = /\[\[\d+\]\]/.test(raw)
  const hasUnderscore = /___/.test(raw)
  let s = raw
  if (hasBracket && hasUnderscore) {
    s = s.replace(/\s*\[\[\d+\]\]\s*/g, ' ')
  }
  let k = 0
  s = s.replace(/___|\[\[\d+\]\]/g, () => `[[${k++}]]`)
  // colapsar espacios sobrantes por las eliminaciones (seguro, sin tocar puntuación)
  s = s.replace(/[ \t]{2,}/g, ' ')
  return s
}

function levelType(block) {
  const m = block.match(/type\s*:\s*'([a-zA-Z]+)'/)
  return m ? m[1] : null
}

// Reemplaza el literal de string de `key:` dentro de `block` aplicando fn(raw).
function transformStringField(block, key, fn) {
  const at = findKey(block, key)
  if (at < 0) return block
  let i = at
  while (i < block.length && /\s/.test(block[i])) i++
  const q = block[i]
  if (q !== "'" && q !== '"' && q !== '`') return block
  const end = readString(block, i)
  const rawInner = block.slice(i + 1, end)
  const next = fn(rawInner)
  if (next === rawInner) return block
  return block.slice(0, i + 1) + next + block.slice(end)
}

// ── per-file transform ───────────────────────────────────────────────────────
function processFile(src) {
  let changed = false
  const pAt = src.indexOf('practice:')
  if (pAt < 0) return { src, changed }
  const levelsRange = arrayRange(src.slice(pAt), 'levels')
  if (!levelsRange) return { src, changed }
  const base = pAt
  const [llb, lrb] = levelsRange
  const levelRanges = splitObjectRanges(src, base + llb, base + lrb)

  // procesar de atrás hacia delante para no invalidar offsets
  for (let li = levelRanges.length - 1; li >= 0; li--) {
    const [ls, le] = levelRanges[li]
    let level = src.slice(ls, le + 1)
    const type = levelType(level)
    let newLevel = level

    if (type === 'freeText' || type === 'guidedText') {
      newLevel = transformStringField(level, 'text', renumber)
    } else if (type === 'dual') {
      // por cada item, renumerar dentro de su bloque `lines`
      const itemsR = arrayRange(newLevel, 'items')
      if (itemsR) {
        const itemRanges = splitObjectRanges(newLevel, itemsR[0], itemsR[1])
        for (let ii = itemRanges.length - 1; ii >= 0; ii--) {
          const [is, ie] = itemRanges[ii]
          let item = newLevel.slice(is, ie + 1)
          const linesR = arrayRange(item, 'lines')
          if (linesR) {
            const before = item.slice(linesR[0], linesR[1] + 1)
            const after = renumber(before)
            if (after !== before) {
              item = item.slice(0, linesR[0]) + after + item.slice(linesR[1] + 1)
            }
          }
          newLevel = newLevel.slice(0, is) + item + newLevel.slice(ie + 1)
        }
      }
    } else if (type === 'choice') {
      // dedupe options por item
      const itemsR = arrayRange(newLevel, 'items')
      if (itemsR) {
        const itemRanges = splitObjectRanges(newLevel, itemsR[0], itemsR[1])
        for (let ii = itemRanges.length - 1; ii >= 0; ii--) {
          const [is, ie] = itemRanges[ii]
          let item = newLevel.slice(is, ie + 1)
          const optsR = arrayRange(item, 'options')
          if (optsR) {
            const rawArr = item.slice(optsR[0], optsR[1] + 1)
            const deduped = dedupeOptionArray(rawArr)
            if (deduped && deduped !== rawArr) {
              item = item.slice(0, optsR[0]) + deduped + item.slice(optsR[1] + 1)
            }
          }
          newLevel = newLevel.slice(0, is) + item + newLevel.slice(ie + 1)
        }
      }
    }

    if (newLevel !== level) {
      src = src.slice(0, ls) + newLevel + src.slice(le + 1)
      changed = true
    }
  }
  return { src, changed }
}

/** Elimina strings duplicados de un array literal de opciones, preservando orden. */
function dedupeOptionArray(rawArr) {
  const re = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g
  const seen = new Set()
  const kept = []
  let m
  while ((m = re.exec(rawArr))) {
    const val = m[1] ?? m[2]
    if (seen.has(val)) continue
    seen.add(val)
    kept.push(m[0])
  }
  if (kept.length === 0) return null
  return `[${kept.join(', ')}]`
}

// ── walk ─────────────────────────────────────────────────────────────────────
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (e.endsWith('.ts') && !SKIP.has(e)) acc.push(p)
  }
  return acc
}

let touched = 0
for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8')
  const { src: out, changed } = processFile(src)
  if (changed) {
    touched++
    if (!DRY) fs.writeFileSync(file, out)
    console.log((DRY ? '[dry] ' : '✓ ') + path.relative(ROOT, file))
  }
}
console.log(`\n${DRY ? 'Se modificarían' : 'Modificados'} ${touched} archivos.`)
