#!/usr/bin/env node
/**
 * neutralize-example-names.mjs  (codemod de un solo uso)
 *
 * Sustituye los nombres de los fundadores (David, Zhanna, José/Jose), usados
 * masivamente como hablantes de ejemplo, por un pool neutral internacional.
 *
 * Clave: el reemplazo es CONSISTENTE por archivo (el mismo mapeo se aplica a
 * TODO el archivo, incluidos los campos answer/accepted), para no descoordinar
 * los ~109 ejercicios donde el nombre es la respuesta correcta. Para dar
 * variedad, cada archivo arranca el pool en un offset derivado de su ruta, y se
 * evitan nombres ya presentes en ese archivo (para no fusionar dos personajes).
 *
 * Uso: node scripts/neutralize-example-names.mjs [--dry]
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'grammar')
const SKIP = new Set(['index.ts', 'types.ts', 'registry.ts'])
const DRY = process.argv.includes('--dry')

// Pools neutrales por género, para preservar la concordancia gramatical al
// sustituir (David/José = masculino, Zhanna = femenino). Se evitan nombres ya
// muy usados en los datos (Ana, Carlos, Sofia, Marco, Lina, Carlo, Giulia,
// Maria, Pedro, Luca) para minimizar colisiones/fusión de personajes.
const POOL_M = ['Bruno', 'Diego', 'Hugo', 'Tomás', 'Nico', 'Enzo', 'Gael', 'Iván', 'Dario', 'Leo']
const POOL_F = ['Nora', 'Elena', 'Clara', 'Iris', 'Vera', 'Alba', 'Sara', 'Marta', 'Lía', 'Emma']

// nombre original → pool del que se toma su sustituto
const ORIGIN_POOL = { David: POOL_M, José: POOL_M, Jose: POOL_M, Zhanna: POOL_F }
const ORIGINS = ['David', 'Zhanna', 'José', 'Jose']

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (e.endsWith('.ts') && !SKIP.has(e)) acc.push(p)
  }
  return acc
}

function applyCase(name, sample) {
  // sample es la forma original detectada (para respetar mayúscula/minúscula)
  if (sample[0] === sample[0].toLowerCase()) return name.toLowerCase()
  return name
}

let touched = 0
for (const file of walk(ROOT)) {
  let src = fs.readFileSync(file, 'utf8')
  const rel = path.relative(ROOT, file)

  // ¿qué orígenes aparecen (en cualquier caso)?
  const present = ORIGINS.filter((o) => new RegExp(`\\b${o}\\b`, 'i').test(src))
  if (present.length === 0) continue

  // nombres de pools ya presentes en el archivo → evitar para no fusionar personajes
  const allPool = [...POOL_M, ...POOL_F]
  const taken = new Set(allPool.filter((n) => new RegExp(`\\b${n}\\b`).test(src)))

  // asignación determinista con offset por archivo, tomando del pool del género
  const nextName = (pool) => {
    let cursor = hashStr(rel + pool[0]) % pool.length
    for (let tries = 0; tries < pool.length; tries++) {
      const cand = pool[cursor % pool.length]
      cursor++
      if (!taken.has(cand)) { taken.add(cand); return cand }
    }
    return pool[hashStr(rel) % pool.length]
  }

  // José y Jose comparten un mismo sustituto por archivo
  const map = {}
  for (const o of present) {
    const key = o === 'Jose' ? 'José' : o
    if (!map[key]) map[key] = nextName(ORIGIN_POOL[o])
  }

  // reemplazo whole-word, respetando el caso original
  let changed = false
  for (const o of ['David', 'Zhanna', 'José', 'Jose']) {
    const target = map[o === 'Jose' ? 'José' : o]
    if (!target) continue
    src = src.replace(new RegExp(`\\b${o}\\b`, 'g'), (m) => { changed = true; return applyCase(target, m) })
    // variante en minúscula (david, zhanna, jose, josé)
    src = src.replace(new RegExp(`\\b${o.toLowerCase()}\\b`, 'g'), (m) => { changed = true; return applyCase(target, m) })
  }

  if (changed) {
    touched++
    if (!DRY) fs.writeFileSync(file, src)
    const desc = Object.entries(map).map(([k, v]) => `${k}→${v}`).join(', ')
    console.log((DRY ? '[dry] ' : '✓ ') + `${rel}  (${desc})`)
  }
}
console.log(`\n${DRY ? 'Se modificarían' : 'Modificados'} ${touched} archivos.`)
