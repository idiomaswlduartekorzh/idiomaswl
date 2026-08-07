import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { execFileSync, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Rehace los mp3 de escucha a partir del audio que ElevenLabs guarda en el historial.
 *
 * NO GASTA CRÉDITOS: no genera voz, solo vuelve a descargar los turnos ya pagados y los
 * vuelve a montar. Existe porque el montaje ha tenido que corregirse dos veces después de
 * haber generado, y regenerar habría costado miles de créditos cada vez:
 *
 *  - El nivelado turno a turno, cuando se vio que cada voz de la biblioteca viene
 *    masterizada a un nivel distinto.
 *  - El pegado en PCM, cuando David oyó un ruido en cada cambio de personaje: los turnos
 *    se pegaban ya codificados en mp3 y el relleno del codificador dejaba ~36 ms de basura
 *    en cada juntura.
 *
 * También sirvió para recuperar los 20 archivos de coreano A1 que `--clean` borró por error.
 *
 *   node scripts/rebuild-listening-audio.mjs                    # informe, no toca nada
 *   node scripts/rebuild-listening-audio.mjs --write            # rehace todo lo que haya
 *   node scripts/rebuild-listening-audio.mjs --write --lang portugues --level a1
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

const SILENCE_SECONDS = 0.5
const BITRATE = '64k'
const LUFS_OBJETIVO = -16
const TRUE_PEAK_MAX = -1.5

/**
 * Umbral por debajo del cual una muestra cuenta como silencio al recortar los extremos.
 *
 * Estaba en −50 dB mientras la auditoría busca silencios a −45 dB, y esos cinco decibelios
 * de diferencia son un hueco por el que se cuela el ruido de sala: lo que suena entre −50 y
 * −45 sobrevive al recorte y luego la auditoría lo cuenta como pausa. Así apareció el único
 * defecto de los 480 episodios —italiano A2 ep. 10, 1,97 s después de «Matteo!»—: la toma
 * es corta y su cola de sala quedaba entera, más el separador de 0,5 s.
 *
 * Los dos números tienen que ser el mismo, o el recorte no puede satisfacer a la auditoría.
 */
const SILENCIO_DB = -45

/**
 * Techo del limitador antes de codificar a mp3, en amplitud lineal.
 *
 * Estaba en 0,7 (≈ −3,1 dBFS de pico de muestra) y aun así ruso B1 ep. 8 salía con un pico
 * real de +0,2 dBFS. No es un fallo del limitador: entre muestras, la señal reconstruida al
 * decodificar el mp3 sube por encima de lo que marcaban las muestras, y a 64 kbps ese
 * sobrepico llega a 3 dB en material denso. El limitador controla las muestras; el pico
 * real hay que dejarlo con margen.
 *
 * Bajarlo no cambia el volumen percibido: la sonoridad la fija `loudnorm I=-16`, y el
 * limitador solo interviene en los picos aislados.
 */
const TECHO_LIMITADOR = 0.62

const args = process.argv.slice(2)
const write = args.includes('--write')
const val = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null)
const onlyLang = val('--lang')
const onlyLevel = val('--level')
/** Lista de órdenes separada por comas, p. ej. `--ep 10`. Sin ella se rehace la serie entera. */
const onlyEpisodes = val('--ep')?.split(',').map((item) => Number(item.trim()))

function readEnv() {
  const file = path.join(repoRoot, '.env.local')
  if (!fs.existsSync(file)) return {}
  return Object.fromEntries(
    fs.readFileSync(file, 'utf8').split('\n')
      .filter((line) => line.includes('=') && !line.trim().startsWith('#'))
      .map((line) => {
        const i = line.indexOf('=')
        return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
      }),
  )
}

const env = { ...readEnv(), ...process.env }
const apiKey = env.ELEVENLABS_API_KEY || env.ELEVEN_API_KEY

