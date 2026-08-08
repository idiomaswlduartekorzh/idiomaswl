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

// ── Modo búsqueda: sirve para los ocho idiomas, incluidos ja/ko ────────────────
if (find) {
  const needle = find.toLowerCase()
  const hits = sentences.filter(
    (s) => s.target.toLowerCase().includes(needle) || strip(s.target).includes(strip(needle)),
  )
  if (hits.length === 0) {
    console.log(`«${find}» no aparece en ${lang}/${level}. Según la regla de veto, no puede entrar al núcleo sin añadirla al corpus.`)
    process.exit(2)
  }
  console.log(`«${find}» aparece en ${hits.length} turno(s) de ${lang}/${level}:\n`)
  for (const hit of hits) {
    console.log(`  ep${String(hit.episode).padStart(2, '0')} · ${hit.speaker}`)
    console.log(`    ${hit.target}`)
    console.log(`    ${hit.es}\n`)
  }
  process.exit(0)
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
