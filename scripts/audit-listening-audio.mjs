import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Auditoría del ENSAMBLADO del audio de escucha.
 *
 * Existe porque tres defectos llegaron a producción sin que ninguna comprobación los viera,
 * y los tres los encontró David escuchando:
 *
 *  1. Cada voz de la biblioteca venía a un nivel distinto. En un mismo diálogo había 5,9 LUFS
 *     entre la voz más alta y la más baja, y el audio ya publicado de inglés A1 tenía 10,3
 *     de dispersión entre episodios.
 *  2. ElevenLabs añade un golpe de ~40 ms a −28 dB al final de cada turno, después de unos
 *     400 ms de silencio. Al pegar los turnos, ese golpe caía justo antes del silencio que
 *     separa a un personaje del siguiente: se oía en CADA cambio de voz, en los 240 episodios.
 *  3. El coro se mezclaba con las tres tomas alineadas al milisegundo, lo que no suena a
 *     grupo sino a la misma frase duplicada.
 *
 * Lo que tienen en común: son propiedades del archivo montado, no del guion, así que ningún
 * validador de contenido los podía ver. Este script las mide.
 *
 *   node scripts/audit-listening-audio.mjs                  # audita todo lo que haya
 *   node scripts/audit-listening-audio.mjs --lang portugues
 *   node scripts/audit-listening-audio.mjs --verbose        # detalle por episodio
 *
 * Sale con código 1 si algo falla, para poder colgarlo del prebuild.
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')
const audioRoot = path.join(repoRoot, 'public', 'audio')

/** Sonoridad objetivo y margen. El mismo que aplica el ensamblado. */
const LUFS_OBJETIVO = -16
const LUFS_TOLERANCIA = 2.5
/**
 * Silencio nominal entre turnos, y a partir de cuánto se considera hueco muerto.
 *
 * El máximo es 1,6 s y no 0,9 porque medir enseñó que las pausas largas de estos audios son
 * prosodia, no montaje: en japonés A1 ep. 16 los silencios son 1,40 · 0,50 · 0,54 · 1,02 ·
 * 0,50 · 0,54 · 0,52 · 1,03 · 0,50 · 0,50. Los de medio segundo son los separadores que
 * inserta el ensamblado; los de un segundo largo son el hablante parando en una coma. Con
 * el umbral en 0,9 esas pausas naturales eran 49 de los 61 problemas del informe.
 *
 * Que falte un turno entero lo detecta la comprobación de separadores, no esta.
 */
const PAUSA_NOMINAL = 0.5
const PAUSA_MAXIMA = 1.6
/**
 * Un fragmento sonoro corto y AUDIBLE, aislado entre dos silencios, no es habla: es el
 * golpe que ElevenLabs añade al final de cada turno.
 *
 * Las dos condiciones importan. La primera versión solo miraba la duración y marcaba 142
 * problemas, casi todos ticks a −55 dB que nadie oye. El golpe de verdad estaba a −28 dB,
 * tan fuerte como la voz: por eso se notaba en cada cambio de personaje. Medir duración sin
 * medir nivel llena el informe de ruido y entierra lo que sí hay que arreglar.
 */
const FRAGMENTO_MINIMO = 0.15
const FRAGMENTO_AUDIBLE_DB = -40

const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const val = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null)
const onlyLang = val('--lang')
const onlyLevel = val('--level')

function loadSeries(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

function ffmpegStderr(file, filtro) {
  const res = spawnSync('ffmpeg', ['-i', file, '-af', filtro, '-f', 'null', '-'], { encoding: 'utf8' })
  return String(res.stderr ?? '')
}

function duracion(file) {
  return Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim())
}

/** Tramos de habla y de silencio, deducidos de silencedetect. */
function estructura(file) {
  const salida = ffmpegStderr(file, 'silencedetect=noise=-45dB:d=0.15')
  const total = duracion(file)
  const inicios = [...salida.matchAll(/silence_start: ([\d.]+)/gu)].map((m) => Number(m[1]))
  const fines = [...salida.matchAll(/silence_end: ([\d.]+)/gu)].map((m) => Number(m[1]))

  /**
   * Solo se cuentan los silencios CERRADOS, con inicio y fin.
   *
   * Cuando el archivo termina en silencio, `silencedetect` emite un `silence_start` sin su
   * `silence_end`. La primera versión lo cerraba con el final del archivo, y eso inventaba
   * una pausa larguísima que se contaba como defecto: 49 de los 61 problemas del informe
   * eran ese fantasma. El silencio final ya tiene su propia comprobación más abajo.
   */
  const silencios = []
  for (let i = 0; i < Math.min(inicios.length, fines.length); i += 1) {
    if (fines[i] > inicios[i]) silencios.push({ inicio: inicios[i], fin: fines[i] })
  }
  const colaAbierta = inicios.length > fines.length ? inicios[inicios.length - 1] : null

  const habla = []
  let cursor = 0
  for (const s of silencios) {
    if (s.inicio > cursor) habla.push({ inicio: cursor, fin: s.inicio })
    cursor = s.fin
  }
  if (total > cursor) habla.push({ inicio: cursor, fin: total })

  return { total, silencios, habla, colaAbierta }
}

