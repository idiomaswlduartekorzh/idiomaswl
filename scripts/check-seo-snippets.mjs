/**
 * Guardián del fragmento de búsqueda (título y descripción en Google).
 *
 * Qué vigila y por qué
 * ────────────────────
 * Search Console, 12–13 de agosto de 2026: 652 impresiones y 8 clics. 91 URLs
 * estaban en el top 10 —la parte difícil ya ganada— y daban un CTR del 0,86 %.
 * La causa no era la posición: era que el título se cortaba en las 40 URLs
 * medidas y la descripción en 31 de ellas. En el catálogo entero, 425 de 454
 * títulos y 448 de 466 descripciones no cabían.
 *
 * Este script existe para que eso no vuelva a colarse. Corre sobre los datos
 * reales (importa cada tema y aplica el mismo generador que usa el sitio, no una
 * copia de las reglas) y falla si algo se sale del espacio disponible.
 *
 *   node scripts/check-seo-snippets.mjs            → comprueba, falla si hay algo fuera
 *   node scripts/check-seo-snippets.mjs --muestra  → además enseña ejemplos reales
 *
 * Requiere Node con soporte de TypeScript (v22.6+ con --experimental-strip-types,
 * nativo desde v23). El propio script se re-lanza con el flag si hace falta.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'

const root = path.resolve(import.meta.dirname, '..')
const showSamples = process.argv.includes('--muestra')

// Node < 23 necesita el flag para cargar los .ts de datos. Re-lanzarse es más
// simple que pedirle a quien ejecuta esto que se acuerde del flag.
if (!process.execArgv.some((a) => a.includes('strip-types')) && Number(process.versions.node.split('.')[0]) < 23) {
  const again = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--no-warnings', import.meta.filename, ...process.argv.slice(2)],
    { stdio: 'inherit' }
  )
  process.exit(again.status ?? 1)
}

// Node lee TypeScript, pero no resuelve los imports sin extensión que usa el
// proyecto. Hace falta para el registro de Historias, que importa './types'.
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

const { TITLE_MAX, DESC_MAX, buildGrammarTitle, buildGrammarDescription, fitTitle, fitDescription } = await import(
  pathToFileURL(path.join(root, 'src/lib/seo-snippet.ts')).href
)

const failures = []
const samples = []

/** Un fragmento sirve si cabe, tiene cuerpo y no queda colgando de un signo. */
function audit(label, title, description) {
  if (title !== undefined) {
    if (title.length > TITLE_MAX) failures.push(`${label}: título de ${title.length} ch (máx ${TITLE_MAX}) — «${title}»`)
    if (title.trim().length < 15) failures.push(`${label}: título demasiado corto — «${title}»`)
    if (/[,;:—–|·\s-]$/u.test(title)) failures.push(`${label}: el título termina en un signo suelto — «${title}»`)
  }
  if (description !== undefined) {
    if (description.length > DESC_MAX) {
      failures.push(`${label}: descripción de ${description.length} ch (máx ${DESC_MAX}) — «${description.slice(0, 80)}…»`)
    }
    if (description.trim().length < 60) failures.push(`${label}: descripción demasiado corta — «${description}»`)
    if (/[,;:—–|·\s-]$/u.test(description)) failures.push(`${label}: la descripción termina en un signo suelto`)
  }
}

// ── 1. Gramática: 454 temas, con el generador real ────────────────────────────
const grammarRoot = path.join(root, 'src/data/grammar')
const topicFiles = []
const walkGrammar = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkGrammar(full)
    else if (entry.name.endsWith('.ts') && !['index.ts', 'types.ts', 'registry.ts'].includes(entry.name)) {
      topicFiles.push(full)
    }
  }
}
walkGrammar(grammarRoot)

let grammarChecked = 0
for (const file of topicFiles) {
  const mod = await import(pathToFileURL(file).href)
  const topic = mod.default
  if (!topic?.slug) continue
  const rel = path.relative(root, file)
  const title = buildGrammarTitle(topic)
  const description = buildGrammarDescription(topic)
  audit(rel, title, description)
  grammarChecked += 1
  if (samples.length < 8) samples.push({ rel, title, description })
}

// ── 2. Rutas estáticas: la metadata escrita a mano en cada page/layout ────────
const appRoot = path.join(root, 'src/app')
const literal = (block, key) =>
  (block.match(new RegExp(`\\n\\s*${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`)) ??
    block.match(new RegExp(`\\n\\s*${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`)) ??
    [])[1]

/** ¿Algún layout por encima de esta página la marca como no indexable? */
function inheritsNoIndex(pageFile) {
  let dir = path.dirname(pageFile)
  while (dir.startsWith(appRoot)) {
    const layout = path.join(dir, 'layout.tsx')
    if (fs.existsSync(layout) && /index:\s*false/.test(fs.readFileSync(layout, 'utf8'))) return true
    dir = path.dirname(dir)
  }
  return false
}

