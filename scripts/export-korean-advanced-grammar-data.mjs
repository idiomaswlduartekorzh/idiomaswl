#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const TARGET = path.join(ROOT, 'tmp', 'korean-advanced-grammar', 'topics.json')
const topics = []
const levels = (process.env.KOREAN_ADVANCED_GRAMMAR_LEVELS ?? 'b2,c1,c2').split(',').map((level) => level.trim()).filter(Boolean)
for (const level of levels) {
  const moduleUrl = pathToFileURL(path.join(ROOT, 'src', 'data', 'grammar', 'coreano', level, 'index.ts')).href
  const { default: levelTopics } = await import(`${moduleUrl}?export=${Date.now()}`)
  topics.push(...levelTopics.map((topic) => ({ ...topic, level: level.toUpperCase() })))
}
await mkdir(path.dirname(TARGET), { recursive: true })
await writeFile(TARGET, `${JSON.stringify(topics, null, 2)}\n`, 'utf8')
console.log(`한국어 고급 문법 ${topics.length}개 강의를 ${path.relative(ROOT, TARGET)}에 내보냈습니다.`)
