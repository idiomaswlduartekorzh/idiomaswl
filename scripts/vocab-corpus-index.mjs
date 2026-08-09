import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Índice palabra → frases reales del corpus de escucha.
 *
 * La metodología de vocabulario tiene una regla de veto: una palabra no entra al núcleo si
 * no aparece —o no se puede hacer aparecer— en la serie de escucha de su mismo nivel. Esa
 * regla es la que impide que el vocabulario vuelva a ser una lista muerta, desconectada de
 * las 480 lecciones de audio que ya existen.
 *
 * Este script hace comprobable esa regla. Recorre los 20 episodios de una serie y saca,
 * para cada forma que aparece, las frases donde suena, con su traducción y el episodio.
 * De ahí salen tres cosas:
 *
 *  1. El ejemplo de la ficha, que no se inventa: se toma del corpus (ver docs/vocabulario-blueprints.md,
 *     la lección que dejaron los mazos Core 2k/6k con sus frases artificiales).
 *  2. La frase de la caja 4, el hueco en contexto.
 *  3. La comprobación de cobertura del núcleo, que es una de las puertas de calidad.
 *
 * Japonés y coreano no separan palabras con espacio de la misma manera, así que para esos
 * dos el índice por token es orientativo y lo que vale es la búsqueda por subcadena (--find),
 * que funciona igual en los ocho idiomas.
 *
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a1
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --find "decision"
 *   node scripts/vocab-corpus-index.mjs --lang aleman --level a1 --json out.json
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --keywords
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

const args = process.argv.slice(2)
const val = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null)
const lang = val('--lang')
const level = (val('--level') ?? '').toLowerCase()
const find = val('--find')
const jsonOut = val('--json')
const wantKeywords = args.includes('--keywords')

if (!lang || !level) {
  console.error('Uso: node scripts/vocab-corpus-index.mjs --lang <idioma> --level <a1|a2|b1> [--find <texto>] [--keywords] [--json <archivo>]')
  process.exit(1)
}

function loadModule(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
    reportDiagnostics: true,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return module.exports
}

const seriesFile = path.join(seriesDir, `${lang}-${level}-series.ts`)
if (!fs.existsSync(seriesFile)) {
  console.error(`No existe la serie ${path.relative(repoRoot, seriesFile)}`)
  process.exit(1)
}

const series = Object.values(loadModule(seriesFile)).find((value) => value?.episodes)
if (!series) {
  console.error(`El archivo no exporta ninguna serie con episodios: ${seriesFile}`)
  process.exit(1)
}

/** Normaliza para indexar: minúsculas, sin diacríticos latinos, sin puntuación. */
const strip = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

/** Todas las frases del corpus, con su episodio y su traducción. */
const sentences = []
for (const episode of series.episodes) {
  for (const turn of episode.turns) {
    sentences.push({
      episode: episode.order,
      episodeId: episode.id,
      title: episode.title,
      speaker: turn.speaker,
      target: turn.target,
      es: turn.es,
      ...(turn.romanization ? { romanization: turn.romanization } : {}),
    })
  }
}

/** Código de dos letras con que se nombran los ejercicios de lectura. */
const CODIGO = {
  ingles: 'en', aleman: 'de', frances: 'fr', italiano: 'it',
  portugues: 'pt', ruso: 'ru', coreano: 'ko', japones: 'ja',
}

/**
 * Las frases de los textos de lectura del nivel.
 *
 * La regla de veto siempre dijo «escucha **o lectura**». La escucha sola no da: 160 turnos no
 * alcanzan para un núcleo de 300 con el tope de dos palabras por frase. Los textos de lectura
 * son la otra mitad del material que ya está escrito y nivelado.
 */
function frasesDeLectura() {
  const dir = path.join(repoRoot, 'src', 'data', 'reading', 'exercises')
  if (!fs.existsSync(dir)) return []
  const prefijo = `${CODIGO[lang] ?? lang}-${level}-`
  const out = []
  for (const archivo of fs.readdirSync(dir).filter((f) => f.startsWith(prefijo) && f.endsWith('.json'))) {
    const datos = JSON.parse(fs.readFileSync(path.join(dir, archivo), 'utf8'))
    for (const bruta of (datos?.content?.targetText ?? '').split(/(?<=[.!?])\s+/u)) {
      const frase = bruta.replace(/\s+/gu, ' ').trim()
      if (frase.split(' ').length >= 4) out.push({ ejercicio: archivo.replace(/\.json$/, ''), target: frase })
    }
  }
  return out
}

