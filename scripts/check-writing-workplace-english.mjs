import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const levels = ['b2', 'c1', 'c2']
const titles = new Map()
let failed = false

for (const level of levels) {
  const path = new URL(`../src/data/practica/writing-workplace-${level}.json`, import.meta.url)
  if (!fs.existsSync(path)) {
    console.error(`${level.toUpperCase()}: case bank is missing.`)
    failed = true
    continue
  }
  const cases = JSON.parse(fs.readFileSync(path, 'utf8'))
  const issues = validateWritingWorkplaceCases(cases, 20)
  for (const item of cases) {
    const previous = titles.get(item.title)
    if (previous) issues.push(`${item.id}: title repeats a ${previous} case.`)
    titles.set(item.title, level.toUpperCase())
  }
  if (issues.length) {
    failed = true
    console.error(`${level.toUpperCase()}: ${issues.length} problem(s).`)
    for (const issue of issues) console.error(`- ${issue}`)
  } else {
    console.log(`${level.toUpperCase()}: 20 cases, 80 evidence-backed questions, 20 annotated replies.`)
  }
}

if (failed) process.exit(1)
