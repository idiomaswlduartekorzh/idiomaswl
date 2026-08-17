import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { validateReadingExercise } from './lib/reading-content-validator.mjs'
import { BLUEPRINT_SCHEMA_VERSION, grammarCoverage, validateBlueprintExercise } from './lib/reading-blueprint.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exerciseDir = path.join(root, 'src/data/reading/exercises')
const schemaPath = path.join(root, 'src/data/reading/schema/reading-exercise.schema.json')

await JSON.parse(await readFile(schemaPath, 'utf8'))
const files = (await readdir(exerciseDir)).filter((file) => file.endsWith('.json')).sort()
let failed = false

const exercises = []
for (const file of files) {
  const exercise = JSON.parse(await readFile(path.join(exerciseDir, file), 'utf8'))
  exercises.push({ file, exercise })

  const errors = validateReadingExercise(exercise)
  if (exercise.schemaVersion === BLUEPRINT_SCHEMA_VERSION) {
    errors.push(...validateBlueprintExercise(exercise))
  }

  if (errors.length) {
    failed = true
    console.error(`✗ ${file}`)
    for (const error of errors) console.error(`  - ${error}`)
  } else {
    console.log(`✓ ${file} (${exercise.status}, esquema ${exercise.schemaVersion})`)
  }
}

// --- Comprobaciones que solo se ven mirando todo el conjunto ----------------------
// Un texto puede estar impecable por su cuenta y aun así ser el cuarto correo de vecinos
// del mismo nivel. La variedad es una propiedad del conjunto, no de cada archivo.
const byLevel = new Map()
for (const { file, exercise } of exercises) {
  if (exercise.schemaVersion !== BLUEPRINT_SCHEMA_VERSION) continue
  const key = `${exercise.language}/${exercise.level?.cefr}`
  if (!byLevel.has(key)) byLevel.set(key, [])
  byLevel.get(key).push({ file, exercise })
}

for (const [key, group] of [...byLevel].sort()) {
  const seen = new Map()
  for (const { file, exercise } of group) {
    const genre = exercise.classification?.genre ?? ''
    const topic = exercise.classification?.topic ?? ''
    const pair = `${genre.toLowerCase()} · ${topic.toLowerCase()}`
    if (seen.has(pair)) {
      failed = true
      console.error(`✗ ${file}`)
      console.error(`  - repite género y tema de ${seen.get(pair)} ("${genre} · ${topic}"): el nivel se vuelve monótono`)
    } else {
      seen.set(pair, file)
    }
  }

  const [language, cefr] = key.split('/')
  const coverage = grammarCoverage(language, cefr, group.map((item) => item.exercise))
  const percent = coverage.total ? Math.round((coverage.touched / coverage.total) * 100) : 0
  console.log(`· ${key}: ${group.length} lectura(s), cubren ${coverage.touched}/${coverage.total} temas de gramática del nivel (${percent} %)`)

  // Un nivel se considera terminado con 10 lecturas. A partir de ahí, dejarlo cubriendo
  // media docena de temas sería publicar un nivel con agujeros.
  if (group.length >= 10 && percent < 50) {
    failed = true
    console.error(`✗ ${key}: nivel completo pero solo cubre el ${percent} % del currículo de gramática`)
    console.error(`  - sin tocar: ${coverage.missing.join(', ')}`)
  }
}

// --- Deuda pendiente --------------------------------------------------------------
// Las lecturas 1.0.0 son las de inglés que ya están publicadas. No las rompemos, pero
// tampoco dejamos que se olviden: aquí se cuentan hasta que estén migradas.
const legacy = exercises.filter(({ exercise }) => exercise.schemaVersion === '1.0.0')
if (legacy.length) {
  console.log(`\nPendiente de migrar al blueprint ${BLUEPRINT_SCHEMA_VERSION}: ${legacy.length} lectura(s) en esquema 1.0.0.`)
}

if (failed) process.exit(1)
console.log(`\nValidación de lectura superada: ${files.length} ejercicio(s).`)
