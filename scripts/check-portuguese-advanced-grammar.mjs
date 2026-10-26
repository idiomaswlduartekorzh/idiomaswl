#!/usr/bin/env node
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/portugues/b2/index.ts'
import c1Topics from '../src/data/grammar/portugues/c1/index.ts'
import c2Topics from '../src/data/grammar/portugues/c2/index.ts'

const ROOT = process.cwd(), levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }, problems = []
function decisions(topic) { return topic.practice.levels.reduce((total, level) => level.type === 'dual' ? total + level.items.reduce((sum, item) => sum + item.blanks.length, 0) : level.type === 'choice' || level.type === 'write' ? total + level.items.length : total + level.blanks.length, 0) }
for (const [level, topics] of Object.entries(levels)) {
  if (topics.length !== 30) problems.push(`${level.toUpperCase()}: esperados 30 temas, encontrados ${topics.length}`)
  const slugs = new Set(), orders = new Set()
  for (const topic of topics) {
    const where = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${where}: slug duplicado`)
    if (orders.has(topic.order)) problems.push(`${where}: ordem duplicada ${topic.order}`)
    slugs.add(topic.slug); orders.add(topic.order)
    if (topic.level !== level.toUpperCase()) problems.push(`${where}: nível interno incorreto`)
    if (topic.practice.levels.length !== 6) problems.push(`${where}: são necessárias seis etapas de prática`)
    if (decisions(topic) < 30) problems.push(`${where}: menos de 30 decisões de aprendizagem`)
    if (topic.seo.length < 4) problems.push(`${where}: são necessárias quatro seções pedagógicas`)
    if (topic.outcomes.length < 4) problems.push(`${where}: são necessários quatro objetivos`)
    if (topic.guide.table.length < 4) problems.push(`${where}: tabela de referência incompleta`)
    if (topic.visual.scene.length < 3) problems.push(`${where}: mapa visual incompleto`)
    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-exercicios', '-gabarito']) {
      const file = path.join(ROOT, 'private', 'site-materials', `portugues-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${where}: PDF ausente ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${where}: PDF pequeno demais ${path.relative(ROOT, file)}`)
    }
  }
}
if (problems.length) { console.error(`A verificação da gramática portuguesa B2-C2 falhou: ${problems.length} problema(s)`); problems.forEach((problem) => console.error(`- ${problem}`)); process.exit(1) }
console.log('✓ Português B2-C2: 90 temas completos, 6 etapas por aula e 270 PDFs verificados.')
