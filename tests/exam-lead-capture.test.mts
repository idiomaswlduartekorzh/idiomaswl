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

  assert.match(generic, /if \(!leadResult\.ok\) throw new Error/)
  assert.match(languages, /type Phase = 'intro' \| 'exam' \| 'lead' \| 'results'/)
  assert.match(languages, /<LeadCaptureModal[\s\S]*?mandatory/)
  assert.match(topik, /<LeadCaptureModal[\s\S]*?mandatory/)

  for (const runner of [ielts, toefl]) {
    assert.match(runner, /<label htmlFor="[^"]*whatsapp">WhatsApp<\/label>/)
    assert.match(runner, /const leadResult = await saveLead/)
    assert.match(runner, /if \(!leadResult\.ok\) throw new Error/)
  }
})

test('el panel recupera entregas históricas que tenían correo pero no fila en leads', () => {
  const admin = source('src/app/(site)/dashboard/admin/JoseDashboardServer.tsx')
  assert.match(admin, /historicalSubmissionLeads/)
  assert.match(admin, /source: 'exam_submission_historic'/)
  assert.match(admin, /whatsapp: null/)
})
