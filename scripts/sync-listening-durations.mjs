import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Pone la duración declarada de cada episodio a la que dura el mp3 de verdad.
 *
 * Por qué hace falta: la duración se escribió a mano, y en las series que se redactaron con
 * el ayudante `ep()` se puso la misma constante para los veinte episodios —alemán A1
 * declaraba 32 s en todos, inglés B1 declaraba 48—. Al medir los ficheros, 279 de los 480
 * episodios se desviaban más de 4 s, con casos de 12,6 s.
 *
 * No es un detalle de metadatos. El reproductor calcula la barra de progreso como
 * `currentTime / duration`, así que en alemán A1 la barra llegaba al 74 % y ahí se quedaba
 * mientras el audio ya había terminado. Y la ficha del catálogo anunciaba «32 s» para un
 * audio de 24. Que el número sea el real arregla las dos cosas de una vez.
 *
 *   node scripts/sync-listening-durations.mjs           # muestra lo que cambiaría
 *   node scripts/sync-listening-durations.mjs --write   # lo escribe
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')
const audioRoot = path.join(repoRoot, 'public', 'audio')

const write = process.argv.includes('--write')

function loadSeries(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  }).outputText
  const module = { exports: {} }
  Function('module', 'exports', compiled)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

const duration = (file) =>
  Number.parseFloat(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {
      encoding: 'utf8',
    }).trim(),
  )

let changed = 0
let untouched = 0

for (const name of fs.readdirSync(seriesDir).filter((item) => item.endsWith('-series.ts')).sort()) {
  const file = path.join(seriesDir, name)
  const lang = name.replace(/-(a1|a2|b1)-series\.ts$/u, '')
  const level = name.match(/-(a1|a2|b1)-series\.ts$/u)[1]
  const series = loadSeries(file)

  // Los episodios se declaran en orden en el fichero; se comprueba antes de tocar nada,
  // porque la sustitución es posicional.
  const orders = series.episodes.map((episode) => episode.order)
  if (orders.some((order, index) => order !== index + 1)) {
    console.log(`✗ ${lang}/${level}: los episodios no están en orden en el fichero; no se toca`)
    continue
  }

  const reales = series.episodes.map((episode) => {
    const mp3 = path.join(audioRoot, lang, level, `listening-${String(episode.order).padStart(2, '0')}.mp3`)
    return fs.existsSync(mp3) ? Math.round(duration(mp3)) : null
  })

  if (reales.some((value) => value === null)) {
    console.log(`· ${lang}/${level}: faltan mp3; no se toca`)
    continue
  }

  let cursor = 0
  let ajustes = 0
  const source = fs.readFileSync(file, 'utf8')
  // `estimatedDuration` lleva el mismo sufijo, así que el patrón exige que delante haya un
  // separador y no una letra.
  const next = source.replace(/(^|[^a-zA-Z])duration: (\d+)/gu, (match, prefix, value) => {
    const real = reales[cursor]
    cursor += 1
    if (real === undefined) return match
    if (Number(value) !== real) ajustes += 1
    return `${prefix}duration: ${real}`
  })

  if (cursor !== series.episodes.length) {
    console.log(`✗ ${lang}/${level}: encontrados ${cursor} campos duration para ${series.episodes.length} episodios; no se toca`)
    continue
  }

  // `estimatedDuration` es la estimación de la auditoría editorial: se pone a la real por
  // el mismo motivo, y va después para no confundir al patrón anterior.
  let cursorAudit = 0
  const final = next.replace(/estimatedDuration: (\d+)/gu, (match, value) => {
    const real = reales[cursorAudit]
    cursorAudit += 1
    if (real === undefined) return match
    if (Number(value) !== real) ajustes += 1
    return `estimatedDuration: ${real}`
  })

  if (ajustes === 0) {
    untouched += 1
    console.log(`✓ ${lang}/${level}: ya coincidía`)
    continue
  }

  changed += ajustes
  const span = `${Math.min(...reales)}–${Math.max(...reales)}s`
  console.log(`${write ? '→' : '·'} ${lang}/${level}: ${ajustes} valores ajustados (real ${span})`)
  if (write) fs.writeFileSync(file, final)
}

console.log(`\n${changed} valores ${write ? 'escritos' : 'por escribir'}, ${untouched} series ya correctas.`)
if (!write) console.log('Nada se ha modificado. Añade --write para aplicarlo.')