/** Nivel RMS, en dB, de un tramo concreto del archivo. */
function nivelDe(file, desde, duracion) {
  const res = spawnSync('ffmpeg', ['-ss', String(desde), '-t', String(Math.max(duracion, 0.01)), '-i', file,
    '-af', 'astats=metadata=1', '-f', 'null', '-'], { encoding: 'utf8' })
  const match = [...String(res.stderr ?? '').matchAll(/RMS level dB:\s+(-?[\d.]+|-inf)/gu)].pop()
  if (!match || match[1] === '-inf') return -120
  return Number(match[1])
}

function sonoridad(file) {
  const salida = ffmpegStderr(file, 'ebur128=peak=true')
  const lufs = [...salida.matchAll(/I:\s+(-?[\d.]+) LUFS/gu)].pop()
  const peak = [...salida.matchAll(/Peak:\s+(-?[\d.]+) dBFS/gu)].pop()
  return { lufs: lufs ? Number(lufs[1]) : null, peak: peak ? Number(peak[1]) : null }
}

const files = fs.readdirSync(seriesDir)
  .map((name) => ({ name, match: name.match(/^([a-z]+)-(a1|a2|b1)-series\.ts$/u) }))
  .filter((entry) => entry.match)
  .map((entry) => ({ file: path.join(seriesDir, entry.name), lang: entry.match[1], level: entry.match[2] }))
  .filter((entry) => !onlyLang || entry.lang === onlyLang)
  .filter((entry) => !onlyLevel || entry.level === onlyLevel)
  .filter((entry) => fs.existsSync(path.join(audioRoot, entry.lang, entry.level, 'listening-01.mp3')))

if (!files.length) {
  console.error('✗ Ninguna serie con audio coincide con los filtros dados.')
  console.error('  Un conjunto vacío no se aprueba: revisa el filtro antes de seguir.')
  process.exit(1)
}

let fallos = 0
let avisos = 0
let auditados = 0

