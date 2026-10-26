#!/usr/bin/env node
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/coreano/b2/index.ts'
import c1Topics from '../src/data/grammar/coreano/c1/index.ts'
import c2Topics from '../src/data/grammar/coreano/c2/index.ts'

const ROOT = process.cwd(), levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }, problems = []
function decisions(topic) { return topic.practice.levels.reduce((total, level) => level.type === 'dual' ? total + level.items.reduce((sum, item) => sum + item.blanks.length, 0) : level.type === 'choice' || level.type === 'write' ? total + level.items.length : total + level.blanks.length, 0) }
for (const [level, topics] of Object.entries(levels)) {
  if (topics.length !== 30) problems.push(`${level.toUpperCase()}: 30개 주제가 필요하지만 ${topics.length}개가 있습니다.`)
  const slugs = new Set(), orders = new Set()
  for (const topic of topics) {
    const where = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${where}: 중복 slug`)
    if (orders.has(topic.order)) problems.push(`${where}: 중복 순서 ${topic.order}`)
    slugs.add(topic.slug); orders.add(topic.order)
    if (topic.level !== level.toUpperCase()) problems.push(`${where}: 내부 레벨 불일치`)
    if (topic.practice.levels.length !== 6) problems.push(`${where}: 연습은 6단계여야 합니다.`)
    if (decisions(topic) < 30) problems.push(`${where}: 학습 판단이 30개 미만입니다.`)
    if (topic.seo.length < 4) problems.push(`${where}: 교육 설명 섹션이 4개 미만입니다.`)
    if (topic.outcomes.length < 4) problems.push(`${where}: 학습 목표가 4개 미만입니다.`)
    if (topic.guide.table.length < 4) problems.push(`${where}: 참고표가 불완전합니다.`)
    if (topic.visual.scene.length < 3) problems.push(`${where}: 시각 지도가 불완전합니다.`)
    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-yeonseup', '-haeseol']) {
      const file = path.join(ROOT, 'private', 'site-materials', `coreano-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${where}: PDF 없음 ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${where}: PDF가 너무 작습니다 ${path.relative(ROOT, file)}`)
    }
  }
}
if (problems.length) { console.error(`한국어 B2-C2 검사 실패: ${problems.length}개 문제`); problems.forEach((problem) => console.error(`- ${problem}`)); process.exit(1) }
console.log('✓ 한국어 B2-C2: 90개 주제, 강의별 6단계, PDF 270종을 확인했습니다.')
