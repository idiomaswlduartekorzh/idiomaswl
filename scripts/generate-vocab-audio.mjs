import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Audio del vocabulario de práctica.
 *
 * SEGURIDAD DE CRÉDITOS — la misma regla que `generate-listening-audio.mjs`, y por la misma
 * razón: sin `--generate` este script NO llama a la API. El modo por defecto es la factura
 * previa, que imprime el coste exacto antes de gastar. Los créditos son el único recurso de
 * este proyecto que no se puede deshacer.
 *
 *   node scripts/generate-vocab-audio.mjs                          # factura, no gasta
 *   node scripts/generate-vocab-audio.mjs --lang ingles --level a1 # factura de un nivel
 *   node scripts/generate-vocab-audio.mjs --solo-palabras          # factura sin las frases
 *   node scripts/generate-vocab-audio.mjs --bloque comida-y-bebida --generate
 *
 * QUÉ GENERA, y por qué así.
 *
 * Un mp3 POR UNIDAD, no por palabra. Las 8.400 entradas del catálogo completo darían 16.800
 * archivos sueltos y unos 270 MB; agrupadas de diez en diez son 840 archivos. Cuesta lo mismo
 * en créditos —se factura por carácter, no por petición— y quita de en medio un problema de
 * despliegue que ya obligó a sacar los assets de coreano del repositorio.
 *
 * Dentro de cada mp3 van, en orden: palabra 1, su frase, palabra 2, su frase… separadas por
 * medio segundo de silencio. El manifiesto guarda el segundo exacto en que empieza y termina
 * cada corte, medido con ffprobe sobre el archivo real. Igual que en escucha, la duración no
 * se estima: si el número miente, el reproductor corta la palabra por la mitad.
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const vocabDir = path.join(repoRoot, 'src', 'data', 'practica', 'vocabulario')
const castingPath = path.join(scriptDir, 'listening-voice-casting.json')
const manifestPath = path.join(vocabDir, 'audio-manifest.json')
const audioRoot = path.join(repoRoot, 'public', 'audio', 'vocabulario')

const API = 'https://api.elevenlabs.io'
const SILENCE_SECONDS = 0.5
const BITRATE = '64k'

/**
 * Créditos por carácter, medidos — no los nominales de la web.
 *
 * Los toma tal cual de `generate-listening-audio.mjs`, que los midió sobre 73.675 caracteres
 * reales en cuatro alfabetos y encontró que flash cobra 0,277 y no 0,5. Duplicar la constante
 * sería duplicar la mentira el día que cambie la tarifa, así que aquí queda anotado de dónde
 * sale y se comprueba contra el script de escucha en el arranque.
 */
const CREDITOS_POR_CARACTER = {
  eleven_flash_v2_5: { medido: 0.277, nominal: 0.5 },
  eleven_multilingual_v2: { medido: 0.548, nominal: 1.0 },
}

const args = process.argv.slice(2)
const has = (flag) => args.includes(flag)
const value = (flag) => (has(flag) ? args[args.indexOf(flag) + 1] : null)

const doGenerate = has('--generate')
const soloPalabras = has('--solo-palabras')
const langFilter = value('--lang')
const levelFilter = value('--level')
const bloqueFilter = value('--bloque')

// ─────────────────────────────────────────────────────────────────────────────
// Carga del catálogo
// ─────────────────────────────────────────────────────────────────────────────

/** Igual que el de `check-vocabulario.mjs`: resuelve las importaciones relativas del catálogo. */
const cacheModulos = new Map()

function loadModule(file) {
  const abs = path.resolve(file)
  if (cacheModulos.has(abs)) return cacheModulos.get(abs)
  const source = fs.readFileSync(abs, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: abs,
  })
  const module = { exports: {} }
  cacheModulos.set(abs, module.exports)
  const requireRelativo = (spec) => {
    if (!spec.startsWith('.')) return require(spec)
    const base = path.resolve(path.dirname(abs), spec)
    for (const candidato of [base, `${base}.ts`, `${base}.json`, path.join(base, 'index.ts')]) {
      if (!fs.existsSync(candidato) || fs.statSync(candidato).isDirectory()) continue
      if (candidato.endsWith('.json')) return JSON.parse(fs.readFileSync(candidato, 'utf8'))
      return loadModule(candidato)
    }
    throw new Error(`loadModule: no se pudo resolver «${spec}»`)
  }
  Function('module', 'exports', 'require', compiled.outputText)(module, module.exports, requireRelativo)
  cacheModulos.set(abs, module.exports)
  return module.exports
}

