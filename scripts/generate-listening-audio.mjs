import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { execFileSync, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Generación del audio de las series narrativas de listening A1.
 *
 * SEGURIDAD DE CRÉDITOS: sin `--generate` este script NO llama a la API. El modo por
 * defecto es la factura previa (`--dry-run`), que imprime el coste exacto antes de gastar.
 * Los créditos son el único recurso de este proyecto que no se puede deshacer.
 *
 *   node scripts/generate-listening-audio.mjs                      # factura, no gasta
 *   node scripts/generate-listening-audio.mjs --init-casting       # crea el reparto vacío
 *   node scripts/generate-listening-audio.mjs --voices             # voces de la cuenta
 *   node scripts/generate-listening-audio.mjs --pilot --generate   # piloto (~950 créditos)
 *   node scripts/generate-listening-audio.mjs --lang coreano --generate
 *
 * Cómo genera: un audio POR TURNO con la voz de su personaje, encadenando `previous_text`
 * y `next_text` para que la prosodia no se corte entre turnos, y luego concatena con
 * ~0,5 s de silencio y comprime a 64 kbps mono, que es la convención de public/audio.
 * Al terminar cada episodio mide el mp3 real y escribe esa duración de vuelta en la serie:
 * el resaltado por oración depende de que ese número sea exacto.
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')
const castingPath = path.join(scriptDir, 'listening-voice-casting.json')
const manifestPath = path.join(repoRoot, 'docs', 'listening-audio-manifest.json')

const API = 'https://api.elevenlabs.io'
const SILENCE_SECONDS = 0.5
const BITRATE = '64k'
/**
 * Banda de duración por nivel. La del blueprint (20–35 s) se escribió para A1, donde el
 * episodio tiene 4–7 turnos cortos. Aplicarla tal cual a A2 y B1 marcaba 199 de 340
 * episodios como fuera de banda —el mismo error de nivel que ya tuvo el enumerador de
 * ficheros—: los redactores de A2 apuntaron a ~55 s y los de B1 más arriba, siguiendo el
 * rango de unidades que el validador les exige.
 */
const DURATION_BANDS = {
  a1: [20, 35],
  a2: [30, 60],
  b1: [45, 90],
}

/**
 * Caracteres por segundo medidos sobre audio REAL ya publicado del repo:
 * alemán A1 (20 archivos) da 16,9 y inglés A1 da 12,2. Las cinco lenguas nuevas no
 * tienen audio con el que calibrar, así que estas cifras son una estimación de partida.
 * El piloto las sustituye por medidas reales: ver `--generate` (escribe cps en el manifiesto).
 */
const CPS_ESTIMADO = {
  frances: 14.5,
  portugues: 14.5,
  ruso: 14.0,
  // Coreano: 5,1 MEDIDO sobre los seis mp3 del piloto (2026-08-06), con los dos modelos.
  // La estimación de partida era 5,5.
  coreano: 5.1,
  japones: 5.0,
}

/**
 * Créditos por carácter, MEDIDOS contra el saldo de la cuenta.
 *
 *   piloto coreano   1.334 car · multilingual_v2 →   731 créditos → 0,548
 *   piloto coreano   1.334 car · flash_v2_5      →   367 créditos → 0,275
 *   tanda coreano   12.778 car · flash_v2_5      → 3.566 créditos → 0,279
 *   tanda japonés    9.577 car · flash_v2_5      → 2.653 créditos → 0,277
 *   tanda ruso      23.878 car · flash_v2_5      → 6.581 créditos → 0,276
 *   tanda portugués 27.442 car · flash_v2_5      → 7.696 créditos → 0,280
 *
 * La primera hipótesis fue que el descuento venía de la escritura: el hangul a 0,55
 * frente al inglés de este repo, que sale a 0,965. El ruso la desmintió — cirílico, y
 * paga exactamente lo mismo que el coreano y el japonés. Lo que se repite es un factor
 * ~0,55 sobre la tarifa nominal, independiente del alfabeto, tanto con v2 (0,548 sobre 1)
 * como con flash (0,276 sobre 0,5).
 *
 * De dónde sale ese 0,55 no está documentado y no se sabe. Lo que sí está medido, sobre
 * 73.675 caracteres en CUATRO alfabetos —hangul, kana/kanji, cirílico y latino—, es que se
 * cumple igual en todos. El portugués lo cerró: 0,280, la misma tarifa que el coreano. Así
 * que la hipótesis de que el descuento venía de la escritura queda descartada del todo, y
 * las generaciones antiguas en inglés a 0,965 tendrán otra explicación —otro plan, u otra
 * vía de generación— que no afecta a este proyecto.
 *
 * Y una trampa que ya costó un susto: el contador de la cuenta VA CON RETRASO. Leído justo
 * al terminar el piloto daba 470 créditos donde se habían gastado 731. Medir en caliente
 * subestima hasta un tercio; hay que esperar unos minutos y volver a leer.
 */
const CREDITOS_POR_CARACTER = {
  eleven_multilingual_v2: { medido: 0.548, nominal: 1.0 },
  eleven_flash_v2_5: { medido: 0.277, nominal: 0.5 },
}
/** Idiomas con tarifa medida de verdad en una tanda completa. */
const TARIFA_MEDIDA = new Set(['coreano', 'japones', 'ruso', 'portugues'])

function creditosDe(lang, chars, model) {
  const tabla = CREDITOS_POR_CARACTER[model] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2
  return Math.ceil(chars * tabla.medido)
}

/** Techo pesimista para los idiomas aún sin medir: la tarifa nominal de ElevenLabs. */
function creditosPeorCaso(lang, chars, model) {
  const tabla = CREDITOS_POR_CARACTER[model] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2
  return Math.ceil(chars * (TARIFA_MEDIDA.has(lang) ? tabla.medido : tabla.nominal))
}

const args = process.argv.slice(2)
const has = (flag) => args.includes(flag)
const value = (flag) => (has(flag) ? args[args.indexOf(flag) + 1] : null)

const doGenerate = has('--generate')
const pilotOnly = has('--pilot')
const onlyLang = value('--lang')
const onlyLevel = value('--level')
const onlyEpisode = value('--episode') ? Number(value('--episode')) : null

function readEnv() {
  const file = path.join(repoRoot, '.env.local')
  if (!fs.existsSync(file)) return {}
  return Object.fromEntries(
    fs.readFileSync(file, 'utf8')
      .split('\n')
      .filter((line) => line.includes('=') && !line.trim().startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()]
      }),
  )
}

