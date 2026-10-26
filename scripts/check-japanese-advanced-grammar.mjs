#!/usr/bin/env node
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/japones/b2/index.ts'
import c1Topics from '../src/data/grammar/japones/c1/index.ts'
import c2Topics from '../src/data/grammar/japones/c2/index.ts'
const ROOT = process.cwd(), levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }, problems = []
function decisions(topic) { return topic.practice.levels.reduce((total, level) => level.type === 'dual' ? total + level.items.reduce((sum, item) => sum + item.blanks.length, 0) : level.type === 'choice' || level.type === 'write' ? total + level.items.length : total + level.blanks.length, 0) }
for (const [level, topics] of Object.entries(levels)) {
  if (topics.length < 30) problems.push(`${level.toUpperCase()}：30テーマ以上が必要ですが、${topics.length}テーマです。`)
  const slugs = new Set(), orders = new Set(), titles = new Set()
  for (const topic of topics) {
    const where = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${where}：slugが重複しています。`)
    if (orders.has(topic.order)) problems.push(`${where}：順序${topic.order}が重複しています。`)
    if (titles.has(topic.shortTitle)) problems.push(`${where}：題名が重複しています。`)
    slugs.add(topic.slug); orders.add(topic.order); titles.add(topic.shortTitle)
    if (topic.level !== level.toUpperCase()) problems.push(`${where}：内部レベルが一致しません。`)
    if (topic.practice.levels.length !== 6) problems.push(`${where}：練習は6段階必要です。`)
    if (decisions(topic) < 30) problems.push(`${where}：学習判断が30未満です。`)
    if (topic.seo.length < 4 || topic.outcomes.length < 4) problems.push(`${where}：解説または学習目標が不足しています。`)
    if (topic.guide.table.length < 4 || topic.visual.scene.length < 3) problems.push(`${where}：参考表または視覚マップが不完全です。`)
    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-renshu', '-kaito']) {
      const file = path.join(ROOT, 'private', 'site-materials', `japones-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${where}：PDFがありません ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${where}：PDFが小さすぎます ${path.relative(ROOT, file)}`)
    }
  }
}
const total = Object.values(levels).reduce((sum, topics) => sum + topics.length, 0)
if (problems.length) { console.error(`日本語B2-C2検査失敗：${problems.length}件`); problems.forEach((problem) => console.error(`- ${problem}`)); process.exit(1) }
console.log(`✓ 日本語B2-C2：${total}テーマ、各6段階、PDF ${total * 3}種を確認しました。`)
