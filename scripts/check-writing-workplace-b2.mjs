import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const cases = JSON.parse(fs.readFileSync(new URL('../src/data/practica/writing-workplace-b2.json', import.meta.url), 'utf8'))
const issues = validateWritingWorkplaceCases(cases)
if (issues.length) {
  console.error(`Writing B2 preview: ${issues.length} problem(s).`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}
console.log(`Writing B2 preview: ${cases.length} distinct cases, 12 evidence-based questions, 3 annotated model replies.`)
