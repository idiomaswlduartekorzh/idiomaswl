import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { resolveAudioByteRange } from '../src/lib/goethe/admin-audio-range.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('Goethe audio serves normal and seekable byte ranges', () => {
  assert.equal(resolveAudioByteRange(null, 1000), undefined)
  assert.deepEqual(resolveAudioByteRange('bytes=0-1', 1000), { start: 0, end: 1 })
  assert.deepEqual(resolveAudioByteRange('bytes=100-', 1000), { start: 100, end: 999 })
  assert.deepEqual(resolveAudioByteRange('bytes=-100', 1000), { start: 900, end: 999 })
  assert.deepEqual(resolveAudioByteRange('bytes=990-2000', 1000), { start: 990, end: 999 })
  for (const invalid of ['bytes=1000-', 'bytes=9-3', 'bytes=-0', 'bytes=0-1,4-5', 'items=0-1', 'bytes=-']) {
    assert.equal(resolveAudioByteRange(invalid, 1000), null, invalid)
  }
})

test('Goethe audio stays private and is fetched when the admin presses play', () => {
  const route = fs.readFileSync(path.join(root, 'src/app/api/admin/goethe/submissions/[submissionId]/audio/[questionId]/route.ts'), 'utf8')
  const panel = fs.readFileSync(path.join(root, 'src/app/(site)/dashboard/admin/GoetheReviewPanel.tsx'), 'utf8')
  assert.match(route, /await requireAdmin\(\)/)
  assert.match(route, /\.eq\('exam_slug', 'goethe'\)\.eq\('submission_status', 'submitted'\)/)
  assert.match(route, /GOETHE_SPEAKING_BUCKET\)\.download\(path\)/)
  assert.match(route, /'Cache-Control': 'private, no-store, max-age=0'/)
  assert.match(route, /'Accept-Ranges': 'bytes'/)
  assert.match(panel, /audio controls preload="none" src=\{src\}/)
  assert.match(panel, /Descargar audio/)
  assert.doesNotMatch(panel, /getGoetheSubmissionAudio/)
})