let staticChecked = 0
const walkApp = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkApp(full)
      continue
    }
    if (!/^(page|layout)\.tsx$/.test(entry.name)) continue
    const src = fs.readFileSync(full, 'utf8')
    const block = src.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\}/)?.[1]
    if (!block) continue
    const title = literal(block, 'title')
    const description = literal(block, 'description')
    if (!title && !description) continue
    // Lo que no se indexa no compite por espacio en el resultado. El `noindex`
    // puede estar en la propia página (labs) o heredarse de un layout de arriba
    // (todo el panel privado lo hereda de dashboard/layout.tsx).
    if (/index:\s*false/.test(block) || inheritsNoIndex(full)) continue
    // El layout raíz define el título por defecto del sitio, que es la marca
    // entera y se muestra sola: no compite por espacio con nada.
    if (path.relative(root, full) === 'src/app/layout.tsx') continue
    audit(path.relative(root, full), title, description)
    staticChecked += 1
  }
}
walkApp(appRoot)

// ── 3. Blog: se comprueba el valor ya ajustado, que es el que se publica ──────
const blogSrc = fs.readFileSync(path.join(root, 'src/data/blog.ts'), 'utf8')
const blogEntries = [...blogSrc.matchAll(/\n\s{2}\{\n([\s\S]*?)\n\s{2}\},?\n/g)]
let blogChecked = 0
for (const [, body] of blogEntries) {
  const slug = literal(`\n${body}`, 'slug')
  if (!slug) continue
  const metaTitle = literal(`\n${body}`, 'metaTitle')
  const metaDescription = literal(`\n${body}`, 'metaDescription')
  const title = literal(`\n${body}`, 'title')
  const description = literal(`\n${body}`, 'description')
  if (!title || !description) continue
  audit(`blog/${slug}`, fitTitle(metaTitle ?? title), fitDescription(metaDescription ?? description))
  blogChecked += 1
}

// ── 4. Historias ─────────────────────────────────────────────────────────────
// El recorrido de `walkApp` solo ve metadatos escritos como literal. Las páginas
// de Historias los construyen con una función (`historiaMetadata`), así que
// pasaban de largo: se auditan aquí, contra el registro, que es la fuente.
//
// El módulo puede no existir todavía: Historias se está construyendo en una rama
// aparte. Si falta, esta sección se salta en lugar de tumbar el build — así el
// guardián sirve igual en `main` que en la rama donde Historias sí vive.
let historias_ = null
try {
  historias_ = await import('../src/data/practica/historias/index.ts')
} catch {
  historias_ = null
}
const { HISTORIA_LANG_KEYS = [], HISTORIAS_BY_LANG = {}, HISTORIA_LANGS = {} } = historias_ ?? {}
let historiasChecked = 0
for (const lang of HISTORIA_LANG_KEYS) {
  const historias = HISTORIAS_BY_LANG[lang]
  const idioma = HISTORIA_LANGS[lang].label.toLowerCase()
  audit(
    `practica/${lang}/historias`,
    fitTitle(`Historias en ${idioma} — comprensión con dos versiones`),
    fitDescription(
      `${historias.length} conflictos reales en ${idioma}, contados por las dos partes. ` +
      `Narrador, dos audios con transcripción y ${historias.reduce((n, h) => n + h.narrator.questions.length + h.voices[0].questions.length + h.voices[1].questions.length + h.finalQuestions.length, 0)} preguntas de comprensión.`
    )
  )
  historiasChecked += 1
  for (const h of historias) {
    // Sin `fit*`: aquí se quiere que salte si el texto escrito a mano se pasa,
    // no que el recorte lo tape. El recorte es la red, no la norma.
    audit(`practica/${lang}/historias/${h.slug}`, h.metaTitle, h.metaDescription)
    historiasChecked += 1
  }
}

// ── Informe ───────────────────────────────────────────────────────────────────
console.log(
  `Fragmentos comprobados: ${grammarChecked} temas de gramática, ${staticChecked} rutas estáticas, ${blogChecked} artículos, ${historiasChecked} páginas de Historias.`
)

if (showSamples) {
  console.log('\nEjemplos de lo que verá Google:\n')
  for (const s of samples) {
    console.log(`  ${s.rel}`)
    console.log(`    T(${String(s.title.length).padStart(2)}) ${s.title}`)
    console.log(`    D(${s.description.length}) ${s.description}\n`)
  }
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} fragmento(s) fuera del espacio de Google:\n`)
  for (const f of failures) console.error(`  · ${f}`)
  console.error(
    '\nNo subas el tope: el tope es el ancho del resultado de Google, no una preferencia.\nAcorta el texto, o pásalo por fitTitle()/fitDescription() de src/lib/seo-snippet.ts.'
  )
  process.exit(1)
}

console.log('✓ Todos caben en el resultado de búsqueda.')
