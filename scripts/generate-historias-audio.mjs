#!/usr/bin/env node
/**
 * Locución de las notas de voz de las Historias con ElevenLabs.
 *
 * Hermano pequeño de scripts/generate-listening-audio.mjs y con sus mismas
 * convenciones: tarifas medidas, ajustes de voz calibrados, normalización a
 * −16 LUFS y, sobre todo, la misma regla de seguridad.
 *
 * ┌─ SEGURIDAD DE CRÉDITOS ─────────────────────────────────────────────────┐
 * │ Sin `--generate` este script NO llama a la API. El modo por defecto es   │
 * │ la factura previa: imprime carácter a carácter lo que costaría.          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 *   node scripts/generate-historias-audio.mjs --voices           # lista tus voces
 *   node scripts/generate-historias-audio.mjs                    # factura previa
 *   node scripts/generate-historias-audio.mjs --sample --generate # cata: ~2 líneas por voz
 *   node scripts/generate-historias-audio.mjs --lang aleman --generate
 *   node scripts/generate-historias-audio.mjs --only ingles/the-grandfathers-ledger/b --generate
 *
 * POR QUÉ UNA PETICIÓN POR NOTA, NO POR LÍNEA.
 * El listening encadena turno a turno porque son diálogos entre personajes. Aquí
 * cada nota es un monólogo de una sola persona de 546 a 1.690 caracteres, y el
 * límite del modelo más corto (multilingual v2) son 10.000. Mandarla entera es
 * mejor en todo: el modelo ve el arco completo y coloca el énfasis donde toca, no
 * hay costuras que empatar, y no hay que nivelar volumen entre trozos.
 *
 * LO QUE DE VERDAD CUESTA DINERO no es la tarifa: es regenerar. Una pasada
 * completa son unos pocos dólares; hacerla tres veces porque la voz no encajaba,
 * el triple. De ahí `--sample`: por el 15 % del total (~1.600 créditos) oyes las
 * 30 voces antes de comprometerte. Y baja al 8 % si repites la misma voz
 * masculina y femenina en las dos historias de cada idioma, que es legítimo
 * porque nunca coinciden en el mismo ejercicio. De ahí también que nunca se pise
 * un archivo ya escrito sin `--force`.
 *
 * EL FALLO QUE ESTO EVITA. `the-grandmothers-ledger` se grabó con voz de mujer
 * para un personaje que es el abuelo, y hubo que tirar las dos tomas. Por eso el
 * script comprueba en /v1/voices que el sexo de la voz coincide con el del
 * personaje ANTES de gastar, y se planta si no coincide.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { registerHooks } from 'node:module'

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) return nextResolve(`${specifier}.ts`, context)
      throw error
    }
  },
})

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const castingPath = path.join(scriptDir, 'historias-voice-casting.json')
const API = 'https://api.elevenlabs.io'

const { HISTORIA_LANG_KEYS, HISTORIAS_BY_LANG, HISTORIA_LANGS } =
  await import('../src/data/practica/historias/index.ts')
const { ttsTextFor, TTS_LANG_NOTES } = await import('./lib/historias-tts.mjs')

// ── Tarifas ────────────────────────────────────────────────────────────────
// Copiadas de generate-listening-audio.mjs, donde se midieron sobre tandas
// completas de esta misma cuenta. La nominal de ElevenLabs es el doble; se deja
// como techo pesimista para los idiomas cuya tarifa aún no se ha comprobado.
const CREDITOS_POR_CARACTER = {
  eleven_multilingual_v2: { medido: 0.548, nominal: 1.0 },
  eleven_flash_v2_5: { medido: 0.277, nominal: 0.5 },
}
const TARIFA_MEDIDA = new Set(['coreano', 'japones', 'ruso', 'portugues'])

const creditos = (lang, chars, model, pesimista = false) => {
  const t = CREDITOS_POR_CARACTER[model] ?? CREDITOS_POR_CARACTER.eleven_multilingual_v2
  return Math.ceil(chars * (pesimista && !TARIFA_MEDIDA.has(lang) ? t.nominal : t.medido))
}

const LUFS_OBJETIVO = -16
const TRUE_PEAK_MAX = -1.5
/** Caracteres de la cata. Dos o tres líneas: basta para juzgar timbre y ritmo. */
const SAMPLE_CHARS = 190

