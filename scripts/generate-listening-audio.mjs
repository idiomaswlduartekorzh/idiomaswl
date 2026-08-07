import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
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
 * Créditos por carácter, MEDIDOS contra el saldo de la cuenta antes y después del piloto
 * de coreano del 6 de agosto de 2026 (1.334 caracteres con cada modelo):
 *
 *   multilingual_v2  731 créditos → 0,548 por carácter
 *   flash_v2_5       367 créditos → 0,275 por carácter
 *
 * Dos cosas que la documentación no dice y que el piloto sí:
 *
 * 1. El hangul NO se cobra a 1 crédito por carácter, sino a ~0,55. Las generaciones en
 *    inglés de este mismo repo salen a 0,965, así que el descuento es de la escritura,
 *    no del plan. Japonés se asume igual —misma densidad por carácter— hasta medirlo.
 *    Cirílico y latino se presuponen a tarifa plena mientras no haya medida propia.
 * 2. El contador de la cuenta VA CON RETRASO. Leído justo después de la tanda daba 470
 *    créditos; minutos más tarde, 731. Cualquier medición inmediata subestima un tercio.
 */
const CREDITOS_POR_CARACTER = {
  eleven_multilingual_v2: { cjk: 0.548, default: 1.0 },
  eleven_flash_v2_5: { cjk: 0.275, default: 0.5 },
}
const ESCRITURA_CJK = new Set(['coreano', 'japones'])

function creditosDe(lang, chars, model) {
  const tabla = CREDITOS_POR_CARACTER[model] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2
  return Math.ceil(chars * (ESCRITURA_CJK.has(lang) ? tabla.cjk : tabla.default))
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
    for (const [lang, chars] of charsPorIdioma) total += creditosDe(lang, chars, model)
    console.log(`  ${model.padEnd(23)} → ${total.toLocaleString('es')} créditos`)
  }
  console.log('  Tarifas medidas contra el saldo el 2026-08-06; latino y cirílico aún sin medir.')

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

/** Normaliza un turno a la sonoridad objetivo. Devuelve la ruta del archivo normalizado. */
function normalizeSegment(segment) {
  const normalized = segment.replace(/\.mp3$/u, '-norm.mp3')
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', segment,
    '-af', `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`,
    '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', BITRATE, normalized])
  return normalized
}

function concatWithSilence(segments, outputPath) {
  const listFile = path.join(path.dirname(segments[0]), 'lista.txt')
  const silence = path.join(path.dirname(segments[0]), 'silencio.mp3')

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-t', String(SILENCE_SECONDS),
    '-i', 'anullsrc=r=44100:cl=mono', '-c:a', 'libmp3lame', '-b:a', BITRATE, silence])

  const leveled = segments.map(normalizeSegment)

  const lines = []
  leveled.forEach((segment, index) => {
    if (index > 0) lines.push(`file '${silence}'`)
    lines.push(`file '${segment}'`)
  })
  fs.writeFileSync(listFile, lines.join('\n'))

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile,
    '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ac', '1', outputPath])
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

        // Coro («Tous», «Todos»): una sola voz cantando «¡feliz cumpleaños!» suena a error.
        // Se genera la misma línea con varias voces del reparto y se mezclan.
        const voices = [voice.voice_id, ...(voice.mezclar_con ?? [])]
        const takes = []
        for (const [take, voiceId] of voices.entries()) {
          const audio = await speak({ ...common, voiceId })
          spent += turn.target.length
          const file = path.join(temp, `${lang}-${episode.order}-${String(index).padStart(2, '0')}-v${take}.mp3`)
          fs.writeFileSync(file, audio)
          takes.push(file)
        }

        if (takes.length === 1) {
          fs.copyFileSync(takes[0], segment)
        } else {
          execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
            ...takes.flatMap((file) => ['-i', file]),
            '-filter_complex', `amix=inputs=${takes.length}:duration=longest:normalize=0,volume=${(1 / Math.sqrt(takes.length)).toFixed(2)}`,
            '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ac', '1', segment])
        }
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
  console.log('Escucha cada archivo COMPLETO antes de lanzar el siguiente lote.')
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
