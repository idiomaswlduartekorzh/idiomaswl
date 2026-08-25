import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { presentExamResult } from '../src/lib/exam-results/presentation.ts'

const root = process.cwd()
const read = file => fs.readFileSync(path.join(root, file), 'utf8')

test('student history never presents an incomplete IELTS review as zero percent', () => {
  assert.deepEqual(presentExamResult({ examSlug: 'ielts', totalScore: null, totalMax: 9 }), {
    label: 'En revisión',
    percent: null,
    pending: true,
  })
})

test('student history preserves IELTS bands and regular exam percentages', () => {
  assert.deepEqual(presentExamResult({ examSlug: 'ielts', totalScore: 7.5, totalMax: 9 }), {
    label: 'Band 7.5',
    percent: 83,
    pending: false,
  })
  assert.deepEqual(presentExamResult({ examSlug: 'toefl', totalScore: 24, totalMax: 30 }), {
    label: '80%',
    percent: 80,
    pending: false,
  })
})

test('database consolidation enforces immutable, complete, service-only IELTS scoring', () => {
  const migration = read('supabase/migrations/20260821031000_format_ielts_band_labels.sql')
  assert.match(migration, /for update/i)
  assert.match(migration, /if submission\.reviewed_at is not null/i)
  assert.match(migration, /task2_band \* 2/i)
  assert.match(migration, /submission\.listening_band is not null[\s\S]*submission\.reading_band is not null[\s\S]*calculated_writing is not null[\s\S]*submission\.speaking_band is not null/i)
  assert.match(migration, /revoke all on function public\.recompute_ielts_submission_score\(uuid\) from public, anon, authenticated/i)
  assert.match(migration, /grant execute on function public\.recompute_ielts_submission_score\(uuid\) to service_role/i)
})

test('student and admin IELTS surfaces distinguish review state from a final Overall', () => {
  const student = read('src/app/(site)/dashboard/student/page.tsx')
  const progress = read('src/app/(site)/dashboard/student/progreso/page.tsx')
  const admin = read('src/app/(site)/dashboard/admin/IELTSReviewPanel.tsx')
  const resultPage = read('src/app/(site)/dashboard/student/resultados/ielts/[submissionId]/page.tsx')
  assert.match(student, /presentExamResult/)
  assert.match(progress, /presentExamResult/)
  assert.match(admin, /el Overall sigue pendiente hasta disponer de las cuatro bandas/)
  assert.match(admin, /El Overall solo se publica cuando existen L\/R\/W\/S/)
  assert.match(resultPage, /\.eq\('user_id', user\.id\)/)
  assert.match(resultPage, /Overall pendiente/)
  assert.match(resultPage, /no un resultado oficial emitido por IELTS/)
})