// ── Modo búsqueda: sirve para los ocho idiomas, incluidos ja/ko ────────────────
if (find) {
  const needle = find.toLowerCase()
  /**
   * Busca también por raíz, no solo literal.
   *
   * Buscar «woman» no encontraba «women» y la palabra se daba por ausente del corpus cuando
   * está en el episodio 16. Sobre 300 entradas, comparar literalmente manda a «redactado»
   * decenas de palabras que sí se oyen — y cada una de esas es una frase inventada que no
   * hacía falta. El motor ya tolera la flexión al ahuecar; el buscador tiene que tolerarla
   * igual o miente sobre el material disponible.
   */
  const raiz = needle.slice(0, Math.max(3, needle.length - 2))
  const literal = (t) => t.toLowerCase().includes(needle) || strip(t).includes(strip(needle))
  // La raíz encuentra «women» buscando «woman», pero también «you» buscando «young» y
  // «counter» buscando «country». Por eso va aparte y etiquetada: sirve para no dar por
  // ausente lo que está flexionado, no para decidir sin mirar.
  const porRaiz = (t) => !literal(t) && strip(t).split(' ').some((p) => p.startsWith(raiz))

  const escucha = sentences.filter((s) => literal(s.target))
  const escuchaRaiz = sentences.filter((s) => porRaiz(s.target))
  const lecturas = frasesDeLectura()
  const enLectura = lecturas.filter((l) => literal(l.target))
  const enLecturaRaiz = lecturas.filter((l) => porRaiz(l.target))

  if (!escucha.length && !enLectura.length && !escuchaRaiz.length && !enLecturaRaiz.length) {
    console.log(`«${find}» no aparece ni en la escucha ni en la lectura de ${lang}/${level}.`)
    console.log('Para entrar al núcleo necesita ejemplo redactado y declarado, con su motivo.')
    process.exit(2)
  }

  for (const [titulo, filas] of [
    [`${escucha.length} turno(s) de escucha`, escucha],
    [`${enLectura.length} frase(s) de lectura`, enLectura],
  ]) {
    if (!filas.length) continue
    console.log(`«${find}» · ${titulo}:\n`)
    for (const hit of filas) {
      console.log(hit.episode ? `  🎧 ep${String(hit.episode).padStart(2, '0')} · ${hit.speaker}` : `  📄 ${hit.ejercicio}`)
      console.log(`    ${hit.target}`)
      if (hit.es) console.log(`    ${hit.es}`)
      console.log()
    }
  }

  const dudosas = [...escuchaRaiz, ...enLecturaRaiz]
  if (dudosas.length) {
    console.log(`Por raíz «${raiz}» — verifica que sea de verdad la palabra:\n`)
    for (const hit of dudosas) {
      console.log(hit.episode ? `  ~ ep${String(hit.episode).padStart(2, '0')}` : `  ~ ${hit.ejercicio}`)
      console.log(`    ${hit.target}\n`)
    }
  }

  // Solo cuenta como encontrada si hay coincidencia literal; lo demás hay que mirarlo.
  process.exit(escucha.length || enLectura.length ? 0 : 2)
}

// ── Palabras clave que la propia serie ya declara por episodio ─────────────────
if (wantKeywords) {
  const rows = []
  for (const episode of series.episodes) {
    for (const kw of episode.keywords ?? []) {
      rows.push({ episode: episode.order, target: kw.target, es: kw.es })
    }
  }
  console.log(`${rows.length} palabras clave declaradas en ${lang}/${level} (${series.seriesTitle}):\n`)
  for (const row of rows) {
    console.log(`  ep${String(row.episode).padStart(2, '0')}  ${row.target.padEnd(28)} ${row.es}`)
  }
  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify(rows, null, 2))
    console.log(`\nEscrito ${jsonOut}`)
  }
  process.exit(0)
}

// ── Índice por token ──────────────────────────────────────────────────────────
const index = new Map()
for (const sentence of sentences) {
  const seen = new Set(strip(sentence.target).split(' ').filter(Boolean))
  for (const token of seen) {
    if (!index.has(token)) index.set(token, [])
    index.get(token).push({ episode: sentence.episode, target: sentence.target, es: sentence.es })
  }
}

const ordered = [...index.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))

console.log(`${series.seriesTitle} · ${lang}/${level}`)
console.log(`${series.episodes.length} episodios · ${sentences.length} turnos · ${index.size} formas distintas\n`)
console.log(`  ${'forma'.padEnd(24)} ${'apariciones'.padStart(11)}`)
for (const [token, hits] of ordered.slice(0, 40)) {
  console.log(`  ${token.padEnd(24)} ${String(hits.length).padStart(11)}`)
}
if (ordered.length > 40) console.log(`  … y ${ordered.length - 40} formas más`)

if (jsonOut) {
  const payload = Object.fromEntries(ordered.map(([token, hits]) => [token, hits]))
  fs.writeFileSync(jsonOut, JSON.stringify(payload, null, 2))
  console.log(`\nEscrito ${jsonOut} (${ordered.length} formas)`)
}