for (const { file, lang, level } of files) {
  const series = loadSeries(file)
  const dir = path.join(audioRoot, lang, level)
  const problemas = []
  const marginales = []
  const niveles = []

  /**
   * Un valor apenas fuera de su límite no es un defecto: es el borde de la distribución.
   *
   * Con los umbrales bien calibrados quedaron cuatro hallazgos en 240 episodios, y los
   * cuatro estaban a menos de 0,2 de su límite: una pausa de 1,62 s contra 1,6, un episodio
   * a −18,7 LUFS contra −18,5, un pico a +0,1 dBFS contra 0. Mover el umbral para que
   * saliera verde habría sido hacer trampa; tratarlos como fallos habría dejado la
   * auditoría en rojo permanente, que es la forma más segura de que nadie la mire.
   *
   * Así que se separan: `grave` para lo que suena mal, `marginal` para lo que conviene
   * mirar. Solo lo grave devuelve código 1.
   */
  const anota = (texto, valor, limite, margen) => {
    if (Math.abs(valor - limite) <= margen) marginales.push(texto)
    else problemas.push(texto)
  }

  for (const episode of [...series.episodes].sort((a, b) => a.order - b.order)) {
    const mp3 = path.join(dir, `listening-${String(episode.order).padStart(2, '0')}.mp3`)
    if (!fs.existsSync(mp3)) { problemas.push(`ep${episode.order}: falta el archivo`); continue }
    auditados += 1

    const { total, silencios, habla, colaAbierta } = estructura(mp3)
    const { lufs, peak } = sonoridad(mp3)
    const etiqueta = `ep${String(episode.order).padStart(2, '0')}`

    // 1. Golpes: fragmentos cortos Y audibles. Los cortos y muy bajos son ticks inocuos.
    const cortos = habla.filter((h) => h.fin - h.inicio < FRAGMENTO_MINIMO)
    const golpes = cortos.filter((h) => nivelDe(mp3, h.inicio, h.fin - h.inicio) > FRAGMENTO_AUDIBLE_DB)
    if (golpes.length) {
      problemas.push(`${etiqueta}: ${golpes.length} golpe(s) audible(s) de menos de ${FRAGMENTO_MINIMO * 1000} ms en ${golpes.map((g) => g.inicio.toFixed(2) + 's').join(', ')}`)
    }

    /**
     * 2. Estructura: un silencio largo por cada cambio de turno.
     *
     * Se cuentan los silencios largos, no los tramos de habla. Contar tramos parecía lo
     * natural y da falsos positivos en cuanto las frases se alargan: en B1 una réplica lleva
     * pausas internas de más de 150 ms y `silencedetect` la parte en varias, así que un
     * episodio correcto de 8 turnos podía declarar 13 tramos.
     *
     * Y se comprueba solo por debajo. Un separador de MÁS es una pausa larga dentro de una
     * réplica —una coma, un punto— y eso es prosodia, no un fallo de montaje. Uno de MENOS
     * sí lo es: significa que dos turnos quedaron pegados y se pierde el cambio de voz.
     */
    const separadores = silencios.filter((s) => s.fin - s.inicio >= PAUSA_NOMINAL * 0.8)
    if (separadores.length < episode.turns.length - 1) {
      problemas.push(`${etiqueta}: ${separadores.length} separadores para ${episode.turns.length} turnos; falta al menos uno, hay turnos pegados`)
    }

    // 3. Pausas entre turnos.
    const largas = silencios.filter((s) => s.fin - s.inicio > PAUSA_MAXIMA)
    if (largas.length) {
      const peor = Math.max(...largas.map((s) => s.fin - s.inicio))
      anota(`${etiqueta}: ${largas.length} pausa(s) de hasta ${peor.toFixed(2)}s (nominal ${PAUSA_NOMINAL}s)`, peor, PAUSA_MAXIMA, 0.25)
    }

    // 4. Sonoridad y saturación.
    if (lufs === null) problemas.push(`${etiqueta}: no se pudo medir la sonoridad`)
    else {
      niveles.push(lufs)
      if (Math.abs(lufs - LUFS_OBJETIVO) > LUFS_TOLERANCIA) {
        const limite = lufs < LUFS_OBJETIVO ? LUFS_OBJETIVO - LUFS_TOLERANCIA : LUFS_OBJETIVO + LUFS_TOLERANCIA
        anota(`${etiqueta}: ${lufs.toFixed(1)} LUFS, fuera de ${LUFS_OBJETIVO}±${LUFS_TOLERANCIA}`, lufs, limite, 0.5)
      }
    }
    /**
     * El umbral es 0 dBFS —fondo de escala— y no un margen de seguridad por debajo.
     * El limitador apunta a −3,1 dBFS y la codificación a mp3 deja el pico real cerca de
     * −0,6; los pocos que quedan a −0,3 no son saturación, son el sobreimpulso normal del
     * códec. Marcar a −0,5 llenaba el informe de episodios correctos.
     */
    if (peak !== null && peak > 0) anota(`${etiqueta}: pico real a ${peak.toFixed(1)} dBFS, por encima de fondo de escala`, peak, 0, 0.3)

    // 5. Silencio al principio o al final.
    if (habla.length && habla[0].inicio > 0.35) problemas.push(`${etiqueta}: arranca con ${habla[0].inicio.toFixed(2)}s de silencio`)
    if (habla.length && total - habla[habla.length - 1].fin > 0.6) {
      problemas.push(`${etiqueta}: termina con ${(total - habla[habla.length - 1].fin).toFixed(2)}s de silencio`)
    }

    if (verbose) {
      console.log(`  ${lang}/${level} ${etiqueta}  ${total.toFixed(1)}s  ${habla.length}/${episode.turns.length} tramos  ${lufs?.toFixed(1)} LUFS`)
    }
  }

  // 6. Homogeneidad dentro de la serie: que no haya que tocar el volumen entre episodios.
  if (niveles.length > 1) {
    const dispersion = Math.max(...niveles) - Math.min(...niveles)
    if (dispersion > 3) problemas.push(`dispersión de ${dispersion.toFixed(1)} LUFS entre episodios de la serie`)
  }

  avisos += marginales.length
  if (problemas.length) {
    fallos += problemas.length
    console.error(`✗ ${lang}/${level}`)
    console.error(problemas.map((p) => `  - ${p}`).join('\n'))
  } else {
    console.log(`✓ ${lang}/${level} — ${series.episodes.length} episodios, ensamblado limpio${marginales.length ? ` (${marginales.length} al borde)` : ''}`)
  }
  if (marginales.length) console.log(marginales.map((m) => `  · ${m}`).join('\n'))
}

console.log(`\n${auditados} episodios auditados. ${fallos} problemas, ${avisos} avisos.`)
if (fallos) {
  console.error('\nPara rehacer el montaje sin gastar créditos:')
  console.error('  node scripts/rebuild-listening-audio.mjs --write --lang <idioma>')
}
process.exitCode = fallos ? 1 : 0
