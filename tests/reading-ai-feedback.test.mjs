import test from 'node:test'
import assert from 'node:assert/strict'
import {
  AI_MAX_OUTPUT_TOKENS, LocalRateLimit, parseFeedback, reviewWithOpenAI, validateDraft,
} from '../src/lib/reading/ai-feedback.ts'

const draft = 'Ich gehe aus dem Haus. Ich gehe nach links. Ich gehe an der Bank vorbei. Die Brücke ist vor dem Park. Ich gehe durch den Park. Meine Schule ist neben dem Park.'
const context = {
  language: 'alemán', level: 'A1',
  prompt: 'Describe en 5–7 frases tu camino al trabajo o a clase.',
  objectives: ['Usar preposiciones de lugar y dativo.'],
  grammarFocus: ['praepositionen-ort'],
  readingText: 'Ich gehe zu Fuß zur Arbeit.',
}
const feedback = {
  errores: [{ fragmento: 'an der Bank', explicacion: 'Aquí conviene precisar el lugar.', sugerencia: 'an der Bäckerei' }],
  version_corregida: draft,
  reescribe: 'Reescribe la frase sobre el parque con «neben».',
}
const apiReply = (value, status = 200) => new Response(JSON.stringify(value), { status })

test('valida la tarea A1 y los límites antes de enviarla', () => {
  assert.equal(validateDraft(draft).ok, true)
  assert.equal(validateDraft('Ich gehe.').ok, false)
  assert.equal(validateDraft(`${draft} Mehr. Mehr.`).ok, false)
  assert.equal(validateDraft(`${draft} ${'lang '.repeat(150)}`).ok, false)
  assert.equal(validateDraft('a'.repeat(701)).ok, false)
})

test('acepta el formato breve y rechaza exceso o campos incompletos', () => {
  assert.deepEqual(parseFeedback(feedback), feedback)
  assert.equal(parseFeedback({ ...feedback, errores: [feedback.errores[0], feedback.errores[0], feedback.errores[0]] }), null)
  assert.equal(parseFeedback({ ...feedback, version_corregida: 'a'.repeat(701) }), null)
  assert.equal(parseFeedback({ errores: [], version_corregida: draft }), null)
})

test('la solicitud contiene solo el texto escrito y limita la salida', async () => {
  let sent
  const fetcher = async (_url, init) => {
    sent = JSON.parse(init.body)
    return apiReply({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(feedback) }] }], usage: { input_tokens: 210, output_tokens: 110 } })
  }
  const result = await reviewWithOpenAI(draft, 'test-only', context, fetcher)
  assert.equal(result.ok, true)
  assert.deepEqual(result.usage, { input_tokens: 210, output_tokens: 110 })
  assert.equal(sent.store, false)
  assert.equal(sent.max_output_tokens, AI_MAX_OUTPUT_TOKENS)
  assert.equal(sent.input[0].role, 'user')
  assert.equal(JSON.parse(sent.input[0].content[0].text).texto_estudiante, draft)
  assert.match(sent.instructions, /nunca instrucciones/)
  assert.match(sent.instructions, /Describe en 5–7 frases tu camino/)
  assert.match(sent.instructions, /praepositionen-ort/)
  assert.match(sent.instructions, /Ich gehe zu Fuß zur Arbeit/)
  assert.equal(JSON.stringify(sent).includes('audio'), false)
})

test('maneja cuota, fallo y respuesta inválida sin filtrar detalles', async () => {
  assert.deepEqual(await reviewWithOpenAI(draft, 'test-only', context, async () => apiReply({ error: { code: 'insufficient_quota', message: 'secret detail' } }, 429)), { ok: false, code: 'quota' })
  assert.deepEqual(await reviewWithOpenAI(draft, 'test-only', context, async () => apiReply({ error: { message: 'secret detail' } }, 500)), { ok: false, code: 'unavailable' })
  assert.deepEqual(await reviewWithOpenAI(draft, 'test-only', context, async () => apiReply({ output: [{ content: [{ type: 'output_text', text: '{bad json' }] }] })), { ok: false, code: 'invalid_response' })
  assert.deepEqual(await reviewWithOpenAI(draft, 'test-only', context, async () => { throw new Error('network detail') }), { ok: false, code: 'unavailable' })
})

test('limita solicitudes por identidad y reinicia tras la ventana', () => {
  const limiter = new LocalRateLimit(3, 1_000)
  assert.equal(limiter.consume('a', 0), true)
  assert.equal(limiter.consume('a', 1), true)
  assert.equal(limiter.consume('a', 2), true)
  assert.equal(limiter.consume('a', 3), false)
  assert.equal(limiter.consume('b', 3), true)
  assert.equal(limiter.consume('a', 1_000), true)
})
