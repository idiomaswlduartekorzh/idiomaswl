import { existsSync } from 'node:fs'
import { mkdir, unlink } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const levels = process.argv.includes('--all') ? ['a2', 'b1'] : [process.argv.find((arg) => /^--level=(a2|b1)$/u.test(arg))?.split('=')[1]].filter(Boolean)
if (!levels.length) throw new Error('Usa --all o --level=a2/b1')
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { getTopicsByLevel } = await jiti.import(path.join(ROOT, 'src', 'data', 'grammar', 'registry.ts'))
const { getJapaneseGrammarLevelResource } = await jiti.import(path.join(ROOT, 'src', 'data', 'japanese-grammar-levels.ts'))

for (const level of levels) {
  const out = path.join(ROOT, 'public', 'audio', 'japones', level, 'grammar')
  const temp = path.join(ROOT, 'tmp', `japanese-grammar-${level}`, 'system-audio')
  await mkdir(out, { recursive: true }); await mkdir(temp, { recursive: true })
  const pending = getTopicsByLevel('japones', level).map((topic) => ({ topic, resource: getJapaneseGrammarLevelResource(topic, level) })).filter(({ resource }) => !existsSync(path.join(ROOT, 'public', resource.audio)))
  for (const [index, { topic, resource }] of pending.entries()) {
    const aiff = path.join(temp, `${topic.slug}.aiff`); const audio = path.join(out, `${topic.slug}.m4a`)
    const spoken = spawnSync('/usr/bin/say', ['-v', 'Kyoko', '-r', '150', '-o', aiff, resource.audioText], { encoding: 'utf8' })
    if (spoken.status !== 0) throw new Error(`say ${topic.slug}: ${spoken.stderr}`)
    const converted = spawnSync('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', '-q', '127', aiff, audio], { encoding: 'utf8' })
    await unlink(aiff)
    if (converted.status !== 0) throw new Error(`afconvert ${topic.slug}: ${converted.stderr}`)
    console.log(`${level} ${index + 1}/${pending.length} ${topic.slug}: ${resource.audioText}`)
  }
}
