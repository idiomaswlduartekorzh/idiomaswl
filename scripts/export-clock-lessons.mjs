// node --experimental-strip-types --experimental-loader ./tests/ts-paths-loader.mjs scripts/export-clock-lessons.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { clockLanguageKeys, clockLanguages } from '../src/data/clock-lessons/catalog.ts'
import { getClockLesson } from '../src/data/clock-lessons/lessons.ts'
import german from '../src/data/grammar/aleman/a1/uhrzeit.ts'

const directory = 'tmp/pdfs/clock-lessons'
await mkdir(directory, { recursive: true })
for (const language of clockLanguageKeys) {
  const course = language === 'aleman' ? { topic: german } : getClockLesson(language)
  await writeFile(`${directory}/${language}.json`, JSON.stringify({ ...course, ...clockLanguages[language] }, null, 2))
}
await writeFile(`${directory}/german-export.json`, JSON.stringify([german]))
