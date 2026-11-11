// Construye el índice de gramática que consume el guardián de lectura.
//
// El currículo de gramática vive en TypeScript (`src/data/grammar/<idioma>/<nivel>/*.ts`)
// y el guardián es JavaScript plano, así que no puede importarlo. Este script extrae de
// cada tema lo mínimo que hace falta para comprobar el acompasamiento —su slug, su título
// y su nivel— y lo deja en un JSON que ambos lados pueden leer.
//
//   node scripts/build-reading-grammar-index.mjs           → comprueba que está al día
//   node scripts/build-reading-grammar-index.mjs --write    → lo regenera
//
// Si falla con "el índice está desactualizado", alguien añadió o renombró un tema de
// gramática sin regenerar. Correr con --write y commitear el JSON.

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const grammarDir = path.join(root, 'src/data/grammar')
const outputPath = path.join(root, 'src/data/reading/grammar-index.json')

// El esquema de lectura identifica el idioma por código ISO; las carpetas de gramática
// usan el nombre en español. Este mapa es el único sitio donde se cruzan.
const LANGUAGE_DIRS = {
  en: 'ingles',
  fr: 'frances',
  it: 'italiano',
  de: 'aleman',
  ru: 'ruso',
  ja: 'japones',
  ko: 'coreano',
  pt: 'portugues',
}

const LEVELS = ['a1', 'a2', 'b1']

// Los temas se escriben a mano y algunos omiten `category`, así que solo `slug` es
// obligatorio: el nivel se deduce de la carpeta, que es la fuente fiable.
function extractField(source, field) {
  const match = source.match(new RegExp(`^\\s*${field}:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,`, 'm'))
  return match ? match[2].trim() : null
}

function extractInlineField(source, field) {
  const match = source.match(new RegExp(`(?:^|[,{])\\s*${field}:\\s*(['"\x60])([\\s\\S]*?)\\1`, 'm'))
  return match ? match[2].trim() : null
}

function extractCompletionTopics(source, languageDir, level, file) {
  const matches = [...source.matchAll(/\bslug\s*:\s*(['"\x60])([^'"\x60]+)\1/g)]
  return matches.map((match, index) => {
    const segment = source.slice(match.index, matches[index + 1]?.index ?? source.length)
    return {
      slug: match[2],
      title: extractInlineField(segment, 'shortTitle') ?? extractInlineField(segment, 'title') ?? match[2],
      category: extractInlineField(segment, 'category'),
      file: `src/data/grammar/${languageDir}/${level}/${file}`,
    }
  })
}

async function readTopics(languageDir, level) {
  const dir = path.join(grammarDir, languageDir, level)
  let entries
  try {
    entries = await readdir(dir)
  } catch {
    return []
  }

  const topics = []
  // Los closeouts y factories transforman o construyen temas al importarlos; no son
  // lecciones públicas y no deben entrar en el catálogo de lectura.
  for (const entry of entries.filter((name) => name.endsWith('.ts') && name !== 'index.ts' && !name.endsWith('quality-closeout.ts') && !name.endsWith('-factory.ts')).sort()) {
    const source = await readFile(path.join(dir, entry), 'utf8')
    if (entry === 'supplement-topics.ts') {
      const matches = [...source.matchAll(/slug:\s*['"]([^'"]+)['"][\s\S]*?shortTitle:\s*['"]([^'"]+)['"]/g)]
      if (!matches.length) throw new Error(`${languageDir}/${level}/${entry}: no se pudieron leer los temas suplementarios`)
      for (const match of matches) {
        topics.push({
          slug: match[1],
          title: match[2],
          category: match[0].match(/category:\s*['"]([^'"]+)['"]/)?.[1] ?? null,
          file: `src/data/grammar/${languageDir}/${level}/${entry}`,
        })
      }
      continue
    }
    if (languageDir === 'ingles' && level === 'a1' && entry === 'completion-topics.ts') {
      const generated = extractCompletionTopics(source, languageDir, level, entry)
      if (generated.length !== 6) throw new Error(`${languageDir}/${level}/${entry}: se esperaban seis temas generados; se encontraron ${generated.length}`)
      topics.push(...generated)
      continue
    }
    const slug = extractField(source, 'slug')
    if (!slug) {
      throw new Error(`${languageDir}/${level}/${entry}: no se pudo leer el slug del tema`)
    }
    topics.push({
      slug,
      title: extractField(source, 'shortTitle') ?? extractField(source, 'title') ?? slug,
      category: extractField(source, 'category'),
      file: `src/data/grammar/${languageDir}/${level}/${entry}`,
    })
  }
  return topics
}

async function build() {
  const languages = {}
  for (const [code, languageDir] of Object.entries(LANGUAGE_DIRS)) {
    languages[code] = {}
    for (const level of LEVELS) {
      languages[code][level] = await readTopics(languageDir, level)
    }
  }
  return {
    note: 'Generado por scripts/build-reading-grammar-index.mjs. No editar a mano.',
    source: 'src/data/grammar/<idioma>/<nivel>/*.ts',
    languageDirs: LANGUAGE_DIRS,
    languages,
  }
}

const index = await build()
const serialized = `${JSON.stringify(index, null, 2)}\n`

if (process.argv.includes('--write')) {
  await writeFile(outputPath, serialized)
  const total = Object.values(index.languages)
    .flatMap((levels) => Object.values(levels))
    .reduce((sum, topics) => sum + topics.length, 0)
  console.log(`Índice de gramática escrito: ${total} temas en ${Object.keys(index.languages).length} idiomas.`)
} else {
  let current = null
  try {
    current = await readFile(outputPath, 'utf8')
  } catch {
    console.error('El índice de gramática no existe. Corre: node scripts/build-reading-grammar-index.mjs --write')
    process.exit(1)
  }
  if (current !== serialized) {
    console.error('El índice de gramática está desactualizado respecto a src/data/grammar/.')
    console.error('Regenéralo con: node scripts/build-reading-grammar-index.mjs --write')
    process.exit(1)
  }
  console.log('El índice de gramática está al día.')
}
