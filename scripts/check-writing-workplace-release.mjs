import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const languages = [
  { slug: 'ingles', locale: 'en', bank: '', prefix: 'Re:' },
  { slug: 'frances', locale: 'fr', bank: 'frances-', prefix: 'Ré :', areaLabel: true },
  { slug: 'aleman', locale: 'de', bank: 'aleman-', prefix: 'AW:', areaLabel: true },
  { slug: 'italiano', locale: 'it', bank: 'italiano-', prefix: 'R:', areaLabel: true },
  { slug: 'portugues', locale: 'pt', bank: 'portugues-', prefix: 'Re:', areaLabel: true },
  { slug: 'ruso', locale: 'ru', bank: 'ruso-', prefix: 'Ответ:', areaLabel: true },
  { slug: 'japones', locale: 'ja', bank: 'japones-', prefix: '返信:', areaLabel: true, lengthUnit: 'characters' },
  { slug: 'coreano', locale: 'ko', bank: 'coreano-', prefix: '답장:', areaLabel: true, lengthUnit: 'characters' },
]

let failed = false
let total = 0
for (const language of languages) {
  const titles = new Set()
  for (const level of ['b2', 'c1', 'c2']) {
    const bankPath = new URL(`../src/data/practica/writing-workplace-${language.bank}${level}.json`, import.meta.url)
    const routePath = new URL(`../src/app/(site)/practica/${language.slug}/${level}/escritura/page.tsx`, import.meta.url)
    if (!fs.existsSync(bankPath) || !fs.existsSync(routePath)) {
      console.error(`${language.slug}/${level}: bank or route is missing.`)
      failed = true
      continue
    }
    const route = fs.readFileSync(routePath, 'utf8')
    const expectedBank = `writing-workplace-${language.bank}${level}.json`
    const expectedLevel = `level="${level.toUpperCase()}"`
    const expectedLocale = language.locale === 'en' ? '' : `language="${language.locale}"`
    if (!route.includes(expectedBank) || !route.includes(expectedLevel) || (expectedLocale && !route.includes(expectedLocale))) {
      console.error(`${language.slug}/${level}: route is wired to the wrong bank, level or locale.`)
      failed = true
      continue
    }
    const cases = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
    const issues = validateWritingWorkplaceCases(cases, 20, {
      requireAreaLabel: language.areaLabel,
      subjectPrefix: language.prefix,
      lengthUnit: language.lengthUnit,
    })
    for (const item of cases) {
      if (titles.has(item.title)) issues.push(`${item.id}: title repeats within ${language.slug}.`)
      titles.add(item.title)
    }
    if (issues.length) {
      failed = true
      console.error(`${language.slug}/${level}: ${issues.length} problem(s).`)
      for (const issue of issues) console.error(`- ${issue}`)
    } else {
      total += cases.length
      console.log(`${language.slug}/${level}: ${cases.length} cases valid.`)
    }
  }
}

if (failed) process.exit(1)
if (total !== 480) {
  console.error(`Expected 480 cases; found ${total}.`)
  process.exit(1)
}
console.log(`Advanced workplace writing release: ${total} cases across eight languages and three levels.`)
