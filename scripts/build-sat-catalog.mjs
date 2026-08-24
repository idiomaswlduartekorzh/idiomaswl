#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CATALOG_FILE = path.join(ROOT, 'src/data/mocks/sat/catalog.json')
const CARDS_FILE = path.join(ROOT, 'src/data/mocks/sat/catalog.generated.ts')
const REGISTRY_FILE = path.join(ROOT, 'src/data/mocks/sat/registry.generated.ts')
const WRITE = process.argv.includes('--write')
const VALID_STATUSES = new Set(['draft', 'published'])
const REQUIRED_VARIANTS = ['M1', 'M2-facil', 'M2-dificil']

const failures = []
const fail = (message) => failures.push(message)
const relative = (file) => path.relative(ROOT, file).replaceAll(path.sep, '/')
const quote = (value) => `'${String(value).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    fail(`${label} no es JSON válido: ${error.message}`)
    return null
  }
}

function resolveRepoPath(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${label} debe ser una ruta no vacía`)
    return null
  }
  const resolved = path.resolve(ROOT, value)
  const insideRepo = resolved === ROOT || resolved.startsWith(`${ROOT}${path.sep}`)
  if (!insideRepo) {
    fail(`${label} sale del repositorio: ${value}`)
    return null
  }
  return resolved
}

function hasNamedExport(file, exportName) {
  if (!file || !fs.existsSync(file)) return false
  const source = fs.readFileSync(file, 'utf8')
  const escaped = exportName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`export\\s+(?:const|let|var|function|class)\\s+${escaped}\\b`).test(source)
}

function validatePublished(set) {
  const setSource = resolveRepoPath(set.source, `${set.id}.source`)
  if (setSource && !fs.existsSync(setSource)) fail(`${set.id}.source no existe: ${set.source}`)
  if (typeof set.exportName !== 'string' || !set.exportName) fail(`${set.id}.exportName es obligatorio`)
  else if (setSource && fs.existsSync(setSource) && !hasNamedExport(setSource, set.exportName)) {
    fail(`${set.id}.source no exporta ${set.exportName}`)
  }

  if (!Array.isArray(set.modules) || set.modules.length !== 3) {
    fail(`${set.id} debe declarar exactamente M1, M2-facil y M2-dificil`)
  } else {
    const variants = set.modules.map((module) => module.variant)
    if (variants.join('|') !== REQUIRED_VARIANTS.join('|')) {
      fail(`${set.id}.modules debe ir en orden ${REQUIRED_VARIANTS.join(' → ')}`)
    }
    for (const module of set.modules) {
      const moduleSource = resolveRepoPath(module.source, `${set.id}.${module.variant}.source`)
      if (moduleSource && !fs.existsSync(moduleSource)) fail(`${set.id}.${module.variant}.source no existe: ${module.source}`)
      if (module.id !== `sat-${set.id}-${module.variant.toLowerCase()}`) {
        fail(`${set.id}.${module.variant}.id debe ser sat-${set.id}-${module.variant.toLowerCase()}`)
      }
      if (typeof module.exportName !== 'string' || !module.exportName) {
        fail(`${set.id}.${module.variant}.exportName es obligatorio`)
      } else if (moduleSource && fs.existsSync(moduleSource) && !hasNamedExport(moduleSource, module.exportName)) {
        fail(`${set.id}.${module.variant}.source no exporta ${module.exportName}`)
      }
    }
  }

  const card = set.card
  if (!card || typeof card !== 'object') {
    fail(`${set.id}.card es obligatorio para publicar`)
  } else {
    for (const field of ['title', 'subtitle']) if (typeof card[field] !== 'string' || !card[field].trim()) fail(`${set.id}.card.${field} es obligatorio`)
    if (typeof card.free !== 'boolean') fail(`${set.id}.card.free debe ser booleano`)
    if (card.parts !== 2) fail(`${set.id}.card.parts debe ser 2, no ${card.parts}`)
    if (card.questions !== 54) fail(`${set.id}.card.questions debe ser 54, no ${card.questions}`)
  }
}