function loadSeries(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

const norm = (value) => value.replace(/\s+/gu, ' ').trim()

const COLA_MAXIMA = 0.08

/**
 * Punto donde acaba la última palabra de verdad del turno.
 *
 * ElevenLabs añade al final de cada turno un golpe de 30–40 ms a −28/−33 dB, tan fuerte
 * como la voz. Al pegar los turnos cae justo antes del silencio que separa a un personaje
 * del siguiente, y se oye en cada cambio de voz.
 *
 * Las tres primeras versiones de esta función buscaban el golpe: «el último silencio, si lo
 * que queda detrás es corto». Funcionó hasta que apareció otro patrón —dos golpes seguidos,
 * o un golpe con silencio detrás— y volvían a colarse. Perseguir patrones no converge.
 *
 * Este criterio es el directo y no depende del patrón: se reconstruyen los tramos de habla
 * y se corta al final del ÚLTIMO que dure lo bastante para ser una palabra. Todo lo que
 * venga después —golpes, silencio, lo que sea— sobra por definición.
 */
function findSpeechEnd(segment) {
  const res = spawnSync('ffmpeg', ['-i', segment, '-af', 'silencedetect=noise=-45dB:d=0.03', '-f', 'null', '-'], { encoding: 'utf8' })
  const salida = String(res.stderr ?? '')
  const duracion = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', segment]).toString().trim())
  const inicios = [...salida.matchAll(/silence_start: ([\d.]+)/gu)].map((m) => Number(m[1]))
  const fines = [...salida.matchAll(/silence_end: ([\d.]+)/gu)].map((m) => Number(m[1]))
  if (!inicios.length) return null

  const silencios = []
  for (let i = 0; i < inicios.length; i += 1) silencios.push({ inicio: inicios[i], fin: fines[i] ?? duracion })

  const habla = []
  let cursor = 0
  for (const s of silencios) {
    if (s.inicio > cursor) habla.push({ inicio: cursor, fin: s.inicio })
    cursor = s.fin
  }
  if (duracion > cursor) habla.push({ inicio: cursor, fin: duracion })

  const ultima = [...habla].reverse().find((h) => h.fin - h.inicio >= COLA_MAXIMA)
  if (!ultima) return null
  // Sin margen no se corta: si la última palabra ya termina el archivo, no hay nada que quitar.
  return duracion - ultima.fin > 0.02 ? ultima.fin : null
}

/** Mismo tratamiento que en la generación: corte del golpe, PCM, extremos y nivelado. */
function prepareSegment(segment) {
  const prepared = segment.replace(/\.mp3$/u, '-prep.wav')
  const corte = findSpeechEnd(segment)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
    ...(corte === null ? [] : ['-t', String(corte)]),
    '-i', segment,
    '-af', [
      `silenceremove=start_periods=1:start_silence=0.05:start_threshold=${SILENCIO_DB}dB`,
      'areverse',
      `silenceremove=start_periods=1:start_silence=0.05:start_threshold=${SILENCIO_DB}dB`,
      'areverse',
      `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`,
    ].join(','),
    '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', prepared])
  return prepared
}

async function fetchHistory() {
  const items = []
  let cursor = null
  for (let page = 0; page < 20; page += 1) {
    const url = new URL('https://api.elevenlabs.io/v1/history')
    url.searchParams.set('page_size', '1000')
    if (cursor) url.searchParams.set('start_after_history_item_id', cursor)
    const res = await fetch(url, { headers: { 'xi-api-key': apiKey } })
    if (!res.ok) throw new Error(`historial: HTTP ${res.status}`)
    const data = await res.json()
    const batch = data.history ?? []
    items.push(...batch)
    if (!data.has_more || !batch.length) break
    cursor = batch[batch.length - 1].history_item_id
  }
  return items
}

if (!apiKey) {
  console.error('✗ Falta ELEVENLABS_API_KEY.')
  process.exit(1)
}

