import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const cases = JSON.parse(fs.readFileSync(new URL('../src/data/practica/writing-workplace-b2.json', import.meta.url), 'utf8'))
const issues = validateWritingWorkplaceCases(cases, 20)
if (issues.length) {
  console.error(`Writing B2: ${issues.length} problem(s).`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}
console.log(`Writing B2: ${cases.length} distinct cases, ${cases.length * 4} evidence-based questions, ${cases.length} annotated model replies.`)