function loadSeries(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

function allSeries() {
  return fs.readdirSync(seriesDir)
    .map((name) => ({ name, match: name.match(/^([a-z]+)-(a1|a2|b1)-series\.ts$/u) }))
    .filter((entry) => entry.match)
    .map((entry) => ({ lang: entry.match[1], level: entry.match[2], file: path.join(seriesDir, entry.name) }))
    .sort((a, b) => (a.level === b.level ? a.lang.localeCompare(b.lang) : a.level.localeCompare(b.level)))
    .filter((entry) => !onlyLang || entry.lang === onlyLang)
    .filter((entry) => !onlyLevel || entry.level === onlyLevel)
    .map((entry) => ({ ...entry, series: loadSeries(entry.file) }))
}

/**
 * Turnos del piloto.
 *
 * Dos objetivos que no se cumplen con turnos sueltos:
 *  1. Continuidad. Los criterios de aprobación incluyen «volumen homogéneo entre turnos»
 *     y ritmo natural, y eso solo se oye en un diálogo seguido → episodio 1 COMPLETO.
 *  2. Cobertura por peso. Las voces que más hablan son las que más daño hacen si fallan,
 *     y algunas no salen en el episodio 1 (별, 田中ゆき y Елена son terceras en su serie).
 *     → un turno de cada voz del top 3 que falte, tomado de su primera aparición.
 */
function pilotTurns(lang, series) {
  const counts = new Map()
  for (const episode of series.episodes) {
    for (const turn of episode.turns) counts.set(turn.speaker, (counts.get(turn.speaker) ?? 0) + 1)
  }
  const top = new Set([...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name]) => name))

  const first = series.episodes.find((episode) => episode.order === 1) ?? series.episodes[0]
  const picked = first.turns.map((turn) => ({ episode: first, turn }))
  const covered = new Set(first.turns.map((turn) => turn.speaker))

  for (const episode of series.episodes) {
    for (const turn of episode.turns) {
      if (top.has(turn.speaker) && !covered.has(turn.speaker)) {
        covered.add(turn.speaker)
        picked.push({ episode, turn })
      }
    }
  }
  return picked
}

