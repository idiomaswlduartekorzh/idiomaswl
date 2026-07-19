import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { validateReadingExercise } from './lib/reading-content-validator.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exerciseDir = path.join(root, 'src/data/reading/exercises')
const schemaPath = path.join(root, 'src/data/reading/schema/reading-exercise.schema.json')

await JSON.parse(await readFile(schemaPath, 'utf8'))
const files = (await readdir(exerciseDir)).filter((file) => file.endsWith('.json')).sort()
let failed = false

for (const file of files) {
  const exercise = JSON.parse(await readFile(path.join(exerciseDir, file), 'utf8'))
  const errors = validateReadingExercise(exercise)
  if (errors.length) {
    failed = true
    console.error(`✗ ${file}`)
    for (const error of errors) console.error(`  - ${error}`)
  } else {
    console.log(`✓ ${file} (${exercise.status})`)
  }
}

if (failed) process.exit(1)
console.log(`Reading content validation passed: ${files.length} exercise(s).`)

