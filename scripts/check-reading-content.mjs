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

// B2–C2 conserva las fichas existentes mientras se amplía el catálogo. La cantidad
// exigida para lanzamiento se comprueba por separado con check:reading-advanced-scale.
const advanced = exercises.filter(({ exercise }) => exercise.schemaVersion === '1.2.0')
if (advanced.length) {
  const expected = ['en', 'fr', 'it', 'de', 'ru', 'ja', 'ko', 'pt'].flatMap((language) =>
    ['B2', 'C1', 'C2'].map((cefr) => `${language}/${cefr}`))
  const keys = advanced.map(({ exercise }) => `${exercise.language}/${exercise.level.cefr}`)
  for (const key of expected) {
    if (!keys.includes(key)) {
      failed = true
      console.error(`✗ lectura avanzada: falta al menos una lectura ${key}`)
    }
    const group = advanced.filter(({ exercise }) => `${exercise.language}/${exercise.level.cefr}` === key)
    const published = group.filter(({ exercise }) => exercise.status === 'published').length
    if (published > 0 && published < 20) {
      failed = true
      console.error(`✗ lectura avanzada ${key}: ${published}/20 publicadas; el nivel no se publica parcialmente`)
    }
  }
  for (const { file, exercise } of advanced) {
    const errors = []
    if (exercise.questions.length !== 6) errors.push('debe tener seis preguntas')
    if (!exercise.tutorLocales.includes('en') || exercise.content.title.es !== exercise.content.title.en || exercise.content.intro.es !== exercise.content.intro.en || exercise.content.mission.es !== exercise.content.mission.en || exercise.production.prompt.es !== exercise.production.prompt.en) {
      errors.push('el piloto debe mostrar el mismo contenido sin español en ambas rutas')
    }
    if (exercise.content.vocabulary.some((item) => item.glosses.es !== item.glosses.en)) errors.push('las glosas deben ser iguales en ambas rutas')
    if (new Set(exercise.questions.map((question) => question.skill)).size < 5) errors.push('debe evaluar al menos cinco destrezas')
    if (exercise.content.vocabulary.length < 6) errors.push('debe glosar al menos seis expresiones')
    for (const question of exercise.questions) {
      if (!exercise.content.targetText.includes(question.evidence)) errors.push(`${question.id}: evidencia ausente del texto`)
      if (question.options?.length !== 3) errors.push(`${question.id}: se exigen tres opciones concretas`)
    }
    const answerPositions = [0, 0, 0]
    for (const question of exercise.questions) {
      const position = question.options?.findIndex((option) => option.id === question.answer) ?? -1
      if (position >= 0 && position < 3) answerPositions[position]++
    }
    if (answerPositions.some((count) => count !== 2)) errors.push(`sesgo de posición: ${answerPositions.join('/')}; se exige 2/2/2`)
    if (exercise.status === 'draft' && (exercise.seo.indexable || exercise.leveling.independentAssessment.passed)) errors.push('el borrador no puede ser indexable ni tener evaluación independiente aprobada')
    if (errors.length) {
      failed = true
      console.error(`✗ ${file}: ${errors.join('; ')}`)
    }
  }
  for (const level of ['B2', 'C1', 'C2']) {
    const lengths = { longest: 0, shortest: 0, middle: 0 }
    for (const { exercise } of advanced.filter(({ exercise }) => exercise.level.cefr === level)) {
      for (const question of exercise.questions) {
        const sizes = question.options.map((option) => Array.from(option.text).length)
        const correct = question.options.find((option) => option.id === question.answer)
        const size = Array.from(correct.text).length
        if (size === Math.max(...sizes)) lengths.longest++
        else if (size === Math.min(...sizes)) lengths.shortest++
        else lengths.middle++
      }
    }
    const total = Object.values(lengths).reduce((sum, count) => sum + count, 0)
    if (total && Object.values(lengths).some((count) => count / total < 0.2 || count / total > 0.45)) {
      failed = true
      console.error(`✗ piloto avanzado ${level}: sesgo de longitud ${JSON.stringify(lengths)}; cada banda debe ocupar entre 20 % y 45 %`)
    } else console.log(`· piloto avanzado ${level}: longitud de respuesta ${JSON.stringify(lengths)}`)
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

  // Sesgo de respuesta en los verdadero/falso. Barajar las opciones no lo arregla: si la
  // respuesta correcta es siempre «falso», se acierta todo contestando falso sin leer.
  // Es el mismo defecto que se midió en las series de Escucha, y solo se ve en el conjunto.
  const verdicts = group
    .flatMap(({ exercise }) => exercise.questions ?? [])
    .filter((question) => question.type === 'true-false' || question.type === 'true-false-not-given')
    .map((question) => String(question.answer))
  if (verdicts.length >= 4) {
    const tally = verdicts.reduce((counts, verdict) => ({ ...counts, [verdict]: (counts[verdict] ?? 0) + 1 }), {})
    const [leader, count] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]
    if (count / verdicts.length > 0.75) {
      failed = true
      console.error(`✗ ${key}: ${count} de ${verdicts.length} verdadero/falso se responden "${leader}"`)
      console.error('  - contestando siempre lo mismo se aprueba sin leer; reparte las respuestas')
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
