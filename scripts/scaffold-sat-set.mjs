#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CATALOG_FILE = path.join(ROOT, 'src/data/mocks/sat/catalog.json')
const args = process.argv.slice(2)
const setValue = args.includes('--set') ? args[args.indexOf('--set') + 1] : null
const dryRun = args.includes('--dry-run')

if (!/^[1-9]\d*$/.test(setValue || '')) {
  console.error('Uso: node scripts/scaffold-sat-set.mjs --set <número> [--dry-run]')
  process.exit(1)
}

const id = `set-${Number(setValue)}`
const draftDir = path.join(ROOT, 'src/data/mocks/sat/drafts', id)
const manifestFile = path.join(draftDir, 'manifest.json')
const readmeFile = path.join(draftDir, 'README.md')
const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'))

if (catalog.sets.some((set) => set.id === id)) {
  console.error(`❌ ${id} ya existe en el catálogo SAT; no se sobrescribe.`)
  process.exit(1)
}
if (fs.existsSync(draftDir)) {
  console.error(`❌ ${path.relative(ROOT, draftDir)} ya existe; no se sobrescribe.`)
  process.exit(1)
}

const blueprint = [
  ['CS', 'words-in-context'],
  ['CS', 'words-in-context'],
  ['CS', 'words-in-context'],
  ['CS', 'text-structure-purpose'],
  ['CS', 'text-structure-purpose'],
  ['CS', 'text-structure-purpose'],
  ['CS', 'cross-text-connections'],
  ['CS', 'cross-text-connections'],
  ['II', 'central-ideas-details'],
  ['II', 'central-ideas-details'],
  ['II', 'command-of-evidence-textual'],
  ['II', 'command-of-evidence-textual'],
  ['II', 'command-of-evidence-quantitative'],
  ['II', 'inferences'],
  ['II', 'inferences'],
  ['SEC', 'boundaries'],
  ['SEC', 'boundaries'],
  ['SEC', 'boundaries'],
  ['SEC', 'boundaries'],
  ['SEC', 'form-structure-sense'],
  ['SEC', 'form-structure-sense'],
  ['SEC', 'form-structure-sense'],
  ['EOI', 'rhetorical-synthesis'],
  ['EOI', 'rhetorical-synthesis'],
  ['EOI', 'rhetorical-synthesis'],
  ['EOI', 'transitions'],
  ['EOI', 'transitions'],
]

const variants = ['M1', 'M2-facil', 'M2-dificil']
const modules = variants.map((variant) => ({
  id: `sat-${id}-${variant.toLowerCase()}`,
  variant,
  status: 'draft',
  slots: blueprint.map(([domain, type], index) => ({
    id: `q${String(index + 1).padStart(2, '0')}`,
    domain,
    type,
    difficulty: null,
    topic: null,
    status: 'empty',
  })),
  audit: {
    key: 'PENDING',
    bias: 'PENDING',
    fairness: 'PENDING',
    language: 'PENDING',
    difficulty: 'PENDING',
    originality: 'PENDING',
    simulation: 'PENDING',
  },
}))

const manifest = {
  schemaVersion: 1,
  id,
  status: 'draft',
  publishable: false,
  studentQuestions: 54,
  authoredQuestionsRequired: 81,
  modules,
}

const readme = `# SAT ${id} — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con \`status: draft\`.

## Contrato de salida

- Escribir los tres módulos en \`src/data/mocks/sat/sat-${id}-*.ts\`.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Superar \`npm run check:sat\` y obtener tres actas APTO con huellas vigentes.
- Componer \`src/data/mocks/sat/sat-${id}.ts\` con \`buildSatMock\`.
- Solo entonces cambiar esta entrada del catálogo a \`published\`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar \`npm run generate:sat-catalog\`.

El guardián \`npm run check:sat-catalog\` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.
`

const nextCatalog = {
  ...catalog,
  sets: [
    ...catalog.sets,
    {
      id,
      status: 'draft',
      draftManifest: path.relative(ROOT, manifestFile).replaceAll(path.sep, '/'),
    },
  ],
}

if (dryRun) {
  console.log(`✅ Scaffold válido para ${id}: 3 módulos, 81 slots; dry-run sin escrituras.`)
  process.exit(0)
}

fs.mkdirSync(draftDir, { recursive: true })
fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`)
fs.writeFileSync(readmeFile, readme)
fs.writeFileSync(CATALOG_FILE, `${JSON.stringify(nextCatalog, null, 2)}\n`)

const generated = spawnSync(process.execPath, [path.join(ROOT, 'scripts/build-sat-catalog.mjs'), '--write'], {
  cwd: ROOT,
  encoding: 'utf8',
})
if (generated.status !== 0) {
  process.stderr.write(generated.stderr || generated.stdout)
  process.exit(generated.status || 1)
}

process.stdout.write(generated.stdout)
console.log(`✅ ${id} creado como borrador: 3 módulos, 81 slots. No está publicado.`)