/** Los niveles escritos hasta ahora, leídos del registro y no de una lista a mano. */
function niveles() {
  const out = []
  for (const file of fs.readdirSync(vocabDir)) {
    const m = file.match(/^([a-z]+)-(a1|a2|b1)\.ts$/)
    if (!m) continue
    const [, lang, level] = m
    if (langFilter && lang !== langFilter) continue
    if (levelFilter && level !== levelFilter) continue
    const mod = loadModule(path.join(vocabDir, file))
    const nivel = Object.values(mod).find((v) => v && typeof v === 'object' && 'bloques' in v)
    if (nivel) out.push(nivel)
  }
  return out
}

/**
 * Las unidades, tomadas del registro y no reimplementadas aquí.
 *
 * Tener una copia del reparto en este script ya salió mal una vez, y en la misma tarde: la
 * factura contaba 4 mp3 donde el motor pinta 3, porque aquí seguía el troceado viejo de diez
 * en diez. Es el mismo patrón que el barajado de opciones dentro del JSX — lo que decide algo
 * vive en un sitio, y quien lo necesite lo importa.
 */
const { unidadesDe } = loadModule(path.join(vocabDir, 'unidades.ts'))
const unidades = (bloque) => unidadesDe(bloque)

/**
 * Lo que se le manda a la API por cada entrada.
 *
 * La palabra se dice sola y la frase entera aparte. Decir «food. The food in this café is very
 * good.» en una sola petición sale más barato en peticiones y más caro en utilidad: el
 * estudiante no puede oír solo la palabra, que es justo lo que pide el botón de la ficha.
 */
function locuciones(entrada) {
  const out = [{ clave: `${entrada.id}:lemma`, texto: entrada.lemma }]
  if (!soloPalabras) out.push({ clave: `${entrada.id}:ejemplo`, texto: entrada.ejemplo.target })
  return out
}

// ─────────────────────────────────────────────────────────────────────────────
// Factura
// ─────────────────────────────────────────────────────────────────────────────

function facturar() {
  const casting = JSON.parse(fs.readFileSync(castingPath, 'utf8'))
  const modelo = casting.defaults.model_id
  const tabla = CREDITOS_POR_CARACTER[modelo] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2

  console.log(`\nFACTURA PREVIA — nada de esto se ha gastado todavía.`)
  console.log(`modelo ${modelo} · ${tabla.medido} créditos/carácter (medido) · techo nominal ${tabla.nominal}\n`)

  let granChars = 0
  let granArchivos = 0
  let granLocuciones = 0

  for (const nivel of niveles()) {
    let nivelChars = 0
    let nivelArchivos = 0
    let nivelLoc = 0
    console.log(`── ${nivel.lang}/${nivel.nivel}`)
    for (const bloque of nivel.bloques) {
      if (bloqueFilter && bloque.id !== bloqueFilter) continue
      let chars = 0
      let loc = 0
      for (const entrada of bloque.entradas) {
        for (const l of locuciones(entrada)) {
          chars += l.texto.length
          loc += 1
        }
      }
      const archivos = unidades(bloque).length
      nivelChars += chars
      nivelArchivos += archivos
      nivelLoc += loc
      console.log(
        `   ${bloque.id.padEnd(30)} ${String(bloque.entradas.length).padStart(3)} entradas · ` +
          `${String(loc).padStart(3)} locuciones · ${String(chars).padStart(6)} car · ` +
          `${archivos} mp3`,
      )
    }
    console.log(
      `   ${'TOTAL'.padEnd(30)} ${String(nivelChars).padStart(20)} car → ` +
        `${Math.ceil(nivelChars * tabla.medido).toLocaleString('es')} créditos · ${nivelArchivos} mp3\n`,
    )
    granChars += nivelChars
    granArchivos += nivelArchivos
    granLocuciones += nivelLoc
  }

  const creditos = Math.ceil(granChars * tabla.medido)
  const techo = Math.ceil(granChars * tabla.nominal)
  console.log(`TOTAL: ${granLocuciones.toLocaleString('es')} locuciones · ${granChars.toLocaleString('es')} caracteres · ${granArchivos} archivos`)
  console.log(`  créditos con la tarifa medida: ${creditos.toLocaleString('es')}`)
  console.log(`  techo si ElevenLabs cobrara la nominal: ${techo.toLocaleString('es')}`)
  if (soloPalabras) console.log(`  (--solo-palabras: las frases de ejemplo NO entran)`)

  comprobarEntorno()
  console.log(`\nPara generar de verdad hay que añadir --generate. Sin esa bandera este script nunca gasta.`)
}