function validateDraft(set) {
  const manifest = resolveRepoPath(set.draftManifest, `${set.id}.draftManifest`)
  if (!manifest || !fs.existsSync(manifest)) {
    fail(`${set.id}.draftManifest no existe: ${set.draftManifest ?? 'sin ruta'}`)
    return
  }
  const draft = readJson(manifest, `${set.id}.draftManifest`)
  if (!draft) return
  if (draft.id !== set.id || draft.status !== 'draft') fail(`${set.id}.draftManifest no corresponde a un borrador de ${set.id}`)
  if (!Array.isArray(draft.modules) || draft.modules.length !== 3) {
    fail(`${set.id}.draftManifest debe contener tres módulos`)
    return
  }
  for (const [index, module] of draft.modules.entries()) {
    if (module.variant !== REQUIRED_VARIANTS[index]) fail(`${set.id}.draftManifest: módulo ${index + 1} debe ser ${REQUIRED_VARIANTS[index]}`)
    if (!Array.isArray(module.slots) || module.slots.length !== 27) fail(`${set.id}.${module.variant}: debe tener 27 slots editoriales`)
    const domains = { CS: 0, II: 0, SEC: 0, EOI: 0 }
    for (const slot of module.slots || []) if (slot.domain in domains) domains[slot.domain]++
    const signature = Object.entries(domains).map(([domain, count]) => `${domain}:${count}`).join('|')
    if (signature !== 'CS:8|II:7|SEC:7|EOI:5') fail(`${set.id}.${module.variant}: reparto inválido ${signature}`)
  }
}

function validateCatalog(catalog) {
  if (!catalog || catalog.version !== 1 || !Array.isArray(catalog.sets)) {
    fail('catalog.json debe tener version 1 y un array sets')
    return []
  }
  const ids = new Set()
  for (const set of catalog.sets) {
    if (!/^set-[1-9]\d*$/.test(set.id || '')) fail(`id SAT inválido: ${set.id ?? 'vacío'}`)
    if (ids.has(set.id)) fail(`id SAT repetido: ${set.id}`)
    ids.add(set.id)
    if (!VALID_STATUSES.has(set.status)) fail(`${set.id}.status debe ser draft o published`)
    else if (set.status === 'published') validatePublished(set)
    else validateDraft(set)
  }
  if (!catalog.sets.some((set) => set.status === 'published')) fail('el catálogo debe conservar al menos un SAT publicado')
  return catalog.sets.filter((set) => set.status === 'published')
}

function renderCards(sets) {
  const lines = ['// AUTO-GENERADO por scripts/build-sat-catalog.mjs. No editar a mano.', 'export const SAT_MOCK_CARDS = [']
  for (const set of sets) {
    lines.push('  {')
    lines.push(`    id: ${quote(set.id)},`)
    lines.push(`    title: ${quote(set.card.title)},`)
    lines.push(`    subtitle: ${quote(set.card.subtitle)},`)
    lines.push(`    free: ${set.card.free},`)
    lines.push(`    parts: ${set.card.parts},`)
    lines.push(`    questions: ${set.card.questions},`)
    lines.push('  },')
  }
  lines.push('];', '')
  return lines.join('\n')
}

function moduleImportPath(source) {
  const from = path.dirname(REGISTRY_FILE)
  const absolute = path.resolve(ROOT, source)
  let value = path.relative(from, absolute).replaceAll(path.sep, '/').replace(/\.ts$/, '')
  if (!value.startsWith('.')) value = `./${value}`
  return value
}

function renderRegistry(sets) {
  const lines = [
    '// AUTO-GENERADO por scripts/build-sat-catalog.mjs. No editar a mano.',
    "import type { MockExam } from '../types';",
  ]
  for (const set of sets) lines.push(`import { ${set.exportName} } from ${quote(moduleImportPath(set.source))};`)
  lines.push('', 'export const SAT_MOCK_REGISTRY: Record<string, MockExam> = {')
  for (const set of sets) lines.push(`  ${quote(`sat:${set.id}`)}: ${set.exportName},`)
  lines.push('};', '')
  return lines.join('\n')
}

function sync(file, expected) {
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
  if (current === expected) return
  if (WRITE) fs.writeFileSync(file, expected)
  else fail(`${relative(file)} está desactualizado; ejecuta npm run generate:sat-catalog`)
}

const catalog = readJson(CATALOG_FILE, 'catalog.json')
const published = validateCatalog(catalog)
if (!failures.length) {
  sync(CARDS_FILE, renderCards(published))
  sync(REGISTRY_FILE, renderRegistry(published))
}

if (failures.length) {
  console.error(`\n❌ Catálogo SAT — ${failures.length} problema(s)\n`)
  for (const failure of failures) console.error(`   · ${failure}`)
  console.error('')
  process.exit(1)
}

console.log(`✅ Catálogo SAT sincronizado: ${published.length} publicado(s), ${catalog.sets.length - published.length} borrador(es).${WRITE ? ' Archivos derivados actualizados.' : ''}`)
