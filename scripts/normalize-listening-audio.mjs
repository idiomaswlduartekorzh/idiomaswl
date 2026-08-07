import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

/**
 * Nivela la sonoridad de los mp3 de escucha ya publicados.
 *
 * Por qué: el audio que lleva meses en producción no tiene un nivel común. Medido el
 * 2026-08-06: inglés A1 va de −19,5 a −22,5 LUFS y alemán A1 está en −17. Quien pasa de
 * una lengua a otra tiene que tocar el volumen, y quien estudia con auriculares en la calle
 * pierde frases enteras en los archivos bajos.
 *
 * Esto NO arregla el desequilibrio entre voces dentro de un mismo episodio: eso solo se
 * puede corregir turno a turno, antes de pegarlos, y de eso se encarga
 * scripts/generate-listening-audio.mjs al generar. Aquí solo se iguala el archivo entero,
 * que es lo único que se puede hacer cuando ya está mezclado.
 *
 * No llama a ninguna API y no gasta créditos: es solo ffmpeg sobre archivos locales.
 *
 *   node scripts/normalize-listening-audio.mjs              # informe, no toca nada
 *   node scripts/normalize-listening-audio.mjs --write      # reescribe los mp3
 *   node scripts/normalize-listening-audio.mjs --write --lang ingles
 */

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const audioRoot = path.join(repoRoot, 'public', 'audio')

const LUFS_OBJETIVO = -16
const TRUE_PEAK_MAX = -1.5
const BITRATE = '64k'
/**
 * Por debajo de esta diferencia no se toca: reencodear sin necesidad solo degrada el mp3.
 *
 * 2 LUFS y no 1 porque `loudnorm` en una pasada aterriza con ~2 dB de margen —la medición
 * exacta necesita dos pasadas— y perseguir el último decibelio obligaría a reencodear cada
 * archivo dos veces para una diferencia que nadie oye. Lo que sí se oía eran los 10,3 LUFS
 * de dispersión que tenía inglés A1.
 */
const TOLERANCIA = 2.0

const args = process.argv.slice(2)
const write = args.includes('--write')
const onlyLang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null

/**
 * ffmpeg escribe el resumen de ebur128 en stderr AUNQUE termine bien, y execFileSync solo
 * devuelve stdout cuando el proceso sale con 0. De ahí spawnSync: es la única forma de leer
 * la medición sin depender de que el comando falle.
 */
function loudness(file) {
  const result = spawnSync('ffmpeg', ['-i', file, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' })
  const matches = [...String(result.stderr ?? '').matchAll(/I:\s+(-?[\d.]+) LUFS/gu)]
  return matches.length ? Number(matches[matches.length - 1][1]) : null
}

if (!fs.existsSync(audioRoot)) {
  console.error(`✗ No existe ${path.relative(repoRoot, audioRoot)}`)
  process.exit(1)
}

// Solo los episodios definitivos: los pitidos provisionales y las comparativas del piloto
// se llaman de otra forma a propósito y no deben tocarse.
const files = []
for (const lang of fs.readdirSync(audioRoot)) {
  if (onlyLang && lang !== onlyLang) continue
  const langDir = path.join(audioRoot, lang)
  if (!fs.statSync(langDir).isDirectory()) continue
  for (const level of fs.readdirSync(langDir)) {
    const levelDir = path.join(langDir, level)
    if (!fs.statSync(levelDir).isDirectory()) continue
    if (fs.existsSync(path.join(levelDir, 'PLACEHOLDER'))) continue
    for (const name of fs.readdirSync(levelDir)) {
      if (/^listening-\d{2}\.mp3$/u.test(name)) files.push(path.join(levelDir, name))
    }
  }
}

if (!files.length) {
  console.error('✗ Ningún archivo listening-NN.mp3 coincide con los filtros dados.')
  console.error('  Un conjunto vacío no se aprueba: revisa el filtro antes de seguir.')
  process.exit(1)
}

console.log(`${files.length} archivos definitivos. Objetivo ${LUFS_OBJETIVO} LUFS (tolerancia ±${TOLERANCIA}).`)
console.log(write ? 'MODO ESCRITURA: los mp3 se reescriben.\n' : 'Informe: no se toca nada. Añade --write para aplicar.\n')

const porCarpeta = new Map()
let tocados = 0

for (const file of files) {
  const before = loudness(file)
  if (before === null) {
    console.log(`  ? ${path.relative(audioRoot, file)}: no se pudo medir`)
    continue
  }
  const carpeta = path.relative(audioRoot, path.dirname(file))
  if (!porCarpeta.has(carpeta)) porCarpeta.set(carpeta, [])
  porCarpeta.get(carpeta).push(before)

  if (Math.abs(before - LUFS_OBJETIVO) <= TOLERANCIA) continue
  tocados += 1
  if (!write) continue

  const temp = `${file}.tmp.mp3`
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file,
    '-af', `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`,
    '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ac', '1', temp])
  fs.renameSync(temp, file)
  console.log(`  ✓ ${path.relative(audioRoot, file)}  ${before.toFixed(1)} → ${loudness(file)?.toFixed(1)} LUFS`)
}

console.log('\nPor carpeta, antes de tocar nada:')
for (const [carpeta, valores] of [...porCarpeta].sort()) {
  const min = Math.min(...valores)
  const max = Math.max(...valores)
  const aviso = max - min > 2 ? `  ⚠ ${(max - min).toFixed(1)} LUFS de dispersión interna` : ''
  console.log(`  ${carpeta.padEnd(16)} ${valores.length} archivos   ${min.toFixed(1)} … ${max.toFixed(1)} LUFS${aviso}`)
}

console.log(`\n${tocados} archivos fuera de tolerancia${write ? ' — reescritos' : '. Añade --write para nivelarlos.'}`)