/** Lo que haría falta para que `--generate` no se quede a medias y gaste sin producir. */
function comprobarEntorno() {
  console.log(`\ncomprobaciones previas:`)
  const env = leerEnv()
  console.log(`  ELEVENLABS_API_KEY  ${env.ELEVENLABS_API_KEY ? '✓ presente' : '✗ falta en .env.local'}`)
  for (const bin of ['ffmpeg', 'ffprobe']) {
    try {
      execFileSync(bin, ['-version'], { stdio: 'ignore' })
      console.log(`  ${bin.padEnd(20)}✓`)
    } catch {
      console.log(`  ${bin.padEnd(20)}✗ no está instalado — sin él no se puede concatenar ni medir`)
    }
  }
  const casting = JSON.parse(fs.readFileSync(castingPath, 'utf8'))
  for (const nivel of niveles()) {
    const voz = vozDe(casting, nivel.lang)
    console.log(`  voz ${nivel.lang.padEnd(16)}${voz ? `✓ ${voz.nombre} (${voz.voice_id})` : '✗ sin voz en el reparto'}`)
  }
}

function leerEnv() {
  const file = path.join(repoRoot, '.env.local')
  if (!fs.existsSync(file)) return {}
  const out = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
  return out
}

/**
 * La voz del vocabulario es la del personaje protagonista de la serie de ese idioma.
 *
 * No es capricho: el estudiante ya lleva veinte episodios oyendo esa voz, y el ejemplo de la
 * ficha sale literalmente de esos episodios. Meter un locutor distinto para decir la misma
 * frase rompe el hilo por ahorrarse una decisión.
 */
function vozDe(casting, lang) {
  const cast = casting.languages?.[lang]?.cast
  if (!cast) return null
  const [nombre, datos] = Object.entries(cast)[0]
  return { nombre, voice_id: datos.voice_id, locale: casting.languages[lang].locale, speed: casting.languages[lang].speed }
}

// ─────────────────────────────────────────────────────────────────────────────

if (!doGenerate) {
  facturar()
  process.exit(0)
}

// ─────────────────────────────────────────────────────────────────────────────
// Generación
// ─────────────────────────────────────────────────────────────────────────────

const LUFS_OBJETIVO = -16
const TRUE_PEAK_MAX = -1.5

