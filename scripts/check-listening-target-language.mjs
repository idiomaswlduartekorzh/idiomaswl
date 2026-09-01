import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Impide que las preguntas visibles de Escucha vuelvan a quedar en español.
 *
 * El contenido editorial que el estudiante responde —enunciado, opciones y feedback—
 * debe estar en el idioma objetivo. Las traducciones de turnos (`turn.es`) y los campos
 * internos de auditoría quedan fuera deliberadamente: no se muestran como ejercicio.
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

const TARGETS = {
  aleman: { label: 'alemán', script: null },
  frances: { label: 'francés', script: null },
  italiano: { label: 'italiano', script: null },
  portugues: { label: 'portugués', script: null },
  ruso: { label: 'ruso', script: /\p{Script=Cyrillic}/u },
  coreano: { label: 'coreano', script: /\p{Script=Hangul}/u },
  japones: { label: 'japonés', script: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u },
}

const LEVELS = ['a1', 'a2', 'b1']

/** Palabras inequívocamente españolas en este dominio educativo. */
const SPANISH_MARKERS = {
  aleman: /\b(?:según|también|después|todavía|ningún|ninguna|años?|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|correct[ao]s?|escucha|ocurrió|dónde|cuándo|quién|cuál|cuáles|cuánto|cuánt[oa]s|mientras|aunque|entonces|había|habrá|debería|podría|quiere|quieren|puede|pueden|hace|hizo|dijo|pregunta|explica|muestra|completa)\b/iu,
  frances: /\b(?:según|también|después|todavía|ningún|ninguna|años?|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|correct[ao]s?|escucha|ocurrió|dónde|cuándo|quién|cuál|cuáles|cuánto|cuánt[oa]s|mientras|aunque|entonces|había|habrá|debería|podría|quiere|quieren|puede|pueden|hace|hizo|dijo|pregunta|explica|muestra|completa)\b/iu,
  italiano: /\b(?:según|también|después|todavía|ningún|ninguna|años?|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|correct[ao]s?|escucha|ocurrió|dónde|cuándo|quién|cuál|cuáles|cuánto|cuánt[oa]s|mientras|aunque|entonces|había|habrá|debería|podría|quiere|quieren|puede|pueden|hace|hizo|dijo|pregunta|explica|muestra)\b/iu,
  portugues: /\b(?:según|también|después|todavía|ningún|ninguna|años?|pueblo|tienda|sello|ayuntamiento|artículo|autobús|respuesta|correct[ao]s?|escucha|ocurrió|dónde|cuándo|quién|cuál|cuáles|cuánto|cuánt[oa]s|mientras|aunque|entonces|había|habrá|debería|podría|quiere|quieren|puede|pueden|hace|hizo|dijo|pregunta|muestra)\b/iu,
  ruso: /[¿¡]|\b(?:según|también|después|todavía|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|escucha|dónde|cuándo|quién|cuál|completa)\b/iu,
  coreano: /[¿¡]|\b(?:según|también|después|todavía|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|escucha|dónde|cuándo|quién|cuál|completa)\b/iu,
  japones: /[¿¡]|\b(?:según|también|después|todavía|pueblo|tienda|sello|ayuntamiento|periódico|artículo|autobús|respuesta|escucha|dónde|cuándo|quién|cuál|completa)\b/iu,
}

function loadSeries(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
    reportDiagnostics: true,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return Object.values(module.exports).find((value) => value?.episodes)
}

function questionFields(question, prefix) {
  return [
    [`${prefix}.prompt`, question.prompt],
    ...question.options.map((option, index) => [`${prefix}.options[${index}]`, option]),
    [`${prefix}.feedback`, question.feedback],
  ]
}

function visibleFields(episode) {
  return [
    ...questionFields(episode.gist, 'gist'),
    ...episode.details.flatMap((question, index) => questionFields(question, `details[${index}]`)),
    ...questionFields(episode.consolidation, 'consolidation'),
  ]
}

function isCodeOnly(value) {
  const letters = value.match(/\p{L}/gu) ?? []
  if (!letters.length) return true
  return /^[A-Z][A-Z0-9 ._+/-]*$/u.test(value.trim())
}

const failures = []
let checkedSeries = 0
let checkedFields = 0

for (const [lang, config] of Object.entries(TARGETS)) {
  for (const level of LEVELS) {
    const label = `${lang}/${level}`
    const file = path.join(seriesDir, `${lang}-${level}-series.ts`)
    if (!fs.existsSync(file)) {
      failures.push(`${label}: falta la serie`)
      continue
    }

    const series = loadSeries(file)
    if (!series) {
      failures.push(`${label}: no se pudo cargar la serie`)
      continue
    }

    checkedSeries += 1
    for (const episode of series.episodes) {
      for (const [field, rawValue] of visibleFields(episode)) {
        checkedFields += 1
        const value = String(rawValue ?? '').trim()
        const location = `${label} ep${String(episode.order).padStart(2, '0')} ${field}`

        if (!value) {
          failures.push(`${location}: campo vacío`)
          continue
        }
        if (/[¿¡]/u.test(value)) {
          failures.push(`${location}: conserva puntuación española: «${value}»`)
          continue
        }
        if (SPANISH_MARKERS[lang].test(value)) {
          failures.push(`${location}: contiene un marcador español: «${value}»`)
          continue
        }
        if (config.script && !config.script.test(value) && !isCodeOnly(value)) {
          failures.push(`${location}: no contiene escritura ${config.label}: «${value}»`)
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`✗ Idioma objetivo: ${failures.length} incidencias`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`✓ Idioma objetivo: ${checkedSeries} series y ${checkedFields} campos visibles sin residuos de español.`)