// ── Argumentos ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const has = f => args.includes(f)
const value = f => (has(f) ? args[args.indexOf(f) + 1] : null)

const doGenerate = has('--generate')
const doSample = has('--sample')
const force = has('--force')
const onlyLang = value('--lang')
const onlyId = value('--only')
const model = value('--model') ?? 'eleven_flash_v2_5'

function readEnv() {
  const file = path.join(repoRoot, '.env.local')
  if (!fs.existsSync(file)) return {}
  return Object.fromEntries(
    fs.readFileSync(file, 'utf8').split('\n')
      .filter(l => l.includes('=') && !l.trim().startsWith('#'))
      .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }),
  )
}
const apiKey = process.env.ELEVENLABS_API_KEY || readEnv().ELEVENLABS_API_KEY

// ── Inventario de notas ────────────────────────────────────────────────────
// El sexo viene declarado en la voz (`v.sex`). Se dedujo del papel hasta que
// llegó «the customer», un papel neutro que hacía salir a Dana como hombre: la
// comprobación que existe para no repetir lo del abuelo se volvía ciega justo
// con los personajes que no son de familia.

function inventario() {
  const out = []
  for (const lang of HISTORIA_LANG_KEYS) {
    if (onlyLang && lang !== onlyLang) continue
    for (const h of HISTORIAS_BY_LANG[lang]) {
      for (const v of h.voices) {
        const id = `${lang}/${h.slug}/${v.key}`
        if (onlyId && id !== onlyId) continue
        const texto = ttsTextFor(lang, v.paragraphs)
        out.push({
          id, lang, slug: h.slug, key: v.key,
          personaje: v.name, papel: v.role,
          sexo: v.sex,
          titulo: h.title, yaGrabada: v.audioSrc !== null,
          texto,
          destino: path.join(repoRoot, 'public', 'audio', 'historias', lang, h.slug, `${v.key}.mp3`),
          rutaWeb: `/audio/historias/${lang}/${h.slug}/${v.key}.mp3`,
        })
      }
    }
  }
  return out
}

// ── Reparto ────────────────────────────────────────────────────────────────
function initCasting(items) {
  const casting = {
    _lee_esto: [
      'Reparto de voces de las Historias. Un voice_id por personaje.',
      'Consíguelos con: node scripts/generate-historias-audio.mjs --voices',
      'El script no genera mientras falte un voice_id del idioma que estés generando,',
      'y se niega si el sexo de la voz no coincide con el del personaje.',
      '',
      'Se puede repetir voz entre las dos historias del mismo idioma (Jess y Sarah nunca',
      'aparecen en el mismo ejercicio), pero suena mejor con voces distintas.',
      '',
      'ORDEN RECOMENDADO: empieza por --sample --generate, oye las 30 catas, y solo',
      'entonces lanza idioma por idioma con --lang.',
    ],
    defaults: {
      model_id: 'eleven_flash_v2_5',
      output_format: 'mp3_44100_128',
      // Calibrados en las series de listening (480 episodios).
      voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
    },
    languages: {},
  }
  for (const it of items) {
    const l = (casting.languages[it.lang] ??= {
      // Nota de voz, no locución: un pelo por debajo de 1 para que respire.
      speed: it.lang === 'coreano' || it.lang === 'japones' ? 0.9 : 0.92,
      nota: TTS_LANG_NOTES[it.lang] ?? '',
      cast: {},
    })
    l.cast[it.id] = {
      voice_id: '', personaje: it.personaje, papel: it.papel,
      sexo: it.sexo, caracteres: it.texto.length,
    }
  }
  fs.writeFileSync(castingPath, `${JSON.stringify(casting, null, 2)}\n`)
  console.log(`✓ ${path.relative(repoRoot, castingPath)} creado con ${items.length} papeles sin asignar.`)
  console.log('  Rellena cada voice_id antes de generar.')
}