async function hablar({ key, texto, voiceId, modelId, settings, locale, speed }) {
  const res = await fetch(`${API}/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: texto,
      model_id: modelId,
      language_code: locale.split('-')[0],
      voice_settings: { ...settings, ...(speed ? { speed } : {}) },
    }),
  })
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * Recorta el silencio de los bordes y nivela la sonoridad de cada locución por separado.
 *
 * Nivelar corte a corte importa más aquí que en escucha: en el mismo mp3 van una palabra
 * suelta de medio segundo y una frase de tres, y `loudnorm` sobre la mezcla dejaría la
 * palabra por debajo. El estudiante pulsa «escuchar» sobre una palabra concreta, no sobre
 * el archivo.
 */
function prepararCorte(mp3) {
  const wav = mp3.replace(/\.mp3$/u, '-prep.wav')
  const filtros = [
    'silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB',
    'areverse',
    'silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB',
    'areverse',
    `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`,
  ]
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp3, '-af', filtros.join(','),
    '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', wav])
  return wav
}

const medir = (file) =>
  Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim())

/**
 * Pega los cortes con medio segundo de silencio y devuelve dónde cae cada uno.
 *
 * Las posiciones se calculan sobre los WAV ya preparados, no sobre lo que devolvió la API:
 * el recorte de silencio cambia la duración, y usar la de antes desplazaría cada corte un
 * poco más que el anterior. Al final se comprueba contra el mp3 real —igual que escucha
 * mide el episodio con ffprobe— porque un desfase acumulado corta la palabra por la mitad.
 */
function pegar(cortes, salida) {
  const dir = path.dirname(cortes[0].mp3)
  const silencio = path.join(dir, 'silencio.wav')
  const lista = path.join(dir, 'lista.txt')
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-t', String(SILENCE_SECONDS),
    '-i', 'anullsrc=r=44100:cl=mono', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', silencio])

  const lineas = []
  const posiciones = []
  let reloj = 0
  cortes.forEach((corte, i) => {
    const wav = prepararCorte(corte.mp3)
    if (i > 0) {
      lineas.push(`file '${silencio}'`)
      reloj += SILENCE_SECONDS
    }
    lineas.push(`file '${wav}'`)
    const dur = medir(wav)
    posiciones.push({ clave: corte.clave, texto: corte.texto, inicio: Number(reloj.toFixed(3)), fin: Number((reloj + dur).toFixed(3)) })
    reloj += dur
  })
  fs.writeFileSync(lista, lineas.join('\n'))

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lista,
    '-af', `alimiter=level_in=1:level_out=1:limit=0.7:attack=5:release=50:level=false`,
    '-c:a', 'libmp3lame', '-b:a', BITRATE, '-ar', '44100', '-ac', '1', salida])

  return { posiciones, previsto: reloj }
}

async function generar() {
  const env = leerEnv()
  const key = env.ELEVENLABS_API_KEY
  if (!key) {
    console.error('✗ Falta ELEVENLABS_API_KEY en .env.local.')
    process.exit(1)
  }
  const casting = JSON.parse(fs.readFileSync(castingPath, 'utf8'))
  const modelo = casting.defaults.model_id
  const ajustes = casting.defaults.voice_settings

  const manifiesto = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : { unidades: [] }

  let gastados = 0

  for (const nivel of niveles()) {
    const voz = vozDe(casting, nivel.lang)
    if (!voz) {
      console.error(`✗ ${nivel.lang} no tiene voz en el reparto. Se salta.`)
      continue
    }
    for (const bloque of nivel.bloques) {
      if (bloqueFilter && bloque.id !== bloqueFilter) continue
      const us = unidades(bloque)
      for (const [i, unidad] of us.entries()) {
        const nombre = `${bloque.id}-u${i + 1}`
        const destino = path.join(audioRoot, nivel.lang, nivel.nivel)
        const salida = path.join(destino, `${nombre}.mp3`)
        const rel = path.relative(repoRoot, salida)
        if (fs.existsSync(salida) && !has('--rehacer')) {
          console.log(`   · ${rel} ya existe — se salta (usa --rehacer para regenerarlo)`)
          continue
        }
        fs.mkdirSync(destino, { recursive: true })
        const tmp = fs.mkdtempSync(path.join(repoRoot, '.vocab-audio-'))
        try {
          const cortes = []
          for (const entrada of unidad) {
            for (const l of locuciones(entrada)) {
              process.stdout.write(`\r   ${nombre} · ${cortes.length + 1} locuciones   `)
              const buf = await hablar({
                key, texto: l.texto, voiceId: voz.voice_id, modelId: modelo,
                settings: ajustes, locale: voz.locale, speed: voz.speed,
              })
              const mp3 = path.join(tmp, `${String(cortes.length).padStart(3, '0')}.mp3`)
              fs.writeFileSync(mp3, buf)
              cortes.push({ ...l, mp3 })
              gastados += l.texto.length
            }
          }
          const { posiciones, previsto } = pegar(cortes, salida)
          const real = medir(salida)
          // El mp3 real manda. Si se desvía del previsto, el reproductor cortaría palabras.
          const desfase = Math.abs(real - previsto)
          console.log(`\n   ✓ ${rel} — ${real.toFixed(1)}s, ${posiciones.length} cortes${desfase > 0.35 ? `  ⚠ desfase ${desfase.toFixed(2)}s` : ''}`)
          const escala = previsto > 0 ? real / previsto : 1
          manifiesto.unidades = manifiesto.unidades.filter((u) => u.archivo !== rel)
          manifiesto.unidades.push({
            idioma: nivel.lang, nivel: nivel.nivel, bloque: bloque.id, unidad: i + 1,
            archivo: rel, duracion: real, modelo, voz: voz.voice_id,
            cortes: posiciones.map((p) => ({
              ...p,
              inicio: Number((p.inicio * escala).toFixed(3)),
              fin: Number((p.fin * escala).toFixed(3)),
            })),
          })
          fs.writeFileSync(manifestPath, `${JSON.stringify(manifiesto, null, 2)}\n`)
        } finally {
          fs.rmSync(tmp, { recursive: true, force: true })
        }
      }
    }
  }

  const tabla = CREDITOS_POR_CARACTER[modelo] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2
  console.log(`\nGastado: ${gastados.toLocaleString('es')} caracteres ≈ ${Math.ceil(gastados * tabla.medido).toLocaleString('es')} créditos.`)
  console.log(`Manifiesto: ${path.relative(repoRoot, manifestPath)}`)
}

await generar()