// ─────────────────────────────────────────────────────────────────────────────
// Reparto de voces
// ─────────────────────────────────────────────────────────────────────────────

function initCasting() {
  const casting = {
    _lee_esto: [
      'Reparto de voces de las series de listening A1.',
      'Cada personaje necesita un voice_id de tu cuenta de ElevenLabs.',
      'Consíguelos con: node scripts/generate-listening-audio.mjs --voices',
      'El script se niega a generar mientras quede un voice_id vacío.',
    ],
    defaults: {
      model_id: 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128',
      voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
    },
    languages: {},
  }

  for (const { lang, series } of allSeries()) {
    const counts = new Map()
    for (const episode of series.episodes) {
      for (const turn of episode.turns) counts.set(turn.speaker, (counts.get(turn.speaker) ?? 0) + 1)
    }
    const profiles = new Map(series.characters.map((character) => [character.name, character]))
    const cast = {}
    for (const [name, turns] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
      const profile = profiles.get(name)
      cast[name] = {
        voice_id: '',
        turnos: turns,
        papel: profile?.role ?? '',
        perfil_de_voz: profile?.voiceProfile ?? '',
      }
    }
    casting.languages[lang] = {
      locale: series.locale,
      // 0,7–1,2 es el rango seguro documentado; por debajo suena arrastrado.
      speed: lang === 'coreano' || lang === 'japones' ? 0.9 : 0.92,
      cast,
    }
  }

  fs.writeFileSync(castingPath, `${JSON.stringify(casting, null, 2)}\n`)
  const total = Object.values(casting.languages).reduce((sum, entry) => sum + Object.keys(entry.cast).length, 0)
  console.log(`✓ ${path.relative(repoRoot, castingPath)} creado con ${total} personajes sin asignar.`)
  console.log('  Rellena cada voice_id antes de generar.')
}

function loadCasting() {
  if (!fs.existsSync(castingPath)) {
    console.error(`✗ Falta ${path.relative(repoRoot, castingPath)}.`)
    console.error('  Créalo con: node scripts/generate-listening-audio.mjs --init-casting')
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(castingPath, 'utf8'))
}

/** Ningún turno puede quedarse sin voz: si falla, falla ANTES de gastar. */
function checkCasting(casting) {
  const problems = []
  for (const { lang, level, series } of allSeries()) {
    const entry = casting.languages?.[lang]
    if (!entry) { problems.push(`${lang}: no está en el reparto`); continue }
    void level
    const speakers = new Set()
    for (const episode of series.episodes) for (const turn of episode.turns) speakers.add(turn.speaker)
    for (const speaker of speakers) {
      const voice = entry.cast?.[speaker]
      if (!voice) problems.push(`${lang}/${level} · ${speaker}: sin entrada en el reparto`)
      else if (!voice.voice_id) problems.push(`${lang}/${level} · ${speaker}: voice_id vacío (${voice.turnos} turnos)`)
    }
  }
  return problems
}

// ─────────────────────────────────────────────────────────────────────────────
// Factura previa
// ─────────────────────────────────────────────────────────────────────────────

