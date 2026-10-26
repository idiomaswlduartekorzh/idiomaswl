#!/usr/bin/env node
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/ruso/b2/index.ts'
import c1Topics from '../src/data/grammar/ruso/c1/index.ts'
import c2Topics from '../src/data/grammar/ruso/c2/index.ts'

const ROOT = process.cwd(), levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }, problems = []
function decisions(topic) { return topic.practice.levels.reduce((total, level) => level.type === 'dual' ? total + level.items.reduce((sum, item) => sum + item.blanks.length, 0) : level.type === 'choice' || level.type === 'write' ? total + level.items.length : total + level.blanks.length, 0) }
for (const [level, topics] of Object.entries(levels)) {
  if (topics.length < 30) problems.push(`${level.toUpperCase()}: требуется не менее 30 тем, найдено ${topics.length}.`)
  const slugs = new Set(), orders = new Set(), titles = new Set()
  for (const topic of topics) {
    const where = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${where}: повторяется slug.`)
    if (orders.has(topic.order)) problems.push(`${where}: повторяется номер ${topic.order}.`)
    if (titles.has(topic.shortTitle)) problems.push(`${where}: повторяется заголовок.`)
    slugs.add(topic.slug); orders.add(topic.order); titles.add(topic.shortTitle)
    if (topic.level !== level.toUpperCase()) problems.push(`${where}: внутренний уровень не совпадает.`)
    if (topic.practice.levels.length !== 6) problems.push(`${where}: требуется 6 этапов практики.`)
    if (decisions(topic) < 30) problems.push(`${where}: меньше 30 учебных решений.`)
    if (topic.seo.length < 4 || topic.outcomes.length < 4) problems.push(`${where}: недостаточно объяснений или результатов обучения.`)
    if (topic.guide.table.length < 4 || topic.visual.scene.length < 3) problems.push(`${where}: неполная таблица или визуальная карта.`)
    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-uprazhneniya', '-otvety']) {
      const file = path.join(ROOT, 'private', 'site-materials', `ruso-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${where}: отсутствует PDF ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 45_000) problems.push(`${where}: PDF подозрительно мал ${path.relative(ROOT, file)}`)
    }
  }
}
const total = Object.values(levels).reduce((sum, topics) => sum + topics.length, 0)
if (problems.length) { console.error(`Проверка русского B2–C2 не пройдена: ${problems.length} проблем.`); problems.forEach((problem) => console.error(`- ${problem}`)); process.exit(1) }
console.log(`✓ Русский B2–C2: ${total} тем, по 6 этапов, проверено ${total * 3} PDF.`)