async function listarVoces() {
  if (!apiKey) throw new Error('Falta ELEVENLABS_API_KEY (.env.local o entorno).')
  const r = await fetch(`${API}/v1/voices`, { headers: { 'xi-api-key': apiKey } })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  const { voices } = await r.json()
  console.log(`${voices.length} voces en tu cuenta:\n`)
  for (const v of voices) {
    const l = v.labels ?? {}
    const etiquetas = [l.gender, l.accent, l.age, l.use_case].filter(Boolean).join(' · ')
    console.log(`  ${v.voice_id}  ${(v.name ?? '').padEnd(24)} ${etiquetas}`)
  }
  console.log('\nCopia el voice_id que quieras en scripts/historias-voice-casting.json.')
}

async function vocesPorId() {
  const r = await fetch(`${API}/v1/voices`, { headers: { 'xi-api-key': apiKey } })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  const { voices } = await r.json()
  return new Map(voices.map(v => [v.voice_id, v]))
}

// ── Generación ─────────────────────────────────────────────────────────────
async function hablar({ texto, voiceId, settings, locale, outputFormat }) {
  const r = await fetch(`${API}/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: texto,
      model_id: model,
      // `language_code` no lo admite multilingual_v2 — solo los flash/turbo v2.5.
      // Fuerza el idioma y evita que un nombre propio latino en medio de un texto
      // ruso o coreano haga que el modelo cambie de acento a media frase.
      ...(model.includes('flash') || model.includes('turbo') ? { language_code: locale } : {}),
      voice_settings: settings,
      // Misma semilla ⇒ misma toma. Permite repetir una nota sin que cambie el
      // color de la voz respecto a la otra del mismo ejercicio.
      seed: 20260813,
    }),
  })
  if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 300)}`)
  return Buffer.from(await r.arrayBuffer())
}

function nivelar(file) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', file, '-af',
    `loudnorm=I=${LUFS_OBJETIVO}:TP=${TRUE_PEAK_MAX}:LRA=11`, '-y', `${file}.tmp.mp3`], { encoding: 'utf8' })
  if (r.status !== 0) { console.warn(`  ⚠ ffmpeg no pudo nivelar ${path.basename(file)}; queda sin nivelar`); return }
  fs.renameSync(`${file}.tmp.mp3`, file)
}

const LOCALE = { ingles: 'en', aleman: 'de', frances: 'fr', italiano: 'it', portugues: 'pt', coreano: 'ko', japones: 'ja', ruso: 'ru' }

// ── Programa ───────────────────────────────────────────────────────────────
const items = inventario()
const pendientes = items.filter(i => !i.yaGrabada)

if (has('--voices')) { await listarVoces(); process.exit(0) }
if (has('--init-casting')) { initCasting(items); process.exit(0) }

if (!fs.existsSync(castingPath)) {
  console.log('No existe el reparto todavía. Creándolo…\n')
  initCasting(items)
  process.exit(0)
}
const casting = JSON.parse(fs.readFileSync(castingPath, 'utf8'))

// ── Factura previa ─────────────────────────────────────────────────────────
const objetivo = pendientes.filter(i => force || !fs.existsSync(i.destino))
const chars = objetivo.reduce((n, i) => n + (doSample ? Math.min(SAMPLE_CHARS, i.texto.length) : i.texto.length), 0)

console.log(`Modelo: ${model}${doSample ? '   ·   CATA (' + SAMPLE_CHARS + ' caracteres por voz)' : ''}`)
console.log(`Notas: ${objetivo.length} de ${items.length} (${items.length - pendientes.length} ya grabadas, ${pendientes.length - objetivo.length} con archivo en disco)\n`)

for (const it of objetivo) {
  const n = doSample ? Math.min(SAMPLE_CHARS, it.texto.length) : it.texto.length
  const voz = casting.languages[it.lang]?.cast?.[it.id]?.voice_id || '—sin asignar—'
  console.log(`  ${HISTORIA_LANGS[it.lang].flag} ${it.id.padEnd(44)} ${it.personaje.padEnd(9)} ${it.sexo.padEnd(7)} ${String(n).padStart(5)} car   ${voz}`)
}

