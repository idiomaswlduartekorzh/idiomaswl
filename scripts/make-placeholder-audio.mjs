import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Genera audio PROVISIONAL para las series de listening A1, sin gastar un solo crédito.
 *
 * Por qué existe: el recorrido completo de ListeningJourney (reproductor, línea de tiempo,
 * resaltado por oración, avance entre fases) no se puede revisar sin un mp3 en la ruta real.
 * Esperar al audio de verdad significaría descubrir los fallos de la interfaz DESPUÉS de
 * haber pagado la generación.
 *
 * Qué produce: un pitido corto al principio de cada turno y silencio el resto, con la
 * duración declarada del episodio y los turnos repartidos en proporción a sus caracteres.
 * Así se oye si el resaltado va sincronizado con los turnos, y es imposible confundirlo
 * con una voz real.
 *
 * Salvaguarda: deja un fichero PLACEHOLDER en cada carpeta. El validador del prebuild se
 * niega a aceptar A1_AUDIO_READY = true mientras ese fichero exista, así que estos archivos
 * no pueden publicarse haciéndose pasar por el audio definitivo.
 *
 *   node scripts/make-placeholder-audio.mjs           # genera los 100
 *   node scripts/make-placeholder-audio.mjs --clean   # los borra
 *   node scripts/make-placeholder-audio.mjs --lang coreano
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

const MARKER = 'PLACEHOLDER'
const BEEP_SECONDS = 0.12
const BEEP_HZ = 880
// 64 kbps CBR mono: la compresión que ya usan alemán e italiano en public/audio.
const BITRATE = '64k'

const args = process.argv.slice(2)
const clean = args.includes('--clean')
const onlyLang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null

function loadSeries(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

/** Reparte la duración del episodio entre sus turnos, en proporción a los caracteres. */
function turnDurations(episode) {
  const lengths = episode.turns.map((turn) => turn.target.length)
  const total = lengths.reduce((sum, value) => sum + value, 0)
  return lengths.map((length) => Math.max(BEEP_SECONDS + 0.05, (length / total) * episode.duration))
}

function buildEpisode(outputPath, episode) {
  const durations = turnDurations(episode)
  const inputs = []
  const filters = []

  durations.forEach((duration, index) => {
    // Pitido de arranque del turno, después silencio hasta el final del turno.
    inputs.push('-f', 'lavfi', '-t', BEEP_SECONDS.toFixed(3), '-i', `sine=frequency=${BEEP_HZ}:sample_rate=44100`)
    inputs.push('-f', 'lavfi', '-t', (duration - BEEP_SECONDS).toFixed(3), '-i', 'anullsrc=r=44100:cl=mono')
    filters.push(`[${index * 2}:a][${index * 2 + 1}:a]`)
  })

  // El volumen va DENTRO del grafo: ffmpeg rechaza -af sobre un stream que ya sale
  // de un filter_complex. -6 dB para poder revisar 100 archivos seguidos sin molestia.
  const filter = `${filters.join('')}concat=n=${durations.length * 2}:v=0:a=1,volume=0.5[out]`

  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    ...inputs,
    '-filter_complex', filter,
    '-map', '[out]',
    '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ac', '1',
    outputPath,
  ])
}

const files = fs.readdirSync(seriesDir).filter((name) => name.endsWith('-a1-series.ts')).sort()
let made = 0
let removed = 0

for (const file of files) {
  const lang = file.replace('-a1-series.ts', '')
  if (onlyLang && lang !== onlyLang) continue

  const dir = path.join(repoRoot, 'public', 'audio', lang, 'a1')

  if (clean) {
    const marker = path.join(dir, MARKER)
    if (!fs.existsSync(marker)) {
      console.log(`· ${lang}: sin marcador PLACEHOLDER, no se toca (¿audio real?)`)
      continue
    }

    /**
     * Solo se borra lo que este script creó, comprobando el tamaño exacto que anotó el
     * marcador al generarlo.
     *
     * Por qué hace falta: los pitidos ocupan LA MISMA ruta y EL MISMO nombre que el audio
     * definitivo —a propósito, si no no servirían para revisar la interfaz—, y generar el
     * audio real no borra el marcador. El 6 de agosto de 2026 este `--clean` se llevó por
     * delante los 20 mp3 buenos de coreano A1 recién generados. Se recuperaron del historial
     * de ElevenLabs sin volver a pagar, pero la próxima vez podría no haber historial.
     */
    let inventario = {}
    try {
      const json = fs.readFileSync(marker, 'utf8').match(/^\{[\s\S]*\}$/mu)
      if (json) inventario = JSON.parse(json[0])
    } catch { /* Marcador antiguo sin inventario: se trata como vacío y no se borra nada. */ }

    if (!Object.keys(inventario).length) {
      console.log(`✗ ${lang}: el marcador no lleva inventario. No se borra nada.`)
      console.log('  Regenera los placeholders o borra los archivos a mano tras comprobarlos.')
      continue
    }

    const intactos = []
    for (const [name, bytes] of Object.entries(inventario)) {
      const file = path.join(dir, name)
      if (!fs.existsSync(file)) continue
      if (fs.statSync(file).size !== bytes) { intactos.push(name); continue }
      fs.rmSync(file)
      removed += 1
    }

    if (intactos.length) {
      console.log(`⚠ ${lang}: ${intactos.length} archivos han cambiado de tamaño desde que se generaron.`)
      console.log('  Son audio real, no pitidos: se conservan. ' + intactos.slice(0, 3).join(', '))
    }
    fs.rmSync(marker)
    if (!fs.readdirSync(dir).length) fs.rmdirSync(dir)
    console.log(`✓ ${lang}: ${removed} placeholders eliminados${intactos.length ? `, ${intactos.length} conservados` : ''}`)
    continue
  }

  const series = loadSeries(path.join(seriesDir, file))
  fs.mkdirSync(dir, { recursive: true })

  // El inventario de tamaños es lo que después permite a --clean distinguir un pitido
  // de un mp3 de verdad servido desde la misma ruta y con el mismo nombre.
  const inventario = {}
  for (const episode of series.episodes) {
    const name = `listening-${String(episode.order).padStart(2, '0')}.mp3`
    const target = path.join(dir, name)
    buildEpisode(target, episode)
    inventario[name] = fs.statSync(target).size
    made += 1
  }

  fs.writeFileSync(
    path.join(dir, MARKER),
    [
      'Audio PROVISIONAL generado por scripts/make-placeholder-audio.mjs.',
      'Pitidos y silencio, sin voz. Sirve para revisar el recorrido de la interfaz.',
      '',
      'NO commitear. NO poner A1_AUDIO_READY a true mientras exista este fichero:',
      'el validador del prebuild falla si se intenta.',
      '',
      'Al llegar el audio real: node scripts/make-placeholder-audio.mjs --clean',
      '',
      'Inventario de lo que creó este script, en bytes. --clean solo borra lo que siga',
      'midiendo exactamente esto: si un archivo ha cambiado, es audio real y se conserva.',
      JSON.stringify(inventario, null, 0),
      '',
    ].join('\n'),
  )
  console.log(`✓ ${lang}: ${series.episodes.length} placeholders (${series.episodes.reduce((sum, e) => sum + e.duration, 0)} s en total)`)
}

if (clean) console.log(`\n${removed} archivos eliminados.`)
else console.log(`\n${made} archivos provisionales generados. Recuerda: no se commitean.`)