function dryRun(casting) {
  if (!allSeries().length) {
    console.error('✗ Ningún fichero de serie coincide con los filtros dados.')
    if (onlyLang) console.error(`  --lang ${onlyLang}`)
    if (onlyLevel) console.error(`  --level ${onlyLevel}`)
    console.error('  Un conjunto vacío no se aprueba: revisa el filtro antes de seguir.')
    process.exit(1)
  }

  let grandChars = 0
  let grandTurns = 0
  const charsPorIdioma = new Map()
  const outOfBand = []

  console.log(`FACTURA PREVIA${pilotOnly ? ' — PILOTO' : ''} — no se llama a la API, no se gasta ningún crédito.\n`)

  if (pilotOnly) {
    console.log('El piloto es el episodio 1 COMPLETO de cada idioma —diálogo seguido, para poder juzgar')
    console.log('el volumen entre turnos y el ritmo— más un turno de cada voz del top 3 que no salga')
    console.log('en él. Un piloto que no toca las voces de más peso no reduce el riesgo que dice reducir.\n')
  }

  for (const { lang, level, series } of allSeries()) {
    const cps = CPS_ESTIMADO[lang] ?? 14
    let chars = 0
    let turns = 0

    if (pilotOnly) {
      const picked = pilotTurns(lang, series)
      chars = picked.reduce((sum, item) => sum + item.turn.target.length, 0)
      turns = picked.length
      grandChars += chars
      grandTurns += turns
      charsPorIdioma.set(lang, (charsPorIdioma.get(lang) ?? 0) + chars)
      console.log(`${(lang + '/' + level).padEnd(14)} ${String(turns).padStart(4)} turnos  ${String(chars).padStart(6)} caracteres   voces: ${picked.map((item) => item.turn.speaker).join(', ')}`)
      continue
    }

    for (const episode of series.episodes) {
      if (onlyEpisode && episode.order !== onlyEpisode) continue
      const episodeChars = episode.turns.reduce((sum, turn) => sum + turn.target.length, 0)
      const estimated = episodeChars / cps + (episode.turns.length - 1) * SILENCE_SECONDS
      chars += episodeChars
      turns += episode.turns.length
      const [bandMin, bandMax] = DURATION_BANDS[level] ?? DURATION_BANDS.a1
      if (estimated < bandMin || estimated > bandMax) {
        outOfBand.push({ lang: lang + '/' + level, order: episode.order, id: episode.id, chars: episodeChars, estimated: estimated.toFixed(1), declared: episode.duration, band: `${bandMin}–${bandMax}` })
      }
    }

    grandChars += chars
    grandTurns += turns
    charsPorIdioma.set(lang, (charsPorIdioma.get(lang) ?? 0) + chars)
    console.log(`${(lang + '/' + level).padEnd(14)} ${String(turns).padStart(4)} turnos  ${String(chars).padStart(6)} caracteres   (${cps} car/s estimados)`)
  }

  console.log('\n' + '─'.repeat(64))
  console.log(`TOTAL: ${grandTurns} turnos, ${grandChars.toLocaleString('es')} caracteres.`)
  // Tarifas medidas en el piloto: el hangul se cobra a ~0,55, no a 1. Sumar caracteres y
  // multiplicar por uno sobrestimaba el coreano y el japonés casi al doble.
  for (const model of ['eleven_multilingual_v2', 'eleven_flash_v2_5']) {
    let total = 0
    let techo = 0
    for (const [lang, chars] of charsPorIdioma) {
      total += creditosDe(lang, chars, model)
      techo += creditosPeorCaso(lang, chars, model)
    }
    const rango = techo > total ? ` (hasta ${techo.toLocaleString('es')} si el latino paga tarifa nominal)` : ''
    console.log(`  ${model.padEnd(23)} → ${total.toLocaleString('es')} créditos${rango}`)
  }
  console.log('  Tarifa medida sobre 73.675 caracteres en hangul, kana, cirílico y latino: 0,277-0,280 en los cuatro.')

  const bands = Object.entries(DURATION_BANDS).map(([level, [min, max]]) => `${level.toUpperCase()} ${min}–${max}s`).join(' · ')
  if (outOfBand.length) {
    console.log(`\n⚠ ${outOfBand.length} episodios se saldrían de su banda (${bands}).`)
    console.log('  Recortar el texto DESPUÉS de generar significa pagar dos veces. Revísalos antes:')
    for (const item of outOfBand.slice(0, 12)) {
      console.log(`   ${item.lang} ep${String(item.order).padStart(2)}  ${String(item.chars).padStart(4)} car → ~${item.estimated}s  (banda ${item.band}s, declarado: ${item.declared}s)`)
    }
    if (outOfBand.length > 12) console.log(`   … y ${outOfBand.length - 12} más`)
  } else {
    console.log(`\n✓ Todos los episodios caen dentro de su banda (${bands}).`)
  }

  const problems = checkCasting(casting)
  console.log()
  if (problems.length) {
    console.log(`✗ Reparto incompleto: ${problems.length} personajes sin voz. No se puede generar.`)
    for (const problem of problems.slice(0, 10)) console.log(`   - ${problem}`)
    if (problems.length > 10) console.log(`   … y ${problems.length - 10} más`)
  } else {
    console.log('✓ Reparto completo: todos los personajes tienen voice_id.')
  }

  console.log('\nPara generar de verdad hay que añadir --generate. Sin esa bandera este script nunca gasta.')
}