const files = fs.readdirSync(seriesDir)
  .map((name) => ({ name, match: name.match(/^([a-z]+)-(a1|a2|b1)-series\.ts$/u) }))
  .filter((entry) => entry.match)
  .map((entry) => ({ file: path.join(seriesDir, entry.name), lang: entry.match[1], level: entry.match[2] }))
  .filter((entry) => !onlyLang || entry.lang === onlyLang)
  .filter((entry) => !onlyLevel || entry.level === onlyLevel)
  // Solo lo que ya tiene audio: rehacer no genera voz nueva.
  .filter((entry) => fs.existsSync(path.join(repoRoot, 'public', 'audio', entry.lang, entry.level, 'listening-01.mp3')))

if (!files.length) {
  console.error('✗ Ninguna serie con audio coincide con los filtros dados.')
  console.error('  Un conjunto vacío no se aprueba: revisa el filtro antes de seguir.')
  process.exit(1)
}

console.log(`${files.length} series con audio en disco. Descargando historial…`)
const history = await fetchHistory()
console.log(`historial: ${history.length} generaciones guardadas.`)
console.log(write ? 'MODO ESCRITURA: los mp3 se rehacen.\n' : 'Informe: no se toca nada. Añade --write para aplicar.\n')

// Un turno puede tener varias tomas (el coro), una por voz. Se indexan por texto y voz.
const porTexto = new Map()
for (const item of history) {
  const key = norm(item.text ?? '')
  if (!porTexto.has(key)) porTexto.set(key, [])
  porTexto.get(key).push(item)
}

let rehechos = 0
let incompletos = 0

for (const { file, lang, level } of files) {
  const series = loadSeries(file)
  const outDir = path.join(repoRoot, 'public', 'audio', lang, level)
  const faltantes = []

  for (const episode of [...series.episodes].sort((a, b) => a.order - b.order)) {
    if (onlyEpisodes && !onlyEpisodes.includes(episode.order)) continue
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-rebuild-'))
    const segments = []
    let completo = true

    for (const [index, turn] of episode.turns.entries()) {
      const candidatos = porTexto.get(norm(turn.target)) ?? []
      if (!candidatos.length) { completo = false; break }
      if (!write) continue

      // Una sola toma por turno, incluidos los de coro: mezclar varias voces diciendo la
      // misma línea impide entenderla, que es lo único que importa aquí. Ver el comentario
      // en generate-listening-audio.mjs.
      const item = candidatos[0]
      const segment = path.join(temp, `turno-${index}.mp3`)
      const audio = await fetch(`https://api.elevenlabs.io/v1/history/${item.history_item_id}/audio`, { headers: { 'xi-api-key': apiKey } })
      fs.writeFileSync(segment, Buffer.from(await audio.arrayBuffer()))
      segments.push(segment)
    }

    if (!completo) { faltantes.push(episode.order); incompletos += 1; fs.rmSync(temp, { recursive: true, force: true }); continue }
    if (!write) { fs.rmSync(temp, { recursive: true, force: true }); continue }

    const silence = path.join(temp, 'silencio.wav')
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-t', String(SILENCE_SECONDS),
      '-i', 'anullsrc=r=44100:cl=mono', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', silence])
    const leveled = segments.map(prepareSegment)
    const listFile = path.join(temp, 'lista.txt')
    fs.writeFileSync(listFile, leveled.map((s, i) => (i ? `file '${silence}'\nfile '${s}'` : `file '${s}'`)).join('\n'))
    const out = path.join(outDir, `listening-${String(episode.order).padStart(2, '0')}.mp3`)
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile,
      '-af', `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11,alimiter=level_in=1:level_out=1:limit=${TECHO_LIMITADOR}:attack=5:release=50:level=false`,
      '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ar', '44100', '-ac', '1', out])
    fs.rmSync(temp, { recursive: true, force: true })
    rehechos += 1
    process.stdout.write(`\r  ${lang}/${level} · ${rehechos} episodios rehechos    `)
  }

  if (faltantes.length) {
    console.log(`\n⚠ ${lang}/${level}: sin audio en el historial para los episodios ${faltantes.join(', ')}`)
  }
}

console.log(`\n\n${rehechos} episodios rehechos, ${incompletos} sin turnos suficientes en el historial.`)
console.log('Ningún crédito gastado: solo se ha vuelto a descargar y montar audio ya pagado.')
