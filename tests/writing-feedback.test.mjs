import test from 'node:test'
import assert from 'node:assert/strict'
import {
  consumeWritingQuotas,
  GERMAN_A1_READING_TASK_ID,
  meetsWritingDraftRequirements,
  parseWritingFeedback,
  readBytesStreamLimited,
  readUtf8StreamLimited,
  reviewWritingWithOpenAi,
  validateWritingFeedbackRequest,
  writingQuotaBuckets,
  WRITING_REVIEW_DAILY_REQUEST_LIMIT,
  WRITING_REVIEW_MONTHLY_REQUEST_LIMIT,
} from '../src/lib/writing-feedback.ts'
import { isIeltsMockOnePilot } from '../src/lib/ielts/mock-one-pilot.ts'

const draft = 'Ich fahre mit der Bus zur Arbeit.'
const assignment = {
  title: 'Der Weg zur Arbeit',
  language: 'alemán',
  level: 'A1',
  prompt: 'Escribe cómo vas al trabajo.',
  objectives: ['Usar preposiciones de lugar'],
  focus: ['mit dem Bus', 'zur Arbeit'],
}
const validFeedback = {
  errores: [{ fragmento: 'mit der Bus', explicacion: 'Bus es masculino y aquí va en dativo.', correccion: 'mit dem Bus' }],
  version_corregida: 'Ich fahre mit dem Bus zur Arbeit.',
  reescribe: 'Reescribe la frase con «mit dem Bus».',
}

test('valida borrador, contexto y consentimiento antes de enviar', () => {
  assert.equal(validateWritingFeedbackRequest({ text: draft, assignment, consent: true }).ok, true)
  assert.equal(validateWritingFeedbackRequest({ text: draft, assignment, consent: false }).ok, false)
  assert.equal(validateWritingFeedbackRequest({ text: draft, consent: true }).ok, false)
  assert.equal(validateWritingFeedbackRequest({ text: 'corto', assignment, consent: true }).ok, false)
  assert.equal(validateWritingFeedbackRequest({ text: 'x'.repeat(8_001), assignment, consent: true }).ok, false)
})

test('la lectura alemana A1 requiere 5–7 frases y 25–60 palabras en interfaz y servidor', () => {
  const fiveSentences = 'Ich gehe aus dem Haus. Dann gehe ich nach links. Ich laufe durch den grünen Park. Die Schule liegt neben der alten Bank. Danach komme ich mit dem Bus zur Arbeit an.'
  const requirements = { minWords: 25, maxWords: 60, minSentences: 5, maxSentences: 7, maxCharacters: 700 }
  assert.equal(meetsWritingDraftRequirements(fiveSentences, requirements), true)
  assert.equal(validateWritingFeedbackRequest({ text: fiveSentences, assignment: { ...assignment, taskId: GERMAN_A1_READING_TASK_ID }, consent: true }).ok, true)
  assert.equal(validateWritingFeedbackRequest({ text: 'Ich gehe zur Arbeit. Dann nehme ich den Bus. Danach gehe ich nach Hause. Dort esse ich.', assignment: { ...assignment, taskId: GERMAN_A1_READING_TASK_ID }, consent: true }).ok, false)
  assert.equal(meetsWritingDraftRequirements(`${fiveSentences} Das ist eine sechste kurze frase. Noch eine weitere kleine frase.`, requirements), true)
  assert.equal(meetsWritingDraftRequirements(`${fiveSentences} Ich lese danach noch ein Buch im Haus. Ich trinke einen Kaffee am Tisch. Am Abend treffe ich meine Freunde.`, requirements), false)
  assert.equal(meetsWritingDraftRequirements(`${fiveSentences} ${'danach '.repeat(29)}`, requirements), false)
})