const charsDe = i => (doSample ? Math.min(SAMPLE_CHARS, i.texto.length) : i.texto.length)
const medido = objetivo.reduce((n, i) => n + creditos(i.lang, charsDe(i), model), 0)
const peor = objetivo.reduce((n, i) => n + creditos(i.lang, charsDe(i), model, true), 0)
console.log(`\n  ${chars.toLocaleString('es')} caracteres`)
console.log(`  ~${medido.toLocaleString('es')} créditos con la tarifa medida (~$${((chars / 1000) * (model.includes('flash') ? 0.05 : 0.10)).toFixed(2)})`)
console.log(`  ~${peor.toLocaleString('es')} créditos en el peor caso (idiomas sin tarifa comprobada)`)

if (!doGenerate) {
  console.log('\nEsto es una factura previa: no se ha llamado a la API ni se ha gastado nada.')
  console.log('Para generar de verdad hay que añadir --generate.')
  process.exit(0)
}

// ── Comprobaciones antes de gastar ─────────────────────────────────────────
if (!apiKey) { console.error('✗ Falta ELEVENLABS_API_KEY.'); process.exit(1) }

const sinVoz = objetivo.filter(i => !casting.languages[i.lang]?.cast?.[i.id]?.voice_id)
if (sinVoz.length) {
  console.error(`\n✗ ${sinVoz.length} papel(es) sin voice_id en el reparto:`)
  for (const i of sinVoz) console.error(`  · ${i.id} (${i.personaje}, ${i.sexo})`)
  process.exit(1)
}

const catalogo = await vocesPorId()
const desajuste = []
for (const i of objetivo) {
  const vid = casting.languages[i.lang].cast[i.id].voice_id
  const voz = catalogo.get(vid)
  if (!voz) { desajuste.push(`${i.id}: el voice_id ${vid} no está en tu cuenta`); continue }
  const g = (voz.labels?.gender ?? '').toLowerCase()
  if (g && g !== i.sexo) {
    desajuste.push(`${i.id}: «${i.personaje}» es ${i.sexo} y «${voz.name}» está etiquetada ${g}`)
  }
}
if (desajuste.length) {
  console.error('\n✗ El sexo de la voz no coincide con el del personaje:')
  for (const d of desajuste) console.error(`  · ${d}`)
  console.error('\n  Es el fallo que obligó a tirar las tomas de the-grandmothers-ledger.')
  console.error('  Corrige el reparto, o pasa --skip-gender-check si de verdad es intencionado.')
  if (!has('--skip-gender-check')) process.exit(1)
}

// ── Generar ────────────────────────────────────────────────────────────────
const salida = doSample ? path.join(repoRoot, 'tmp-catas-historias') : null
if (salida) fs.mkdirSync(salida, { recursive: true })

let hechas = 0
for (const it of objetivo) {
  const conf = casting.languages[it.lang]
  const voiceId = conf.cast[it.id].voice_id
  const texto = doSample ? it.texto.slice(0, SAMPLE_CHARS) : it.texto
  const destino = doSample
    ? path.join(salida, `${it.lang}-${it.slug}-${it.key}-${it.personaje}.mp3`)
    : it.destino

  process.stdout.write(`  ${it.id} … `)
  try {
    const buf = await hablar({
      texto, voiceId, locale: LOCALE[it.lang],
      settings: { ...casting.defaults.voice_settings, speed: conf.speed },
      outputFormat: casting.defaults.output_format,
    })
    fs.mkdirSync(path.dirname(destino), { recursive: true })
    fs.writeFileSync(destino, buf)
    if (!doSample) nivelar(destino)
    hechas++
    console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`)
  } catch (e) {
    console.log(`✗ ${e.message}`)
  }
}

console.log(`\n${hechas}/${objetivo.length} generadas.`)
if (doSample) {
  console.log(`Catas en ${path.relative(repoRoot, salida)}/ — óyelas antes de lanzar la tanda completa.`)
  console.log('Esa carpeta es temporal: bórrala cuando decidas.')
} else {
  console.log('\nAhora, en cada archivo de historia, cambia audioSrc de null a su ruta:')
  for (const it of objetivo) console.log(`  ${it.lang}/${it.slug} · voz ${it.key} → '${it.rutaWeb}'`)
  console.log('\nY después:  npm run check:historias && npm run build')
  console.log('\nOjo con el contador de créditos de la cuenta: va con retraso y en caliente')
  console.log('subestima. Si quieres el gasto real, míralo unos minutos después.')
}
