import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const slug = process.argv[2]
const validSlugs = ['frances', 'aleman', 'italiano', 'portugues', 'ruso', 'japones', 'coreano']
if (!validSlugs.includes(slug)) {
  console.error(`Choose a language: ${validSlugs.join(', ')}.`)
  process.exit(1)
}

const titles = new Set()
let failed = false
for (const level of ['b2', 'c1', 'c2']) {
  const path = new URL(`../src/data/practica/writing-workplace-${slug}-${level}.json`, import.meta.url)
  if (!fs.existsSync(path)) {
    console.error(`${slug}/${level}: case bank is missing.`)
    failed = true
    continue
  }
  const cases = JSON.parse(fs.readFileSync(path, 'utf8'))
  const issues = validateWritingWorkplaceCases(cases, 20, { requireAreaLabel: true })
  for (const item of cases) {
    if (titles.has(item.title)) issues.push(`${item.id}: title repeats within ${slug}.`)
    titles.add(item.title)
  }
  if (issues.length) {
    failed = true
    console.error(`${slug}/${level}: ${issues.length} problem(s).`)
    for (const issue of issues) console.error(`- ${issue}`)
  } else {
    console.log(`${slug}/${level}: 20 cases, 80 evidence-backed questions, 20 annotated replies.`)
  }
}
if (failed) process.exit(1)