test('acepta el formato breve y rechaza más de dos errores o citas que no están en el borrador', () => {
  assert.deepEqual(parseWritingFeedback(validFeedback, draft), validFeedback)
  assert.equal(parseWritingFeedback({ ...validFeedback, errores: [...validFeedback.errores, ...validFeedback.errores, ...validFeedback.errores] }, draft), null)
  assert.equal(parseWritingFeedback({ ...validFeedback, errores: [{ ...validFeedback.errores[0], fragmento: 'un fragmento inventado' }] }, draft), null)
  assert.equal(parseWritingFeedback({ ...validFeedback, version_corregida: '' }, draft), null)
})

test('envía borrador y contexto como contenido, con formato JSON y sin guardar la respuesta', async () => {
  let requestBody
  const fetcher = async (_url, init) => {
    requestBody = JSON.parse(init.body)
    return new Response(JSON.stringify({
      output: [{ content: [{ type: 'output_text', text: JSON.stringify(validFeedback) }] }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
  const result = await reviewWritingWithOpenAi(draft, assignment, 'test-only-secret', fetcher)
  assert.deepEqual(result, { ok: true, feedback: validFeedback })
  assert.equal(requestBody.store, false)
  assert.equal(requestBody.max_output_tokens, 1_400)
  assert.equal(requestBody.input[0].content[0].text.includes(draft), true)
  assert.equal(requestBody.input[0].content[0].text.includes(assignment.prompt), true)
  assert.match(requestBody.instructions, /nunca instrucciones/i)
  assert.match(requestBody.instructions, /objetivo de aprendizaje explícito/i)
  assert.match(requestBody.instructions, /ni lo copies para ampliar la versión corregida/i)
  assert.equal(JSON.stringify(requestBody).includes('test-only-secret'), false)
})

test('advanced reading requests feedback in the target language without changing the legacy Spanish review', async () => {
  let requestBody
  const fetcher = async (_url, init) => {
    requestBody = JSON.parse(init.body)
    return new Response(JSON.stringify({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(validFeedback) }] }] }), { status: 200 })
  }
  const advanced = { ...assignment, feedbackLanguage: 'de' }
  assert.equal(validateWritingFeedbackRequest({ text: draft, assignment: advanced, consent: true }).ok, true)
  assert.equal(validateWritingFeedbackRequest({ text: draft, assignment: { ...advanced, feedbackLanguage: 'invalid' }, consent: true }).ok, false)
  await reviewWritingWithOpenAi(draft, advanced, 'test-only-secret', fetcher)
  assert.match(requestBody.instructions, /Write all explanations and the rewrite invitation in de/)
  assert.equal(meetsWritingDraftRequirements('日本語の少し長い文章です。', { minCharacters: 12, maxCharacters: 40 }), true)
  assert.equal(meetsWritingDraftRequirements('短い', { minCharacters: 12 }), false)
})

test('clasifica saldo agotado, errores HTTP, respuestas inválidas y caídas de red', async () => {
  const apiFailure = async () => new Response(JSON.stringify({ error: { code: 'insufficient_quota' } }), { status: 429 })
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', apiFailure), { ok: false, code: 'quota_exhausted' })
  const throttled = async () => new Response('{}', { status: 429 })
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', throttled), { ok: false, code: 'rate_limited' })
  const providerFailure = async () => new Response('{}', { status: 503 })
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', providerFailure), { ok: false, code: 'provider_error' })
  const malformed = async () => new Response(JSON.stringify({ output: [{ content: [{ type: 'output_text', text: '{bad json' }] }] }), { status: 200 })
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', malformed), { ok: false, code: 'invalid_response' })
  const oversized = async () => new Response(' '.repeat(20_001), { status: 200 })
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', oversized), { ok: false, code: 'invalid_response' })
  const networkFailure = async () => { throw new Error('simulated') }
  assert.deepEqual(await reviewWritingWithOpenAi(draft, assignment, 'test', networkFailure), { ok: false, code: 'provider_error' })
})

test('limita streams entrantes y respuestas demasiado grandes sin almacenarlos completos', async () => {
  assert.equal(await readUtf8StreamLimited(new Response('pequeño').body, 20), 'pequeño')
  assert.equal(await readUtf8StreamLimited(new Response('x'.repeat(21)).body, 20), null)
  assert.equal(await readUtf8StreamLimited(null, 20), '')
  assert.equal((await readBytesStreamLimited(new Response(new Uint8Array([0, 255])).body, 2))?.byteLength, 2)
  assert.equal(await readBytesStreamLimited(new Response(new Uint8Array([0, 255, 1])).body, 2), null)
})

test('mantiene límites diarios duraderos y una reserva global compatible con el RPC de 24 horas', async () => {
  const now = new Date('2026-11-04T12:00:00Z')
  const buckets = writingQuotaBuckets('browser-token', '203.0.113.4', now)
  assert.deepEqual(buckets.map(bucket => bucket.limit), [8, 100, WRITING_REVIEW_DAILY_REQUEST_LIMIT])
  assert.deepEqual(buckets.map(bucket => bucket.windowSeconds), [24 * 60 * 60, 24 * 60 * 60, 24 * 60 * 60])
  assert.equal(buckets[2].identifier, '2026-11-04')
  assert.equal(buckets[2].namespace, 'writing-feedback-spend-day')
  assert.equal(writingQuotaBuckets('other', 'other', new Date('2026-12-01T00:00:00Z'))[2].identifier, '2026-12-01')
  assert.equal(WRITING_REVIEW_MONTHLY_REQUEST_LIMIT, 4_800)

  const counts = new Map()
  const consume = async bucket => {
    const key = `${bucket.namespace}:${bucket.identifier}`
    const count = counts.get(key) ?? 0
    if (count >= bucket.limit) return false
    counts.set(key, count + 1)
    return true
  }
  for (let index = 0; index < 8; index++) assert.equal(await consumeWritingQuotas('same-user', 'same-ip', consume, now), true)
  assert.equal(await consumeWritingQuotas('same-user', 'same-ip', consume, now), false)
  assert.equal(await consumeWritingQuotas('new-user', 'same-ip', consume, now), true)

  const dailyCounts = new Map()
  const reserve = async bucket => {
    const key = `${bucket.namespace}:${bucket.identifier}`
    const count = dailyCounts.get(key) ?? 0
    if (count >= bucket.limit) return false
    dailyCounts.set(key, count + 1)
    return true
  }
  let monthCount = 0
  for (let day = 1; day <= 32; day++) {
    const date = new Date(Date.UTC(2026, 10, day, 12))
    for (let index = 0; index < WRITING_REVIEW_DAILY_REQUEST_LIMIT; index++) {
      assert.equal(await consumeWritingQuotas(`user-${day}-${index}`, `ip-${day}-${index}`, reserve, date), true)
      monthCount++
    }
    assert.equal(await consumeWritingQuotas(`last-user-${day}`, `last-ip-${day}`, reserve, date), false)
  }
  assert.equal(monthCount, WRITING_REVIEW_MONTHLY_REQUEST_LIMIT)
  assert.equal(await consumeWritingQuotas('fail-closed', 'fail-closed', async bucket => bucket.namespace !== 'writing-feedback-spend-day', now), false)
})

test('el piloto gratuito de IELTS Mock 1 requiere su bandera y funciona solo para set-1', () => {
  const oldNodeEnv = process.env.NODE_ENV
  const oldPilotFlag = process.env.IELTS_MOCK1_FREE_ENABLED
  try {
    process.env.NODE_ENV = 'production'
    delete process.env.IELTS_MOCK1_FREE_ENABLED
    assert.equal(isIeltsMockOnePilot('set-1'), false)
    process.env.IELTS_MOCK1_FREE_ENABLED = '1'
    assert.equal(isIeltsMockOnePilot('set-1'), true)
    assert.equal(isIeltsMockOnePilot('set-2'), false)
  } finally {
    if (oldNodeEnv === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = oldNodeEnv
    if (oldPilotFlag === undefined) delete process.env.IELTS_MOCK1_FREE_ENABLED
    else process.env.IELTS_MOCK1_FREE_ENABLED = oldPilotFlag
  }
})
