import fs from 'node:fs'
import { validateWritingWorkplaceCases } from './lib/writing-workplace-harness.mjs'

const languages = [
  { slug: 'ingles', locale: 'en', ogLocale: 'en_US', bank: '', prefix: 'Re:' },
  { slug: 'frances', locale: 'fr', ogLocale: 'fr_FR', bank: 'frances-', prefix: 'Ré :', areaLabel: true },
  { slug: 'aleman', locale: 'de', ogLocale: 'de_DE', bank: 'aleman-', prefix: 'AW:', areaLabel: true },
  { slug: 'italiano', locale: 'it', ogLocale: 'it_IT', bank: 'italiano-', prefix: 'R:', areaLabel: true },
  { slug: 'portugues', locale: 'pt', ogLocale: 'pt_BR', bank: 'portugues-', prefix: 'Re:', areaLabel: true },
  { slug: 'ruso', locale: 'ru', ogLocale: 'ru_RU', bank: 'ruso-', prefix: 'Ответ:', areaLabel: true },
  { slug: 'japones', locale: 'ja', ogLocale: 'ja_JP', bank: 'japones-', prefix: '返信:', areaLabel: true, lengthUnit: 'characters' },
  { slug: 'coreano', locale: 'ko', ogLocale: 'ko_KR', bank: 'coreano-', prefix: '답장:', areaLabel: true, lengthUnit: 'characters' },
]

const sitemap = fs.readFileSync(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8')
if (!sitemap.includes("skill: 'escritura'")) {
  console.error('Advanced writing routes are missing from the sitemap.')
  process.exit(1)
}

let failed = false
let total = 0
for (const language of languages) {
  const titles = new Set()
  for (const level of ['b2', 'c1', 'c2']) {
    const bankPath = new URL(`../src/data/practica/writing-workplace-${language.bank}${level}.json`, import.meta.url)
    const routePath = new URL(`../src/app/(site)/practica/${language.slug}/${level}/escritura/page.tsx`, import.meta.url)
    const imagePath = new URL(`../src/app/(site)/practica/${language.slug}/${level}/escritura/opengraph-image.tsx`, import.meta.url)
    if (!fs.existsSync(bankPath) || !fs.existsSync(routePath) || !fs.existsSync(imagePath)) {
      console.error(`${language.slug}/${level}: bank, route or target-language social image is missing.`)
      failed = true
      continue
    }
    const route = fs.readFileSync(routePath, 'utf8')
    const image = fs.readFileSync(imagePath, 'utf8')
    const hubPath = language.slug === 'ingles'
      ? new URL(level === 'b2' ? '../src/app/(site)/practica/ingles/b2/page.tsx' : '../src/components/grammar/AdvancedEnglishLevelHub.tsx', import.meta.url)
      : new URL(`../src/components/practica/${({ frances: 'French', aleman: 'German', italiano: 'Italian', portugues: 'Portuguese', ruso: 'Russian', japones: 'Japanese', coreano: 'Korean' })[language.slug]}AdvancedLevelHub.tsx`, import.meta.url)
    if (!fs.readFileSync(hubPath, 'utf8').includes('/escritura') || /robots:\s*\{\s*index:\s*false/u.test(route)) {
      console.error(`${language.slug}/${level}: writing route is hidden from the level hub or search index.`)
      failed = true
      continue
    }
    const expectedBank = `writing-workplace-${language.bank}${level}.json`
    const expectedLevel = `level="${level.toUpperCase()}"`
    const expectedLocale = language.locale === 'en' ? '' : `language="${language.locale}"`
    const title = route.match(/^const title = (.+)$/mu)?.[1]
    const imageAlt = image.match(/^export const alt = (.+)$/mu)?.[1]
    if (!route.includes(expectedBank) || !route.includes(expectedLevel) || (expectedLocale && !route.includes(expectedLocale))) {
      console.error(`${language.slug}/${level}: route is wired to the wrong bank, level or locale.`)
      failed = true
      continue
    }
    if (!route.includes(`locale: '${language.ogLocale}'`) || !route.includes('openGraph:') || !route.includes('twitter:') || !route.includes('alternates: { canonical }') ||
        !image.includes(`createWritingOgImage('${language.locale}', '${level.toUpperCase()}')`) || !title || title !== imageAlt) {
      console.error(`${language.slug}/${level}: native-language metadata or social image is missing or wired incorrectly.`)
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