// ─────────────────────────────────────────────────────────────────────────────
// Generación
// ─────────────────────────────────────────────────────────────────────────────

async function speak({ key, text, voiceId, modelId, settings, locale, previous, next, outputFormat }) {
  const response = await fetch(`${API}/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: modelId,
      language_code: locale.split('-')[0],
      voice_settings: settings,
      // Continuidad prosódica entre turnos: sin esto cada línea suena leída en frío.
      ...(previous ? { previous_text: previous } : {}),
      ...(next ? { next_text: next } : {}),
    }),
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${(await response.text()).slice(0, 300)}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

/**
 * Sonoridad objetivo, en LUFS (norma EBU R128). Se normaliza TURNO A TURNO, no el episodio
 * entero: el problema no es que un audio suene bajo, es que dentro del mismo diálogo unas
 * voces suenan más que otras y el estudiante tiene que tocar el volumen a media escucha.
 *
 * Medido en el piloto de coreano: entre la voz más alta (Mr. K, −19,6) y la más baja
 * (Leeho, −25,5) había 5,9 LUFS. No es cosa del sexo de la voz —la media femenina y la
 * masculina se diferencian en 0,2— sino de que cada voz de la biblioteca viene masterizada
 * a su aire. En el episodio 1 de B1 coincidían la protagonista, de las más bajas, con su
 * interlocutor, el más alto, y por eso se notaba tanto.
 *
 * El audio ya publicado tampoco era homogéneo: inglés A1 iba de −19,5 a −22,5 y alemán A1
 * estaba en −17. Ver scripts/normalize-listening-audio.mjs para alinear esos.
 */
const LUFS_OBJETIVO = -16
const TRUE_PEAK_MAX = -1.5
/**
 * Cola máxima, en segundos, que se considera golpe y no habla.
 *
 * 0,08 s, y el número sale de mirar con qué palabras terminan los turnos.
 *
 * Empezó en 0,25 y bajó a 0,12 persiguiendo golpes que se escapaban. Fue un error: los
 * turnos italianos acaban en «tu», «noi», «io», «ho», «fa», y esos monosílabos duran entre
 * 90 y 140 ms. Con la cola en 0,12 el recorte se los habría comido — habría borrado habla
 * para quitar un ruido, que es peor que el ruido.
 *
 * El golpe de ElevenLabs mide 30–40 ms. Ninguna palabra baja de 80. Ahí está la frontera, y
 * se elige pecando de conservador: ante la duda, se conserva el audio.
 */
const COLA_MAXIMA = 0.08

/**
 * Prepara un turno para el pegado: lo pasa a PCM, le recorta el silencio de los extremos
 * y lo nivela a la sonoridad objetivo.
 *
 * El paso a PCM (wav) no es un detalle. Antes se pegaban los mp3 ya codificados, y como las
 * tramas MP3 no caen en una muestra exacta —el codificador mete retardo y relleno en cada
 * archivo—, en CADA cambio de personaje quedaba un pitido de unos 36 ms entre los dos
 * silencios. David lo oyó antes de que ninguna comprobación lo detectara: «cuando cambian
 * los personajes hay un sonido raro». Descodificando primero y codificando UNA sola vez al
 * final, esas junturas desaparecen porque ya no existen.
 *
 * El recorte de extremos arregla lo segundo que se vio al medir: cada corte de ElevenLabs
 * trae su propia cola de silencio, así que entre turnos había 0,88 s en vez de los 0,5 que
 * pide el guion. Un diálogo con casi un segundo entre réplicas no suena a conversación.
 */
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

function prepareSegment(segment) {
  const prepared = segment.replace(/\.mp3$/u, '-prep.wav')
  const corte = findSpeechEnd(segment)
  const filtros = [
    'silenceremove=start_periods=1:start_silence=0.05:start_threshold=-50dB',
    'areverse',
    'silenceremove=start_periods=1:start_silence=0.05:start_threshold=-50dB',
    'areverse',
    `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`,
  ]
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
    ...(corte === null ? [] : ['-t', String(corte)]),
    '-i', segment, '-af', filtros.join(','),
    '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', prepared])
  return prepared
}

function concatWithSilence(segments, outputPath) {
  const dir = path.dirname(segments[0])
  const listFile = path.join(dir, 'lista.txt')
  const silence = path.join(dir, 'silencio.wav')

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-t', String(SILENCE_SECONDS),
    '-i', 'anullsrc=r=44100:cl=mono', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', silence])

  const leveled = segments.map(prepareSegment)

  const lines = []
  leveled.forEach((segment, index) => {
    if (index > 0) lines.push(`file '${silence}'`)
    lines.push(`file '${segment}'`)
  })
  fs.writeFileSync(listFile, lines.join('\n'))

  // Una única codificación a mp3, sobre el PCM ya pegado.
  /**
   * Nivelado final del episodio entero, además del que se hace turno a turno.
   *
   * Los dos hacen cosas distintas y hacen falta los dos. El de cada turno iguala las voces
   * ENTRE SÍ, que es lo que arregla que una hable más bajo que otra. Este fija el nivel
   * ABSOLUTO del episodio, que el otro no puede garantizar: `loudnorm` mide mal en
   * fragmentos de dos o tres segundos, y ese error se acumula. Se vio en el francés, cuyos
   * turnos son más cortos: nueve episodios salieron entre −18,6 y −19,2 LUFS cuando el
   * objetivo es −16.
   *
   * Después va el limitador, sobre la señal ya nivelada.
   */
  /**
   * Limitador antes de codificar. `loudnorm` en una pasada apunta al objetivo de sonoridad
   * pero no garantiza el techo de pico: la auditoría encontró episodios a +2,3 dBFS, que es
   * saturación audible. Se aplica sobre el PCM ya pegado, una sola vez, para no comprimir
   * dos veces la misma señal.
   *
   * El techo es 0,7 (−3,1 dBFS) y no algo más alto porque la codificación a mp3 mete
   * sobreimpulso: medido sobre el mismo episodio, 0,89 dejaba el pico real en +0,9 dBFS y
   * 0,79 en +0,3. Solo 0,7 baja de cero, y la sonoridad apenas se mueve (−17,6 LUFS).
   *
   * `level=false` es imprescindible. El auto-nivelado de alimiter viene activado por defecto
   * y devuelve la señal a fondo de escala, con lo que el limitador no sirve de nada. La
   * primera versión ponía `level=disabled`, que no es un booleano válido de ffmpeg: no dio
   * error y no hizo nada, y los picos siguieron a 0 dBFS en 85 episodios.
   */
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile,
    '-af', `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11,alimiter=level_in=1:level_out=1:limit=0.7:attack=5:release=50:level=false`,
    '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ar', '44100', '-ac', '1', outputPath])
}

function measure(file) {
  return Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'csv=p=0', file]).toString().trim())
}

/** La duración real del mp3 manda: el resaltado por oración se calcula con ella. */
function writeBackDuration(file, episodeId, seconds) {
  const source = fs.readFileSync(file, 'utf8')
  const pattern = new RegExp(`(id: '${episodeId}',[^\\n]*?duration: )(\\d+)`)
  if (!pattern.test(source)) return false
  fs.writeFileSync(file, source.replace(pattern, `$1${Math.round(seconds)}`))
  return true
}

async function generate(casting) {
  const env = readEnv()
  const key = env.ELEVENLABS_API_KEY
  if (!key) {
    console.error('✗ Falta ELEVENLABS_API_KEY en .env.local.')
    process.exit(1)
  }

  const problems = checkCasting(casting)
  if (problems.length) {
    console.error(`✗ Reparto incompleto (${problems.length}). No se genera nada.`)
    for (const problem of problems.slice(0, 10)) console.error(`   - ${problem}`)
    process.exit(1)
  }

  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : { episodios: [] }
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-listening-'))
  let spent = 0

  for (const { lang, level, file, series } of allSeries()) {
    const config = casting.languages[lang]
    const outDir = path.join(repoRoot, 'public', 'audio', lang, level)
    fs.mkdirSync(outDir, { recursive: true })

    const episodes = pilotOnly
      ? [...new Set(pilotTurns(lang, series).map((item) => item.episode))]
      : series.episodes.filter((episode) => !onlyEpisode || episode.order === onlyEpisode)

    const pilotSpeakers = pilotOnly ? new Set(pilotTurns(lang, series).map((item) => item.turn.speaker)) : null

    for (const episode of episodes) {
      const turns = pilotOnly ? episode.turns.filter((turn) => pilotSpeakers.has(turn.speaker)) : episode.turns
      if (!turns.length) continue

      const segments = []
      for (const [index, turn] of turns.entries()) {
        const voice = config.cast[turn.speaker]
        const settings = { ...casting.defaults.voice_settings, speed: config.speed, ...(voice.voice_settings ?? {}) }
        const common = {
          key,
          text: turn.target,
          modelId: voice.model_id ?? casting.defaults.model_id,
          settings,
          locale: config.locale,
          previous: index > 0 ? turns[index - 1].target : null,
          next: index < turns.length - 1 ? turns[index + 1].target : null,
          outputFormat: casting.defaults.output_format,
        }
        const segment = path.join(temp, `${lang}-${episode.order}-${String(index).padStart(2, '0')}.mp3`)

        /**
         * Los turnos de coro («Todos», «Tous», «Tutti», «Alle») se generan con UNA sola voz.
         *
         * Al principio se mezclaban varias diciendo la misma línea, porque una voz sola
         * anunciando «¡felicidades!» parecía pobre. Sonaba mal: superponer señales casi
         * idénticas da filtrado de peine, no un grupo. Escalonar las tomas 70 y 130 ms
         * tampoco lo arregló, y David lo resumió bien — «se sienten varias personas
         * hablando a la vez»—, que es literalmente lo que era.
         *
         * El error fue de prioridad. Esto es un ejercicio de comprensión auditiva de nivel
         * A1: el estudiante tiene que poder distinguir cada palabra de «Parabéns, seu
         * Antônio!». Dos voces encima de otra lo hacen imposible por bien mezcladas que
         * estén. El grupo se entiende por el guion, que dice quién habla, no por el audio.
         */
        const audio = await speak({ ...common, voiceId: voice.voice_id })
        spent += turn.target.length
        fs.writeFileSync(segment, audio)
        segments.push(segment)
        process.stdout.write(`\r  ${lang} ep${String(episode.order).padStart(2)} · turno ${index + 1}/${turns.length} · ${spent} caracteres    `)
      }

      const suffix = pilotOnly ? `piloto-${lang}-ep${String(episode.order).padStart(2, '0')}.mp3` : `listening-${String(episode.order).padStart(2, '0')}.mp3`
      const outFile = path.join(outDir, suffix)
      concatWithSilence(segments, outFile)
      const seconds = measure(outFile)

      if (!pilotOnly) writeBackDuration(file, episode.id, seconds)

      const chars = turns.reduce((sum, turn) => sum + turn.target.length, 0)
      manifest.episodios = manifest.episodios.filter((item) => !(item.idioma === lang && item.episodio === episode.order && item.piloto === pilotOnly))
      manifest.episodios.push({
        idioma: lang,
        episodio: episode.order,
        id: episode.id,
        piloto: pilotOnly,
        archivo: path.relative(repoRoot, outFile),
        caracteres: chars,
        duracion_real: Number(seconds.toFixed(2)),
        caracteres_por_segundo: Number((chars / seconds).toFixed(2)),
        duracion_declarada_previa: episode.duration,
        modelo: casting.defaults.model_id,
        velocidad: config.speed,
        voces: Object.fromEntries([...new Set(turns.map((turn) => turn.speaker))].map((speaker) => [speaker, config.cast[speaker].voice_id])),
        ajustes: casting.defaults.voice_settings,
      })
      console.log(`\n  ✓ ${path.relative(repoRoot, outFile)} — ${seconds.toFixed(1)}s, ${chars} caracteres, ${(chars / seconds).toFixed(1)} car/s`)
    }
  }

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  fs.rmSync(temp, { recursive: true, force: true })

  console.log(`\nCaracteres enviados a la API: ${spent.toLocaleString('es')}.`)
  console.log(`Manifiesto: ${path.relative(repoRoot, manifestPath)}`)

  /**
   * Auditoría inmediata de lo que se acaba de montar.
   *
   * Va aquí y no en el prebuild por dos razones: medir 240 mp3 con ffmpeg tarda varios
   * minutos y no tiene sentido pagarlos en cada build, y sobre todo porque este es el
   * momento útil — si el montaje salió mal, se rehace con rebuild-listening-audio.mjs sin
   * gastar créditos, y cuanto antes se sepa, menos audio malo se publica.
   *
   * Los tres defectos que llegaron a producción (niveles dispares, el golpe de ElevenLabs
   * en cada cambio de voz y el coro superpuesto) los habría cazado esta llamada.
   */
  console.log('\n─── auditoría del ensamblado ───')
  const auditor = spawnSync('node', [
    path.join(scriptDir, 'audit-listening-audio.mjs'),
    ...(onlyLang ? ['--lang', onlyLang] : []),
    ...(onlyLevel ? ['--level', onlyLevel] : []),
  ], { stdio: 'inherit' })
  if (auditor.status !== 0) {
    console.error('\n✗ El audio generado NO pasa la auditoría de ensamblado.')
    console.error('  Arregla la tubería y rehaz el montaje sin volver a pagar:')
    console.error(`  node scripts/rebuild-listening-audio.mjs --write${onlyLang ? ` --lang ${onlyLang}` : ''}`)
    process.exitCode = 1
    return
  }
  console.log('\nEscucha igualmente un archivo COMPLETO antes de lanzar el siguiente lote:')
  console.log('la auditoría mide el montaje, no juzga si la voz encaja con el personaje.')
}

async function listVoices() {
  const env = readEnv()
  const response = await fetch(`${API}/v2/voices?page_size=100`, { headers: { 'xi-api-key': env.ELEVENLABS_API_KEY } })
  if (!response.ok) {
    console.error(`✗ ${response.status}: ${(await response.text()).slice(0, 300)}`)
    console.error('  Si dice que falta «voices_read», edita la API key en elevenlabs.io y añade ese permiso.')
    process.exit(1)
  }
  const data = await response.json()
  for (const voice of data.voices ?? []) {
    const labels = voice.labels ?? {}
    console.log(`${(voice.name ?? '').padEnd(20)} ${(labels.gender ?? '?').padEnd(8)} ${(labels.age ?? '?').padEnd(12)} ${(labels.accent ?? '').padEnd(16)} ${voice.voice_id}`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────

if (has('--init-casting')) {
  initCasting()
} else if (has('--voices')) {
  await listVoices()
} else if (doGenerate) {
  await generate(loadCasting())
} else {
  dryRun(fs.existsSync(castingPath) ? loadCasting() : { languages: {} })
}
