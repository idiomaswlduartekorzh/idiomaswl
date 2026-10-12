import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import {
  isPlausibleEmail,
  normalizeEmail,
  normalizeWhatsapp,
} from '../src/lib/leads/contact.ts'
import { sanitizeExamMock } from '../src/lib/ielts/public-mock.ts'
import type { MockExam } from '../src/data/mocks/types.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = (path: string) => readFileSync(resolve(root, path), 'utf8')

test('normaliza contactos utilizables y rechaza datos evidentemente falsos', () => {
  assert.equal(normalizeWhatsapp('+57 (300) 123-4567'), '+57 (300) 123-4567')
  assert.equal(normalizeWhatsapp('123'), null)
  assert.equal(normalizeWhatsapp('1111111111'), null)
  assert.equal(normalizeWhatsapp('+1234567890123456'), null)
  assert.equal(normalizeEmail('  Persona@Example.COM '), 'persona@example.com')
  assert.equal(isPlausibleEmail('correo-raro'), false)
})

test('todos los runners públicos exigen y guardan un lead antes del resultado', () => {
  const generic = source('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx')
  const languages = source('src/app/(site)/examenes/[exam]/practica/[mockId]/LanguagePracticeClient.tsx')
  const topik = source('src/app/(site)/examenes/[exam]/practica/[mockId]/TOPIKPracticeClient.tsx')
  const ielts = source('src/components/exam-runner/IELTSSubmission.tsx')
  const toefl = source('src/components/exam-runner/TOEFLSubmission.tsx')
  const goethe = source('src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheSubmission.tsx')
  const modal = source('src/components/LeadCaptureModal.tsx')
  const icfesApi = source('src/app/api/icfes/attempts/grade/route.ts')
  const saveLead = source('src/lib/actions/saveLead.ts')
  const publicRoute = source('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx')
  const toeflRunner = source('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx')

  assert.match(generic, /if \(!leadResult\.ok \|\| !leadResult\.id\) throw new Error/)
  assert.match(languages, /type Phase = 'intro' \| 'exam' \| 'lead' \| 'results'/)
  assert.match(languages, /<LeadCaptureModal[\s\S]*?mandatory/)
  assert.match(topik, /<LeadCaptureModal[\s\S]*?mandatory/)
  assert.doesNotMatch(topik, /localStorage\.getItem\('wl_lead_captured'\)/)
  assert.match(topik, /function handleSeeResults\(\)\s*\{\s*setPhase\('lead'\)/)
  assert.match(modal, /if \(!result\.ok \|\| !result\.id\)/)
  assert.match(modal, /mandatory \? 'exam-results' : 'simulacro'/)
  assert.match(saveLead, /isRequiredExamLead && \(!sanitize\(input\.name, 100\) \|\| input\.name\.trim\(\)\.length < 2 \|\| !email\)/)
  assert.match(icfesApi, /if \(!savedLead\.ok \|\| !savedLead\.id\)/)
  assert.match(goethe, /if \(!lead\.ok \|\| !lead\.id \|\| !lead\.receipt\)/)
  assert.match(publicRoute, /if \(!getIeltsReviewBlueprint\(mockId\)\) notFound\(\)/)
  assert.match(publicRoute, /if \(mock\.format !== 'toefl-2026'\) notFound\(\)/)
  assert.doesNotMatch(publicRoute, /<TOEFLPracticeClient/)
  assert.match(toeflRunner, /if \(nextIndex >= stages\.length\) \{[\s\S]*?setPhase\('submit'\)/)
  assert.match(toeflRunner, /onSuccess=\{async \(nextReceipt, access, leadReceipt\) => \{[\s\S]*?setPhase\('scoring'\);\s*void goSubmit\(\)/)

  for (const runner of [ielts, toefl]) {
    assert.match(runner, /<label htmlFor="[^"]*whatsapp">WhatsApp<\/label>/)
    assert.match(runner, /const leadResult = await saveLead/)
    assert.match(runner, /if \(!leadResult\.ok \|\| !leadResult\.id(?: \|\| !leadResult\.receipt)?\) throw new Error/)
  }
})

test('el panel recupera entregas históricas que tenían correo pero no fila en leads', () => {
  const admin = source('src/app/(site)/dashboard/admin/JoseDashboardServer.tsx')
  assert.match(admin, /historicalSubmissionLeads/)
  assert.match(admin, /source: 'exam_submission_historic'/)
  assert.match(admin, /whatsapp: null/)
  assert.match(admin, /source\.eq\.exam-results/)
  assert.match(admin, /\['exam-results', 'exam-practice-start', 'simulacro'/)
})

test('el simulacro público no serializa claves ni explicaciones antes del lead', () => {
  const mock = {
    id: 'set-3', examSlug: 'cambridge-b2', title: 'Set 3', subtitle: '', timeMinutes: 10,
    sections: [{ part: 1, title: 'Reading', instructions: '', transcript: 'correct answer', insights: { q1: { rationales: { A: 'correct' } } }, questions: [
      { type: 'mcq', id: 'q1', part: 1, text: 'Question', options: ['A', 'B'], answer: 0 },
      { type: 'formgroup', id: 'q2', part: 1, qRange: [2, 2], groupLabel: '', template: '{{2}}', blanks: [{ num: 2, answers: ['secret'] }] },
      { type: 'matching', id: 'q3', part: 1, qRange: [3, 3], items: [{ num: 3, stem: '', answer: 'B' }], endings: [{ letter: 'B', text: 'text' }] },
    ] }],
  } as MockExam
  const publicMock = sanitizeExamMock(mock)
  assert.equal(JSON.stringify(publicMock).includes('secret'), false)
  assert.equal(JSON.stringify(publicMock).includes('rationales'), false)
  assert.equal('answer' in publicMock.sections[0].questions[0], false)
  assert.equal('answer' in (publicMock.sections[0].questions[2] as { items: Record<string, unknown>[] }).items[0], false)
})
