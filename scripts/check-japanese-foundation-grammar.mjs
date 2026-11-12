import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const withAssets = process.argv.includes('--assets')
const levels = ['a2', 'b1']

function count(topic) {
  return topic.practice.levels.reduce((total, stage) => stage.type === 'dual'
    ? total + stage.items.reduce((sum, item) => sum + item.blanks.length, 0)
    : stage.type === 'choice' || stage.type === 'write'
      ? total + stage.items.length
      : total + stage.blanks.length, 0)
}

let totalTopics = 0
let totalActivities = 0
for (const level of levels) {
  const { default: topics } = await import(`../src/data/grammar/japones/${level}/index.ts`)
  assert.equal(topics.length, 20, `日本語${level.toUpperCase()}は20テーマ必要です`)
  assert.deepEqual(topics.map((topic) => Number(topic.order)), Array.from({ length: 20 }, (_, index) => index + 1), `${level}: 順序`)
  let levelActivities = 0
  for (const topic of topics) {
    const at = `${level.toUpperCase()}/${topic.slug}`
    const words = [topic.description, topic.lead, ...topic.seo.flatMap((section) => section.paragraphs ?? [])].join(' ').split(/\s+/u).filter(Boolean).length
    const rows = topic.guide.table.length + topic.seo.reduce((sum, section) => sum + (section.table?.length ?? 0), 0)
    const activities = count(topic)
    assert.ok(words >= 450, `${at}: 説明が短すぎます (${words})`)
    assert.ok(rows >= 28, `${at}: 表が不足しています (${rows})`)
    assert.equal(topic.practice.levels.length, 6, `${at}: 練習は6段階必要です`)
    assert.ok(topic.visual.scene.length >= (level === 'b1' ? 10 : 9), `${at}: 視覚例が不足しています`)
    assert.ok(activities >= (level === 'b1' ? 50 : 45), `${at}: 練習が不足しています (${activities})`)
    for (const stage of topic.practice.levels) {
      if (stage.type === 'choice') for (const item of stage.items) assert.ok(item.options.includes(item.answer), `${at}/${stage.id}: 正解が選択肢にありません`)
      if (stage.type === 'dual') for (const item of stage.items) for (const blank of item.blanks) if (blank.options) assert.ok(blank.options.includes(blank.answer), `${at}/${stage.id}: 正解が選択肢にありません`)
      if (stage.type === 'guidedText') for (const blank of stage.blanks) if (blank.options) assert.ok(blank.options.includes(blank.answer), `${at}/${stage.id}: 正解が選択肢にありません`)
    }
    if (withAssets) {
      const stem = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
      const directory = path.join(root, 'private', 'site-materials', `japones-${level}`, 'grammar')
      for (const suffix of ['', '-renshu', '-kaito']) {
        const file = path.join(directory, `${stem}${suffix}.pdf`)
        assert.ok(existsSync(file) && statSync(file).size > 50_000, `${at}: PDFがありません ${suffix}`)
      }
    }
    levelActivities += activities
  }
  totalTopics += topics.length
  totalActivities += levelActivities
  console.log(`✓ 日本語${level.toUpperCase()}：${topics.length}テーマ、${levelActivities}課題。`)
}

console.log(`✓ 日本語A2–B1：${totalTopics}テーマ、${totalActivities}課題${withAssets ? '、120 PDF' : ''}。`)
